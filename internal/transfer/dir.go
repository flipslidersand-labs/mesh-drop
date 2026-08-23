package transfer

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"net"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/quic-go/quic-go"
	"github.com/schollz/progressbar/v3"
	"golang.org/x/sync/errgroup"
	"golang.org/x/time/rate"
)

// chunkSkewThreshold is the max:avg ratio above which chunk distribution is considered skewed (#274).
const chunkSkewThreshold = 3.0

// warnChunkSkew prints a warning to stderr if chunks are distributed very unevenly across files.
func warnChunkSkew(files []FileMeta, assignments []chunkAssignment) {
	if len(files) < 2 {
		return
	}
	counts := make([]int, len(files))
	for _, a := range assignments {
		counts[a.fileIndex]++
	}
	maxCount := 0
	var total int
	for _, c := range counts {
		total += c
		if c > maxCount {
			maxCount = c
		}
	}
	avg := float64(total) / float64(len(files))
	if avg > 0 && float64(maxCount)/avg >= chunkSkewThreshold {
		fmt.Fprintf(os.Stderr, "[WARN] chunk distribution skewed: max=%d avg=%.1f\n", maxCount, avg)
	}
}

type fileHandle struct {
	f       *os.File
	path    string // 最終出力パス
	tmpPath string // 一時ファイルパス (#359); 空文字列なら一時ファイルなし（完了済みファイル等）
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
// ctx がキャンセルされると速やかに error を返す。
func WalkDir(ctx context.Context, dirPath string) ([]FileMeta, error) {
	if err := ctx.Err(); err != nil {
		return nil, err
	}
	base := filepath.Clean(dirPath)

	// Phase 1: collect entries sequentially (filesystem metadata only, no I/O).
	// filepath.WalkDir を使いシンボリックリンクは再帰せずスキップする (#352)。
	var entries []walkEntry
	err := filepath.WalkDir(base, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if ctx.Err() != nil {
			return ctx.Err()
		}
		if d.IsDir() {
			return nil
		}
		// シンボリックリンクをスキップ（意図しないファイル転送・パストラバーサル補助を防ぐ）
		if d.Type()&fs.ModeSymlink != 0 {
			return nil
		}
		info, err := d.Info()
		if err != nil {
			return err
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

	g, gCtx := errgroup.WithContext(ctx)

	for w := 0; w < concurrency; w++ {
		g.Go(func() error {
			for j := range jobCh {
				if gCtx.Err() != nil {
					return gCtx.Err()
				}
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
// #318: progressFn は転送済みバイト数(sent, total)の更新を通知するコールバック。nil 可。
func SendDir(ctx context.Context, addr, dirPath string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool, progressFn func(sent, total int64)) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSendDir(ctx, conn, dirPath, nChunks, lim, compressed, compLevel, noResume, progressFn)
}

// SendDirNAT は NAT Traversal 済みソケット経由でディレクトリを転送する。
// #207: fingerprint is the SHA-256 of the receiver's TLS certificate DER.
// noResume=true のとき受信側から返る DirDone を無視してフル再送する (#244)。
// #318: progressFn は転送済みバイト数(sent, total)の更新を通知するコールバック。nil 可。
func SendDirNAT(ctx context.Context, udpConn *net.UDPConn, peerAddr *net.UDPAddr, dirPath string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool, progressFn func(sent, total int64)) error {
	conn, err := quic.Dial(ctx, udpConn, peerAddr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("QUIC dial NAT: %w", err)
	}
	return doSendDir(ctx, conn, dirPath, nChunks, lim, compressed, compLevel, noResume, progressFn)
}

// #317: progressFn は転送済みバイト数の更新を通知するコールバック。nil の場合は呼ばれない。
func doSendDir(ctx context.Context, conn *quic.Conn, dirPath string, nChunks int, lim *rate.Limiter, compressed bool, compLevel int, noResume bool, progressFn func(sent, total int64)) error {
	defer conn.CloseWithError(0, "done")
	start := time.Now() // #269

	fmt.Printf("Scanning %s ...\n", dirPath)
	files, err := WalkDir(ctx, dirPath)
	if err != nil {
		return fmt.Errorf("walk dir: %w", err)
	}
	if len(files) == 0 {
		return fmt.Errorf("directory is empty: %s", dirPath)
	}
	fmt.Printf("  %d file(s) found\n", len(files))

	// #329: ディレクトリ内のファイルの大半が既圧縮フォーマットなら --compress をスキップする。
	// 閾値: 圧縮済みファイルのサイズ合計が全体の 80% を超えたらスキップ。
	if compressed {
		var compressedSize, totalSz int64
		for _, fm := range files {
			totalSz += fm.Size
			p := filepath.Join(dirPath, filepath.FromSlash(fm.Path))
			if isAlreadyCompressed(p) {
				compressedSize += fm.Size
			}
		}
		if totalSz > 0 && compressedSize*10 >= totalSz*8 { // >= 80%
			fmt.Printf("  Skipping compression: %.0f%% of content is already compressed\n",
				float64(compressedSize)/float64(totalSz)*100)
			compressed = false
		}
	}

	assignments := assignChunks(files, nChunks)
	totalSize := totalDirSize(files)
	warnChunkSkew(files, assignments) // #274

	meta := Meta{
		Name:       filepath.Base(dirPath),
		Size:       totalSize,
		Chunks:     len(assignments),
		Files:      files,
		IsBatch:    true,
		Compressed: compressed,
		CompLevel:  compLevel,
		NoResume:   noResume,
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
		// #270: report skipped files and chunks
		skippedChunks := 0
		for _, a := range assignments {
			if _, done := doneFiles[files[a.fileIndex].Path]; done {
				skippedChunks++
			}
		}
		pct := 0.0
		if len(assignments) > 0 {
			pct = float64(skippedChunks) / float64(len(assignments)) * 100
		}
		fmt.Printf("  Resume: skipping %d/%d file(s), %d chunks (%.0f%%)\n",
			len(doneFiles), len(files), skippedChunks, pct)
	}

	bar := progressbar.DefaultBytes(totalSize, "sending  ")

	// #317: progressFn へ累積送信バイト数を通知するアトミックカウンタ
	var sent atomic.Int64

	// 完了済みファイルのチャンクはプログレスバーだけ進めてスキップ
	for _, a := range assignments {
		if _, done := doneFiles[files[a.fileIndex].Path]; done {
			_, _ = bar.Write(make([]byte, a.size))
			if progressFn != nil {
				sent.Add(a.size)
				progressFn(sent.Load(), totalSize)
			}
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
			var progressW io.Writer
			if progressFn != nil {
				progressW = &countWriter{fn: func(n int64) {
					progressFn(sent.Add(n), totalSize)
				}}
			}
			errs[idx] = sendDirChunk(ctx, conn, absPath, idx, a, bar, progressW, peerKey, lim, compressed, compLevel)
		}(i, a)
	}
	wg.Wait()
	fmt.Println()

	// #275: categorize and summarize errors before returning
	ec := newErrCounter()
	for _, e := range errs {
		ec.Add(e)
	}
	if s := ec.Summary(); s != "" {
		fmt.Fprintln(os.Stderr, s)
	}
	for _, e := range errs {
		if e != nil {
			return e
		}
	}

	// #269: report elapsed time and throughput
	elapsed := time.Since(start)
	mbps := float64(totalSize) / elapsed.Seconds() / (1 << 20)
	fmt.Printf("✓ Sent: %s (%d files, %d bytes, %d chunks)\n",
		filepath.Base(dirPath), len(files), totalSize, len(assignments))
	fmt.Printf("  Elapsed: %s  Throughput: %.2f MB/s\n", elapsed.Round(time.Millisecond), mbps)
	return nil
}

// countWriter は書き込みバイト数を fn に通知する io.Writer。
// #317: progressFn への累積送信バイト通知に使用する。
type countWriter struct{ fn func(int64) }

func (cw *countWriter) Write(p []byte) (int, error) {
	cw.fn(int64(len(p)))
	return len(p), nil
}

func sendDirChunk(ctx context.Context, conn *quic.Conn, absPath string, idx int, a chunkAssignment, bar io.Writer, progressW io.Writer, peerKey []byte, lim *rate.Limiter, compressed bool, compLevel int) error {
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

	// #317: progressW が nil でない場合は bar と合わせてバイト数を通知する
	teeTarget := io.Writer(bar)
	if progressW != nil {
		teeTarget = io.MultiWriter(bar, progressW)
	}

	if compressed {
		enc, encErr := newZstdEncoder(ns, compLevel)
		if encErr != nil {
			return fmt.Errorf("chunk %d: %w", idx, encErr)
		}
		_, err = io.Copy(enc, io.TeeReader(src, teeTarget))
		if cerr := enc.Close(); cerr != nil && err == nil {
			err = cerr
		}
		return err
	}
	_, err = io.CopyN(io.MultiWriter(ns, teeTarget), src, a.size)
	return err
}

// doReceiveDir はバッチ Meta を受け取ってディレクトリ構造を復元する。
// peerKey は制御ストリームで確認したピアの静的公開鍵（チャンクストリームの検証に使う）。
// dirDone は送信側がスキップした完了済みファイルの相対パス一覧 (#245)。
func doReceiveDir(ctx context.Context, conn *quic.Conn, meta Meta, outDir string, peerKey []byte, dirDone []string, verify bool) (retErr error) {
	if conn != nil {
		defer conn.CloseWithError(0, "done")
	}
	start := time.Now() // #269

	// 完了済みファイルセット (#245)
	doneSet := make(map[string]struct{}, len(dirDone))
	for _, p := range dirDone {
		doneSet[p] = struct{}{}
	}

	totalSize := totalDirSize(meta.Files)
	fmt.Printf("Receiving dir: %s  %d file(s)  %d bytes  %d chunk(s)\n",
		meta.Name, len(meta.Files), totalSize, meta.Chunks)
	if len(doneSet) > 0 {
		// #270: report skipped files and chunks with percentage
		skippedChunks := 0
		allAssignments := assignChunks(meta.Files, meta.Chunks)
		for _, a := range allAssignments {
			if _, done := doneSet[meta.Files[a.fileIndex].Path]; done {
				skippedChunks++
			}
		}
		pct := 0.0
		if meta.Chunks > 0 {
			pct = float64(skippedChunks) / float64(meta.Chunks) * 100
		}
		fmt.Printf("  Resume: %d/%d file(s) already complete, skipping %d chunks (%.0f%%)\n",
			len(doneSet), len(meta.Files), skippedChunks, pct)
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
			// エラー時：未クローズのファイルを close して一時ファイルを削除（完了済みは消さない）
			// #359: 最終パス (h.path) ではなく一時ファイル (h.tmpPath) を削除する。
			for i, h := range handles {
				if !closed[i] && h.f != nil {
					h.f.Close()
				}
				if h.tmpPath != "" {
					os.Remove(h.tmpPath) //nolint:errcheck
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
		// #359: 一時ファイルへ書き込み、ハッシュ検証成功後にアトミックリネームする。
		tmpOut := absOut + ".meshdrop.tmp"
		f, err := os.OpenFile(tmpOut, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0o644)
		if err != nil {
			return err
		}
		handles[i] = fileHandle{f: f, path: absOut, tmpPath: tmpOut}
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

	// #275: categorize chunk errors before returning
	ec := newErrCounter()
	var firstErr error
	for e := range errCh {
		ec.Add(e)
		if e != nil && firstErr == nil {
			firstErr = e
		}
	}
	if s := ec.Summary(); s != "" {
		fmt.Fprintln(os.Stderr, s)
	}
	if firstErr != nil {
		return firstErr
	}

	// ハッシュ検証（完了済みファイルは acceptMetaDispatch で検証済みなのでスキップ）
	// #359: 検証成功後に一時ファイルをアトミックリネームして最終パスへ移動する。
	for i, fm := range meta.Files {
		if _, done := doneSet[fm.Path]; done {
			continue
		}
		fh, err := os.Open(handles[i].tmpPath)
		if err != nil {
			return err
		}
		got, err := hashReader(fh)
		fh.Close()
		if err != nil {
			return err
		}
		if fm.Hash != "" && got != fm.Hash {
			return fmt.Errorf("%w: %s (want %s, got %s)",
				ErrHashMismatch, fm.Path, hashPreview(fm.Hash, 16), hashPreview(got, 16))
		}
		if err := os.Rename(handles[i].tmpPath, handles[i].path); err != nil {
			return err
		}
	}

	// #269: report elapsed time and throughput
	elapsed := time.Since(start)
	mbps := float64(totalSize) / elapsed.Seconds() / (1 << 20)
	fmt.Printf("✓ Hash OK  (%d files)\n", len(meta.Files))
	fmt.Printf("✓ Saved: %s/ (%d files, %d bytes)\n", outDir, len(meta.Files), totalSize)
	fmt.Printf("  Elapsed: %s  Throughput: %.2f MB/s\n", elapsed.Round(time.Millisecond), mbps)

	if verify {
		return VerifyIntegrity(outDir, meta.Files)
	}
	return nil
}

// VerifyIntegrity re-reads every file in outDir and checks its BLAKE3 hash
// against the expected value in files. Returns an error (prefixed with
// "[INTEGRITY FAIL]") on the first mismatch. On success it prints
// "[OK] integrity verified: N files".
// Enabled via the --verify flag to opt in to the extra disk-read pass.
func VerifyIntegrity(outDir string, files []FileMeta) error {
	verified := 0
	for _, fm := range files {
		path := filepath.Join(outDir, fm.Path)
		fh, err := os.Open(path)
		if err != nil {
			return fmt.Errorf("[INTEGRITY FAIL] open %s: %w", fm.Path, err)
		}
		got, hashErr := hashReader(fh)
		fh.Close()
		if hashErr != nil {
			return fmt.Errorf("[INTEGRITY FAIL] hash %s: %w", fm.Path, hashErr)
		}
		if fm.Hash != "" && got != fm.Hash {
			return fmt.Errorf("[INTEGRITY FAIL] %s: expected=%s... got=%s...",
				fm.Path, hashPreview(fm.Hash, 16), hashPreview(got, 16))
		}
		verified++
	}
	fmt.Printf("[OK] integrity verified: %d files\n", verified)
	return nil
}

// validateDirChunkHandle checks that cm.FileIndex is in range and the file
// handle is not nil (nil means the file was already completed; #256/#263).
func validateDirChunkHandle(handles []fileHandle, cm ChunkMeta) error {
	if cm.FileIndex < 0 || cm.FileIndex >= len(handles) {
		return fmt.Errorf("invalid FileIndex %d, valid range 0..%d", cm.FileIndex, len(handles)-1)
	}
	if handles[cm.FileIndex].f == nil {
		return fmt.Errorf("chunk %d: file index %d is already complete, unexpected chunk received", cm.Index, cm.FileIndex)
	}
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

	if err := validateDirChunkHandle(handles, cm); err != nil {
		return err
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
