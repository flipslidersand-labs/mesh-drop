package transfer

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"testing"
)

// errWriter returns an error on Write to exercise error paths.
type errWriter struct{ err error }

func (e errWriter) Write(p []byte) (int, error) { return 0, e.err }

func TestWriteChunkMeta_WriterError(t *testing.T) {
	m := ChunkMeta{Index: 0, Offset: 0, Size: 512}
	err := writeChunkMeta(errWriter{fmt.Errorf("disk full")}, m)
	if err == nil {
		t.Error("want error when writer fails")
	}
}

func TestReadChunkMeta_TooLarge(t *testing.T) {
	var buf bytes.Buffer
	binary.Write(&buf, binary.BigEndian, uint32(maxMetaLength+1)) //nolint:errcheck
	_, err := readChunkMeta(&buf)
	if err == nil {
		t.Error("want error for oversized chunk meta")
	}
}

func TestWriteResumeState_WriterError(t *testing.T) {
	rs := ResumeState{}
	err := writeResumeState(errWriter{fmt.Errorf("no space")}, rs)
	if err == nil {
		t.Error("want error when writer fails")
	}
}

func TestWriteMeta_WriterError(t *testing.T) {
	m := Meta{Name: "test.txt", Size: 1, Chunks: 1}
	err := writeMeta(errWriter{fmt.Errorf("no space")}, m)
	if err == nil {
		t.Error("want error when writer fails")
	}
}

func TestMetaRoundtrip(t *testing.T) {
	original := Meta{Name: "video.mp4", Size: 1234567890, Chunks: 1}

	var buf bytes.Buffer
	if err := writeMeta(&buf, original); err != nil {
		t.Fatalf("writeMeta: %v", err)
	}

	got, err := readMeta(&buf)
	if err != nil {
		t.Fatalf("readMeta: %v", err)
	}

	if got.Name != original.Name {
		t.Errorf("Name = %q, want %q", got.Name, original.Name)
	}
	if got.Size != original.Size {
		t.Errorf("Size = %d, want %d", got.Size, original.Size)
	}
	// バッファが正確に消費されている（ファイルデータ領域を侵食していない）
	if buf.Len() != 0 {
		t.Errorf("buffer has %d unread bytes after readMeta", buf.Len())
	}
}

func TestMetaRoundtrip_UnicodeFilename(t *testing.T) {
	original := Meta{Name: "テスト動画.mp4", Size: 42, Chunks: 1}

	var buf bytes.Buffer
	if err := writeMeta(&buf, original); err != nil {
		t.Fatalf("writeMeta: %v", err)
	}
	got, err := readMeta(&buf)
	if err != nil {
		t.Fatalf("readMeta: %v", err)
	}
	if got.Name != original.Name {
		t.Errorf("Name = %q, want %q", got.Name, original.Name)
	}
}
