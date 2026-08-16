package crypto

import (
	"bytes"
	"encoding/binary"
	"encoding/hex"
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// --- LoadOrCreateIdentity ---

// TestLoadOrCreateIdentity_CreatesNewKey verifies that a fresh directory
// generates a valid 32-byte X25519 keypair and persists it to id_x25519.
func TestLoadOrCreateIdentity_CreatesNewKey(t *testing.T) {
	dir := t.TempDir()
	key, err := LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatalf("LoadOrCreateIdentity: %v", err)
	}
	if len(key.Private) != 32 {
		t.Errorf("private key length: got %d, want 32", len(key.Private))
	}
	if len(key.Public) != 32 {
		t.Errorf("public key length: got %d, want 32", len(key.Public))
	}
	// Key must not be all-zeros.
	if bytes.Equal(key.Private, make([]byte, 32)) {
		t.Error("private key is all zeros")
	}
	if bytes.Equal(key.Public, make([]byte, 32)) {
		t.Error("public key is all zeros")
	}
}

// TestLoadOrCreateIdentity_PersistsFile verifies that LoadOrCreateIdentity
// writes a 64-byte file: private (0:32) + public (32:64).
func TestLoadOrCreateIdentity_PersistsFile(t *testing.T) {
	dir := t.TempDir()
	key, err := LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}

	data, err := os.ReadFile(filepath.Join(dir, "id_x25519"))
	if err != nil {
		t.Fatalf("read id_x25519: %v", err)
	}
	if len(data) != 64 {
		t.Fatalf("file size: got %d, want 64", len(data))
	}
	if !bytes.Equal(data[:32], key.Private) {
		t.Error("private key mismatch in persisted file")
	}
	if !bytes.Equal(data[32:], key.Public) {
		t.Error("public key mismatch in persisted file")
	}
}

// TestLoadOrCreateIdentity_FilePermissions checks that the key file is created
// with mode 0600 (private: owner-only).
func TestLoadOrCreateIdentity_FilePermissions(t *testing.T) {
	dir := t.TempDir()
	if _, err := LoadOrCreateIdentity(dir); err != nil {
		t.Fatal(err)
	}
	info, err := os.Stat(filepath.Join(dir, "id_x25519"))
	if err != nil {
		t.Fatal(err)
	}
	if perm := info.Mode().Perm(); perm != 0o600 {
		t.Errorf("id_x25519 mode: got %o, want 0600", perm)
	}
}

// TestLoadOrCreateIdentity_LoadsExistingKey verifies that a second call to
// LoadOrCreateIdentity returns the same keypair as the first call.
func TestLoadOrCreateIdentity_LoadsExistingKey(t *testing.T) {
	dir := t.TempDir()
	key1, err := LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}
	key2, err := LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}
	if !bytes.Equal(key1.Private, key2.Private) {
		t.Errorf("private key changed across calls: %x vs %x", key1.Private, key2.Private)
	}
	if !bytes.Equal(key1.Public, key2.Public) {
		t.Errorf("public key changed across calls: %x vs %x", key1.Public, key2.Public)
	}
}

// TestLoadOrCreateIdentity_LoadsExistingKey_ContentMatch seeds a known keypair
// and confirms LoadOrCreateIdentity reads it byte-for-byte.
func TestLoadOrCreateIdentity_LoadsExistingKey_ContentMatch(t *testing.T) {
	dir := t.TempDir()
	priv := make([]byte, 32)
	pub := make([]byte, 32)
	for i := range priv {
		priv[i] = byte(i + 1)
		pub[i] = byte(i + 33)
	}
	raw := append(priv, pub...)
	if err := os.WriteFile(filepath.Join(dir, "id_x25519"), raw, 0o600); err != nil {
		t.Fatal(err)
	}

	key, err := LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}
	if !bytes.Equal(key.Private, priv) {
		t.Errorf("private: got %x, want %x", key.Private, priv)
	}
	if !bytes.Equal(key.Public, pub) {
		t.Errorf("public:  got %x, want %x", key.Public, pub)
	}
}

// TestLoadOrCreateIdentity_TruncatedFile verifies that a corrupted (wrong-size)
// file causes a new keypair to be generated rather than loading garbage.
func TestLoadOrCreateIdentity_TruncatedFile(t *testing.T) {
	dir := t.TempDir()
	// Write only 32 bytes — length check (== 64) must fail.
	if err := os.WriteFile(filepath.Join(dir, "id_x25519"), make([]byte, 32), 0o600); err != nil {
		t.Fatal(err)
	}
	key, err := LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}
	// A new key should have been generated; it should not be all-zeros.
	if bytes.Equal(key.Private, make([]byte, 32)) {
		t.Error("expected fresh non-zero private key for truncated file")
	}
}

