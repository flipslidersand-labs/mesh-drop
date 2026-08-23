package transfer

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
)

// TestCheckpoint_RoundTrip verifies that a checkpoint can be saved and
// reloaded correctly, preserving all fields including ChunksDone state.
func TestCheckpoint_RoundTrip(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "file.bin")

	meta := Meta{
		Name:   "file.bin",
		Size:   1024,
		Hash:   "abc123",
		Chunks: 4,
	}

	cp := loadOrCreate(outPath, meta)
	if cp == nil {
		t.Fatal("loadOrCreate returned nil")
	}

	// Mark chunks 0 and 2 as done.
	if err := cp.markDone(0); err != nil {
		t.Fatalf("markDone(0): %v", err)
	}
	if err := cp.markDone(2); err != nil {
		t.Fatalf("markDone(2): %v", err)
	}

	// Reload the checkpoint from disk.
	cp2 := loadOrCreate(outPath, meta)
	if cp2 == nil {
		t.Fatal("second loadOrCreate returned nil")
	}

	done := cp2.doneIndices()
	if len(done) != 2 {
		t.Fatalf("expected 2 done indices, got %d: %v", len(done), done)
	}
	doneSet := make(map[int]bool)
	for _, d := range done {
		doneSet[d] = true
	}
	if !doneSet[0] || !doneSet[2] {
		t.Errorf("expected chunks 0 and 2 to be done, got %v", done)
	}
	if doneSet[1] || doneSet[3] {
		t.Errorf("chunks 1 and 3 should not be done, got %v", done)
	}
}

// TestCheckpoint_ChunksDoneLongerThanTotal verifies that a state file where
// ChunksDone is longer than ChunksTotal is rejected (treated as corrupt).
func TestCheckpoint_ChunksDoneLongerThanTotal(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "file.bin")
	stateFile := checkpointPath(outPath)

	// Write a deliberately corrupt state: ChunksDone has more entries than ChunksTotal.
	corrupt := checkpointState{
		Name:        "file.bin",
		Size:        512,
		Hash:        "aabbcc",
		ChunksTotal: 2,
		ChunksDone:  []bool{true, true, true}, // len=3 > ChunksTotal=2
	}
	data, _ := json.Marshal(corrupt)
	if err := os.WriteFile(stateFile, data, 0o600); err != nil {
		t.Fatal(err)
	}

	meta := Meta{Name: "file.bin", Size: 512, Hash: "aabbcc", Chunks: 2}
	cp := loadOrCreate(outPath, meta)

	// Should have been treated as a new checkpoint with no done chunks.
	done := cp.doneIndices()
	if len(done) != 0 {
		t.Errorf("expected no done chunks after corrupt state, got %v", done)
	}
}

// TestCheckpoint_CorruptJSON verifies that a state file containing invalid
// JSON is discarded and a fresh checkpoint is returned.
func TestCheckpoint_CorruptJSON(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "file.bin")
	stateFile := checkpointPath(outPath)

	// Write garbage JSON.
	if err := os.WriteFile(stateFile, []byte("{not valid json!!!"), 0o600); err != nil {
		t.Fatal(err)
	}

	meta := Meta{Name: "file.bin", Size: 100, Hash: "deadbeef", Chunks: 3}
	cp := loadOrCreate(outPath, meta)

	done := cp.doneIndices()
	if len(done) != 0 {
		t.Errorf("expected no done chunks after corrupt JSON, got %v", done)
	}
}

// TestCheckpoint_ResumeSkipsDoneChunks verifies that doneIndices returns the
// correct set of completed chunk indices that a sender can skip on resume.
func TestCheckpoint_ResumeSkipsDoneChunks(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "big.bin")

	meta := Meta{Name: "big.bin", Size: 8192, Hash: "cafebabe", Chunks: 8}
	cp := loadOrCreate(outPath, meta)

	// Simulate partial completion: chunks 1, 3, 5 are done.
	for _, idx := range []int{1, 3, 5} {
		if err := cp.markDone(idx); err != nil {
			t.Fatalf("markDone(%d): %v", idx, err)
		}
	}

	// Reload and confirm doneIndices matches.
	cp2 := loadOrCreate(outPath, meta)
	got := cp2.doneIndices()

	gotSet := make(map[int]bool)
	for _, d := range got {
		gotSet[d] = true
	}
	for _, want := range []int{1, 3, 5} {
		if !gotSet[want] {
			t.Errorf("expected chunk %d to be in doneIndices, got %v", want, got)
		}
	}
	for _, notWant := range []int{0, 2, 4, 6, 7} {
		if gotSet[notWant] {
			t.Errorf("chunk %d should not be done, but was in doneIndices %v", notWant, got)
		}
	}
}

// TestCheckpoint_IsAllDone verifies the isAllDone helper for both partial and
// fully-completed states.
func TestCheckpoint_IsAllDone(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "small.bin")

	meta := Meta{Name: "small.bin", Size: 64, Hash: "ff00", Chunks: 3}
	cp := loadOrCreate(outPath, meta)

	if cp.isAllDone() {
		t.Error("isAllDone should be false before any markDone calls")
	}

	_ = cp.markDone(0)
	_ = cp.markDone(1)
	if cp.isAllDone() {
		t.Error("isAllDone should be false with only 2/3 chunks done")
	}

	_ = cp.markDone(2)
	if !cp.isAllDone() {
		t.Error("isAllDone should be true after all 3 chunks marked done")
	}
}

