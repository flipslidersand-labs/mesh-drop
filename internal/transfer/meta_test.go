package transfer

import (
	"bytes"
	"encoding/binary"
	"testing"
)

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

func TestChunkMetaRoundtrip_Direct(t *testing.T) {
	original := ChunkMeta{Index: 2, Offset: 1024, Size: 512, FileIndex: 3}

	var buf bytes.Buffer
	if err := writeChunkMeta(&buf, original); err != nil {
		t.Fatalf("writeChunkMeta: %v", err)
	}
	got, err := readChunkMeta(&buf)
	if err != nil {
		t.Fatalf("readChunkMeta: %v", err)
	}
	if got.Index != original.Index || got.Offset != original.Offset ||
		got.Size != original.Size || got.FileIndex != original.FileIndex {
		t.Errorf("ChunkMeta roundtrip mismatch: got %+v, want %+v", got, original)
	}
	if buf.Len() != 0 {
		t.Errorf("buffer has %d unread bytes after readChunkMeta", buf.Len())
	}
}

func TestReadChunkMeta_TooLarge(t *testing.T) {
	var buf bytes.Buffer
	// Write a length that exceeds maxMetaLength.
	if err := binary.Write(&buf, binary.BigEndian, uint32(maxMetaLength+1)); err != nil {
		t.Fatal(err)
	}
	_, err := readChunkMeta(&buf)
	if err == nil {
		t.Fatal("expected error for oversized chunk meta, got nil")
	}
}

func TestResumeStateRoundtrip(t *testing.T) {
	original := ResumeState{
		ChunksDone: []int{0, 2, 4},
		DirDone:    []string{"a/b.txt", "c/d.txt"},
	}

	var buf bytes.Buffer
	if err := writeResumeState(&buf, original); err != nil {
		t.Fatalf("writeResumeState: %v", err)
	}
	got, err := readResumeState(&buf)
	if err != nil {
		t.Fatalf("readResumeState: %v", err)
	}
	if len(got.ChunksDone) != len(original.ChunksDone) {
		t.Errorf("ChunksDone len = %d, want %d", len(got.ChunksDone), len(original.ChunksDone))
	}
	for i, v := range original.ChunksDone {
		if got.ChunksDone[i] != v {
			t.Errorf("ChunksDone[%d] = %d, want %d", i, got.ChunksDone[i], v)
		}
	}
	if len(got.DirDone) != len(original.DirDone) {
		t.Errorf("DirDone len = %d, want %d", len(got.DirDone), len(original.DirDone))
	}
}

func TestReadResumeState_TooLarge(t *testing.T) {
	var buf bytes.Buffer
	if err := binary.Write(&buf, binary.BigEndian, uint32(maxMetaLength+1)); err != nil {
		t.Fatal(err)
	}
	_, err := readResumeState(&buf)
	if err == nil {
		t.Fatal("expected error for oversized resume state, got nil")
	}
}
