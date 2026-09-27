//go:build !integration

package transfer

import (
	"context"
	"os"
	"path/filepath"
	"testing"
	"time"
)

// 受信先の既存ファイルを無言で上書きしないこと、既存シンボリックリンク経由で
// 受信ディレクトリ外へ書き込まないことの回帰テスト（private advisory）。

func TestRoundTrip_RefuseOverwrite_SingleFile(t *testing.T) {
	rtSkipShort(t)
	srcPath := filepath.Join(t.TempDir(), "victim.txt")
	if err := os.WriteFile(srcPath, []byte("attacker"), 0o644); err != nil {
		t.Fatal(err)
	}
	outDir := t.TempDir()
	existing := filepath.Join(outDir, "victim.txt")
	if err := os.WriteFile(existing, []byte("original"), 0o644); err != nil {
		t.Fatal(err)
	}
	bundle, addr, cancel, _ := rtStartListener(t, outDir)
	defer cancel()
	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()

	if err := Send(ctx, addr, srcPath, 2, bundle.Fingerprint, nil, false, 0, false); err == nil {
		t.Error("Send should fail when the destination file already exists")
	}
	rtAssertFile(t, existing, "original")
}

func TestRoundTrip_RefuseOverwrite_Dir(t *testing.T) {
	rtSkipShort(t)
	srcDir := t.TempDir()
	if err := os.WriteFile(filepath.Join(srcDir, "victim.txt"), []byte("attacker"), 0o644); err != nil {
		t.Fatal(err)
	}
	outDir := t.TempDir()
	existing := filepath.Join(outDir, "victim.txt")
	if err := os.WriteFile(existing, []byte("original"), 0o644); err != nil {
		t.Fatal(err)
	}
	bundle, addr, cancel, _ := rtStartListener(t, outDir)
	defer cancel()
	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()

	_ = SendDir(ctx, addr, srcDir, 2, bundle.Fingerprint, nil, false, 0, false, nil)
	time.Sleep(300 * time.Millisecond) // 受信側の rename 完了を待つ
	rtAssertFile(t, existing, "original")
}

func TestRoundTrip_Dir_SymlinkEscape(t *testing.T) {
	rtSkipShort(t)
	outside := t.TempDir()
	outDir := t.TempDir()
	if err := os.Symlink(outside, filepath.Join(outDir, "link")); err != nil {
		t.Skipf("symlink not supported: %v", err)
	}
	srcDir := t.TempDir()
	if err := os.MkdirAll(filepath.Join(srcDir, "link"), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(srcDir, "link", "evil.txt"), []byte("attacker"), 0o644); err != nil {
		t.Fatal(err)
	}
	bundle, addr, cancel, _ := rtStartListener(t, outDir)
	defer cancel()
	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()

	_ = SendDir(ctx, addr, srcDir, 2, bundle.Fingerprint, nil, false, 0, false, nil)
	time.Sleep(300 * time.Millisecond)
	for _, p := range []string{"evil.txt", "evil.txt.meshdrop.tmp"} {
		if _, err := os.Lstat(filepath.Join(outside, p)); err == nil {
			t.Errorf("%s was written outside the receive directory via symlink", p)
		}
	}
}

func rtAssertFile(t *testing.T, path, want string) {
	t.Helper()
	got, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("ReadFile(%s): %v", path, err)
	}
	if string(got) != want {
		t.Errorf("%s was overwritten: got %q, want %q", filepath.Base(path), got, want)
	}
}
