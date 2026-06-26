package nat

import (
	"net"
	"time"
)

// HolePunch sends small UDP datagrams to peerAddr to open a NAT mapping.
// Both peers must call this concurrently after exchanging addresses via relay.
// The goroutine exits after count packets; the caller typically starts it with `go`.
func HolePunch(conn *net.UDPConn, peerAddr *net.UDPAddr, count int, interval time.Duration) {
	for i := 0; i < count; i++ {
		_, _ = conn.WriteToUDP([]byte{0x00}, peerAddr)
		time.Sleep(interval)
	}
}
