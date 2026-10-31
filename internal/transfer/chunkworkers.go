package transfer

import (
	"context"
	"sync"

	"github.com/quic-go/quic-go"
)

// runChunkWorkers は worker を n 個並行に起動し、全員の終了を待って各結果（nil を含む、
// 完了順）を返す。
//
// #153/#477/#513: 最初のエラーで QUIC 接続を閉じ、AcceptStream で待機中の他の goroutine が
// ブロックし続けるのを防ぐ。sync.Once で二重クローズを回避し、ctx もキャンセルして
// AcceptStream が即座にキャンセルエラーで返るようにする。
func runChunkWorkers(ctx context.Context, conn *quic.Conn, n int, worker func(ctx context.Context) error) []error {
	innerCtx, cancelInner := context.WithCancel(ctx)
	defer cancelInner()
	var closeOnce sync.Once
	closeConn := func(cerr error) {
		closeOnce.Do(func() {
			cancelInner()
			conn.CloseWithError(1, cerr.Error()) //nolint:errcheck
		})
	}

	errCh := make(chan error, n)
	var wg sync.WaitGroup
	for i := 0; i < n; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			err := worker(innerCtx)
			if err != nil {
				closeConn(err)
			}
			errCh <- err
		}()
	}
	wg.Wait()
	close(errCh)

	errs := make([]error, 0, n)
	for e := range errCh {
		errs = append(errs, e)
	}
	return errs
}
