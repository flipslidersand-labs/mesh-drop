package webui

// Additional handleSend / handleSSE / handleDownload coverage for issues #264, #265, #310.

import (
	"bytes"
	"context"
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

// buildSendRequestFull builds a multipart POST to /api/send with optional fields.
// pass peer="" to omit it; pass filename="" to omit the file field.
func buildSendRequestFull(t *testing.T, peer, filename, rateLimit string) *http.Request {
	t.Helper()
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	if peer != "" {
		_ = w.WriteField("peer", peer)
	}
	if rateLimit != "" {
		_ = w.WriteField("rate_limit", rateLimit)
	}
	if filename != "" {
		fw, err := w.CreateFormFile("file", filepath.Base(filename))
		if err != nil {
			t.Fatal(err)
		}
		_, _ = io.WriteString(fw, "hello test content")
	}
	_ = w.Close()
	req := httptest.NewRequest(http.MethodPost, "/api/send", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	return req
}

// #264: handleSend must return 413 when body exceeds maxSingleFileUpload.
func TestHandleSend_BodyTooLarge(t *testing.T) {
	orig := maxSingleFileUpload
	defer func() { maxSingleFileUpload = orig }()
	maxSingleFileUpload = 1 // 1 byte — any multipart body will exceed this

	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequestFull(t, "127.0.0.1:9999", "f.txt", "")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusRequestEntityTooLarge {
		t.Fatalf("expected 413, got %d: %s", rr.Code, rr.Body.String())
	}
}

// #265: Content-Disposition for a filename containing characters needing RFC 6266 encoding.
// Windows does not allow " in filenames, so we use a space and parentheses which
// require quoting/encoding in Content-Disposition on all platforms.
func TestHandleDownload_ContentDispositionSpecialFilename(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	dir := t.TempDir()
	// Space + parentheses are valid on all OS but require encoding in Content-Disposition.
	filename := "report (draft) final.pdf"
	path := filepath.Join(dir, filename)
	if err := os.WriteFile(path, []byte("x"), 0o644); err != nil {
		t.Fatal(err)
	}
	s.dlMu.Lock()
	s.downloads["spec-id"] = path
	s.dlMu.Unlock()

	req := httptest.NewRequest(http.MethodGet, "/api/downloads/spec-id", nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)

	cd := rr.Header().Get("Content-Disposition")
	if !strings.HasPrefix(cd, "attachment") {
		t.Fatalf("expected attachment Content-Disposition, got %q", cd)
	}
	// mime.FormatMediaType must produce a valid RFC 6266 encoded header.
	// The filename must appear somewhere in the header value.
	if !strings.Contains(cd, "report") {
		t.Fatalf("Content-Disposition missing filename: %q", cd)
	}
}

// #310: handleSend must return 400 for an invalid peer (not host:port).
func TestHandleSend_InvalidPeer(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequestFull(t, "not-a-host-port", "f.txt", "")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for invalid peer, got %d", rr.Code)
	}
}

// #310: handleSend must return 400 when the "file" field is absent.
func TestHandleSend_MissingFileField(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", "127.0.0.1:9999")
	_ = w.Close()
	req := httptest.NewRequest(http.MethodPost, "/api/send", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for missing file field, got %d", rr.Code)
	}
}

// #310: handleSend must return 400 for an unparseable rate_limit value.
func TestHandleSend_InvalidRateLimit(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequestFull(t, "127.0.0.1:9999", "f.txt", "notanumber")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for invalid rate_limit, got %d: %s", rr.Code, rr.Body.String())
	}
}

// #310: handleSend valid request returns 200; async goroutine handles the actual transfer.
func TestHandleSend_ValidRequest_Returns200(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	s.runCtx = context.Background()
	req := buildSendRequestFull(t, "127.0.0.1:9999", "test.txt", "")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", rr.Code, rr.Body.String())
	}
}

// #310: handleSSE must deliver a published event to the streaming response.
func TestHandleSSE_EventDelivered(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	req := httptest.NewRequest(http.MethodGet, "/sse/progress", nil)
	ctx, cancel := context.WithTimeout(req.Context(), 500*time.Millisecond)
	defer cancel()
	req = req.WithContext(ctx)

	rr := httptest.NewRecorder()
	done := make(chan struct{})
	go func() {
		defer close(done)
		s.handleSSE(rr, req)
	}()

	// Let the handler subscribe before publishing.
	time.Sleep(20 * time.Millisecond)
	s.hub.publish(ProgressEvent{ID: "sse-ev", File: "ship.zip", Done: true})
	<-done

	if !strings.Contains(rr.Body.String(), "sse-ev") {
		t.Errorf("SSE body missing event id: %s", rr.Body.String())
	}
}

// minimalRW implements http.ResponseWriter without http.Flusher,
// so handleSSE's flusher check returns ok=false.
type minimalRW struct {
	header http.Header
	code   int
	body   bytes.Buffer
}

func newMinimalRW() *minimalRW { return &minimalRW{header: make(http.Header)} }
func (m *minimalRW) Header() http.Header         { return m.header }
func (m *minimalRW) Write(b []byte) (int, error) { return m.body.Write(b) }
func (m *minimalRW) WriteHeader(code int)        { m.code = code }

// #310: handleSSE must return 500 when the ResponseWriter does not implement Flusher.
func TestHandleSSE_NotFlusherReturns500(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := httptest.NewRequest(http.MethodGet, "/sse/progress", nil)
	nf := newMinimalRW()
	s.handleSSE(nf, req)

	if nf.code != http.StatusInternalServerError {
		t.Fatalf("expected 500 for non-flusher, got %d: %s", nf.code, nf.body.String())
	}
}
