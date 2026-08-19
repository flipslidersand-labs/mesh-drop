package transfer

import (
	"context"
	"io"
	"math"

	"golang.org/x/time/rate"
)

// maxBurst はトークンバケットの最大バーストサイズ（1 MiB）。
// 小さすぎると rate.WaitN が「burst より大きい」エラーを返すため、
// 大きな Read が来ても安全に処理できるよう余裕を持たせる。
const maxBurst = 1 << 20 // 1 MiB

// NewRateLimiter は bytesPerSec バイト/秒のトークンバケットを返す。
// bytesPerSec <= 0 の場合は nil を返し、throttle なしを意味する。
func NewRateLimiter(bytesPerSec int64) *rate.Limiter {
	if bytesPerSec <= 0 {
		return nil
	}
	burst := int(math.Min(float64(bytesPerSec), float64(maxBurst)))
	return rate.NewLimiter(rate.Limit(bytesPerSec), burst)
}

// throttledReader は rate.Limiter を使って Read スループットを制限する。
type throttledReader struct {
	ctx context.Context
	r   io.Reader
	lim *rate.Limiter
}

// NewThrottledReader は r を lim で制限した io.Reader を返す。
// lim が nil の場合は r をそのまま返す。
func NewThrottledReader(ctx context.Context, r io.Reader, lim *rate.Limiter) io.Reader {
	if lim == nil {
		return r
	}
	return &throttledReader{ctx: ctx, r: r, lim: lim}
}

func (t *throttledReader) Read(p []byte) (int, error) {
	// バースト以下に分割して WaitN を安全に呼ぶ。
	max := t.lim.Burst()
	if len(p) > max {
		p = p[:max]
	}
	n, err := t.r.Read(p)
	if n > 0 {
		if werr := t.lim.WaitN(t.ctx, n); werr != nil {
			return n, werr
		}
	}
	return n, err
}
