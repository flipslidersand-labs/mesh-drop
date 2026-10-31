package discovery

import (
	"bytes"
	"context"
	"io"
	"os"
	"strings"
	"testing"
	"time"
)

// captureStderr は fn 実行中の os.Stderr を取得して返す（Advertise のヒント出力の検証用）。
func captureStderr(t *testing.T, fn func()) string {
	t.Helper()
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatalf("os.Pipe: %v", err)
	}
	old := os.Stderr
	os.Stderr = w
	defer func() { os.Stderr = old }()
	fn()
	_ = w.Close()
	b, _ := io.ReadAll(r)
	return string(b)
}

// Register は port=0 を "Missing port" で即座に拒否する（ネットワーク非依存）。
// ctx が生きている間は relay を案内するヒントを出し、キャンセル済みなら出さない (#212)。
func TestAdvertise_RegisterFailure_HintsWhileCtxAlive(t *testing.T) {
	var err error
	out := captureStderr(t, func() { err = Advertise(context.Background(), 0, nil) })
	if err == nil || !strings.Contains(err.Error(), "mDNS register") {
		t.Fatalf("Advertise(port=0) error = %v, want wrapped mDNS register error", err)
	}
	if !strings.Contains(out, "mDNS advertise failed") || !strings.Contains(out, "--relay") {
		t.Errorf("expected failure hint on stderr while ctx alive, got %q", out)
	}
}

func TestAdvertise_RegisterFailure_NoHintAfterCancel(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	var err error
	out := captureStderr(t, func() { err = Advertise(ctx, 0, nil) })
	if err == nil {
		t.Fatal("Advertise(port=0) should fail even when ctx is cancelled")
	}
	if out != "" {
		t.Errorf("no hint expected after ctx cancel (#212), got %q", out)
	}
}

// TestAdvertise_ReturnsNilOnContextCancel は正常系：ctx 終了で登録を解除して nil を返す。
// 実際の mDNS ソケットを使うため -short ではスキップし、環境が Register を許さない場合もスキップする。
func TestAdvertise_ReturnsNilOnContextCancel(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping real mDNS network test in -short mode (#563)")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 300*time.Millisecond)
	defer cancel()
	if err := Advertise(ctx, 45679, nil); err != nil {
		t.Skipf("mDNS register unavailable in this environment: %v", err)
	}
}

// TestAdvertise_FingerprintRoundTrip は広告→発見で fingerprint TXT の有無が Peer に反映されることを確認する。
// マルチキャストが制限された環境では自分の広告が見つからないためスキップする。
func TestAdvertise_FingerprintRoundTrip(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping real mDNS network test in -short mode (#563)")
	}
	host, _ := os.Hostname()
	instance := "meshdrop-" + host
	const port = 45678
	cases := []struct {
		name string
		fp   []byte
	}{
		{"with fingerprint", bytes.Repeat([]byte{0xab}, 32)},
		{"without fingerprint", nil},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			done := make(chan error, 1)
			go func() { done <- Advertise(ctx, port, tc.fp) }()
			time.Sleep(300 * time.Millisecond)
			peers, berr := Browse(context.Background(), 3*time.Second)
			cancel()
			if aerr := <-done; aerr != nil {
				t.Skipf("mDNS register unavailable in this environment: %v", aerr)
			}
			if berr != nil {
				t.Fatalf("Browse: %v", berr)
			}
			for _, p := range peers {
				if p.Name == instance && p.Port == port {
					if !bytes.Equal(p.Fingerprint, tc.fp) {
						t.Errorf("Peer.Fingerprint = %x, want %x", p.Fingerprint, tc.fp)
					}
					return
				}
			}
			t.Skipf("own advertisement not discovered (multicast likely restricted); peers=%d", len(peers))
		})
	}
}

func TestPeerAddr_WithIP(t *testing.T) {
	p := Peer{Name: "test", Host: "host.local.", Port: 44444, IP: "192.168.1.10"}
	if got := p.Addr(); got != "192.168.1.10:44444" {
		t.Errorf("Addr() = %q, want %q", got, "192.168.1.10:44444")
	}
}

func TestPeerAddr_FallbackHost(t *testing.T) {
	p := Peer{Name: "test", Host: "host.local.", Port: 44444, IP: ""}
	if got := p.Addr(); got != "host.local.:44444" {
		t.Errorf("Addr() = %q, want %q", got, "host.local.:44444")
	}
}

// TestBrowse_ReturnsWithinTimeout exercises real mDNS/multicast discovery on
// the network the test runs on. CI runners (especially windows-ci, which
// runs in a container/VM) can have multicast restricted or firewalled,
// making zeroconf's socket setup and discovery loop slower and the timing
// assertion below flaky (#563). Skipped in -short mode (windows-ci already
// runs with -short) and given a generous margin so it still catches a
// genuine "Browse never returns" regression without flaking on CI jitter.
func TestBrowse_ReturnsWithinTimeout(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping real mDNS network test in -short mode (#563)")
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	start := time.Now()
	peers, err := Browse(ctx, 500*time.Millisecond)
	elapsed := time.Since(start)

	if err != nil {
		t.Fatalf("Browse() error: %v", err)
	}
	// ローカル環境に受信側がいないので 0 件が正常
	if len(peers) != 0 {
		t.Logf("found %d peer(s) on LAN", len(peers))
	}
	// Generous margin (10x the requested timeout) to absorb slow socket
	// setup on loaded/restricted CI networks while still catching a hang.
	if elapsed > 5*time.Second {
		t.Errorf("Browse() took %v, expected ≤5s", elapsed)
	}
}
