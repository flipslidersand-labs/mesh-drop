package transfer

import (
	"context"
	"fmt"
	"io"
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
	defer ln.Close()

	fmt.Printf("Waiting for file on %s ...\n", addr)
	conn, err := ln.Accept(ctx)
	if err != nil {
		return fmt.Errorf("accept: %w", err)
	}
	defer conn.CloseWithError(0, "done")

	// --- Control stream: Meta ---
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

	// --- Parallel data streams ---
	bar := progressbar.DefaultBytes(meta.Size, "receiving")
	errs := make([]error, meta.Chunks)
	var wg sync.WaitGroup
	for i := 0; i < meta.Chunks; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if err := acceptChunk(ctx, conn, f, bar); err != nil {
				errs[i] = err
			}
		}()
	}
	wg.Wait()
	fmt.Println()

	for _, e := range errs {
		if e != nil {
			f.Close()
			_ = os.Remove(outPath)
			return e
		}
	}

	// --- Hash verification ---
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

// Send は addr へ QUIC 接続し、filePath を並列チャンクで転送する。
func Send(ctx context.Context, addr, filePath string, nChunks int) error {
	f, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer f.Close()
	info, err := f.Stat()
	if err != nil {
		return err
	}
	f.Close()

	fmt.Printf("Hashing %s ...\n", filepath.Base(filePath))
	fh, _ := os.Open(filePath)
	hash, err := hashReader(fh)
	fh.Close()
	if err != nil {
		return fmt.Errorf("hash: %w", err)
	}

	conn, err := quic.DialAddr(ctx, addr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	defer conn.CloseWithError(0, "done")

	meta := Meta{
		Name:   filepath.Base(filePath),
		Size:   info.Size(),
		Hash:   hash,
		Chunks: nChunks,
	}

	// --- Control stream: Meta ---
	if err := sendMeta(ctx, conn, meta); err != nil {
		return fmt.Errorf("control stream: %w", err)
	}

	// --- Parallel data streams ---
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

// --- helpers ---

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
