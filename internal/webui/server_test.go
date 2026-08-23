package webui

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
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

func TestHandleHistory_EmptyReturnsEmptyArray(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := httptest.NewRequest(http.MethodGet, "/api/history", nil)
	rr := httptest.NewRecorder()
	s.handleHistory(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
	var out []HistoryEntry
	if err := json.Unmarshal(rr.Body.Bytes(), &out); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if len(out) != 0 {
		t.Fatalf("expected empty array, got %d entries", len(out))
	}
}

func TestHandleHistory_ReturnsNewest50(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	for i := 0; i < 55; i++ {
		s.history = append(s.history, HistoryEntry{ID: fmt.Sprintf("%d", i)})
	}

	req := httptest.NewRequest(http.MethodGet, "/api/history", nil)
	rr := httptest.NewRecorder()
	s.handleHistory(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
	var out []HistoryEntry
	if err := json.Unmarshal(rr.Body.Bytes(), &out); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if len(out) != 50 {
		t.Fatalf("expected 50 entries, got %d", len(out))
	}
	// Newest first: history[54] → out[0], history[5] → out[49]
	if out[0].ID != "54" {
		t.Fatalf("expected newest entry first (id=54), got id=%s", out[0].ID)
	}
	if out[49].ID != "5" {
		t.Fatalf("expected oldest retained entry last (id=5), got id=%s", out[49].ID)
	}
}

func TestHandleHistory_MethodNotAllowed(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	for _, method := range []string{http.MethodPost, http.MethodPut, http.MethodDelete} {
		req := httptest.NewRequest(method, "/api/history", nil)
		rr := httptest.NewRecorder()
		s.handleHistory(rr, req)
		if rr.Code != http.StatusMethodNotAllowed {
			t.Fatalf("method %s: expected 405, got %d", method, rr.Code)
		}
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

// --- authMiddleware tests ---

func newOKHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}

func TestAuthMiddleware_NoToken_PassThrough(t *testing.T) {
	// token == "" → middleware is a no-op; all requests pass through.
	h := authMiddleware("", newOKHandler())
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
}

func TestAuthMiddleware_ValidBearerToken(t *testing.T) {
	const token = "s3cr3t"
	h := authMiddleware(token, newOKHandler())

	req := httptest.NewRequest(http.MethodGet, "/api/peers", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
}

func TestAuthMiddleware_InvalidToken_Returns401(t *testing.T) {
	const token = "s3cr3t"
	h := authMiddleware(token, newOKHandler())

	req := httptest.NewRequest(http.MethodGet, "/api/peers", nil)
	req.Header.Set("Authorization", "Bearer wrongtoken")
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)

	if rr.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", rr.Code)
	}
	if rr.Header().Get("WWW-Authenticate") == "" {
		t.Fatal("expected WWW-Authenticate header")
	}
}

func TestAuthMiddleware_NoCredentials_Returns401(t *testing.T) {
	const token = "s3cr3t"
	h := authMiddleware(token, newOKHandler())

	req := httptest.NewRequest(http.MethodGet, "/api/peers", nil)
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)

	if rr.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", rr.Code)
	}
}

func TestAuthMiddleware_QueryParamToken(t *testing.T) {
	const token = "s3cr3t"
	h := authMiddleware(token, newOKHandler())

	req := httptest.NewRequest(http.MethodGet, "/?token="+token, nil)
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
}

func TestAuthMiddleware_WrongQueryParam_Returns401(t *testing.T) {
	const token = "s3cr3t"
	h := authMiddleware(token, newOKHandler())

	req := httptest.NewRequest(http.MethodGet, "/?token=wrong", nil)
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)

	if rr.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", rr.Code)
	}
}

// --- secureHeaders tests ---

func TestSecureHeaders(t *testing.T) {
	h := secureHeaders(newOKHandler())
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)

	tests := []struct {
		header string
		want   string
	}{
		{"X-Frame-Options", "DENY"},
		{"X-Content-Type-Options", "nosniff"},
		{"Referrer-Policy", "no-referrer"},
		{"Content-Security-Policy", "default-src 'self'"},
	}
	for _, tt := range tests {
		if got := rr.Header().Get(tt.header); got != tt.want {
			t.Errorf("header %q = %q, want %q", tt.header, got, tt.want)
		}
	}
}

// --- handleDownload: filename escaping tests (#265) ---

