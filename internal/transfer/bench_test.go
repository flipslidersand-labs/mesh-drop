package transfer

import (
	"bytes"
	"strings"
	"testing"
)

// BenchmarkHashReader measures the throughput of hashReader over a synthetic
// in-memory payload.  Run with -benchtime=3s or larger for stable results.
func BenchmarkHashReader(b *testing.B) {
	sizes := []struct {
		name string
		size int
	}{
		{"64KB", 64 << 10},
		{"1MB", 1 << 20},
		{"16MB", 16 << 20},
	}

	for _, tc := range sizes {
		tc := tc
		payload := bytes.Repeat([]byte{0xAB}, tc.size)

		b.Run(tc.name, func(b *testing.B) {
			b.SetBytes(int64(tc.size))
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				r := bytes.NewReader(payload)
				if _, err := hashReader(r); err != nil {
					b.Fatal(err)
				}
			}
		})
	}
}

// BenchmarkHashReader_SmallChunks benchmarks hashReader with a small reader
// to measure overhead when the content is tiny (e.g. metadata blobs).
func BenchmarkHashReader_SmallChunks(b *testing.B) {
	r := strings.NewReader("hello meshdrop benchmark")
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		r.Seek(0, 0) //nolint:errcheck
		if _, err := hashReader(r); err != nil {
			b.Fatal(err)
		}
	}
}

// BenchmarkWriteMeta measures the cost of serialising a Meta to a byte buffer.
func BenchmarkWriteMeta(b *testing.B) {
	m := Meta{Name: "benchmark-file.bin", Size: 1 << 30, Chunks: 8}
	var buf bytes.Buffer
	buf.Grow(512)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		buf.Reset()
		if err := writeMeta(&buf, m); err != nil {
			b.Fatal(err)
		}
	}
}

// BenchmarkReadMeta measures the cost of deserialising a Meta from a framed
// byte buffer, including bounds checking.
func BenchmarkReadMeta(b *testing.B) {
	m := Meta{Name: "benchmark-file.bin", Size: 1 << 30, Chunks: 8}
	var raw bytes.Buffer
	if err := writeMeta(&raw, m); err != nil {
		b.Fatal(err)
	}
	payload := raw.Bytes()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		if _, err := readMeta(bytes.NewReader(payload)); err != nil {
			b.Fatal(err)
		}
	}
}

// BenchmarkReadMeta_BatchMode measures readMeta with a batch (directory)
// Meta containing many FileMeta entries.
func BenchmarkReadMeta_BatchMode(b *testing.B) {
	const fileCount = 1000
	files := make([]FileMeta, fileCount)
	for i := range files {
		files[i] = FileMeta{
			Path: "subdir/file.bin",
			Size: int64(i * 1024),
			Hash: "aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899",
		}
	}
	m := Meta{
		Name: "archive", Size: 1 << 30, Chunks: 4,
		IsBatch: true, Files: files,
	}
	var raw bytes.Buffer
	if err := writeMeta(&raw, m); err != nil {
		b.Fatal(err)
	}
	payload := raw.Bytes()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		if _, err := readMeta(bytes.NewReader(payload)); err != nil {
			b.Fatal(err)
		}
	}
}

// BenchmarkWriteChunkMeta measures the cost of serialising a ChunkMeta frame.
func BenchmarkWriteChunkMeta(b *testing.B) {
	cm := ChunkMeta{Index: 3, Offset: 3 * (64 << 20), Size: 64 << 20, FileIndex: 0}
	var buf bytes.Buffer
	buf.Grow(128)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		buf.Reset()
		if err := writeChunkMeta(&buf, cm); err != nil {
			b.Fatal(err)
		}
	}
}

// BenchmarkAssignChunks measures how quickly chunks can be distributed across
// N parallel streams.
func BenchmarkAssignChunks(b *testing.B) {
	cases := []struct {
		name   string
		size   int64
		chunks int
	}{
		{"4chunks_1GB", 1 << 30, 4},
		{"8chunks_4GB", 4 << 30, 8},
		{"16chunks_8GB", 8 << 30, 16},
		{"64chunks_16GB", 16 << 30, 64},
	}

	for _, tc := range cases {
		tc := tc
		b.Run(tc.name, func(b *testing.B) {
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				benchAssignChunks(tc.size, tc.chunks)
			}
		})
	}
}

// benchAssignChunks returns a slice of ChunkMeta values that partition [0, size)
// into n contiguous, non-overlapping ranges.  It mirrors the assignment logic
// used by the sender before dispatching parallel data streams.
func benchAssignChunks(size int64, n int) []ChunkMeta {
	chunks := make([]ChunkMeta, n)
	base := size / int64(n)
	remainder := size % int64(n)
	var offset int64
	for i := 0; i < n; i++ {
		chunkSize := base
		if int64(i) < remainder {
			chunkSize++
		}
		chunks[i] = ChunkMeta{
			Index:  i,
			Offset: offset,
			Size:   chunkSize,
		}
		offset += chunkSize
	}
	return chunks
}
