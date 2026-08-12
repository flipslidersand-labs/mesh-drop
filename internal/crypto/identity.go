package crypto

import (
	"crypto/rand"
	"encoding/hex"
	"os"
	"path/filepath"

	"github.com/flynn/noise"
)

// IdentityDir returns the default directory for persistent identity files.
func IdentityDir() string {
	dir, err := os.UserConfigDir()
	if err != nil {
		dir = os.Getenv("HOME")
	}
	return filepath.Join(dir, "mesh-drop")
}

// LoadOrCreateIdentity loads a persistent X25519 identity from dir/id_x25519.
// If the file does not exist, a new keypair is generated and saved.
// The file stores 64 bytes: private key (32) + public key (32).
func LoadOrCreateIdentity(dir string) (noise.DHKey, error) {
	path := filepath.Join(dir, "id_x25519")
	if data, err := os.ReadFile(path); err == nil && len(data) == 64 {
		return noise.DHKey{Private: data[:32], Public: data[32:]}, nil
	}

	key, err := noise.DH25519.GenerateKeypair(rand.Reader)
	if err != nil {
		return noise.DHKey{}, err
	}
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return noise.DHKey{}, err
	}
	raw := make([]byte, 64)
	copy(raw[:32], key.Private)
	copy(raw[32:], key.Public)
	if err := os.WriteFile(path, raw, 0o600); err != nil {
		return noise.DHKey{}, err
	}
	return key, nil
}

// FingerprintKey returns the stable TOFU storage key for a public key:
// full 64-char lowercase hex of all 32 bytes.
// エンコード変更による既知ピア再登録を防ぐため、生バイトを直接エンコードする。
func FingerprintKey(pub []byte) string {
	if len(pub) == 0 {
		return ""
	}
	return hex.EncodeToString(pub)
}

// FingerprintShort returns a human-readable abbreviated fingerprint for display:
// first 16 bytes as XX:XX:...:XX (32 hex chars + 15 colons = 47 chars).
func FingerprintShort(pub []byte) string {
	if len(pub) == 0 {
		return "<unknown>"
	}
	n := 16
	if len(pub) < n {
		n = len(pub)
	}
	raw := hex.EncodeToString(pub[:n])
	out := make([]byte, n*3-1)
	for i := 0; i < n; i++ {
		out[i*3] = raw[i*2]
		out[i*3+1] = raw[i*2+1]
		if i < n-1 {
			out[i*3+2] = ':'
		}
	}
	return string(out)
}

// Fingerprint is an alias for FingerprintShort (display use only).
// TOFU ストレージには FingerprintKey を使うこと。
func Fingerprint(pub []byte) string {
	return FingerprintShort(pub)
}
