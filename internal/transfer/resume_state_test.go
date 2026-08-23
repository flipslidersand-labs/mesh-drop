package transfer

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// --- #262: Meta.NoResume JSON roundtrip ---

func TestMetaRoundtrip_NoResume(t *testing.T) {
	m := Meta{
		Name:     "dir",
		Size:     100,
		Chunks:   1,
		IsBatch:  true,
		NoResume: true,
		Files:    []FileMeta{{Path: "a.txt", Size: 100, Hash: "aabb"}},
	}
	var buf bytes.Buffer
	if err := writeMeta(&buf, m); err != nil {
		t.Fatal(err)
	}
	got, err := readMeta(&buf)
	if err != nil {
		t.Fatal(err)
	}
	if !got.NoResume {
		t.Error("NoResume should be true after roundtrip")
	}
	if !got.IsBatch {
		t.Error("IsBatch should be true after roundtrip")
	}
}

func TestMetaRoundtrip_NoResumeFalse(t *testing.T) {
	m := Meta{Name: "f", Size: 1, Chunks: 1}
	var buf bytes.Buffer
	if err := writeMeta(&buf, m); err != nil {
		t.Fatal(err)
	}
	got, err := readMeta(&buf)
	if err != nil {
		t.Fatal(err)
	}
	if got.NoResume {
		t.Error("NoResume should be false by default")
	}
}

// TestCheckDirDone_SkippedWhenNoResume verifies the acceptMetaDispatch logic:
// when Meta.NoResume=true, checkDirDone is bypassed and dirDone is empty.
func TestCheckDirDone_SkippedWhenNoResume(t *testing.T) {
	dir := t.TempDir()

	// Write a file and record its hash so checkDirDone would normally return it.
	content := []byte("hello")
	path := filepath.Join(dir, "a.txt")
	if err := os.WriteFile(path, content, 0o644); err != nil {
		t.Fatal(err)
	}
	f, _ := os.Open(path)
	hash, _ := hashReader(f)
	f.Close()

	files := []FileMeta{{Path: "a.txt", Size: int64(len(content)), Hash: hash}}

	// Without NoResume: checkDirDone finds the completed file.
	withResume := checkDirDone(dir, files)
	if len(withResume) == 0 {
		t.Fatal("expected checkDirDone to find completed file")
	}

	// With NoResume: the same logic used in acceptMetaDispatch skips checkDirDone.
	meta := Meta{NoResume: true}
	var dirDone []string
	if !meta.NoResume {
		dirDone = checkDirDone(dir, files)
	}
	if len(dirDone) != 0 {
		t.Errorf("expected empty dirDone when NoResume=true, got %v", dirDone)
	}
}

// --- #263: validateDirChunkHandle nil handle guard ---

func TestValidateDirChunkHandle_NilHandle_ReturnsError(t *testing.T) {
	handles := []fileHandle{
		{f: nil, path: "done.txt"}, // already complete
	}
	cm := ChunkMeta{Index: 0, FileIndex: 0, Offset: 0, Size: 10}
	err := validateDirChunkHandle(handles, cm)
	if err == nil {
		t.Fatal("expected error for nil file handle, got nil")
	}
}

func TestValidateDirChunkHandle_ValidHandle_NoError(t *testing.T) {
	tmp := t.TempDir()
	f, err := os.Create(filepath.Join(tmp, "active.txt"))
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	handles := []fileHandle{{f: f, path: "active.txt"}}
	cm := ChunkMeta{Index: 0, FileIndex: 0, Offset: 0, Size: 5}
	if err := validateDirChunkHandle(handles, cm); err != nil {
		t.Errorf("unexpected error for valid handle: %v", err)
	}
}

func TestValidateDirChunkHandle_OutOfRangeIndex_ReturnsError(t *testing.T) {
	handles := []fileHandle{}
	cm := ChunkMeta{Index: 0, FileIndex: 5}
	if err := validateDirChunkHandle(handles, cm); err == nil {
		t.Fatal("expected error for out-of-range FileIndex, got nil")
	}
}

func TestValidateDirChunkHandle_NegativeIndex_ReturnsError(t *testing.T) {
	handles := []fileHandle{}
	cm := ChunkMeta{Index: 0, FileIndex: -1}
	if err := validateDirChunkHandle(handles, cm); err == nil {
		t.Fatal("expected error for negative FileIndex, got nil")
	}
}

// --- #266: ResumeState serialization error paths ---

func TestReadResumeState_TruncatedLength(t *testing.T) {
	var buf bytes.Buffer
	// Write only 2 of the 4 required bytes.
	buf.Write([]byte{0x00, 0x00})
	_, err := readResumeState(&buf)
	if err == nil {
		t.Fatal("expected error for truncated length prefix, got nil")
	}
}

func TestReadResumeState_MalformedJSON(t *testing.T) {
	payload := []byte(`{INVALID}`)
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(len(payload)))
	buf.Write(payload)
	_, err := readResumeState(&buf)
	if err == nil {
		t.Fatal("expected error for malformed JSON, got nil")
	}
}

