package transfer

import (
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"io"
	"net"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/quic-go/quic-go"
	"github.com/schollz/progressbar/v3"
	"golang.org/x/time/rate"
)

// プロトコル概要:
//   Stream 0 (control, 送信側→受信側): Noise → Meta
//   Stream 0 (control, 受信側→送信側): Noise → ResumeState  (シングルファイル: ChunksDone / ディレクトリ: DirDone)
//   Stream 1..N (data):               Noise → ChunkMeta → bytes
//
// Meta.IsBatch=true  → doReceiveDir へ dispatch (DirDone で完了ファイルをスキップ)
// Meta.IsPipe=true   → doReceivePipeConn へ dispatch
// それ以外           → doReceiveFileResume（resume 対応シングルファイル）

// quicConfig returns a *quic.Config with idle timeout and keep-alive set.
// #179: Prevent connections from hanging indefinitely by enforcing idle timeout.
func quicConfig() *quic.Config {
	return &quic.Config{
		MaxIdleTimeout:  120 * time.Second,
		KeepAlivePeriod: 30 * time.Second,
	}
}

// TLSBundle holds a self-signed TLS configuration and the SHA-256 fingerprint
// of its certificate. Generate one with NewTLSBundle, then pass it to
// ListenWithBundle so the same cert is used for both the TLS listener and the
// mDNS fingerprint advertisement.
// #160: Bundling cert + fingerprint together ensures they always match and
// eliminates the race condition of generating two independent certificates.
type TLSBundle struct {
	Config      *tls.Config
	Fingerprint []byte // SHA-256 of the DER-encoded leaf certificate
}

// NewTLSBundle generates a fresh self-signed certificate and returns a TLSBundle
// containing the TLS config and its SHA-256 fingerprint.
func NewTLSBundle() (*TLSBundle, error) {
	cfg, fp, err := serverTLSAndFingerprint()
	if err != nil {
		return nil, err
	}
	return &TLSBundle{Config: cfg, Fingerprint: fp}, nil
}

// ListenWithBundle は TLSBundle を使って QUIC で 1 接続を待ち受ける。
// #160: Use the pre-generated TLSBundle so the fingerprint advertised via mDNS
// matches the TLS cert used by the listener.
func ListenWithBundle(ctx context.Context, addr string, bundle *TLSBundle) error {
	fmt.Printf("TLS fingerprint (SHA-256): %x\n", bundle.Fingerprint)
	fmt.Printf("  Pass to sender: --fingerprint %x\n", bundle.Fingerprint)
	ln, err := quic.ListenAddr(addr, bundle.Config, quicConfig())
	if err != nil {
		return fmt.Errorf("listen %s: %w", addr, err)
	}
	return acceptAndDispatch(ctx, ln)
}

// ListenNATWithBundle は TLSBundle を使って既存の UDP ソケット上で QUIC リスナーを起動する。
func ListenNATWithBundle(ctx context.Context, udpConn *net.UDPConn, bundle *TLSBundle) error {
	fmt.Printf("TLS fingerprint (SHA-256): %x\n", bundle.Fingerprint)
	fmt.Printf("  Pass to sender: --fingerprint %x\n", bundle.Fingerprint)
	ln, err := quic.Listen(udpConn, bundle.Config, quicConfig())
	if err != nil {
		return fmt.Errorf("QUIC listen on conn: %w", err)
	}
	return acceptAndDispatch(ctx, ln)
}

// Listen は QUIC で 1 接続を待ち受けファイル/ディレクトリ/パイプを受信する。
func Listen(ctx context.Context, addr string) error {
	bundle, err := NewTLSBundle()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	return ListenWithBundle(ctx, addr, bundle)
}

// ListenNAT は既存の UDP ソケット上で QUIC リスナーを起動し受信する。
func ListenNAT(ctx context.Context, udpConn *net.UDPConn) error {
	bundle, err := NewTLSBundle()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	return ListenNATWithBundle(ctx, udpConn, bundle)
}

// Send は addr へ QUIC 接続し filePath を並列チャンクで転送する。
// #160: fingerprint is the SHA-256 of the receiver's TLS certificate DER.
// Pass nil to fall back to the self-signed-only check (weaker, but better than nothing).
// noResume=true のとき受信側から返る ChunksDone を無視してフル再送する (#244)。
func Send(ctx context.Context, addr, filePath string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSend(ctx, conn, filePath, nChunks, lim, compressed, compLevel, noResume)
}