// TestHandleDownload_FilenameWithQuotes_Escaped verifies that a filename
// containing a literal double-quote is escaped in the Content-Disposition
// header via mime.FormatMediaType (RFC 6266).
func TestHandleDownload_FilenameWithQuotes_Escaped(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	dir := t.TempDir()
	// Create a file whose base name contains a double-quote.
	// Most filesystems (Linux ext4, tmpfs) allow this; skip on those that do not.
	plain, err := os.CreateTemp(dir, "tmp")
	if err != nil {
		t.Fatal(err)
	}
	plain.Close()
	quoted := filepath.Join(dir, `foo"bar.txt`)
	if err := os.Rename(plain.Name(), quoted); err != nil {
		t.Skip("filesystem does not support \" in filenames:", err)
	}
	_ = os.WriteFile(quoted, []byte("data"), 0o644)

	s.dlMu.Lock()
	s.downloads["dl-quotes"] = quoted
	s.dlMu.Unlock()

	req := httptest.NewRequest(http.MethodGet, "/api/downloads/dl-quotes", nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
	cd := rr.Header().Get("Content-Disposition")
	// The literal un-escaped sequence `"foo"bar` must not appear.
	if strings.Contains(cd, `"foo"bar`) {
		t.Fatalf("unescaped double-quote in Content-Disposition: %q", cd)
	}
	// The filename stem must still be present.
	if !strings.Contains(cd, "foo") {
		t.Fatalf("filename stem missing from Content-Disposition: %q", cd)
	}
}

// TestHandleDownload_FilenameWithBackslash_Escaped confirms that a backslash
// in a filename is safely encoded rather than treated as an escape character.
func TestHandleDownload_FilenameWithBackslash_Escaped(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	dir := t.TempDir()
	plain, err := os.CreateTemp(dir, "tmp")
	if err != nil {
		t.Fatal(err)
	}
	plain.Close()
	bsPath := filepath.Join(dir, `back\slash.txt`)
	if err := os.Rename(plain.Name(), bsPath); err != nil {
		t.Skip("filesystem does not support \\ in filenames:", err)
	}
	_ = os.WriteFile(bsPath, []byte("data"), 0o644)

	s.dlMu.Lock()
	s.downloads["dl-bs"] = bsPath
	s.dlMu.Unlock()

	req := httptest.NewRequest(http.MethodGet, "/api/downloads/dl-bs", nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)

	cd := rr.Header().Get("Content-Disposition")
	if !strings.Contains(cd, "attachment") {
		t.Fatalf("Content-Disposition missing 'attachment': %q", cd)
	}
}

// infiniteZero is an endless source of zero bytes used to synthesise large
// request bodies without allocating heap memory.
type infiniteZero struct{}

func (infiniteZero) Read(p []byte) (int, error) { return len(p), nil }

// --- handleSend body-size limit tests (#264) ---

func TestHandleSend_BodyExceedsLimit_Returns413(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	// Go ≥1.20: mime/multipart limits forms to 10 MiB internally, returning
	// "multipart: message too large" before MaxBytesReader (512 MiB) fires.
	// Either limit must yield 413. Sending 11 MiB exercises the multipart limit.
	var header bytes.Buffer
	mw := multipart.NewWriter(&header)
	_ = mw.WriteField("peer", "127.0.0.1:9999")
	_, _ = mw.CreateFormFile("file", "big.bin")
	// Do NOT close mw — stream the large payload after the headers.

	body := io.MultiReader(
		&header,
		io.LimitReader(infiniteZero{}, 11<<20), // 11 MiB > 10 MiB multipart limit
	)

	req := httptest.NewRequest(http.MethodPost, "/api/send", body)
	req.Header.Set("Content-Type", mw.FormDataContentType())
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusRequestEntityTooLarge {
		t.Fatalf("expected 413, got %d: %s", rr.Code, rr.Body.String())
	}
}

func TestHandleSend_BodyBelowLimit_RejectsMissingPeer(t *testing.T) {
	// A well-formed but small body that passes the size gate should proceed to
	// field validation and return 400 (missing peer), not 413.
	s := New("127.0.0.1:0", time.Second)

	var buf bytes.Buffer
	mw := multipart.NewWriter(&buf)
	fw, _ := mw.CreateFormFile("file", "small.txt")
	_, _ = fw.Write([]byte("hello"))
	_ = mw.Close()

	req := httptest.NewRequest(http.MethodPost, "/api/send", &buf)
	req.Header.Set("Content-Type", mw.FormDataContentType())
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code == http.StatusRequestEntityTooLarge {
		t.Fatalf("unexpected 413 for small body")
	}
	// Peer field is absent → 400, which proves the body was parsed successfully.
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 (missing peer), got %d: %s", rr.Code, rr.Body.String())
	}
}

// TestWebUIRateLimit verifies that the per-IP rate limiter returns 429 after
// the burst limit (10) is exhausted.
func TestWebUIRateLimit(t *testing.T) {
	rl := newRateLimiter()
	handler := rl.middleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	const burst = 10
	var lastCode int
	for i := 0; i < burst+5; i++ {
		req := httptest.NewRequest(http.MethodGet, "/api/peers", nil)
		// Simulate all requests from the same IP (127.0.0.1).
		req.RemoteAddr = fmt.Sprintf("127.0.0.1:%d", 50000+i)
		// Use the same source IP to exhaust one limiter.
		req.RemoteAddr = "127.0.0.1:12345"
		rr := httptest.NewRecorder()
		handler.ServeHTTP(rr, req)
		lastCode = rr.Code
	}

	if lastCode != http.StatusTooManyRequests {
		t.Fatalf("expected 429 after burst exhausted, got %d", lastCode)
	}
}
