package transfer

import (
	"io"
	"sync"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
	"github.com/flynn/noise"
)

// sessionIdentity は起動時に LoadOrCreateIdentity でロードされる永続 keypair。
// ゼロ値の場合、制御ストリームは毎回 ephemeral 鍵を使う（TOFU なし）。
var sessionIdentity noise.DHKey

// sessionPeers は TOFU 検証ストア。nil の場合は TOFU を行わない。
var sessionPeers *crypto.KnownPeers

var initOnce sync.Once

// InitSession loads (or creates) the persistent identity and TOFU store from the
// default config directory. Safe to call from multiple goroutines; executes only once.
// Non-fatal: if initialization fails the session falls back to ephemeral keys.
func InitSession() error {
	var initErr error
	initOnce.Do(func() {
		dir := crypto.IdentityDir()
		key, err := crypto.LoadOrCreateIdentity(dir)
		if err != nil {
			initErr = err
			return
		}
		sessionIdentity = key
		sessionPeers = crypto.NewKnownPeers(dir)
	})
	return initErr
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
