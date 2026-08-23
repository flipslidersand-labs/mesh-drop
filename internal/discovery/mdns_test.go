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

func TestBrowse_ReturnsWithinTimeout(t *testing.T) {
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
	if elapsed > 1500*time.Millisecond {
		t.Errorf("Browse() took %v, expected ≤1.5s", elapsed)
	}
}
