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

// プロトコル概要:
//   Stream 0 (control, 送信側→受信側): Noise → Meta
//   Stream 0 (control, 受信側→送信側): Noise → ResumeState  (シングルファイルのみ)
//   Stream 1..N (data):               Noise → ChunkMeta → bytes
//
// Meta.IsBatch=true  → doReceiveDir へ dispatch
// Meta.IsPipe=true   → doReceivePipeConn へ dispatch
// それ以外           → doReceiveFileResume（resume 対応シングルファイル）

// Listen は QUIC で 1 接続を待ち受けファイル/ディレクトリ/パイプを受信する。
func Listen(ctx context.Context, addr string) error {
	tlsConf, err := serverTLS()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	ln, err := quic.ListenAddr(addr, tlsConf, nil)
	if err != nil {
		return fmt.Errorf("listen %s: %w", addr, err)
	}
	return acceptAndDispatch(ctx, ln)
}

// ListenNAT は既存の UDP ソケット上で QUIC リスナーを起動し受信する。
func ListenNAT(ctx context.Context, udpConn *net.UDPConn) error {
	tlsConf, err := serverTLS()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	ln, err := quic.Listen(udpConn, tlsConf, nil)
	if err != nil {
		return fmt.Errorf("QUIC listen on conn: %w", err)
	}
	return acceptAndDispatch(ctx, ln)
}

// Send は addr へ QUIC 接続し filePath を並列チャンクで転送する。
func Send(ctx context.Context, addr, filePath string, nChunks int) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSend(ctx, conn, filePath, nChunks)
}

// SendNAT は NAT Traversal 済みソケット経由でファイルを送信する。
func SendNAT(ctx context.Context, udpConn *net.UDPConn, peerAddr *net.UDPAddr, filePath string, nChunks int) error {
	conn, err := quic.Dial(ctx, udpConn, peerAddr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("QUIC dial NAT: %w", err)
	}
	return doSend(ctx, conn, filePath, nChunks)
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

// dispatchConn は Meta を読み、種別に応じてハンドラへ振り分ける。
// シングルファイルモードでは制御ストリームで ResumeState を返送してから受信する。
func dispatchConn(ctx context.Context, conn *quic.Conn) error {
	meta, cp, err := acceptMetaDispatch(ctx, conn)
	if err != nil {
		conn.CloseWithError(1, "meta error")
		return fmt.Errorf("control stream: %w", err)
	}
	switch {
	case meta.IsPipe:
		return doReceivePipeConn(ctx, conn)
	case meta.IsBatch:
		return doReceiveDir(ctx, conn, meta, ".")
	default:
		return doReceiveFileResume(ctx, conn, meta, cp)
	}
}

// acceptMetaDispatch は制御ストリームで Meta を受信する。
// シングルファイルのとき、チェックポイントを確認して ResumeState を送信側へ返す。
// 制御ストリームには永続 identity + TOFU 検証を使用する。
func acceptMetaDispatch(ctx context.Context, conn *quic.Conn) (Meta, *checkpoint, error) {
	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return Meta{}, nil, err
	}
	defer stream.Close()

	ns, err := controlHandshakeResponder(stream)
	if err != nil {
		return Meta{}, nil, err
	}

	meta, err := readMeta(ns)
	if err != nil {
		return Meta{}, nil, err
	}

	if meta.IsPipe || meta.IsBatch {
		return meta, nil, nil
	}

	// シングルファイル: チェックポイントから ResumeState を返送
	outPath := filepath.Base(meta.Name)
	cp := loadOrCreate(outPath, meta)
	rs := ResumeState{ChunksDone: cp.doneIndices()}
	_ = writeResumeState(ns, rs) // 旧クライアントへの graceful degradation

	return meta, cp, nil
}

// acceptMeta は Meta のみを受信する（pipe/batch の Listen* 直接呼び出し用）。
func acceptMeta(ctx context.Context, conn *quic.Conn) (Meta, error) {
	meta, _, err := acceptMetaDispatch(ctx, conn)
	return meta, err
}

