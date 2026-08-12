package transfer

import (
	"io"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
	"github.com/flynn/noise"
)

// sessionIdentity は起動時に LoadOrCreateIdentity でロードされる永続 keypair。
// ゼロ値の場合、制御ストリームは毎回 ephemeral 鍵を使う（TOFU なし）。
var sessionIdentity noise.DHKey

// sessionPeers は TOFU 検証ストア。nil の場合は TOFU を行わない。
var sessionPeers *crypto.KnownPeers

// InitSession loads (or creates) the persistent identity and TOFU store from the
// default config directory. Call this once from main() before any transfers.
// Non-fatal: if initialization fails the session falls back to ephemeral keys.
func InitSession() error {
	dir := crypto.IdentityDir()
	key, err := crypto.LoadOrCreateIdentity(dir)
	if err != nil {
		return err
	}
	sessionIdentity = key
	sessionPeers = crypto.NewKnownPeers(dir)
	return nil
}

// controlHandshakeInitiator は制御ストリーム用のハンドシェイクを実行する。
// 永続 identity を使い、TOFU 検証を行う。
func controlHandshakeInitiator(stream io.ReadWriter) (*crypto.NoiseStream, error) {
	key := sessionIdentity
	if len(key.Private) == 0 {
		var err error
		key, err = crypto.GenerateKeypair()
		if err != nil {
			return nil, err
		}
	}
	ns, peerStatic, err := crypto.HandshakeInitiatorFull(stream, key)
	if err != nil {
		return nil, err
	}
	if sessionPeers != nil && len(peerStatic) > 0 {
		fp := crypto.Fingerprint(peerStatic)
		if err := sessionPeers.Verify(fp); err != nil {
			return nil, err
		}
	}
	return ns, nil
}

// controlHandshakeResponder は制御ストリーム用のハンドシェイクを実行する。
// 永続 identity を使い、TOFU 検証を行う。
func controlHandshakeResponder(stream io.ReadWriter) (*crypto.NoiseStream, error) {
	key := sessionIdentity
	if len(key.Private) == 0 {
		var err error
		key, err = crypto.GenerateKeypair()
		if err != nil {
			return nil, err
		}
	}
	ns, peerStatic, err := crypto.HandshakeResponderFull(stream, key)
	if err != nil {
		return nil, err
	}
	if sessionPeers != nil && len(peerStatic) > 0 {
		fp := crypto.Fingerprint(peerStatic)
		if err := sessionPeers.Verify(fp); err != nil {
			return nil, err
		}
	}
	return ns, nil
}
