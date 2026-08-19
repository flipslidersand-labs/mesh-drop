package main

import (
	"testing"
)

func TestParseRateLimit(t *testing.T) {
	tests := []struct {
		input   string
		wantBps int64
		wantErr bool
	}{
		{"", 0, false},            // 空文字 → nil (無制限)
		{"10MB/s", 10 << 20, false},
		{"10mb/s", 10 << 20, false}, // 小文字
		{"512KB/s", 512 << 10, false},
		{"1GB/s", 1 << 30, false},
		{"100B/s", 100, false},
		{"2.5MB/s", int64(2.5 * float64(1<<20)), false},
		{"0MB/s", 0, true},  // 0 は拒否
		{"-1MB/s", 0, true}, // 負数は拒否
		{"abcMB/s", 0, true},
		{"10XB/s", 0, true}, // 未知の単位
	}

	for _, tc := range tests {
		lim, err := parseRateLimit(tc.input)

		if tc.wantErr {
			if err == nil {
				t.Errorf("parseRateLimit(%q): want error, got nil", tc.input)
			}
			continue
		}
		if err != nil {
			t.Errorf("parseRateLimit(%q): unexpected error: %v", tc.input, err)
			continue
		}

		if tc.input == "" {
			if lim != nil {
				t.Errorf("parseRateLimit(%q): want nil limiter, got non-nil", tc.input)
			}
			continue
		}
		if lim == nil {
			t.Errorf("parseRateLimit(%q): want non-nil limiter, got nil", tc.input)
			continue
		}
		// rate.Limiter.Limit() が期待 bps と一致するか確認（浮動小数誤差 1% 許容）
		got := float64(lim.Limit())
		want := float64(tc.wantBps)
		if got < want*0.99 || got > want*1.01 {
			t.Errorf("parseRateLimit(%q): rate=%.0f, want %.0f", tc.input, got, want)
		}
	}
}
