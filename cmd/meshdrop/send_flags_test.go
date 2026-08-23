package main

import (
	"crypto/sha256"
	"encoding/hex"
	"strings"
	"testing"
)

// execSend runs cmdSend() with the given args and returns the error string (or "").
func execSend(args ...string) string {
	cmd := cmdSend()
	cmd.SetArgs(args)
	// Suppress output from cobra.
	cmd.SilenceUsage = true
	cmd.SilenceErrors = true
	if err := cmd.Execute(); err != nil {
		return err.Error()
	}
	return ""
}

func TestSendFlags_AllAndRelayMutuallyExclusive(t *testing.T) {
	err := execSend("--all", "--relay", "http://relay:8080", "testfile")
	if err == "" {
		t.Fatal("expected error for --all --relay, got nil")
	}
	if !strings.Contains(err, "--relay") {
		t.Errorf("error should mention --relay, got: %s", err)
	}
}

func TestSendFlags_ToAndRelayMutuallyExclusive(t *testing.T) {
	err := execSend("--to", "192.168.1.1:9999", "--relay", "http://relay:8080", "--code", "abc123", "testfile")
	if err == "" {
		t.Fatal("expected error for --to --relay, got nil")
	}
	if !strings.Contains(err, "--relay") {
		t.Errorf("error should mention --relay, got: %s", err)
	}
}

func TestSendFlags_AllAndToMutuallyExclusive(t *testing.T) {
	err := execSend("--all", "--to", "192.168.1.1:9999", "testfile")
	if err == "" {
		t.Fatal("expected error for --all --to, got nil")
	}
	if !strings.Contains(err, "mutually exclusive") {
		t.Errorf("error should mention 'mutually exclusive', got: %s", err)
	}
}

func TestSendFlags_RelayRequiresCode(t *testing.T) {
	err := execSend("--relay", "http://relay:8080", "testfile")
	if err == "" {
		t.Fatal("expected error for --relay without --code, got nil")
	}
	if !strings.Contains(err, "--code") {
		t.Errorf("error should mention --code, got: %s", err)
	}
}

func TestSendFlags_AllAndPipeMutuallyExclusive(t *testing.T) {
	err := execSend("--all", "--pipe")
	if err == "" {
		t.Fatal("expected error for --all --pipe, got nil")
	}
	if !strings.Contains(err, "--pipe") {
		t.Errorf("error should mention --pipe, got: %s", err)
	}
}

// --- parseFingerprint ---

func TestParseFingerprint_Empty(t *testing.T) {
	fp, err := parseFingerprint("")
	if err != nil {
		t.Fatalf("expected nil error for empty string, got: %v", err)
	}
	if fp != nil {
		t.Errorf("expected nil fingerprint for empty string, got: %x", fp)
	}
}

func TestParseFingerprint_Valid(t *testing.T) {
	sum := sha256.Sum256([]byte("test"))
	hexStr := hex.EncodeToString(sum[:])
	fp, err := parseFingerprint(hexStr)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(fp) != 32 {
		t.Errorf("expected 32 bytes, got %d", len(fp))
	}
	for i, b := range sum {
		if fp[i] != b {
			t.Errorf("fingerprint mismatch at byte %d", i)
		}
	}
}

func TestParseFingerprint_InvalidHex(t *testing.T) {
	_, err := parseFingerprint("not-valid-hex")
	if err == nil {
		t.Fatal("expected error for invalid hex, got nil")
	}
	if !strings.Contains(err.Error(), "invalid hex") {
		t.Errorf("error should mention 'invalid hex', got: %v", err)
	}
}

func TestParseFingerprint_WrongLength(t *testing.T) {
	// 16 bytes (32 hex chars) — too short
	_, err := parseFingerprint(hex.EncodeToString(make([]byte, 16)))
	if err == nil {
		t.Fatal("expected error for wrong length, got nil")
	}
	if !strings.Contains(err.Error(), "32-byte") {
		t.Errorf("error should mention '32-byte', got: %v", err)
	}
}

// --- parseRateLimit ---

func TestParseRateLimit_Empty(t *testing.T) {
	lim, err := parseRateLimit("")
	if err != nil {
		t.Fatalf("expected nil error for empty string, got: %v", err)
	}
	if lim != nil {
		t.Errorf("expected nil limiter for empty string")
	}
}

func TestParseRateLimit_Valid(t *testing.T) {
	for _, s := range []string{"1MB", "500KB", "10MiB", "1GB"} {
		t.Run(s, func(t *testing.T) {
			lim, err := parseRateLimit(s)
			if err != nil {
				t.Fatalf("parseRateLimit(%q): unexpected error: %v", s, err)
			}
			if lim == nil {
				t.Errorf("parseRateLimit(%q): expected non-nil limiter", s)
			}
		})
	}
}

func TestParseRateLimit_Invalid(t *testing.T) {
	_, err := parseRateLimit("notanumber")
	if err == nil {
		t.Fatal("expected error for invalid rate limit string, got nil")
	}
	if !strings.Contains(err.Error(), "--rate-limit") {
		t.Errorf("error should mention '--rate-limit', got: %v", err)
	}
}
