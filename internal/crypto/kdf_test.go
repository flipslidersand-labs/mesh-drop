package crypto

import (
	"bytes"
	"testing"
)

func TestDeriveChunkStreamKey_Valid(t *testing.T) {
	encKey := bytes.Repeat([]byte{0x01}, 32)
	decKey := bytes.Repeat([]byte{0x02}, 32)

	key, err := DeriveChunkStreamKey(encKey, decKey, "test-label")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(key) != 32 {
		t.Fatalf("expected 32-byte key, got %d bytes", len(key))
	}
}

func TestDeriveChunkStreamKey_ShortEncKey(t *testing.T) {
	encKey := bytes.Repeat([]byte{0x01}, 31)
	decKey := bytes.Repeat([]byte{0x02}, 32)

	_, err := DeriveChunkStreamKey(encKey, decKey, "test-label")
	if err == nil {
		t.Fatal("expected error for 31-byte encKey, got nil")
	}
}

func TestDeriveChunkStreamKey_ShortDecKey(t *testing.T) {
	encKey := bytes.Repeat([]byte{0x01}, 32)
	decKey := bytes.Repeat([]byte{0x02}, 31)

	_, err := DeriveChunkStreamKey(encKey, decKey, "test-label")
	if err == nil {
		t.Fatal("expected error for 31-byte decKey, got nil")
	}
}

func TestDeriveChunkStreamKey_LongEncKey(t *testing.T) {
	encKey := bytes.Repeat([]byte{0x01}, 33)
	decKey := bytes.Repeat([]byte{0x02}, 32)

	_, err := DeriveChunkStreamKey(encKey, decKey, "test-label")
	if err == nil {
		t.Fatal("expected error for 33-byte encKey, got nil")
	}
}

func TestDeriveChunkStreamKey_Deterministic(t *testing.T) {
	encKey := bytes.Repeat([]byte{0xAA}, 32)
	decKey := bytes.Repeat([]byte{0xBB}, 32)
	label := "deterministic-label"

	key1, err := DeriveChunkStreamKey(encKey, decKey, label)
	if err != nil {
		t.Fatalf("first call error: %v", err)
	}

	key2, err := DeriveChunkStreamKey(encKey, decKey, label)
	if err != nil {
		t.Fatalf("second call error: %v", err)
	}

	if !bytes.Equal(key1, key2) {
		t.Fatalf("expected identical outputs, got different keys")
	}
}

func TestDeriveChunkStreamKey_LabelIsolation(t *testing.T) {
	encKey := bytes.Repeat([]byte{0x11}, 32)
	decKey := bytes.Repeat([]byte{0x22}, 32)

	keyA, err := DeriveChunkStreamKey(encKey, decKey, "a")
	if err != nil {
		t.Fatalf("label a error: %v", err)
	}

	keyB, err := DeriveChunkStreamKey(encKey, decKey, "b")
	if err != nil {
		t.Fatalf("label b error: %v", err)
	}

	if bytes.Equal(keyA, keyB) {
		t.Fatal("expected different outputs for different labels, got identical keys")
	}
}

func TestDeriveChunkStreamKey_NonZero(t *testing.T) {
	encKey := bytes.Repeat([]byte{0x33}, 32)
	decKey := bytes.Repeat([]byte{0x44}, 32)

	key, err := DeriveChunkStreamKey(encKey, decKey, "nonzero-label")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	allZero := true
	for _, b := range key {
		if b != 0 {
			allZero = false
			break
		}
	}
	if allZero {
		t.Fatal("expected non-zero output key, got all zeros")
	}
}
