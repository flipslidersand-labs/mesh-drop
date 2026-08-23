package main

import (
	"bytes"
	"runtime"
	"strings"
	"testing"
)

func TestCmdVersion_OutputContainsGoVersion(t *testing.T) {
	cmd := cmdVersion()
	var buf bytes.Buffer
	cmd.SetOut(&buf)
	cmd.SetErr(&buf)
	if err := cmd.Execute(); err != nil {
		t.Fatalf("version command failed: %v", err)
	}
	out := buf.String()
	if !strings.Contains(out, runtime.Version()) {
		t.Errorf("expected output to contain Go version %q, got: %q", runtime.Version(), out)
	}
	if !strings.Contains(out, runtime.GOOS) {
		t.Errorf("expected output to contain GOOS %q, got: %q", runtime.GOOS, out)
	}
}

func TestCmdVersion_ShortFlag(t *testing.T) {
	cmd := cmdVersion()
	var buf bytes.Buffer
	cmd.SetOut(&buf)
	cmd.SetErr(&buf)
	cmd.SetArgs([]string{"--short"})
	if err := cmd.Execute(); err != nil {
		t.Fatalf("version --short failed: %v", err)
	}
	out := strings.TrimSpace(buf.String())
	// Should be a single line with just the version (or "(dev)" if unset).
	if strings.Contains(out, "\n") {
		t.Errorf("--short output should be a single line, got: %q", out)
	}
	if out == "" {
		t.Errorf("--short output should not be empty")
	}
}
