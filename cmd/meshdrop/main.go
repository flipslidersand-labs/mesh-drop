package main

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/spf13/cobra"
	"golang.org/x/term"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
	"github.com/flipslidersand/mesh-drop/internal/nat"
	"github.com/flipslidersand/mesh-drop/internal/transfer"
)

// allowNoTOFU はグローバルフラグ --allow-no-tofu で設定される。
// 非対話的環境（CI/スクリプト）で TOFU なし動作を明示的に許可する。
var allowNoTOFU bool

func main() {
	root := &cobra.Command{
		Use:   "meshdrop",
		Short: "P2P encrypted file transfer",
		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			return initSessionOrWarn()
		},
	}
	root.PersistentFlags().BoolVar(&allowNoTOFU, "allow-no-tofu", false,
		"allow connections without TOFU peer verification (insecure, use only in trusted networks)")
	root.AddCommand(cmdReceive(), cmdSend(), cmdInfo(), cmdRelay())
	if err := root.Execute(); err != nil {
		os.Exit(1)
	}
}

// initSessionOrWarn は永続 identity と TOFU ストアを初期化する。
// 失敗した場合は目立つ警告を出し、端末実行時はユーザーに確認を求める。
// --allow-no-tofu が指定されているか非対話的環境では確認なしで継続する。
func initSessionOrWarn() error {
	if err := transfer.InitSession(); err == nil {
		return nil
	}

	fmt.Fprintln(os.Stderr, "")
	fmt.Fprintln(os.Stderr, "╔══════════════════════════════════════════════════════╗")
	fmt.Fprintln(os.Stderr, "║  WARNING: TOFU peer verification is DISABLED         ║")
	fmt.Fprintln(os.Stderr, "║  Could not load/create session identity.             ║")
	fmt.Fprintln(os.Stderr, "║  Connections will use ephemeral keys — no MitM       ║")
	fmt.Fprintln(os.Stderr, "║  protection. Ensure you trust your network.          ║")
	fmt.Fprintln(os.Stderr, "╚══════════════════════════════════════════════════════╝")
	fmt.Fprintln(os.Stderr, "")

	// --allow-no-tofu が既に渡されているか非対話的環境では確認なしで継続
	if allowNoTOFU || !term.IsTerminal(int(os.Stdin.Fd())) {
		return nil
	}

	fmt.Fprint(os.Stderr, "Continue without TOFU verification? [y/N]: ")
	sc := bufio.NewScanner(os.Stdin)
	if sc.Scan() && strings.EqualFold(strings.TrimSpace(sc.Text()), "y") {
		return nil
	}
	fmt.Fprintln(os.Stderr, "Aborted. To skip this prompt, pass --allow-no-tofu.")
	return fmt.Errorf("aborted: TOFU initialization failed")
}

// --- receive ---

func cmdReceive() *cobra.Command {
	var port int
	var relayURL string
	var pipe bool
	cmd := &cobra.Command{
		Use:   "receive",
		Short: "Receive a file/directory (LAN mDNS, or --relay for NAT traversal)",
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			addr := fmt.Sprintf("0.0.0.0:%d", port)

			if relayURL != "" {
				return receiveNAT(ctx, port, relayURL, pipe)
			}

			if pipe {
				go func() {
					if err := discovery.Advertise(ctx, port); err != nil && !errors.Is(err, context.Canceled) {
						log.Printf("mDNS: %v", err)
					}
				}()
				return transfer.ListenPipe(ctx, addr)
			}

			go func() {
				if err := discovery.Advertise(ctx, port); err != nil && !errors.Is(err, context.Canceled) {
					log.Printf("mDNS: %v", err)
				}
			}()
			return transfer.Listen(ctx, addr)
		},
	}
	cmd.Flags().IntVarP(&port, "port", "p", discovery.DefaultPort, "listen port")
	cmd.Flags().StringVar(&relayURL, "relay", "", "relay server URL for NAT traversal (e.g. http://relay:8080)")
	cmd.Flags().BoolVar(&pipe, "pipe", false, "write received data to stdout instead of a file")
	return cmd
}

func receiveNAT(ctx context.Context, port int, relayURL string, pipe bool) error {
	code, err := nat.CreateSession(relayURL)
	if err != nil {
		return fmt.Errorf("relay: %w", err)
	}

	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{Port: port})
	if err != nil {
		return fmt.Errorf("bind UDP :%d: %w", port, err)
	}

	fmt.Printf("Querying STUN (%s)...\n", nat.DefaultSTUN)
	externalAddr, err := nat.DiscoverWithConn(udpConn, nat.DefaultSTUN)
	if err != nil {
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

	nat.HolePunch(ctx, udpConn, peerUDP, 20, 50*time.Millisecond)

	fmt.Printf("QUIC listening on %s...\n", udpConn.LocalAddr())
	if pipe {
		return transfer.ListenPipeNAT(ctx, udpConn)
	}
	return transfer.ListenNAT(ctx, udpConn)
}

// --- send ---

