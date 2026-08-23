package main

import (
	"bufio"
	"context"
	"encoding/hex"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"os"
	"os/signal"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/spf13/cobra"
	"golang.org/x/term"
	"golang.org/x/time/rate"

	"github.com/flipslidersand/mesh-drop/internal/config"
	"github.com/flipslidersand/mesh-drop/internal/discovery"
	"github.com/flipslidersand/mesh-drop/internal/nat"
	"github.com/flipslidersand/mesh-drop/internal/transfer"
)

var version string

// allowNoTOFU はグローバルフラグ --allow-no-tofu で設定される。
// 非対話的環境（CI/スクリプト）で TOFU なし動作を明示的に許可する。
var allowNoTOFU bool

// verbose はグローバルフラグ --verbose/-v で設定される。
var verbose bool

// globalCfg は ~/.meshdrop/config.yaml から読み込んだ設定を保持する。
var globalCfg *config.Config

func loadConfig() error {
	if globalCfg != nil {
		return nil
	}
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("config: %w", err)
	}
	globalCfg = cfg
	return nil
}

func main() {
	root := &cobra.Command{
		Use:     "meshdrop",
		Short:   "P2P encrypted file transfer",
		Version: version,
		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			if verbose {
				slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
					Level: slog.LevelDebug,
				})))
			}
			return nil
		},
	}
	root.PersistentFlags().BoolVar(&allowNoTOFU, "allow-no-tofu", false,
		"allow connections without TOFU peer verification (insecure, use only in trusted networks)")
	root.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false, "enable debug logging to stderr")
	root.AddCommand(cmdReceive(), cmdSend(), cmdInfo(), cmdRelay(), cmdUI(), cmdConfig(), cmdVersion())
	root.InitDefaultCompletionCmd()
	if err := root.Execute(); err != nil {
		os.Exit(1)
	}
}

// cmdConfig returns the "config" parent command with subcommands.
func cmdConfig() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "config",
		Short: "Manage MeshDrop configuration",
	}
	cmd.AddCommand(cmdConfigInit(), cmdConfigPath())
	return cmd
}

// cmdConfigInit creates ~/.meshdrop/config.yaml with a commented template.
func cmdConfigInit() *cobra.Command {
	return &cobra.Command{
		Use:   "init",
		Short: "Create a default config file at " + config.ConfigPath(),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := config.ConfigPath()
			if path == "" {
				return fmt.Errorf("could not determine config path (HOME not set)")
			}
			if _, err := os.Stat(path); err == nil {
				return fmt.Errorf("config file already exists: %s", path)
			}
			if err := os.MkdirAll(filepath.Dir(path), 0o700); err != nil {
				return fmt.Errorf("create config dir: %w", err)
			}
			if err := os.WriteFile(path, []byte(config.InitTemplate), 0o600); err != nil {
				return fmt.Errorf("write config: %w", err)
			}
			fmt.Printf("Created config file: %s\n", path)
			return nil
		},
	}
}

