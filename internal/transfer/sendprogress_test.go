package transfer

import (
	"context"
	"crypto/rand"
	"os"
	"path/filepath"
	"sync"
	"testing"
	"time"
)

// #615: SendProgress は実際に送ったバイト数を通知し、最終値は total に一致する。
func TestSendProgress_ReportsRealBytes(t *testing.T) {
	rtSkipShort(t)
	content := make([]byte, 512*1024)
	if _, err := rand.Read(content); err != nil {
		t.Fatal(err)
	}
	srcPath := filepath.Join(t.TempDir(), "prog.bin")
	if err := os.WriteFile(srcPath, content, 0o644); err != nil {
		t.Fatal(err)
	}
	bundle, addr, cancel, recv := rtStartListener(t, t.TempDir())
	defer cancel()

	var mu sync.Mutex
	var last, total int64
	calls := 0
	progressFn := func(sent, tot int64) {
		mu.Lock()
		defer mu.Unlock()
		calls++
		total = tot
		if sent > last {
			last = sent
		}
	}
	ctx, c := context.WithTimeout(context.Background(), 30*time.Second)
	defer c()
	if err := SendProgress(ctx, addr, srcPath, 4, bundle.Fingerprint, nil, false, 0, false, progressFn); err != nil {
		t.Fatalf("SendProgress: %v", err)
	}
	rtWaitRecv(t, recv, 1)

	mu.Lock()
	defer mu.Unlock()
	if calls == 0 {
		t.Fatal("progressFn was never called")
	}
	if total != int64(len(content)) || last != total {
		t.Errorf("final progress = %d/%d, want %d/%d", last, total, len(content), len(content))
	}
}
