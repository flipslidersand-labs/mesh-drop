package transfer

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"github.com/quic-go/quic-go"
)

// RecvCallback is called after each file is received successfully.
// name is the original filename, path is the absolute on-disk location,
// size is bytes written, peerAddr is the sender's QUIC address.
type RecvCallback func(name, path string, size int64, peerAddr string)

// ListenContinuous listens for multiple incoming QUIC connections using the given TLSBundle.
// For each connection it dispatches the normal receive pipeline, writing files to outDir.
// On successful single-file receive, cb is called.
// Blocks until ctx is cancelled.
func ListenContinuous(ctx context.Context, addr string, bundle *TLSBundle, outDir string, cb RecvCallback) error {
	ln, err := quic.ListenAddr(addr, bundle.Config, quicConfig())
	if err != nil {
		return fmt.Errorf("listen %s: %w", addr, err)
	}
	defer ln.Close()

	for {
		conn, err := ln.Accept(ctx)
		if err != nil {
			return err
		}
		go func() {
			peerAddr := conn.RemoteAddr().String()
			if err := dispatchConnToDir(ctx, conn, outDir, peerAddr, cb); err != nil {
				if !errors.Is(err, context.Canceled) && !errors.Is(err, context.DeadlineExceeded) {
					fmt.Fprintf(os.Stderr, "receive from %s: %v\n", peerAddr, err)
				}
			}
		}()
	}
}

// dispatchConnToDir is like dispatchConn but routes single-file transfers to outDir
// and invokes cb on completion.
func dispatchConnToDir(ctx context.Context, conn *quic.Conn, outDir, peerAddr string, cb RecvCallback) error {
	meta, cp, peerKey, dirDone, err := acceptMetaDispatch(ctx, conn, outDir)
	if err != nil {
		conn.CloseWithError(1, err.Error()) //nolint:errcheck
		return err
	}

	switch {
	case meta.IsPipe:
		return doReceivePipeConn(ctx, conn, peerKey)
	case meta.IsBatch:
		return doReceiveDir(ctx, conn, meta, outDir, peerKey, dirDone, false)
	default:
		outPath := filepath.Join(outDir, filepath.Base(meta.Name))
		if err := receiveFileToPath(ctx, conn, meta, cp, peerKey, outPath); err != nil {
			return err
		}
		info, _ := os.Stat(outPath)
		size := meta.Size
		if info != nil {
			size = info.Size()
		}
		if cb != nil {
			cb(meta.Name, outPath, size, peerAddr)
		}
		return nil
	}
}

// receiveFileToPath receives a single file into a private temp dir then renames it to outPath.
func receiveFileToPath(ctx context.Context, conn *quic.Conn, meta Meta, cp *checkpoint, peerKey []byte, outPath string) error {
	recvDir, err := os.MkdirTemp("", "meshdrop-recv1-*")
	if err != nil {
		return fmt.Errorf("mkdir temp: %w", err)
	}
	defer os.RemoveAll(recvDir)

	if err := doReceiveFileResume(ctx, conn, meta, cp, peerKey, recvDir); err != nil {
		return err
	}

	src := filepath.Join(recvDir, filepath.Base(meta.Name))
	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		return err
	}
	return os.Rename(src, outPath)
}
