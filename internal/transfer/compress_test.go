package transfer

import (
	"bytes"
	"io"
	"testing"
)

func TestZstdEncoderLevel(t *testing.T) {
	// 主にパニックしないことの確認
	for _, level := range []int{-1, 0, 1, 2, 3, 5, 7, 9, 10} {
		l := zstdEncoderLevel(level)
		if l == 0 {
			t.Errorf("zstdEncoderLevel(%d) returned zero value", level)
		}
	}
}

func TestCompressRoundtrip(t *testing.T) {
	original := bytes.Repeat([]byte("hello world this is a test string "), 1000)

	for _, level := range []int{0, 1, 5, 9} {
		var buf bytes.Buffer
		enc, err := newZstdEncoder(&buf, level)
		if err != nil {
			t.Fatalf("level=%d: newZstdEncoder: %v", level, err)
		}
		if _, err := io.Copy(enc, bytes.NewReader(original)); err != nil {
			t.Fatalf("level=%d: encode: %v", level, err)
		}
		if err := enc.Close(); err != nil {
			t.Fatalf("level=%d: enc.Close: %v", level, err)
		}

		// 圧縮後はサイズが小さくなるはず（繰り返しデータのため）
		if buf.Len() >= len(original) {
			t.Errorf("level=%d: compressed size %d >= original %d", level, buf.Len(), len(original))
		}

		dec, err := newZstdDecoder(&buf)
		if err != nil {
			t.Fatalf("level=%d: newZstdDecoder: %v", level, err)
		}
		defer dec.Close()
		got, err := io.ReadAll(dec)
		if err != nil {
			t.Fatalf("level=%d: decode: %v", level, err)
		}
		if !bytes.Equal(got, original) {
			t.Errorf("level=%d: roundtrip mismatch: got %d bytes, want %d", level, len(got), len(original))
		}
	}
}

func TestMetaSerializationCompressed(t *testing.T) {
	m := Meta{
		Name:       "test.log",
		Size:       1024,
		Hash:       "abc123",
		Chunks:     4,
		Compressed: true,
		CompLevel:  3,
	}
	var buf bytes.Buffer
	if err := writeMeta(&buf, m); err != nil {
		t.Fatalf("writeMeta: %v", err)
	}
	got, err := readMeta(&buf)
	if err != nil {
		t.Fatalf("readMeta: %v", err)
	}
	if got.Compressed != true || got.CompLevel != 3 {
		t.Errorf("Compressed/CompLevel not preserved: got %+v", got)
	}
}

func TestMetaSerializationBackwardCompat(t *testing.T) {
	// Compressed フィールドなし（旧クライアント互換）
	m := Meta{Name: "old.bin", Size: 512, Chunks: 1}
	var buf bytes.Buffer
	if err := writeMeta(&buf, m); err != nil {
		t.Fatalf("writeMeta: %v", err)
	}
	got, err := readMeta(&buf)
	if err != nil {
		t.Fatalf("readMeta: %v", err)
	}
	if got.Compressed != false {
		t.Errorf("want Compressed=false for old meta, got true")
	}
}

func BenchmarkZstdEncode(b *testing.B) {
	data := bytes.Repeat([]byte("benchmark data content here "), 1024) // ~29KB
	b.SetBytes(int64(len(data)))
	b.ReportAllocs()
	for b.Loop() {
		var buf bytes.Buffer
		enc, _ := newZstdEncoder(&buf, 0)
		io.Copy(enc, bytes.NewReader(data)) //nolint:errcheck
		enc.Close()
	}
}