// SendNAT は NAT Traversal 済みソケット経由でファイルを送信する。
// #160: fingerprint is the SHA-256 of the receiver's TLS certificate DER.
// noResume=true のとき受信側から返る ChunksDone を無視してフル再送する (#244)。
func SendNAT(ctx context.Context, udpConn *net.UDPConn, peerAddr *net.UDPAddr, filePath string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	conn, err := quic.Dial(ctx, udpConn, peerAddr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("QUIC dial NAT: %w", err)
	}
	return doSend(ctx, conn, filePath, nChunks, lim, compressed, compLevel, noResume)
}

// --- accept & dispatch ---

func acceptAndDispatch(ctx context.Context, ln *quic.Listener) error {
	defer ln.Close()
	fmt.Printf("Waiting for transfer on %s ...\n", ln.Addr())
	conn, err := ln.Accept(ctx)
	if err != nil {
		return fmt.Errorf("accept: %w", err)
	}
	return dispatchConn(ctx, conn)
}

// appErrCodeTOFU は TOFU 検証失敗時に送信側へ通知する QUIC アプリケーションエラーコード。
// 送信側はこのコードを見てエラーを伝播させる（旧クライアント互換の graceful degradation とは区別）。
const appErrCodeTOFU quic.ApplicationErrorCode = 2

// dispatchConn は Meta を読み、種別に応じてハンドラへ振り分ける。
// シングルファイル/ディレクトリモードで制御ストリームで ResumeState を返送してから受信する。
func dispatchConn(ctx context.Context, conn *quic.Conn) error {
	meta, cp, peerKey, dirDone, err := acceptMetaDispatch(ctx, conn, ".")
	if err != nil {
		code := quic.ApplicationErrorCode(1)
		if errors.Is(err, errTOFURejected) {
			code = appErrCodeTOFU
		}
		conn.CloseWithError(code, err.Error()) //nolint:errcheck
		return fmt.Errorf("control stream: %w", err)
	}
	switch {
	case meta.IsPipe:
		return doReceivePipeConn(ctx, conn, peerKey)
	case meta.IsBatch:
		return doReceiveDir(ctx, conn, meta, ".", peerKey, dirDone)
	default:
		return doReceiveFileResume(ctx, conn, meta, cp, peerKey)
	}
}

// acceptMetaDispatch は制御ストリームで Meta を受信する。
// シングルファイルのとき、チェックポイントを確認して ChunksDone を ResumeState で返す。
// ディレクトリのとき、既存ファイルをハッシュ検証して DirDone を ResumeState で返す。
// 制御ストリームには永続 identity + TOFU 検証を使用する。
// 返す []byte はピアの静的公開鍵（チャンクストリームの同一ピア検証に使う）。
// 返す []string は完了済みファイルの相対パス（ディレクトリ転送のみ。それ以外は nil）。
func acceptMetaDispatch(ctx context.Context, conn *quic.Conn, outDir string) (Meta, *checkpoint, []byte, []string, error) {
	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return Meta{}, nil, nil, nil, err
	}
	defer stream.Close()

	ns, peerKey, err := controlHandshakeResponder(stream)
	if err != nil {
		return Meta{}, nil, nil, nil, err
	}

	meta, err := readMeta(ns)
	if err != nil {
		return Meta{}, nil, nil, nil, err
	}

	if !meta.IsPipe && !meta.IsBatch && meta.Chunks < 0 {
		return Meta{}, nil, nil, nil, fmt.Errorf("invalid meta.Chunks: %d", meta.Chunks)
	}

	if meta.IsPipe {
		return meta, nil, peerKey, nil, nil
	}

	if meta.IsBatch {
		// #255: NoResume=true のとき checkDirDone をスキップして空リストを返す。
		// 送信側は全チャンクを送るので受信側も全チャンクを待機する必要がある。
		var dirDone []string
		if !meta.NoResume {
			dirDone = checkDirDone(outDir, meta.Files)
		}
		rs := ResumeState{DirDone: dirDone}
		_ = writeResumeState(ns, rs)
		return meta, nil, peerKey, dirDone, nil
	}

	// シングルファイル: チェックポイントから ResumeState を返送
	if meta.Name == "" || filepath.Base(meta.Name) == "." {
		return Meta{}, nil, nil, nil, fmt.Errorf("invalid file name in metadata: %q", meta.Name)
	}
	outPath := filepath.Base(meta.Name)
	if err := sanitizeName(outPath); err != nil {
		return Meta{}, nil, nil, nil, fmt.Errorf("invalid file name in metadata: %w", err)
	}
	cp := loadOrCreate(outPath, meta)
	rs := ResumeState{ChunksDone: cp.doneIndices()}
	_ = writeResumeState(ns, rs) // 旧クライアントへの graceful degradation

	return meta, cp, peerKey, nil, nil
}

