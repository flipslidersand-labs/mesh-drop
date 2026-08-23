package webui

import (
	"bytes"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// --- #295: handleDownload ---

func TestHandleDownload_NotFound(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := httptest.NewRequest(http.MethodGet, "/api/downloads/nonexistent", nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)
	if rr.Code != http.StatusNotFound {
		t.Fatalf("expected 404, got %d", rr.Code)
	}
}

func TestHandleDownload_ServesFile(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	// Write a temp file to serve.
	dir := t.TempDir()
	path := filepath.Join(dir, "hello.txt")
	if err := os.WriteFile(path, []byte("hello"), 0o644); err != nil {
		t.Fatal(err)
	}

	s.dlMu.Lock()
	s.downloads["test-id"] = path
	s.dlMu.Unlock()

	req := httptest.NewRequest(http.MethodGet, "/api/downloads/test-id", nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", rr.Code, rr.Body.String())
	}
	if body := rr.Body.String(); body != "hello" {
		t.Fatalf("expected body 'hello', got %q", body)
	}
}

func TestHandleDownload_ContentDisposition(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	dir := t.TempDir()
	path := filepath.Join(dir, "report 2026.pdf")
	if err := os.WriteFile(path, []byte("pdf"), 0o644); err != nil {
		t.Fatal(err)
	}
	s.dlMu.Lock()
	s.downloads["pdf-id"] = path
	s.dlMu.Unlock()

	req := httptest.NewRequest(http.MethodGet, "/api/downloads/pdf-id", nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)

	cd := rr.Header().Get("Content-Disposition")
	if !strings.HasPrefix(cd, "attachment") {
		t.Fatalf("expected attachment Content-Disposition, got %q", cd)
	}
}

func TestHandleDownload_FileNotOnDisk(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	s.dlMu.Lock()
	s.downloads["gone"] = "/nonexistent/path/file.txt"
	s.dlMu.Unlock()

	req := httptest.NewRequest(http.MethodGet, "/api/downloads/gone", nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)
	// http.ServeFile returns 404 for missing files.
	if rr.Code == http.StatusOK {
		t.Fatalf("expected non-200 for missing file on disk, got 200")
	}
}

// --- #298: handleSendDir ---

func buildSendDirRequest(t *testing.T, peer string, files map[string]string, paths []string) *http.Request {
	t.Helper()
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", peer)
	if paths != nil {
		pathsJSON := `[`
		for i, p := range paths {
			if i > 0 {
				pathsJSON += ","
			}
			pathsJSON += `"` + p + `"`
		}
		pathsJSON += `]`
		_ = w.WriteField("paths", pathsJSON)
	}
	for _, name := range paths {
		content := "content"
		if c, ok := files[name]; ok {
			content = c
		}
		part, err := w.CreateFormFile("files", filepath.Base(name))
		if err != nil {
			t.Fatal(err)
		}
		_, _ = part.Write([]byte(content))
	}
	if err := w.Close(); err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPost, "/api/send-dir", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	return req
}

func TestHandleSendDir_MethodNotAllowed(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := httptest.NewRequest(http.MethodGet, "/api/send-dir", nil)
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)
	if rr.Code != http.StatusMethodNotAllowed {
		t.Fatalf("expected 405, got %d", rr.Code)
	}
}

func TestHandleSendDir_MissingPeer(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendDirRequest(t, "", nil, []string{"dir/file.txt"})
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for missing peer, got %d", rr.Code)
	}
}

func TestHandleSendDir_MissingFiles(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", "127.0.0.1:9999")
	_ = w.WriteField("paths", "[]")
	_ = w.Close()
	req := httptest.NewRequest(http.MethodPost, "/api/send-dir", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for missing files, got %d", rr.Code)
	}
}

func TestHandleSendDir_InvalidPathsJSON(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", "127.0.0.1:9999")
	_ = w.WriteField("paths", `not-valid-json`)
	part, _ := w.CreateFormFile("files", "f.txt")
	_, _ = part.Write([]byte("x"))
	_ = w.Close()
	req := httptest.NewRequest(http.MethodPost, "/api/send-dir", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for invalid paths JSON, got %d", rr.Code)
	}
}

func TestHandleSendDir_PathTraversalRejected(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendDirRequest(t, "127.0.0.1:9999", nil, []string{"../evil/hack.txt"})
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for path traversal, got %d", rr.Code)
	}
}

func TestHandleSendDir_AbsolutePathRejected(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendDirRequest(t, "127.0.0.1:9999", nil, []string{"/etc/passwd"})
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for absolute path, got %d", rr.Code)
	}
}

func TestHandleSendDir_ValidRequest_Returns200(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendDirRequest(t, "127.0.0.1:9999",
		map[string]string{"mydir/a.txt": "hello"},
		[]string{"mydir/a.txt"})
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)
	// Transfer will fail (no listener) but the HTTP handler should return 200
	// and the goroutine handles the error asynchronously.
	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", rr.Code, rr.Body.String())
	}
}

// --- #300: runReceiver / download registration ---

// TestDownloadRegistration verifies the callback-based registration that runReceiver
// uses: after a file is received, it must appear in s.downloads and be servable.
func TestDownloadRegistration(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	// Simulate the receive callback used by runReceiver.
	dir := t.TempDir()
	path := filepath.Join(dir, "recv.txt")
	if err := os.WriteFile(path, []byte("received content"), 0o644); err != nil {
		t.Fatal(err)
	}
	id := "recv-test-001"

	// Register exactly as runReceiver's callback does.
	s.dlMu.Lock()
	s.downloads[id] = path
	s.dlMu.Unlock()

	s.hub.publish(ProgressEvent{
		ID: id, Direction: "recv",
		File: "recv.txt", Peer: "127.0.0.1:12345",
		Sent: 16, Total: 16, Done: true,
	})

	// Verify the file is servable via handleDownload.
	req := httptest.NewRequest(http.MethodGet, "/api/downloads/"+id, nil)
	rr := httptest.NewRecorder()
	s.handleDownload(rr, req)
	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200 after download registration, got %d", rr.Code)
	}
	if body := rr.Body.String(); body != "received content" {
		t.Fatalf("unexpected body: %q", body)
	}
}

func TestDownloadRegistration_ProgressEventPublished(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	ch := s.hub.subscribe()
	defer s.hub.unsubscribe(ch)

	// Simulate runReceiver callback publishing an event.
	s.hub.publish(ProgressEvent{
		ID: "r1", Direction: "recv",
		File: "img.png", Peer: "10.0.0.1:7777",
		Sent: 100, Total: 100, Done: true,
	})

	select {
	case ev := <-ch:
		if ev.Direction != "recv" || ev.File != "img.png" || !ev.Done {
			t.Errorf("unexpected event: %+v", ev)
		}
	case <-time.After(time.Second):
		t.Fatal("timeout: no progress event received")
	}
}

func TestRunReceiver_HistoryEntry(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)

	// Simulate the history append that runReceiver's callback does.
	s.histMu.Lock()
	s.history = append(s.history, HistoryEntry{
		ID: "r2", Direction: "recv",
		File: "doc.pdf", Peer: "192.168.1.2:7777",
		Size: 512, At: time.Now(),
	})
	s.histMu.Unlock()

	req := httptest.NewRequest(http.MethodGet, "/api/history", nil)
	rr := httptest.NewRecorder()
	s.handleHistory(rr, req)
	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
	if !strings.Contains(rr.Body.String(), "doc.pdf") {
		t.Errorf("history response does not contain expected file: %s", rr.Body.String())
	}
}