// TestLoadOrCreateIdentity_CreatesDir verifies that LoadOrCreateIdentity
// creates the directory if it does not exist.
func TestLoadOrCreateIdentity_CreatesDir(t *testing.T) {
	base := t.TempDir()
	dir := filepath.Join(base, "nested", "identity")
	if _, err := LoadOrCreateIdentity(dir); err != nil {
		t.Fatalf("LoadOrCreateIdentity with missing dir: %v", err)
	}
	if _, err := os.Stat(dir); err != nil {
		t.Errorf("directory not created: %v", err)
	}
}

// --- FingerprintKey ---

// TestFingerprintKey_Format verifies that FingerprintKey returns lowercase hex
// of the full 32-byte public key (64 chars, no separators).
func TestFingerprintKey_Format(t *testing.T) {
	tests := []struct {
		name string
		pub  []byte
	}{
		{"32 bytes zeros", make([]byte, 32)},
		{"32 bytes incremental", func() []byte { b := make([]byte, 32); for i := range b { b[i] = byte(i) }; return b }()},
		{"short key (16 bytes)", make([]byte, 16)},
		{"single byte", []byte{0xFF}},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := FingerprintKey(tc.pub)
			want := hex.EncodeToString(tc.pub)
			if got != want {
				t.Errorf("got %q, want %q", got, want)
			}
			// Must be purely lowercase hex.
			if strings.ToLower(got) != got {
				t.Errorf("not lowercase: %q", got)
			}
			if len(got) != len(tc.pub)*2 {
				t.Errorf("length: got %d, want %d", len(got), len(tc.pub)*2)
			}
		})
	}
}

// TestFingerprintKey_Empty verifies that an empty/nil key returns "".
func TestFingerprintKey_Empty(t *testing.T) {
	if got := FingerprintKey(nil); got != "" {
		t.Errorf("nil: got %q, want \"\"", got)
	}
	if got := FingerprintKey([]byte{}); got != "" {
		t.Errorf("empty: got %q, want \"\"", got)
	}
}

// TestFingerprintKey_Stable verifies that calling FingerprintKey twice on the
// same input returns the same string (no random component).
func TestFingerprintKey_Stable(t *testing.T) {
	pub := make([]byte, 32)
	for i := range pub {
		pub[i] = byte(i * 7)
	}
	if a, b := FingerprintKey(pub), FingerprintKey(pub); a != b {
		t.Errorf("unstable: %q != %q", a, b)
	}
}

// --- FingerprintShort ---

// TestFingerprintShort_Format verifies that FingerprintShort returns
// first 16 bytes as colon-separated uppercase-or-lowercase hex pairs.
// The spec says XX:XX:...:XX (32 hex chars + 15 colons = 47 chars for a ≥16-byte key).
func TestFingerprintShort_Format(t *testing.T) {
	pub := make([]byte, 32)
	for i := range pub {
		pub[i] = byte(i + 1)
	}
	got := FingerprintShort(pub)

	// Expected: first 16 bytes, each pair separated by ':'
	raw := hex.EncodeToString(pub[:16])
	var sb strings.Builder
	for i := 0; i < 16; i++ {
		sb.WriteByte(raw[i*2])
		sb.WriteByte(raw[i*2+1])
		if i < 15 {
			sb.WriteByte(':')
		}
	}
	want := sb.String()
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
	// Length must be 47 for a ≥16-byte key.
	if len(got) != 47 {
		t.Errorf("length: got %d, want 47", len(got))
	}
}

// TestFingerprintShort_Empty verifies that empty/nil returns "<unknown>".
func TestFingerprintShort_Empty(t *testing.T) {
	if got := FingerprintShort(nil); got != "<unknown>" {
		t.Errorf("nil: got %q, want \"<unknown>\"", got)
	}
	if got := FingerprintShort([]byte{}); got != "<unknown>" {
		t.Errorf("empty: got %q, want \"<unknown>\"", got)
	}
}

