package crypto

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"golang.org/x/sync/singleflight"
)

// KnownPeers is a file-backed store of trusted peer fingerprints (TOFU).
// The file contains one fingerprint per line.
// All methods are safe for concurrent use.
type KnownPeers struct {
	path     string
	mu       sync.Mutex
	cache    map[string]struct{} // 既知フィンガープリントのメモリキャッシュ
	inflight singleflight.Group  // 同一鍵の Verify を1つに集約
	promptMu sync.Mutex          // TTY プロンプトを直列化 — 異なるピアの同時接続でも混在しない
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

// verifyTTYTimeout は TTY からの入力待ちタイムアウト。
// 自動化環境でプロセスが永久ブロックするのを防ぐ。
const verifyTTYTimeout = 30 * time.Second

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
	_, err, _ := kp.inflight.Do(key, func() (interface{}, error) {
		// キャッシュを再確認（別 goroutine が先に信頼登録済みの可能性）
		kp.mu.Lock()
		_, ok := kp.cache[key]
		kp.mu.Unlock()
		if ok {
			return nil, nil
		}

		return nil, kp.promptAndTrust(pub, key)
	})
	return err
}

// promptAndTrust は /dev/tty を開いてユーザーにピア信頼の確認を求め、
// 承認されれば known_peers ファイルとメモリキャッシュに登録する。
// promptMu で直列化されるため、複数の未知ピアが同時接続しても
// プロンプトと入力が混在しない。
func (kp *KnownPeers) promptAndTrust(pub []byte, key string) error {
	// 異なるフィンガープリントの並行プロンプトを直列化する。
	// singleflight は同一キーのみ保護するため、この mutex が必要。
	kp.promptMu.Lock()
	defer kp.promptMu.Unlock()

	// promptMu 待機中に別 goroutine が信頼登録済みになった場合のチェック
	kp.mu.Lock()
	_, ok := kp.cache[key]
	kp.mu.Unlock()
	if ok {
		return nil
	}

	// /dev/tty を読み書き両用で開く。
	// stdout/stderr がリダイレクトされていてもプロンプトをユーザーに表示できる。
	tty, err := os.OpenFile("/dev/tty", os.O_RDWR, 0)
	if err != nil {
		return fmt.Errorf("peer verification failed: no TTY available (use --allow-no-tofu to skip): %w", err)
	}
	defer tty.Close()

	// 無人環境でのデッドロックを防ぐため読み取りタイムアウトを設定する。
	if err := tty.SetDeadline(time.Now().Add(verifyTTYTimeout)); err != nil {
		return fmt.Errorf("peer verification failed: could not set TTY deadline: %w", err)
	}

	// プロンプトも tty に書く — stderr リダイレクト時でもユーザーに表示される。
	fmt.Fprintf(tty, "\nUnknown peer fingerprint: %s\n", FingerprintShort(pub))
	fmt.Fprintf(tty, "Trust this peer? [y/N]: ")

	scanner := bufio.NewScanner(tty)
	if !scanner.Scan() {
		if err := scanner.Err(); err != nil {
			return fmt.Errorf("peer verification failed: TTY read error (timed out?): %w", err)
		}
		return fmt.Errorf("peer verification failed: could not read answer")
	}
	answer := strings.ToLower(strings.TrimSpace(scanner.Text()))
	if answer != "y" && answer != "yes" {
		return fmt.Errorf("peer not trusted: %s", FingerprintShort(pub))
	}

	kp.mu.Lock()
	defer kp.mu.Unlock()
	if _, ok := kp.cache[key]; ok {
		return nil
	}
	if err := kp.appendFile(key); err != nil {
		// ファイル書き込み失敗でもメモリ上は信頼済みとして扱い、
		// 同一セッション内での再プロンプトを防ぐ。
		fmt.Fprintf(os.Stderr, "warning: could not persist trusted peer: %v\n", err)
	}
	kp.cache[key] = struct{}{}
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
