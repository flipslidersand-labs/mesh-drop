package nat

import (
	"net/http/httptest"
	"strings"
	"testing"
)

func TestRelayRoundtrip(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}
	if len(code) != 6 {
		t.Fatalf("expected 6-char code, got %q", code)
	}

	const receiverAddr = "1.2.3.4:44444"
	const senderAddr = "5.6.7.8:12345"

	peerCh := make(chan string, 1)
	errCh := make(chan error, 1)

	// receiver registers first (blocks until sender joins)
	go func() {
		peer, err := Rendezvous(ts.URL, code, receiverAddr)
		if err != nil {
			errCh <- err
			return
		}
		peerCh <- peer
	}()

	// sender joins: should immediately see receiver's addr
	senderPeer, err := Rendezvous(ts.URL, code, senderAddr)
	if err != nil {
		t.Fatal(err)
	}
	if senderPeer != receiverAddr {
		t.Errorf("sender peer = %q, want %q", senderPeer, receiverAddr)
	}

	select {
	case receiverPeer := <-peerCh:
		if receiverPeer != senderAddr {
			t.Errorf("receiver peer = %q, want %q", receiverPeer, senderAddr)
		}
	case err := <-errCh:
		t.Fatal(err)
	}
}

func TestRelayUnknownCode(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	_, err := Rendezvous(ts.URL, "ZZZZZZ", "1.2.3.4:9999")
	if err == nil {
		t.Fatal("expected error for unknown code")
	}
}

func TestRandomCode(t *testing.T) {
	got := randomCode(6)
	if len(got) != 6 {
		t.Fatalf("len=%d, want 6", len(got))
	}
	for _, c := range got {
		if !strings.ContainsRune("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c) {
			t.Errorf("unexpected char %q in code %q", c, got)
		}
	}
}
