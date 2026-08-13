package crypto

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"

	"golang.org/x/sync/singleflight"
)

// KnownPeers is a file-backed store of trusted peer fingerprints (TOFU).
// The file contains one fingerprint per line.
// All methods are safe for concurrent use.
type KnownPeers struct {
	path     string
	mu       sync.Mutex
	cache    map[string]struct{} // 既知フィンガープリントのメモリキャッシュ
	inflight singleflight.Group  // 同一鍵の Verify が並行呼び出しされた場合に1つだけ TTY プロンプトを出す
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

// Verify checks whether pub is a trusted peer public key (TOFU).
// On first encounter it prompts the user interactively via /dev/tty (not stdin),
// so that pipe mode (where stdin carries data) does not conflict with the prompt.
// Returns nil if trusted, an error if rejected or no TTY is available.
// Storage uses FingerprintKey (full 64-char hex). Display uses FingerprintShort.
func (kp *KnownPeers) Verify(pub []byte) error {
	key := FingerprintKey(pub)
	if key == "" {
		return fmt.Errorf("peer verification failed: empty public key")
	}

	kp.mu.Lock()
	_, known := kp.cache[key]
	kp.mu.Unlock()
	if known {
		return nil
	}

	// 同一フィンガープリントへの並行 Verify を1つに集約する。
	// 複数の未知ピアが同時に接続しても TTY プロンプトが混在しない。
	_, err, _ := kp.inflight.Do(key, func() (interface{}, error) {
		// キャッシュを再確認（別 goroutine が先に信頼登録済みの可能性）
		kp.mu.Lock()
		_, ok := kp.cache[key]
		kp.mu.Unlock()
		if ok {
			return nil, nil
		}

		// /dev/tty を直接開いてプロンプトを表示・読み取る。
		// stdin がパイプデータを運ぶ pipe モードでも競合しない。
		tty, err := os.Open("/dev/tty")
		if err != nil {
			return nil, fmt.Errorf("peer verification failed: no TTY available (use --allow-no-tofu to skip): %w", err)
		}
		defer tty.Close()

		fmt.Fprintf(os.Stderr, "\nUnknown peer fingerprint: %s\n", FingerprintShort(pub))
		fmt.Fprintf(os.Stderr, "Trust this peer? [y/N]: ")

		scanner := bufio.NewScanner(tty)
		if !scanner.Scan() {
			return nil, fmt.Errorf("peer verification failed: could not read answer")
		}
		answer := strings.ToLower(strings.TrimSpace(scanner.Text()))
		if answer != "y" && answer != "yes" {
			return nil, fmt.Errorf("peer not trusted: %s", FingerprintShort(pub))
		}

		kp.mu.Lock()
		defer kp.mu.Unlock()
		if _, ok := kp.cache[key]; ok {
			return nil, nil
		}
		if err := kp.appendFile(key); err != nil {
			return nil, err
		}
		kp.cache[key] = struct{}{}
		return nil, nil
	})
	return err
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
