package crypto

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// noTTY makes the store behave like a CI/script environment (no /dev/tty).
func noTTY(kp *KnownPeers) *KnownPeers {
	kp.openTTY = func() (promptTTY, error) { return nil, errors.New("no tty") }
	return kp
}

func TestKnownPeers_Trust_AllowsVerifyWithoutTTY(t *testing.T) {
	pub := fakePublicKey(7)
	kp := noTTY(makeKnownPeers(t))

	if err := kp.Verify(pub); err == nil {
		t.Fatal("unknown peer must be rejected without TTY before Trust")
	}
	if err := kp.Trust(FingerprintKey(pub)); err != nil {
		t.Fatalf("Trust: %v", err)
	}
	if err := kp.Verify(pub); err != nil {
		t.Fatalf("Verify after Trust = %v, want nil", err)
	}
}

func TestKnownPeers_Trust_PersistsAcrossRestart(t *testing.T) {
	dir := t.TempDir()
	pub := fakePublicKey(9)
	if err := NewKnownPeers(dir).Trust(FingerprintKey(pub)); err != nil {
		t.Fatalf("Trust: %v", err)
	}
	if err := noTTY(NewKnownPeers(dir)).Verify(pub); err != nil {
		t.Fatalf("Verify on a fresh store = %v, want nil (persisted)", err)
	}
}

func TestKnownPeers_Trust_IdempotentAndCaseInsensitive(t *testing.T) {
	dir := t.TempDir()
	kp := NewKnownPeers(dir)
	key := FingerprintKey(fakePublicKey(3))
	for _, k := range []string{key, strings.ToUpper(key), " " + key + "\n"} {
		if err := kp.Trust(k); err != nil {
			t.Fatalf("Trust(%q): %v", k, err)
		}
	}
	data, err := os.ReadFile(filepath.Join(dir, "known_peers"))
	if err != nil {
		t.Fatal(err)
	}
	if got := strings.Count(string(data), key); got != 1 {
		t.Fatalf("key written %d times, want 1", got)
	}
}

func TestKnownPeers_Trust_RejectsInvalid(t *testing.T) {
	kp := makeKnownPeers(t)
	for name, in := range map[string]string{
		"empty":     "",
		"short":     "abcd",
		"non-hex":   strings.Repeat("z", 64),
		"too-long":  strings.Repeat("a", 66),
		"odd-short": strings.Repeat("a", 63),
	} {
		if err := kp.Trust(in); err == nil {
			t.Errorf("%s: Trust(%q) = nil, want error", name, in)
		}
	}
}
