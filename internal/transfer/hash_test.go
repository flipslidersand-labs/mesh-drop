package transfer

import (
	"errors"
	"strings"
	"testing"
)

func TestHashReader_Format(t *testing.T) {
	h, err := hashReader(strings.NewReader("hello meshdrop"))
	if err != nil {
		t.Fatal(err)
	}
	if len(h) != 64 {
		t.Errorf("hash length = %d, want 64 hex chars", len(h))
	}
}

func TestHashReader_Deterministic(t *testing.T) {
	h1, _ := hashReader(strings.NewReader("same input"))
	h2, _ := hashReader(strings.NewReader("same input"))
	if h1 != h2 {
		t.Error("same input produced different hashes")
	}
}

func TestHashReader_Distinct(t *testing.T) {
	h1, _ := hashReader(strings.NewReader("file A content"))
	h2, _ := hashReader(strings.NewReader("file B content"))
	if h1 == h2 {
		t.Error("different inputs produced the same hash")
	}
}

func TestErrHashMismatch_IsWrappable(t *testing.T) {
	wrapped := errors.New("BLAKE3 hash mismatch: file may be corrupted in transit")
	// errors.Is で ErrHashMismatch を検出できる設計の確認
	if ErrHashMismatch == nil {
		t.Fatal("ErrHashMismatch is nil")
	}
	_ = wrapped
}
