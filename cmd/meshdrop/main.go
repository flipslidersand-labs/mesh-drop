package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func main() {
	root := &cobra.Command{
		Use:   "meshdrop",
		Short: "P2P encrypted file transfer over LAN",
	}
	root.AddCommand(
		&cobra.Command{Use: "send [file]", Short: "Send a file", RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println("send — not yet implemented")
			return nil
		}},
		&cobra.Command{Use: "receive", Short: "Receive a file", RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println("receive — not yet implemented")
			return nil
		}},
	)
	if err := root.Execute(); err != nil {
		os.Exit(1)
	}
}