// checkDirDone は outDir 内の既存ファイルを FileMeta リストと照合し、
// ハッシュが一致する（転送完了済みの）ファイルの相対パス一覧を返す。
func checkDirDone(outDir string, files []FileMeta) []string {
	if len(files) == 0 {
		return nil
	}
	type result struct {
		path string
		done bool
	}
	results := make([]result, len(files))
	var wg sync.WaitGroup
	for i, fm := range files {
		if fm.Hash == "" {
			continue // ハッシュ不明はスキップ判定不可
		}
		wg.Add(1)
		go func(i int, fm FileMeta) {
			defer wg.Done()
			absPath := filepath.Join(outDir, fm.Path)
			f, err := os.Open(absPath)
			if err != nil {
				return // ファイルが存在しない → 未完了
			}
			got, err := hashReader(f)
			f.Close()
			if err != nil {
				return
			}
			if got == fm.Hash {
				results[i] = result{path: fm.Path, done: true}
			}
		}(i, fm)
	}
	wg.Wait()

	var done []string
	for _, r := range results {
		if r.done {
			done = append(done, r.path)
		}
	}
	return done
}

// --- single file send ---

func doSend(ctx context.Context, conn *quic.Conn, filePath string, nChunks int, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	defer conn.CloseWithError(0, "done")

	if nChunks < 1 {
		return fmt.Errorf("nChunks must be >= 1, got %d", nChunks)
	}

	f, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer f.Close()

	info, err := f.Stat()
	if err != nil {
		return err
	}

	fmt.Printf("Hashing %s ...\n", filepath.Base(filePath))
	hash, err := hashReader(f)
	if err != nil {
		return fmt.Errorf("hash: %w", err)
	}

	// #169: For zero-byte files use Chunks=0; the receiver completes immediately.
	chunks := nChunks
	if info.Size() == 0 {
		chunks = 0
	}

	meta := Meta{
		Name:       filepath.Base(filePath),
		Size:       info.Size(),
		Hash:       hash,
		Chunks:     chunks,
		Compressed: compressed,
		CompLevel:  compLevel,
	}
	rs, peerKey, err := sendMetaGetResume(ctx, conn, meta)
	if err != nil {
		return fmt.Errorf("control stream: %w", err)
	}
	// #244: --no-resume フラグが立っているときは受信側の完了チャンク情報を無視する。
	if noResume {
		rs.ChunksDone = nil
	}

	// #169: Nothing to transfer for zero-byte files.
	if chunks == 0 {
		fmt.Printf("✓ Sent: %s (0 bytes, 0 chunks)\n", filePath)
		return nil
	}

	// #174: Use []bool instead of map[int]bool for O(1) access with lower allocation overhead.
	skipSet := make([]bool, nChunks)
	skipCount := 0
	for _, idx := range rs.ChunksDone {
		// #168: Validate chunk index before using it.
		if idx < 0 || idx >= chunks {
			continue
		}
		if !skipSet[idx] {
			skipSet[idx] = true
			skipCount++
		}
	}
	if skipCount > 0 {
		fmt.Printf("  Resume: skipping %d/%d completed chunks\n", skipCount, nChunks)
	}

	chunkSize := (info.Size() + int64(nChunks) - 1) / int64(nChunks)
	bar := progressbar.DefaultBytes(info.Size(), "sending  ")

	// 完了済みチャンクは進捗バーだけ進める
	for idx, skip := range skipSet {
		if !skip {
			continue
		}
		off := int64(idx) * chunkSize
		sz := chunkSize
		if off+sz > info.Size() {
			sz = info.Size() - off
		}
		_, _ = bar.Write(make([]byte, sz))
	}

	errs := make([]error, nChunks)
	var wg sync.WaitGroup
	// #147: Open the file once here and pass *os.File to sendChunk, which uses
	// ReadAt for concurrent-safe access without seeking.
	for i := 0; i < nChunks; i++ {
		if skipSet[i] {
			continue
		}
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			offset := int64(i) * chunkSize
			size := chunkSize
			if offset+size > info.Size() {
				size = info.Size() - offset
			}
			errs[i] = sendChunk(ctx, conn, f, i, offset, size, bar, peerKey, lim, compressed, compLevel)
		}(i)
	}
	wg.Wait()
	fmt.Println()

	for _, e := range errs {
		if e != nil {
			return e
		}
	}
	fmt.Printf("✓ Sent: %s (%d bytes, %d chunks)\n", filePath, info.Size(), nChunks)
	return nil
}

