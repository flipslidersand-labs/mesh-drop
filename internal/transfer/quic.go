package transfer

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/quic-go/quic-go"
	"github.com/schollz/progressbar/v3"
	"lukechampine.com/blake3"
)

// Listen は QUIC で 1 接続を待ち受け、ファイルを受信して保存する。
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

	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return fmt.Errorf("accept stream: %w", err)
	}
	defer stream.Close()

	meta, err := readMeta(stream)
	if err != nil {
		return fmt.Errorf("read meta: %w", err)
	}
	fmt.Printf("Receiving: %s (%d bytes)\n", meta.Name, meta.Size)

	outPath := filepath.Base(meta.Name)
	f, err := os.Create(outPath)
	if err != nil {
		return err
	}
	defer f.Close()

	h := blake3.New(32, nil)
	bar := progressbar.DefaultBytes(meta.Size, "receiving")
	if _, err := io.Copy(io.MultiWriter(f, bar, h), stream); err != nil {
		return fmt.Errorf("receive: %w", err)
	}
	fmt.Println()

	if meta.Hash != "" {
		got := fmt.Sprintf("%x", h.Sum(nil))
		if got != meta.Hash {
			_ = os.Remove(outPath)
			return fmt.Errorf("%w\n  want: %s...\n   got: %s...", ErrHashMismatch, meta.Hash[:16], got[:16])
		}
		fmt.Printf("✓ Hash OK  (%s...)\n", meta.Hash[:16])
	}
	fmt.Printf("✓ Saved: %s (%d bytes)\n", outPath, meta.Size)
	return nil
}

// Send は addr へ QUIC 接続し、filePath を転送する。
func Send(ctx context.Context, addr, filePath string) error {
	f, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer f.Close()

	info, err := f.Stat()
	if err != nil {
		return err
	}

	// Phase 3: ファイル全体の BLAKE3 ハッシュを先に計算してから送信
	hash, err := hashReader(f)
	if err != nil {
		return fmt.Errorf("hash: %w", err)
	}
	if _, err := f.Seek(0, io.SeekStart); err != nil {
		return fmt.Errorf("seek: %w", err)
	}

	conn, err := quic.DialAddr(ctx, addr, clientTLS(), nil)
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	defer conn.CloseWithError(0, "done")

	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return fmt.Errorf("open stream: %w", err)
	}
	defer stream.Close()

	meta := Meta{Name: filepath.Base(filePath), Size: info.Size(), Hash: hash}
	if err := writeMeta(stream, meta); err != nil {
		return fmt.Errorf("write meta: %w", err)
	}

	bar := progressbar.DefaultBytes(info.Size(), "sending  ")
	if _, err := io.Copy(io.MultiWriter(stream, bar), f); err != nil {
		return fmt.Errorf("send: %w", err)
	}
	fmt.Printf("\n✓ Sent: %s (%d bytes)\n", filePath, info.Size())
	return nil
}
