//go:build integration

package transfer

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
	"github.com/quic-go/quic-go"
)

const integrationTimeout = 30 * time.Second

// skipIfShort skips the test when -short is given.
func skipIfShort(t *testing.T) {
	t.Helper()
	if testing.Short() {
		t.Skip("integration test: skipped with -short")
	}
}

// setupTestSession initialises a fresh ephemeral session identity for the test
// and restores the zero-value identity when the test ends.
// Without this, localKey() generates a new ephemeral key on every call, which
// causes "peer key mismatch" when the chunk-stream handshake verifies the key
// established in the control-stream handshake.
func setupTestSession(t *testing.T) {
	t.Helper()
	key, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatalf("GenerateKeypair: %v", err)
	}
	initMu.Lock()
	prev := sessionIdentity
	prevInited := sessionInited
	sessionIdentity = key
	sessionInited = true
	initMu.Unlock()
	t.Cleanup(func() {
		initMu.Lock()
		sessionIdentity = prev
		sessionInited = prevInited
		sessionPeers = nil
		initMu.Unlock()
	})
}

// makeSrcFile creates a deterministic file (0x5A pattern) of the given size in dir,
// and returns its path and the hash computed by hashReader.
func makeSrcFile(t *testing.T, dir, name string, size int64) (path, hash string) {
	t.Helper()
	path = filepath.Join(dir, name)
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatalf("mkdirall: %v", err)
	}
	f, err := os.Create(path)
	if err != nil {
		t.Fatalf("create %s: %v", path, err)
	}
	buf := make([]byte, 32*1024)
	for i := range buf {
		buf[i] = 0x5A
	}
	var written int64
	for written < size {
		n := int64(len(buf))
		if n > size-written {
			n = size - written
		}
		if _, err := f.Write(buf[:n]); err != nil {
			f.Close()
			t.Fatalf("write: %v", err)
		}
		written += n
	}
	if _, err := f.Seek(0, 0); err != nil {
		f.Close()
		t.Fatalf("seek: %v", err)
	}
	h, err := hashReader(f)
	f.Close()
	if err != nil {
		t.Fatalf("hash %s: %v", path, err)
	}
	return path, h
}

// gotHash returns the hash of an on-disk file via hashReader.
func gotHash(t *testing.T, path string) string {
	t.Helper()
	f, err := os.Open(path)
	if err != nil {
		t.Fatalf("open %s: %v", path, err)
	}
	defer f.Close()
	h, err := hashReader(f)
	if err != nil {
		t.Fatalf("hash %s: %v", path, err)
	}
	return h
}

