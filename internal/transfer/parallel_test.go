package transfer

import (
	"bytes"
	"os"
	"testing"
)

func TestChunkMetaRoundtrip(t *testing.T) {
	original := ChunkMeta{Index: 2, Offset: 65536, Size: 32768}

	var buf bytes.Buffer
	if err := writeChunkMeta(&buf, original); err != nil {
		t.Fatalf("writeChunkMeta: %v", err)
	}
	got, err := readChunkMeta(&buf)
	if err != nil {
		t.Fatalf("readChunkMeta: %v", err)
	}
	if got != original {
		t.Errorf("got %+v, want %+v", got, original)
	}
	if buf.Len() != 0 {
		t.Errorf("buffer has %d unread bytes", buf.Len())
	}
}

func TestOffsetWriter(t *testing.T) {
	f, err := os.CreateTemp(t.TempDir(), "ow-*.bin")
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()

	// ファイルを 20 バイトに拡張
	if err := f.Truncate(20); err != nil {
		t.Fatal(err)
	}

	// offset=5 から "hello" を書き込む
	ow := &offsetWriter{f: f, off: 5}
	if _, err := ow.Write([]byte("hello")); err != nil {
		t.Fatal(err)
	}
	// offset が進んでいること
	if ow.off != 10 {
		t.Errorf("offset after write = %d, want 10", ow.off)
	}

	// 内容確認
	buf := make([]byte, 5)
	if _, err := f.ReadAt(buf, 5); err != nil {
		t.Fatal(err)
	}
	if string(buf) != "hello" {
		t.Errorf("ReadAt(5) = %q, want %q", buf, "hello")
	}
}

func TestMetaChunks_FieldRoundtrip(t *testing.T) {
	original := Meta{Name: "big.zip", Size: 1 << 30, Hash: "abc123", Chunks: 8}
	var buf bytes.Buffer
	if err := writeMeta(&buf, original); err != nil {
		t.Fatal(err)
	}
	got, err := readMeta(&buf)
	if err != nil {
		t.Fatal(err)
	}
	if got.Chunks != 8 {
		t.Errorf("Chunks = %d, want 8", got.Chunks)
	}
}
