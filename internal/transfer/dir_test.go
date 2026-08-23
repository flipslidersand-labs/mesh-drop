package transfer

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
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

func TestWalkDir_CancelledContext(t *testing.T) {
	dir := t.TempDir()
	for i := range 5 {
		if err := os.WriteFile(filepath.Join(dir, string(rune('a'+i))+".txt"), []byte("data"), 0o644); err != nil {
			t.Fatal(err)
		}
	}

	ctx, cancel := context.WithCancel(context.Background())
	cancel() // cancel before calling

	_, err := WalkDir(ctx, dir)
	if err == nil {
		t.Fatal("expected error from cancelled context, got nil")
	}
}

func TestWalkDir_NormalDir(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "hello.txt"), []byte("hello"), 0o644); err != nil {
		t.Fatal(err)
	}

	files, err := WalkDir(context.Background(), dir)
	if err != nil {
		t.Fatal(err)
	}
	if len(files) != 1 || files[0].Path != "hello.txt" {
		t.Fatalf("unexpected files: %v", files)
	}
}

func TestCheckDirDone_HashMatch(t *testing.T) {
	dir := t.TempDir()

	// Write a file and compute its BLAKE3 hash.
	content := []byte("hello world")
	if err := os.WriteFile(filepath.Join(dir, "a.txt"), content, 0o644); err != nil {
		t.Fatal(err)
	}
	f, _ := os.Open(filepath.Join(dir, "a.txt"))
	hash, _ := hashReader(f)
	f.Close()

	files := []FileMeta{
		{Path: "a.txt", Size: int64(len(content)), Hash: hash},
		{Path: "b.txt", Size: 100, Hash: "notexist"},
	}

	done := checkDirDone(dir, files)
	if len(done) != 1 || done[0] != "a.txt" {
		t.Fatalf("expected [a.txt], got %v", done)
	}
}

func TestCheckDirDone_EmptyDir(t *testing.T) {
	dir := t.TempDir()
	files := []FileMeta{{Path: "missing.txt", Size: 10, Hash: "abc"}}
	done := checkDirDone(dir, files)
	if len(done) != 0 {
		t.Fatalf("expected empty, got %v", done)
	}
}

// TestDoReceiveDir_AllFilesDone verifies that doReceiveDir returns successfully
// when all files are already marked done — no QUIC connection is needed because
// expectedChunks is 0 and no streams are accepted.
func TestDoReceiveDir_AllFilesDone(t *testing.T) {
	outDir := t.TempDir()

	meta := Meta{
		Name:    "mydir",
		Chunks:  1,
		IsBatch: true,
		Files: []FileMeta{
			{Path: "a/b.txt", Size: 5, Hash: ""},
		},
	}

	// Write the file so the dir exists (doReceiveDir calls MkdirAll internally).
	if err := os.MkdirAll(filepath.Join(outDir, "a"), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(outDir, "a", "b.txt"), []byte("hello"), 0o644); err != nil {
		t.Fatal(err)
	}

	// Mark the file as already done → expectedChunks=0 → no conn usage.
	dirDone := []string{"a/b.txt"}
	err := doReceiveDir(context.Background(), nil, meta, outDir, nil, dirDone)
	if err != nil {
		t.Fatalf("doReceiveDir with all-done files: %v", err)
	}
}

// TestDoReceiveDir_InvalidOutDir verifies that doReceiveDir returns an error
// when outDir cannot be resolved.
func TestDoReceiveDir_InvalidOutDir(t *testing.T) {
	meta := Meta{
		Name:    "x",
		Chunks:  1,
		IsBatch: true,
		Files:   []FileMeta{{Path: "file.txt", Size: 0, Hash: ""}},
	}
	// Pass an unresolvable outDir (all valid on Linux; skip this test pattern).
	// Instead test the MkdirAll failure path via a non-writable parent.
	dir := t.TempDir()
	if err := os.Chmod(dir, 0o555); err != nil {
		t.Skip("cannot set read-only dir")
	}
	t.Cleanup(func() { os.Chmod(dir, 0o755) })

	err := doReceiveDir(context.Background(), nil, meta, dir, nil, nil)
	if err == nil {
		t.Fatal("expected error when outDir is not writable")
	}
}

// errWriter is a writer that always fails with the given error.
type errWriter struct{ err error }

func (e errWriter) Write(_ []byte) (int, error) { return 0, e.err }

func TestWriteMeta_WriterError(t *testing.T) {
	w := errWriter{errors.New("inject write error")}
	err := writeMeta(w, Meta{Name: "x", Size: 1, Chunks: 1})
	if err == nil {
		t.Fatal("expected error from failing writer")
	}
}

func TestWriteChunkMeta_WriterError(t *testing.T) {
	w := errWriter{errors.New("inject write error")}
	err := writeChunkMeta(w, ChunkMeta{Index: 0, Size: 1})
	if err == nil {
		t.Fatal("expected error from failing writer")
	}
}

func TestWriteResumeState_WriterError(t *testing.T) {
	w := errWriter{errors.New("inject write error")}
	err := writeResumeState(w, ResumeState{ChunksDone: []int{0}})
	if err == nil {
		t.Fatal("expected error from failing writer")
	}
}

func TestWalkDir_SkipsSymlinks(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "real.txt"), []byte("data"), 0o644); err != nil {
		t.Fatal(err)
	}
	target := filepath.Join(dir, "real.txt")
	link := filepath.Join(dir, "link.txt")
	if err := os.Symlink(target, link); err != nil {
		t.Skip("symlinks not supported:", err)
	}

	files, err := WalkDir(context.Background(), dir)
	if err != nil {
		t.Fatal(err)
	}
	// Should see only real.txt, not link.txt.
	if len(files) != 1 {
		t.Fatalf("expected 1 file (symlink skipped), got %d: %v", len(files), files)
	}
	if files[0].Path != "real.txt" {
		t.Errorf("expected real.txt, got %q", files[0].Path)
	}
}

func TestResumeState_DirDone_JSON(t *testing.T) {
	rs := ResumeState{
		DirDone: []string{"a/b.txt", "c.txt"},
	}
	var buf strings.Builder
	if err := writeResumeState(&buf, rs); err != nil {
		t.Fatal(err)
	}
	got, err := readResumeState(strings.NewReader(buf.String()))
	if err != nil {
		t.Fatal(err)
	}
	if len(got.DirDone) != 2 || got.DirDone[0] != "a/b.txt" {
		t.Fatalf("unexpected DirDone: %v", got.DirDone)
	}
}
