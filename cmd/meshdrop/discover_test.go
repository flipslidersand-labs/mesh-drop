package main

import (
	"context"
	"errors"
	"io"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
)

func stubBrowse(t *testing.T, peers []discovery.Peer, err error) {
	t.Helper()
	orig := browseFn
	browseFn = func(context.Context, time.Duration) ([]discovery.Peer, error) { return peers, err }
	t.Cleanup(func() { browseFn = orig })
}

func stubTerminal(t *testing.T, v bool) {
	t.Helper()
	orig := isTerminal
	isTerminal = func() bool { return v }
	t.Cleanup(func() { isTerminal = orig })
}

// stubStdin は os.Stdin を input の内容を返すパイプに差し替える。
func stubStdin(t *testing.T, input string) {
	t.Helper()
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	if _, err := io.WriteString(w, input); err != nil {
		t.Fatal(err)
	}
	w.Close()
	orig := os.Stdin
	os.Stdin = r
	t.Cleanup(func() { os.Stdin = orig; r.Close() })
}

var testPeers = []discovery.Peer{
	{Name: "alpha", Port: 1, IP: "10.0.0.1"},
	{Name: "beta", Port: 2, IP: "10.0.0.2"},
}

func TestDiscoverAndSelect(t *testing.T) {
	browseErr := errors.New("browse boom")
	tests := []struct {
		name     string
		peers    []discovery.Peer
		browse   error
		terminal bool
		stdin    string
		want     string
		wantErr  string
	}{
		{name: "browse error", browse: browseErr, wantErr: "browse boom"},
		{name: "zero peers shows relay hint", wantErr: "--relay <RELAY_URL>"},
		{name: "single peer auto-selected", peers: testPeers[:1], terminal: true, want: "alpha"},
		{name: "multiple, non-terminal picks first", peers: testPeers, want: "alpha"},
		{name: "multiple, terminal picks by number", peers: testPeers, terminal: true, stdin: "2\n", want: "beta"},
		{name: "multiple, terminal empty input defaults to first", peers: testPeers, terminal: true, stdin: "\n", want: "alpha"},
		{name: "multiple, terminal invalid input", peers: testPeers, terminal: true, stdin: "9\n", wantErr: "invalid selection"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			stubBrowse(t, tt.peers, tt.browse)
			stubTerminal(t, tt.terminal)
			stubStdin(t, tt.stdin)
			got, err := discoverAndSelect(context.Background(), time.Second)
			if tt.wantErr != "" {
				if err == nil || !strings.Contains(err.Error(), tt.wantErr) {
					t.Fatalf("err = %v, want containing %q", err, tt.wantErr)
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got.Name != tt.want {
				t.Errorf("selected %q, want %q", got.Name, tt.want)
			}
		})
	}
}

func TestDiscoverAll(t *testing.T) {
	t.Run("browse error", func(t *testing.T) {
		stubBrowse(t, nil, errors.New("boom"))
		if _, err := discoverAll(context.Background(), time.Second); err == nil || !strings.Contains(err.Error(), "boom") {
			t.Fatalf("err = %v", err)
		}
	})
	t.Run("zero peers shows relay hint", func(t *testing.T) {
		stubBrowse(t, nil, nil)
		if _, err := discoverAll(context.Background(), time.Second); err == nil || !strings.Contains(err.Error(), "--relay <RELAY_URL>") {
			t.Fatalf("err = %v", err)
		}
	})
	t.Run("returns all peers", func(t *testing.T) {
		stubBrowse(t, testPeers, nil)
		got, err := discoverAll(context.Background(), time.Second)
		if err != nil || len(got) != 2 {
			t.Fatalf("got %v, err %v", got, err)
		}
	})
}
