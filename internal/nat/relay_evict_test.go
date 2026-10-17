package nat

import (
	"testing"
	"time"
)

// evictBucketsBefore は cutoff より厳密に古いバケットだけを ipRate / ipCreateRate の両方から削除する (#619)。
func TestEvictBucketsBefore(t *testing.T) {
	cutoff := time.Now()
	srv := NewRelayServerFull(nil, defaultMaxSessions)
	t.Cleanup(srv.Stop)

	fill := func(m map[string]*ipBucket) {
		m["old"] = &ipBucket{count: 1, since: cutoff.Add(-time.Second)}
		m["boundary"] = &ipBucket{count: 1, since: cutoff} // ちょうど境界は残す
		m["new"] = &ipBucket{count: 1, since: cutoff.Add(time.Second)}
	}
	srv.mu.Lock()
	fill(srv.ipRate)
	fill(srv.ipCreateRate)
	srv.mu.Unlock()

	srv.evictBucketsBefore(cutoff)

	srv.mu.Lock()
	defer srv.mu.Unlock()
	for name, m := range map[string]map[string]*ipBucket{"ipRate": srv.ipRate, "ipCreateRate": srv.ipCreateRate} {
		if _, ok := m["old"]; ok {
			t.Errorf("%s: expired bucket must be evicted", name)
		}
		for _, keep := range []string{"boundary", "new"} {
			if _, ok := m[keep]; !ok {
				t.Errorf("%s: bucket %q must be kept", name, keep)
			}
		}
	}
}

// 空のマップでも panic せず何もしない。
func TestEvictBucketsBefore_Empty(t *testing.T) {
	srv := NewRelayServerFull(nil, defaultMaxSessions)
	t.Cleanup(srv.Stop)
	srv.evictBucketsBefore(time.Now())
}
