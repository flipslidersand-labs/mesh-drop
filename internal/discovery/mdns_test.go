package discovery

import (
	"context"
	"testing"
	"time"
)

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

func TestHexDecodeFingerprint_Valid(t *testing.T) {
	b, err := hexDecodeFingerprint("deadbeef")
	if err != nil {
		t.Fatal(err)
	}
	want := []byte{0xde, 0xad, 0xbe, 0xef}
	for i, v := range want {
		if b[i] != v {
			t.Errorf("byte[%d]: got %02x want %02x", i, b[i], v)
		}
	}
}

func TestHexDecodeFingerprint_OddLength(t *testing.T) {
	_, err := hexDecodeFingerprint("abc")
	if err == nil {
		t.Error("want error for odd-length input")
	}
}

func TestHexDecodeFingerprint_InvalidChar(t *testing.T) {
	_, err := hexDecodeFingerprint("ZZ")
	if err == nil {
		t.Error("want error for invalid hex char")
	}
}

func TestHexDecodeFingerprint_UpperCase(t *testing.T) {
	b, err := hexDecodeFingerprint("DEADBEEF")
	if err != nil {
		t.Fatal(err)
	}
	if b[0] != 0xde {
		t.Errorf("expected 0xde got %02x", b[0])
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
