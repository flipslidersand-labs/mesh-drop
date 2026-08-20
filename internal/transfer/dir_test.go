package transfer

import (
	"context"
	"os"
	"path/filepath"
	"testing"
)

func TestAssignChunks_MinOnePerFile(t *testing.T) {
	files := []FileMeta{
		{Path: "a", Size: 100},
		{Path: "b", Size: 200},
	}
	got := assignChunks(files, 1)
	if len(got) < 2 {
		t.Fatalf("expected at least 2 assignments, got %d", len(got))
	}
}

func TestAssignChunks_EmptyFiles(t *testing.T) {
	got := assignChunks([]FileMeta{}, 4)
	if len(got) != 0 {
		t.Fatalf("expected 0 assignments for empty file list, got %d", len(got))
	}
}

func TestDoReceiveDir_PathTraversal(t *testing.T) {
	outDir := t.TempDir()

	// craft a Meta that attempts path traversal
	meta := Meta{
		Name:   "evil",
		Chunks: 1,
		Files: []FileMeta{
			{Path: "../../evil.txt", Size: 0, Hash: ""},
		},
		IsBatch: true,
	}

	// doReceiveDir should reject traversal before opening any network streams;
	// we pass a nil conn — if path validation is correct it returns before using conn.
	err := doReceiveDir(context.Background(), nil, meta, outDir, nil, nil)
	if err == nil {
		t.Fatal("expected error for path traversal, got nil")
	}

	// confirm the file was NOT created outside outDir
	evil := filepath.Join(filepath.Dir(outDir), "evil.txt")
	if _, statErr := os.Stat(evil); statErr == nil {
		t.Fatalf("path traversal succeeded: %s was created", evil)
	}
}

func TestPathTraversal_DirectCheck(t *testing.T) {
	// Test the path validation logic directly without invoking doReceiveDir's goroutines.
	outDir := t.TempDir()
	absBase, _ := filepath.Abs(outDir)

	cases := []struct {
		path    string
		wantErr bool
	}{
		{"subdir/file.txt", false},
		{"a/b/c.txt", false},
		{"../../evil.txt", true},
		{"../sibling/file.txt", true},
	}

	for _, c := range cases {
		outPath := filepath.Join(absBase, c.path)
		absOut, _ := filepath.Abs(outPath)
		traversal := !isInsideDir(absOut, absBase)
		if traversal != c.wantErr {
			t.Errorf("path %q: traversal=%v want=%v", c.path, traversal, c.wantErr)
		}
	}
}

// isInsideDir は absOut が absBase 直下に収まっているかを確認する（テスト用ヘルパー）。
func isInsideDir(absOut, absBase string) bool {
	return len(absOut) > len(absBase) &&
		absOut[:len(absBase)] == absBase &&
		absOut[len(absBase)] == os.PathSeparator
}
