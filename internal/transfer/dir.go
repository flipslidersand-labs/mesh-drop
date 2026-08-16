package transfer

import (
	"context"
	"fmt"
	"io"
	"net"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"

	"github.com/quic-go/quic-go"
	"github.com/schollz/progressbar/v3"
	"golang.org/x/sync/errgroup"
)

type fileHandle struct {
	f    *os.File
	path string
}

// chunkAssignment はバッチ転送における1チャンクとそのファイルの対応。
type chunkAssignment struct {
	fileIndex int
	offset    int64
	size      int64
}

// walkEntry holds the raw info collected during filepath.Walk before hashing.
type walkEntry struct {
	absPath string
	rel     string
	size    int64
}

// WalkDir はディレクトリを再帰的に走査して FileMeta リストを返す。
// BLAKE3 ハッシュは runtime.NumCPU() 個のゴルーチンで並列計算する。
func WalkDir(dirPath string) ([]FileMeta, error) {
	base := filepath.Clean(dirPath)

	// Phase 1: collect entries sequentially (filesystem metadata only, no I/O).
	var entries []walkEntry
	err := filepath.Walk(base, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		rel, err := filepath.Rel(base, path)
		if err != nil {
			return err
		}
		entries = append(entries, walkEntry{absPath: path, rel: rel, size: info.Size()})
		return nil
	})
	if err != nil {
		return nil, err
	}

	// Phase 2: hash files in parallel with a worker pool.
	files := make([]FileMeta, len(entries))

	type job struct {
		idx   int
		entry walkEntry
	}

	concurrency := runtime.NumCPU()
	if concurrency < 1 {
		concurrency = 1
	}

	jobCh := make(chan job, len(entries))
	for i, e := range entries {
		jobCh <- job{idx: i, entry: e}
	}
	close(jobCh)

	g, _ := errgroup.WithContext(context.Background())

	for w := 0; w < concurrency; w++ {
		g.Go(func() error {
			for j := range jobCh {
				fh, err := os.Open(j.entry.absPath)
				if err != nil {
					return err
				}
				hash, err := hashReader(fh)
				fh.Close()
				if err != nil {
					return fmt.Errorf("hash %s: %w", j.entry.rel, err)
				}
				// Each goroutine writes to a unique index: no mutex needed.
				files[j.idx] = FileMeta{
					Path: j.entry.rel,
					Size: j.entry.size,
					Hash: hash,
				}
			}
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}
	return files, nil
}

// assignChunks はファイルリストを nChunks 個のチャンクに分割する。
// 各ファイルに最低1チャンクを割り当て、残りは大きいファイルに比例配分。
func assignChunks(files []FileMeta, nChunks int) []chunkAssignment {
	if nChunks < len(files) {
		nChunks = len(files)
	}
	var total int64
	for _, f := range files {
		total += f.Size
	}

	assignments := make([]chunkAssignment, 0, nChunks)
	remaining := nChunks
	for fi, f := range files {
		var n int
		if fi == len(files)-1 {
			n = remaining
		} else if total == 0 {
			n = 1
		} else {
			n = int(int64(nChunks)*f.Size/total) + 1
			if n > remaining-(len(files)-fi-1) {
				n = remaining - (len(files) - fi - 1)
			}
		}
		if n < 1 {
			n = 1
		}
		chunkSize := (f.Size + int64(n) - 1) / int64(n)
		for i := 0; i < n; i++ {
			offset := int64(i) * chunkSize
			size := chunkSize
			if offset >= f.Size {
				break
			}
			if offset+size > f.Size {
				size = f.Size - offset
			}
			assignments = append(assignments, chunkAssignment{fileIndex: fi, offset: offset, size: size})
		}
		remaining -= n
	}
	return assignments
}

// totalDirSize はファイルリストの合計サイズを返す。
func totalDirSize(files []FileMeta) int64 {
	var total int64
	for _, f := range files {
		total += f.Size
	}
	return total
}

// SendDir はディレクトリ dirPath を相手 addr へバッチ転送する。
func SendDir(ctx context.Context, addr, dirPath string, nChunks int) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSendDir(ctx, conn, dirPath, nChunks)
}

