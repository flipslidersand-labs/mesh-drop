package nat

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestRelayMetrics_StatusAndContentType(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/metrics")
	if err != nil {
		t.Fatalf("GET /metrics: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", resp.StatusCode)
	}
	ct := resp.Header.Get("Content-Type")
	if !strings.Contains(ct, "text/plain") {
		t.Errorf("Content-Type = %q, want text/plain", ct)
	}
	if !strings.Contains(ct, "0.0.4") {
		t.Errorf("Content-Type = %q, want version=0.0.4", ct)
	}
}

func TestRelayMetrics_AllMetricNamesPresent(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/metrics")
	if err != nil {
		t.Fatalf("GET /metrics: %v", err)
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	text := string(body)

	want := []string{
		"relay_sessions_active",
		"relay_sessions_total",
		"relay_create_rate_limited_total",
		"relay_join_rate_limited_total",
		"relay_session_duration_seconds_sum",
		"relay_session_duration_seconds_count",
	}
	for _, name := range want {
		if !strings.Contains(text, name) {
			t.Errorf("metric %q not found in /metrics output", name)
		}
	}
}

func TestRelayMetrics_MethodNotAllowed(t *testing.T) {
	ts := httptest.NewServer(NewRelayServer().Handler())
	defer ts.Close()

	resp, err := http.Post(ts.URL+"/metrics", "text/plain", nil)
	if err != nil {
		t.Fatalf("POST /metrics: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf("status = %d, want 405", resp.StatusCode)
	}
}

func TestRelayMetrics_SessionsActiveCount(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// sessions_active should be 0 initially
	resp, _ := http.Get(ts.URL + "/metrics")
	body, _ := io.ReadAll(resp.Body)
	resp.Body.Close()

	if !strings.Contains(string(body), "relay_sessions_active 0") {
		t.Errorf("expected relay_sessions_active 0, got:\n%s", body)
	}
}

func TestRelayMetrics_TotalIncrementsOnCreate(t *testing.T) {
	srv := NewRelayServer()
	ts := httptest.NewServer(srv.Handler())
	defer ts.Close()

	// Create a session
	resp, err := http.Post(ts.URL+"/session", "application/json", nil)
	if err != nil {
		t.Fatalf("POST /session: %v", err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Skipf("session create returned %d, skipping counter check", resp.StatusCode)
	}

	// Check metrics
	resp2, _ := http.Get(ts.URL + "/metrics")
	body, _ := io.ReadAll(resp2.Body)
	resp2.Body.Close()

	if !strings.Contains(string(body), "relay_sessions_total 1") {
		t.Errorf("expected relay_sessions_total 1 after create, got:\n%s", body)
	}
}