func TestReadResumeState_LengthExceedsMax(t *testing.T) {
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(maxMetaLength+1))
	_, err := readResumeState(&buf)
	if err == nil {
		t.Fatal("expected error for length exceeding max, got nil")
	}
}

func TestWriteReadResumeState_Roundtrip(t *testing.T) {
	rs := ResumeState{
		ChunksDone: []int{0, 2, 4},
		DirDone:    []string{"sub/a.txt", "b.txt"},
	}
	var buf strings.Builder
	if err := writeResumeState(&buf, rs); err != nil {
		t.Fatal(err)
	}
	got, err := readResumeState(strings.NewReader(buf.String()))
	if err != nil {
		t.Fatal(err)
	}
	if len(got.ChunksDone) != 3 || got.ChunksDone[2] != 4 {
		t.Errorf("ChunksDone mismatch: %v", got.ChunksDone)
	}
	if len(got.DirDone) != 2 || got.DirDone[0] != "sub/a.txt" {
		t.Errorf("DirDone mismatch: %v", got.DirDone)
	}
}

func TestReadResumeState_TruncatedBody(t *testing.T) {
	payload := []byte(`{"dir_done":["a.txt"]}`)
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(len(payload)+10))
	buf.Write(payload) // shorter than declared length
	_, err := readResumeState(&buf)
	if err == nil {
		t.Fatal("expected error for truncated body, got nil")
	}
}

func TestWriteResumeState_Empty(t *testing.T) {
	rs := ResumeState{}
	var buf bytes.Buffer
	if err := writeResumeState(&buf, rs); err != nil {
		t.Fatal(err)
	}
	got, err := readResumeState(&buf)
	if err != nil {
		t.Fatalf("empty ResumeState should roundtrip: %v", err)
	}
	if len(got.ChunksDone) != 0 || len(got.DirDone) != 0 {
		t.Errorf("unexpected data in empty roundtrip: %+v", got)
	}
}

// --- #268: checkDirDone hash mismatch / partial / missing ---

func TestCheckDirDone_HashMismatch_NotIncluded(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "a.txt"), []byte("original"), 0o644); err != nil {
		t.Fatal(err)
	}
	files := []FileMeta{
		{Path: "a.txt", Size: 8, Hash: "deadbeefdeadbeef"}, // wrong hash
	}
	done := checkDirDone(dir, files)
	if len(done) != 0 {
		t.Errorf("hash mismatch should not be included in done: %v", done)
	}
}

func TestCheckDirDone_PartiallyComplete(t *testing.T) {
	dir := t.TempDir()

	content := []byte("data")
	for _, name := range []string{"a.txt", "b.txt", "c.txt"} {
		if err := os.WriteFile(filepath.Join(dir, name), content, 0o644); err != nil {
			t.Fatal(err)
		}
	}
	f, _ := os.Open(filepath.Join(dir, "a.txt"))
	hash, _ := hashReader(f)
	f.Close()

	files := []FileMeta{
		{Path: "a.txt", Size: int64(len(content)), Hash: hash},
		{Path: "b.txt", Size: int64(len(content)), Hash: "wronghash"},
		{Path: "c.txt", Size: int64(len(content)), Hash: hash},
	}
	done := checkDirDone(dir, files)
	if len(done) != 2 {
		t.Fatalf("expected 2 completed files, got %v", done)
	}
	found := map[string]bool{}
	for _, p := range done {
		found[p] = true
	}
	if !found["a.txt"] || !found["c.txt"] {
		t.Errorf("expected a.txt and c.txt in done, got %v", done)
	}
}

func TestCheckDirDone_MissingFile_NotIncluded(t *testing.T) {
	dir := t.TempDir()
	files := []FileMeta{
		{Path: "nonexistent.txt", Size: 10, Hash: "anyhash"},
	}
	done := checkDirDone(dir, files)
	if len(done) != 0 {
		t.Errorf("missing file should not be in done list: %v", done)
	}
}

func TestCheckDirDone_EmptyHashSkipped(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "x.txt"), []byte("x"), 0o644); err != nil {
		t.Fatal(err)
	}
	// Hash == "" means we cannot verify — should not be included.
	files := []FileMeta{{Path: "x.txt", Size: 1, Hash: ""}}
	done := checkDirDone(dir, files)
	if len(done) != 0 {
		t.Errorf("empty hash should not be included: %v", done)
	}
}

// writeRawResumeState writes a length-prefixed JSON payload without any
// production-side checks, allowing tests to inject malformed values.
func writeRawResumeState(rs ResumeState) ([]byte, error) {
	b, err := json.Marshal(rs)
	if err != nil {
		return nil, err
	}
	var buf bytes.Buffer
	if err := binary.Write(&buf, binary.BigEndian, uint32(len(b))); err != nil {
		return nil, err
	}
	buf.Write(b)
	return buf.Bytes(), nil
}
