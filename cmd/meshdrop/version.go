package main

import (
	"fmt"
	"runtime"

	"github.com/spf13/cobra"
)

func cmdVersion() *cobra.Command {
	var short bool
	cmd := &cobra.Command{
		Use:   "version",
		Short: "Print meshdrop version information",
		Run: func(cmd *cobra.Command, args []string) {
			v := version
			if v == "" {
				v = "(dev)"
			}
			out := cmd.OutOrStdout()
			if short {
				fmt.Fprintln(out, v)
				return
			}
			fmt.Fprintf(out, "meshdrop %s\n", v)
			fmt.Fprintf(out, "  go:  %s\n", runtime.Version())
			fmt.Fprintf(out, "  os:  %s/%s\n", runtime.GOOS, runtime.GOARCH)
		},
	}
	cmd.Flags().BoolVar(&short, "short", false, "print version only (no go/os details)")
	return cmd
}
