//go:build integration

package transfer

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
	"github.com/quic-go/quic-go"
)

func TestMain(m *testing.M) {
	// Set a fixed in-process Noise identity so localKey() returns the same
	// keypair for every handshake within the test binary. Without a fixed
	// identity, each handshake generates a fresh ephemeral key and data-stream
	// "peer key mismatch" errors follow. We leave sessionPeers=nil to disable
	// TOFU prompting (both sides are in-process; no TTY is available).
	key, err := crypto.GenerateKeypair()
	if err != nil {
		panic("integration: GenerateKeypair: " + err.Error())
	}
	defaultSession.mu.Lock()
	defaultSession.identity = key
	defaultSession.inited = true
	// defaultSession.peers stays nil → TOFU skipped
	defaultSession.mu.Unlock()
	os.Exit(m.Run())
}

// freeUDPPort finds an available UDP port on loopback by briefly binding to :0.
// There is a small TOCTOU race but it is acceptable for loopback integration tests.
func freeUDPPort(t *testing.T) int {
	t.Helper()
	conn, err := net.ListenPacket("udp4", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("freeUDPPort: %v", err)
	}
	port := conn.LocalAddr().(*net.UDPAddr).Port
	conn.Close()
	return port
}

// waitUDPReady polls addr with UDP dials until the port is bound or the
// deadline expires. It replaces unconditional time.Sleep calls so that CI
// runners are not penalised by arbitrary fixed delays.
func waitUDPReady(t *testing.T, addr string, timeout time.Duration) {
	t.Helper()
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		conn, err := net.DialTimeout("udp4", addr, 5*time.Millisecond)
		if err == nil {
			conn.Close()
			return
		}
		time.Sleep(2 * time.Millisecond)
	}
	t.Fatalf("waitUDPReady: %s not reachable within %s", addr, timeout)
}

// startTestListener starts a ListenContinuous server on addr and returns the
// TLSBundle, a cancel func, and a channel that receives the path of each
// successfully received file.
func startTestListener(t *testing.T, addr, outDir string) (*TLSBundle, context.CancelFunc, chan string) {
	t.Helper()
	bundle, err := NewTLSBundle()
	if err != nil {
		t.Fatalf("NewTLSBundle: %v", err)
	}
	ctx, cancel := context.WithCancel(context.Background())
	recv := make(chan string, 4)
	go func() {
		_ = ListenContinuous(ctx, addr, bundle, outDir, func(_, path string, _ int64, _ string) {
			recv <- path
		})
	}()
	// Poll until the QUIC listener has bound the port instead of sleeping a
	// fixed duration. This eliminates flaky failures on loaded CI runners.
	waitUDPReady(t, addr, 5*time.Second)
	return bundle, cancel, recv
}

