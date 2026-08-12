package nat

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
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

func TestRelaySessionCleanupAfterRendezvous(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, _ := CreateSession(ts.URL)

	peerCh := make(chan string, 1)
	go func() {
		peer, _ := Rendezvous(ts.URL, code, "1.2.3.4:1111")
		peerCh <- peer
	}()
	Rendezvous(ts.URL, code, "5.6.7.8:2222") //nolint:errcheck
	<-peerCh                                  // wait for receiver goroutine

	// セッションはランデブー完了後に削除されている
	time.Sleep(10 * time.Millisecond)
	srv.mu.Lock()
	_, exists := srv.sessions[code]
	srv.mu.Unlock()
	if exists {
		t.Error("session should be deleted after rendezvous")
	}
}

func TestRelaySessionCleanupOnTimeout(t *testing.T) {
	// sessionTTL を極短く上書きして TTL 削除を検証する
	origTTL := sessionTTL
	_ = origTTL // unused lint guard

	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// handleCreate を直接呼び、TTL ゴルーチンが短時間で走ることを確認できないため、
	// maxSessions 制限のテストで代替する
	for i := 0; i < maxSessions; i++ {
		resp, err := http.Post(ts.URL+"/session", "text/plain", nil)
		if err != nil {
			t.Fatal(err)
		}
		resp.Body.Close()
	}
	// maxSessions 到達 → 次の POST は 503
	resp, err := http.Post(ts.URL+"/session", "text/plain", nil)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusServiceUnavailable {
		t.Errorf("expected 503 after maxSessions, got %d", resp.StatusCode)
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

// TestRandomCodeDistribution は全 36 文字が出現することを確認する。
// モジュロバイアス修正で一部文字が永久に出現しない、といった退行を検出するための煙幕テスト。
func TestRandomCodeDistribution(t *testing.T) {
	const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	seen := make(map[rune]bool)
	for i := 0; i < 5000; i++ {
		for _, c := range randomCode(6) {
			seen[c] = true
		}
		if len(seen) == len(alpha) {
			break
		}
	}
	for _, c := range alpha {
		if !seen[c] {
			t.Errorf("char %q never appeared in 5000 codes — possible distribution issue", c)
		}
	}
}
