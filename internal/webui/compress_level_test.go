package webui

// #559: compress_level validation for handleSend / handleSendDir.

import (
	"bytes"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"
	"time"
)

func buildSendRequestWithCompressLevel(t *testing.T, peer, filename, compressLevel string) *http.Request {
	t.Helper()
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", peer)
	_ = w.WriteField("compress_level", compressLevel)
	fw, err := w.CreateFormFile("file", filepath.Base(filename))
	if err != nil {
		t.Fatal(err)
	}
	_, _ = io.WriteString(fw, "hello test content")
	_ = w.Close()
	req := httptest.NewRequest(http.MethodPost, "/api/send", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	return req
}

func TestParseCompressLevel_Empty(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/api/send", nil)
	level, err := parseCompressLevel(req)
	if err != nil || level != 0 {
		t.Errorf("want 0,nil got %d,%v", level, err)
	}
}

func TestParseCompressLevel_Valid(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/api/send?compress_level=9", nil)
	level, err := parseCompressLevel(req)
	if err != nil || level != 9 {
		t.Errorf("want 9,nil got %d,%v", level, err)
	}
}

func TestParseCompressLevel_NonNumeric(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/api/send?compress_level=fast", nil)
	if _, err := parseCompressLevel(req); err == nil {
		t.Error("want error for non-numeric compress_level")
	}
}

func TestParseCompressLevel_OutOfRange(t *testing.T) {
	for _, v := range []string{"-1", "10", "999"} {
		req := httptest.NewRequest(http.MethodPost, "/api/send?compress_level="+v, nil)
		if _, err := parseCompressLevel(req); err == nil {
			t.Errorf("want error for out-of-range compress_level=%s", v)
		}
	}
}

func TestHandleSend_InvalidCompressLevel(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequestWithCompressLevel(t, "127.0.0.1:9999", "f.txt", "notanumber")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for invalid compress_level, got %d: %s", rr.Code, rr.Body.String())
	}
}

func TestHandleSend_CompressLevelOutOfRange(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendRequestWithCompressLevel(t, "127.0.0.1:9999", "f.txt", "42")
	rr := httptest.NewRecorder()
	s.handleSend(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for out-of-range compress_level, got %d: %s", rr.Code, rr.Body.String())
	}
}

func buildSendDirRequestWithCompressLevel(t *testing.T, peer, compressLevel string, paths []string) *http.Request {
	t.Helper()
	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	_ = w.WriteField("peer", peer)
	_ = w.WriteField("compress_level", compressLevel)
	pathsJSON := `[`
	for i, p := range paths {
		if i > 0 {
			pathsJSON += ","
		}
		pathsJSON += `"` + p + `"`
	}
	pathsJSON += `]`
	_ = w.WriteField("paths", pathsJSON)
	for _, name := range paths {
		part, err := w.CreateFormFile("files", filepath.Base(name))
		if err != nil {
			t.Fatal(err)
		}
		_, _ = part.Write([]byte("content"))
	}
	if err := w.Close(); err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPost, "/api/send-dir", &body)
	req.Header.Set("Content-Type", w.FormDataContentType())
	return req
}

func TestHandleSendDir_InvalidCompressLevel(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendDirRequestWithCompressLevel(t, "127.0.0.1:9999", "notanumber", []string{"dir/file.txt"})
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for invalid compress_level, got %d: %s", rr.Code, rr.Body.String())
	}
}

func TestHandleSendDir_CompressLevelOutOfRange(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	req := buildSendDirRequestWithCompressLevel(t, "127.0.0.1:9999", "-5", []string{"dir/file.txt"})
	rr := httptest.NewRecorder()
	s.handleSendDir(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for out-of-range compress_level, got %d: %s", rr.Code, rr.Body.String())
	}
}