// cmdConfigPath prints the path that meshdrop uses for its config file.
func cmdConfigPath() *cobra.Command {
	return &cobra.Command{
		Use:   "path",
		Short: "Print the config file path",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println(config.ConfigPath())
		},
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
	if sc.Scan() {
		answer := strings.ToLower(strings.TrimSpace(sc.Text()))
		if answer == "y" || answer == "yes" {
			return nil
		}
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
		// PreRunE でこのコマンド自身に TOFU 初期化を紐付ける。
		// PersistentPreRunE は子コマンドに伝播するため、将来の子コマンドが独自の
		// PersistentPreRunE を定義すると cobra v1 がチェーンせず initSessionOrWarn が
		// 無音スキップされる。リーフコマンドには PreRunE が適切。
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := loadConfig(); err != nil {
				return err
			}
			// config.yaml から未指定フラグを補完する
			if !cmd.Flags().Changed("relay") && globalCfg.Relay != "" {
				relayURL = globalCfg.Relay
			}
			if !cmd.Flags().Changed("port") && globalCfg.Port != 0 {
				port = globalCfg.Port
			}
			return initSessionOrWarn()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			addr := fmt.Sprintf("0.0.0.0:%d", port)

			if relayURL != "" {
				return receiveNAT(ctx, port, relayURL, pipe)
			}

			if pipe {
				go func() {
					if err := discovery.Advertise(ctx, port, nil); err != nil && !errors.Is(err, context.Canceled) {
						slog.Debug("mDNS", "err", err)
					}
				}()
				return transfer.ListenPipe(ctx, addr)
			}

			// #160: Generate TLS cert bundle once so the same cert fingerprint is
			// advertised via mDNS and used by the QUIC listener.
			bundle, err := transfer.NewTLSBundle()
			if err != nil {
				return fmt.Errorf("TLS setup: %w", err)
			}
			go func() {
				if err := discovery.Advertise(ctx, port, bundle.Fingerprint); err != nil && !errors.Is(err, context.Canceled) {
					slog.Debug("mDNS", "err", err)
				}
			}()
			return transfer.ListenWithBundle(ctx, addr, bundle)
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
		slog.Debug("STUN via socket failed, trying fallback", "err", err)
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
	var fingerprintHex string
	var sendAll bool
	var sendTo string
	var rateLimitStr string
	var compress bool
	var compressLevel int
	var noResume bool
	cmd := &cobra.Command{
		Use:   "send [file or directory]",
		Short: "Send a file/directory/stdin (LAN mDNS, or --relay + --code for NAT traversal)",
		Args:  cobra.MaximumNArgs(1),
		// PreRunE でこのコマンド自身に TOFU 初期化を紐付ける。
		// PersistentPreRunE は子コマンドに伝播するため、将来の子コマンドが独自の
		// PersistentPreRunE を定義すると cobra v1 がチェーンせず initSessionOrWarn が
		// 無音スキップされる。リーフコマンドには PreRunE が適切。
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := loadConfig(); err != nil {
				return err
			}
			// config.yaml から未指定フラグを補完する
			if !cmd.Flags().Changed("relay") && globalCfg.Relay != "" {
				relayURL = globalCfg.Relay
			}
			if !cmd.Flags().Changed("rate-limit") && globalCfg.RateLimit != "" {
				rateLimitStr = globalCfg.RateLimit
			}
			return initSessionOrWarn()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			if sendAll && sendTo != "" {
				return fmt.Errorf("--all and --to are mutually exclusive")
			}

			// #160: Decode optional TLS certificate fingerprint.
			fingerprint, err := parseFingerprint(fingerprintHex)
			if err != nil {
				return err
			}

			lim, err := parseRateLimit(rateLimitStr)
			if err != nil {
				return err
			}

			// pipe モード: 引数不要
			if pipe {
				if sendAll || sendTo != "" {
					return fmt.Errorf("--all/--to cannot be used with --pipe (stdin can only be read once)")
				}
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
				if sendAll || sendTo != "" {
					return fmt.Errorf("--all/--to cannot be used with --relay (NAT mode supports one peer at a time)")
				}
				if code == "" {
					return fmt.Errorf("--code is required with --relay")
				}
				return sendNAT(ctx, relayURL, code, target, chunks, fingerprint, lim, compress, compressLevel, noResume)
			}

			if lim != nil {
				fmt.Printf("  Rate limit: %s\n", rateLimitStr)
			}
			if compress {
				fmt.Printf("  Compression: zstd level=%d\n", compressLevel)
			}

			// マルチ受信者モード
			if sendAll || sendTo != "" {
				peers, err := discoverAll(ctx, timeout)
				if err != nil {
					return err
				}
				if sendTo != "" {
					peers = filterPeers(peers, strings.Split(sendTo, ","))
					if len(peers) == 0 {
						return fmt.Errorf("no peers matched --to %q", sendTo)
					}
				}
				return sendToAll(ctx, peers, target, chunks, fingerprint, lim, compress, compressLevel, noResume)
			}

			// シングル受信者モード（既存）
			peer, err := discoverAndSelect(ctx, timeout)
			if err != nil {
				return err
			}

			// #160: If no --fingerprint was provided but the mDNS peer advertised
			// one, use it automatically. This gives full pinning without manual
			// out-of-band exchange.
			effectiveFingerprint := fingerprint
			if len(effectiveFingerprint) == 0 && len(peer.Fingerprint) > 0 {
				fmt.Printf("  Auto-pinning TLS fingerprint from mDNS: %x\n", peer.Fingerprint[:8])
				effectiveFingerprint = peer.Fingerprint
			}

			info, err := os.Stat(target)
			if err != nil {
				return err
			}
			if info.IsDir() {
				fmt.Printf("→ Connecting to %s (%s) [dir, chunks=%d]...\n", peer.Name, peer.Addr(), chunks)
				return transfer.SendDir(ctx, peer.Addr(), target, chunks, effectiveFingerprint, lim, compress, compressLevel, noResume, nil)
			}
			fmt.Printf("→ Connecting to %s (%s) [chunks=%d]...\n", peer.Name, peer.Addr(), chunks)
			return transfer.Send(ctx, peer.Addr(), target, chunks, effectiveFingerprint, lim, compress, compressLevel, noResume)
		},
	}
	cmd.Flags().DurationVarP(&timeout, "timeout", "t", 5*time.Second, "peer discovery timeout (LAN mode)")
	cmd.Flags().IntVarP(&chunks, "chunks", "n", 4, "parallel QUIC stream count")
	cmd.Flags().StringVar(&relayURL, "relay", "", "relay server URL for NAT traversal")
	cmd.Flags().StringVar(&code, "code", "", "pairing code from receiver (required with --relay)")
	cmd.Flags().BoolVar(&pipe, "pipe", false, "read from stdin instead of a file")
	// #160: --fingerprint pins the receiver's TLS certificate SHA-256 fingerprint.
	cmd.Flags().StringVar(&fingerprintHex, "fingerprint", "", "SHA-256 fingerprint of receiver's TLS certificate (hex, from receiver output)")
	cmd.Flags().BoolVar(&sendAll, "all", false, "send to all discovered peers simultaneously")
	cmd.Flags().StringVar(&sendTo, "to", "", "send to specific peers (comma-separated name prefixes, e.g. web1,web2)")
	cmd.Flags().StringVar(&rateLimitStr, "rate-limit", "", "maximum send throughput (e.g. 10MB/s, 512KB/s); default: unlimited")
	cmd.Flags().BoolVar(&compress, "compress", false, "compress chunks with zstd before sending")
	cmd.Flags().IntVar(&compressLevel, "compress-level", 0, "zstd compression level: 1=fastest, 9=best, 0=default(3)")
	cmd.Flags().BoolVar(&noResume, "no-resume", false, "disable resume: resend all chunks even if receiver has partial progress")
	return cmd
}

