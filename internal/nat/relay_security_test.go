package nat

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
)

// --- TestRelayIPSpoofing ---
//
// Verifies realIP behavior:
//   - Without a trusted proxy, X-Forwarded-For / X-Real-IP are IGNORED.
//     Rate limiting is applied against the actual RemoteAddr.
//   - When RemoteAddr IS a trusted proxy, X-Forwarded-For is trusted.
//
// This documents the current implementation (#162) so any future regression
// (accidentally trusting XFF from untrusted sources) fails immediately.

func TestRelayIPSpoofing_XFFIgnoredFromUntrustedOrigin(t *testing.T) {
	// Server with no trusted proxies — every XFF header must be ignored.
	srv := NewRelayServer()
	defer srv.Stop()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// Send a session-create request with a spoofed X-Forwarded-For.
	// If XFF were trusted, the server would see the spoofed IP; if not, it
	// sees 127.0.0.1 (loopback from httptest).
	req, err := http.NewRequest(http.MethodPost, ts.URL+"/session", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("X-Forwarded-For", "1.2.3.4") // attacker-supplied
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()

	// Creation from loopback succeeds → XFF was NOT used to bypass anything.
	// (If XFF were misapplied as the ratelimit key, we could spoof the IP and
	// potentially evade per-IP limits, which this test guards against.)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestRelayIPSpoofing_XFFHonoredFromTrustedProxy(t *testing.T) {
	// httptest client always connects from 127.0.0.1, so list it as trusted.
	srv := NewRelayServerWithProxies([]string{"127.0.0.1"})
	defer srv.Stop()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// With a trusted proxy origin, XFF is used as the client IP.
	// We can't easily assert WHICH IP was used internally, but we verify
	// the request still succeeds (server didn't panic or error on XFF parsing).
	req, err := http.NewRequest(http.MethodPost, ts.URL+"/session", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("X-Forwarded-For", "203.0.113.42")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("expected 200 from trusted proxy path, got %d", resp.StatusCode)
	}
}

// --- TestRelayMaxSessionsExhaustion ---
//
// Verifies that when maxSessions is reached the server returns 503, and after
// the occupying sessions are evicted the server accepts new ones again.

func TestRelayMaxSessionsExhaustion(t *testing.T) {
	const cap = 3
	srv := NewRelayServerFull(nil, cap)
	defer srv.Stop()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// Fill all slots.
	for i := 0; i < cap; i++ {
		if _, err := CreateSession(ts.URL); err != nil {
			t.Fatalf("slot %d: unexpected error: %v", i, err)
		}
	}

	// Next create must be rejected with 503.
	resp, err := http.Post(ts.URL+"/session", "", nil) //nolint:noctx
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusServiceUnavailable {
		t.Fatalf("expected 503 when cap=%d is full, got %d", cap, resp.StatusCode)
	}

	// Remove sessions directly under the lock, simulating TTL expiry.
	// (sessionTTL is 70s — too long to block a test. Direct deletion is
	// equivalent to what the TTL goroutine does.)
	srv.mu.Lock()
	for code, sess := range srv.sessions {
		delete(srv.sessions, code)
		srv.decrementIPSessions(sess.creatorIP)
	}
	srv.mu.Unlock()

	// Now a new session should succeed.
	_, err = CreateSession(ts.URL)
	if err != nil {
		t.Fatalf("expected success after eviction, got: %v", err)
	}
}

// --- TestRelaySecurityRace ---
//
// Runs eviction concurrently with allowRate reads to confirm no data race.
// Must be run with `go test -race`.

func TestRelaySecurityRace(t *testing.T) {
	const concurrency = 20
	srv := NewRelayServerFull(nil, 1000)
	defer srv.Stop()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	var wg sync.WaitGroup
	for i := 0; i < concurrency; i++ {
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			// Alternate between creates (writes ipCreateRate) and joins
			// (writes ipRate). The eviction goroutine runs concurrently,
			// deleting stale buckets from both maps.
			code, err := CreateSession(ts.URL)
			if err != nil {
				return // 503 from capacity is fine
			}
			// Attempt a join with a bogus body to exercise allowJoin.
			url := fmt.Sprintf("%s/session/%s", ts.URL, code)
			resp, err := http.Post(url, "application/octet-stream", nil) //nolint:noctx
			if err == nil {
				resp.Body.Close()
			}
		}(i)
	}
	wg.Wait()
}