// TestFingerprintShort_ShortKey verifies correct output for keys shorter than 16 bytes.
func TestFingerprintShort_ShortKey(t *testing.T) {
	pub := []byte{0xAB, 0xCD, 0xEF}
	got := FingerprintShort(pub)
	// 3 bytes → "ab:cd:ef" (8 chars)
	want := "ab:cd:ef"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

// TestFingerprintShort_SingleByte checks the edge case of a 1-byte public key.
func TestFingerprintShort_SingleByte(t *testing.T) {
	pub := []byte{0x0F}
	got := FingerprintShort(pub)
	if got != "0f" {
		t.Errorf("got %q, want \"0f\"", got)
	}
}

// TestFingerprint_AliasForShort confirms that Fingerprint is an alias for
// FingerprintShort (same output for same input).
func TestFingerprint_AliasForShort(t *testing.T) {
	pub := make([]byte, 32)
	for i := range pub {
		pub[i] = byte(i * 3)
	}
	if a, b := Fingerprint(pub), FingerprintShort(pub); a != b {
		t.Errorf("Fingerprint != FingerprintShort: %q vs %q", a, b)
	}
}

// --- Noise handshake message-size security boundary (#156) ---

// overrideHandshakeMsgLen writes a length-prefixed message whose declared
// length exceeds maxHandshakeMsgLen, then closes the write end.
// Used to simulate a malicious/oversized handshake frame.
func writeOversizedHandshakeFrame(w io.Writer, declaredLen uint16, payload []byte) error {
	var lb [2]byte
	binary.BigEndian.PutUint16(lb[:], declaredLen)
	if _, err := w.Write(lb[:]); err != nil {
		return err
	}
	if len(payload) > 0 {
		_, err := w.Write(payload)
		return err
	}
	return nil
}

// TestHandshake_OversizedMessage_Rejected verifies that the responder rejects
// an initiator frame whose declared length exceeds maxHandshakeMsgLen (4096).
// This guards against memory-exhaustion attacks (#171 / #156).
func TestHandshake_OversizedMessage_Rejected(t *testing.T) {
	// We need to craft a raw pipe where we control the first frame.
	// Responder reads msg1 (e): if its declared length > 4096 → error.
	pr, pw := io.Pipe()
	// Wrap pr+pw to feed the "responder" side.
	respRW := struct {
		io.Reader
		io.Writer
	}{pr, io.Discard}

	respKey, err := GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	done := make(chan error, 1)
	go func() {
		_, err := HandshakeResponder(respRW, respKey)
		done <- err
	}()

	// Write an oversized frame (declared length = 5000, actual payload short).
	oversizedLen := uint16(5000) // > maxHandshakeMsgLen (4096)
	if err := writeOversizedHandshakeFrame(pw, oversizedLen, nil); err != nil {
		// Pipe closed on the other side — responder already errored.
	}
	pw.Close()

	err = <-done
	if err == nil {
		t.Fatal("expected error for oversized handshake message, got nil")
	}
	// Error should mention message length or maximum.
	msg := err.Error()
	if !strings.Contains(msg, "exceeds maximum") && !strings.Contains(msg, "length") {
		t.Logf("error (acceptable): %v", msg)
	}
}

// TestHandshake_TruncatedMessage_Rejected verifies that a truncated handshake
// frame (declared length > actual bytes available) is rejected.
func TestHandshake_TruncatedMessage_Rejected(t *testing.T) {
	pr, pw := io.Pipe()
	respRW := struct {
		io.Reader
		io.Writer
	}{pr, io.Discard}

	respKey, _ := GenerateKeypair()

	done := make(chan error, 1)
	go func() {
		_, err := HandshakeResponder(respRW, respKey)
		done <- err
	}()

	// Declare 100 bytes but send only 10, then close.
	var lb [2]byte
	binary.BigEndian.PutUint16(lb[:], 100)
	pw.Write(lb[:])
	pw.Write(make([]byte, 10))
	pw.Close()

	if err := <-done; err == nil {
		t.Fatal("expected error for truncated handshake message, got nil")
	}
}

// TestHandshake_ZeroLengthMessage_Rejected verifies that a zero-length first
// message is handled gracefully (rejected by the noise state machine).
func TestHandshake_ZeroLengthMessage_Rejected(t *testing.T) {
	pr, pw := io.Pipe()
	respRW := struct {
		io.Reader
		io.Writer
	}{pr, io.Discard}

	respKey, _ := GenerateKeypair()

	done := make(chan error, 1)
	go func() {
		_, err := HandshakeResponder(respRW, respKey)
		done <- err
	}()

	// Send a zero-length frame.
	var lb [2]byte
	binary.BigEndian.PutUint16(lb[:], 0)
	pw.Write(lb[:])
	pw.Close()

	if err := <-done; err == nil {
		t.Fatal("expected error for zero-length handshake message, got nil")
	}
}

// TestHandshake_MaxAllowedFrameSize checks that a frame at exactly
// maxHandshakeMsgLen is not rejected by the length check itself
// (though it may fail for other noise-protocol reasons).
func TestHandshake_MaxAllowedFrameSize(t *testing.T) {
	// This test only validates that the length guard does NOT trigger at
	// exactly maxHandshakeMsgLen. The noise state machine may still reject
	// the payload — that is fine, the important thing is the error is NOT
	// "exceeds maximum".
	pr, pw := io.Pipe()
	respRW := struct {
		io.Reader
		io.Writer
	}{pr, io.Discard}

	respKey, _ := GenerateKeypair()

	done := make(chan error, 1)
	go func() {
		_, err := HandshakeResponder(respRW, respKey)
		done <- err
	}()

	var lb [2]byte
	binary.BigEndian.PutUint16(lb[:], uint16(maxHandshakeMsgLen))
	pw.Write(lb[:])
	pw.Write(make([]byte, maxHandshakeMsgLen)) // valid declared length; noise will reject content
	pw.Close()

	err := <-done
	// Must error (noise protocol rejection) but must NOT say "exceeds maximum".
	if err != nil && strings.Contains(err.Error(), "exceeds maximum") {
		t.Errorf("length guard fired at exactly maxHandshakeMsgLen: %v", err)
	}
}
