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
// noResume=true のとき受信側から返る DirDone を無視してフル再送する (#244)。
func SendDir(ctx context.Context, addr, dirPath string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSendDir(ctx, conn, dirPath, nChunks, lim, compressed, compLevel, noResume)
}

// SendDirNAT は NAT Traversal 済みソケット経由でディレクトリを転送する。
// #207: fingerprint is the SHA-256 of the receiver's TLS certificate DER.
// noResume=true のとき受信側から返る DirDone を無視してフル再送する (#244)。
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

	assignments := assignChunks(files, nChunks)
	totalSize := totalDirSize(files)

	meta := Meta{
		Name:       filepath.Base(dirPath),
		Size:       totalSize,
		Chunks:     len(assignments),
		Files:      files,
		IsBatch:    true,
		Compressed: compressed,
		CompLevel:  compLevel,
	}
	// ディレクトリ転送でも ResumeState(DirDone) を受け取る (#247)
	rs, peerKey, err := sendMetaGetResume(ctx, conn, meta)
	if err != nil {
		return fmt.Errorf("control stream: %w", err)
	}
	// #244: --no-resume フラグが立っているときは受信側の完了ファイル情報を無視する。
	if noResume {
		rs.DirDone = nil
	}

	// 完了済みファイルセットを構築し、対応するチャンクをスキップする (#247)
	doneFiles := make(map[string]struct{}, len(rs.DirDone))
	for _, p := range rs.DirDone {
		doneFiles[p] = struct{}{}
	}
	if len(doneFiles) > 0 {
		fmt.Printf("  Resume: skipping %d/%d completed file(s)\n", len(doneFiles), len(files))
	}

	bar := progressbar.DefaultBytes(totalSize, "sending  ")

	// 完了済みファイルのチャンクはプログレスバーだけ進めてスキップ
	for _, a := range assignments {
		if _, done := doneFiles[files[a.fileIndex].Path]; done {
			_, _ = bar.Write(make([]byte, a.size))
		}
	}

	errs := make([]error, len(assignments))
	var wg sync.WaitGroup
	for i, a := range assignments {
		if _, done := doneFiles[files[a.fileIndex].Path]; done {
			continue // 完了済みファイルのチャンクはスキップ
		}
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
		filepath.Base(dirPath), len(files), totalSize, len(assignments))
	return nil
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
// peerKey は制御ストリームで確認したピアの静的公開鍵（チャンクストリームの検証に使う）。
// dirDone は送信側がスキップした完了済みファイルの相対パス一覧 (#245)。
func doReceiveDir(ctx context.Context, conn *quic.Conn, meta Meta, outDir string, peerKey []byte, dirDone []string) (retErr error) {
	if conn != nil {
		defer conn.CloseWithError(0, "done")
	}

	// 完了済みファイルセット (#245)
	doneSet := make(map[string]struct{}, len(dirDone))
	for _, p := range dirDone {
		doneSet[p] = struct{}{}
	}

	totalSize := totalDirSize(meta.Files)
	fmt.Printf("Receiving dir: %s  %d file(s)  %d bytes  %d chunk(s)\n",
		meta.Name, len(meta.Files), totalSize, meta.Chunks)
	if len(doneSet) > 0 {
		fmt.Printf("  Resume: %d/%d file(s) already complete, skipping\n", len(doneSet), len(meta.Files))
	}

	// outDir を絶対パスに確定してパストラバーサル検証の基準にする。
	absBase, err := filepath.Abs(outDir)
	if err != nil {
		return fmt.Errorf("resolve outDir: %w", err)
	}

	// 出力ファイルを事前に確保。完了済みファイルはスキップ。
	handles := make([]fileHandle, len(meta.Files))
	closed := make([]bool, len(meta.Files))
	defer func() {
		if retErr != nil {
			// エラー時：未クローズのファイルを close して削除（完了済みは消さない）
			for i, h := range handles {
				if !closed[i] && h.f != nil {
					h.f.Close()
				}
				if _, ok := doneSet[meta.Files[i].Path]; h.path != "" && !ok {
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
		// #163: filepath.Rel ベースのパストラバーサル検証。
		rel, relErr := filepath.Rel(absBase, absOut)
		if relErr != nil || strings.HasPrefix(rel, "..") {
			return fmt.Errorf("path traversal detected: %s", fm.Path)
		}
		if err := os.MkdirAll(filepath.Dir(absOut), 0o755); err != nil {
			return err
		}
		if _, done := doneSet[fm.Path]; done {
			// 完了済み: ファイルハンドルは不要。path だけ記録してハッシュ検証に使う。
			handles[i] = fileHandle{path: absOut}
			closed[i] = true // defer でクローズ/削除をスキップ
			continue
		}
		f, err := os.OpenFile(absOut, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0o644)
		if err != nil {
			return err
		}
		handles[i] = fileHandle{f: f, path: absOut}
		if err := f.Truncate(fm.Size); err != nil {
			return err
		}
	}

	// 送信側がスキップしたチャンク数を除いた期待チャンク数を計算する。
	// assignChunks は決定論的なので送受信側で同一の割り当てが得られる (#247)。
	assignments := assignChunks(meta.Files, meta.Chunks)
	expectedChunks := 0
	for _, a := range assignments {
		if _, done := doneSet[meta.Files[a.fileIndex].Path]; !done {
			expectedChunks++
		}
	}

	bar := progressbar.DefaultBytes(totalSize, "receiving")

	// 完了済みファイルのサイズ分だけプログレスバーを先行させる
	for _, a := range assignments {
		if _, done := doneSet[meta.Files[a.fileIndex].Path]; done {
			_, _ = bar.Write(make([]byte, a.size))
		}
	}

	errCh := make(chan error, expectedChunks)
	var wg sync.WaitGroup
	for i := 0; i < expectedChunks; i++ {
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
		if !closed[i] {
			handles[i].f.Close()
			closed[i] = true
		}
	}

	for e := range errCh {
		if e != nil {
			return e
		}
	}

	// ハッシュ検証（完了済みファイルは acceptMetaDispatch で検証済みなのでスキップ）
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

	fmt.Printf("✓ Hash OK  (%d files)\n", len(meta.Files))
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
	// 完了済みファイルのハンドルは f==nil (#256)
	if handles[cm.FileIndex].f == nil {
		return fmt.Errorf("chunk %d: file index %d is already complete, unexpected chunk received", cm.Index, cm.FileIndex)
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
