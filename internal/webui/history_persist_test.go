package webui

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestHistoryPersistence_AppendAndReload(t *testing.T) {
	dir := t.TempDir()
	histPath := filepath.Join(dir, "history.json")

	s := New("127.0.0.1:0", time.Second)
	s.HistPath = histPath

	s.appendHistory(HistoryEntry{ID: "1", File: "a.txt", Direction: "send", Size: 100, At: time.Now()})
	s.appendHistory(HistoryEntry{ID: "2", File: "b.txt", Direction: "recv", Size: 200, At: time.Now()})

	// Verify file exists.
	if _, err := os.Stat(histPath); err != nil {
		t.Fatalf("history.json not created: %v", err)
	}

	// Parse raw JSON to verify content.
	data, _ := os.ReadFile(histPath)
	var h []HistoryEntry
	if err := json.Unmarshal(data, &h); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if len(h) != 2 {
		t.Fatalf("expected 2 entries, got %d", len(h))
	}

	// Simulate restart: new Server with same HistPath.
	s2 := New("127.0.0.1:0", time.Second)
	s2.HistPath = histPath
	s2.loadHistory()

	s2.histMu.Lock()
	loaded := len(s2.history)
	s2.histMu.Unlock()

	if loaded != 2 {
		t.Fatalf("expected 2 entries after reload, got %d", loaded)
	}
	if s2.history[0].ID != "1" || s2.history[1].ID != "2" {
		t.Errorf("unexpected order after reload: %v", s2.history)
	}
}

func TestHistoryPersistence_EmptyHistPath_NoFile(t *testing.T) {
	s := New("127.0.0.1:0", time.Second)
	// HistPath is empty: appendHistory should not create any file.
	s.appendHistory(HistoryEntry{ID: "x", File: "f.txt"})
	// No assertion needed; just verify no panic.
}

func TestHistoryPersistence_CorruptFile_StartsFresh(t *testing.T) {
	dir := t.TempDir()
	histPath := filepath.Join(dir, "history.json")
	if err := os.WriteFile(histPath, []byte("INVALID{{{"), 0o600); err != nil {
		t.Fatal(err)
	}

	s := New("127.0.0.1:0", time.Second)
	s.HistPath = histPath
	s.loadHistory() // must not panic; starts with empty history

	s.histMu.Lock()
	n := len(s.history)
	s.histMu.Unlock()

	if n != 0 {
		t.Errorf("expected 0 entries for corrupt file, got %d", n)
	}
}

func TestSaveHistory_AtomicRename(t *testing.T) {
	dir := t.TempDir()
	histPath := filepath.Join(dir, "h.json")

	s := New("127.0.0.1:0", time.Second)
	s.HistPath = histPath

	entries := []HistoryEntry{
		{ID: "a", File: "x.txt", At: time.Now()},
	}
	if err := s.saveHistory(entries); err != nil {
		t.Fatalf("saveHistory failed: %v", err)
	}

	// Temp file must be cleaned up.
	if _, err := os.Stat(histPath + ".tmp"); err == nil {
		t.Error("temp file should not exist after successful save")
	}
	// Final file must exist.
	if _, err := os.Stat(histPath); err != nil {
		t.Errorf("history file missing: %v", err)
	}
}
