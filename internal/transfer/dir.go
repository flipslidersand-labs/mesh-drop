package transfer

import (
	"context"
	"errors"
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
	"golang.org/x/time/rate"
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
// #207: fingerprint is the SHA-256 of the receiver's TLS certificate DER.
// Pass nil to fall back to the self-signed-only check (weaker, but better than nothing).
func SendDir(ctx context.Context, addr, dirPath string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSendDir(ctx, conn, dirPath, nChunks, lim, compressed, compLevel, noResume)
}

// SendDirNAT は NAT Traversal 済みソケット経由でディレクトリを転送する。
// #207: fingerprint is the SHA-256 of the receiver's TLS certificate DER.
func SendDirNAT(ctx context.Context, udpConn *net.UDPConn, peerAddr *net.UDPAddr, dirPath string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	conn, err := quic.Dial(ctx, udpConn, peerAddr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("QUIC dial NAT: %w", err)
	}
	return doSendDir(ctx, conn, dirPath, nChunks, lim, compressed, compLevel, noResume)
}

func doSendDir(ctx context.Context, conn *quic.Conn, dirPath string, nChunks int, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
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

	allAssignments := assignChunks(files, nChunks)
	totalSize := totalDirSize(files)

	meta := Meta{
		Name:       filepath.Base(dirPath),
		Size:       totalSize,
		Chunks:     len(allAssignments),
		Files:      files,
		IsBatch:    true,
		Compressed: compressed,
		CompLevel:  compLevel,
	}

	// 受信側から DirDone リストを受け取り、完了済みファイルをスキップする。
	// DirSendState を同じ制御ストリームで返送して受信側のチャンク数を合わせる。
	activeAssignments, peerKey, skippedBytes, err := sendMetaDirControl(ctx, conn, meta, files, allAssignments, noResume)
	if err != nil {
		return fmt.Errorf("control stream: %w", err)
	}

	bar := progressbar.DefaultBytes(totalSize, "sending  ")

	// スキップ済みバイトを進捗バーに反映
	if skippedBytes > 0 {
		_, _ = bar.Write(make([]byte, skippedBytes))
	}

	errs := make([]error, len(activeAssignments))
	var wg sync.WaitGroup
	for i, a := range activeAssignments {
		wg.Add(1)
		go func(idx int, a chunkAssignment) {
			defer wg.Done()
			f := files[a.fileIndex]
			absPath := filepath.Join(dirPath, f.Path)
			errs[idx] = sendDirChunk(ctx, conn, absPath, idx, a, bar, peerKey, lim, compressed, compLevel)
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
		filepath.Base(dirPath), len(files), totalSize, len(activeAssignments))
	return nil
}

// sendMetaDirControl はディレクトリ転送の制御ストリームハンドシェイクを行う。
//
//  1. Meta 送信
//  2. ResumeState(DirDone) 受信
//  3. activeAssignments 計算
//  4. DirSendState(ActualChunks) 送信
//
// すべて同じ Noise 制御ストリーム上で行う。
// 返り値: 実際に送るチャンクリスト、ピア公開鍵、スキップバイト数。
func sendMetaDirControl(ctx context.Context, conn *quic.Conn, meta Meta, files []FileMeta, allAssignments []chunkAssignment, noResume bool) ([]chunkAssignment, []byte, int64, error) {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return nil, nil, 0, err
	}
	defer stream.Close()

	ns, peerKey, err := controlHandshakeInitiator(stream)
	if err != nil {
		return nil, nil, 0, err
	}

	if err := writeMeta(ns, meta); err != nil {
		return nil, nil, 0, err
	}

	rs, err := readResumeState(ns)
	if err != nil {
		if errors.Is(err, io.EOF) || errors.Is(err, io.ErrUnexpectedEOF) {
			rs = ResumeState{}
		} else {
			return nil, nil, 0, fmt.Errorf("reading resume state: %w", err)
		}
	}

	// noResume フラグが立っている場合は DirDone を無視して全チャンクを再送する。
	doneFiles := make(map[string]struct{})
	if !noResume {
		for _, p := range rs.DirDone {
			doneFiles[p] = struct{}{}
		}
	}

	var activeAssignments []chunkAssignment
	var skippedBytes int64
	for _, a := range allAssignments {
		if _, skip := doneFiles[files[a.fileIndex].Path]; skip {
			skippedBytes += a.size
		} else {
			activeAssignments = append(activeAssignments, a)
		}
	}
	if len(activeAssignments) < len(allAssignments) {
		fmt.Printf("  Dir resume: skipping %d file(s) (%d bytes already done)\n", len(doneFiles), skippedBytes)
	}

	// 実際に送るチャンク数を受信側へ通知（受信側がループカウントを確定できる）。
	_ = writeDirSendState(ns, DirSendState{ActualChunks: len(activeAssignments)})

	return activeAssignments, peerKey, skippedBytes, nil
}

func sendDirChunk(ctx context.Context, conn *quic.Conn, absPath string, idx int, a chunkAssignment, bar io.Writer, peerKey []byte, lim *rate.Limiter, compressed bool, compLevel int) error {
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
	src := NewThrottledReader(ctx, io.LimitReader(f, a.size), lim)
	if compressed {
		enc, encErr := newZstdEncoder(ns, compLevel)
		if encErr != nil {
			return fmt.Errorf("chunk %d: %w", idx, encErr)
		}
		_, err = io.Copy(enc, io.TeeReader(src, bar))
		if cerr := enc.Close(); cerr != nil && err == nil {
			err = cerr
		}
		return err
	}
	_, err = io.CopyN(io.MultiWriter(ns, bar), src, a.size)
	return err
}

// doReceiveDir はバッチ Meta を受け取ってディレクトリ構造を復元する。
// dirDone は acceptMetaDispatch で検証済みの完了済みファイルパスリスト。
// peerKey は制御ストリームで確認したピアの静的公開鍵（チャンクストリームの検証に使う）。
func doReceiveDir(ctx context.Context, conn *quic.Conn, meta Meta, outDir string, peerKey []byte, dirDone []string) (retErr error) {
	if conn != nil {
		defer conn.CloseWithError(0, "done")
	}

	totalSize := totalDirSize(meta.Files)
	fmt.Printf("Receiving dir: %s  %d file(s)  %d bytes  %d chunk(s)\n",
		meta.Name, len(meta.Files), totalSize, meta.Chunks)

	// 完了済みファイルセット
	doneSet := make(map[string]struct{}, len(dirDone))
	for _, p := range dirDone {
		doneSet[p] = struct{}{}
	}
	if len(doneSet) > 0 {
		fmt.Printf("  Dir resume: %d file(s) already complete — skipping\n", len(doneSet))
	}

	// outDir を絶対パスに確定してパストラバーサル検証の基準にする。
	absBase, err := filepath.Abs(outDir)
	if err != nil {
		return fmt.Errorf("resolve outDir: %w", err)
	}

	// 出力ファイルを事前に確保（完了済みはスキップ）
	handles := make([]fileHandle, len(meta.Files))
	closed := make([]bool, len(meta.Files))
	defer func() {
		if retErr != nil {
			// エラー時：未クローズのファイルを close して削除（完了済みは残す）
			for i, h := range handles {
				if !closed[i] && h.f != nil {
					h.f.Close()
				}
				if h.path != "" {
					if _, isDone := doneSet[meta.Files[i].Path]; !isDone {
						os.Remove(h.path)
					}
				}
			}
		}
	}()

	var skippedBytes int64
	for i, fm := range meta.Files {
		outPath := filepath.Join(absBase, fm.Path)
		absOut, err := filepath.Abs(outPath)
		if err != nil {
			return fmt.Errorf("resolve path %s: %w", fm.Path, err)
		}
		// #163: filepath.Rel ベースのパストラバーサル検証。
		rel, relErr := filepath.Rel(absBase, absOut)
		if relErr != nil || strings.HasPrefix(rel, "..") {
			return fmt.Errorf("path traversal detected: %s", fm.Path)
		}

		if _, done := doneSet[fm.Path]; done {
			// 完了済み: ファイルハンドルを開かず進捗バー用にサイズだけ記録
			handles[i] = fileHandle{path: absOut}
			skippedBytes += fm.Size
			continue
		}

		// #183: Use 0755 for directories and 0644 for files as default permissions.
		if err := os.MkdirAll(filepath.Dir(absOut), 0o755); err != nil {
			return err
		}
		// #183: Create the file with 0644 permissions (safe default preserving umask intent).
		f, err := os.OpenFile(absOut, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0o644)
		if err != nil {
			return err
		}
		handles[i] = fileHandle{f: f, path: absOut}
		if err := f.Truncate(fm.Size); err != nil {
			return err
		}
	}

	bar := progressbar.DefaultBytes(totalSize, "receiving")

	// 完了済みバイトを進捗バーに反映
	if skippedBytes > 0 {
		_, _ = bar.Write(make([]byte, skippedBytes))
	}

	errCh := make(chan error, meta.Chunks)
	var wg sync.WaitGroup
	for i := 0; i < meta.Chunks; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			errCh <- acceptDirChunk(ctx, conn, handles, bar, peerKey, meta.Compressed)
		}()
	}
	wg.Wait()
	close(errCh)
	fmt.Println()

	for i := range handles {
		if handles[i].f != nil {
			handles[i].f.Close()
		}
		closed[i] = true
	}

	for e := range errCh {
		if e != nil {
			return e
		}
	}

	// ハッシュ検証（完了済みファイルは再検証不要）
	for i, fm := range meta.Files {
		if _, done := doneSet[fm.Path]; done {
			continue
		}
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

	fmt.Printf("✓ Hash OK  (%d files)\n", len(meta.Files)-len(doneSet))
	fmt.Printf("✓ Saved: %s/ (%d files, %d bytes)\n", outDir, len(meta.Files), totalSize)
	return nil
}

func acceptDirChunk(ctx context.Context, conn *quic.Conn, handles []fileHandle, bar io.Writer, peerKey []byte, compressed bool) error {
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
	if compressed {
		dec, decErr := newZstdDecoder(ns)
		if decErr != nil {
			return fmt.Errorf("chunk %d: %w", cm.Index, decErr)
		}
		defer dec.Close()
		n, cerr := io.Copy(io.MultiWriter(ow, bar), dec)
		if cerr != nil {
			return cerr
		}
		if n != cm.Size {
			return fmt.Errorf("chunk %d: decompressed %d bytes, expected %d", cm.Index, n, cm.Size)
		}
		return nil
	}
	_, err = io.CopyN(io.MultiWriter(ow, bar), ns, cm.Size)
	return err
}
