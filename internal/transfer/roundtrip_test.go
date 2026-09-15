package transfer

import (
	"bytes"
	"context"
	"crypto/rand"
	"fmt"
	"net"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
)

// #572: defaultSession（パッケージスコープの共有グローバル）を使う Send/Listen 系関数は、
// t.Parallel() を使う通常テストと素朴には共存できない（永続 identity が無いと handshake
// ごとに ephemeral 鍵が変わり "peer key mismatch" になる一方、複数テストから並行に
// defaultSession.identity へ書き込むと data race になる）。
//
// TestMain で全テスト実行前に一度だけ固定 identity を注入すれば、以降は
// localKey() 経由の読み取りのみになり race は発生しない
// （internal/transfer/integration_test.go の TestMain と同じパターン）。
// ListenContinuous は明示的な outDir を取るため CWD 依存も無く、既存の
// t.Parallel() テストと安全に共存できる。
func TestMain(m *testing.M) {
	key, err := crypto.GenerateKeypair()
	if err != nil {
		panic("roundtrip: GenerateKeypair: " + err.Error())
	}
	defaultSession.mu.Lock()
	defaultSession.identity = key
	defaultSession.inited = true
	defaultSession.mu.Unlock()
	os.Exit(m.Run())
}

func rtFreeUDPPort(t *testing.T) int {
	t.Helper()
	conn, err := net.ListenPacket("udp4", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("freeUDPPort: %v", err)
	}
	port := conn.LocalAddr().(*net.UDPAddr).Port
	conn.Close() //nolint:errcheck
	return port
}

func rtWaitUDPReady(t *testing.T, addr string, timeout time.Duration) {
	t.Helper()
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		conn, err := net.DialTimeout("udp4", addr, 5*time.Millisecond)
		if err == nil {
			conn.Close() //nolint:errcheck
			return
		}
		time.Sleep(2 * time.Millisecond)
	}
	t.Fatalf("waitUDPReady: %s not reachable within %s", addr, timeout)
}

// rtStartListener starts a ListenContinuous server on a free port and returns
// the bundle, its address, a cancel func, and a channel of received file paths.
func rtStartListener(t *testing.T, outDir string) (*TLSBundle, string, context.CancelFunc, chan string) {
	t.Helper()
	bundle, err := NewTLSBundle()
	if err != nil {
		t.Fatalf("NewTLSBundle: %v", err)
	}
	addr := fmt.Sprintf("127.0.0.1:%d", rtFreeUDPPort(t))
	ctx, cancel := context.WithCancel(context.Background())
	recv := make(chan string, 4)
	go func() {
		_ = ListenContinuous(ctx, addr, bundle, outDir, func(_, path string, _ int64, _ string) {
			recv <- path
		})
	}()
	rtWaitUDPReady(t, addr, 5*time.Second)
	return bundle, addr, cancel, recv
}

func rtWaitRecv(t *testing.T, recv chan string, n int) []string {
	t.Helper()
	var paths []string
	deadline := time.After(20 * time.Second)
	for i := 0; i < n; i++ {
		select {
		case p := <-recv:
			paths = append(paths, p)
		case <-deadline:
			t.Fatalf("timed out waiting for receive (%d/%d)", i, n)
		}
	}
	return paths
}

// TestRoundTrip_SingleFile exercises the Send / dispatchConnToDir / acceptMetaDispatch /
// receiveFileToPath / doReceiveFileResume / sendChunk / acceptChunk(WithMeta) / sendMeta(GetResume)
// path end-to-end, none of which is covered by non-integration tests today (#572).
func TestRoundTrip_SingleFile(t *testing.T) {
	content := make([]byte, 200*1024) // 2 chunks worth, no resume in play
	if _, err := rand.Read(content); err != nil {
		t.Fatal(err)
	}
	srcDir := t.TempDir()
	srcPath := filepath.Join(srcDir, "hello.bin")
	if err := os.WriteFile(srcPath, content, 0o644); err != nil {
		t.Fatal(err)
	}

	outDir := t.TempDir()
	bundle, addr, cancel, recv := rtStartListener(t, outDir)
	defer cancel()

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()
	if err := Send(ctx, addr, srcPath, 2, bundle.Fingerprint, nil, false, 0, false); err != nil {
		t.Fatalf("Send: %v", err)
	}

	paths := rtWaitRecv(t, recv, 1)
	got, err := os.ReadFile(paths[0])
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	if !bytes.Equal(got, content) {
		t.Errorf("content mismatch: sent %d bytes, got %d bytes", len(content), len(got))
	}
	if filepath.Dir(paths[0]) != outDir {
		t.Errorf("received into %q, want under outDir %q", paths[0], outDir)
	}
}

