package transfer

import (
	"bytes"
	"fmt"
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

// localKey は sessionIdentity が設定されていればそれを、なければ ephemeral 鍵を返す。
func localKey() (noise.DHKey, error) {
	if len(sessionIdentity.Private) > 0 {
		return sessionIdentity, nil
	}
	return crypto.GenerateKeypair()
}

// controlHandshakeInitiator は制御ストリーム用のハンドシェイクを実行する。
// 永続 identity を使い、TOFU 検証を行う。
// 返す []byte はピアの静的公開鍵（チャンクストリームの検証に使う）。
func controlHandshakeInitiator(stream io.ReadWriter) (*crypto.NoiseStream, []byte, error) {
	key, err := localKey()
	if err != nil {
		return nil, nil, err
	}
	ns, peerStatic, err := crypto.HandshakeInitiatorFull(stream, key)
	if err != nil {
		return nil, nil, err
	}
	if sessionPeers != nil && len(peerStatic) > 0 {
		if err := sessionPeers.Verify(peerStatic); err != nil {
			return nil, nil, err
		}
	}
	return ns, peerStatic, nil
}

// controlHandshakeResponder は制御ストリーム用のハンドシェイクを実行する。
// 永続 identity を使い、TOFU 検証を行う。
// 返す []byte はピアの静的公開鍵（チャンクストリームの検証に使う）。
func controlHandshakeResponder(stream io.ReadWriter) (*crypto.NoiseStream, []byte, error) {
	key, err := localKey()
	if err != nil {
		return nil, nil, err
	}
	ns, peerStatic, err := crypto.HandshakeResponderFull(stream, key)
	if err != nil {
		return nil, nil, err
	}
	if sessionPeers != nil && len(peerStatic) > 0 {
		if err := sessionPeers.Verify(peerStatic); err != nil {
			return nil, nil, err
		}
	}
	return ns, peerStatic, nil
}

// chunkHandshakeInitiator はデータチャンクストリーム用ハンドシェイクを実行する。
// sessionIdentity を使い、ピア静的鍵が expectedPeer と一致するか検証する。
// expectedPeer が空のとき（InitSession 失敗など）は検証をスキップする。
func chunkHandshakeInitiator(stream io.ReadWriter, expectedPeer []byte) (*crypto.NoiseStream, error) {
	key, err := localKey()
	if err != nil {
		return nil, err
	}
	ns, peerKey, err := crypto.HandshakeInitiatorFull(stream, key)
	if err != nil {
		return nil, err
	}
	if len(expectedPeer) > 0 && !bytes.Equal(peerKey, expectedPeer) {
		return nil, fmt.Errorf("chunk stream: peer key mismatch")
	}
	return ns, nil
}

// chunkHandshakeResponder はデータチャンクストリーム用ハンドシェイクを実行する。
// sessionIdentity を使い、ピア静的鍵が expectedPeer と一致するか検証する。
// expectedPeer が空のとき（InitSession 失敗など）は検証をスキップする。
func chunkHandshakeResponder(stream io.ReadWriter, expectedPeer []byte) (*crypto.NoiseStream, error) {
	key, err := localKey()
	if err != nil {
		return nil, err
	}
	ns, peerKey, err := crypto.HandshakeResponderFull(stream, key)
	if err != nil {
		return nil, err
	}
	if len(expectedPeer) > 0 && !bytes.Equal(peerKey, expectedPeer) {
		return nil, fmt.Errorf("chunk stream: peer key mismatch")
	}
	return ns, nil
}
