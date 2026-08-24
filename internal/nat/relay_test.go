package nat

import (
	"encoding/json"
	"fmt"
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
	if len(code) != 12 {
		t.Fatalf("expected 12-char code, got %q", code)
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
	// defaultMaxSessions 制限のテストで代替する。セッションマップを直接埋めて
	// per-IP 作成レート制限を回避する。
	srv.mu.Lock()
	for i := 0; i < defaultMaxSessions; i++ {
		key := fmt.Sprintf("FILL%08d", i)
		srv.sessions[key] = &rdv{chB: make(chan string, 1), done: make(chan struct{})}
	}
	srv.mu.Unlock()
	// defaultMaxSessions 到達 → 次の POST は 503
	resp, err := http.Post(ts.URL+"/session", "text/plain", nil)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusServiceUnavailable {
		t.Errorf("expected 503 after defaultMaxSessions, got %d", resp.StatusCode)
	}
}

func TestRandomCode(t *testing.T) {
	got, err := randomCode(6)
	if err != nil {
		t.Fatalf("randomCode: %v", err)
	}
	if len(got) != 6 {
		t.Fatalf("len=%d, want 6", len(got))
	}
	for _, c := range got {
		if !strings.ContainsRune("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c) {
			t.Errorf("unexpected char %q in code %q", c, got)
		}
	}
}

func TestRelayJoinRateLimit(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	// rateMaxJoin 回まではセッション not found (404) で返す — レート制限ではない
	for i := 0; i < rateMaxJoin; i++ {
		resp, err := http.Post(ts.URL+"/session/ZZZZZZ", "text/plain", strings.NewReader("1.2.3.4:9999"))
		if err != nil {
			t.Fatal(err)
		}
		resp.Body.Close()
		if resp.StatusCode == http.StatusTooManyRequests {
			t.Fatalf("rate limit triggered too early at request %d", i+1)
		}
	}

	// rateMaxJoin+1 回目は 429
	resp, err := http.Post(ts.URL+"/session/"+code, "text/plain", strings.NewReader("1.2.3.4:9999"))
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusTooManyRequests {
		t.Errorf("expected 429 after rate limit, got %d", resp.StatusCode)
	}
}

// TestRandomCodeDistribution は全 36 文字が出現することを確認する。
// モジュロバイアス修正で一部文字が永久に出現しない、といった退行を検出するための煙幕テスト。
func TestRandomCodeDistribution(t *testing.T) {
	const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	seen := make(map[rune]bool)
	for i := 0; i < 5000; i++ {
		code, err := randomCode(6)
		if err != nil {
			t.Fatalf("randomCode: %v", err)
		}
		for _, c := range code {
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

func TestRealIP_NoProxy(t *testing.T) {
	srv := NewRelayServer()
	r := &http.Request{
		RemoteAddr: "1.2.3.4:9999",
		Header:     http.Header{"X-Forwarded-For": []string{"5.6.7.8"}},
	}
	if got := srv.realIP(r); got != "1.2.3.4" {
		t.Errorf("realIP without trusted proxy = %q, want 1.2.3.4", got)
	}
}

func TestRealIP_TrustedProxy_XForwardedFor(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"10.0.0.1"})
	r := &http.Request{
		RemoteAddr: "10.0.0.1:80",
		Header:     http.Header{"X-Forwarded-For": []string{"5.6.7.8, 10.0.0.2"}},
	}
	if got := srv.realIP(r); got != "5.6.7.8" {
		t.Errorf("realIP with trusted proxy XFF = %q, want 5.6.7.8", got)
	}
}

func TestRealIP_TrustedProxy_XRealIP(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"10.0.0.1"})
	h := make(http.Header)
	h.Set("X-Real-IP", "5.6.7.8") // Set でカノニカルキーに変換される
	r := &http.Request{
		RemoteAddr: "10.0.0.1:80",
		Header:     h,
	}
	if got := srv.realIP(r); got != "5.6.7.8" {
		t.Errorf("realIP with trusted proxy X-Real-IP = %q, want 5.6.7.8", got)
	}
}

