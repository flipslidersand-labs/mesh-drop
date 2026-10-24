package nat

import (
	"encoding/binary"
	"net"
	"strings"
	"testing"
	"time"
)

// stunResponse は txID を持つ STUN メッセージを組み立てる。typ と attrs で不正応答も作れる。
func stunResponse(typ uint16, txID []byte, attrs []byte) []byte {
	msg := make([]byte, 20, 20+len(attrs))
	binary.BigEndian.PutUint16(msg[0:2], typ)
	binary.BigEndian.PutUint16(msg[2:4], uint16(len(attrs)))
	binary.BigEndian.PutUint32(msg[4:8], stunMagicCookie)
	copy(msg[8:20], txID)
	return append(msg, attrs...)
}

// startFakeSTUN は 127.0.0.1 で UDP を待ち受け、リクエストを受けるたびに
// replies(txID) が返す各データグラムを順に送り返すフェイク STUN サーバーを起動する。
func startFakeSTUN(t *testing.T, replies func(txID []byte) [][]byte) string {
	t.Helper()
	pc, err := net.ListenUDP("udp4", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = pc.Close() })
	go func() {
		buf := make([]byte, 1500)
		for {
			n, from, err := pc.ReadFromUDP(buf)
			if err != nil {
				return
			}
			if n < 20 {
				continue
			}
			txID := append([]byte(nil), buf[8:20]...)
			for _, r := range replies(txID) {
				_, _ = pc.WriteToUDP(r, from)
			}
		}
	}()
	return pc.LocalAddr().String()
}

func newClientConn(t *testing.T) *net.UDPConn {
	t.Helper()
	c, err := net.ListenUDP("udp4", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = c.Close() })
	return c
}

func TestBuildReq(t *testing.T) {
	txID := [12]byte{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}
	req := buildReq(txID)
	if len(req) != 20 {
		t.Fatalf("len = %d, want 20", len(req))
	}
	if got := binary.BigEndian.Uint16(req[0:2]); got != 0x0001 {
		t.Errorf("type = %#x, want Binding Request 0x0001", got)
	}
	if got := binary.BigEndian.Uint16(req[2:4]); got != 0 {
		t.Errorf("length = %d, want 0", got)
	}
	if got := binary.BigEndian.Uint32(req[4:8]); got != stunMagicCookie {
		t.Errorf("cookie = %#x, want %#x", got, stunMagicCookie)
	}
	if string(req[8:20]) != string(txID[:]) {
		t.Errorf("txID = %x, want %x", req[8:20], txID)
	}
}

// DiscoverWithConn は不正な応答（短すぎる/type 不一致/txID 不一致）を読み飛ばし、
// その後ろの正しい応答を採用する (#618)。
func TestDiscoverWithConn_SkipsInvalidResponses(t *testing.T) {
	good := buildXorMappedAttr([4]byte{203, 0, 113, 7}, 4242)
	cases := []struct {
		name string
		bad  func(txID []byte) []byte
	}{
		{"too short", func([]byte) []byte { return []byte{0x01, 0x01, 0x00} }},
		{"wrong type", func(tx []byte) []byte { return stunResponse(0x0111, tx, good) }},
		{"other session txID", func([]byte) []byte { return stunResponse(stunBindingResp, make([]byte, 12), good) }},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			srv := startFakeSTUN(t, func(tx []byte) [][]byte {
				return [][]byte{tc.bad(tx), stunResponse(stunBindingResp, tx, good)}
			})
			got, err := DiscoverWithConn(newClientConn(t), srv)
			if err != nil {
				t.Fatalf("DiscoverWithConn: %v", err)
			}
			if got != "203.0.113.7:4242" {
				t.Errorf("addr = %q, want 203.0.113.7:4242", got)
			}
		})
	}
}

// 有効な応答が 10 回の読み取り内に得られなければエラーになる。
func TestDiscoverWithConn_AllInvalid(t *testing.T) {
	srv := startFakeSTUN(t, func(tx []byte) [][]byte {
		out := make([][]byte, 10)
		for i := range out {
			out[i] = stunResponse(0x0111, tx, nil) // type 不一致
		}
		return out
	})
	_, err := DiscoverWithConn(newClientConn(t), srv)
	if err == nil || !strings.Contains(err.Error(), "no valid response after 10 attempts") {
		t.Fatalf("error = %v, want 'no valid response after 10 attempts'", err)
	}
}

func TestDiscoverWithConn_ResolveError(t *testing.T) {
	if _, err := DiscoverWithConn(newClientConn(t), "not a host:port"); err == nil || !strings.Contains(err.Error(), "resolve STUN addr") {
		t.Fatalf("error = %v, want resolve error", err)
	}
}

func TestDiscoverExternalIP_Valid(t *testing.T) {
	good := buildXorMappedAttr([4]byte{198, 51, 100, 9}, 1111)
	srv := startFakeSTUN(t, func(tx []byte) [][]byte { return [][]byte{stunResponse(stunBindingResp, tx, good)} })
	ip, err := discoverExternalIP(srv)
	if err != nil {
		t.Fatal(err)
	}
	if !ip.Equal(net.IPv4(198, 51, 100, 9)) {
		t.Errorf("ip = %v, want 198.51.100.9", ip)
	}
}

func TestDiscoverExternalIP_ShortResponse(t *testing.T) {
	srv := startFakeSTUN(t, func([]byte) [][]byte { return [][]byte{{0x01, 0x01}} })
	start := time.Now()
	_, err := discoverExternalIP(srv)
	if err == nil || !strings.Contains(err.Error(), "response too short") {
		t.Fatalf("error = %v, want 'response too short' (took %v)", err, time.Since(start))
	}
}
