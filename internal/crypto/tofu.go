package crypto

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

// KnownPeers is a file-backed store of trusted peer fingerprints (TOFU).
// The file contains one fingerprint per line.
// All methods are safe for concurrent use.
type KnownPeers struct {
	path  string
	mu    sync.Mutex
	cache map[string]struct{} // 既知フィンガープリントのメモリキャッシュ
}

// NewKnownPeers creates a KnownPeers store backed by dir/known_peers.
// Existing entries are loaded into memory on creation.
func NewKnownPeers(dir string) *KnownPeers {
	kp := &KnownPeers{
		path:  filepath.Join(dir, "known_peers"),
		cache: make(map[string]struct{}),
	}
	kp.loadCache()
	return kp
}

// Verify checks whether fingerprint is trusted. On first encounter it
// prompts the user interactively (requires a TTY on stdin). Returns nil
// if the peer is trusted, an error if rejected or the prompt cannot be shown.
func (kp *KnownPeers) Verify(fingerprint string) error {
	kp.mu.Lock()
	defer kp.mu.Unlock()

	if _, ok := kp.cache[fingerprint]; ok {
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

	if err := kp.appendFile(fingerprint); err != nil {
		return err
	}
	kp.cache[fingerprint] = struct{}{}
	return nil
}

// loadCache reads the known_peers file into memory (called once at init).
func (kp *KnownPeers) loadCache() {
	data, err := os.ReadFile(kp.path)
	if err != nil {
		return
	}
	for _, line := range strings.Split(string(data), "\n") {
		if fp := strings.TrimSpace(line); fp != "" {
			kp.cache[fp] = struct{}{}
		}
	}
}

func (kp *KnownPeers) appendFile(fingerprint string) error {
	f, err := os.OpenFile(kp.path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o600)
	if err != nil {
		return fmt.Errorf("save known peer: %w", err)
	}
	defer f.Close()
	_, err = fmt.Fprintln(f, fingerprint)
	return err
}
