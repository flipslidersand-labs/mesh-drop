package nat

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestRetryWithBackoff_SucceedsOnFirstAttempt(t *testing.T) {
	calls := 0
	got, err := retryWithBackoff("test", 3, time.Millisecond, func() (int, error) {
		calls++
		return 42, nil
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 42 {
		t.Fatalf("expected 42, got %d", got)
	}
	if calls != 1 {
		t.Fatalf("expected 1 call, got %d", calls)
	}
}

func TestRetryWithBackoff_RetriesOnTransientError(t *testing.T) {
	calls := 0
	got, err := retryWithBackoff("test", 3, time.Millisecond, func() (string, error) {
		calls++
		if calls < 3 {
			return "", errors.New("transient")
		}
		return "ok", nil
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != "ok" {
		t.Fatalf("expected ok, got %q", got)
	}
	if calls != 3 {
		t.Fatalf("expected 3 calls, got %d", calls)
	}
}

func TestRetryWithBackoff_ReturnsLastErrorAfterExhaustion(t *testing.T) {
	calls := 0
	sentinel := errors.New("persistent failure")
	_, err := retryWithBackoff("test", 3, time.Millisecond, func() (int, error) {
		calls++
		return 0, sentinel
	})
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	if !errors.Is(err, sentinel) {
		t.Fatalf("expected sentinel in error chain, got %v", err)
	}
	if calls != 3 {
		t.Fatalf("expected 3 calls, got %d", calls)
	}
}

func TestRetryWithBackoff_ExponentialDelay(t *testing.T) {
	delays := []time.Duration{}
	prev := time.Now()
	calls := 0
	retryWithBackoff("test", 3, 10*time.Millisecond, func() (int, error) { //nolint:errcheck
		if calls > 0 {
			delays = append(delays, time.Since(prev))
		}
		prev = time.Now()
		calls++
		return 0, errors.New("fail")
	})
	// delay[0] ≈ 10ms, delay[1] ≈ 20ms — each should be ≥ previous
	if len(delays) == 2 && delays[1] < delays[0] {
		t.Fatalf("delays not exponential: %v < %v", delays[1], delays[0])
	}
}

func TestCreateSession_Retries503(t *testing.T) {
	calls := 0
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		calls++
		if calls < 3 {
			http.Error(w, "unavailable", http.StatusServiceUnavailable)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"code":"ABCDEF123456"}`)) //nolint:errcheck
	}))
	defer ts.Close()

	code, err := CreateSession(ts.URL)
	if err != nil {
		t.Fatalf("expected success after retries, got: %v", err)
	}
	if code != "ABCDEF123456" {
		t.Fatalf("expected ABCDEF123456, got %q", code)
	}
	if calls != 3 {
		t.Fatalf("expected 3 calls, got %d", calls)
	}
}

func TestPermanentError_ErrorAndUnwrap(t *testing.T) {
	inner := errors.New("underlying cause")
	pe := &permanentError{err: inner}
	if pe.Error() != "underlying cause" {
		t.Errorf("Error() = %q, want %q", pe.Error(), "underlying cause")
	}
	if pe.Unwrap() != inner {
		t.Errorf("Unwrap() = %v, want %v", pe.Unwrap(), inner)
	}
	if !errors.Is(pe, inner) {
		t.Error("errors.Is(pe, inner) should be true")
	}
}

func TestCreateSession_NoPermanentRetryOn4xx(t *testing.T) {
	calls := 0
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		calls++
		http.Error(w, "too many requests", http.StatusTooManyRequests)
	}))
	defer ts.Close()

	_, err := CreateSession(ts.URL)
	if err == nil {
		t.Fatal("expected error for 429, got nil")
	}
	if calls != 1 {
		t.Fatalf("expected 1 call (no retry on 4xx), got %d", calls)
	}
}
