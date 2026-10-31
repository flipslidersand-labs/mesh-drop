package nat

import (
	"errors"
	"fmt"
	"log/slog"
	"time"
)

// permanentError wraps an error to signal retryWithBackoff to stop immediately.
type permanentError struct{ err error }

func (e *permanentError) Error() string { return e.err.Error() }
func (e *permanentError) Unwrap() error { return e.err }

// permanent marks err as non-retryable (e.g. 4xx HTTP responses).
func permanent(err error) error { return &permanentError{err: err} }

// retryWithBackoff calls fn up to attempts times, doubling the sleep after each
// failure starting from base. Returns immediately on permanent errors.
func retryWithBackoff[T any](name string, attempts int, base time.Duration, fn func() (T, error)) (T, error) {
	var zero T
	var lastErr error
	delay := base
	for i := 1; i <= attempts; i++ {
		result, err := fn()
		if err == nil {
			return result, nil
		}
		lastErr = err
		var pe *permanentError
		if errors.As(err, &pe) {
			slog.Debug("NAT retry", "op", name, "attempt", i, "max", attempts, "permanent", true, "err", err)
			return zero, err
		}
		if i < attempts {
			slog.Debug("NAT retry", "op", name, "attempt", i, "max", attempts, "err", err, "next_in", delay)
			time.Sleep(delay)
			delay *= 2
		} else {
			slog.Debug("NAT retry", "op", name, "attempt", i, "max", attempts, "err", err)
		}
	}
	return zero, fmt.Errorf("%s failed after %d attempts: %w", name, attempts, lastErr)
}
