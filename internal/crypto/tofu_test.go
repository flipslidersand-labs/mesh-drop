package crypto

import (
	"encoding/hex"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
)

// --- helpers ---

// makeKnownPeers creates a KnownPeers backed by a temp dir.
func makeKnownPeers(t *testing.T) *KnownPeers {
	t.Helper()
	return NewKnownPeers(t.TempDir())
}

// fakePublicKey returns a deterministic 32-byte public key for tests.
func fakePublicKey(seed byte) []byte {
	key := make([]byte, 32)
	for i := range key {
		key[i] = seed + byte(i)
	}
	return key
}

// seedKnownPeers pre-populates the known_peers file with fp and returns the store.
func seedKnownPeers(t *testing.T, fps ...string) *KnownPeers {
	t.Helper()
	dir := t.TempDir()
	f, err := os.Create(filepath.Join(dir, "known_peers"))
	if err != nil {
		t.Fatal(err)
	}
	for _, fp := range fps {
		fmt.Fprintln(f, fp)
	}
	f.Close()
	return NewKnownPeers(dir)
}

// --- KnownPeers.Verify tests ---

// TestKnownPeers_Verify_EmptyKey verifies that an empty public key is rejected
// without opening TTY, and returns a clear error.
func TestKnownPeers_Verify_EmptyKey(t *testing.T) {
	kp := makeKnownPeers(t)
	err := kp.Verify(nil)
	if err == nil {
		t.Fatal("expected error for nil public key, got nil")
	}
	if !strings.Contains(err.Error(), "empty public key") {
		t.Errorf("unexpected error message: %v", err)
	}

	err = kp.Verify([]byte{})
	if err == nil {
		t.Fatal("expected error for empty public key, got nil")
	}
}

// TestKnownPeers_Verify_CacheHit verifies that a peer already in the known_peers
// file is trusted immediately, without any TTY interaction.
func TestKnownPeers_Verify_CacheHit(t *testing.T) {
	pub := fakePublicKey(0x01)
	fp := FingerprintKey(pub)
	kp := seedKnownPeers(t, fp)

	// Must succeed without any TTY.
	if err := kp.Verify(pub); err != nil {
		t.Fatalf("verify known peer: %v", err)
	}
}

// TestKnownPeers_Verify_CacheHit_SecondCall ensures the second Verify call for
// the same pre-trusted peer also succeeds and does not touch the TTY.
func TestKnownPeers_Verify_CacheHit_SecondCall(t *testing.T) {
	pub := fakePublicKey(0x02)
	fp := FingerprintKey(pub)
	kp := seedKnownPeers(t, fp)

	for i := range 3 {
		if err := kp.Verify(pub); err != nil {
			t.Fatalf("call %d: %v", i, err)
		}
	}
}

// TestKnownPeers_Verify_UnknownPeer_NoTTY checks that an unknown peer is
// rejected with a descriptive error when /dev/tty is unavailable.
// This is the #144 non-interactive env guard: must NOT silently allow.
func TestKnownPeers_Verify_UnknownPeer_NoTTY(t *testing.T) {
	// In a test environment /dev/tty may or may not be available.
	// We rely on the KnownPeers that has no entry for this key:
	// if TTY is not available the error must mention "TTY" or "no TTY".
	// If TTY IS available the prompt will time out or fail to read.
	// Either way the key must NOT be silently trusted.
	kp := makeKnownPeers(t)
	pub := fakePublicKey(0x42)

	err := kp.Verify(pub)
	// An unknown peer without a populated TTY must NEVER return nil.
	// (In CI, /dev/tty is absent so we get "no TTY available".)
	if err == nil {
		t.Fatal("unknown peer must not be trusted without TTY interaction")
	}
}

// TestKnownPeers_Verify_UnknownPeer_ErrorContainsTTYMessage checks that the
// error for a missing TTY contains the expected guidance text.
func TestKnownPeers_Verify_UnknownPeer_ErrorContainsTTYMessage(t *testing.T) {
	if _, err := os.Open("/dev/tty"); err == nil {
		// If /dev/tty is actually open-able this test checks a different code
		// path (timeout / no input). Skip to avoid flakiness in interactive envs.
		t.Skip("/dev/tty is available; skipping no-TTY error message check")
	}

	kp := makeKnownPeers(t)
	pub := fakePublicKey(0x55)
	err := kp.Verify(pub)
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	msg := err.Error()
	if !strings.Contains(msg, "no TTY") && !strings.Contains(msg, "TTY") {
		t.Errorf("error should mention TTY unavailability, got: %v", msg)
	}
	if !strings.Contains(msg, "--allow-no-tofu") && !strings.Contains(msg, "--insecure") {
		t.Errorf("error should hint --insecure flag, got: %v", msg)
	}
}

