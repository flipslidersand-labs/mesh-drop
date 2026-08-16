package nat

import (
	"encoding/binary"
	"strings"
	"testing"
)

// buildXorMappedAttr builds a raw STUN attribute section containing a single
// XOR-MAPPED-ADDRESS attribute for the given IPv4 address and port.
// The XOR-MAPPED-ADDRESS attribute has:
//
//	type   = 0x0020 (2 bytes)
//	length = 0x0008 (2 bytes, value is 8 bytes)
//	value:
//	  byte 0: 0x00 (reserved)
//	  byte 1: 0x01 (IPv4 family)
//	  bytes 2-3: port XOR (magic >> 16)
//	  bytes 4-7: IP XOR magic
func buildXorMappedAttr(ip [4]byte, port uint16) []byte {
	const magic = uint32(stunMagicCookie) // 0x2112A442

	xport := port ^ uint16(magic>>16)
	xip := [4]byte{
		ip[0] ^ 0x21,
		ip[1] ^ 0x12,
		ip[2] ^ 0xA4,
		ip[3] ^ 0x42,
	}

	attr := make([]byte, 12) // 4-byte header + 8-byte value
	binary.BigEndian.PutUint16(attr[0:2], attrXorMapped)
	binary.BigEndian.PutUint16(attr[2:4], 8) // value length
	attr[4] = 0x00                            // reserved
	attr[5] = 0x01                            // IPv4 family
	binary.BigEndian.PutUint16(attr[6:8], xport)
	copy(attr[8:12], xip[:])
	return attr
}

// TestParseXorAddr_ValidIPv4 verifies that parseXorAddr correctly decodes a
// well-formed XOR-MAPPED-ADDRESS attribute and returns "ip:port".
func TestParseXorAddr_ValidIPv4(t *testing.T) {
	ip := [4]byte{1, 2, 3, 4}
	port := uint16(12345)

	attrs := buildXorMappedAttr(ip, port)
	got, err := parseXorAddr(attrs)
	if err != nil {
		t.Fatalf("parseXorAddr: unexpected error: %v", err)
	}
	want := "1.2.3.4:12345"
	if got != want {
		t.Errorf("parseXorAddr = %q, want %q", got, want)
	}
}

// TestParseXorAddr_ValidIPv4_Port80 verifies a known low port number.
func TestParseXorAddr_ValidIPv4_Port80(t *testing.T) {
	ip := [4]byte{192, 168, 1, 100}
	port := uint16(80)

	attrs := buildXorMappedAttr(ip, port)
	got, err := parseXorAddr(attrs)
	if err != nil {
		t.Fatalf("parseXorAddr: unexpected error: %v", err)
	}
	want := "192.168.1.100:80"
	if got != want {
		t.Errorf("parseXorAddr = %q, want %q", got, want)
	}
}

// TestParseXorAddr_TruncatedMessage verifies that parseXorAddr returns an error
// when the attribute bytes are too short to contain a valid XOR-MAPPED-ADDRESS.
func TestParseXorAddr_TruncatedMessage(t *testing.T) {
	// Declare attribute type and length but provide fewer bytes than the
	// declared length (simulate a truncated STUN response).
	truncated := []byte{
		0x00, 0x20, // type: XOR-MAPPED-ADDRESS
		0x00, 0x08, // length: 8 bytes
		// Only 2 bytes of value (declared 8) — truncated.
		0x00, 0x01,
	}
	_, err := parseXorAddr(truncated)
	if err == nil {
		t.Fatal("parseXorAddr: expected error for truncated message, got nil")
	}
	if !strings.Contains(err.Error(), "not found") && !strings.Contains(err.Error(), "STUN") {
		t.Logf("parseXorAddr truncated error (acceptable): %v", err)
	}
}

// TestParseXorAddr_EmptyAttrs verifies that an empty attribute slice returns an error.
func TestParseXorAddr_EmptyAttrs(t *testing.T) {
	_, err := parseXorAddr([]byte{})
	if err == nil {
		t.Fatal("parseXorAddr: expected error for empty attrs, got nil")
	}
}

// TestParseXorAddr_WrongType verifies that parseXorAddr returns an error when
// the attribute type is not XOR-MAPPED-ADDRESS (0x0020).
func TestParseXorAddr_WrongType(t *testing.T) {
	// Use attribute type 0x0001 (MAPPED-ADDRESS) instead of 0x0020.
	attrs := []byte{
		0x00, 0x01, // type: MAPPED-ADDRESS (wrong)
		0x00, 0x08, // length: 8 bytes
		0x00, 0x01, // family IPv4
		0x30, 0x39, // port 12345 (unxored)
		0x01, 0x02, 0x03, 0x04, // IP 1.2.3.4 (unxored)
	}
	_, err := parseXorAddr(attrs)
	if err == nil {
		t.Fatal("parseXorAddr: expected error for wrong attribute type, got nil")
	}
}

// TestParseXorAddr_SkipsUnknownAttributes verifies that parseXorAddr correctly
// skips an unknown attribute before a valid XOR-MAPPED-ADDRESS.
func TestParseXorAddr_SkipsUnknownAttributes(t *testing.T) {
	ip := [4]byte{10, 0, 0, 1}
	port := uint16(9000)

	// Prepend an unknown attribute (type 0x0003, length 4, 4 bytes value).
	unknown := []byte{
		0x00, 0x03, // unknown type
		0x00, 0x04, // length 4
		0xDE, 0xAD, 0xBE, 0xEF, // 4 bytes value
	}
	xor := buildXorMappedAttr(ip, port)
	attrs := append(unknown, xor...)

	got, err := parseXorAddr(attrs)
	if err != nil {
		t.Fatalf("parseXorAddr: unexpected error skipping unknown attr: %v", err)
	}
	want := "10.0.0.1:9000"
	if got != want {
		t.Errorf("parseXorAddr = %q, want %q", got, want)
	}
}
