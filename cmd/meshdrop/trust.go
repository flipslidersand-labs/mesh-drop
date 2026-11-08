package main

import (
	"fmt"
	"os"

	"github.com/flipslidersand-labs/mesh-drop/internal/crypto"
	"github.com/spf13/cobra"
)

// cmdIdentity prints this host's public identity key (64 hex chars).
// The peer passes it to `meshdrop trust` to pre-trust this host without a TTY prompt.
func cmdIdentity() *cobra.Command {
	return &cobra.Command{
		Use:   "identity",
		Short: "Print this host's public identity key (give it to peers for 'meshdrop trust')",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			key, err := crypto.LoadOrCreateIdentity(crypto.IdentityDir())
			if err != nil {
				return fmt.Errorf("load identity: %w", err)
			}
			fmt.Println(crypto.FingerprintKey(key.Public))
			return nil
		},
	}
}

// cmdTrust registers peer identity keys so transfers with them need no TTY prompt.
func cmdTrust() *cobra.Command {
	return &cobra.Command{
		Use:   "trust <peer-key>...",
		Short: "Pre-trust peers by identity key (from 'meshdrop identity' on the peer); for CI/scripts without a TTY",
		Args:  cobra.MinimumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			peers := crypto.NewKnownPeers(crypto.IdentityDir())
			for _, a := range args {
				if err := peers.Trust(a); err != nil {
					return err
				}
				fmt.Fprintf(os.Stderr, "trusted %s\n", a)
			}
			return nil
		},
	}
}
