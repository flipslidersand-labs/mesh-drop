package webui

import (
	"bytes"
	"context"
	"encoding/json"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestNew(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	if s == nil {
		t.Fatal("New returned nil")
	}
}

func TestHub_PubSub(t *testing.T) {
	h := newHub()
	ch := h.subscribe()
	defer h.unsubscribe(ch)

	ev := ProgressEvent{ID: "1", File: "foo.txt", Peer: "peer1", Done: true}
	h.publish(ev)

	select {
	case got := <-ch:
		if got.ID != "1" || got.File != "foo.txt" {
			t.Fatalf("unexpected event: %+v", got)
		}
	case <-time.After(time.Second):
		t.Fatal("timeout waiting for event")
	}
}

func TestHub_Unsubscribe(t *testing.T) {
	h := newHub()
	ch := h.subscribe()
	h.unsubscribe(ch)

	h.mu.Lock()
	_, ok := h.clients[ch]
	h.mu.Unlock()
	if ok {
		t.Fatal("client still present after unsubscribe")
	}
}

func TestHub_PublishNoBlock(t *testing.T) {
	h := newHub()
	ch := h.subscribe()
	defer h.unsubscribe(ch)

	// Fill the channel buffer.
	for i := 0; i < 40; i++ {
		h.publish(ProgressEvent{ID: "x"})
	}
	// Must not block even when buffer is full.
}

func TestHandleSSE_MethodAndHeaders(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := httptest.NewRequest(http.MethodGet, "/sse/progress", nil)
	ctx, cancel := context.WithTimeout(req.Context(), 50*time.Millisecond)
	defer cancel()
	req = req.WithContext(ctx)

	rr := httptest.NewRecorder()
	s.handleSSE(rr, req)

	if ct := rr.Header().Get("Content-Type"); !strings.HasPrefix(ct, "text/event-stream") {
		t.Fatalf("expected text/event-stream, got %q", ct)
	}
}

func TestHandleSend_MethodNotAllowed(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := httptest.NewRequest(http.MethodGet, "/api/send", nil)
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusMethodNotAllowed {
		t.Fatalf("expected 405, got %d", rr.Code)
	}
}

func TestHandleSend_MissingPeer(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	body := strings.NewReader("--boundary\r\nContent-Disposition: form-data; name=\"peer\"\r\n\r\n\r\n--boundary--")
	req := httptest.NewRequest(http.MethodPost, "/api/send", body)
	req.Header.Set("Content-Type", "multipart/form-data; boundary=boundary")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rr.Code)
	}
}

func TestHandleSendDir_RejectsMultipleTopLevelDirectories(t *testing.T) {
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", "127.0.0.1:1")
	_ = w.WriteField("paths", `["a/one.txt","b/two.txt"]`)
	for _, name := range []string{"one.txt", "two.txt"} {
		part, err := w.CreateFormFile("files", name)
		if err != nil {
			t.Fatal(err)
		}
		_, _ = part.Write([]byte("x"))
	}
	if err := w.Close(); err != nil {
		t.Fatal(err)
	}

	s := New("127.0.0.1:0", time.Second)
	req := httptest.NewRequest(http.MethodPost, "/api/send-dir", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d: %s", rr.Code, rr.Body.String())
	}
}

func TestHandlePeers_ReturnsJSON(t *testing.T) {
	s := New("127.0.0.1:0", 50*time.Millisecond)
	req := httptest.NewRequest(http.MethodGet, "/api/peers", nil)
	rr := httptest.NewRecorder()
	s.handlePeers(rr, req)

	// In a test environment there are no mDNS peers, so result is [] or error.
	// Either way the response must be valid JSON or an HTTP error.
	if rr.Code == http.StatusOK {
		var out []interface{}
		if err := json.Unmarshal(rr.Body.Bytes(), &out); err != nil {
			t.Fatalf("body is not valid JSON: %v — body: %s", err, rr.Body.String())
		}
	}
}
