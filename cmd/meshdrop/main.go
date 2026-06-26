package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/spf13/cobra"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
	"github.com/flipslidersand/mesh-drop/internal/nat"
	"github.com/flipslidersand/mesh-drop/internal/transfer"
)

func main() {
	root := &cobra.Command{
		Use:   "meshdrop",
		Short: "P2P encrypted file transfer",
	}
	root.AddCommand(cmdReceive(), cmdSend(), cmdInfo(), cmdRelay())
	if err := root.Execute(); err != nil {
		os.Exit(1)
	}
}

// --- receive ---

func cmdReceive() *cobra.Command {
	var port int
	var relayURL string
	cmd := &cobra.Command{
		Use:   "receive",
		Short: "Receive a file (LAN mDNS, or --relay for NAT traversal)",
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			if relayURL != "" {
				return receiveNAT(ctx, port, relayURL)
			}
			// LAN mode
			go func() {
				if err := discovery.Advertise(ctx, port); err != nil && !errors.Is(err, context.Canceled) {
					log.Printf("mDNS: %v", err)
				}
			}()
			return transfer.Listen(ctx, fmt.Sprintf("0.0.0.0:%d", port))
		},
	}
	cmd.Flags().IntVarP(&port, "port", "p", discovery.DefaultPort, "listen port")
	cmd.Flags().StringVar(&relayURL, "relay", "", "relay server URL for NAT traversal (e.g. http://relay:8080)")
	return cmd
}

func receiveNAT(ctx context.Context, port int, relayURL string) error {
	// 1. セッション作成 → ペアリングコード取得
	code, err := nat.CreateSession(relayURL)
	if err != nil {
		return fmt.Errorf("relay: %w", err)
	}

	// 2. UDP ソケットをバインド (QUIC と共有)
	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{Port: port})
	if err != nil {
		return fmt.Errorf("bind UDP :%d: %w", port, err)
	}

	// 3. STUN で外部 IP:Port を取得
	fmt.Printf("Querying STUN (%s)...\n", nat.DefaultSTUN)
	externalAddr, err := nat.DiscoverWithConn(udpConn, nat.DefaultSTUN)
	if err != nil {
		// フォールバック: IP のみ取得してポートは listenPort とみなす (port-preserving NAT)
		log.Printf("STUN via socket failed (%v), trying fallback...", err)
		ip, e2 := nat.DiscoverExternalIP(nat.DefaultSTUN)
		if e2 != nil {
			udpConn.Close()
			return fmt.Errorf("STUN: %w", e2)
		}
		externalAddr = fmt.Sprintf("%s:%d", ip, port)
	}

	fmt.Printf("\n  Pairing code : %s\n", code)
	fmt.Printf("  External addr: %s\n\n", externalAddr)
	fmt.Printf("Run on sender:\n  meshdrop send --relay %s --code %s <file>\n\n", relayURL, code)

	// 4. ランデブー: 送信側が来るまでブロック
	fmt.Println("Waiting for sender (up to 60s)...")
	peerAddr, err := nat.Rendezvous(relayURL, code, externalAddr)
	if err != nil {
		udpConn.Close()
		return fmt.Errorf("rendezvous: %w", err)
	}
	fmt.Printf("Sender found: %s\n", peerAddr)

	peerUDP, err := net.ResolveUDPAddr("udp4", peerAddr)
	if err != nil {
		udpConn.Close()
		return fmt.Errorf("parse peer addr: %w", err)
	}

	// 5. UDP hole punch (ランデブー直後に開始)
	go nat.HolePunch(udpConn, peerUDP, 20, 50*time.Millisecond)

	// 6. 同一ソケットで QUIC リスナーを起動
	fmt.Printf("QUIC listening on %s...\n", udpConn.LocalAddr())
	return transfer.ListenNAT(ctx, udpConn)
}

// --- send ---