// TestRoundTrip_Dir exercises SendDir / doSendDir / sendDirChunk / acceptDirChunk / doReceiveDir.
func TestRoundTrip_Dir(t *testing.T) {
	srcDir := t.TempDir()
	files := map[string][]byte{
		"a.txt":        []byte("hello from a"),
		"nested/b.txt": []byte("hello from nested b"),
	}
	for name, data := range files {
		full := filepath.Join(srcDir, name)
		if err := os.MkdirAll(filepath.Dir(full), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(full, data, 0o644); err != nil {
			t.Fatal(err)
		}
	}

	outDir := t.TempDir()
	bundle, addr, cancel, recv := rtStartListener(t, outDir)
	defer cancel()

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()
	if err := SendDir(ctx, addr, srcDir, 4, bundle.Fingerprint, nil, false, 0, false, nil); err != nil {
		t.Fatalf("SendDir: %v", err)
	}

	// dispatchConnToDir's RecvCallback is only invoked for the single-file
	// branch (doReceiveDir does not take a callback), so poll for the
	// receiver's atomic renames to land instead of waiting on recv.
	_ = recv
	for name, want := range files {
		path := filepath.Join(outDir, name)
		var got []byte
		var readErr error
		deadline := time.Now().Add(10 * time.Second)
		for time.Now().Before(deadline) {
			got, readErr = os.ReadFile(path)
			if readErr == nil {
				break
			}
			time.Sleep(10 * time.Millisecond)
		}
		if readErr != nil {
			t.Fatalf("ReadFile(%s): %v", name, readErr)
		}
		if !bytes.Equal(got, want) {
			t.Errorf("%s: content mismatch", name)
		}
	}
}

// TestRoundTrip_Pipe exercises SendPipe / doSendPipe / doReceivePipeConn end-to-end
// by redirecting os.Stdin to a pipe carrying the test payload.
func TestRoundTrip_Pipe(t *testing.T) {
	payload := []byte("piped data for #572 coverage\n")

	origStdin := os.Stdin
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	os.Stdin = r
	t.Cleanup(func() { os.Stdin = origStdin })

	go func() {
		_, _ = w.Write(payload)
		_ = w.Close()
	}()

	outDir := t.TempDir()
	bundle, addr, cancel, recv := rtStartListener(t, outDir)
	defer cancel()

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()
	if err := SendPipe(ctx, addr, bundle.Fingerprint); err != nil {
		t.Fatalf("SendPipe: %v", err)
	}

	// ListenContinuous's pipe branch has no callback, so wait on the receive
	// path indirectly via the sender's own success and a short settle delay:
	// doReceivePipeConn writes straight to os.Stdout, so we only assert that
	// SendPipe completed without error (the receive side is exercised for
	// coverage purposes; content is verified separately by the CLI's own
	// pipe integration test).
	select {
	case <-recv:
		t.Fatal("unexpected callback invocation for pipe transfer")
	case <-time.After(200 * time.Millisecond):
	}
}

// TestInitSession_Wrapper covers the InitSession() package-level wrapper.
// defaultSession is already initialized by TestMain, so init() short-circuits
// on the inited flag without touching s.identity — safe alongside the
// parallel round-trip tests above.
func TestInitSession_Wrapper(t *testing.T) {
	if err := InitSession(); err != nil {
		t.Errorf("InitSession: %v", err)
	}
}

// TestSession_Init_FreshLoadsOrCreatesIdentity covers Session.init()'s actual
// load-or-create branch using a private Session value (never defaultSession),
// so it is safe to run alongside the other tests in this file.
func TestSession_Init_FreshLoadsOrCreatesIdentity(t *testing.T) {
	t.Setenv("XDG_CONFIG_HOME", t.TempDir())

	var s Session
	if err := s.init(); err != nil {
		t.Fatalf("init: %v", err)
	}
	if !s.inited {
		t.Error("expected inited=true after init()")
	}
	key1, err := s.localKey()
	if err != nil {
		t.Fatalf("localKey: %v", err)
	}

	// A second Session pointed at the same config dir should load the same
	// persisted identity rather than generating a fresh one.
	var s2 Session
	if err := s2.init(); err != nil {
		t.Fatalf("init (reload): %v", err)
	}
	key2, err := s2.localKey()
	if err != nil {
		t.Fatalf("localKey (reload): %v", err)
	}
	if !bytes.Equal(key1.Private, key2.Private) {
		t.Error("expected persisted identity to be reused across Session instances")
	}

	// init() is idempotent.
	if err := s.init(); err != nil {
		t.Fatalf("init (repeat): %v", err)
	}
}
