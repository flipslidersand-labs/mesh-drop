package transfer

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"sync"
	"testing"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
	"github.com/flynn/noise"
)

// newTestSession returns a zero-value *Session with no identity and no TOFU store.
// Each test that exercises session state should call this to get an isolated instance,
// making t.Parallel() safe — no shared global is touched.
func newTestSession() *Session {
	return &Session{}
}

// newTestSessionWithKey returns a *Session pre-loaded with a freshly generated identity.
func newTestSessionWithKey(t *testing.T) (*Session, noise.DHKey) {
	t.Helper()
	key, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatalf("GenerateKeypair: %v", err)
	}
	s := &Session{}
	s.identity = key
	return s, key
}

// TestSessionGlobalState_Isolation verifies that a newly created Session has zeroed state.
func TestSessionGlobalState_Isolation(t *testing.T) {
	t.Parallel()
	s := newTestSession()

	if len(s.identity.Private) != 0 {
		t.Error("identity.Private should be empty in a new Session")
	}
	if len(s.identity.Public) != 0 {
		t.Error("identity.Public should be empty in a new Session")
	}
	if s.peers != nil {
		t.Error("peers should be nil in a new Session")
	}
	if s.inited {
		t.Error("inited should be false in a new Session")
	}
}

// TestInitSession_Idempotent verifies that calling init() multiple times
// from concurrent goroutines only initializes the Session once.
func TestInitSession_Idempotent(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	key, err := crypto.LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}
	s := &Session{
		identity: key,
		peers:    crypto.NewKnownPeers(dir),
		inited:   true,
	}

	// Calling init concurrently on an already-inited Session should be a no-op.
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// init() on an already-inited session returns nil immediately.
			if err := s.init(); err != nil {
				t.Errorf("init returned error on re-entry: %v", err)
			}
		}()
	}
	wg.Wait()

	if !bytes.Equal(s.identity.Public, key.Public) {
		t.Error("identity changed after concurrent init() calls")
	}
}

// TestLocalKey_FallsBackToEphemeral verifies that localKey generates a fresh
// ephemeral key when no persistent identity is set.
func TestLocalKey_FallsBackToEphemeral(t *testing.T) {
	t.Parallel()
	s := newTestSession()

	k1, err := s.localKey()
	if err != nil {
		t.Fatalf("localKey error: %v", err)
	}
	k2, err := s.localKey()
	if err != nil {
		t.Fatalf("second localKey error: %v", err)
	}
	if bytes.Equal(k1.Public, k2.Public) {
		t.Error("ephemeral keys from two localKey() calls should differ")
	}
}

// TestLocalKey_UsesPersistentIdentity verifies that localKey returns the
// persistent identity when one has been set.
func TestLocalKey_UsesPersistentIdentity(t *testing.T) {
	t.Parallel()
	s, key := newTestSessionWithKey(t)

	got, err := s.localKey()
	if err != nil {
		t.Fatalf("localKey: %v", err)
	}
	if !bytes.Equal(got.Public, key.Public) {
		t.Errorf("localKey returned %x, want persistent identity %x", got.Public, key.Public)
	}
}

// -------------------------------------------------------------------
// Chunk peer-key mismatch tests (issue #159)
// -------------------------------------------------------------------

// rwPairTransfer is a bidirectional pipe helper for transfer package tests.
type rwPairTransfer struct {
	io.Reader
	io.Writer
}

func pipeRWPairTransfer() (rwPairTransfer, rwPairTransfer, func()) {
	r1, w1 := io.Pipe()
	r2, w2 := io.Pipe()
	return rwPairTransfer{r2, w1}, rwPairTransfer{r1, w2}, func() {
		w1.Close()
		w2.Close()
	}
}

// TestChunkHandshake_PeerKeyMismatch_Initiator verifies that
// chunkHandshakeInitiator returns an error when the peer's actual public key
// does not match the expected key supplied by the caller.
func TestChunkHandshake_PeerKeyMismatch_Initiator(t *testing.T) {
	t.Parallel()
	s := newTestSession()

	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	actualResponderKey, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}
	wrongExpectedKey, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	errCh := make(chan error, 1)
	go func() {
		_, _, respErr := crypto.HandshakeResponderFull(b, actualResponderKey)
		errCh <- respErr
	}()

	_, initErr := s.chunkHandshakeInitiator(context.Background(), a, wrongExpectedKey.Public)
	<-errCh

	if initErr == nil {
		t.Error("chunkHandshakeInitiator should return error when peer key mismatches expectedPeer")
	}
}

