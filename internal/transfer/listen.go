package transfer

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/quic-go/quic-go"
)

// maxConcurrentConns is the maximum number of connections handled simultaneously
// by ListenContinuous. Connections beyond this limit are accepted but queued
// inside the semaphore; the goroutine blocks until a slot is free, bounding
// the number of live goroutines and open file descriptors.
const maxConcurrentConns = 32

// connTimeout is the per-connection deadline. A connection that has not
// completed transfer within this window is forcibly cancelled.
const connTimeout = 5 * time.Minute

// RecvCallback is called after each file is received successfully.
// name is the original filename, path is the absolute on-disk location,
// size is bytes written, peerAddr is the sender's QUIC address.
type RecvCallback func(name, path string, size int64, peerAddr string)

// ListenContinuous listens for multiple incoming QUIC connections using the given TLSBundle.
// For each connection it dispatches the normal receive pipeline, writing files to outDir.
// On successful single-file receive, cb is called.
// Blocks until ctx is cancelled.
//
// At most maxConcurrentConns connections are processed concurrently; additional
// accepted connections wait for a slot. Each connection is subject to connTimeout.
func ListenContinuous(ctx context.Context, addr string, bundle *TLSBundle, outDir string, cb RecvCallback) error {
	ln, err := quic.ListenAddr(addr, bundle.Config, quicConfig())
	if err != nil {
		return fmt.Errorf("listen %s: %w", addr, err)
	}
	defer ln.Close()

	sem := make(chan struct{}, maxConcurrentConns)

	for {
		conn, err := ln.Accept(ctx)
		if err != nil {
			return err
		}
		go func() {
			// Acquire a concurrency slot before doing any work.
			select {
			case sem <- struct{}{}:
			case <-ctx.Done():
				conn.CloseWithError(1, "server shutting down") //nolint:errcheck
				return
			}
			defer func() { <-sem }()

			connCtx, cancel := context.WithTimeout(ctx, connTimeout)
			defer cancel()

			peerAddr := conn.RemoteAddr().String()
			if err := dispatchConnToDir(connCtx, conn, outDir, peerAddr, cb); err != nil {
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
		return doReceiveDir(ctx, conn, meta, outDir, peerKey, dirDone)
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
// The temp dir is created in the same directory as outPath so that os.Rename is an atomic
// same-filesystem move and never triggers EXDEV on cross-device paths (e.g. Docker volumes).
func receiveFileToPath(ctx context.Context, conn *quic.Conn, meta Meta, cp *checkpoint, peerKey []byte, outPath string) error {
	destDir := filepath.Dir(outPath)
	if err := os.MkdirAll(destDir, 0o755); err != nil {
		return err
	}
	recvDir, err := os.MkdirTemp(destDir, "meshdrop-recv1-*")
	if err != nil {
		return fmt.Errorf("mkdir temp: %w", err)
	}
	defer os.RemoveAll(recvDir)

	if err := doReceiveFileResume(ctx, conn, meta, cp, peerKey, recvDir); err != nil {
		return err
	}

	src := filepath.Join(recvDir, filepath.Base(meta.Name))
	return os.Rename(src, outPath)
}