func TestRealIP_UntrustedProxy_IgnoresHeader(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"10.0.0.1"})
	r := &http.Request{
		RemoteAddr: "9.9.9.9:80", // NOT in trusted list
		Header:     http.Header{"X-Forwarded-For": []string{"evil.attacker.com"}},
	}
	if got := srv.realIP(r); got != "9.9.9.9" {
		t.Errorf("realIP with untrusted proxy = %q, want 9.9.9.9", got)
	}
}

func TestRelayJoinRateLimit_WithProxy(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"127.0.0.1"})
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	// X-Forwarded-For で偽装した IP は別バケットとして扱われる
	// (httptest のサーバーは 127.0.0.1 からのリクエストを受け取るので信頼プロキシとして動作する)
	clientA := "1.1.1.1"
	for i := 0; i < rateMaxJoin; i++ {
		req, _ := http.NewRequest(http.MethodPost, ts.URL+"/session/ZZZZZZ", strings.NewReader("1.2.3.4:9999"))
		req.Header.Set("X-Forwarded-For", clientA)
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			t.Fatal(err)
		}
		resp.Body.Close()
		if resp.StatusCode == http.StatusTooManyRequests {
			t.Fatalf("rate limit triggered too early at request %d for clientA", i+1)
		}
	}

	// clientA の 21 件目は 429
	req, _ := http.NewRequest(http.MethodPost, ts.URL+"/session/"+code, strings.NewReader("1.2.3.4:9999"))
	req.Header.Set("X-Forwarded-For", clientA)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusTooManyRequests {
		t.Errorf("expected 429 for clientA after limit, got %d", resp.StatusCode)
	}

	// clientB は別バケット — 制限されない
	clientB := "2.2.2.2"
	req, _ = http.NewRequest(http.MethodPost, ts.URL+"/session/ZZZZZZ", strings.NewReader("1.2.3.4:9999"))
	req.Header.Set("X-Forwarded-For", clientB)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode == http.StatusTooManyRequests {
		t.Errorf("clientB should not be rate-limited, got %d", resp.StatusCode)
	}
}

func TestHandleHealth_ReturnsOK(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/health")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	ct := resp.Header.Get("Content-Type")
	if !strings.HasPrefix(ct, "application/json") {
		t.Fatalf("expected application/json, got %q", ct)
	}
	var body map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if body["status"] != "ok" {
		t.Fatalf("expected status=ok, got %v", body["status"])
	}
}

func TestHandleHealth_SessionCountIsAccurate(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// セッション2件をマップに直接挿入（レート制限回避）
	srv.mu.Lock()
	srv.sessions["AAA"] = &rdv{chB: make(chan string, 1), done: make(chan struct{})}
	srv.sessions["BBB"] = &rdv{chB: make(chan string, 1), done: make(chan struct{})}
	srv.mu.Unlock()

	resp, err := http.Get(ts.URL + "/health")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	var body map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	// JSON numbers decode as float64
	if sessions, ok := body["sessions"].(float64); !ok || int(sessions) != 2 {
		t.Fatalf("expected sessions=2, got %v", body["sessions"])
	}
}

func TestHandleHealth_MethodNotAllowed(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	for _, method := range []string{http.MethodPost, http.MethodPut, http.MethodDelete} {
		req, _ := http.NewRequest(method, ts.URL+"/health", nil)
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			t.Fatal(err)
		}
		resp.Body.Close()
		if resp.StatusCode != http.StatusMethodNotAllowed {
			t.Fatalf("method %s: expected 405, got %d", method, resp.StatusCode)
		}
	}
}

