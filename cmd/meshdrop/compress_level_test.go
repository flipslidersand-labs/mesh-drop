package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// #559: --compress-level must be validated to the documented 0-9 range.

func TestSendFlags_CompressLevelOutOfRange(t *testing.T) {
	dir := t.TempDir()
	target := filepath.Join(dir, "f.txt")
	if err := os.WriteFile(target, []byte("hello"), 0o644); err != nil {
		t.Fatal(err)
	}

	err := execSend("--to", "127.0.0.1:9999", "--compress-level", "42", target)
	if err == "" {
		t.Fatal("expected error for out-of-range --compress-level, got nil")
	}
	if !strings.Contains(err, "--compress-level") {
		t.Errorf("error should mention --compress-level, got: %s", err)
	}
}

func TestSendFlags_CompressLevelNegative(t *testing.T) {
	dir := t.TempDir()
	target := filepath.Join(dir, "f.txt")
	if err := os.WriteFile(target, []byte("hello"), 0o644); err != nil {
		t.Fatal(err)
	}

	err := execSend("--to", "127.0.0.1:9999", "--compress-level=-1", target)
	if err == "" {
		t.Fatal("expected error for negative --compress-level, got nil")
	}
	if !strings.Contains(err, "--compress-level") {
		t.Errorf("error should mention --compress-level, got: %s", err)
	}
}
