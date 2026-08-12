package transfer

import (
	"context"
	"fmt"
	"io"
	"net"
	"os"
	"path/filepath"
	"sync"

	"github.com/quic-go/quic-go"
	"github.com/schollz/progressbar/v3"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
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

// WalkDir はディレクトリを再帰的に走査して FileMeta リストを返す。
func WalkDir(dirPath string) ([]FileMeta, error) {
	var files []FileMeta
	base := filepath.Clean(dirPath)
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
		fh, err := os.Open(path)
		if err != nil {
			return err
		}
		hash, err := hashReader(fh)
		fh.Close()
		if err != nil {
			return fmt.Errorf("hash %s: %w", rel, err)
		}
		files = append(files, FileMeta{Path: rel, Size: info.Size(), Hash: hash})
		return nil
	})
	return files, err
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
	if err := sendMeta(ctx, conn, meta); err != nil {
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
			errs[idx] = sendDirChunk(ctx, conn, absPath, idx, a, bar)
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

func sendDirChunk(ctx context.Context, conn *quic.Conn, absPath string, idx int, a chunkAssignment, bar io.Writer) error {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return fmt.Errorf("chunk %d open: %w", idx, err)
	}
	defer stream.Close()

	key, err := crypto.GenerateKeypair()
	if err != nil {
		return err
	}
	ns, err := crypto.HandshakeInitiator(stream, key)
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
func doReceiveDir(ctx context.Context, conn *quic.Conn, meta Meta, outDir string) error {
	totalSize := totalDirSize(meta.Files)
	fmt.Printf("Receiving dir: %s  %d file(s)  %d bytes  %d chunk(s)\n",
		meta.Name, len(meta.Files), totalSize, meta.Chunks)

	// 出力ファイルを事前に確保
	handles := make([]fileHandle, len(meta.Files))
	for i, fm := range meta.Files {
		outPath := filepath.Join(outDir, fm.Path)
		if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
			for _, h := range handles[:i] {
				h.f.Close()
			}
			return err
		}
		f, err := os.Create(outPath)
		if err != nil {
			for _, h := range handles[:i] {
				h.f.Close()
			}
			return err
		}
		if err := f.Truncate(fm.Size); err != nil {
			f.Close()
			for _, h := range handles[:i] {
				h.f.Close()
			}
			return err
		}
		handles[i] = fileHandle{f: f, path: outPath}
	}

	bar := progressbar.DefaultBytes(totalSize, "receiving")
	errCh := make(chan error, meta.Chunks)
	var wg sync.WaitGroup
	for i := 0; i < meta.Chunks; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			errCh <- acceptDirChunk(ctx, conn, handles, bar)
		}()
	}
	wg.Wait()
	close(errCh)
	fmt.Println()

	for i := range handles {
		handles[i].f.Close()
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

func acceptDirChunk(ctx context.Context, conn *quic.Conn, handles []fileHandle, bar io.Writer) error {
	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return fmt.Errorf("accept chunk stream: %w", err)
	}
	defer stream.Close()

	key, err := crypto.GenerateKeypair()
	if err != nil {
		return err
	}
	ns, err := crypto.HandshakeResponder(stream, key)
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

	ow := &offsetWriter{f: handles[cm.FileIndex].f, off: cm.Offset}
	_, err = io.CopyN(io.MultiWriter(ow, bar), ns, cm.Size)
	return err
}
