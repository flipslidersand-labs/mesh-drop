package nat

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"time"
)

// ---------------------------------------------------------------------------
// #158: relay slot race tests
// ---------------------------------------------------------------------------

// TestRelaySlotRace_TwoPeers verifies that two simultaneous POSTs to the same
// session code complete a valid rendezvous and each receives the other's
// address, regardless of which goroutine wins the "first" slot.
func TestRelaySlotRace_TwoPeers(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	const addrA = "10.0.0.1:11111"
	const addrB = "10.0.0.2:22222"

	type result struct {
		peer string
		err  error
	}
	chA := make(chan result, 1)
	chB := make(chan result, 1)

	var ready sync.WaitGroup
	ready.Add(2)
	go func() {
		ready.Done()
		ready.Wait()
		peer, err := Rendezvous(ts.URL, code, addrA)
		chA <- result{peer, err}
	}()
	go func() {
		ready.Done()
		ready.Wait()
		peer, err := Rendezvous(ts.URL, code, addrB)
		chB <- result{peer, err}
	}()

	resA := <-chA
	resB := <-chB

	if resA.err != nil {
		t.Fatalf("peer A rendezvous error: %v", resA.err)
	}
	if resB.err != nil {
		t.Fatalf("peer B rendezvous error: %v", resB.err)
	}

	// Each peer must receive the other's address (swap).
	if resA.peer == resB.peer {
		t.Errorf("both peers got the same address %q — address exchange is broken", resA.peer)
	}
	if resA.peer != addrA && resA.peer != addrB {
		t.Errorf("peer A got unexpected address %q", resA.peer)
	}
	if resB.peer != addrA && resB.peer != addrB {
		t.Errorf("peer B got unexpected address %q", resB.peer)
	}
}

// TestRelaySlotRace_ThirdPeer verifies that a third POST sent after a
// legitimate rendezvous has completed returns an error status (the session
// should have been deleted), and does not corrupt the already-exchanged data.
func TestRelaySlotRace_ThirdPeer(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	const addrA = "10.0.0.1:11111"
	const addrB = "10.0.0.2:22222"
	const addrC = "10.0.0.3:33333"

	// Complete a legitimate rendezvous first.
	// readyA is closed just before peer A calls Rendezvous so that peer B only
	// dials after the server has registered A's long-poll, removing the need for
	// a fixed time.Sleep to sequence the two goroutines.
	readyA := make(chan struct{})
	errCh := make(chan error, 1)
	go func() {
		close(readyA)
		_, err := Rendezvous(ts.URL, code, addrA)
		errCh <- err
	}()
	<-readyA // wait until peer A's goroutine has started
	if _, err := Rendezvous(ts.URL, code, addrB); err != nil {
		t.Fatalf("peer B rendezvous error: %v", err)
	}
	if err := <-errCh; err != nil {
		t.Fatalf("peer A rendezvous error: %v", err)
	}

	// Session is now deleted. Third peer must get a non-2xx response.
	resp, err := http.Post(ts.URL+"/session/"+code, "text/plain", strings.NewReader(addrC))
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		t.Errorf("third peer to completed session got 200, expected an error status")
	}
}