func cmdSend() *cobra.Command {
	var timeout time.Duration
	var chunks int
	var relayURL string
	var code string
	var pipe bool
	cmd := &cobra.Command{
		Use:   "send [file or directory]",
		Short: "Send a file/directory/stdin (LAN mDNS, or --relay + --code for NAT traversal)",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			// pipe モード: 引数不要
			if pipe {
				if relayURL != "" {
					if code == "" {
						return fmt.Errorf("--code is required with --relay")
					}
					return sendPipeNAT(ctx, relayURL, code)
				}
				peer, err := discoverAndSelect(ctx, timeout)
				if err != nil {
					return err
				}
				fmt.Printf("→ Connecting to %s (%s) [pipe]...\n", peer.Name, peer.Addr())
				return transfer.SendPipe(ctx, peer.Addr())
			}

			if len(args) == 0 {
				return fmt.Errorf("specify a file/directory or use --pipe for stdin")
			}
			target := args[0]
			if _, err := os.Stat(target); err != nil {
				return fmt.Errorf("not found: %s", target)
			}
			if chunks < 1 {
				return fmt.Errorf("--chunks must be >= 1")
			}

			if relayURL != "" {
				if code == "" {
					return fmt.Errorf("--code is required with --relay")
				}
				return sendNAT(ctx, relayURL, code, target, chunks)
			}

			peer, err := discoverAndSelect(ctx, timeout)
			if err != nil {
				return err
			}

			info, err := os.Stat(target)
			if err != nil {
				return err
			}
			if info.IsDir() {
				fmt.Printf("→ Connecting to %s (%s) [dir, chunks=%d]...\n", peer.Name, peer.Addr(), chunks)
				return transfer.SendDir(ctx, peer.Addr(), target, chunks)
			}
			fmt.Printf("→ Connecting to %s (%s) [chunks=%d]...\n", peer.Name, peer.Addr(), chunks)
			return transfer.Send(ctx, peer.Addr(), target, chunks)
		},
	}
	cmd.Flags().DurationVarP(&timeout, "timeout", "t", 5*time.Second, "peer discovery timeout (LAN mode)")
	cmd.Flags().IntVarP(&chunks, "chunks", "n", 4, "parallel QUIC stream count")
	cmd.Flags().StringVar(&relayURL, "relay", "", "relay server URL for NAT traversal")
	cmd.Flags().StringVar(&code, "code", "", "pairing code from receiver (required with --relay)")
	cmd.Flags().BoolVar(&pipe, "pipe", false, "read from stdin instead of a file")
	return cmd
}

// discoverAndSelect は mDNS でピアを探し、複数いれば対話選択する。
func discoverAndSelect(ctx context.Context, timeout time.Duration) (discovery.Peer, error) {
	fmt.Printf("Searching for peers (%.0fs)...\n", timeout.Seconds())
	peers, err := discovery.Browse(ctx, timeout)
	if err != nil {
		return discovery.Peer{}, err
	}
	if len(peers) == 0 {
		return discovery.Peer{}, fmt.Errorf("no MeshDrop peers found (is receiver running?)")
	}
	fmt.Printf("Found %d peer(s):\n", len(peers))
	for i, p := range peers {
		fmt.Printf("  [%d] %s  (%s)\n", i+1, p.Name, p.Addr())
	}
	if len(peers) == 1 || !isTerminal() {
		return peers[0], nil
	}
	return promptPeerSelection(peers)
}

// promptPeerSelection は番号入力でピアを選ばせる。
func promptPeerSelection(peers []discovery.Peer) (discovery.Peer, error) {
	fmt.Print("Select peer [1]: ")
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return peers[0], nil
	}
	line = strings.TrimSpace(line)
	if line == "" {
		return peers[0], nil
	}
	n, err := strconv.Atoi(line)
	if err != nil || n < 1 || n > len(peers) {
		return discovery.Peer{}, fmt.Errorf("invalid selection: %q (enter 1-%d)", line, len(peers))
	}
	return peers[n-1], nil
}

// isTerminal は標準入力が TTY かどうかを返す。
func isTerminal() bool {
	return term.IsTerminal(int(os.Stdin.Fd()))
}

func sendNAT(ctx context.Context, relayURL, code, target string, nChunks int) error {
	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{})
	if err != nil {
		return fmt.Errorf("bind UDP: %w", err)
	}
	localPort := udpConn.LocalAddr().(*net.UDPAddr).Port

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

	nat.HolePunch(ctx, udpConn, peerUDP, 20, 50*time.Millisecond)

	fmt.Printf("Dialing QUIC at %s...\n", peerAddr)
	info, err := os.Stat(target)
	if err != nil {
		return err
	}
	if info.IsDir() {
		return transfer.SendDirNAT(ctx, udpConn, peerUDP, target, nChunks)
	}
	return transfer.SendNAT(ctx, udpConn, peerUDP, target, nChunks)
}

func sendPipeNAT(ctx context.Context, relayURL, code string) error {
	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{})
	if err != nil {
		return fmt.Errorf("bind UDP: %w", err)
	}
	localPort := udpConn.LocalAddr().(*net.UDPAddr).Port

	fmt.Fprintf(os.Stderr, "Querying STUN (%s)...\n", nat.DefaultSTUN)
	externalAddr, err := nat.DiscoverWithConn(udpConn, nat.DefaultSTUN)
	if err != nil {
		ip, e2 := nat.DiscoverExternalIP(nat.DefaultSTUN)
		if e2 != nil {
			udpConn.Close()
			return fmt.Errorf("STUN: %w", e2)
		}
		externalAddr = fmt.Sprintf("%s:%d", ip, localPort)
	}

	peerAddr, err := nat.Rendezvous(relayURL, code, externalAddr)
	if err != nil {
		udpConn.Close()
		return fmt.Errorf("rendezvous: %w", err)
	}

	peerUDP, err := net.ResolveUDPAddr("udp4", peerAddr)
	if err != nil {
		udpConn.Close()
		return fmt.Errorf("parse peer addr: %w", err)
	}

	nat.HolePunch(ctx, udpConn, peerUDP, 20, 50*time.Millisecond)

	return transfer.SendPipeNAT(ctx, udpConn, peerUDP)
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
