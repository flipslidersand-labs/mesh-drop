package discovery

import (
	"context"
	"encoding/hex"
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

<<<<<<< HEAD
func TestHexDecodeFingerprint_Valid(t *testing.T) {
	b, err := hexDecodeFingerprint("deadbeef")
	if err != nil {
		t.Fatal(err)
	}
	want := []byte{0xde, 0xad, 0xbe, 0xef}
	for i, v := range want {
		if b[i] != v {
			t.Errorf("byte[%d]: got %02x want %02x", i, b[i], v)
=======
// --- hexNibble ---

func TestHexNibble_Digits(t *testing.T) {
	for i := byte(0); i <= 9; i++ {
		v, ok := hexNibble('0' + i)
		if !ok {
			t.Errorf("hexNibble(%c) ok=false", '0'+i)
		}
		if v != i {
			t.Errorf("hexNibble(%c) = %d, want %d", '0'+i, v, i)
		}
	}
}

func TestHexNibble_LowerHex(t *testing.T) {
	for i, c := range []byte("abcdef") {
		v, ok := hexNibble(c)
		if !ok {
			t.Errorf("hexNibble(%c) ok=false", c)
		}
		if v != byte(10+i) {
			t.Errorf("hexNibble(%c) = %d, want %d", c, v, 10+i)
		}
	}
}

func TestHexNibble_UpperHex(t *testing.T) {
	for i, c := range []byte("ABCDEF") {
		v, ok := hexNibble(c)
		if !ok {
			t.Errorf("hexNibble(%c) ok=false", c)
		}
		if v != byte(10+i) {
			t.Errorf("hexNibble(%c) = %d, want %d", c, v, 10+i)
		}
	}
}

func TestHexNibble_Invalid(t *testing.T) {
	for _, c := range []byte("ghijklmnopqrstuvwxyzGHIJKLMNOPQRSTUVWXYZ!@#$% ") {
		if _, ok := hexNibble(c); ok {
			t.Errorf("hexNibble(%c) should be invalid", c)
		}
	}
}

// --- hexDecodeFingerprint ---

func TestHexDecodeFingerprint_Valid(t *testing.T) {
	data := []byte{0xDE, 0xAD, 0xBE, 0xEF}
	hexStr := hex.EncodeToString(data)
	out, err := hexDecodeFingerprint(hexStr)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(out) != len(data) {
		t.Fatalf("length mismatch: got %d, want %d", len(out), len(data))
	}
	for i, b := range data {
		if out[i] != b {
			t.Errorf("byte %d: got %x, want %x", i, out[i], b)
>>>>>>> 6ce2308d (test(#281,#310): raise total coverage to 50% and update CI threshold)
		}
	}
}

func TestHexDecodeFingerprint_OddLength(t *testing.T) {
	_, err := hexDecodeFingerprint("abc")
	if err == nil {
<<<<<<< HEAD
		t.Error("want error for odd-length input")
=======
		t.Fatal("expected error for odd-length hex string")
>>>>>>> 6ce2308d (test(#281,#310): raise total coverage to 50% and update CI threshold)
	}
}

func TestHexDecodeFingerprint_InvalidChar(t *testing.T) {
<<<<<<< HEAD
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
=======
	_, err := hexDecodeFingerprint("zz")
	if err == nil {
		t.Fatal("expected error for invalid hex char")
	}
}

func TestHexDecodeFingerprint_Empty(t *testing.T) {
	out, err := hexDecodeFingerprint("")
	if err != nil {
		t.Fatalf("unexpected error for empty string: %v", err)
	}
	if len(out) != 0 {
		t.Errorf("expected empty slice, got %v", out)
>>>>>>> 6ce2308d (test(#281,#310): raise total coverage to 50% and update CI threshold)
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
