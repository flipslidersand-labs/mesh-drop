package nat

import (
	"context"
	"net"
	"time"
)

// HolePunch sends small UDP datagrams to peerAddr to open a NAT mapping.
// Both peers must call this after exchanging addresses via relay.
// Blocks until count packets are sent or ctx is cancelled (e.g. Ctrl+C).
// Must complete before the caller passes conn to quic.Listen / quic.Dial
// to avoid concurrent writes on the same UDPConn.
func HolePunch(ctx context.Context, conn *net.UDPConn, peerAddr *net.UDPAddr, count int, interval time.Duration) {
	for i := 0; i < count; i++ {
		select {
		case <-ctx.Done():
			return
		default:
		}
		_, _ = conn.WriteToUDP([]byte{0x00}, peerAddr)
		select {
		case <-ctx.Done():
			return
		case <-time.After(interval):
		}
	}
}