// SendDirNAT は NAT Traversal 済みソケット経由でディレクトリを転送する。
func SendDirNAT(ctx context.Context, udpConn *net.UDPConn, peerAddr *net.UDPAddr, dirPath string, nChunks int) error {
	conn, err := quic.Dial(ctx, udpConn, peerAddr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("QUIC dial NAT: %w", err)
	}
	return doSendDir(ctx, conn, dirPath, nChunks)
}

func doSendDir(ctx context.Context, conn *quic.Conn, dirPath string, nChunks int) error {
	defer conn.CloseWithError(0, "done")

	fmt.Printf("Scanning %s ...\n", dirPath)
	files, err := WalkDir(dirPath)
	if err != nil {
		return fmt.Errorf("walk dir: %w", err)
	}
	if len(files) == 0 {
		return fmt.Errorf("directory is empty: %s", dirPath)
	}
	fmt.Printf("  %d file(s) found\n", len(files))

	assignments := assignChunks(files, nChunks)
	totalSize := totalDirSize(files)

	meta := Meta{
		Name:    filepath.Base(dirPath),
		Size:    totalSize,
		Chunks:  len(assignments),
		Files:   files,
		IsBatch: true,
	}
	peerKey, err := sendMeta(ctx, conn, meta)
	if err != nil {
		return fmt.Errorf("control stream: %w", err)
	}

	bar := progressbar.DefaultBytes(totalSize, "sending  ")
	errs := make([]error, len(assignments))
	var wg sync.WaitGroup
	for i, a := range assignments {
		wg.Add(1)
		go func(idx int, a chunkAssignment) {
			defer wg.Done()
			f := files[a.fileIndex]
			absPath := filepath.Join(dirPath, f.Path)
			errs[idx] = sendDirChunk(ctx, conn, absPath, idx, a, bar, peerKey)
		}(i, a)
	}
	wg.Wait()
	fmt.Println()

	for _, e := range errs {
		if e != nil {
			return e
		}
	}
	fmt.Printf("✓ Sent: %s (%d files, %d bytes, %d chunks)\n",
		filepath.Base(dirPath), len(files), totalSize, len(assignments))
	return nil
}

func sendDirChunk(ctx context.Context, conn *quic.Conn, absPath string, idx int, a chunkAssignment, bar io.Writer, peerKey []byte) error {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return fmt.Errorf("chunk %d open: %w", idx, err)
	}
	defer stream.Close()

	ns, err := chunkHandshakeInitiator(stream, peerKey)
	if err != nil {
		return fmt.Errorf("chunk %d noise: %w", idx, err)
	}

	cm := ChunkMeta{Index: idx, Offset: a.offset, Size: a.size, FileIndex: a.fileIndex}
	if err := writeChunkMeta(ns, cm); err != nil {
		return fmt.Errorf("chunk %d meta: %w", idx, err)
	}

	f, err := os.Open(absPath)
	if err != nil {
		return err
	}
	defer f.Close()
	if _, err := f.Seek(a.offset, io.SeekStart); err != nil {
		return err
	}
	_, err = io.CopyN(io.MultiWriter(ns, bar), f, a.size)
	return err
}