// TestRelaySlotRace_ThreeConcurrent fires three goroutines at the same session
// code simultaneously. Exactly two must succeed and one must fail, because a
// session only supports one pair exchange.
func TestRelaySlotRace_ThreeConcurrent(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	addrs := []string{"10.1.1.1:1001", "10.1.1.2:1002", "10.1.1.3:1003"}
	type res struct {
		status int
		err    error
	}
	results := make([]chan res, 3)
	for i := range results {
		results[i] = make(chan res, 1)
	}

	// Give the third peer enough time to be rejected by a 30s long-poll or a
	// 404 after the session is deleted. Use 35s client timeout.
	client := &http.Client{Timeout: 35 * time.Second}

	var start sync.WaitGroup
	start.Add(3)
	for i, addr := range addrs {
		i, addr := i, addr
		go func() {
			start.Done()
			start.Wait()
			resp, err := client.Post(
				ts.URL+"/session/"+code,
				"text/plain",
				strings.NewReader(addr),
			)
			if err != nil {
				results[i] <- res{err: err}
				return
			}
			io.Copy(io.Discard, resp.Body) //nolint:errcheck
			resp.Body.Close()
			results[i] <- res{status: resp.StatusCode}
		}()
	}

	successes := 0
	failures := 0
	for _, ch := range results {
		r := <-ch
		if r.err == nil && r.status == http.StatusOK {
			successes++
		} else {
			failures++
		}
	}

	if successes != 2 {
		t.Errorf("expected exactly 2 successful rendezvous, got %d", successes)
	}
	if failures != 1 {
		t.Errorf("expected exactly 1 failure, got %d", failures)
	}
}

// ---------------------------------------------------------------------------
// #191: handleCreate / handleJoin error paths
// ---------------------------------------------------------------------------

// TestHandleCreate_WrongMethod verifies that GET to /session returns 405.
func TestHandleCreate_WrongMethod(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/session")
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf("GET /session: got %d, want 405", resp.StatusCode)
	}
}

// TestHandleJoin_WrongMethod verifies that GET to /session/<code> returns 405.
func TestHandleJoin_WrongMethod(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/session/ABCDEF123456")
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf("GET /session/code: got %d, want 405", resp.StatusCode)
	}
}

// TestHandleJoin_NonExistentCode verifies that posting to an unknown code
// returns 404 — not a panic, not a 200.
func TestHandleJoin_NonExistentCode(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	resp, err := http.Post(ts.URL+"/session/DOESNOTEXIST", "text/plain", strings.NewReader("1.2.3.4:9999"))
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("unknown code: got %d, want 404", resp.StatusCode)
	}
}

// TestHandleJoin_EmptyBody verifies that a request with no body returns 400.
func TestHandleJoin_EmptyBody(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := http.Post(ts.URL+"/session/"+code, "text/plain", strings.NewReader(""))
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("empty body: got %d, want 400", resp.StatusCode)
	}
}

// TestHandleJoin_InvalidAddrFormat verifies that a malformed address (no port)
// is rejected with 400.
func TestHandleJoin_InvalidAddrFormat(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	resp, err := http.Post(ts.URL+"/session/"+code, "text/plain", strings.NewReader("notanaddr"))
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("invalid addr format: got %d, want 400", resp.StatusCode)
	}
}

// TestHandleJoin_AddrTooLong verifies that an oversized body is rejected with 400.
func TestHandleJoin_AddrTooLong(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	longAddr := strings.Repeat("x", 65) // exceeds maxAddrLen = 64
	resp, err := http.Post(ts.URL+"/session/"+code, "text/plain", strings.NewReader(longAddr))
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("addr too long: got %d, want 400", resp.StatusCode)
	}
}

// TestHandleJoin_Timeout_ViaContext verifies that when only one peer registers
// and no second peer arrives, the long-poll path returns 408. To avoid waiting
// the full 30s we inject a request context that expires in 1ms; the handler's
// internal context.WithTimeout(r.Context(), joinWaitTimeout) inherits the
// parent deadline and fires almost immediately.
func TestHandleJoin_Timeout_ViaContext(t *testing.T) {
	srv := NewRelayServer()

	sess := &rdv{chB: make(chan string, 1), done: make(chan struct{})}
	const code = "TIMEOUT000001"
	srv.mu.Lock()
	srv.sessions[code] = sess
	srv.mu.Unlock()

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/session/"+code, strings.NewReader("9.9.9.9:12345"))

	ctx, cancel := context.WithTimeout(req.Context(), 1*time.Millisecond)
	defer cancel()
	req = req.WithContext(ctx)

	srv.handleJoin(w, req)

	if w.Code != http.StatusRequestTimeout {
		t.Errorf("timeout path: got %d, want 408", w.Code)
	}
}

