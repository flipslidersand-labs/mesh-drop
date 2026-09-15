package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
)

// --- cmdReceive ---

func TestCmdReceive_Construction(t *testing.T) {
	cmd := cmdReceive()
	if cmd.Use != "receive" {
		t.Errorf("want Use=receive, got %q", cmd.Use)
	}
	if cmd.PreRunE == nil || cmd.RunE == nil {
		t.Error("want non-nil PreRunE and RunE")
	}
	f := cmd.Flags().Lookup("port")
	if f == nil {
		t.Fatal("want --port flag registered")
	}
}

func TestCmdReceive_PreRunE_InvalidPort(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	globalCfg = nil

	cmd := cmdReceive()
	if err := cmd.Flags().Set("port", "0"); err != nil {
		t.Fatal(err)
	}
	err := cmd.PreRunE(cmd, nil)
	if err == nil || !strings.Contains(err.Error(), "--port must be between") {
		t.Errorf("want port range error, got %v", err)
	}
}

func TestCmdReceive_PreRunE_InvalidPort_TooLarge(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	globalCfg = nil

	cmd := cmdReceive()
	if err := cmd.Flags().Set("port", "70000"); err != nil {
		t.Fatal(err)
	}
	err := cmd.PreRunE(cmd, nil)
	if err == nil || !strings.Contains(err.Error(), "--port must be between") {
		t.Errorf("want port range error, got %v", err)
	}
}

// --- cmdUI ---

func TestCmdUI_Construction(t *testing.T) {
	cmd := cmdUI()
	if cmd.Use != "ui" {
		t.Errorf("want Use=ui, got %q", cmd.Use)
	}
	if cmd.PreRunE == nil || cmd.RunE == nil {
		t.Error("want non-nil PreRunE and RunE")
	}
}

func TestCmdUI_PreRunE_InvalidPort(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	globalCfg = nil

	cmd := cmdUI()
	if err := cmd.Flags().Set("port", "-1"); err != nil {
		t.Fatal(err)
	}
	err := cmd.PreRunE(cmd, nil)
	if err == nil || !strings.Contains(err.Error(), "--port must be between") {
		t.Errorf("want port range error, got %v", err)
	}
}

func TestCmdUI_PreRunE_AuthTokenFromFlag(t *testing.T) {
	tmp := t.TempDir()
	t.Setenv("XDG_CONFIG_HOME", tmp)
	globalCfg = nil
	uiAuthToken = ""

	cmd := cmdUI()
	if err := cmd.Flags().Set("auth-token", "s3cret"); err != nil {
		t.Fatal(err)
	}
	if err := cmd.PreRunE(cmd, nil); err != nil {
		t.Fatal(err)
	}
	if uiAuthToken != "s3cret" {
		t.Errorf("want uiAuthToken=s3cret, got %q", uiAuthToken)
	}
}

// --- cmdInfo ---

func TestCmdInfo_Construction(t *testing.T) {
	cmd := cmdInfo()
	if cmd.Use != "info" {
		t.Errorf("want Use=info, got %q", cmd.Use)
	}
	f := cmd.Flags().Lookup("stun")
	if f == nil {
		t.Fatal("want --stun flag registered")
	}
	if cmd.RunE == nil {
		t.Error("want non-nil RunE")
	}
}

// --- openBrowser ---

func TestOpenBrowser_NoPanic(t *testing.T) {
	// exec.Command(...).Start() is non-blocking; even if the browser binary
	// doesn't exist in the CI sandbox, Start() returns quickly with an
	// (ignored) error rather than blocking or panicking.
	openBrowser("http://127.0.0.1:0")
}

// --- receiveNAT ---

func TestReceiveNAT_CreateSessionPermanentError(t *testing.T) {
	// A 4xx response makes nat.CreateSession fail immediately (permanent
	// error, no retries), so this exercises receiveNAT's error path without
	// any real network dependency or delay.
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte("bad request"))
	}))
	defer srv.Close()

	err := receiveNAT(t.Context(), 9999, srv.URL, false)
	if err == nil || !strings.Contains(err.Error(), "relay:") {
		t.Errorf("want relay error, got %v", err)
	}
}

// --- sendToAll ---

func TestSendToAll_TargetNotExist(t *testing.T) {
	err := sendToAll(t.Context(), nil, "/nonexistent/path/xyz", 4, nil, nil, false, 0, false)
	if err == nil {
		t.Error("want error for nonexistent target")
	}
	if !os.IsNotExist(underlyingPathErr(err)) {
		t.Errorf("want a not-exist error, got %v", err)
	}
}

func underlyingPathErr(err error) error {
	type unwrapper interface{ Unwrap() error }
	for {
		if u, ok := err.(unwrapper); ok {
			err = u.Unwrap()
			continue
		}
		return err
	}
}