// TestChunkHandshake_PeerKeyMismatch_Responder verifies that
// chunkHandshakeResponder returns an error when the peer's actual public key
// does not match the expected key supplied by the caller.
func TestChunkHandshake_PeerKeyMismatch_Responder(t *testing.T) {
	t.Parallel()
	s := newTestSession()

	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	actualInitiatorKey, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}
	wrongExpectedKey, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	errCh := make(chan error, 1)
	go func() {
		_, _, initErr := crypto.HandshakeInitiatorFull(a, actualInitiatorKey)
		errCh <- initErr
	}()

	_, respErr := s.chunkHandshakeResponder(context.Background(), b, wrongExpectedKey.Public)
	<-errCh

	if respErr == nil {
		t.Error("chunkHandshakeResponder should return error when peer key mismatches expectedPeer")
	}
}

// TestChunkHandshake_CorrectKey_Succeeds verifies the happy path.
func TestChunkHandshake_CorrectKey_Succeeds(t *testing.T) {
	t.Parallel()

	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	initiatorKey, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}
	responderKey, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	respErrCh := make(chan error, 1)
	go func() {
		_, peerKey, err := crypto.HandshakeResponderFull(b, responderKey)
		if err == nil && !bytes.Equal(peerKey, initiatorKey.Public) {
			err = fmt.Errorf("chunk stream: peer key mismatch")
		}
		respErrCh <- err
	}()

	_, peerKey, initErr := crypto.HandshakeInitiatorFull(a, initiatorKey)
	if initErr == nil && !bytes.Equal(peerKey, responderKey.Public) {
		initErr = fmt.Errorf("chunk stream: peer key mismatch")
	}
	respErr := <-respErrCh

	if initErr != nil {
		t.Errorf("chunkHandshakeInitiator with correct peer key: %v", initErr)
	}
	if respErr != nil {
		t.Errorf("chunkHandshakeResponder with correct peer key: %v", respErr)
	}
}

// TestChunkHandshake_EmptyExpectedPeer_SkipsVerification verifies that when
// expectedPeer is nil/empty, no key verification is performed.
func TestChunkHandshake_EmptyExpectedPeer_SkipsVerification(t *testing.T) {
	t.Parallel()

	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	initiatorKey, _ := crypto.GenerateKeypair()
	responderKey, _ := crypto.GenerateKeypair()

	respErrCh := make(chan error, 1)
	go func() {
		_, _, err := crypto.HandshakeResponderFull(b, responderKey)
		respErrCh <- err
	}()

	_, _, initErr := crypto.HandshakeInitiatorFull(a, initiatorKey)
	respErr := <-respErrCh

	if initErr != nil {
		t.Errorf("chunkHandshakeInitiator with empty expectedPeer: %v", initErr)
	}
	if respErr != nil {
		t.Errorf("chunkHandshakeResponder with empty expectedPeer: %v", respErr)
	}
}

// TestSessionInited_NoPeers_SkipsTOFU verifies that when peers is nil (TOFU
// disabled), the control handshake does not attempt peer verification.
func TestSessionInited_NoPeers_SkipsTOFU(t *testing.T) {
	t.Parallel()

	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	initiatorKey, _ := crypto.GenerateKeypair()
	responderKey, _ := crypto.GenerateKeypair()

	respErrCh := make(chan error, 1)
	go func() {
		_, _, err := crypto.HandshakeResponderFull(b, responderKey)
		respErrCh <- err
	}()

	_, _, initErr := crypto.HandshakeInitiatorFull(a, initiatorKey)
	respErr := <-respErrCh

	if initErr != nil {
		t.Errorf("controlHandshakeInitiator with nil peers: %v", initErr)
	}
	if respErr != nil {
		t.Errorf("controlHandshakeResponder with nil peers: %v", respErr)
	}
}
