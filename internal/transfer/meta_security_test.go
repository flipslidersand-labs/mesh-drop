package transfer

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"strings"
	"testing"
)

// writeRawMeta serialises m to JSON and frames it with a 4-byte big-endian
// length prefix, exactly as writeMeta does, but without the sanity checks that
// writeMeta would apply.  This lets tests inject malformed values that the
// normal write path would never produce.
func writeRawMeta(m Meta) ([]byte, error) {
	b, err := json.Marshal(m)
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

// TestReadMeta_OversizedFilename checks that a filename longer than 4096
// characters is accepted at the Meta layer (there is no per-name length limit
// enforced by readMeta itself) but the overall JSON must fit within
// maxMetaLength (1 MiB).  A name that alone exceeds 1 MiB must be rejected.
func TestReadMeta_OversizedFilename(t *testing.T) {
	// 4096-char name: readMeta has no explicit per-name cap, so this should
	// succeed as long as the serialised payload is <= maxMetaLength.
	name4096 := strings.Repeat("a", 4096)
	m := Meta{Name: name4096, Size: 1, Chunks: 1}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := readMeta(bytes.NewReader(raw)); err != nil {
		t.Errorf("4096-char name should be accepted: %v", err)
	}

	// Name that on its own pushes the JSON payload past maxMetaLength (1 MiB).
	hugeNameMeta := Meta{Name: strings.Repeat("x", maxMetaLength+1), Size: 1, Chunks: 1}
	b, err := json.Marshal(hugeNameMeta)
	if err != nil {
		t.Fatal(err)
	}
	var buf bytes.Buffer
	// Write the actual length so readMeta tries to allocate it.
	binary.Write(&buf, binary.BigEndian, uint32(len(b)))
	buf.Write(b)
	if _, err := readMeta(&buf); err == nil {
		t.Error("expected error for meta payload exceeding maxMetaLength, got nil")
	}
}

// TestReadMeta_OversizedTotalSize verifies that a Size value larger than
// maxFileSize (1 TiB) is rejected.
func TestReadMeta_OversizedTotalSize(t *testing.T) {
	m := Meta{Name: "big.bin", Size: maxFileSize + 1, Chunks: 1}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	_, err = readMeta(bytes.NewReader(raw))
	if err == nil {
		t.Error("expected error for Size > maxFileSize, got nil")
	}
}

// TestReadMeta_NegativeSize verifies that a negative Size (other than the
// IsPipe sentinel) is rejected.
func TestReadMeta_NegativeSize(t *testing.T) {
	m := Meta{Name: "bad.bin", Size: -2, Chunks: 1}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	_, err = readMeta(bytes.NewReader(raw))
	if err == nil {
		t.Error("expected error for negative Size, got nil")
	}
}

// TestReadMeta_PipeMode_NegativeSize verifies that IsPipe=true skips the Size
// range check so the -1 sentinel is accepted.
func TestReadMeta_PipeMode_NegativeSize(t *testing.T) {
	m := Meta{Name: "stdin", Size: -1, IsPipe: true, Chunks: 0}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	got, err := readMeta(bytes.NewReader(raw))
	if err != nil {
		t.Fatalf("pipe mode with Size=-1 should be accepted: %v", err)
	}
	if !got.IsPipe {
		t.Error("IsPipe should be true")
	}
}

// TestReadMeta_ZeroChunksWithNonZeroSize verifies that Chunks=0 with a
// positive Size (non-pipe) is rejected.
func TestReadMeta_ZeroChunksWithNonZeroSize(t *testing.T) {
	m := Meta{Name: "zero.bin", Size: 1024, Chunks: 0}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	_, err = readMeta(bytes.NewReader(raw))
	if err == nil {
		t.Error("expected error for Chunks=0 with non-zero Size, got nil")
	}
}

// TestReadMeta_NegativeChunkCount verifies that a negative Chunks value is
// rejected.
func TestReadMeta_NegativeChunkCount(t *testing.T) {
	m := Meta{Name: "neg.bin", Size: 1024, Chunks: -1}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	_, err = readMeta(bytes.NewReader(raw))
	if err == nil {
		t.Error("expected error for negative Chunks, got nil")
	}
}

// TestReadMeta_ChunksExceedsMax verifies that Chunks > maxChunks is rejected.
func TestReadMeta_ChunksExceedsMax(t *testing.T) {
	m := Meta{Name: "toochunky.bin", Size: 1024, Chunks: maxChunks + 1}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	_, err = readMeta(bytes.NewReader(raw))
	if err == nil {
		t.Error("expected error for Chunks > maxChunks, got nil")
	}
}

// TestReadMeta_FileCountZero checks that an empty Files slice is accepted (it
// simply means single-file mode).
func TestReadMeta_FileCountZero(t *testing.T) {
	m := Meta{Name: "solo.bin", Size: 42, Chunks: 1, Files: []FileMeta{}}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	got, err := readMeta(bytes.NewReader(raw))
	if err != nil {
		t.Fatalf("FileCount=0 (empty slice) should be accepted: %v", err)
	}
	if len(got.Files) != 0 {
		t.Errorf("expected 0 files, got %d", len(got.Files))
	}
}

// TestReadMeta_FileCountExceedsMax verifies that more than maxFileCount files
// are rejected.
func TestReadMeta_FileCountExceedsMax(t *testing.T) {
	files := make([]FileMeta, maxFileCount+1)
	for i := range files {
		files[i] = FileMeta{Path: "f", Size: 1, Hash: "aabbcc"}
	}
	m := Meta{Name: "dir", Size: int64(maxFileCount + 1), Chunks: 1,
		IsBatch: true, Files: files}
	b, err := json.Marshal(m)
	if err != nil {
		t.Fatal(err)
	}
	// Only proceed if the marshalled payload is within maxMetaLength; otherwise
	// the test is checking the wrong boundary.
	if len(b) > maxMetaLength {
		t.Skip("marshalled payload too large to reach file-count check; skipping")
	}
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(len(b)))
	buf.Write(b)
	_, err = readMeta(&buf)
	if err == nil {
		t.Error("expected error for Files count > maxFileCount, got nil")
	}
}