// TestHandleCreate_RateLimit verifies that a single IP cannot create more than
// rateMaxCreate sessions per rateWindow.
func TestHandleCreate_RateLimit(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"127.0.0.1"})
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	const clientIP = "192.0.2.1"

	for i := 0; i < rateMaxCreate; i++ {
		req, _ := http.NewRequest(http.MethodPost, ts.URL+"/session", nil)
		req.Header.Set("X-Forwarded-For", clientIP)
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			t.Fatal(err)
		}
		resp.Body.Close()
		if resp.StatusCode == http.StatusTooManyRequests {
			t.Fatalf("create rate limit triggered too early at request %d", i+1)
		}
	}

	req, _ := http.NewRequest(http.MethodPost, ts.URL+"/session", nil)
	req.Header.Set("X-Forwarded-For", clientIP)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusTooManyRequests {
		t.Errorf("expected 429 after create rate limit, got %d", resp.StatusCode)
	}
}

// TestHandleCreate_RateLimit_DifferentIPs verifies that two different IPs each
// have independent create-rate-limit buckets.
func TestHandleCreate_RateLimit_DifferentIPs(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"127.0.0.1"})
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	exhaust := func(ip string) {
		for i := 0; i < rateMaxCreate; i++ {
			req, _ := http.NewRequest(http.MethodPost, ts.URL+"/session", nil)
			req.Header.Set("X-Forwarded-For", ip)
			resp, _ := http.DefaultClient.Do(req)
			if resp != nil {
				resp.Body.Close()
			}
		}
	}

	exhaust("192.0.2.10")

	req, _ := http.NewRequest(http.MethodPost, ts.URL+"/session", nil)
	req.Header.Set("X-Forwarded-For", "192.0.2.11")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode == http.StatusTooManyRequests {
		t.Errorf("independent IP should not be rate-limited, got %d", resp.StatusCode)
	}
}

// TestRelayCode12Chars is a regression guard for the 6 → 12 character code
// expansion (issue #161). CreateSession must return exactly 12 characters.
func TestRelayCode12Chars(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	// Iterate up to rateMaxCreate times to stay within per-IP create rate limit.
	for i := 0; i < rateMaxCreate; i++ {
		code, err := CreateSession(ts.URL)
		if err != nil {
			t.Fatal(err)
		}
		if len(code) != 12 {
			t.Errorf("iteration %d: code len=%d, want 12; code=%q", i, len(code), code)
		}
	}
}

// TestIsTrustedProxy_CIDR verifies CIDR-based proxy matching (issue #162).
func TestIsTrustedProxy_CIDR(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"10.0.0.0/8", "192.168.1.1"})

	cases := []struct {
		ip   string
		want bool
	}{
		{"10.1.2.3", true},
		{"10.255.255.255", true},
		{"192.168.1.1", true},
		{"192.168.1.2", false},
		{"172.16.0.1", false},
		{"8.8.8.8", false},
	}
	for _, tc := range cases {
		got := srv.isTrustedProxy(tc.ip)
		if got != tc.want {
			t.Errorf("isTrustedProxy(%q) = %v, want %v", tc.ip, got, tc.want)
		}
	}
}

// TestAllowRate_WindowReset verifies that after rateWindow has elapsed the
// sliding window resets and a previously exhausted IP is allowed again.
func TestAllowRate_WindowReset(t *testing.T) {
	srv := NewRelayServer()
	srv.mu.Lock()
	defer srv.mu.Unlock()

	const ip = "1.2.3.4"

	for i := 0; i < rateMaxJoin; i++ {
		if !srv.allowJoin(ip) {
			t.Fatalf("allowJoin blocked too early at request %d", i+1)
		}
	}
	if srv.allowJoin(ip) {
		t.Fatal("expected allowJoin to return false after exhaustion")
	}

	// Backdate the bucket to simulate window expiry.
	srv.ipRate[ip].since = time.Now().Add(-rateWindow - time.Second)

	if !srv.allowJoin(ip) {
		t.Fatal("expected allowJoin to return true after window reset")
	}
}