// startReceiverOnce starts a QUIC listener on 127.0.0.1:0, accepts one connection
// via dispatchConnToDir (outDir as output directory), and reports the result on
// the returned channel. Listener and context are cleaned up via t.Cleanup.
func startReceiverOnce(t *testing.T, outDir string) (addr string, fp []byte, done <-chan error) {
	t.Helper()
	bundle, err := NewTLSBundle()
	if err != nil {
		t.Fatalf("NewTLSBundle: %v", err)
	}
	ln, err := quic.ListenAddr("127.0.0.1:0", bundle.Config, quicConfig())
	if err != nil {
		t.Fatalf("quic.ListenAddr: %v", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
	t.Cleanup(func() {
		cancel()
		ln.Close()
	})
	ch := make(chan error, 1)
	go func() {
		conn, err := ln.Accept(ctx)
		if err != nil {
			ch <- err
			return
		}
		ch <- dispatchConnToDir(ctx, conn, outDir, conn.RemoteAddr().String(), nil)
	}()
	return ln.Addr().String(), bundle.Fingerprint, ch
}

// startReceiverDirect starts a QUIC listener using dispatchConn (CWD as outDir).
// Used for resume/no-resume tests where checkpoint and tmp files reside in CWD.
func startReceiverDirect(t *testing.T) (addr string, fp []byte, done <-chan error) {
	t.Helper()
	bundle, err := NewTLSBundle()
	if err != nil {
		t.Fatalf("NewTLSBundle: %v", err)
	}
	ln, err := quic.ListenAddr("127.0.0.1:0", bundle.Config, quicConfig())
	if err != nil {
		t.Fatalf("quic.ListenAddr: %v", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
	t.Cleanup(func() {
		cancel()
		ln.Close()
	})
	ch := make(chan error, 1)
	go func() {
		conn, err := ln.Accept(ctx)
		if err != nil {
			ch <- err
			return
		}
		ch <- dispatchConn(ctx, conn)
	}()
	return ln.Addr().String(), bundle.Fingerprint, ch
}

// TestIntegration_SingleFile_Send_Receive verifies that a 1 MB file is fully
// transferred over a loopback QUIC connection and that the SHA-256 hash matches.
func TestIntegration_SingleFile_Send_Receive(t *testing.T) {
	skipIfShort(t)
	setupTestSession(t)

	srcDir := t.TempDir()
	dstDir := t.TempDir()
	srcPath, wantHash := makeSrcFile(t, srcDir, "data.bin", 1<<20) // 1 MB

	addr, fp, done := startReceiverOnce(t, dstDir)

	ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
	defer cancel()

	if err := Send(ctx, addr, srcPath, 4, fp, nil, false, 0, false); err != nil {
		t.Fatalf("Send: %v", err)
	}
	if err := <-done; err != nil {
		t.Fatalf("receive: %v", err)
	}

	if got := gotHash(t, filepath.Join(dstDir, "data.bin")); got != wantHash {
		t.Errorf("hash mismatch: want %s got %s", wantHash, got)
	}
}

// TestIntegration_Directory_Send_Receive verifies that a directory containing
// multiple files (including a subdirectory) is fully transferred with correct hashes.
func TestIntegration_Directory_Send_Receive(t *testing.T) {
	skipIfShort(t)
	setupTestSession(t)

	srcRoot := t.TempDir()
	dstDir := t.TempDir()

	// Build source tree: srcRoot/payload/{a.bin, b.bin, sub/c.bin}
	sendDir := filepath.Join(srcRoot, "payload")
	if err := os.MkdirAll(filepath.Join(sendDir, "sub"), 0o755); err != nil {
		t.Fatal(err)
	}

	type entry struct {
		rel  string
		size int64
	}
	entries := []entry{
		{"a.bin", 512 * 1024},
		{"b.bin", 256 * 1024},
		{filepath.Join("sub", "c.bin"), 128 * 1024},
	}
	wantHashes := make(map[string]string, len(entries))
	for _, e := range entries {
		_, h := makeSrcFile(t, filepath.Join(sendDir, filepath.Dir(e.rel)), filepath.Base(e.rel), e.size)
		wantHashes[e.rel] = h
	}

	addr, fp, done := startReceiverOnce(t, dstDir)

	ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
	defer cancel()

	if err := SendDir(ctx, addr, sendDir, 4, fp, nil, false, 0, false, nil); err != nil {
		t.Fatalf("SendDir: %v", err)
	}
	if err := <-done; err != nil {
		t.Fatalf("receive: %v", err)
	}

	// doReceiveDir writes files to outDir/fm.Path (relative path from WalkDir).
	for _, e := range entries {
		dstPath := filepath.Join(dstDir, e.rel)
		if got := gotHash(t, dstPath); got != wantHashes[e.rel] {
			t.Errorf("file %s: hash mismatch: want %s got %s", e.rel, wantHashes[e.rel], got)
		}
	}
}

// TestIntegration_Resume_Interrupted verifies that a partially received file
// (chunk 0 already written and checkpointed) is completed by transferring only
// the remaining chunk. The final file's hash must match the source.
//
// The test uses dispatchConn (CWD as outDir) so that the checkpoint and tmp file
// persist between calls. CWD is changed to a temp dir for isolation.
func TestIntegration_Resume_Interrupted(t *testing.T) {
	skipIfShort(t)
	setupTestSession(t)

	// Change CWD to an isolated temp dir. dispatchConn uses "." as outDir.
	workDir := t.TempDir()
	orig, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}
	if err := os.Chdir(workDir); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = os.Chdir(orig) })

	const (
		fileSize = 2 << 20 // 2 MB
		nChunks  = 2
		fileName = "resume.bin"
	)
	chunkSize := int64(fileSize) / nChunks

	srcDir := t.TempDir()
	srcPath, wantHash := makeSrcFile(t, srcDir, fileName, fileSize)

	// Pre-seed the tmp file: chunk 0 (0x5A bytes) written at offset 0,
	// rest zeroed via Truncate so the receiver can write chunk 1 later.
	tmpPath := filepath.Join(workDir, fileName+".meshdrop.tmp")
	tf, err := os.Create(tmpPath)
	if err != nil {
		t.Fatal(err)
	}
	chunk0 := make([]byte, chunkSize)
	for i := range chunk0 {
		chunk0[i] = 0x5A
	}
	if _, err := tf.Write(chunk0); err != nil {
		tf.Close()
		t.Fatal(err)
	}
	if err := tf.Truncate(fileSize); err != nil {
		tf.Close()
		t.Fatal(err)
	}
	tf.Close()

	// Pre-seed the checkpoint: chunk 0 done, chunk 1 pending.
	cpState := checkpointState{
		Name:        fileName,
		Size:        fileSize,
		Hash:        wantHash,
		ChunksTotal: nChunks,
		ChunksDone:  []bool{true, false},
	}
	cpData, err := json.Marshal(cpState)
	if err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(workDir, fileName+".meshdrop-state"), cpData, 0o600); err != nil {
		t.Fatal(err)
	}

	addr, fp, done := startReceiverDirect(t)

	ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
	defer cancel()

	// noResume=false: sender honours the checkpoint (sends only chunk 1).
	if err := Send(ctx, addr, srcPath, nChunks, fp, nil, false, 0, false); err != nil {
		t.Fatalf("Send: %v", err)
	}
	if err := <-done; err != nil {
		t.Fatalf("receive: %v", err)
	}

	outPath := filepath.Join(workDir, fileName)
	if got := gotHash(t, outPath); got != wantHash {
		t.Errorf("hash mismatch: want %s got %s", wantHash, got)
	}
}

