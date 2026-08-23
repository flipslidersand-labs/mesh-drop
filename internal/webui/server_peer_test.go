package webui

import (
	"bytes"
	"context"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func buildSendRequest(t *testing.T, peer, filename string) *http.Request {
	t.Helper()
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", peer)
	part, err := w.CreateFormFile("file", filename)
	if err != nil {
		t.Fatal(err)
	}
	_, _ = part.Write([]byte("hello"))
	if err := w.Close(); err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPost, "/api/send", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	return req
}

// --- #267: invalid peer addr format returns 400 ---

func TestHandleSend_InvalidPeerAddr_ReturnsBadRequest(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequest(t, "not_an_address", "f.txt")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for invalid peer addr, got %d: %s", rr.Code, rr.Body.String())
	}
}

func TestHandleSend_PeerAddrMissingPort_ReturnsBadRequest(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequest(t, "192.168.1.1", "f.txt") // no port
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for addr missing port, got %d: %s", rr.Code, rr.Body.String())
	}
}

func TestHandleSend_EmptyPeerField_ReturnsBadRequest(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequest(t, "", "f.txt")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for empty peer, got %d: %s", rr.Code, rr.Body.String())
	}
}

func TestHandleSend_ValidPeerAddr_NotBadRequest(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequest(t, "127.0.0.1:9999", "f.txt")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)
	// Should not return 400 for a valid addr format (connection will fail but that's OK).
	if rr.Code == http.StatusBadRequest {
		body := strings.TrimSpace(rr.Body.String())
		if strings.Contains(body, "peer must be host:port") || strings.Contains(body, "peer is required") {
			t.Fatalf("valid addr 127.0.0.1:9999 should not get peer validation 400: %s", body)
		}
	}
}

// --- #261: runCtx cancel causes transfer error event ---

func TestHandleSend_RunCtxCancel_AbortsTransfer(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	// Cancel the runCtx before the transfer starts.
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	s.runCtx = ctx

	ch := s.hub.subscribe()
	defer s.hub.unsubscribe(ch)

	req := buildSendRequest(t, "127.0.0.1:9999", "f.txt")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)
	// handleSend returns 200 immediately and spawns a goroutine.
	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200 from handleSend, got %d", rr.Code)
	}

	// Wait for the error progress event from the goroutine.
	timeout := time.After(3 * time.Second)
	for {
		select {
		case ev := <-ch:
			if ev.Done && ev.ErrMsg != "" {
				return // got expected error event
			}
		case <-timeout:
			t.Fatal("timeout waiting for error progress event after runCtx cancel")
		}
	}
}

func TestHandleSend_HandlerReturn_DoesNotCancelTransfer(t *testing.T) {
	// Verify that handleSend uses s.runCtx (not r.Context()) so that the
	// HTTP handler returning does not cancel the in-flight transfer goroutine.
	s := New("127.0.0.1:0", time.Second)

	// Give runCtx a short deadline so the transfer fails quickly.
	runCtx, runCancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer runCancel()
	s.runCtx = runCtx

	ch := s.hub.subscribe()
	defer s.hub.unsubscribe(ch)

	req := buildSendRequest(t, "127.0.0.1:9999", "f.txt")
	// Cancel the request context immediately to simulate the HTTP layer closing.
	reqCtx, reqCancel := context.WithCancel(context.Background())
	req = req.WithContext(reqCtx)

	rr := httptest.NewRecorder()
	s.handleSend(rr, req)
	reqCancel() // HTTP layer is done; if r.Context() is used this would abort the transfer.

	// The goroutine must still publish a Done event driven by s.runCtx, not r.Context().
	timeout := time.After(3 * time.Second)
	for {
		select {
		case ev := <-ch:
			if ev.Done {
				return // goroutine completed despite reqCtx being cancelled
			}
		case <-timeout:
			t.Fatal("timeout: goroutine did not emit Done event — may be using r.Context() instead of s.runCtx")
		}
	}
}
