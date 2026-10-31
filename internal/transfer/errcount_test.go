package transfer

import (
	"context"
	"errors"
	"os"
	"testing"
)

func TestErrCounter_Categorize(t *testing.T) {
	tests := []struct {
		name    string
		err     error
		wantCat errCategory
	}{
		{"deadline", context.DeadlineExceeded, errCatTimeout},
		{"hash_mismatch", ErrHashMismatch, errCatHashMismatch},
		{"file_io", &os.PathError{Op: "open", Path: "x", Err: errors.New("no")}, errCatFileIO},
		{"other", errors.New("unknown"), errCatOther},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := categorize(tt.err)
			if got != tt.wantCat {
				t.Fatalf("categorize(%v) = %q, want %q", tt.err, got, tt.wantCat)
			}
		})
	}
}

func TestErrCounter_Summary_EmptyWhenNoErrors(t *testing.T) {
	ec := newErrCounter()
	if s := ec.Summary(); s != "" {
		t.Fatalf("expected empty summary, got %q", s)
	}
}

func TestErrCounter_Summary_NonEmpty(t *testing.T) {
	ec := newErrCounter()
	ec.Add(context.DeadlineExceeded)
	ec.Add(context.DeadlineExceeded)
	ec.Add(errors.New("other"))

	s := ec.Summary()
	if s == "" {
		t.Fatal("expected non-empty summary")
	}
	if ec.Total() != 3 {
		t.Fatalf("expected total=3, got %d", ec.Total())
	}
}

func TestErrCounter_AddNil(t *testing.T) {
	ec := newErrCounter()
	ec.Add(nil)
	if ec.Total() != 0 {
		t.Fatal("nil error must not increment counter")
	}
}

func TestErrCounter_AddAll(t *testing.T) {
	ec := newErrCounter()
	ec.AddAll([]error{nil, context.DeadlineExceeded, nil, errors.New("x")})
	if ec.Total() != 2 {
		t.Fatalf("expected 2, got %d", ec.Total())
	}
}
