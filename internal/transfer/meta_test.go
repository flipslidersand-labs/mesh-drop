package transfer

import (
	"bytes"
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
