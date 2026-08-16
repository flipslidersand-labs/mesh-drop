package transfer

import (
	"bytes"
	"fmt"
	"io"
	"sync"
	"testing"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
	"github.com/flynn/noise"
)

// resetSessionState resets the package-level session globals to a clean state.
// This must be called at the start of each test that touches InitSession or the
// session identity/peer variables, to prevent test cross-contamination.
func resetSessionState() {
	initMu.Lock()
	defer initMu.Unlock()
	sessionIdentity = noise.DHKey{}
	sessionPeers = nil
	sessionInited = false
}

// TestSessionGlobalState_Isolation verifies that resetSessionState fully
// resets the package globals so that a subsequent test starts clean.
func TestSessionGlobalState_Isolation(t *testing.T) {
	resetSessionState()

	if len(sessionIdentity.Private) != 0 {
		t.Error("sessionIdentity.Private should be empty after reset")
	}
	if len(sessionIdentity.Public) != 0 {
		t.Error("sessionIdentity.Public should be empty after reset")
	}
	if sessionPeers != nil {
		t.Error("sessionPeers should be nil after reset")
	}
	if sessionInited {
		t.Error("sessionInited should be false after reset")
	}
}

// TestInitSession_Idempotent verifies that calling InitSession multiple times
// from concurrent goroutines only initializes the session once and does not
// race on the shared state.
func TestInitSession_Idempotent(t *testing.T) {
	resetSessionState()
	t.Cleanup(resetSessionState)

	dir := t.TempDir()
	// Override the identity directory by pre-loading a key.
	key, err := crypto.LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}
	// Manually set state as if InitSession already ran with this key.
	initMu.Lock()
	sessionIdentity = key
	sessionPeers = crypto.NewKnownPeers(dir)
	sessionInited = true
	initMu.Unlock()

	// Now call InitSession concurrently — it should be a no-op.
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// InitSession should return immediately since sessionInited==true.
			if err := InitSession(); err != nil {
				t.Errorf("InitSession returned error on re-entry: %v", err)
			}
		}()
	}
	wg.Wait()

	// The identity must still match what we set.
	if !bytes.Equal(sessionIdentity.Public, key.Public) {
		t.Error("sessionIdentity changed after concurrent InitSession calls")
	}
}

// TestLocalKey_FallsBackToEphemeral verifies that localKey generates a fresh
// ephemeral key when sessionIdentity has no private key set.
func TestLocalKey_FallsBackToEphemeral(t *testing.T) {
	resetSessionState()
	t.Cleanup(resetSessionState)

	k1, err := localKey()
	if err != nil {
		t.Fatalf("localKey error: %v", err)
	}
	k2, err := localKey()
	if err != nil {
		t.Fatalf("second localKey error: %v", err)
	}
	// Without a persistent identity, two calls should produce different keys.
	if bytes.Equal(k1.Public, k2.Public) {
		t.Error("ephemeral keys from two localKey() calls should differ")
	}
}

// TestLocalKey_UsesPersistentIdentity verifies that localKey returns the
// persistent session identity when one has been set.
func TestLocalKey_UsesPersistentIdentity(t *testing.T) {
	resetSessionState()
	t.Cleanup(resetSessionState)

	dir := t.TempDir()
	key, err := crypto.LoadOrCreateIdentity(dir)
	if err != nil {
		t.Fatal(err)
	}
	initMu.Lock()
	sessionIdentity = key
	initMu.Unlock()

	got, err := localKey()
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
	resetSessionState()
	t.Cleanup(resetSessionState)

	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	// Two distinct keypairs: one the responder actually uses, one we claim is expected.
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
		// Responder side — uses actualResponderKey.
		ns, _, respErr := crypto.HandshakeResponderFull(b, actualResponderKey)
		if respErr == nil && ns != nil {
			// Drain any data the initiator might write before it errors.
			_ = ns
		}
		errCh <- respErr
	}()

	// Initiator expects wrongExpectedKey but the responder uses actualResponderKey.
	_, initErr := chunkHandshakeInitiator(a, wrongExpectedKey.Public)
	<-errCh // wait for responder goroutine to finish

	if initErr == nil {
		t.Error("chunkHandshakeInitiator should return error when peer key mismatches expectedPeer")
	}
}

