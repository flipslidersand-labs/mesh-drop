package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/spf13/cobra"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
	"github.com/flipslidersand/mesh-drop/internal/transfer"
)

func main() {
	root := &cobra.Command{
		Use:   "meshdrop",
		Short: "P2P encrypted file transfer over LAN",
	}
	root.AddCommand(cmdSend(), cmdReceive())
	if err := root.Execute(); err != nil {
		os.Exit(1)
	}
}

func cmdReceive() *cobra.Command {
	var port int
	cmd := &cobra.Command{
		Use:   "receive",
		Short: "Advertise on LAN and receive a file",
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			// mDNS アドバタイズをバックグラウンドで実行
			go func() {
				if err := discovery.Advertise(ctx, port); err != nil && !errors.Is(err, context.Canceled) {
					log.Printf("mDNS: %v", err)
				}
			}()

			addr := fmt.Sprintf("0.0.0.0:%d", port)
			return transfer.Listen(ctx, addr)
		},
	}
	cmd.Flags().IntVarP(&port, "port", "p", discovery.DefaultPort, "listen port")
	return cmd
}

func cmdSend() *cobra.Command {
	var timeout time.Duration
	cmd := &cobra.Command{
		Use:   "send [file]",
		Short: "Discover receivers on LAN and send a file",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			file := args[0]
			if _, err := os.Stat(file); err != nil {
				return fmt.Errorf("file not found: %s", file)
			}

			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

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
			fmt.Printf("\n→ Connecting to %s (%s)...\n", peer.Name, peer.Addr())
			return transfer.Send(ctx, peer.Addr(), file)
		},
	}
	cmd.Flags().DurationVarP(&timeout, "timeout", "t", 5*time.Second, "peer discovery timeout")
	return cmd
}
