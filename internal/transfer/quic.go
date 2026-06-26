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
//   Stream 0 (control): Noise → Meta{Name, Size, Hash, Chunks}
//   Stream 1..N (data):  Noise → ChunkMeta{Index, Offset, Size} → bytes

// Listen は QUIC で 1 接続を待ち受け、並列チャンク転送でファイルを受信する。
func Listen(ctx context.Context, addr string) error {
	tlsConf, err := serverTLS()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	ln, err := quic.ListenAddr(addr, tlsConf, nil)
	if err != nil {
		return fmt.Errorf("listen %s: %w", addr, err)
	}
	return acceptAndReceive(ctx, ln)
}

// ListenNAT は既存の UDP ソケット上で QUIC リスナーを起動しファイルを受信する。
// NAT Traversal で穴あけ済みのソケットを渡すこと。
func ListenNAT(ctx context.Context, udpConn *net.UDPConn) error {
	tlsConf, err := serverTLS()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	ln, err := quic.Listen(udpConn, tlsConf, nil)
	if err != nil {
		return fmt.Errorf("QUIC listen on conn: %w", err)
	}
	return acceptAndReceive(ctx, ln)
}

// Send は addr へ QUIC 接続し、filePath を並列チャンクで転送する。
func Send(ctx context.Context, addr, filePath string, nChunks int) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSend(ctx, conn, filePath, nChunks)
}

// SendNAT は既存の UDP ソケットから peerAddr へ QUIC 接続しファイルを送信する。
// NAT Traversal で穴あけ済みのソケットを渡すこと。
func SendNAT(ctx context.Context, udpConn *net.UDPConn, peerAddr *net.UDPAddr, filePath string, nChunks int) error {
	conn, err := quic.Dial(ctx, udpConn, peerAddr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("QUIC dial NAT: %w", err)
	}
	return doSend(ctx, conn, filePath, nChunks)
}

// --- core transfer logic ---

func acceptAndReceive(ctx context.Context, ln *quic.Listener) error {
	defer ln.Close()
	fmt.Printf("Waiting for file on %s ...\n", ln.Addr())
	conn, err := ln.Accept(ctx)
	if err != nil {
		return fmt.Errorf("accept: %w", err)
	}
	return doReceive(ctx, conn)
}

func doReceive(ctx context.Context, conn *quic.Conn) error {
	defer conn.CloseWithError(0, "done")

	meta, err := acceptMeta(ctx, conn)
	if err != nil {
		return fmt.Errorf("control stream: %w", err)
	}
	fmt.Printf("Receiving: %s  %d bytes  %d chunk(s)\n", meta.Name, meta.Size, meta.Chunks)

	outPath := filepath.Base(meta.Name)
	f, err := os.Create(outPath)
	if err != nil {
		return err
	}
	if err := f.Truncate(meta.Size); err != nil {
		f.Close()
		return err
	}

	bar := progressbar.DefaultBytes(meta.Size, "receiving")
	errCh := make(chan error, meta.Chunks)
	var wg sync.WaitGroup
	for i := 0; i < meta.Chunks; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			errCh <- acceptChunk(ctx, conn, f, bar)
		}()
	}
	wg.Wait()
	close(errCh)
	fmt.Println()

	for e := range errCh {
		if e != nil {
			f.Close()
			_ = os.Remove(outPath)
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
		return fmt.Errorf("%w\n  want: %s...\n   got: %s...", ErrHashMismatch, meta.Hash[:16], got[:16])
	}
	fmt.Printf("✓ Hash OK  (%s...)\n", meta.Hash[:16])
	fmt.Printf("✓ Saved: %s (%d bytes)\n", outPath, meta.Size)
	return nil
}

func doSend(ctx context.Context, conn *quic.Conn, filePath string, nChunks int) error {
	defer conn.CloseWithError(0, "done")

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
	if err := sendMeta(ctx, conn, meta); err != nil {
		return fmt.Errorf("control stream: %w", err)
	}

	chunkSize := (info.Size() + int64(nChunks) - 1) / int64(nChunks)
	bar := progressbar.DefaultBytes(info.Size(), "sending  ")
	errs := make([]error, nChunks)
	var wg sync.WaitGroup
	for i := 0; i < nChunks; i++ {
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

// --- stream helpers ---

func sendMeta(ctx context.Context, conn *quic.Conn, meta Meta) error {
	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return err
	}
	defer stream.Close()
	key, err := crypto.GenerateKeypair()
	if err != nil {
		return err
	}
	ns, err := crypto.HandshakeInitiator(stream, key)
	if err != nil {
		return err
	}
	return writeMeta(ns, meta)
}

func acceptMeta(ctx context.Context, conn *quic.Conn) (Meta, error) {
	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return Meta{}, err
	}
	defer stream.Close()
	key, err := crypto.GenerateKeypair()
	if err != nil {
		return Meta{}, err
	}
	ns, err := crypto.HandshakeResponder(stream, key)
	if err != nil {
		return Meta{}, err
	}
	return readMeta(ns)
}

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

func acceptChunk(ctx context.Context, conn *quic.Conn, f *os.File, bar io.Writer) error {
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

	ow := &offsetWriter{f: f, off: cm.Offset}
	_, err = io.CopyN(io.MultiWriter(ow, bar), ns, cm.Size)
	return err
}