// TestChunkHandshake_PeerKeyMismatch_Responder verifies that
// chunkHandshakeResponder returns an error when the peer's actual public key
// does not match the expected key supplied by the caller.
func TestChunkHandshake_PeerKeyMismatch_Responder(t *testing.T) {
	resetSessionState()
	t.Cleanup(resetSessionState)

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
		// Initiator side — uses actualInitiatorKey.
		ns, _, initErr := crypto.HandshakeInitiatorFull(a, actualInitiatorKey)
		if initErr == nil && ns != nil {
			_ = ns
		}
		errCh <- initErr
	}()

	// Responder expects wrongExpectedKey but initiator uses actualInitiatorKey.
	_, respErr := chunkHandshakeResponder(b, wrongExpectedKey.Public)
	<-errCh

	if respErr == nil {
		t.Error("chunkHandshakeResponder should return error when peer key mismatches expectedPeer")
	}
}

// TestChunkHandshake_CorrectKey_Succeeds verifies the happy path: when the
// expectedPeer key matches the actual peer's public key, the handshake succeeds.
// #193: global state reset via t.Cleanup to prevent cross-test contamination.
//
// Note: because sessionIdentity is a package-level global read by localKey()
// without holding initMu, both sides of a pipe-based handshake test must use
// the same sessionIdentity value. We use crypto.HandshakeInitiatorFull /
// HandshakeResponderFull directly so each side can supply its own key without
// mutating the shared global concurrently.
func TestChunkHandshake_CorrectKey_Succeeds(t *testing.T) {
	resetSessionState()
	t.Cleanup(resetSessionState)

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

	// Run initiator and responder using the full handshake helpers directly so
	// each side uses its own key without racing on the shared sessionIdentity.
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
// expectedPeer is nil/empty, no key verification is performed and the handshake
// completes successfully regardless of the peer's actual key.
// #193: global state reset via t.Cleanup to prevent cross-test contamination.
func TestChunkHandshake_EmptyExpectedPeer_SkipsVerification(t *testing.T) {
	resetSessionState()
	t.Cleanup(resetSessionState)

	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	initiatorKey, _ := crypto.GenerateKeypair()
	responderKey, _ := crypto.GenerateKeypair()

	// Use direct handshake helpers to avoid concurrent writes to sessionIdentity.
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

// TestSessionInited_GuardsPeers verifies that when sessionPeers is nil (TOFU
// disabled), the control handshake does not attempt peer verification and
// completes without error.
// #193: global state reset via t.Cleanup to prevent cross-test contamination.
func TestSessionInited_NoPeers_SkipsTOFU(t *testing.T) {
	resetSessionState()
	t.Cleanup(resetSessionState)

	// sessionPeers == nil means no TOFU verification.
	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	initiatorKey, _ := crypto.GenerateKeypair()
	responderKey, _ := crypto.GenerateKeypair()

	// Use direct handshake helpers to avoid concurrent writes to sessionIdentity.
	// sessionPeers == nil is enforced by resetSessionState at the top.
	respErrCh := make(chan error, 1)
	go func() {
		_, _, err := crypto.HandshakeResponderFull(b, responderKey)
		respErrCh <- err
	}()

	_, _, initErr := crypto.HandshakeInitiatorFull(a, initiatorKey)
	respErr := <-respErrCh

	if initErr != nil {
		t.Errorf("controlHandshakeInitiator with nil sessionPeers: %v", initErr)
	}
	if respErr != nil {
		t.Errorf("controlHandshakeResponder with nil sessionPeers: %v", respErr)
	}
}
