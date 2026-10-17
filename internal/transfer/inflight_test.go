//go:build !integration

package transfer

import (
	"context"
	"crypto/rand"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestClaimOutPath(t *testing.T) {
	dir := t.TempDir()
	p := filepath.Join(dir, "a.bin")
	release, ok := claimOutPath(p)
	if !ok {
		t.Fatal("first claim must succeed")
	}
	if _, ok := claimOutPath(filepath.Join(dir, ".", "a.bin")); ok {
		t.Error("same path (even uncleaned) must not be claimed twice")
	}
	if rel2, ok := claimOutPath(filepath.Join(dir, "b.bin")); !ok {
		t.Error("a different name must be claimable")
	} else {
		rel2()
	}
	release()
	rel3, ok := claimOutPath(p)
	if !ok {
		t.Fatal("claim must succeed again after release")
	}
	rel3()
}

// 同名ファイルが受信中のとき 2 本目は tmp を奪い合わず明示エラーで拒否され、
// 受信中が終われば同名でも受信できる (#639)。
// 「受信中」は claimOutPath を直接保持して決定論的に再現する。
func TestListenContinuous_RejectsConcurrentSameName(t *testing.T) {
	rtSkipShort(t)
	content := make([]byte, 64*1024)
	if _, err := rand.Read(content); err != nil {
		t.Fatal(err)
	}
	srcPath := filepath.Join(t.TempDir(), "dup.bin")
	if err := os.WriteFile(srcPath, content, 0o644); err != nil {
		t.Fatal(err)
	}
	outDir := t.TempDir()
	bundle, addr, cancel, recv := rtStartListener(t, outDir)
	defer cancel()

	release, ok := claimOutPath(filepath.Join(outDir, "dup.bin"))
	if !ok {
		t.Fatal("claim")
	}

	ctx, sndCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer sndCancel()
	err := Send(ctx, addr, srcPath, 1, bundle.Fingerprint, nil, false, 0, false)
	if err == nil || !strings.Contains(err.Error(), "already being received") {
		t.Fatalf("Send error = %v, want 'already being received'", err)
	}
	for _, name := range []string{"dup.bin", "dup.bin.meshdrop.tmp"} {
		if _, statErr := os.Stat(filepath.Join(outDir, name)); !os.IsNotExist(statErr) {
			t.Errorf("%s must not be created by the rejected transfer (stat err = %v)", name, statErr)
		}
	}

	release()
	if err := Send(ctx, addr, srcPath, 1, bundle.Fingerprint, nil, false, 0, false); err != nil {
		t.Fatalf("Send after release: %v", err)
	}
	paths := rtWaitRecv(t, recv, 1)
	got, err := os.ReadFile(paths[0])
	if err != nil || string(got) != string(content) {
		t.Fatalf("received content mismatch (err=%v)", err)
	}
	// 完了後は claim が残らない（再度取得できる）。
	rel, ok := claimOutPath(filepath.Join(outDir, "dup.bin"))
	if !ok {
		t.Fatal("claim must be released after a completed receive")
	}
	rel()
}