// sendMetaGetResume は Meta を送信し、受信側から ResumeState を受け取る。
// 受信側が ResumeState を返さない場合は空で返す（graceful degradation）。
// 制御ストリームには永続 identity + TOFU 検証を使用する。
// 返す []byte はピアの静的公開鍵（チャンクストリームの同一ピア検証に使う）。
func sendMetaGetResume(ctx context.Context, conn *quic.Conn, meta Meta) (ResumeState, []byte, error) {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return ResumeState{}, nil, err
	}
	defer stream.Close()

	ns, peerKey, err := controlHandshakeInitiator(stream)
	if err != nil {
		return ResumeState{}, nil, err
	}

	if err := writeMeta(ns, meta); err != nil {
		return ResumeState{}, nil, err
	}

	rs, err := readResumeState(ns)
	if err != nil {
		// ストリームが graceful に閉じられた場合 (io.EOF/io.ErrUnexpectedEOF) は
		// 旧クライアント互換として resume state なしで継続する。
		// それ以外 (QUIC ApplicationError など) はピアによる明示的な拒否なので伝播する。
		if errors.Is(err, io.EOF) || errors.Is(err, io.ErrUnexpectedEOF) {
			return ResumeState{}, peerKey, nil
		}
		var appErr *quic.ApplicationError
		if errors.As(err, &appErr) {
			return ResumeState{}, nil, fmt.Errorf("peer rejected connection (code %d): %s", appErr.ErrorCode, appErr.ErrorMessage)
		}
		return ResumeState{}, nil, fmt.Errorf("reading resume state: %w", err)
	}
	return rs, peerKey, nil
}

// sendMeta は Meta を送信する（dir/pipe 用: ResumeState は無視）。
// 返す []byte はピアの静的公開鍵。
func sendMeta(ctx context.Context, conn *quic.Conn, meta Meta) ([]byte, error) {
	_, peerKey, err := sendMetaGetResume(ctx, conn, meta)
	return peerKey, err
}

// --- single file receive with resume ---

