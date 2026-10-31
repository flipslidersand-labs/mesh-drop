package transfer

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// --- #271: verifyAfterReceive ---

func TestIntegrityVerify_AllMatch(t *testing.T) {
	dir := t.TempDir()
	content := []byte("hello world")
	if err := os.WriteFile(filepath.Join(dir, "a.txt"), content, 0o644); err != nil {
		t.Fatal(err)
	}
	f, _ := os.Open(filepath.Join(dir, "a.txt"))
	hash, _ := hashReader(f)
	f.Close()

	files := []FileMeta{{Path: "a.txt", Size: int64(len(content)), Hash: hash}}
	if err := verifyAfterReceive(dir, files); err != nil {
		t.Errorf("expected no error for matching hash, got: %v", err)
	}
}

func TestIntegrityVerify_BitFlip_ReturnsError(t *testing.T) {
	dir := t.TempDir()
	// Write file with content that doesn't match the claimed hash.
	if err := os.WriteFile(filepath.Join(dir, "b.txt"), []byte("tampered"), 0o644); err != nil {
		t.Fatal(err)
	}

	files := []FileMeta{{Path: "b.txt", Size: 8, Hash: "deadbeefdeadbeef"}}
	err := verifyAfterReceive(dir, files)
	if err == nil {
		t.Fatal("expected error for hash mismatch, got nil")
	}
	if !strings.Contains(err.Error(), "integrity verification failed") {
		t.Errorf("unexpected error message: %v", err)
	}
}

func TestIntegrityVerify_EmptyHash_Skipped(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "c.txt"), []byte("x"), 0o644); err != nil {
		t.Fatal(err)
	}
	// Empty hash should be skipped (not flagged as mismatch).
	files := []FileMeta{{Path: "c.txt", Size: 1, Hash: ""}}
	if err := verifyAfterReceive(dir, files); err != nil {
		t.Errorf("empty hash should be skipped, got: %v", err)
	}
}

func TestIntegrityVerify_MissingFile_ReturnsError(t *testing.T) {
	dir := t.TempDir()
	files := []FileMeta{{Path: "missing.txt", Size: 10, Hash: "abc123"}}
	err := verifyAfterReceive(dir, files)
	if err == nil {
		t.Fatal("expected error for missing file, got nil")
	}
}

func TestIntegrityVerify_MultipleFiles_PartialFail(t *testing.T) {
	dir := t.TempDir()
	good := []byte("good content")
	if err := os.WriteFile(filepath.Join(dir, "good.txt"), good, 0o644); err != nil {
		t.Fatal(err)
	}
	f, _ := os.Open(filepath.Join(dir, "good.txt"))
	goodHash, _ := hashReader(f)
	f.Close()

	if err := os.WriteFile(filepath.Join(dir, "bad.txt"), []byte("corrupted"), 0o644); err != nil {
		t.Fatal(err)
	}

	files := []FileMeta{
		{Path: "good.txt", Size: int64(len(good)), Hash: goodHash},
		{Path: "bad.txt", Size: 9, Hash: "wronghash"},
	}
	err := verifyAfterReceive(dir, files)
	if err == nil {
		t.Fatal("expected error for partial failure, got nil")
	}
}

// --- #273: Verbose flag wiring ---

func TestVerboseFlag_DefaultFalse(t *testing.T) {
	if Verbose {
		t.Error("Verbose should default to false")
	}
}

func TestEnableVerifyFlag_DefaultFalse(t *testing.T) {
	if EnableVerify {
		t.Error("EnableVerify should default to false")
	}
}