// --- single file send ---

func doSend(ctx context.Context, conn *quic.Conn, filePath string, nChunks int) error {
	defer conn.CloseWithError(0, "done")

	if nChunks < 1 {
		return fmt.Errorf("nChunks must be >= 1, got %d", nChunks)
	}

	f, err := os.Open(filePath)
	if err != nil {
		return err
	}
	info, err := f.Stat()
	f.Close()
	if err != nil {
		return err
	}

	fmt.Printf("Hashing %s ...\n", filepath.Base(filePath))
	fh, err := os.Open(filePath)
	if err != nil {
		return err
	}
	hash, err := hashReader(fh)
	fh.Close()
	if err != nil {
		return fmt.Errorf("hash: %w", err)
	}

	meta := Meta{
		Name:   filepath.Base(filePath),
		Size:   info.Size(),
		Hash:   hash,
		Chunks: nChunks,
	}
	rs, err := sendMetaGetResume(ctx, conn, meta)
	if err != nil {
		return fmt.Errorf("control stream: %w", err)
	}

	skipSet := make(map[int]bool, len(rs.ChunksDone))
	for _, idx := range rs.ChunksDone {
		skipSet[idx] = true
	}
	if len(skipSet) > 0 {
		fmt.Printf("  Resume: skipping %d/%d completed chunks\n", len(skipSet), nChunks)
	}

	chunkSize := (info.Size() + int64(nChunks) - 1) / int64(nChunks)
	bar := progressbar.DefaultBytes(info.Size(), "sending  ")

	// 完了済みチャンクは進捗バーだけ進める
	for idx := range skipSet {
		off := int64(idx) * chunkSize
		sz := chunkSize
		if off+sz > info.Size() {
			sz = info.Size() - off
		}
		_, _ = bar.Write(make([]byte, sz))
	}

	remaining := nChunks - len(skipSet)
	errs := make([]error, nChunks)
	var wg sync.WaitGroup
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
			errs[i] = sendChunk(ctx, conn, filePath, i, offset, size, bar)
		}(i)
	}
	_ = remaining
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
func sendMetaGetResume(ctx context.Context, conn *quic.Conn, meta Meta) (ResumeState, error) {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return ResumeState{}, err
	}
	defer stream.Close()

	ns, err := controlHandshakeInitiator(stream)
	if err != nil {
		return ResumeState{}, err
	}

	if err := writeMeta(ns, meta); err != nil {
		return ResumeState{}, err
	}

	rs, err := readResumeState(ns)
	if err != nil {
		return ResumeState{}, nil //nolint:nilerr // 旧クライアント互換
	}
	return rs, nil
}

// sendMeta は Meta を送信する（dir/pipe 用: ResumeState は無視）。
func sendMeta(ctx context.Context, conn *quic.Conn, meta Meta) error {
	_, err := sendMetaGetResume(ctx, conn, meta)
	return err
}

// --- single file receive with resume ---

