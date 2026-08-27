package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os/exec"
	"os/signal"
	"runtime"
	"syscall"
	"time"

	"github.com/spf13/cobra"

	"github.com/flipslidersand/mesh-drop/internal/webui"
)

func cmdUI() *cobra.Command {
	var port int
	var noOpen bool
	var discoverTimeout time.Duration
	var authToken string
	cmd := &cobra.Command{
		Use:   "ui",
		Short: "Start local Web UI (drag & drop file transfer)",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := loadConfig(); err != nil {
				return err
			}
			// config.yaml から未指定フラグを補完する
			if !cmd.Flags().Changed("port") && globalCfg.Port != 0 {
				port = globalCfg.Port
			}
			if !cmd.Flags().Changed("auth-token") && globalCfg.AuthToken != "" {
				authToken = globalCfg.AuthToken
			}
			return nil
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			addr := fmt.Sprintf("127.0.0.1:%d", port)
			url := fmt.Sprintf("http://%s", addr)

			fmt.Printf("MeshDrop UI  →  %s\n", url)
			if authToken != "" {
				fmt.Println("Authentication enabled (--auth-token).")
			}
			fmt.Println("Press Ctrl+C to stop.")

			if !noOpen {
				openBrowser(url)
			}

			ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
			defer stop()

			srv := webui.New(addr, discoverTimeout)
			srv.AuthToken = authToken
			if err := srv.Run(ctx); err != nil && !errors.Is(err, http.ErrServerClosed) {
				return err
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&port, "port", "p", 8765, "HTTP listen port")
	cmd.Flags().BoolVar(&noOpen, "no-open", false, "do not open browser automatically")
	cmd.Flags().DurationVar(&discoverTimeout, "discover", 3*time.Second, "peer discovery timeout per poll")
	cmd.Flags().StringVar(&authToken, "auth-token", "", "require Bearer token or ?token= query param to access the Web UI (empty = no auth)")
	return cmd
}

func openBrowser(url string) {
	var cmd string
	var args []string
	switch runtime.GOOS {
	case "darwin":
		cmd, args = "open", []string{url}
	case "windows":
		cmd, args = "rundll32", []string{"url.dll,FileProtocolHandler", url}
	default:
		cmd, args = "xdg-open", []string{url}
	}
	exec.Command(cmd, args...).Start() //nolint:errcheck
}
