package transfer

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"sync"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
	"github.com/flynn/noise"
)

// errTOFURejected はピアの公開鍵が TOFU ストアに登録されておらず拒否されたことを示す。
// dispatchConn はこのエラーを検出して専用の QUIC エラーコードで接続を閉じる。
var errTOFURejected = errors.New("peer rejected by TOFU store")

// Session holds a Noise identity and optional TOFU peer store.
// The zero value is valid: no persistent identity (ephemeral keys per handshake)
// and no TOFU verification.
// All methods are safe for concurrent use.
type Session struct {
	mu       sync.RWMutex
	identity noise.DHKey
	peers    *crypto.KnownPeers
	inited   bool
}

// defaultSession is the package-level Session used by all production code paths.
// Tests that need isolation should create their own *Session rather than
// touching this variable directly.
var defaultSession Session

// InitSession loads (or creates) the persistent identity and TOFU store from the
// default config directory. Safe to call from multiple goroutines.
// Retries on failure — a temporary error does not permanently disable TOFU.
func InitSession() error { return defaultSession.init() }

// init loads the persistent identity and TOFU store for this Session.
// Idempotent and safe for concurrent use.
func (s *Session) init() error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.inited {
		return nil
	}
	dir := crypto.IdentityDir()
	key, err := crypto.LoadOrCreateIdentity(dir)
	if err != nil {
		return err
	}
	s.identity = key
	s.peers = crypto.NewKnownPeers(dir)
	s.inited = true
	return nil
}

// localKey returns the Session's persistent identity, or a fresh ephemeral key
// when no identity has been set (init was not called or failed).
func (s *Session) localKey() (noise.DHKey, error) {
	s.mu.RLock()
	key := s.identity
	s.mu.RUnlock()
	if len(key.Private) > 0 {
		return key, nil
	}
	return crypto.GenerateKeypair()
}

// controlHandshakeInitiator は制御ストリーム用のハンドシェイクを実行する。
// 永続 identity を使い、TOFU 検証を行う。
// 返す []byte はピアの静的公開鍵（チャンクストリームの検証に使う）。
// ctx はハンドシェイクのタイムアウト制御に使う (#479)。
func (s *Session) controlHandshakeInitiator(ctx context.Context, stream io.ReadWriter) (*crypto.NoiseStream, []byte, error) {
	key, err := s.localKey()
	if err != nil {
		return nil, nil, err
	}
	ns, peerStatic, err := crypto.HandshakeInitiatorFullCtx(ctx, stream, key)
	if err != nil {
		return nil, nil, err
	}
	s.mu.RLock()
	peers := s.peers
	s.mu.RUnlock()
	if peers != nil && len(peerStatic) > 0 {
		if err := peers.Verify(peerStatic); err != nil {
			return nil, nil, fmt.Errorf("%w: %w", errTOFURejected, err)
		}
	}
	return ns, peerStatic, nil
}

// controlHandshakeResponder は制御ストリーム用のハンドシェイクを実行する。
// 永続 identity を使い、TOFU 検証を行う。
// 返す []byte はピアの静的公開鍵（チャンクストリームの検証に使う）。
// ctx はハンドシェイクのタイムアウト制御に使う (#479)。
func (s *Session) controlHandshakeResponder(ctx context.Context, stream io.ReadWriter) (*crypto.NoiseStream, []byte, error) {
	key, err := s.localKey()
	if err != nil {
		return nil, nil, err
	}
	ns, peerStatic, err := crypto.HandshakeResponderFullCtx(ctx, stream, key)
	if err != nil {
		return nil, nil, err
	}
	s.mu.RLock()
	peers := s.peers
	s.mu.RUnlock()
	if peers != nil && len(peerStatic) > 0 {
		if err := peers.Verify(peerStatic); err != nil {
			return nil, nil, fmt.Errorf("%w: %w", errTOFURejected, err)
		}
	}
	return ns, peerStatic, nil
}

// chunkHandshakeInitiator はデータチャンクストリーム用ハンドシェイクを実行する。
// Session の identity を使い、ピア静的鍵が expectedPeer と一致するか検証する。
// expectedPeer が空のとき（init 失敗など）は検証をスキップする。
// ctx はハンドシェイクのタイムアウト制御に使う (#479)。
func (s *Session) chunkHandshakeInitiator(ctx context.Context, stream io.ReadWriter, expectedPeer []byte) (*crypto.NoiseStream, error) {
	key, err := s.localKey()
	if err != nil {
		return nil, err
	}
	ns, peerKey, err := crypto.HandshakeInitiatorFullCtx(ctx, stream, key)
	if err != nil {
		return nil, err
	}
	if len(expectedPeer) > 0 && !bytes.Equal(peerKey, expectedPeer) {
		return nil, fmt.Errorf("chunk stream: peer key mismatch")
	}
	return ns, nil
}

// chunkHandshakeResponder はデータチャンクストリーム用ハンドシェイクを実行する。
// Session の identity を使い、ピア静的鍵が expectedPeer と一致するか検証する。
// expectedPeer が空のとき（init 失敗など）は検証をスキップする。
// ctx はハンドシェイクのタイムアウト制御に使う (#479)。
func (s *Session) chunkHandshakeResponder(ctx context.Context, stream io.ReadWriter, expectedPeer []byte) (*crypto.NoiseStream, error) {
	key, err := s.localKey()
	if err != nil {
		return nil, err
	}
	ns, peerKey, err := crypto.HandshakeResponderFullCtx(ctx, stream, key)
	if err != nil {
		return nil, err
	}
	if len(expectedPeer) > 0 && !bytes.Equal(peerKey, expectedPeer) {
		return nil, fmt.Errorf("chunk stream: peer key mismatch")
	}
	return ns, nil
}

// --- package-level wrappers delegating to defaultSession ---
// Callers in dir.go / pipe.go / quic.go are unchanged.

func localKey() (noise.DHKey, error) { return defaultSession.localKey() }

func controlHandshakeInitiator(ctx context.Context, stream io.ReadWriter) (*crypto.NoiseStream, []byte, error) {
	return defaultSession.controlHandshakeInitiator(ctx, stream)
}

func controlHandshakeResponder(ctx context.Context, stream io.ReadWriter) (*crypto.NoiseStream, []byte, error) {
	return defaultSession.controlHandshakeResponder(ctx, stream)
}

func chunkHandshakeInitiator(ctx context.Context, stream io.ReadWriter, expectedPeer []byte) (*crypto.NoiseStream, error) {
	return defaultSession.chunkHandshakeInitiator(ctx, stream, expectedPeer)
}

func chunkHandshakeResponder(ctx context.Context, stream io.ReadWriter, expectedPeer []byte) (*crypto.NoiseStream, error) {
	return defaultSession.chunkHandshakeResponder(ctx, stream, expectedPeer)
}