// TestRendezvous_SessionDeletedAfterSuccess checks that after a complete
// rendezvous the session entry is removed from the map (no session leak).
func TestRendezvous_SessionDeletedAfterSuccess(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	// readyA is closed just before peer A calls Rendezvous so that peer B only
	// dials after the server has registered A's long-poll, removing the need for
	// a fixed time.Sleep to sequence the two goroutines.
	readyA := make(chan struct{})
	errCh := make(chan error, 1)
	go func() {
		close(readyA)
		_, err := Rendezvous(ts.URL, code, "10.0.1.1:5001")
		errCh <- err
	}()
	<-readyA // wait until peer A's goroutine has started
	if _, err := Rendezvous(ts.URL, code, "10.0.1.2:5002"); err != nil {
		t.Fatal(err)
	}
	if err := <-errCh; err != nil {
		t.Fatal(err)
	}

	// The session delete happens synchronously inside handleJoin before the
	// HTTP response is written, so by the time both Rendezvous calls have
	// returned the map entry is guaranteed to be gone — no sleep needed.
	srv.mu.Lock()
	_, exists := srv.sessions[code]
	srv.mu.Unlock()
	if exists {
		t.Error("session should be deleted after successful rendezvous")
	}
}

// TestHandleCreate_MaxSessionsRejection verifies the 503 path: when the session
// map is full the server rejects new creates, and recovers once the map is
// cleared.
func TestHandleCreate_MaxSessionsRejection(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// Fill the map directly to avoid hitting the per-IP create rate limit.
	srv.mu.Lock()
	for i := 0; i < defaultMaxSessions; i++ {
		key := fmt.Sprintf("FILL%08d", i)
		srv.sessions[key] = &rdv{chB: make(chan string, 1), done: make(chan struct{})}
	}
	srv.mu.Unlock()

	resp, err := http.Post(ts.URL+"/session", "text/plain", nil)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusServiceUnavailable {
		t.Errorf("expected 503 when defaultMaxSessions reached, got %d", resp.StatusCode)
	}

	// Clear the map; the next create must succeed.
	srv.mu.Lock()
	srv.sessions = make(map[string]*rdv)
	srv.mu.Unlock()

	resp, err = http.Post(ts.URL+"/session", "text/plain", nil)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected 200 after clearing sessions, got %d", resp.StatusCode)
	}
}

// TestRealIP_CIDR_TrustedProxy verifies that an IP matched by CIDR still causes
// X-Forwarded-For to be honoured (#162).
func TestRealIP_CIDR_TrustedProxy(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"10.0.0.0/8"})
	r := &http.Request{
		RemoteAddr: "10.5.5.5:443",
		Header:     http.Header{"X-Forwarded-For": []string{"203.0.113.7"}},
	}
	if got := srv.realIP(r); got != "203.0.113.7" {
		t.Errorf("CIDR trusted proxy: realIP = %q, want 203.0.113.7", got)
	}
}

// TestRealIP_NoXFFHeader verifies that when a trusted proxy sends no
// X-Forwarded-For and no X-Real-IP, the RemoteAddr host is returned.
func TestRealIP_NoXFFHeader(t *testing.T) {
	srv := NewRelayServerWithProxies([]string{"10.0.0.1"})
	r := &http.Request{
		RemoteAddr: "10.0.0.1:80",
		Header:     http.Header{},
	}
	if got := srv.realIP(r); got != "10.0.0.1" {
		t.Errorf("trusted proxy, no XFF: realIP = %q, want 10.0.0.1", got)
	}
}