// doReceiveDir はバッチ Meta を受け取ってディレクトリ構造を復元する。
// peerKey は制御ストリームで確認したピアの静的公開鍵（チャンクストリームの検証に使う）。
func doReceiveDir(ctx context.Context, conn *quic.Conn, meta Meta, outDir string, peerKey []byte) (retErr error) {
	if conn != nil {
		defer conn.CloseWithError(0, "done")
	}

	totalSize := totalDirSize(meta.Files)
	fmt.Printf("Receiving dir: %s  %d file(s)  %d bytes  %d chunk(s)\n",
		meta.Name, len(meta.Files), totalSize, meta.Chunks)

	// outDir を絶対パスに確定してパストラバーサル検証の基準にする。
	absBase, err := filepath.Abs(outDir)
	if err != nil {
		return fmt.Errorf("resolve outDir: %w", err)
	}

	// 出力ファイルを事前に確保
	handles := make([]fileHandle, len(meta.Files))
	closed := make([]bool, len(meta.Files))
	defer func() {
		if retErr != nil {
			// エラー時：未クローズのファイルを close して削除
			for i, h := range handles {
				if !closed[i] && h.f != nil {
					h.f.Close()
				}
				if h.path != "" {
					os.Remove(h.path)
				}
			}
		}
	}()
	for i, fm := range meta.Files {
		outPath := filepath.Join(absBase, fm.Path)
		absOut, err := filepath.Abs(outPath)
		if err != nil {
			return fmt.Errorf("resolve path %s: %w", fm.Path, err)
		}
		if !strings.HasPrefix(absOut, absBase+string(os.PathSeparator)) {
			return fmt.Errorf("path traversal detected: %s", fm.Path)
		}
		if err := os.MkdirAll(filepath.Dir(absOut), 0o755); err != nil {
			return err
		}
		f, err := os.Create(absOut)
		if err != nil {
			return err
		}
		handles[i] = fileHandle{f: f, path: absOut}
		if err := f.Truncate(fm.Size); err != nil {
			return err
		}
	}

	bar := progressbar.DefaultBytes(totalSize, "receiving")
	errCh := make(chan error, meta.Chunks)
	var wg sync.WaitGroup
	for i := 0; i < meta.Chunks; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			errCh <- acceptDirChunk(ctx, conn, handles, bar, peerKey)
		}()
	}
	wg.Wait()
	close(errCh)
	fmt.Println()

	for i := range handles {
		handles[i].f.Close()
		closed[i] = true
	}

	for e := range errCh {
		if e != nil {
			return e
		}
	}

	// ハッシュ検証
	for i, fm := range meta.Files {
		fh, err := os.Open(handles[i].path)
		if err != nil {
			return err
		}
		got, err := hashReader(fh)
		fh.Close()
		if err != nil {
			return err
		}
		if fm.Hash != "" && got != fm.Hash {
			return fmt.Errorf("%w: %s\n  want: %s...\n   got: %s...",
				ErrHashMismatch, fm.Path, hashPreview(fm.Hash, 16), hashPreview(got, 16))
		}
	}

	fmt.Printf("✓ Hash OK  (%d files)\n", len(meta.Files))
	fmt.Printf("✓ Saved: %s/ (%d files, %d bytes)\n", outDir, len(meta.Files), totalSize)
	return nil
}

func acceptDirChunk(ctx context.Context, conn *quic.Conn, handles []fileHandle, bar io.Writer, peerKey []byte) error {
	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return fmt.Errorf("accept chunk stream: %w", err)
	}
	defer stream.Close()

	ns, err := chunkHandshakeResponder(stream, peerKey)
	if err != nil {
		return fmt.Errorf("chunk noise: %w", err)
	}

	cm, err := readChunkMeta(ns)
	if err != nil {
		return fmt.Errorf("chunk meta: %w", err)
	}

	if cm.FileIndex < 0 || cm.FileIndex >= len(handles) {
		return fmt.Errorf("invalid FileIndex %d (valid range: 0..%d)", cm.FileIndex, len(handles)-1)
	}
	if cm.Offset < 0 || cm.Size < 0 {
		return fmt.Errorf("chunk %d: invalid range offset=%d size=%d", cm.Index, cm.Offset, cm.Size)
	}
	if info, err := handles[cm.FileIndex].f.Stat(); err == nil {
		if fileSize := info.Size(); fileSize >= 0 && cm.Offset+cm.Size > fileSize {
			return fmt.Errorf("chunk %d: range [%d, %d) exceeds file size %d",
				cm.Index, cm.Offset, cm.Offset+cm.Size, fileSize)
		}
	}

	ow := &offsetWriter{f: handles[cm.FileIndex].f, off: cm.Offset}
	_, err = io.CopyN(io.MultiWriter(ow, bar), ns, cm.Size)
	return err
}
