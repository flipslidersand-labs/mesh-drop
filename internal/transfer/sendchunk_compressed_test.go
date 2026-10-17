//go:build !integration

package transfer

import (
	"bytes"
	"context"
	"os"
	"path/filepath"
	"testing"
	"time"
)

// #623: 単一ファイル/ディレクトリ両方が共通の sendChunkStream を通る。
// 圧縮経路 (zstd) を両方で往復させ、内容が一致することを確認する。
func TestSendChunkStream_CompressedRoundTrip(t *testing.T) {
	rtSkipShort(t)
	content := bytes.Repeat([]byte("meshdrop compressible payload\n"), 20000)

	t.Run("single file", func(t *testing.T) {
		src := filepath.Join(t.TempDir(), "c.txt")
		if err := os.WriteFile(src, content, 0o644); err != nil {
			t.Fatal(err)
		}
		bundle, addr, cancel, recv := rtStartListener(t, t.TempDir())
		defer cancel()
		ctx, c := context.WithTimeout(context.Background(), 30*time.Second)
		defer c()
		if err := Send(ctx, addr, src, 3, bundle.Fingerprint, nil, true, 3, false); err != nil {
			t.Fatalf("Send: %v", err)
		}
		got, err := os.ReadFile(rtWaitRecv(t, recv, 1)[0])
		if err != nil || !bytes.Equal(got, content) {
			t.Fatalf("content mismatch (err=%v)", err)
		}
	})

	t.Run("directory", func(t *testing.T) {
		srcDir := t.TempDir()
		if err := os.WriteFile(filepath.Join(srcDir, "c.txt"), content, 0o644); err != nil {
			t.Fatal(err)
		}
		outDir := t.TempDir()
		bundle, addr, cancel, _ := rtStartListener(t, outDir)
		defer cancel()
		ctx, c := context.WithTimeout(context.Background(), 30*time.Second)
		defer c()
		if err := SendDir(ctx, addr, srcDir, 3, bundle.Fingerprint, nil, true, 3, false, nil); err != nil {
			t.Fatalf("SendDir: %v", err)
		}
		var got []byte
		var err error
		for deadline := time.Now().Add(10 * time.Second); time.Now().Before(deadline); time.Sleep(10 * time.Millisecond) {
			if got, err = os.ReadFile(filepath.Join(outDir, "c.txt")); err == nil {
				break
			}
		}
		if err != nil || !bytes.Equal(got, content) {
			t.Fatalf("content mismatch (err=%v)", err)
		}
	})
}
