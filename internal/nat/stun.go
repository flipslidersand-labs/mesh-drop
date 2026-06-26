package nat

import (
	"bytes"
	"crypto/rand"
	"encoding/binary"
	"fmt"
	"net"
	"time"
)

const (
	stunMagicCookie = uint32(0x2112A442)
	stunBindingResp = uint16(0x0101)
	attrXorMapped   = uint16(0x0020)
	DefaultSTUN     = "stun.l.google.com:19302"
)

// DiscoverWithConn queries stunServer from an existing (unconnected) UDP socket and
// returns the NAT-mapped "ip:port" for that socket.
// Call this BEFORE handing the socket to QUIC; QUIC intercepts all incoming packets.
func DiscoverWithConn(conn *net.UDPConn, stunServer string) (string, error) {
	raddr, err := net.ResolveUDPAddr("udp4", stunServer)
	if err != nil {
		return "", fmt.Errorf("resolve STUN addr: %w", err)
	}

	var txID [12]byte
	if _, err := rand.Read(txID[:]); err != nil {
		return "", err
	}
	req := buildReq(txID)

	_ = conn.SetDeadline(time.Now().Add(5 * time.Second))
	defer conn.SetDeadline(time.Time{}) //nolint:errcheck

	if _, err := conn.WriteToUDP(req, raddr); err != nil {
		return "", fmt.Errorf("STUN write: %w", err)
	}

	buf := make([]byte, 1500)
	for {
		n, _, err := conn.ReadFromUDP(buf)
		if err != nil {
			return "", fmt.Errorf("STUN read: %w", err)
		}
		resp := buf[:n]
		if len(resp) < 20 {
			continue
		}
		if binary.BigEndian.Uint16(resp[0:2]) != stunBindingResp {
			continue
		}
		if !bytes.Equal(resp[8:20], txID[:]) {
			continue
		}
		return parseXorAddr(resp[20:])
	}
}

// DiscoverExternalIP opens a temporary UDP socket, queries stunServer, and returns
// the public IPv4. Useful when you only need the IP (e.g. the info command).
func DiscoverExternalIP(stunServer string) (net.IP, error) {
	raddr, err := net.ResolveUDPAddr("udp4", stunServer)
	if err != nil {
		return nil, fmt.Errorf("resolve STUN addr: %w", err)
	}
	conn, err := net.DialUDP("udp4", nil, raddr)
	if err != nil {
		return nil, fmt.Errorf("STUN dial: %w", err)
	}
	defer conn.Close()
	conn.SetDeadline(time.Now().Add(5 * time.Second)) //nolint:errcheck

	var txID [12]byte
	rand.Read(txID[:]) //nolint:errcheck
	if _, err := conn.Write(buildReq(txID)); err != nil {
		return nil, fmt.Errorf("STUN write: %w", err)
	}

	buf := make([]byte, 1500)
	n, err := conn.Read(buf)
	if err != nil {
		return nil, fmt.Errorf("STUN read: %w", err)
	}
	resp := buf[:n]
	if len(resp) < 20 {
		return nil, fmt.Errorf("STUN: response too short")
	}
	addr, err := parseXorAddr(resp[20:])
	if err != nil {
		return nil, err
	}
	host, _, err := net.SplitHostPort(addr)
	if err != nil {
		return nil, err
	}
	return net.ParseIP(host), nil
}

func buildReq(txID [12]byte) []byte {
	req := make([]byte, 20)
	binary.BigEndian.PutUint16(req[0:2], 0x0001) // Binding Request
	binary.BigEndian.PutUint16(req[2:4], 0)       // no attributes
	binary.BigEndian.PutUint32(req[4:8], stunMagicCookie)
	copy(req[8:], txID[:])
	return req
}

// parseXorAddr parses STUN attributes and returns "ip:port" from XOR-MAPPED-ADDRESS.
func parseXorAddr(attrs []byte) (string, error) {
	for len(attrs) >= 4 {
		t := binary.BigEndian.Uint16(attrs[0:2])
		l := int(binary.BigEndian.Uint16(attrs[2:4]))
		if 4+l > len(attrs) {
			break
		}
		val := attrs[4 : 4+l]
		// advance past value + padding to 4-byte boundary
		padded := l + (4-l%4)%4
		if 4+padded <= len(attrs) {
			attrs = attrs[4+padded:]
		} else {
			attrs = attrs[4+l:]
		}

		if t != attrXorMapped || l < 8 || val[1] != 0x01 { // 0x01 = IPv4
			continue
		}
		xport := binary.BigEndian.Uint16(val[2:4]) ^ uint16(stunMagicCookie>>16)
		xip := make([]byte, 4)
		magic := [4]byte{0x21, 0x12, 0xA4, 0x42}
		for i := 0; i < 4; i++ {
			xip[i] = val[4+i] ^ magic[i]
		}
		return fmt.Sprintf("%s:%d", net.IP(xip).String(), xport), nil
	}
	return "", fmt.Errorf("STUN: XOR-MAPPED-ADDRESS not found")
}