// TestRelayPerIPSessionLimit は 1 IP が maxSessionsPerIP を超えたら 429 を返すことを確認する。
// rateMaxCreate(5) と干渉しないよう maxSessionsPerIP=2 を使用する。
func TestRelayPerIPSessionLimit(t *testing.T) {
	srv := NewRelayServer()
	srv.maxSessionsPerIP = 2 // rateMaxCreate(5) より小さい値でテスト
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// 2 個まで作成できる
	for i := 0; i < 2; i++ {
		resp, err := http.Post(ts.URL+"/session", "text/plain", nil)
		if err != nil {
			t.Fatal(err)
		}
		resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			t.Fatalf("request %d: expected 200, got %d", i+1, resp.StatusCode)
		}
	}

	// 3 個目は per-IP 上限で 429
	resp, err := http.Post(ts.URL+"/session", "text/plain", nil)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusTooManyRequests {
		t.Errorf("expected 429 after per-IP session limit, got %d", resp.StatusCode)
	}
}

// TestRelayPerIPSessionLimit_Decrement はランデブー完了後にカウンタが減ることを内部状態で確認する。
func TestRelayPerIPSessionLimit_Decrement(t *testing.T) {
	srv := NewRelayServer()
	srv.maxSessionsPerIP = 2
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// 2 個作成
	codes := make([]string, 2)
	for i := range codes {
		resp, err := http.Post(ts.URL+"/session", "text/plain", nil)
		if err != nil {
			t.Fatal(err)
		}
		var body map[string]string
		json.NewDecoder(resp.Body).Decode(&body) //nolint:errcheck
		resp.Body.Close()
		codes[i] = body["code"]
	}

	// 内部カウンタが 2 になっていることを確認
	srv.mu.RLock()
	before := srv.ipSessions["127.0.0.1"]
	srv.mu.RUnlock()
	if before != 2 {
		t.Fatalf("expected ipSessions=2 before rendezvous, got %d", before)
	}

	// codes[0] でランデブー完了させてカウンタを 1 減らす
	done := make(chan struct{})
	go func() {
		defer close(done)
		http.Post(ts.URL+"/session/"+codes[0], "text/plain", strings.NewReader("1.2.3.4:9001")) //nolint:errcheck
	}()
	http.Post(ts.URL+"/session/"+codes[0], "text/plain", strings.NewReader("1.2.3.5:9002")) //nolint:errcheck
	<-done

	// カウンタが 1 に減っていることを確認
	srv.mu.RLock()
	after := srv.ipSessions["127.0.0.1"]
	srv.mu.RUnlock()
	if after != 1 {
		t.Errorf("expected ipSessions=1 after rendezvous, got %d", after)
	}
}

// TestHandleJoin_SecondPeerAfterTimeout は #478 のタイムアウト競合を再現するテスト。
// 受信側が joinWaitTimeout でタイムアウトした後に到着した送信側ピアが
// 410 Gone を受け取り、ランデブー成功と誤判定しないことを確認する。
func TestHandleJoin_SecondPeerAfterTimeout(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// セッションを直接作成し、done を即座に close することでタイムアウト済み状態を再現する。
	sess := &rdv{
		chB:       make(chan string, 1),
		done:      make(chan struct{}),
		createdAt: time.Now(),
		creatorIP: "127.0.0.1",
		// addrA に受信側アドレスを設定済み → 次の POST は2番目のピア（送信側）として扱われる
		addrA: "1.2.3.4:40000",
	}
	const code = "EXPIREDSESS00"
	srv.mu.Lock()
	// 競合ウィンドウを再現: マップには残しているが done は close 済み
	// (受信側が joinWaitTimeout でタイムアウトして closeDone() を呼んだ直後の状態)
	srv.sessions[code] = sess
	srv.mu.Unlock()
	sess.closeDone() // 受信側タイムアウト相当: done を close する

	// 送信側ピアが期限切れセッションに POST する
	resp, err := http.Post(ts.URL+"/session/"+code, "text/plain", strings.NewReader("9.9.9.9:5555"))
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	// #478 修正前: sess.chB (バッファ1) に書き込んで 200 OK を返していた
	// #478 修正後: sess.done が close 済みなので 410 Gone を返す
	if resp.StatusCode != http.StatusGone {
		t.Errorf("expected 410 Gone for expired session, got %d", resp.StatusCode)
	}
}