// TestIntegration_NoResume_IgnoresCheckpoint verifies that noResume=true causes
// the sender to transmit all chunks regardless of what the receiver's checkpoint
// reports. Uses a directory transfer because meta.NoResume is propagated to the
// receiver for batch mode, allowing the receiver to skip checkDirDone as well.
func TestIntegration_NoResume_IgnoresCheckpoint(t *testing.T) {
	skipIfShort(t)
	setupTestSession(t)

	srcRoot := t.TempDir()
	dstDir := t.TempDir()

	sendDir := filepath.Join(srcRoot, "dir")
	srcPath, wantHash := makeSrcFile(t, sendDir, "file.bin", 512*1024)
	_ = srcPath

	// First transfer: receive without noResume (populate outDir).
	{
		addr, fp, done := startReceiverOnce(t, dstDir)
		ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
		if err := SendDir(ctx, addr, sendDir, 2, fp, nil, false, 0, false, nil); err != nil {
			cancel()
			t.Fatalf("first SendDir: %v", err)
		}
		if err := <-done; err != nil {
			cancel()
			t.Fatalf("first receive: %v", err)
		}
		cancel()
	}

	// Second transfer with noResume=true: even though outDir already has the file
	// with matching hash, the receiver skips checkDirDone and re-receives it.
	{
		addr, fp, done := startReceiverOnce(t, dstDir)
		ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
		if err := SendDir(ctx, addr, sendDir, 2, fp, nil, false, 0, true, nil); err != nil {
			cancel()
			t.Fatalf("second SendDir (noResume): %v", err)
		}
		if err := <-done; err != nil {
			cancel()
			t.Fatalf("second receive (noResume): %v", err)
		}
		cancel()
	}

	if got := gotHash(t, filepath.Join(dstDir, "file.bin")); got != wantHash {
		t.Errorf("hash mismatch: want %s got %s", wantHash, got)
	}
}

// TestIntegration_ZeroByteFile verifies that a zero-byte file is correctly
// transferred and produces an empty file at the destination.
func TestIntegration_ZeroByteFile(t *testing.T) {
	skipIfShort(t)
	setupTestSession(t)

	srcDir := t.TempDir()
	dstDir := t.TempDir()

	srcPath := filepath.Join(srcDir, "empty.bin")
	if err := os.WriteFile(srcPath, nil, 0o644); err != nil {
		t.Fatal(err)
	}

	addr, fp, done := startReceiverOnce(t, dstDir)

	ctx, cancel := context.WithTimeout(context.Background(), integrationTimeout)
	defer cancel()

	if err := Send(ctx, addr, srcPath, 4, fp, nil, false, 0, false); err != nil {
		t.Fatalf("Send: %v", err)
	}
	if err := <-done; err != nil {
		t.Fatalf("receive: %v", err)
	}

	info, err := os.Stat(filepath.Join(dstDir, "empty.bin"))
	if err != nil {
		t.Fatalf("stat received file: %v", err)
	}
	if info.Size() != 0 {
		t.Errorf("size = %d, want 0", info.Size())
	}
}