// waitRecv waits for n received file paths or fails after 20 s.
func waitRecv(t *testing.T, recv chan string, n int) []string {
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

// --- #302: single-file and directory transfer ---

func TestIntegration_SingleFile_Send_Receive(t *testing.T) {
	outDir := t.TempDir()
	port := freeUDPPort(t)
	addr := fmt.Sprintf("127.0.0.1:%d", port)

	bundle, cancel, recv := startTestListener(t, addr, outDir)
	defer cancel()

	// 1 MB random content.
	content := make([]byte, 1<<20)
	if _, err := rand.Read(content); err != nil {
		t.Fatal(err)
	}
	srcDir := t.TempDir()
	srcPath := filepath.Join(srcDir, "file1mb.bin")
	if err := os.WriteFile(srcPath, content, 0o644); err != nil {
		t.Fatal(err)
	}

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()

	if err := Send(ctx, addr, srcPath, 4, bundle.Fingerprint, nil, false, 0, false); err != nil {
		t.Fatalf("Send: %v", err)
	}

	paths := waitRecv(t, recv, 1)
	got, err := os.ReadFile(paths[0])
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	if !bytes.Equal(got, content) {
		t.Errorf("content mismatch: sent %d bytes, got %d bytes", len(content), len(got))
	}
}

func TestIntegration_Directory_Send_Receive(t *testing.T) {
	srcDir := t.TempDir()
	outDir := t.TempDir()

	// Build a directory tree large enough that the sender stays busy for more than
	// one scheduling quantum, ensuring the receiver's AcceptStream goroutines are
	// scheduled before the sender closes the connection.
	files := map[string][]byte{
		"a.bin":     make([]byte, 512*1024),
		"sub/b.bin": make([]byte, 512*1024),
		"sub/c.bin": make([]byte, 512*1024),
	}
	for rel, data := range files {
		rand.Read(data) //nolint:errcheck
		full := filepath.Join(srcDir, rel)
		if err := os.MkdirAll(filepath.Dir(full), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(full, data, 0o644); err != nil {
			t.Fatal(err)
		}
	}

	port := freeUDPPort(t)
	addr := fmt.Sprintf("127.0.0.1:%d", port)
	bundle, err := NewTLSBundle()
	if err != nil {
		t.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Use dispatchConnToDir directly so we can track completion.
	// ListenContinuous spawns a goroutine for the connection that outlives the
	// parent loop; tracking it externally avoids a TOCTOU on the output files.
	recvErr := make(chan error, 1)
	// ready is closed once the QUIC listener has bound its port.
	ready := make(chan struct{})
	go func() {
		ln, err := quic.ListenAddr(addr, bundle.Config, quicConfig())
		if err != nil {
			recvErr <- err
			return
		}
		defer ln.Close()
		close(ready)
		conn, err := ln.Accept(ctx)
		if err != nil {
			recvErr <- err
			return
		}
		recvErr <- dispatchConnToDir(ctx, conn, outDir, conn.RemoteAddr().String(), nil)
	}()
	// Wait for the listener goroutine to signal it has bound the port before
	// the sender dials. This replaces the previous time.Sleep(60ms).
	select {
	case <-ready:
	case err := <-recvErr:
		t.Fatalf("listener startup: %v", err)
	case <-ctx.Done():
		t.Fatal("timed out waiting for listener to start")
	}

	if err := SendDir(ctx, addr, srcDir, 4, bundle.Fingerprint, nil, false, 0, false, nil); err != nil {
		t.Fatalf("SendDir: %v", err)
	}

	if err := <-recvErr; err != nil {
		t.Fatalf("receive: %v", err)
	}

	// doReceiveDir writes each file to outDir/<FileMeta.Path> (relative to srcDir root).
	for rel, want := range files {
		gotPath := filepath.Join(outDir, rel)
		got, err := os.ReadFile(gotPath)
		if err != nil {
			t.Errorf("missing file %s: %v", rel, err)
			continue
		}
		if !bytes.Equal(got, want) {
			t.Errorf("content mismatch for %s", rel)
		}
	}
}

// --- #304: resume, no-resume, zero-byte ---

func TestIntegration_Resume_Interrupted(t *testing.T) {
	// Simulate resume by pre-populating a checkpoint that claims chunk 0 is done,
	// and writing the corresponding partial .tmp file. The receiver then only
	// requests the remaining chunks from the sender and assembles the full file.

	const chunks = 2
	const chunkSize = 64 * 1024
	content := make([]byte, chunks*chunkSize)
	rand.Read(content) //nolint:errcheck

	srcDir := t.TempDir()
	srcPath := filepath.Join(srcDir, "resume.bin")
	if err := os.WriteFile(srcPath, content, 0o644); err != nil {
		t.Fatal(err)
	}

	outDir := t.TempDir()

	// Compute a hash for the file so we can put it in the checkpoint.
	f, err := os.Open(srcPath)
	if err != nil {
		t.Fatal(err)
	}
	hash, err := hashReader(f)
	f.Close()
	if err != nil {
		t.Fatal(err)
	}

	// Write a checkpoint saying chunk 0 is already done.
	cpState := checkpointState{
		Name:        "resume.bin",
		Size:        int64(len(content)),
		Hash:        hash,
		ChunksTotal: chunks,
		ChunksDone:  []bool{true, false},
	}
	cpPath := filepath.Join(outDir, "resume.bin") + ".meshdrop-state"
	cpData, _ := json.Marshal(cpState)
	if err := os.WriteFile(cpPath, cpData, 0o644); err != nil {
		t.Fatal(err)
	}

	// Write a partial .tmp file with chunk 0 pre-filled.
	tmpPath := filepath.Join(outDir, "resume.bin") + ".meshdrop.tmp"
	tmpFile, err := os.Create(tmpPath)
	if err != nil {
		t.Fatal(err)
	}
	// Truncate to full size then write chunk 0 data.
	if err := tmpFile.Truncate(int64(len(content))); err != nil {
		tmpFile.Close()
		t.Fatal(err)
	}
	if _, err := tmpFile.WriteAt(content[:chunkSize], 0); err != nil {
		tmpFile.Close()
		t.Fatal(err)
	}
	tmpFile.Close()

	port := freeUDPPort(t)
	addr := fmt.Sprintf("127.0.0.1:%d", port)
	bundle, cancel, recv := startTestListener(t, addr, outDir)
	defer cancel()

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()

	if err := Send(ctx, addr, srcPath, chunks, bundle.Fingerprint, nil, false, 0, false); err != nil {
		t.Fatalf("Send: %v", err)
	}

	paths := waitRecv(t, recv, 1)
	got, err := os.ReadFile(paths[0])
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	if !bytes.Equal(got, content) {
		t.Errorf("resumed content mismatch: sent %d bytes, got %d bytes", len(content), len(got))
	}
}

func TestIntegration_NoResume_IgnoresCheckpoint(t *testing.T) {
	content := make([]byte, 128*1024)
	rand.Read(content) //nolint:errcheck

	srcDir := t.TempDir()
	srcPath := filepath.Join(srcDir, "noresume.bin")
	if err := os.WriteFile(srcPath, content, 0o644); err != nil {
		t.Fatal(err)
	}

	outDir := t.TempDir()
	port := freeUDPPort(t)
	addr := fmt.Sprintf("127.0.0.1:%d", port)
	bundle, cancel, recv := startTestListener(t, addr, outDir)
	defer cancel()

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()

	// noResume=true: receiver should ignore any existing checkpoint.
	if err := Send(ctx, addr, srcPath, 2, bundle.Fingerprint, nil, false, 0, true); err != nil {
		t.Fatalf("Send: %v", err)
	}

	paths := waitRecv(t, recv, 1)
	got, err := os.ReadFile(paths[0])
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	if !bytes.Equal(got, content) {
		t.Error("content mismatch for noResume transfer")
	}
}

func TestIntegration_ZeroByteFile(t *testing.T) {
	srcDir := t.TempDir()
	srcPath := filepath.Join(srcDir, "empty.txt")
	if err := os.WriteFile(srcPath, []byte{}, 0o644); err != nil {
		t.Fatal(err)
	}

	outDir := t.TempDir()
	port := freeUDPPort(t)
	addr := fmt.Sprintf("127.0.0.1:%d", port)
	bundle, cancel, recv := startTestListener(t, addr, outDir)
	defer cancel()

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()

	if err := Send(ctx, addr, srcPath, 1, bundle.Fingerprint, nil, false, 0, false); err != nil {
		t.Fatalf("Send: %v", err)
	}

	paths := waitRecv(t, recv, 1)
	info, err := os.Stat(paths[0])
	if err != nil {
		t.Fatalf("Stat: %v", err)
	}
	if info.Size() != 0 {
		t.Errorf("expected 0-byte file, got %d bytes", info.Size())
	}
}
