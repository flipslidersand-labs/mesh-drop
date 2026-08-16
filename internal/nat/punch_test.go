package nat

import (
	"context"
	"net"
	"testing"
	"time"
)

// openUDPPair creates two unconnected UDP sockets on localhost and returns them.
// The caller is responsible for closing both.
func openUDPPair(t *testing.T) (*net.UDPConn, *net.UDPAddr, *net.UDPConn, *net.UDPAddr) {
	t.Helper()

	connA, err := net.ListenUDP("udp4", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1), Port: 0})
	if err != nil {
		t.Fatalf("ListenUDP A: %v", err)
	}
	connB, err := net.ListenUDP("udp4", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1), Port: 0})
	if err != nil {
		connA.Close()
		t.Fatalf("ListenUDP B: %v", err)
	}

	addrA := connA.LocalAddr().(*net.UDPAddr)
	addrB := connB.LocalAddr().(*net.UDPAddr)
	return connA, addrA, connB, addrB
}

// TestHolePunch_ContextCancel verifies that HolePunch exits immediately when
// the context is cancelled, even if maxPackets have not been sent yet.
func TestHolePunch_ContextCancel(t *testing.T) {
	connA, _, _, addrB := openUDPPair(t)
	defer connA.Close()

	ctx, cancel := context.WithCancel(context.Background())

	done := make(chan struct{})
	go func() {
		defer close(done)
		// Use a large count so the loop would block a long time without cancel.
		HolePunch(ctx, connA, addrB, 10000, 50*time.Millisecond)
	}()

	// Cancel after a short time — HolePunch must exit well before count is reached.
	cancel()

	select {
	case <-done:
		// Expected: HolePunch returned after cancel.
	case <-time.After(2 * time.Second):
		t.Error("HolePunch did not stop after context cancel within 2s")
	}
}

// TestHolePunch_MaxPackets verifies that HolePunch sends exactly count packets
// and then returns when the context is not cancelled.
func TestHolePunch_MaxPackets(t *testing.T) {
	connA, _, connB, addrB := openUDPPair(t)
	defer connA.Close()
	defer connB.Close()

	const maxPackets = 5
	ctx := context.Background()

	received := make(chan int, maxPackets+5)

	// Count incoming packets on connB.
	go func() {
		buf := make([]byte, 16)
		for {
			connB.SetReadDeadline(time.Now().Add(500 * time.Millisecond))
			n, _, err := connB.ReadFromUDP(buf)
			if err != nil {
				return
			}
			if n > 0 {
				received <- 1
			}
		}
	}()

	start := time.Now()
	HolePunch(ctx, connA, addrB, maxPackets, 5*time.Millisecond)
	elapsed := time.Since(start)

	// HolePunch should complete in roughly maxPackets * interval.
	// Allow generous headroom (5x) for slow CI environments.
	maxExpected := time.Duration(maxPackets)*5*time.Millisecond*5 + 200*time.Millisecond
	if elapsed > maxExpected {
		t.Errorf("HolePunch took %v, want <= %v", elapsed, maxExpected)
	}

	// Drain the channel and count packets. We may receive fewer than maxPackets
	// if the OS drops some (loopback is generally reliable, but allow for it).
	time.Sleep(50 * time.Millisecond) // let in-flight packets arrive
	count := 0
	for {
		select {
		case <-received:
			count++
		default:
			goto done
		}
	}
done:
	// Loopback is reliable; we expect all maxPackets to arrive.
	if count < maxPackets {
		t.Errorf("received %d packets, want %d", count, maxPackets)
	}
}

// TestHolePunch_ZeroCount verifies that HolePunch with count=0 returns immediately.
func TestHolePunch_ZeroCount(t *testing.T) {
	connA, _, _, addrB := openUDPPair(t)
	defer connA.Close()

	ctx := context.Background()
	done := make(chan struct{})
	go func() {
		defer close(done)
		HolePunch(ctx, connA, addrB, 0, time.Second)
	}()

	select {
	case <-done:
		// Expected immediately.
	case <-time.After(500 * time.Millisecond):
		t.Error("HolePunch(count=0) did not return immediately")
	}
}

// TestHolePunch_AlreadyCancelledContext verifies that if the context is already
// cancelled before HolePunch is called, it returns without sending any packets.
func TestHolePunch_AlreadyCancelledContext(t *testing.T) {
	connA, _, connB, addrB := openUDPPair(t)
	defer connA.Close()
	defer connB.Close()

	ctx, cancel := context.WithCancel(context.Background())
	cancel() // cancel before calling HolePunch

	received := make(chan struct{}, 10)
	go func() {
		buf := make([]byte, 16)
		for {
			connB.SetReadDeadline(time.Now().Add(100 * time.Millisecond))
			n, _, err := connB.ReadFromUDP(buf)
			if err != nil {
				return
			}
			if n > 0 {
				received <- struct{}{}
			}
		}
	}()

	HolePunch(ctx, connA, addrB, 100, time.Millisecond)

	time.Sleep(50 * time.Millisecond)
	if len(received) > 0 {
		t.Errorf("HolePunch sent %d packet(s) with already-cancelled context, want 0", len(received))
	}
}
