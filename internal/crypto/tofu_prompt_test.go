package crypto

import (
	"bytes"
	"errors"
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// fakeTTY は promptTTY の差し替え実装。in を入力として返し、書き込まれたプロンプトを out に溜める。
type fakeTTY struct {
	in          io.Reader
	out         bytes.Buffer
	deadlineErr error
	closed      bool
}

func (f *fakeTTY) Read(p []byte) (int, error)    { return f.in.Read(p) }
func (f *fakeTTY) Write(p []byte) (int, error)   { return f.out.Write(p) }
func (f *fakeTTY) Close() error                  { f.closed = true; return nil }
func (f *fakeTTY) SetDeadline(_ time.Time) error { return f.deadlineErr }
func ttyOpener(f *fakeTTY, calls *int) func() (promptTTY, error) {
	return func() (promptTTY, error) { *calls++; return f, nil }
}

type errReader struct{ err error }

func (e errReader) Read([]byte) (int, error) { return 0, e.err }

// 承認応答（y / yes、大文字・前後空白可）は信頼登録され、ファイルにも永続化される (#637)。
func TestPromptAndTrust_Accepts(t *testing.T) {
	for _, ans := range []string{"y\n", "yes\n", "Y\n", " YES \n", "y"} {
		t.Run(strings.TrimSpace(ans), func(t *testing.T) {
			dir := t.TempDir()
			kp := NewKnownPeers(dir)
			tty := &fakeTTY{in: strings.NewReader(ans)}
			calls := 0
			kp.openTTY = ttyOpener(tty, &calls)
			pub := fakePublicKey(1)

			if err := kp.Verify(pub); err != nil {
				t.Fatalf("Verify: %v", err)
			}
			if !tty.closed {
				t.Error("tty must be closed")
			}
			if out := tty.out.String(); !strings.Contains(out, FingerprintShort(pub)) || !strings.Contains(out, "Trust this peer?") {
				t.Errorf("prompt = %q, want fingerprint and question", out)
			}
			// 2 回目は再プロンプトしない。
			if err := kp.Verify(pub); err != nil || calls != 1 {
				t.Errorf("second Verify err=%v tty opened %d times, want nil/1", err, calls)
			}
			// 永続化されている（再読み込みで既知）。
			reloaded := NewKnownPeers(dir)
			reloaded.openTTY = func() (promptTTY, error) { t.Fatal("must not prompt for persisted peer"); return nil, nil }
			if err := reloaded.Verify(pub); err != nil {
				t.Errorf("persisted peer should verify without prompt: %v", err)
			}
		})
	}
}

// 承認以外の応答は拒否され、キャッシュにもファイルにも残らない。
func TestPromptAndTrust_Rejects(t *testing.T) {
	for _, ans := range []string{"n\n", "\n", "no\n", "maybe\n", "yy\n"} {
		t.Run(strings.TrimSpace(ans), func(t *testing.T) {
			dir := t.TempDir()
			kp := NewKnownPeers(dir)
			calls := 0
			kp.openTTY = ttyOpener(&fakeTTY{in: strings.NewReader(ans)}, &calls)
			pub := fakePublicKey(2)

			err := kp.Verify(pub)
			if err == nil || !strings.Contains(err.Error(), "peer not trusted") {
				t.Fatalf("Verify error = %v, want 'peer not trusted'", err)
			}
			kp.mu.Lock()
			_, cached := kp.cache[FingerprintKey(pub)]
			kp.mu.Unlock()
			if cached {
				t.Error("rejected peer must not be cached")
			}
			if _, statErr := os.Stat(filepath.Join(dir, "known_peers")); !os.IsNotExist(statErr) {
				t.Errorf("rejected peer must not be persisted, stat err = %v", statErr)
			}
		})
	}
}

func TestPromptAndTrust_InputFailures(t *testing.T) {
	cases := []struct {
		name    string
		tty     *fakeTTY
		wantErr string
	}{
		{"EOF without answer", &fakeTTY{in: strings.NewReader("")}, "could not read answer"},
		{"read error (timeout)", &fakeTTY{in: errReader{errors.New("i/o timeout")}}, "TTY read error"},
		{"deadline unsupported", &fakeTTY{in: strings.NewReader("y\n"), deadlineErr: errors.New("nope")}, "could not set TTY deadline"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			kp := makeKnownPeers(t)
			calls := 0
			kp.openTTY = ttyOpener(tc.tty, &calls)
			err := kp.Verify(fakePublicKey(3))
			if err == nil || !strings.Contains(err.Error(), tc.wantErr) {
				t.Fatalf("Verify error = %v, want containing %q", err, tc.wantErr)
			}
			if !tc.tty.closed {
				t.Error("tty must be closed on failure")
			}
		})
	}
}

// known_peers に書けなくても、承認済みピアは同一セッション中は信頼済みとして扱い警告を出す。
func TestPromptAndTrust_PersistFailureKeepsMemoryTrust(t *testing.T) {
	kp := NewKnownPeers(t.TempDir())
	kp.path = filepath.Join(t.TempDir(), "missing-dir", "known_peers") // 親が無く追記に失敗する
	calls := 0
	kp.openTTY = ttyOpener(&fakeTTY{in: strings.NewReader("y\n")}, &calls)
	pub := fakePublicKey(4)

	r, w, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	orig := os.Stderr
	os.Stderr = w
	verr := kp.Verify(pub)
	os.Stderr = orig
	_ = w.Close()
	warn, _ := io.ReadAll(r)

	if verr != nil {
		t.Fatalf("Verify must succeed even if persisting fails: %v", verr)
	}
	if !strings.Contains(string(warn), "could not persist trusted peer") {
		t.Errorf("stderr = %q, want persist warning", warn)
	}
	if err := kp.Verify(pub); err != nil || calls != 1 {
		t.Errorf("second Verify err=%v tty opened %d times, want nil/1 (trusted in memory)", err, calls)
	}
}

func TestPromptAndTrust_OpenTTYError(t *testing.T) {
	kp := makeKnownPeers(t)
	kp.openTTY = func() (promptTTY, error) { return nil, errors.New("no tty") }
	err := kp.Verify(fakePublicKey(5))
	if err == nil || !strings.Contains(err.Error(), "no TTY available") {
		t.Fatalf("Verify error = %v, want 'no TTY available'", err)
	}
}
