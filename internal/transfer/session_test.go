package transfer

import (
	"errors"
	"fmt"
	"testing"
)

func TestErrTOFURejected_wrapping(t *testing.T) {
	inner := errors.New("new peer — first-use registered")
	wrapped := fmt.Errorf("%w: %w", errTOFURejected, inner)

	if !errors.Is(wrapped, errTOFURejected) {
		t.Error("errors.Is should find errTOFURejected in wrapped error")
	}
	if !errors.Is(wrapped, inner) {
		t.Error("errors.Is should find inner error in wrapped error")
	}
}

func TestErrTOFURejected_notInUnrelated(t *testing.T) {
	other := errors.New("some other error")
	if errors.Is(other, errTOFURejected) {
		t.Error("errTOFURejected should not match unrelated error")
	}
}
