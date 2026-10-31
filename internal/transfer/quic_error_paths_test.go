package transfer

import (
	"context"
	"net"
	"strings"
	"testing"
	"time"
)

// These tests exercise the dial-error branches of the package-level
// Send/SendNAT entry points and Listen's TLS bootstrap without needing a
// live peer on the other end — the context deadline fires before any
// handshake completes, so they are fast and deterministic (no real network
// dependency beyond loopback UDP). The happy-path round trip is intentionally
// left to the integration-tagged tests (see internal/transfer/integration_test.go);
// see TestListenContinuous_InvalidAddr / TestReceiveFileToPath_NonExistentSrc for
// the existing convention this follows.

func TestSend_DialError_ContextDeadline(t *testing.T) {
	t.Parallel()
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	// 127.0.0.1:1 has nothing listening; the QUIC handshake never completes
	// before the short context deadline expires.
	err := Send(ctx, "127.0.0.1:1", "/nonexistent", 4, nil, nil, false, 0, false)
	if err == nil || !strings.Contains(err.Error(), "dial") {
		t.Errorf("want dial error, got %v", err)
	}
}

func TestSendDir_DialError_ContextDeadline(t *testing.T) {
	t.Parallel()
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	err := SendDir(ctx, "127.0.0.1:1", "/nonexistent", 4, nil, nil, false, 0, false, nil)
	if err == nil || !strings.Contains(err.Error(), "dial") {
		t.Errorf("want dial error, got %v", err)
	}
}

func TestSendNAT_DialError_ContextDeadline(t *testing.T) {
	t.Parallel()
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = udpConn.Close() }()
	peerAddr := &net.UDPAddr{IP: net.ParseIP("127.0.0.1"), Port: 1}

	err = SendNAT(ctx, udpConn, peerAddr, "/nonexistent", 4, nil, nil, false, 0, false)
	if err == nil || !strings.Contains(err.Error(), "QUIC dial NAT") {
		t.Errorf("want QUIC dial NAT error, got %v", err)
	}
}

func TestSendDirNAT_DialError_ContextDeadline(t *testing.T) {
	t.Parallel()
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = udpConn.Close() }()
	peerAddr := &net.UDPAddr{IP: net.ParseIP("127.0.0.1"), Port: 1}

	err = SendDirNAT(ctx, udpConn, peerAddr, "/nonexistent", 4, nil, nil, false, 0, false, nil)
	if err == nil || !strings.Contains(err.Error(), "QUIC dial NAT") {
		t.Errorf("want QUIC dial NAT error, got %v", err)
	}
}

func TestListen_InvalidAddr(t *testing.T) {
	t.Parallel()
	err := Listen(context.Background(), "256.256.256.256:9")
	if err == nil {
		t.Fatal("expected error for invalid addr")
	}
}

func TestListenNAT_ContextCancelledImmediately(t *testing.T) {
	t.Parallel()
	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = udpConn.Close() }()

	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	// TLS bootstrap in ListenNAT succeeds even on a cancelled context; the
	// listener itself then returns promptly once the accept loop observes
	// ctx.Done(). This exercises ListenNAT's TLS-bundle setup path.
	err = ListenNAT(ctx, udpConn)
	if err == nil {
		t.Error("expected error/cancellation from ListenNAT on a pre-cancelled context")
	}
}
