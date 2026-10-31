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
//
// #146: The caller owns conn and is responsible for closing it (e.g. via
// defer udpConn.Close() before calling HolePunch). HolePunch does not close
// conn because it is reused for QUIC after punching completes.
func HolePunch(ctx context.Context, conn *net.UDPConn, peerAddr *net.UDPAddr, count int, interval time.Duration) {
	timer := time.NewTimer(interval)
	defer timer.Stop()
	for i := 0; i < count; i++ {
		select {
		case <-ctx.Done():
			return
		default:
		}
		_, _ = conn.WriteToUDP([]byte{0x00}, peerAddr)
		if !timer.Stop() {
			select {
			case <-timer.C:
			default:
			}
		}
		timer.Reset(interval)
		select {
		case <-ctx.Done():
			return
		case <-timer.C:
		}
	}
}
