package config

import (
	"os"
	"path/filepath"
	"testing"
)

func TestLoad_NoFile(t *testing.T) {
	// Point XDG_CONFIG_HOME to an empty temp dir so no config file exists.
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)

	cfg, err := Load()
	if err != nil {
		t.Fatalf("expected no error when file is absent, got: %v", err)
	}
	if cfg == nil {
		t.Fatal("expected non-nil Config")
	}
	if cfg.Relay != "" || cfg.Port != 0 || cfg.RateLimit != "" {
		t.Errorf("expected zero-value Config, got %+v", cfg)
	}
}

func TestLoad_ValidFile(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)

	dir := filepath.Join(tmp, "meshdrop")
	if err := os.MkdirAll(dir, 0o700); err != nil {
		t.Fatal(err)
	}
	content := "relay: http://relay.example.com:8080\nport: 9090\nrate-limit: 10MB/s\n"
	if err := os.WriteFile(filepath.Join(dir, "config.yaml"), []byte(content), 0o600); err != nil {
		t.Fatal(err)
	}

	cfg, err := Load()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if cfg.Relay != "http://relay.example.com:8080" {
		t.Errorf("relay: got %q, want %q", cfg.Relay, "http://relay.example.com:8080")
	}
	if cfg.Port != 9090 {
		t.Errorf("port: got %d, want 9090", cfg.Port)
	}
	if cfg.RateLimit != "10MB/s" {
		t.Errorf("rate-limit: got %q, want %q", cfg.RateLimit, "10MB/s")
	}
}

func TestLoad_InvalidYAML(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)

	dir := filepath.Join(tmp, "meshdrop")
	if err := os.MkdirAll(dir, 0o700); err != nil {
		t.Fatal(err)
	}
	// Write invalid YAML
	if err := os.WriteFile(filepath.Join(dir, "config.yaml"), []byte("relay: [\ninvalid"), 0o600); err != nil {
		t.Fatal(err)
	}

	_, err := Load()
	if err == nil {
		t.Fatal("expected error for invalid YAML, got nil")
	}
}

func TestConfigPath_XDG(t *testing.T) {
	t.Setenv("XDG_CONFIG_HOME", "/custom/xdg")
	got := ConfigPath()
	want := "/custom/xdg/meshdrop/config.yaml"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestConfigPath_Home(t *testing.T) {
	t.Setenv("XDG_CONFIG_HOME", "")
	home, _ := os.UserHomeDir()
	got := ConfigPath()
	want := filepath.Join(home, ".meshdrop", "config.yaml")
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestDataPath_XDG(t *testing.T) {
	t.Setenv("XDG_DATA_HOME", "/custom/data")
	got := DataPath("tofu.json")
	want := "/custom/data/meshdrop/tofu.json"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestDataPath_Home(t *testing.T) {
	t.Setenv("XDG_DATA_HOME", "")
	home, _ := os.UserHomeDir()
	got := DataPath("tofu.json")
	want := filepath.Join(home, ".meshdrop", "tofu.json")
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}
