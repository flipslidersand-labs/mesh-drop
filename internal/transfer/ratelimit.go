package transfer

import (
	"fmt"
	"strconv"
	"strings"

	"golang.org/x/time/rate"
)

// ParseRateLimit parses a human-readable bandwidth string (e.g. "10MB/s", "512KB/s")
// and returns a token-bucket Limiter. Empty string returns nil (unlimited).
func ParseRateLimit(s string) (*rate.Limiter, error) {
	if s == "" {
		return nil, nil
	}
	s = strings.TrimSpace(s)
	s = strings.TrimSuffix(s, "/s")
	s = strings.TrimSuffix(s, "ps")
	s = strings.ToUpper(s)

	var multiplier int64 = 1
	switch {
	case strings.HasSuffix(s, "GIB"):
		multiplier = 1 << 30
		s = strings.TrimSuffix(s, "GIB")
	case strings.HasSuffix(s, "GB"):
		multiplier = 1 << 30
		s = strings.TrimSuffix(s, "GB")
	case strings.HasSuffix(s, "MIB"):
		multiplier = 1 << 20
		s = strings.TrimSuffix(s, "MIB")
	case strings.HasSuffix(s, "MB"):
		multiplier = 1 << 20
		s = strings.TrimSuffix(s, "MB")
	case strings.HasSuffix(s, "KIB"):
		multiplier = 1 << 10
		s = strings.TrimSuffix(s, "KIB")
	case strings.HasSuffix(s, "KB"):
		multiplier = 1 << 10
		s = strings.TrimSuffix(s, "KB")
	case strings.HasSuffix(s, "B"):
		s = strings.TrimSuffix(s, "B")
	case strings.HasSuffix(s, "G"):
		multiplier = 1 << 30
		s = strings.TrimSuffix(s, "G")
	case strings.HasSuffix(s, "M"):
		multiplier = 1 << 20
		s = strings.TrimSuffix(s, "M")
	case strings.HasSuffix(s, "K"):
		multiplier = 1 << 10
		s = strings.TrimSuffix(s, "K")
	}

	n, err := strconv.ParseFloat(strings.TrimSpace(s), 64)
	if err != nil || n <= 0 {
		return nil, fmt.Errorf("invalid rate-limit value %q (use e.g. 10MB/s, 512KB/s)", s)
	}
	return NewRateLimiter(int64(n * float64(multiplier))), nil
}
