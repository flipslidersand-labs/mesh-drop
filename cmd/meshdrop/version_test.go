package main

import (
	"bytes"
	"strings"
	"testing"
)

func TestCmdVersion_DefaultOutput(t *testing.T) {
	cmd := cmdVersion()
	var buf bytes.Buffer
	cmd.SetOut(&buf)
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
	// version variable is empty in tests (not set by ldflags); output should be "dev\n"
	got := strings.TrimSpace(buf.String())
	if got != "dev" {
		t.Errorf("expected 'dev', got %q", got)
	}
}

func TestCmdVersion_ShortFlag(t *testing.T) {
	cmd := cmdVersion()
	var buf bytes.Buffer
	cmd.SetOut(&buf)
	cmd.SetArgs([]string{"--short"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "dev" {
		t.Errorf("expected 'dev' with --short, got %q", got)
	}
}

func TestCmdVersion_WithVersionSet(t *testing.T) {
	orig := version
	version = "v1.2.3"
	defer func() { version = orig }()

	cmd := cmdVersion()
	var buf bytes.Buffer
	cmd.SetOut(&buf)
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "meshdrop v1.2.3" {
		t.Errorf("expected 'meshdrop v1.2.3', got %q", got)
	}
}

func TestCmdVersion_ShortFlagWithVersionSet(t *testing.T) {
	orig := version
	version = "v2.0.0"
	defer func() { version = orig }()

	cmd := cmdVersion()
	var buf bytes.Buffer
	cmd.SetOut(&buf)
	cmd.SetArgs([]string{"--short"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "v2.0.0" {
		t.Errorf("expected 'v2.0.0', got %q", got)
	}
}