// doReceiveFileResume はシングルファイルを resume 対応で受信する。
// cp は acceptMetaDispatch で取得済みのチェックポイント。
func doReceiveFileResume(ctx context.Context, conn *quic.Conn, meta Meta, cp *checkpoint) error {
	defer conn.CloseWithError(0, "done")

	outPath := filepath.Base(meta.Name)
	if cp == nil {
		cp = loadOrCreate(outPath, meta)
	}

	skipSet := make(map[int]bool)
	for _, idx := range cp.doneIndices() {
		skipSet[idx] = true
	}

	if len(skipSet) > 0 {
		fmt.Printf("Resuming: %s — %d/%d chunks already done\n",
			meta.Name, len(skipSet), meta.Chunks)
	} else {
		fmt.Printf("Receiving: %s  %d bytes  %d chunk(s)\n",
			meta.Name, meta.Size, meta.Chunks)
	}

	f, err := os.OpenFile(outPath, os.O_RDWR|os.O_CREATE, 0o644)
	if err != nil {
		return err
	}
	info, err := f.Stat()
	if err != nil {
		f.Close()
		return fmt.Errorf("stat %s: %w", outPath, err)
	}
	if info.Size() != meta.Size {
		if err := f.Truncate(meta.Size); err != nil {
			f.Close()
			return err
		}
	}

	bar := progressbar.DefaultBytes(meta.Size, "receiving")

	// 完了済みチャンクは進捗バーだけ進める
	chunkSize := (meta.Size + int64(meta.Chunks) - 1) / int64(meta.Chunks)
	for idx := range skipSet {
		off := int64(idx) * chunkSize
		sz := chunkSize
		if off+sz > meta.Size {
			sz = meta.Size - off
		}
		_, _ = bar.Write(make([]byte, sz))
	}

	remaining := meta.Chunks - len(skipSet)
	errCh := make(chan error, remaining)
	var wg sync.WaitGroup
	for i := 0; i < remaining; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			cm, aerr := acceptChunkWithMeta(ctx, conn, f, bar)
			if aerr != nil {
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
			f.Close()
			return e
		}
	}

	if _, err := f.Seek(0, io.SeekStart); err != nil {
		f.Close()
		return err
	}
	got, err := hashReader(f)
	f.Close()
	if err != nil {
		return err
	}
	if meta.Hash != "" && got != meta.Hash {
		_ = os.Remove(outPath)
		cp.finish()
		return fmt.Errorf("%w\n  want: %s...\n   got: %s...", ErrHashMismatch, meta.Hash[:16], got[:16])
	}
	cp.finish()
	fmt.Printf("✓ Hash OK  (%s...)\n", meta.Hash[:16])
	fmt.Printf("✓ Saved: %s (%d bytes)\n", outPath, meta.Size)
	return nil
}

// doReceiveFile は旧互換（resume なし）でシングルファイルを受信する。
func doReceiveFile(ctx context.Context, conn *quic.Conn, meta Meta) error {
	return doReceiveFileResume(ctx, conn, meta, nil)
}

// --- stream helpers ---

func sendChunk(ctx context.Context, conn *quic.Conn, filePath string, index int, offset, size int64, bar io.Writer) error {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return fmt.Errorf("chunk %d open: %w", index, err)
	}
	defer stream.Close()

	key, err := crypto.GenerateKeypair()
	if err != nil {
		return err
	}
	ns, err := crypto.HandshakeInitiator(stream, key)
	if err != nil {
		return fmt.Errorf("chunk %d noise: %w", index, err)
	}

	if err := writeChunkMeta(ns, ChunkMeta{Index: index, Offset: offset, Size: size}); err != nil {
		return fmt.Errorf("chunk %d meta: %w", index, err)
	}

	f, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer f.Close()
	if _, err := f.Seek(offset, io.SeekStart); err != nil {
		return err
	}
	_, err = io.CopyN(io.MultiWriter(ns, bar), f, size)
	return err
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
func acceptChunkWithMeta(ctx context.Context, conn *quic.Conn, f *os.File, bar io.Writer) (ChunkMeta, error) {
	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return ChunkMeta{}, fmt.Errorf("accept chunk stream: %w", err)
	}
	defer stream.Close()

	key, err := crypto.GenerateKeypair()
	if err != nil {
		return ChunkMeta{}, err
	}
	ns, err := crypto.HandshakeResponder(stream, key)
	if err != nil {
		return ChunkMeta{}, fmt.Errorf("chunk noise: %w", err)
	}

	cm, err := readChunkMeta(ns)
	if err != nil {
		return ChunkMeta{}, fmt.Errorf("chunk meta: %w", err)
	}

	ow := &offsetWriter{f: f, off: cm.Offset}
	_, err = io.CopyN(io.MultiWriter(ow, bar), ns, cm.Size)
	return cm, err
}

// acceptChunk は旧互換（dir.go 等から呼ばれる）。
func acceptChunk(ctx context.Context, conn *quic.Conn, f *os.File, bar io.Writer) error {
	_, err := acceptChunkWithMeta(ctx, conn, f, bar)
	return err
}
