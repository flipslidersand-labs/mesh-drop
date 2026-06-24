package discovery

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/grandcat/zeroconf"
)

const (
	ServiceType = "_meshdrop._tcp"
	Domain      = "local."
	DefaultPort = 44444
)

// Peer は LAN 上で発見された MeshDrop ノードを表す。
type Peer struct {
	Name string
	Host string
	Port int
	IP   string
}

func (p Peer) Addr() string {
	if p.IP != "" {
		return fmt.Sprintf("%s:%d", p.IP, p.Port)
	}
	return fmt.Sprintf("%s:%d", p.Host, p.Port)
}

// Advertise は mDNS で自分自身を _meshdrop._tcp として公開する。
// ctx がキャンセルされると登録を解除して返る。
func Advertise(ctx context.Context, port int) error {
	hostname, _ := os.Hostname()
	instance := fmt.Sprintf("meshdrop-%s", hostname)

	server, err := zeroconf.Register(instance, ServiceType, Domain, port, nil, nil)
	if err != nil {
		return fmt.Errorf("mDNS register: %w", err)
	}
	defer server.Shutdown()

	fmt.Printf("Advertising as %q on port %d (Ctrl+C to stop)\n", instance, port)
	<-ctx.Done()
	return nil
}

// Browse は LAN 上の MeshDrop ピアを timeout 内で発見して返す。
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
			peers = append(peers, Peer{
				Name: entry.Instance,
				Host: entry.HostName,
				Port: entry.Port,
				IP:   ip,
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
