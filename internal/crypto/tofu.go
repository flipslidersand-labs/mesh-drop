package crypto

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// KnownPeers is a file-backed store of trusted peer fingerprints (TOFU).
// The file contains one fingerprint per line.
type KnownPeers struct {
	path string
}

// NewKnownPeers creates a KnownPeers store backed by dir/known_peers.
func NewKnownPeers(dir string) *KnownPeers {
	return &KnownPeers{path: filepath.Join(dir, "known_peers")}
}

// Verify checks whether fingerprint is trusted. On first encounter it
// prompts the user interactively (requires a TTY on stdin). Returns nil
// if the peer is trusted, an error if rejected or the prompt cannot be shown.
func (kp *KnownPeers) Verify(fingerprint string) error {
	if kp.isKnown(fingerprint) {
		return nil
	}

	fmt.Fprintf(os.Stderr, "\nUnknown peer fingerprint: %s\n", fingerprint)
	fmt.Fprintf(os.Stderr, "Trust this peer? [y/N]: ")

	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return fmt.Errorf("peer verification failed: could not read answer (not a TTY?)")
	}
	answer := strings.ToLower(strings.TrimSpace(scanner.Text()))
	if answer != "y" && answer != "yes" {
		return fmt.Errorf("peer not trusted: %s", fingerprint)
	}

	return kp.append(fingerprint)
}

func (kp *KnownPeers) isKnown(fingerprint string) bool {
	data, err := os.ReadFile(kp.path)
	if err != nil {
		return false
	}
	for _, line := range strings.Split(string(data), "\n") {
		if strings.TrimSpace(line) == fingerprint {
			return true
		}
	}
	return false
}

func (kp *KnownPeers) append(fingerprint string) error {
	f, err := os.OpenFile(kp.path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o600)
	if err != nil {
		return fmt.Errorf("save known peer: %w", err)
	}
	defer f.Close()
	_, err = fmt.Fprintln(f, fingerprint)
	return err
}
