package main

import (
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