// parseFingerprint decodes a hex-encoded SHA-256 fingerprint string.
// Returns nil (no error) if fpHex is empty (fingerprint not provided).
func parseFingerprint(fpHex string) ([]byte, error) {
	if fpHex == "" {
		return nil, nil
	}
	fp, err := hex.DecodeString(fpHex)
	if err != nil {
		return nil, fmt.Errorf("--fingerprint: invalid hex: %w", err)
	}
	if len(fp) != 32 {
		return nil, fmt.Errorf("--fingerprint: expected 32-byte SHA-256 fingerprint (64 hex chars), got %d bytes", len(fp))
	}
	return fp, nil
}

// discoverAndSelect は mDNS でピアを探し、複数いれば対話選択する。
func discoverAndSelect(ctx context.Context, timeout time.Duration) (discovery.Peer, error) {
	fmt.Printf("Searching for peers (%.0fs)...\n", timeout.Seconds())
	peers, err := discovery.Browse(ctx, timeout)
	if err != nil {
		return discovery.Peer{}, err
	}
	if len(peers) == 0 {
		return discovery.Peer{}, fmt.Errorf("no peers found via mDNS (%.0fs timeout).\nIf you're on different networks or behind NAT, try relay mode:\n  meshdrop receive --relay <RELAY_URL>\n  meshdrop send --relay <RELAY_URL> --code <CODE> <file>", timeout.Seconds())
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

// discoverAll は timeout 内で全 MeshDrop ピアを発見して返す。
func discoverAll(ctx context.Context, timeout time.Duration) ([]discovery.Peer, error) {
	fmt.Printf("Searching for peers (%.0fs)...\n", timeout.Seconds())
	peers, err := discovery.Browse(ctx, timeout)
	if err != nil {
		return nil, err
	}
	if len(peers) == 0 {
		return nil, fmt.Errorf("no peers found via mDNS (%.0fs timeout).\nIf you're on different networks or behind NAT, try relay mode:\n  meshdrop receive --relay <RELAY_URL>\n  meshdrop send --relay <RELAY_URL> --code <CODE> <file>", timeout.Seconds())
	}
	fmt.Printf("Found %d peer(s):\n", len(peers))
	for _, p := range peers {
		fmt.Printf("  • %s  (%s)\n", p.Name, p.Addr())
	}
	return peers, nil
}

// filterPeers は prefixes にいずれかが前方一致するピアのみ返す（大文字小文字不問）。
// マッチしなかった prefix は警告表示する。
func filterPeers(peers []discovery.Peer, prefixes []string) []discovery.Peer {
	var matched []discovery.Peer
	for _, prefix := range prefixes {
		prefix = strings.TrimSpace(prefix)
		if prefix == "" {
			continue
		}
		found := false
		for _, p := range peers {
			if strings.HasPrefix(strings.ToLower(p.Name), strings.ToLower(prefix)) {
				matched = append(matched, p)
				found = true
			}
		}
		if !found {
			fmt.Fprintf(os.Stderr, "  warning: no peer matched %q\n", prefix)
		}
	}
	return matched
}

// peerResult は1ピアへの送信結果を保持する。
type peerResult struct {
	peer discovery.Peer
	err  error
	dur  time.Duration
}

// sendToAll は peers に並列送信し、全完了後にサマリーを表示する。
// 一部が失敗しても他のピアへの送信は継続する。全失敗の場合のみエラーを返す。
func sendToAll(ctx context.Context, peers []discovery.Peer, target string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	info, err := os.Stat(target)
	if err != nil {
		return err
	}
	isDir := info.IsDir()

	results := make([]peerResult, len(peers))
	var wg sync.WaitGroup
	for i, p := range peers {
		wg.Add(1)
		go func(i int, p discovery.Peer) {
			defer wg.Done()
			start := time.Now()
			fp := fingerprint
			if len(fp) == 0 && len(p.Fingerprint) > 0 {
				fp = p.Fingerprint
			}
			var sendErr error
			if isDir {
				fmt.Printf("→ [%s] Connecting (%s) [dir, chunks=%d]...\n", p.Name, p.Addr(), nChunks)
				sendErr = transfer.SendDir(ctx, p.Addr(), target, nChunks, fp, lim, compressed, compLevel, noResume, nil)
			} else {
				fmt.Printf("→ [%s] Connecting (%s) [chunks=%d]...\n", p.Name, p.Addr(), nChunks)
				sendErr = transfer.Send(ctx, p.Addr(), target, nChunks, fp, lim, compressed, compLevel, noResume)
			}
			results[i] = peerResult{peer: p, err: sendErr, dur: time.Since(start)}
		}(i, p)
	}
	wg.Wait()

	// サマリー表示
	fmt.Printf("\nBroadcast summary (%d peer(s)):\n", len(peers))
	ok, fail := 0, 0
	for _, r := range results {
		if r.err == nil {
			fmt.Printf("  ✓ %s  (%.1fs)\n", r.peer.Name, r.dur.Seconds())
			ok++
		} else {
			fmt.Fprintf(os.Stderr, "  ✗ %s  %v\n", r.peer.Name, r.err)
			fail++
		}
	}
	if fail == len(peers) {
		return fmt.Errorf("all %d peer(s) failed", fail)
	}
	if fail > 0 {
		return fmt.Errorf("%d of %d peer(s) failed", fail, len(peers))
	}
	return nil
}

func sendNAT(ctx context.Context, relayURL, code, target string, nChunks int, fingerprint []byte, lim *rate.Limiter, compressed bool, compLevel int, noResume bool) error {
	udpConn, err := net.ListenUDP("udp4", &net.UDPAddr{})
	if err != nil {
		return fmt.Errorf("bind UDP: %w", err)
	}
	localPort := udpConn.LocalAddr().(*net.UDPAddr).Port

	fmt.Printf("Querying STUN (%s)...\n", nat.DefaultSTUN)
	externalAddr, err := nat.DiscoverWithConn(udpConn, nat.DefaultSTUN)
	if err != nil {
		slog.Debug("STUN via socket failed, trying fallback", "err", err)
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
		return transfer.SendDirNAT(ctx, udpConn, peerUDP, target, nChunks, fingerprint, lim, compressed, compLevel, noResume, nil)
	}
	return transfer.SendNAT(ctx, udpConn, peerUDP, target, nChunks, fingerprint, lim, compressed, compLevel, noResume)
}

// parseRateLimit は "10MB/s", "512KB/s" 等の文字列を Limiter に変換する。
// 空文字列は nil (無制限) を返す。実装は transfer.ParseRateLimit に委譲。
func parseRateLimit(s string) (*rate.Limiter, error) {
	lim, err := transfer.ParseRateLimit(s)
	if err != nil {
		return nil, fmt.Errorf("--rate-limit: %w", err)
	}
	return lim, nil
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
	var trustedProxies []string
	var certFile, keyFile string
	var maxSessions int
	cmd := &cobra.Command{
		Use:   "relay",
		Short: "Run a signaling relay server for NAT traversal",
		RunE: func(cmd *cobra.Command, args []string) error {
			// --max-sessions が未設定の場合は MESHDROP_RELAY_MAX_SESSIONS 環境変数を参照する。
			if !cmd.Flags().Changed("max-sessions") {
				if v := os.Getenv("MESHDROP_RELAY_MAX_SESSIONS"); v != "" {
					n, err := strconv.Atoi(v)
					if err != nil || n <= 0 {
						return fmt.Errorf("MESHDROP_RELAY_MAX_SESSIONS: invalid value %q (must be positive integer)", v)
					}
					maxSessions = n
				}
			}
			proto := "HTTP"
			if certFile != "" && keyFile != "" {
				proto = "HTTPS"
			}
			if len(trustedProxies) > 0 {
				fmt.Printf("Relay server on %s (protocol: %s, trusted proxies: %s, max-sessions: %d)\n",
					addr, proto, strings.Join(trustedProxies, ", "), maxSessions)
			} else {
				fmt.Printf("Relay server on %s (protocol: %s, max-sessions: %d)\n", addr, proto, maxSessions)
			}
			return nat.NewRelayServerFull(trustedProxies, maxSessions).StartTLS(addr, certFile, keyFile)
		},
	}
	cmd.Flags().StringVar(&addr, "addr", ":8080", "listen address")
	cmd.Flags().StringSliceVar(&trustedProxies, "trusted-proxy", nil,
		"IP addresses of trusted reverse proxies (enables X-Forwarded-For / X-Real-IP support)")
	cmd.Flags().StringVar(&certFile, "cert", "", "path to TLS certificate file (enables HTTPS)")
	cmd.Flags().StringVar(&keyFile, "key", "", "path to TLS private key file (enables HTTPS)")
	cmd.Flags().IntVar(&maxSessions, "max-sessions", nat.DefaultMaxSessions,
		"maximum concurrent relay sessions (env: MESHDROP_RELAY_MAX_SESSIONS)")
	return cmd
}
