package crypto

import (
	"bytes"
	"crypto/ecdh"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"runtime"

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
//
// 既存ファイルが壊れている（長さ不正・公開鍵が秘密鍵と不一致）・他者から読める
// パーミッションの場合はエラーを返し、無言で再生成・上書きしない。無言の鍵更新は
// 全ピアで TOFU 再承認を強い、利用者に指紋の再承認を習慣づけてしまう。
func LoadOrCreateIdentity(dir string) (noise.DHKey, error) {
	path := filepath.Join(dir, "id_x25519")
	info, statErr := os.Stat(path)
	if statErr == nil {
		return loadIdentity(path, info)
	}
	if !errors.Is(statErr, os.ErrNotExist) {
		return noise.DHKey{}, fmt.Errorf("identity %s: %w", path, statErr)
	}

	key, err := noise.DH25519.GenerateKeypair(rand.Reader)
	if err != nil {
		return noise.DHKey{}, err
	}
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return noise.DHKey{}, err
	}
	raw := make([]byte, 64)
	defer zeroBytes(raw)
	copy(raw[:32], key.Private)
	copy(raw[32:], key.Public)
	if err := os.WriteFile(path, raw, 0o600); err != nil {
		return noise.DHKey{}, err
	}
	return key, nil
}

// loadIdentity は既存の identity ファイルを検証して読み込む。
func loadIdentity(path string, info os.FileInfo) (noise.DHKey, error) {
	if runtime.GOOS != "windows" && info.Mode().Perm()&0o077 != 0 {
		return noise.DHKey{}, fmt.Errorf("identity %s: permissions %#o are too open; run: chmod 600 %s",
			path, info.Mode().Perm(), path)
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return noise.DHKey{}, fmt.Errorf("identity %s: %w", path, err)
	}
	defer zeroBytes(data)
	corrupt := func(why string) error {
		return fmt.Errorf("identity %s is corrupted (%s); remove it to generate a new identity (peers will have to re-approve its fingerprint)", path, why)
	}
	if len(data) != 64 {
		return noise.DHKey{}, corrupt(fmt.Sprintf("%d bytes, want 64", len(data)))
	}
	priv, err := ecdh.X25519().NewPrivateKey(data[:32])
	if err != nil || !bytes.Equal(priv.PublicKey().Bytes(), data[32:]) {
		return noise.DHKey{}, corrupt("public key does not match private key")
	}
	private := make([]byte, 32)
	public := make([]byte, 32)
	copy(private, data[:32])
	copy(public, data[32:])
	return noise.DHKey{Private: private, Public: public}, nil
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