// TestKnownPeers_Verify_Concurrent_SamePeer tests that concurrent Verify calls
// for the same already-trusted peer all return nil and don't race.
// Detected via -race flag.
func TestKnownPeers_Verify_Concurrent_SamePeer(t *testing.T) {
	pub := fakePublicKey(0x10)
	fp := FingerprintKey(pub)
	kp := seedKnownPeers(t, fp)

	const goroutines = 50
	errs := make(chan error, goroutines)
	var wg sync.WaitGroup
	wg.Add(goroutines)
	for range goroutines {
		go func() {
			defer wg.Done()
			errs <- kp.Verify(pub)
		}()
	}
	wg.Wait()
	close(errs)
	for err := range errs {
		if err != nil {
			t.Errorf("concurrent verify trusted peer: %v", err)
		}
	}
}

// TestKnownPeers_Verify_Concurrent_UnknownPeer tests concurrent Verify calls
// for an unknown peer. All goroutines must observe an error (not a silent pass),
// and only a single TTY prompt attempt should be made (singleflight dedup).
// The race detector validates that no data races occur.
func TestKnownPeers_Verify_Concurrent_UnknownPeer(t *testing.T) {
	kp := makeKnownPeers(t)
	pub := fakePublicKey(0x20)

	const goroutines = 20
	errs := make(chan error, goroutines)
	var wg sync.WaitGroup
	wg.Add(goroutines)
	for range goroutines {
		go func() {
			defer wg.Done()
			errs <- kp.Verify(pub)
		}()
	}
	wg.Wait()
	close(errs)
	for err := range errs {
		if err == nil {
			t.Error("unknown peer must not be trusted without user approval")
		}
	}
}

// TestKnownPeers_loadCache_ParsesFile verifies that NewKnownPeers loads all
// fingerprints from an existing file (blank lines and whitespace are trimmed).
func TestKnownPeers_loadCache_ParsesFile(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "known_peers")
	content := "\n" + hex.EncodeToString(fakePublicKey(0x01)) + "\n\n" +
		hex.EncodeToString(fakePublicKey(0x02)) + "  \n\n"
	if err := os.WriteFile(path, []byte(content), 0o600); err != nil {
		t.Fatal(err)
	}

	kp := NewKnownPeers(dir)
	for i, seed := range []byte{0x01, 0x02} {
		pub := fakePublicKey(seed)
		if err := kp.Verify(pub); err != nil {
			t.Errorf("peer %d should be trusted from file: %v", i, err)
		}
	}
}

// TestKnownPeers_loadCache_MissingFile verifies that a missing known_peers file
// is tolerated (no panic, empty cache).
func TestKnownPeers_loadCache_MissingFile(t *testing.T) {
	kp := NewKnownPeers(t.TempDir())
	// Cache should be empty; no crash.
	if len(kp.cache) != 0 {
		t.Errorf("expected empty cache for missing file, got %d entries", len(kp.cache))
	}
}

// TestKnownPeers_appendFile_PersistsAcrossReload verifies that a peer written
// via appendFile is reloaded correctly by a new KnownPeers instance.
func TestKnownPeers_appendFile_PersistsAcrossReload(t *testing.T) {
	dir := t.TempDir()
	fp := hex.EncodeToString(fakePublicKey(0xAB))

	kp := NewKnownPeers(dir)
	if err := kp.appendFile(fp); err != nil {
		t.Fatalf("appendFile: %v", err)
	}

	kp2 := NewKnownPeers(dir)
	if _, ok := kp2.cache[fp]; !ok {
		t.Error("fingerprint not found in reloaded cache")
	}
}

// TestKnownPeers_appendFile_FilePermissions checks that the known_peers file
// is created with mode 0600 (owner-read/write only).
func TestKnownPeers_appendFile_FilePermissions(t *testing.T) {
	dir := t.TempDir()
	kp := NewKnownPeers(dir)
	fp := hex.EncodeToString(fakePublicKey(0xCC))

	if err := kp.appendFile(fp); err != nil {
		t.Fatalf("appendFile: %v", err)
	}
	info, err := os.Stat(filepath.Join(dir, "known_peers"))
	if err != nil {
		t.Fatal(err)
	}
	if perm := info.Mode().Perm(); perm != 0o600 {
		t.Errorf("known_peers mode: got %o, want 0600", perm)
	}
}

// TestKnownPeers_MultiplePeers_IndependentEntries verifies that multiple
// distinct peers are stored and recalled independently.
func TestKnownPeers_MultiplePeers_IndependentEntries(t *testing.T) {
	var fps []string
	for seed := byte(0); seed < 5; seed++ {
		fps = append(fps, FingerprintKey(fakePublicKey(seed)))
	}
	kp := seedKnownPeers(t, fps...)

	for seed := byte(0); seed < 5; seed++ {
		pub := fakePublicKey(seed)
		if err := kp.Verify(pub); err != nil {
			t.Errorf("peer seed=%d: %v", seed, err)
		}
	}
}