// TestCheckpoint_Finish verifies that the state file is removed on finish.
func TestCheckpoint_Finish(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "done.bin")
	stateFile := checkpointPath(outPath)

	meta := Meta{Name: "done.bin", Size: 100, Hash: "1234", Chunks: 1}
	cp := loadOrCreate(outPath, meta)
	_ = cp.markDone(0)

	// State file must exist after markDone.
	if _, err := os.Stat(stateFile); err != nil {
		t.Fatalf("state file missing after markDone: %v", err)
	}

	cp.finish()

	if _, err := os.Stat(stateFile); !os.IsNotExist(err) {
		t.Errorf("state file should not exist after finish, got err: %v", err)
	}
}

// TestCheckpoint_MarkDone_OutOfRange verifies that markDone rejects out-of-range
// indices rather than panicking or silently corrupting state.
func TestCheckpoint_MarkDone_OutOfRange(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "file.bin")

	meta := Meta{Name: "file.bin", Size: 100, Hash: "aaa", Chunks: 2}
	cp := loadOrCreate(outPath, meta)

	if err := cp.markDone(-1); err == nil {
		t.Error("markDone(-1) should return error for negative index")
	}
	if err := cp.markDone(2); err == nil {
		t.Error("markDone(2) should return error when ChunksTotal==2")
	}
}

// TestCheckpoint_MetaMismatch_ReturnsNew verifies that when the stored state
// belongs to a different transfer (different hash/size/name), loadOrCreate
// returns a fresh checkpoint rather than the stale one.
func TestCheckpoint_MetaMismatch_ReturnsNew(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "file.bin")

	metaA := Meta{Name: "file.bin", Size: 100, Hash: "aaaa", Chunks: 2}
	cpA := loadOrCreate(outPath, metaA)
	_ = cpA.markDone(0)
	_ = cpA.markDone(1)

	// Now load with different hash — should be treated as a new transfer.
	metaB := Meta{Name: "file.bin", Size: 100, Hash: "bbbb", Chunks: 2}
	cpB := loadOrCreate(outPath, metaB)
	done := cpB.doneIndices()
	if len(done) != 0 {
		t.Errorf("expected empty done list for new transfer, got %v", done)
	}
}

// TestCheckpointFinishIdempotent verifies that calling finish() twice does not
// panic or return an error. This is important because doReceiveFileResume uses
// a deferred cp.finish() that runs on every exit path, including paths that
// already call cp.finish() explicitly (e.g. hash mismatch, success).
func TestCheckpointFinishIdempotent(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "idem.bin")

	meta := Meta{Name: "idem.bin", Size: 100, Hash: "deadbeef", Chunks: 2}
	cp := loadOrCreate(outPath, meta)

	// Mark one chunk done so the state file is flushed to disk.
	if err := cp.markDone(0); err != nil {
		t.Fatalf("markDone(0): %v", err)
	}

	// First finish: should flush dirty state and remove the state file.
	cp.finish()

	// State file must be gone after first finish.
	stateFile := checkpointPath(outPath)
	if _, err := os.Stat(stateFile); !os.IsNotExist(err) {
		t.Errorf("state file should be removed after first finish(), err: %v", err)
	}

	// Second finish: must not panic. os.Remove on a missing file is silently ignored.
	cp.finish()
}

// TestCheckpointFinishWithoutDirty verifies that finish() on a clean (never
// written) checkpoint also removes the state file without error.
func TestCheckpointFinishWithoutDirty(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "clean.bin")
	stateFile := checkpointPath(outPath)

	meta := Meta{Name: "clean.bin", Size: 50, Hash: "cafe", Chunks: 1}
	cp := loadOrCreate(outPath, meta)

	// No markDone calls — state file is never written (small transfer: saveBatchSize
	// threshold not reached with 0 markDone calls, so dirty=false).
	// Manually write the file to simulate a real scenario.
	if err := os.WriteFile(stateFile, []byte("{}"), 0o600); err != nil {
		t.Fatal(err)
	}

	cp.finish()

	// The state file should have been removed.
	if _, err := os.Stat(stateFile); !os.IsNotExist(err) {
		t.Errorf("state file should be removed after finish(), err: %v", err)
	}
}

// TestCheckpoint_ShortChunksDoneSlice verifies that a state file whose
// ChunksDone slice is shorter than ChunksTotal (from an older version) is
// safely padded with false values.
func TestCheckpoint_ShortChunksDoneSlice(t *testing.T) {
	dir := t.TempDir()
	outPath := filepath.Join(dir, "file.bin")
	stateFile := checkpointPath(outPath)

	// Write a state with ChunksTotal=4 but only 2 ChunksDone entries.
	short := checkpointState{
		Name:        "file.bin",
		Size:        200,
		Hash:        "short",
		ChunksTotal: 4,
		ChunksDone:  []bool{true, false},
	}
	data, _ := json.Marshal(short)
	if err := os.WriteFile(stateFile, data, 0o600); err != nil {
		t.Fatal(err)
	}

	meta := Meta{Name: "file.bin", Size: 200, Hash: "short", Chunks: 4}
	cp := loadOrCreate(outPath, meta)

	// chunk 0 should be done, 1-3 should not
	done := cp.doneIndices()
	if len(done) != 1 || done[0] != 0 {
		t.Errorf("expected only chunk 0 done after padding short slice, got %v", done)
	}
	if cp.isAllDone() {
		t.Error("should not be all done after padding short slice")
	}
}
