package transfer

import (
	"bytes"
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestIntegrityVerify_AllMatch(t *testing.T) {
	dir := t.TempDir()
	content := []byte("integrity test content")
	fpath := filepath.Join(dir, "data.txt")
	if err := os.WriteFile(fpath, content, 0o644); err != nil {
		t.Fatal(err)
	}

	hash, err := hashReader(bytes.NewReader(content))
	if err != nil {
		t.Fatal(err)
	}

	meta := Meta{
		Name:    "testdir",
		IsBatch: true,
		Chunks:  0,
		Files:   []FileMeta{{Path: "data.txt", Size: int64(len(content)), Hash: hash}},
	}

	// Pass file as dirDone — skips network transfer, goes straight to verify
	err = doReceiveDir(context.Background(), nil, meta, dir, nil, []string{"data.txt"}, true)
	if err != nil {
		t.Fatalf("expected nil error, got: %v", err)
	}
}

func TestIntegrityVerify_BitFlip_ReturnsError(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "data.txt"), []byte("original"), 0o644); err != nil {
		t.Fatal(err)
	}

	wrongHash := strings.Repeat("ab", 32) // 64-char hex, obviously wrong

	meta := Meta{
		Name:    "testdir",
		IsBatch: true,
		Chunks:  0,
		Files:   []FileMeta{{Path: "data.txt", Size: 8, Hash: wrongHash}},
	}

	err := doReceiveDir(context.Background(), nil, meta, dir, nil, []string{"data.txt"}, true)
	if err == nil {
		t.Fatal("expected error for hash mismatch, got nil")
	}
	if !strings.Contains(err.Error(), "INTEGRITY FAIL") {
		t.Fatalf("expected '[INTEGRITY FAIL]' in error, got: %v", err)
	}
}

func TestIntegrityVerify_Disabled_SkipsReverify(t *testing.T) {
	dir := t.TempDir()
	content := []byte("some data")
	if err := os.WriteFile(filepath.Join(dir, "f.txt"), content, 0o644); err != nil {
		t.Fatal(err)
	}

	// Wrong hash — but verify=false, so no error expected
	meta := Meta{
		Name:    "testdir",
		IsBatch: true,
		Chunks:  0,
		Files:   []FileMeta{{Path: "f.txt", Size: int64(len(content)), Hash: strings.Repeat("ff", 32)}},
	}

	err := doReceiveDir(context.Background(), nil, meta, dir, nil, []string{"f.txt"}, false)
	if err != nil {
		t.Fatalf("verify=false should not re-verify, got: %v", err)
	}
}
