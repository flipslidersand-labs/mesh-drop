package transfer

import (
	"bytes"
	"math"
	"os"
	"path/filepath"
	"testing"

	"github.com/klauspost/compress/zstd"
)

// ピア指定のチャンク範囲・圧縮データでチャンク範囲外へ書き込めないことの回帰テスト（private advisory）。

func TestValidateChunkRange(t *testing.T) {
	f, err := os.Create(filepath.Join(t.TempDir(), "f"))
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	if err := f.Truncate(100); err != nil {
		t.Fatal(err)
	}
	for _, tc := range []struct {
		name         string
		offset, size int64
		ok           bool
	}{
		{"whole", 0, 100, true},
		{"tail", 90, 10, true},
		{"empty at end", 100, 0, true},
		{"past end", 90, 11, false},
		{"offset past end", 101, 0, false},
		{"negative offset", -1, 10, false},
		{"negative size", 0, -1, false},
		// Offset+Size が int64 で負に回り込み、旧実装の Offset+Size > fileSize 判定を素通りしていた。
		{"overflow", 10 << 40, math.MaxInt64 - (10 << 40) + 1, false},
		{"overflow max", math.MaxInt64, math.MaxInt64, false},
	} {
		err := validateChunkRange(f, ChunkMeta{Offset: tc.offset, Size: tc.size})
		if (err == nil) != tc.ok {
			t.Errorf("%s: err=%v, want ok=%v", tc.name, err, tc.ok)
		}
	}
}

func TestValidateChunkRange_StatErrorRejects(t *testing.T) {
	f, err := os.Create(filepath.Join(t.TempDir(), "f"))
	if err != nil {
		t.Fatal(err)
	}
	f.Close() // Stat が失敗する状態
	if err := validateChunkRange(f, ChunkMeta{Offset: 0, Size: 1}); err == nil {
		t.Error("stat failure must reject the chunk (fail closed)")
	}
}

func zstdCompress(t *testing.T, data []byte, opts ...zstd.EOption) []byte {
	t.Helper()
	var buf bytes.Buffer
	enc, err := zstd.NewWriter(&buf, opts...)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := enc.Write(data); err != nil {
		t.Fatal(err)
	}
	if err := enc.Close(); err != nil {
		t.Fatal(err)
	}
	return buf.Bytes()
}

func TestCopyDecompressedN(t *testing.T) {
	// 10 MiB のゼロ列は数百バイトに圧縮される（decompression bomb）。
	bomb := zstdCompress(t, make([]byte, 10<<20))
	for _, tc := range []struct {
		name string
		data []byte
		size int64
		ok   bool
	}{
		{"exact", zstdCompress(t, []byte("hello world")), 11, true},
		{"short", zstdCompress(t, []byte("hello")), 11, false},
		{"bomb", bomb, 1000, false},
	} {
		dec, err := newZstdDecoder(bytes.NewReader(tc.data))
		if err != nil {
			t.Fatal(err)
		}
		var dst bytes.Buffer
		err = copyDecompressedN(&dst, dec, tc.size, 0)
		dec.Close()
		if (err == nil) != tc.ok {
			t.Errorf("%s: err=%v, want ok=%v", tc.name, err, tc.ok)
		}
		if int64(dst.Len()) > tc.size {
			t.Errorf("%s: wrote %d bytes, must never exceed chunk size %d", tc.name, dst.Len(), tc.size)
		}
	}
}

func TestZstdDecoder_RejectsHugeWindow(t *testing.T) {
	data := zstdCompress(t, make([]byte, 64<<20), zstd.WithWindowSize(128<<20), zstd.WithEncoderLevel(zstd.SpeedFastest))
	dec, err := newZstdDecoder(bytes.NewReader(data))
	if err != nil {
		t.Fatal(err)
	}
	defer dec.Close()
	if err := copyDecompressedN(&bytes.Buffer{}, dec, 64<<20, 0); err == nil {
		t.Error("frame declaring a 128 MiB window must be rejected")
	}
}

// エンコーダーの全レベルで作った正常データが上限内で展開できること（誤検知防止）。
func TestZstdDecoder_AcceptsAllEncoderLevels(t *testing.T) {
	data := bytes.Repeat([]byte("mesh-drop compressible payload "), 1<<16) // ~2 MiB
	for lvl := 0; lvl <= 9; lvl++ {
		var buf bytes.Buffer
		enc, err := newZstdEncoder(&buf, lvl)
		if err != nil {
			t.Fatal(err)
		}
		_, _ = enc.Write(data)
		_ = enc.Close()
		dec, err := newZstdDecoder(&buf)
		if err != nil {
			t.Fatal(err)
		}
		var out bytes.Buffer
		if err := copyDecompressedN(&out, dec, int64(len(data)), 0); err != nil {
			t.Errorf("level %d: %v", lvl, err)
		} else if !bytes.Equal(out.Bytes(), data) {
			t.Errorf("level %d: content mismatch", lvl)
		}
		dec.Close()
	}
}
