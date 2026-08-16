package discovery

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/grandcat/zeroconf"
)

const (
	ServiceType = "_meshdrop._tcp"
	Domain      = "local."
	DefaultPort = 44444

	// txtKeyFingerprint is the mDNS TXT record key used to advertise the
	// SHA-256 fingerprint of the receiver's TLS certificate.
	// #160: Advertising the fingerprint via mDNS lets the sender automatically
	// pin the cert when no --fingerprint flag is given, without requiring
	// out-of-band key exchange. The fingerprint is not secret; it only needs
	// to be authentic (which mDNS provides on a local network).
	txtKeyFingerprint = "fp"
)

// Peer は LAN 上で発見された MeshDrop ノードを表す。
type Peer struct {
	Name        string
	Host        string
	Port        int
	IP          string
	Fingerprint []byte // SHA-256 of the receiver's TLS cert DER; nil if not advertised
}

func (p Peer) Addr() string {
	if p.IP != "" {
		return fmt.Sprintf("%s:%d", p.IP, p.Port)
	}
	return fmt.Sprintf("%s:%d", p.Host, p.Port)
}

// Advertise は mDNS で自分自身を _meshdrop._tcp として公開する。
// fingerprint が非 nil のとき TLS 証明書フィンガープリントを TXT レコードで広告する。
// ctx がキャンセルされると登録を解除して返る。
// #160: Publishing the fingerprint lets the sender pin the TLS cert automatically.
func Advertise(ctx context.Context, port int, fingerprint []byte) error {
	hostname, _ := os.Hostname()
	instance := fmt.Sprintf("meshdrop-%s", hostname)

	var txt []string
	if len(fingerprint) > 0 {
		txt = []string{fmt.Sprintf("%s=%x", txtKeyFingerprint, fingerprint)}
	}

	server, err := zeroconf.Register(instance, ServiceType, Domain, port, txt, nil)
	if err != nil {
		// #212: ctx がキャンセル済みの場合は mDNS 失敗が想定内なので hint を出さない。
		if ctx.Err() == nil {
			fmt.Fprintf(os.Stderr, "mDNS advertise failed: %v\n", err)
			fmt.Fprintf(os.Stderr, "Tip: if mDNS is unavailable on this network, use --relay <url> for NAT traversal instead.\n")
		}
		return fmt.Errorf("mDNS register: %w", err)
	}
	defer server.Shutdown()

	fmt.Printf("Advertising as %q on port %d (Ctrl+C to stop)\n", instance, port)
	<-ctx.Done()
	return nil
}

// Browse は LAN 上の MeshDrop ピアを timeout 内で発見して返す。
// 発見したピアに TLS フィンガープリント TXT レコードがあれば Peer.Fingerprint に格納する。
func Browse(ctx context.Context, timeout time.Duration) ([]Peer, error) {
	resolver, err := zeroconf.NewResolver(nil)
	if err != nil {
		return nil, fmt.Errorf("mDNS resolver: %w", err)
	}

	entries := make(chan *zeroconf.ServiceEntry)
	var peers []Peer

	browseCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	done := make(chan struct{})
	go func() {
		defer close(done)
		for entry := range entries {
			ip := ""
			if len(entry.AddrIPv4) > 0 {
				ip = entry.AddrIPv4[0].String()
			}
			// #160: Extract TLS fingerprint from TXT records if present.
			var fingerprint []byte
			for _, txt := range entry.Text {
				if after, ok := strings.CutPrefix(txt, txtKeyFingerprint+"="); ok {
					fp, err := hexDecodeFingerprint(after)
					if err == nil && len(fp) == 32 {
						fingerprint = fp
					}
					break
				}
			}
			peers = append(peers, Peer{
				Name:        entry.Instance,
				Host:        entry.HostName,
				Port:        entry.Port,
				IP:          ip,
				Fingerprint: fingerprint,
			})
		}
	}()

	if err := resolver.Browse(browseCtx, ServiceType, Domain, entries); err != nil {
		return nil, fmt.Errorf("mDNS browse: %w", err)
	}

	<-browseCtx.Done()
	<-done
	return peers, nil
}

// hexDecodeFingerprint decodes a hex string into bytes.
// Returns an error if the string is not valid hex.
func hexDecodeFingerprint(s string) ([]byte, error) {
	if len(s)%2 != 0 {
		return nil, fmt.Errorf("odd hex length")
	}
	out := make([]byte, len(s)/2)
	for i := 0; i < len(s); i += 2 {
		hi, ok1 := hexNibble(s[i])
		lo, ok2 := hexNibble(s[i+1])
		if !ok1 || !ok2 {
			return nil, fmt.Errorf("invalid hex char at position %d", i)
		}
		out[i/2] = (hi << 4) | lo
	}
	return out, nil
}

func hexNibble(c byte) (byte, bool) {
	switch {
	case c >= '0' && c <= '9':
		return c - '0', true
	case c >= 'a' && c <= 'f':
		return c - 'a' + 10, true
	case c >= 'A' && c <= 'F':
		return c - 'A' + 10, true
	default:
		return 0, false
	}
}