// TestReadMeta_MalformedJSON verifies that a corrupt JSON payload is rejected.
func TestReadMeta_MalformedJSON(t *testing.T) {
	payload := []byte(`{"name":"x","size":1,"chunks":1,INVALID}`)
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(len(payload)))
	buf.Write(payload)
	_, err := readMeta(&buf)
	if err == nil {
		t.Error("expected error for malformed JSON, got nil")
	}
}

// TestReadMeta_TruncatedPayload verifies that a payload shorter than the
// declared length returns an error.
func TestReadMeta_TruncatedPayload(t *testing.T) {
	payload := []byte(`{"name":"ok","size":1,"chunks":1}`)
	var buf bytes.Buffer
	// Declare a length larger than the actual payload.
	binary.Write(&buf, binary.BigEndian, uint32(len(payload)+100))
	buf.Write(payload) // only partial data
	_, err := readMeta(&buf)
	if err == nil {
		t.Error("expected error for truncated payload, got nil")
	}
}

// TestReadMeta_LengthPrefixOnly verifies that a stream containing only the
// 4-byte length with no body returns an error.
func TestReadMeta_LengthPrefixOnly(t *testing.T) {
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(42))
	// Write no body.
	_, err := readMeta(&buf)
	if err == nil {
		t.Error("expected error for missing body, got nil")
	}
}

// TestReadMeta_EmptyStream verifies that an empty reader returns an error.
func TestReadMeta_EmptyStream(t *testing.T) {
	_, err := readMeta(bytes.NewReader(nil))
	if err == nil {
		t.Error("expected error for empty stream, got nil")
	}
}

// TestReadMeta_LengthExceedsMaxMetaLength verifies that a length-prefix value
// exceeding maxMetaLength is rejected before allocation.
func TestReadMeta_LengthExceedsMaxMetaLength(t *testing.T) {
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(maxMetaLength+1))
	// No body needed; the check should fire on the length prefix alone.
	_, err := readMeta(&buf)
	if err == nil {
		t.Error("expected error for length > maxMetaLength, got nil")
	}
}

// TestReadMeta_FilesWithNegativeSize verifies that a FileMeta with a negative
// Size is rejected.
func TestReadMeta_FilesWithNegativeSize(t *testing.T) {
	m := Meta{
		Name: "dir", Size: 1, Chunks: 1, IsBatch: true,
		Files: []FileMeta{
			{Path: "ok.txt", Size: 10, Hash: "aabb"},
			{Path: "bad.txt", Size: -1, Hash: "ccdd"},
		},
	}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	_, err = readMeta(bytes.NewReader(raw))
	if err == nil {
		t.Error("expected error for FileMeta with negative Size, got nil")
	}
}

// TestReadMeta_FilesWithOversizedEntry verifies that a FileMeta entry whose
// Size exceeds maxFileSize is rejected.
func TestReadMeta_FilesWithOversizedEntry(t *testing.T) {
	m := Meta{
		Name: "dir", Size: 1, Chunks: 1, IsBatch: true,
		Files: []FileMeta{
			{Path: "huge.bin", Size: maxFileSize + 1, Hash: "aabb"},
		},
	}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	_, err = readMeta(bytes.NewReader(raw))
	if err == nil {
		t.Error("expected error for FileMeta.Size > maxFileSize, got nil")
	}
}

// TestReadMeta_ValidBoundaryChunks checks that the boundary values 1 and
// maxChunks are both accepted.
func TestReadMeta_ValidBoundaryChunks(t *testing.T) {
	for _, chunks := range []int{1, maxChunks} {
		m := Meta{Name: "file.bin", Size: 1, Chunks: chunks}
		raw, err := writeRawMeta(m)
		if err != nil {
			t.Fatal(err)
		}
		if _, err := readMeta(bytes.NewReader(raw)); err != nil {
			t.Errorf("Chunks=%d should be accepted: %v", chunks, err)
		}
	}
}

// TestReadMeta_MaxValidSize checks that exactly maxFileSize is accepted.
func TestReadMeta_MaxValidSize(t *testing.T) {
	m := Meta{Name: "tib.bin", Size: maxFileSize, Chunks: 1}
	raw, err := writeRawMeta(m)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := readMeta(bytes.NewReader(raw)); err != nil {
		t.Errorf("Size=maxFileSize should be accepted: %v", err)
	}
}
