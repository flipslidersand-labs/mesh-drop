package transfer

import (
	"context"
	"testing"

	"github.com/flipslidersand/mesh-drop/internal/crypto"
)

// These cover the package-level defaultSession wrapper functions
// (localKey/controlHandshakeInitiator/controlHandshakeResponder/
// chunkHandshakeInitiator/chunkHandshakeResponder), which previously had no
// direct test coverage — only their Session-method counterparts were
// exercised (see session_isolation_test.go). defaultSession starts as a
// zero-value Session (no persistent identity, no TOFU peers) unless
// InitSession/integration tests mutate it, so these behave like the
// "isolated" Session tests: ephemeral keys, TOFU skipped. Not run with
// t.Parallel() since they touch the shared defaultSession global.

func TestLocalKey_PackageWrapper(t *testing.T) {
	k, err := localKey()
	if err != nil {
		t.Fatalf("localKey: %v", err)
	}
	if len(k.Public) == 0 {
		t.Error("want non-empty ephemeral public key")
	}
}

func TestControlHandshake_PackageWrapper_RoundTrip(t *testing.T) {
	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	respCh := make(chan error, 1)
	go func() {
		_, _, err := controlHandshakeResponder(context.Background(), b)
		respCh <- err
	}()

	_, _, initErr := controlHandshakeInitiator(context.Background(), a)
	respErr := <-respCh

	if initErr != nil {
		t.Errorf("controlHandshakeInitiator: %v", initErr)
	}
	if respErr != nil {
		t.Errorf("controlHandshakeResponder: %v", respErr)
	}
}

func TestChunkHandshake_PackageWrapper_RoundTrip(t *testing.T) {
	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	respCh := make(chan error, 1)
	go func() {
		_, err := chunkHandshakeResponder(context.Background(), b, nil)
		respCh <- err
	}()

	_, initErr := chunkHandshakeInitiator(context.Background(), a, nil)
	respErr := <-respCh

	if initErr != nil {
		t.Errorf("chunkHandshakeInitiator: %v", initErr)
	}
	if respErr != nil {
		t.Errorf("chunkHandshakeResponder: %v", respErr)
	}
}

func TestChunkHandshake_PackageWrapper_PeerKeyMismatch(t *testing.T) {
	a, b, cleanup := pipeRWPairTransfer()
	defer cleanup()

	wrongExpected, err := crypto.GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	respCh := make(chan error, 1)
	go func() {
		_, err := chunkHandshakeResponder(context.Background(), b, nil)
		respCh <- err
	}()

	_, initErr := chunkHandshakeInitiator(context.Background(), a, wrongExpected.Public)
	<-respCh

	if initErr == nil {
		t.Error("want peer key mismatch error")
	}
}