// doReceiveFileResume はシングルファイルを resume 対応で受信する。
// cp は acceptMetaDispatch で取得済みのチェックポイント。
// peerKey は制御ストリームで確認したピアの静的公開鍵（チャンクストリームの検証に使う）。
// #359: 一時ファイル (<outPath>.meshdrop.tmp) へ書き込み、ハッシュ検証成功後に
// os.Rename でアトミックに最終パスへ移動する。失敗時は defer で一時ファイルを削除する。
func doReceiveFileResume(ctx context.Context, conn *quic.Conn, meta Meta, cp *checkpoint, peerKey []byte) (retErr error) {
	defer conn.CloseWithError(0, "done")

	if meta.Chunks < 0 {
		return fmt.Errorf("invalid meta.Chunks: %d", meta.Chunks)
	}

	outPath := filepath.Base(meta.Name)
	if err := sanitizeName(outPath); err != nil {
		return fmt.Errorf("invalid file name in metadata: %w", err)
	}
	tmpPath := outPath + ".meshdrop.tmp"
	if cp == nil {
		cp = loadOrCreate(outPath, meta)
	}

	// #174: Use []bool instead of map[int]bool for O(1) access with lower allocation overhead.
	skipSet := make([]bool, meta.Chunks)
	skipCount := 0
	for _, idx := range cp.doneIndices() {
		// #168/#181: Validate index before using it.
		if idx < 0 || idx >= meta.Chunks {
			continue
		}
		if !skipSet[idx] {
			skipSet[idx] = true
			skipCount++
		}
	}

	if skipCount > 0 {
		fmt.Printf("Resuming: %s — %d/%d chunks already done\n",
			meta.Name, skipCount, meta.Chunks)
	} else {
		fmt.Printf("Receiving: %s  %d bytes  %d chunk(s)\n",
			meta.Name, meta.Size, meta.Chunks)
	}

	// #359: 一時ファイルを開く（resume 時は既存の tmp を再利用し進捗を引き継ぐ）。
	f, err := os.OpenFile(tmpPath, os.O_RDWR|os.O_CREATE, 0o644)
	if err != nil {
		return err
	}
	defer func() {
		f.Close()
		if retErr != nil {
			os.Remove(tmpPath) //nolint:errcheck
		}
	}()
	info, err := f.Stat()
	if err != nil {
		return fmt.Errorf("stat %s: %w", tmpPath, err)
	}
	if info.Size() != meta.Size {
		if err := f.Truncate(meta.Size); err != nil {
			return err
		}
	}

	// #169: Zero-byte file — nothing to receive, just verify hash and finish.
	if meta.Chunks == 0 {
		if _, err := f.Seek(0, io.SeekStart); err != nil {
			return err
		}
		got, err := hashReader(f)
		if err != nil {
			return err
		}
		if meta.Hash != "" && got != meta.Hash {
			cp.finish()
			return fmt.Errorf("%w\n  want: %s...\n   got: %s...", ErrHashMismatch, hashPreview(meta.Hash, 16), hashPreview(got, 16))
		}
		cp.finish()
		if err := os.Rename(tmpPath, outPath); err != nil {
			return err
		}
		fmt.Printf("✓ Hash OK  (%s...)\n", hashPreview(meta.Hash, 16))
		fmt.Printf("✓ Saved: %s (%d bytes)\n", outPath, meta.Size)
		return nil
	}

	bar := progressbar.DefaultBytes(meta.Size, "receiving")

	// 完了済みチャンクは進捗バーだけ進める
	chunkSize := (meta.Size + int64(meta.Chunks) - 1) / int64(meta.Chunks)
	for idx, skip := range skipSet {
		if !skip {
			continue
		}
		off := int64(idx) * chunkSize
		sz := chunkSize
		if off+sz > meta.Size {
			sz = meta.Size - off
		}
		_, _ = bar.Write(make([]byte, sz))
	}

	remaining := meta.Chunks - skipCount
	if remaining < 0 {
		remaining = 0
	}
	errCh := make(chan error, remaining)

	// #153: 最初のチャンクエラーで QUIC 接続を閉じて、AcceptStream で待機中の
	// 他の goroutine がブロックし続けるのを防ぐ。sync.Once で二重クローズを回避する。
	var closeOnce sync.Once
	closeConn := func(cerr error) {
		closeOnce.Do(func() {
			conn.CloseWithError(1, cerr.Error()) //nolint:errcheck
		})
	}

	var wg sync.WaitGroup
	for i := 0; i < remaining; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			cm, aerr := acceptChunkWithMeta(ctx, conn, f, bar, peerKey, meta.Compressed)
			if aerr != nil {
				closeConn(aerr)
				errCh <- aerr
				return
			}
			errCh <- cp.markDone(cm.Index)
		}()
	}
	wg.Wait()
	close(errCh)
	fmt.Println()

	for e := range errCh {
		if e != nil {
			return e
		}
	}

	if _, err := f.Seek(0, io.SeekStart); err != nil {
		return err
	}
	got, err := hashReader(f)
	if err != nil {
		return err
	}
	if meta.Hash != "" && got != meta.Hash {
		cp.finish()
		return fmt.Errorf("%w\n  want: %s...\n   got: %s...", ErrHashMismatch, hashPreview(meta.Hash, 16), hashPreview(got, 16))
	}
	cp.finish()
	// #359: ハッシュ検証成功後にアトミックリネームで最終パスへ移動する。
	if err := os.Rename(tmpPath, outPath); err != nil {
		return err
	}
	fmt.Printf("✓ Hash OK  (%s...)\n", hashPreview(meta.Hash, 16))
	fmt.Printf("✓ Saved: %s (%d bytes)\n", outPath, meta.Size)
	return nil
}

// doReceiveFile は旧互換（resume なし）でシングルファイルを受信する。
func doReceiveFile(ctx context.Context, conn *quic.Conn, meta Meta, peerKey []byte) error {
	return doReceiveFileResume(ctx, conn, meta, nil, peerKey)
}

// --- stream helpers ---

