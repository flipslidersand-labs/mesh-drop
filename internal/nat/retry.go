package nat

import (
	"errors"
	"fmt"
	"log"
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
			log.Printf("NAT: %s attempt %d/%d failed (permanent): %v", name, i, attempts, err)
			return zero, err
		}
		if i < attempts {
			log.Printf("NAT: %s attempt %d/%d failed: %v — retrying in %s", name, i, attempts, err, delay)
			time.Sleep(delay)
			delay *= 2
		} else {
			log.Printf("NAT: %s attempt %d/%d failed: %v", name, i, attempts, err)
		}
	}
	return zero, fmt.Errorf("%s failed after %d attempts: %w", name, attempts, lastErr)
}
