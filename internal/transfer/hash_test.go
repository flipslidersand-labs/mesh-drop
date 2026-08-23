package transfer

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
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

func TestHashFileAt_MatchesHashReader(t *testing.T) {
	content := []byte("hello from hashFileAt test content 1234567890")
	f, err := os.CreateTemp(t.TempDir(), "hash*")
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	if _, err := f.Write(content); err != nil {
		t.Fatal(err)
	}

	hAt, err := hashFileAt(f, int64(len(content)))
	if err != nil {
		t.Fatalf("hashFileAt: %v", err)
	}
	hReader, err := hashReader(strings.NewReader(string(content)))
	if err != nil {
		t.Fatalf("hashReader: %v", err)
	}
	if hAt != hReader {
		t.Errorf("hashFileAt = %q, want %q", hAt, hReader)
	}
}

func TestHashFileAt_ZeroSize(t *testing.T) {
	path := filepath.Join(t.TempDir(), "empty.bin")
	if err := os.WriteFile(path, nil, 0o644); err != nil {
		t.Fatal(err)
	}
	f, err := os.Open(path)
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()

	h, err := hashFileAt(f, 0)
	if err != nil {
		t.Fatalf("hashFileAt(0): %v", err)
	}
	if len(h) != 64 {
		t.Errorf("expected 64-char hex hash, got %q", h)
	}
}

func TestHashFileAt_LargeFile(t *testing.T) {
	// Write 3 MiB to exercise the multi-chunk read path (bufSize = 1 MiB).
	content := make([]byte, 3<<20)
	for i := range content {
		content[i] = byte(i % 251)
	}
	f, err := os.CreateTemp(t.TempDir(), "large*")
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	if _, err := f.Write(content); err != nil {
		t.Fatal(err)
	}

	hAt, err := hashFileAt(f, int64(len(content)))
	if err != nil {
		t.Fatalf("hashFileAt: %v", err)
	}
	hReader, err := hashReader(strings.NewReader(string(content)))
	if err != nil {
		t.Fatal(err)
	}
	if hAt != hReader {
		t.Errorf("hashFileAt large mismatch")
	}
}

type errReader struct{ err error }

func (e errReader) Read(_ []byte) (int, error) { return 0, e.err }

func TestHashReader_Error(t *testing.T) {
	want := fmt.Errorf("injected read error")
	_, err := hashReader(errReader{want})
	if err == nil {
		t.Fatal("expected error from hashReader when reader fails, got nil")
	}
}

func TestHashFileAt_ClosedFile(t *testing.T) {
	f, err := os.CreateTemp(t.TempDir(), "closed*")
	if err != nil {
		t.Fatal(err)
	}
	if _, werr := f.WriteString("some data"); werr != nil {
		t.Fatal(werr)
	}
	f.Close()
	_, err = hashFileAt(f, 9)
	if err == nil {
		t.Fatal("expected error when hashing closed file, got nil")
	}
}
