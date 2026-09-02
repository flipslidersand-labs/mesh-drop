package transfer

import (
	"bytes"
	"io"
	"os"
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

func TestIsAlreadyCompressed_KnownFormats(t *testing.T) {
	cases := []struct {
		name    string
		header  []byte
		want    bool
	}{
		{"gzip", []byte{0x1F, 0x8B, 0x08, 0x00}, true},
		{"zstd", []byte{0x28, 0xB5, 0x2F, 0xFD, 0x04, 0x00}, true},
		{"zip", []byte{0x50, 0x4B, 0x03, 0x04, 0x14, 0x00}, true},
		{"png", []byte{0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A}, true},
		{"jpeg", []byte{0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10}, true},
		{"plain text", []byte("Hello, world!\n"), false},
		{"go source", []byte("package main\n"), false},
		{"empty-ish", []byte{0x00, 0x00}, false},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			f, err := os.CreateTemp(t.TempDir(), "magic*")
			if err != nil {
				t.Fatal(err)
			}
			if _, err := f.Write(tc.header); err != nil {
				t.Fatal(err)
			}
			path := f.Name()
			f.Close()
			got := isAlreadyCompressed(path)
			if got != tc.want {
				t.Errorf("isAlreadyCompressed(%q header) = %v, want %v", tc.name, got, tc.want)
			}
		})
	}
}

func TestIsAlreadyCompressed_NonExistentFile(t *testing.T) {
	if isAlreadyCompressed("/nonexistent/path/file.gz") {
		t.Error("expected false for nonexistent file")
	}
}

func BenchmarkZstdEncode(b *testing.B) {
	data := bytes.Repeat([]byte("benchmark data content here "), 1024) // ~29KB
	b.SetBytes(int64(len(data)))
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		var buf bytes.Buffer
		enc, _ := newZstdEncoder(&buf, 0)
		io.Copy(enc, bytes.NewReader(data)) //nolint:errcheck
		enc.Close()
	}
}
