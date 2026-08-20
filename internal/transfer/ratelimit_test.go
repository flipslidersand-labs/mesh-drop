package transfer

import (
	"testing"
)

func TestParseRateLimit_Empty(t *testing.T) {
	lim, err := ParseRateLimit("")
	if err != nil || lim != nil {
		t.Fatalf("expected nil, nil; got %v, %v", lim, err)
	}
}

func TestParseRateLimit_Valid(t *testing.T) {
	cases := []struct {
		input string
		want  int64
	}{
		{"10MB/s", 10 << 20},
		{"512KB/s", 512 << 10},
		{"1GB/s", 1 << 30},
		{"100B/s", 100},
		{"2MiB/s", 2 << 20},
		{"1.5MB/s", int64(1.5 * (1 << 20))},
		{"10M", 10 << 20},
		{"512K", 512 << 10},
	}
	for _, c := range cases {
		lim, err := ParseRateLimit(c.input)
		if err != nil {
			t.Errorf("%q: unexpected error: %v", c.input, err)
			continue
		}
		if lim == nil {
			t.Errorf("%q: got nil limiter", c.input)
			continue
		}
		if got := int64(lim.Limit()); got != c.want {
			t.Errorf("%q: got %d, want %d", c.input, got, c.want)
		}
	}
}

func TestParseRateLimit_Invalid(t *testing.T) {
	cases := []string{"notanumber", "-5MB/s", "0KB/s"}
	for _, c := range cases {
		_, err := ParseRateLimit(c)
		if err == nil {
			t.Errorf("%q: expected error, got nil", c)
		}
	}
}
