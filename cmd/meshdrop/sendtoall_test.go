package main

import (
	"bytes"
	"context"
	"errors"
	"os"
	"path/filepath"
	"sync"
	"testing"

	"golang.org/x/time/rate"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
)

// stubSend は sendFileFn / sendDirFn を差し替え、呼び出された (addr → fingerprint) を記録する。
// failAddrs に含まれる addr は失敗を返す。
type sendRecorder struct {
	mu    sync.Mutex
	fps   map[string][]byte
	files int
	dirs  int
}

func stubSend(t *testing.T, failAddrs map[string]bool) *sendRecorder {
	t.Helper()
	rec := &sendRecorder{fps: map[string][]byte{}}
	origFile, origDir := sendFileFn, sendDirFn
	t.Cleanup(func() { sendFileFn, sendDirFn = origFile, origDir })
	record := func(addr string, fp []byte, dir bool) error {
		rec.mu.Lock()
		defer rec.mu.Unlock()
		rec.fps[addr] = fp
		if dir {
			rec.dirs++
		} else {
			rec.files++
		}
		if failAddrs[addr] {
			return errors.New("boom")
		}
		return nil
	}
	sendFileFn = func(_ context.Context, addr, _ string, _ int, fp []byte, _ *rate.Limiter, _ bool, _ int, _ bool) error {
		return record(addr, fp, false)
	}
	sendDirFn = func(_ context.Context, addr, _ string, _ int, fp []byte, _ *rate.Limiter, _ bool, _ int, _ bool, _ func(int64, int64)) error {
		return record(addr, fp, true)
	}
	return rec
}

func peerAt(name, ip string, fp []byte) discovery.Peer {
	return discovery.Peer{Name: name, Host: name + ".local.", Port: 44444, IP: ip, Fingerprint: fp}
}

func TestSendToAll_Aggregation(t *testing.T) {
	src := filepath.Join(t.TempDir(), "a.txt")
	if err := os.WriteFile(src, []byte("x"), 0o644); err != nil {
		t.Fatal(err)
	}
	a, b, c := peerAt("a", "10.0.0.1", nil), peerAt("b", "10.0.0.2", nil), peerAt("c", "10.0.0.3", nil)
	cases := []struct {
		name    string
		peers   []discovery.Peer
		fail    map[string]bool
		wantErr string // 空なら成功
	}{
		{"all succeed", []discovery.Peer{a, b, c}, nil, ""},
		{"partial failure", []discovery.Peer{a, b, c}, map[string]bool{b.Addr(): true}, "1 of 3 peer(s) failed"},
		{"all fail", []discovery.Peer{a, b}, map[string]bool{a.Addr(): true, b.Addr(): true}, "all 2 peer(s) failed"},
		{"single peer fail", []discovery.Peer{a}, map[string]bool{a.Addr(): true}, "all 1 peer(s) failed"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			rec := stubSend(t, tc.fail)
			err := sendToAll(context.Background(), tc.peers, src, 1, nil, nil, false, 0, false)
			switch {
			case tc.wantErr == "" && err != nil:
				t.Fatalf("unexpected error: %v", err)
			case tc.wantErr != "" && (err == nil || err.Error() != tc.wantErr):
				t.Fatalf("error = %v, want %q", err, tc.wantErr)
			}
			// 一部が失敗しても全ピアへ送信を試みる。
			if rec.files != len(tc.peers) {
				t.Errorf("send called %d times, want %d", rec.files, len(tc.peers))
			}
		})
	}
}

// 明示指定の指紋はピアの広告指紋より優先され、未指定のときだけ広告の指紋を使う。
func TestSendToAll_FingerprintPrecedence(t *testing.T) {
	src := filepath.Join(t.TempDir(), "a.txt")
	if err := os.WriteFile(src, []byte("x"), 0o644); err != nil {
		t.Fatal(err)
	}
	adv := []byte{0xaa, 0xaa}
	explicit := []byte{0xee, 0xee}
	withFP := peerAt("withfp", "10.0.0.1", adv)
	noFP := peerAt("nofp", "10.0.0.2", nil)

	t.Run("no explicit: use advertised, none stays nil", func(t *testing.T) {
		rec := stubSend(t, nil)
		_ = sendToAll(context.Background(), []discovery.Peer{withFP, noFP}, src, 1, nil, nil, false, 0, false)
		if !bytes.Equal(rec.fps[withFP.Addr()], adv) {
			t.Errorf("withfp fp = %x, want advertised %x", rec.fps[withFP.Addr()], adv)
		}
		if len(rec.fps[noFP.Addr()]) != 0 {
			t.Errorf("nofp fp = %x, want empty", rec.fps[noFP.Addr()])
		}
	})
	t.Run("explicit wins over advertised", func(t *testing.T) {
		rec := stubSend(t, nil)
		_ = sendToAll(context.Background(), []discovery.Peer{withFP, noFP}, src, 1, explicit, nil, false, 0, false)
		for _, p := range []discovery.Peer{withFP, noFP} {
			if !bytes.Equal(rec.fps[p.Addr()], explicit) {
				t.Errorf("%s fp = %x, want explicit %x", p.Name, rec.fps[p.Addr()], explicit)
			}
		}
	})
}

// ディレクトリ指定のときは SendDir 経路を使う。
func TestSendToAll_DirUsesSendDir(t *testing.T) {
	rec := stubSend(t, nil)
	if err := sendToAll(context.Background(), []discovery.Peer{peerAt("a", "10.0.0.1", nil)}, t.TempDir(), 1, nil, nil, false, 0, false); err != nil {
		t.Fatal(err)
	}
	if rec.dirs != 1 || rec.files != 0 {
		t.Errorf("dirs=%d files=%d, want dirs=1 files=0", rec.dirs, rec.files)
	}
}