// sendChunk は conn 上に新しい QUIC ストリームを開き、チャンクを転送する。
// #147: f は呼び出し元で一度だけ開かれた *os.File。ReadAt を使うため seek 不要で並列安全。
func sendChunk(ctx context.Context, conn *quic.Conn, f *os.File, index int, offset, size int64, bar io.Writer, peerKey []byte, lim *rate.Limiter, compressed bool, compLevel int) error {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return fmt.Errorf("chunk %d open: %w", index, err)
	}
	defer stream.Close()

	ns, err := chunkHandshakeInitiator(stream, peerKey)
	if err != nil {
		return fmt.Errorf("chunk %d noise: %w", index, err)
	}

	if err := writeChunkMeta(ns, ChunkMeta{Index: index, Offset: offset, Size: size}); err != nil {
		return fmt.Errorf("chunk %d meta: %w", index, err)
	}

	// #217: SectionReader で offset/size をストリーミング送信。
	// ReadAt ベースなので concurrent-safe かつ full-size バッファ確保不要。
	sr := io.NewSectionReader(f, offset, size)
	src := NewThrottledReader(ctx, sr, lim)
	if compressed {
		enc, encErr := newZstdEncoder(ns, compLevel)
		if encErr != nil {
			return fmt.Errorf("chunk %d: %w", index, encErr)
		}
		// bar は非圧縮バイト数で進捗表示する。
		_, err = io.Copy(enc, io.TeeReader(src, bar))
		if cerr := enc.Close(); cerr != nil && err == nil {
			err = cerr
		}
		return err
	}
	_, err = io.Copy(io.MultiWriter(ns, bar), src)
	return err
}

// hashPreview は表示用に hash 文字列の先頭 n 文字を安全に返す。
func hashPreview(h string, n int) string {
	if len(h) <= n {
		return h
	}
	return h[:n]
}

// offsetWriter は *os.File の WriteAt をシーケンシャルな io.Writer として提供する。
type offsetWriter struct {
	f   *os.File
	off int64
}

func (w *offsetWriter) Write(p []byte) (int, error) {
	n, err := w.f.WriteAt(p, w.off)
	w.off += int64(n)
	return n, err
}

// acceptChunkWithMeta はチャンクを受信し ChunkMeta を返す（resume でのインデックス記録用）。
// peerKey は制御ストリームで確認したピアの静的公開鍵。
// #184: チャンクのバイト範囲が non-overlapping かつファイルサイズ内に収まることを検証する。
func acceptChunkWithMeta(ctx context.Context, conn *quic.Conn, f *os.File, bar io.Writer, peerKey []byte, compressed bool) (ChunkMeta, error) {
	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return ChunkMeta{}, fmt.Errorf("accept chunk stream: %w", err)
	}
	defer stream.Close()

	ns, err := chunkHandshakeResponder(stream, peerKey)
	if err != nil {
		return ChunkMeta{}, fmt.Errorf("chunk noise: %w", err)
	}

	cm, err := readChunkMeta(ns)
	if err != nil {
		return ChunkMeta{}, fmt.Errorf("chunk meta: %w", err)
	}
	// #184: Offset と Size が非負であることを確認する。
	if cm.Offset < 0 || cm.Size < 0 {
		return ChunkMeta{}, fmt.Errorf("chunk %d: invalid range offset=%d size=%d", cm.Index, cm.Offset, cm.Size)
	}
	// #184: チャンク範囲がファイルサイズを超えないことを確認する。
	// ファイルは Truncate 済みなので Stat の結果は信頼できる。
	if finfo, serr := f.Stat(); serr == nil {
		if fileSize := finfo.Size(); fileSize >= 0 && cm.Offset+cm.Size > fileSize {
			return ChunkMeta{}, fmt.Errorf("chunk %d: range [%d, %d) exceeds file size %d",
				cm.Index, cm.Offset, cm.Offset+cm.Size, fileSize)
		}
	}

	ow := &offsetWriter{f: f, off: cm.Offset}
	if compressed {
		dec, decErr := newZstdDecoder(ns)
		if decErr != nil {
			return ChunkMeta{}, fmt.Errorf("chunk %d: %w", cm.Index, decErr)
		}
		defer dec.Close()
		n, cerr := io.Copy(io.MultiWriter(ow, bar), dec)
		if cerr != nil {
			return cm, cerr
		}
		if n != cm.Size {
			return cm, fmt.Errorf("chunk %d: decompressed %d bytes, expected %d", cm.Index, n, cm.Size)
		}
		return cm, nil
	}
	_, err = io.CopyN(io.MultiWriter(ow, bar), ns, cm.Size)
	return cm, err
}

// acceptChunk は旧互換（dir.go 等から呼ばれる）。
func acceptChunk(ctx context.Context, conn *quic.Conn, f *os.File, bar io.Writer, peerKey []byte, compressed bool) error {
	_, err := acceptChunkWithMeta(ctx, conn, f, bar, peerKey, compressed)
	return err
}