func cmdSend() *cobra.Command {
	var timeout time.Duration
	var chunks int
	var relayURL string
	var code string
	cmd := &cobra.Command{
		Use:   "send [file]",
		Short: "Send a file (LAN mDNS, or --relay + --code for NAT traversal)",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			file := args[0]
			if _, err := os.Stat(file); err != nil {
				return fmt.Errorf("file not found: %s", file)
			}
			if chunks < 1 {
				return fmt.Errorf("--chunks must be >= 1")
			}

			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			if relayURL != "" {
				if code == "" {
					return fmt.Errorf("--code is required with --relay")
				}
				return sendNAT(ctx, relayURL, code, file, chunks)
			}

			// LAN mode: mDNS ディスカバリー
			fmt.Printf("Searching for peers (%.0fs)...\n", timeout.Seconds())
			peers, err := discovery.Browse(ctx, timeout)
			if err != nil {
				return err
			}
			if len(peers) == 0 {
				return fmt.Errorf("no MeshDrop peers found (is receiver running?)")
			}
			fmt.Printf("Found %d peer(s):\n", len(peers))
			for i, p := range peers {
				fmt.Printf("  [%d] %s  (%s)\n", i+1, p.Name, p.Addr())
			}
			peer := peers[0]
			fmt.Printf("\n→ Connecting to %s (%s)  chunks=%d...\n", peer.Name, peer.Addr(), chunks)
			return transfer.Send(ctx, peer.Addr(), file, chunks)
		},
	}
	cmd.Flags().DurationVarP(&timeout, "timeout", "t", 5*time.Second, "peer discovery timeout (LAN mode)")
	cmd.Flags().IntVarP(&chunks, "chunks", "n", 4, "parallel QUIC stream count")
	cmd.Flags().StringVar(&relayURL, "relay", "", "relay server URL for NAT traversal")
	cmd.Flags().StringVar(&code, "code", "", "pairing code from receiver (required with --relay)")
	return cmd
}

func sendNAT(ctx context.Context, relayURL, code, filePath string, nChunks int) error {
	// 1. エフェメラルポートで UDP ソケットをバインド
	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{})
	if err != nil {
		return fmt.Errorf("bind UDP: %w", err)
	}
	localPort := udpConn.LocalAddr().(*net.UDPAddr).Port

	// 2. STUN で外部アドレスを取得
	fmt.Printf("Querying STUN (%s)...\n", nat.DefaultSTUN)
	externalAddr, err := nat.DiscoverWithConn(udpConn, nat.DefaultSTUN)
	if err != nil {
		log.Printf("STUN via socket failed (%v), trying fallback...", err)
		ip, e2 := nat.DiscoverExternalIP(nat.DefaultSTUN)
		if e2 != nil {
			udpConn.Close()
			return fmt.Errorf("STUN: %w", e2)
		}
		externalAddr = fmt.Sprintf("%s:%d", ip, localPort)
	}
	fmt.Printf("External: %s\n", externalAddr)

	// 3. ランデブー: 受信側のアドレスを取得
	fmt.Printf("Connecting to relay (code=%s)...\n", code)
	peerAddr, err := nat.Rendezvous(relayURL, code, externalAddr)
	if err != nil {
		udpConn.Close()
		return fmt.Errorf("rendezvous: %w", err)
	}
	fmt.Printf("Receiver found: %s\n", peerAddr)

	peerUDP, err := net.ResolveUDPAddr("udp4", peerAddr)
	if err != nil {
		udpConn.Close()
		return fmt.Errorf("parse peer addr: %w", err)
	}

	// 4. UDP hole punch + QUIC ダイアル
	go nat.HolePunch(udpConn, peerUDP, 20, 50*time.Millisecond)
	time.Sleep(200 * time.Millisecond) // punch を先行させる

	fmt.Printf("Dialing QUIC at %s...\n", peerAddr)
	return transfer.SendNAT(ctx, udpConn, peerUDP, filePath, nChunks)
}

// --- info ---

func cmdInfo() *cobra.Command {
	var stunServer string
	cmd := &cobra.Command{
		Use:   "info",
		Short: "Show external IP via STUN",
		RunE: func(cmd *cobra.Command, args []string) error {
			ip, err := nat.DiscoverExternalIP(stunServer)
			if err != nil {
				return err
			}
			fmt.Printf("External IP: %s\n", ip)
			return nil
		},
	}
	cmd.Flags().StringVar(&stunServer, "stun", nat.DefaultSTUN, "STUN server address")
	return cmd
}

// --- relay ---

func cmdRelay() *cobra.Command {
	var addr string
	cmd := &cobra.Command{
		Use:   "relay",
		Short: "Run a signaling relay server for NAT traversal",
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Printf("Relay server on %s\n", addr)
			return nat.NewRelayServer().Start(addr)
		},
	}
	cmd.Flags().StringVar(&addr, "addr", ":8080", "listen address")
	return cmd
}
