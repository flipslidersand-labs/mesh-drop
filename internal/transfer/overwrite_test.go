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

// checkDirDone が受信ディレクトリ外（シンボリックリンク経由）のファイルをハッシュして
// 「完了済み」と報告しないことの回帰テスト。ピアが既知ハッシュで外部ファイルの存在を探れた。
func TestCheckDirDone_IgnoresSymlinks(t *testing.T) {
	outside := t.TempDir()
	secret := []byte("secret outside receive dir")
	if err := os.WriteFile(filepath.Join(outside, "secret.txt"), secret, 0o600); err != nil {
		t.Fatal(err)
	}
	h, err := hashReader(bytes.NewReader(secret))
	if err != nil {
		t.Fatal(err)
	}
	outDir := t.TempDir()
	if err := os.Symlink(outside, filepath.Join(outDir, "dirlink")); err != nil {
		t.Skipf("symlink not supported: %v", err)
	}
	if err := os.Symlink(filepath.Join(outside, "secret.txt"), filepath.Join(outDir, "filelink.txt")); err != nil {
		t.Fatal(err)
	}
	inside := []byte("regular file")
	if err := os.WriteFile(filepath.Join(outDir, "ok.txt"), inside, 0o644); err != nil {
		t.Fatal(err)
	}
	hIn, _ := hashReader(bytes.NewReader(inside))

	done := checkDirDone(outDir, []FileMeta{
		{Path: "dirlink/secret.txt", Size: int64(len(secret)), Hash: h},
		{Path: "filelink.txt", Size: int64(len(secret)), Hash: h},
		{Path: "ok.txt", Size: int64(len(inside)), Hash: hIn},
	})
	if len(done) != 1 || done[0] != "ok.txt" {
		t.Errorf("checkDirDone = %v, want only [ok.txt] (symlinked files must not be reported)", done)
	}
}
