package transfer

import (
	"bytes"
	"fmt"
	"os"
	"strings"
	"testing"
)

func TestAssignChunks_SkewDetection_Warns(t *testing.T) {
	// One huge file and many tiny ones → chunks concentrated on the big file.
	files := []FileMeta{
		{Path: "big.bin", Size: 100 << 20},  // 100 MB
		{Path: "a.txt", Size: 1},
		{Path: "b.txt", Size: 1},
		{Path: "c.txt", Size: 1},
	}
	assignments := assignChunks(files, 20)

	// Redirect stderr to capture warning.
	r, w, _ := os.Pipe()
	orig := os.Stderr
	os.Stderr = w

	warnChunkSkew(files, assignments)

	w.Close()
	os.Stderr = orig
	var buf bytes.Buffer
	buf.ReadFrom(r)

	if !strings.Contains(buf.String(), "[WARN]") {
		t.Fatalf("expected skew warning, stderr was: %q", buf.String())
	}
}

func TestAssignChunks_EvenDistribution_NoWarn(t *testing.T) {
	// Files of equal size → uniform chunk distribution, no warning.
	files := make([]FileMeta, 4)
	for i := range files {
		files[i] = FileMeta{Path: fmt.Sprintf("f%d.bin", i), Size: 10 << 20}
	}
	assignments := assignChunks(files, 16)

	r, w, _ := os.Pipe()
	orig := os.Stderr
	os.Stderr = w

	warnChunkSkew(files, assignments)

	w.Close()
	os.Stderr = orig
	var buf bytes.Buffer
	buf.ReadFrom(r)

	if strings.Contains(buf.String(), "[WARN]") {
		t.Fatalf("unexpected skew warning for even distribution: %q", buf.String())
	}
}

func TestWarnChunkSkew_SingleFile_NoWarn(t *testing.T) {
	files := []FileMeta{{Path: "only.bin", Size: 1 << 20}}
	assignments := assignChunks(files, 4)

	r, w, _ := os.Pipe()
	orig := os.Stderr
	os.Stderr = w
	warnChunkSkew(files, assignments)
	w.Close()
	os.Stderr = orig

	var buf bytes.Buffer
	buf.ReadFrom(r)
	if strings.Contains(buf.String(), "[WARN]") {
		t.Fatalf("single file must not warn: %q", buf.String())
	}
}
