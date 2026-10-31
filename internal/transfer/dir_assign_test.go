package transfer

import (
	"testing"
)

// TestAssignChunks_TableDriven covers the requirements from issue #190.
func TestAssignChunks_TableDriven(t *testing.T) {
	cases := []struct {
		name          string
		files         []FileMeta
		nChunks       int
		wantMinChunks int // minimum number of assignments expected
		wantCoverage  bool // check that every byte is covered exactly once
	}{
		{
			name: "zero-size single file",
			files: []FileMeta{
				{Path: "empty.txt", Size: 0},
			},
			nChunks:       4,
			wantMinChunks: 0, // zero-size files produce no chunk data ranges
			wantCoverage:  false,
		},
		{
			name: "single file single chunk",
			files: []FileMeta{
				{Path: "a.bin", Size: 1024},
			},
			nChunks:       1,
			wantMinChunks: 1,
			wantCoverage:  true,
		},
		{
			name: "single file multiple chunks",
			files: []FileMeta{
				{Path: "a.bin", Size: 1000},
			},
			nChunks:       4,
			wantMinChunks: 4,
			wantCoverage:  true,
		},
		{
			name: "multiple files",
			files: []FileMeta{
				{Path: "a.bin", Size: 500},
				{Path: "b.bin", Size: 1500},
				{Path: "c.bin", Size: 1000},
			},
			nChunks:       6,
			wantMinChunks: 3, // at least one chunk per file
			wantCoverage:  true,
		},
		{
			name: "files larger than chunk size boundary",
			files: []FileMeta{
				{Path: "large.bin", Size: 100_000},
			},
			nChunks:       8,
			wantMinChunks: 8,
			wantCoverage:  true,
		},
		{
			name: "nChunks less than file count forces minimum",
			files: []FileMeta{
				{Path: "a.bin", Size: 100},
				{Path: "b.bin", Size: 200},
				{Path: "c.bin", Size: 300},
			},
			nChunks:       1, // should be bumped to 3
			wantMinChunks: 3,
			wantCoverage:  true,
		},
		{
			name: "equal-sized files",
			files: []FileMeta{
				{Path: "x.bin", Size: 512},
				{Path: "y.bin", Size: 512},
			},
			nChunks:       4,
			wantMinChunks: 2,
			wantCoverage:  true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := assignChunks(tc.files, tc.nChunks)

			if len(got) < tc.wantMinChunks {
				t.Errorf("assignChunks returned %d assignments, want at least %d", len(got), tc.wantMinChunks)
			}

			if tc.wantCoverage {
				// Verify coverage: for each file, the union of chunk ranges
				// must cover [0, fileSize) without gaps.
				type rangeVal struct{ start, end int64 }
				fileRanges := make([][]rangeVal, len(tc.files))
				for _, a := range got {
					if a.fileIndex < 0 || a.fileIndex >= len(tc.files) {
						t.Errorf("chunkAssignment.fileIndex %d out of range [0,%d)", a.fileIndex, len(tc.files))
						continue
					}
					fileRanges[a.fileIndex] = append(fileRanges[a.fileIndex], rangeVal{a.offset, a.offset + a.size})
				}
				for fi, f := range tc.files {
					if f.Size == 0 {
						continue // zero-size files have no byte ranges
					}
					covered := make([]bool, f.Size)
					for _, r := range fileRanges[fi] {
						for b := r.start; b < r.end; b++ {
							if b < 0 || b >= f.Size {
								t.Errorf("file[%d] %s: chunk range [%d,%d) goes out of bounds (size=%d)",
									fi, f.Path, r.start, r.end, f.Size)
								continue
							}
							if covered[b] {
								t.Errorf("file[%d] %s: byte %d covered twice (overlap)", fi, f.Path, b)
							}
							covered[b] = true
						}
					}
					for b, c := range covered {
						if !c {
							t.Errorf("file[%d] %s: byte %d not covered by any chunk", fi, f.Path, b)
							break
						}
					}
				}
			}
		})
	}
}

// TestAssignChunks_MinOneChunkPerFile ensures every non-empty file gets at least one chunk.
func TestAssignChunks_MinOneChunkPerFile(t *testing.T) {
	files := []FileMeta{
		{Path: "tiny.txt", Size: 1},
		{Path: "medium.bin", Size: 1000},
		{Path: "large.dat", Size: 100_000},
	}
	got := assignChunks(files, 1) // nChunks=1 < len(files)=3

	// Count chunks per file.
	counts := make(map[int]int)
	for _, a := range got {
		counts[a.fileIndex]++
	}
	for i := range files {
		if counts[i] < 1 {
			t.Errorf("file[%d] got 0 chunks, expected at least 1", i)
		}
	}
}

// TestAssignChunks_NoNegativeOffsetOrSize ensures no assignment has a negative
// offset or size value, which would be invalid for file I/O.
func TestAssignChunks_NoNegativeOffsetOrSize(t *testing.T) {
	files := []FileMeta{
		{Path: "a.bin", Size: 999},
		{Path: "b.bin", Size: 1},
		{Path: "c.bin", Size: 10000},
	}
	got := assignChunks(files, 7)
	for i, a := range got {
		if a.offset < 0 {
			t.Errorf("assignment[%d] has negative offset %d", i, a.offset)
		}
		if a.size <= 0 {
			t.Errorf("assignment[%d] has non-positive size %d", i, a.size)
		}
	}
}

// TestTotalDirSize verifies the totalDirSize helper.
func TestTotalDirSize(t *testing.T) {
	files := []FileMeta{
		{Path: "a", Size: 100},
		{Path: "b", Size: 200},
		{Path: "c", Size: 50},
	}
	got := totalDirSize(files)
	if got != 350 {
		t.Errorf("totalDirSize = %d, want 350", got)
	}
}

// TestTotalDirSize_Empty verifies that an empty file list returns 0.
func TestTotalDirSize_Empty(t *testing.T) {
	if got := totalDirSize(nil); got != 0 {
		t.Errorf("totalDirSize(nil) = %d, want 0", got)
	}
}
