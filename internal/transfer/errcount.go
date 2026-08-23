package transfer

import (
	"context"
	"errors"
	"fmt"
	"net"
	"os"
	"strings"
	"sync"

	"github.com/quic-go/quic-go"
)

// errCategory classifies a transfer error into a named bucket.
type errCategory string

const (
	errCatTimeout  errCategory = "timeout"
	errCatConnReset errCategory = "conn_reset"
	errCatHashMismatch errCategory = "hash_mismatch"
	errCatFileIO   errCategory = "file_io"
	errCatOther    errCategory = "other"
)

// ErrCounter accumulates per-category error counts in a thread-safe way.
type ErrCounter struct {
	mu     sync.Mutex
	counts map[errCategory]int
}

func newErrCounter() *ErrCounter {
	return &ErrCounter{counts: make(map[errCategory]int)}
}

// Add categorizes err and increments the matching counter.
// nil errors are ignored.
func (ec *ErrCounter) Add(err error) {
	if err == nil {
		return
	}
	ec.mu.Lock()
	ec.counts[categorize(err)]++
	ec.mu.Unlock()
}

// AddAll categorizes each non-nil error in errs.
func (ec *ErrCounter) AddAll(errs []error) {
	for _, e := range errs {
		ec.Add(e)
	}
}

// Total returns the sum of all counted errors.
func (ec *ErrCounter) Total() int {
	ec.mu.Lock()
	defer ec.mu.Unlock()
	var n int
	for _, v := range ec.counts {
		n += v
	}
	return n
}

// Summary returns a human-readable summary string, or "" when there are no errors.
func (ec *ErrCounter) Summary() string {
	ec.mu.Lock()
	defer ec.mu.Unlock()
	if len(ec.counts) == 0 {
		return ""
	}
	var total int
	for _, v := range ec.counts {
		total += v
	}
	var sb strings.Builder
	sb.WriteString("Transfer warnings:\n")
	for _, cat := range []errCategory{errCatTimeout, errCatConnReset, errCatHashMismatch, errCatFileIO, errCatOther} {
		if n := ec.counts[cat]; n > 0 {
			fmt.Fprintf(&sb, "  %-14s %d\n", string(cat)+":", n)
		}
	}
	fmt.Fprintf(&sb, "  %-14s %d", "total errors:", total)
	return sb.String()
}

// categorize maps an error to the most specific known category.
func categorize(err error) errCategory {
	if errors.Is(err, context.DeadlineExceeded) {
		return errCatTimeout
	}
	if errors.Is(err, ErrHashMismatch) {
		return errCatHashMismatch
	}
	var qApp *quic.ApplicationError
	var qIdle *quic.IdleTimeoutError
	var netErr *net.OpError
	if errors.As(err, &qApp) || errors.As(err, &qIdle) || errors.As(err, &netErr) {
		return errCatConnReset
	}
	var pathErr *os.PathError
	if errors.As(err, &pathErr) {
		return errCatFileIO
	}
	return errCatOther
}
