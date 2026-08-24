package main

import (
	"encoding/hex"
	"os"
	"path/filepath"
	"testing"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
)

// --- parseFingerprint ---

func TestParseFingerprint_Empty(t *testing.T) {
	fp, err := parseFingerprint("")
	if err != nil || fp != nil {
		t.Errorf("want nil,nil got %v,%v", fp, err)
	}
}

func TestParseFingerprint_Valid(t *testing.T) {
	raw := make([]byte, 32)
	raw[0] = 0xAB
	fpHex := hex.EncodeToString(raw)
	fp, err := parseFingerprint(fpHex)
	if err != nil {
		t.Fatal(err)
	}
	if len(fp) != 32 || fp[0] != 0xAB {
		t.Errorf("unexpected fp: %x", fp)
	}
}

func TestParseFingerprint_InvalidHex(t *testing.T) {
	_, err := parseFingerprint("zzzz")
	if err == nil {
		t.Error("want error for invalid hex")
	}
}

func TestParseFingerprint_WrongLength(t *testing.T) {
	_, err := parseFingerprint("deadbeef") // 4 bytes, not 32
	if err == nil {
		t.Error("want error for wrong length")
	}
}

// --- parseRateLimit ---

func TestParseRateLimit_Empty(t *testing.T) {
	lim, err := parseRateLimit("")
	if err != nil || lim != nil {
		t.Errorf("want nil,nil got %v,%v", lim, err)
	}
}

func TestParseRateLimit_Valid(t *testing.T) {
	lim, err := parseRateLimit("1MB/s")
	if err != nil || lim == nil {
		t.Errorf("want limiter got err=%v lim=%v", err, lim)
	}
}

func TestParseRateLimit_Invalid(t *testing.T) {
	_, err := parseRateLimit("badvalue")
	if err == nil {
		t.Error("want error for invalid rate limit")
	}
}

// --- promptPeerSelection ---

func TestPromptPeerSelection_DefaultOnEmpty(t *testing.T) {
	peers := []discovery.Peer{
		{Name: "alpha", Host: "localhost", Port: 1234},
		{Name: "beta", Host: "localhost", Port: 5678},
	}
	oldStdin := os.Stdin
	r, w, _ := os.Pipe()
	os.Stdin = r
	_, _ = w.WriteString("\n")
	w.Close()
	p, err := promptPeerSelection(peers)
	os.Stdin = oldStdin
	if err != nil {
		t.Fatal(err)
	}
	if p.Name != "alpha" {
		t.Errorf("want alpha, got %s", p.Name)
	}
}

func TestPromptPeerSelection_ValidIndex(t *testing.T) {
	peers := []discovery.Peer{
		{Name: "alpha", Host: "localhost", Port: 1234},
		{Name: "beta", Host: "localhost", Port: 5678},
	}
	oldStdin := os.Stdin
	r, w, _ := os.Pipe()
	os.Stdin = r
	_, _ = w.WriteString("2\n")
	w.Close()
	p, err := promptPeerSelection(peers)
	os.Stdin = oldStdin
	if err != nil {
		t.Fatal(err)
	}
	if p.Name != "beta" {
		t.Errorf("want beta, got %s", p.Name)
	}
}

func TestPromptPeerSelection_InvalidIndex(t *testing.T) {
	peers := []discovery.Peer{{Name: "alpha", Host: "localhost", Port: 1234}}
	oldStdin := os.Stdin
	r, w, _ := os.Pipe()
	os.Stdin = r
	_, _ = w.WriteString("99\n")
	w.Close()
	_, err := promptPeerSelection(peers)
	os.Stdin = oldStdin
	if err == nil {
		t.Error("want error for out-of-range index")
	}
}

// --- cmdConfigInit / cmdConfigPath via cobra Execute ---

func TestCmdConfigPath(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	cmd := cmdConfigPath()
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestCmdConfig_Subcommands(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	parent := cmdConfig()
	parent.SetArgs([]string{"path"})
	if err := parent.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestCmdConfigInit_CreatesFile(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	cmd := cmdConfigInit()
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
	path := filepath.Join(tmp, "meshdrop", "config.yaml")
	if _, err := os.Stat(path); err != nil {
		t.Errorf("expected config file at %s: %v", path, err)
	}
}

func TestCmdConfigInit_AlreadyExists(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	// Create file first
	dir := filepath.Join(tmp, "meshdrop")
	_ = os.MkdirAll(dir, 0o700)
	_ = os.WriteFile(filepath.Join(dir, "config.yaml"), []byte("relay: false\n"), 0o600)

	cmd := cmdConfigInit()
	err := cmd.Execute()
	if err == nil {
		t.Error("want error when file already exists")
	}
}

func TestPromptPeerSelection_NonInteger(t *testing.T) {
	peers := []discovery.Peer{
		{Name: "alpha", Host: "localhost", Port: 1234},
	}
	oldStdin := os.Stdin
	r, w, _ := os.Pipe()
	os.Stdin = r
	_, _ = w.WriteString("abc\n")
	w.Close()
	_, err := promptPeerSelection(peers)
	os.Stdin = oldStdin
	if err == nil {
		t.Error("want error for non-integer input")
	}
}

// --- isTerminal ---

func TestIsTerminal_InTest(t *testing.T) {
	// In test environment stdin is not a TTY; just ensure it doesn't panic.
	_ = isTerminal()
}

// --- cmdRelay cert/key validation (#473) ---

func TestCmdRelay_CertOnly(t *testing.T) {
	cmd := cmdRelay()
	cmd.SetArgs([]string{"--cert", "server.pem"})
	err := cmd.Execute()
	if err == nil {
		t.Error("want error when --cert is given without --key")
	}
}

func TestCmdRelay_KeyOnly(t *testing.T) {
	cmd := cmdRelay()
	cmd.SetArgs([]string{"--key", "server.key"})
	err := cmd.Execute()
	if err == nil {
		t.Error("want error when --key is given without --cert")
	}
}

// --- loadConfig ---

func TestLoadConfig_NoFile(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	globalCfg = nil
	if err := loadConfig(); err != nil {
		t.Fatal(err)
	}
	if globalCfg == nil {
		t.Error("want non-nil globalCfg")
	}
}

func TestLoadConfig_Cached(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	globalCfg = nil
	_ = loadConfig()
	first := globalCfg
	_ = loadConfig() // second call should return cached
	if first != globalCfg {
		t.Error("want same pointer on second call (cached)")
	}
}
