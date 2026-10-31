package transfer

import (
	"bytes"
	"context"
	"io"
	"testing"
	"time"

	"golang.org/x/time/rate"
)

func TestNewRateLimiter(t *testing.T) {
	tests := []struct {
		bps     int64
		wantNil bool
	}{
		{0, true},
		{-1, true},
		{1024, false},
		{10 << 20, false},
	}
	for _, tc := range tests {
		lim := NewRateLimiter(tc.bps)
		if tc.wantNil && lim != nil {
			t.Errorf("NewRateLimiter(%d): want nil, got non-nil", tc.bps)
		}
		if !tc.wantNil && lim == nil {
			t.Errorf("NewRateLimiter(%d): want non-nil, got nil", tc.bps)
		}
	}
}

func TestNewThrottledReader_NilLimiter(t *testing.T) {
	src := bytes.NewReader([]byte("hello"))
	r := NewThrottledReader(context.Background(), src, nil)
	// nil limiter → src をそのまま返す
	if r != io.Reader(src) {
		t.Error("expected src to be returned unchanged when lim is nil")
	}
}

func TestThrottledReader_ReadsCorrectData(t *testing.T) {
	data := bytes.Repeat([]byte("x"), 4096)
	src := bytes.NewReader(data)
	// 高速リミッター: テストが遅くならないよう十分大きく設定
	lim := rate.NewLimiter(rate.Limit(100<<20), 1<<20)
	r := NewThrottledReader(context.Background(), src, lim)

	got, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("ReadAll: %v", err)
	}
	if !bytes.Equal(got, data) {
		t.Errorf("data mismatch: want %d bytes, got %d bytes", len(data), len(got))
	}
}

func TestThrottledReader_RespectsCancellation(t *testing.T) {
	// 非常に低速なリミッターで ctx をキャンセルして WaitN が返ることを確認
	data := bytes.Repeat([]byte("y"), 1024)
	src := bytes.NewReader(data)
	lim := rate.NewLimiter(rate.Limit(1), 1) // 1 byte/s — 実質停止
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()
	r := NewThrottledReader(ctx, src, lim)

	_, err := io.ReadAll(r)
	if err == nil {
		t.Error("expected error from cancelled context, got nil")
	}
}

func TestThrottledReader_RateIsApproximate(t *testing.T) {
	const bps = 2 << 20  // 2 MB/s
	const size = 4 << 20 // 4 MB — burst(1MB) の影響を薄めるため bps の 2 倍

	data := bytes.Repeat([]byte("z"), int(size))
	src := bytes.NewReader(data)
	lim := rate.NewLimiter(rate.Limit(bps), maxBurst)
	r := NewThrottledReader(context.Background(), src, lim)

	start := time.Now()
	got2, err := io.ReadAll(r)
	elapsed := time.Since(start)
	if err != nil {
		t.Fatalf("ReadAll: %v", err)
	}
	if len(got2) != int(size) {
		t.Fatalf("read %d bytes, want %d", len(got2), size)
	}

	// バースト(1MB)で先行消費後、残り 3MB が 2MB/s で ~1.5s。
	// 合計 ~1.5s を期待。CI 誤差を含め [0.9s, 4s] で許容。
	minExpected := 900 * time.Millisecond
	maxExpected := 4 * time.Second
	if elapsed < minExpected || elapsed > maxExpected {
		t.Errorf("elapsed=%v; want [%v, %v] for %d bytes at %d B/s",
			elapsed, minExpected, maxExpected, size, bps)
	}
}

func BenchmarkThrottledReader_NoLimit(b *testing.B) {
	data := bytes.Repeat([]byte("b"), 1<<20)
	b.SetBytes(int64(len(data)))
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		src := bytes.NewReader(data)
		r := NewThrottledReader(context.Background(), src, nil)
		io.ReadAll(r) //nolint:errcheck
	}
}

func BenchmarkThrottledReader_HighLimit(b *testing.B) {
	data := bytes.Repeat([]byte("b"), 1<<20)
	lim := rate.NewLimiter(rate.Limit(10<<30), maxBurst) // 10 GB/s — 実質無制限
	b.SetBytes(int64(len(data)))
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		src := bytes.NewReader(data)
		r := NewThrottledReader(context.Background(), src, lim)
		io.ReadAll(r) //nolint:errcheck
	}
}
