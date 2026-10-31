package webui

import (
	"sync"
	"testing"
)

func TestNewTransferIDUniqueUnderConcurrency(t *testing.T) {
	const n = 5000
	ids := make([]string, n)
	var wg sync.WaitGroup
	for i := 0; i < n; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			ids[i] = newTransferID("")
		}(i)
	}
	wg.Wait()
	seen := make(map[string]struct{}, n)
	for _, id := range ids {
		if _, dup := seen[id]; dup {
			t.Fatalf("duplicate transfer id: %s", id)
		}
		seen[id] = struct{}{}
	}
	if got := newTransferID("recv-"); len(got) < 6 || got[:5] != "recv-" {
		t.Fatalf("prefix missing: %s", got)
	}
}
