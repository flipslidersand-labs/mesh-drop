package main

import (
	"testing"

	"github.com/spf13/cobra"
)

func newDefaultsCmd(t *testing.T, args ...string) (*cobra.Command, *string, *int) {
	t.Helper()
	var s string
	var n int
	cmd := &cobra.Command{Use: "x", RunE: func(*cobra.Command, []string) error { return nil }}
	cmd.Flags().StringVar(&s, "relay", "", "")
	cmd.Flags().IntVar(&n, "port", 44444, "")
	if err := cmd.ParseFlags(args); err != nil {
		t.Fatal(err)
	}
	return cmd, &s, &n
}

func TestApplyDefault(t *testing.T) {
	t.Run("unset flag takes config value", func(t *testing.T) {
		cmd, s, n := newDefaultsCmd(t)
		applyDefault(cmd, "relay", s, "wss://cfg")
		applyDefault(cmd, "port", n, 5555)
		if *s != "wss://cfg" || *n != 5555 {
			t.Errorf("got %q/%d, want config values", *s, *n)
		}
	})
	t.Run("explicit flag wins over config", func(t *testing.T) {
		cmd, s, n := newDefaultsCmd(t, "--relay", "wss://cli", "--port", "1234")
		applyDefault(cmd, "relay", s, "wss://cfg")
		applyDefault(cmd, "port", n, 5555)
		if *s != "wss://cli" || *n != 1234 {
			t.Errorf("got %q/%d, want CLI values", *s, *n)
		}
	})
	t.Run("zero config value keeps flag default", func(t *testing.T) {
		cmd, s, n := newDefaultsCmd(t)
		applyDefault(cmd, "relay", s, "")
		applyDefault(cmd, "port", n, 0)
		if *s != "" || *n != 44444 {
			t.Errorf("got %q/%d, want flag defaults", *s, *n)
		}
	})
}
