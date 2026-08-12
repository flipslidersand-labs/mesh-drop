package nat

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"
)

// RelayServer は2ピアのアドレスを交換するランデブーサーバー。
// 受信側が CreateSession でコードを取得し、送受信双方が Rendezvous を呼ぶと
// 互いの外部アドレスを返す (long-poll 方式)。
type RelayServer struct {
	mu       sync.Mutex
	sessions map[string]*rdv
}

// maxSessions はメモリ枯渇防止のためのセッション数上限。
const maxSessions = 10_000

// sessionTTL は handleJoin が一度も呼ばれなかったセッションの有効期限。
// handleJoin 内の long-poll タイムアウト (60s) より余裕を持たせる。
const sessionTTL = 70 * time.Second

type rdv struct {
	mu    sync.Mutex  // addrA の読み書きを保護する
	addrA string      // 最初に登録したピア (受信側)
	chB   chan string // 2番目のピア (送信側) が登録すると addrA の待機を解除
	done  chan struct{} // ランデブー完了またはタイムアウトで close される
}

func NewRelayServer() *RelayServer {
	return &RelayServer{sessions: make(map[string]*rdv)}
}

func (s *RelayServer) Handler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/session", s.handleCreate)
	mux.HandleFunc("/session/", s.handleJoin)
	return mux
}

// Start は addr でリレーサーバーを起動する (ブロッキング)。
func (s *RelayServer) Start(addr string) error {
	srv := &http.Server{
		Addr:         addr,
		Handler:      s.Handler(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 70 * time.Second, // rendezvous long-poll は最大 60s
		IdleTimeout:  60 * time.Second,
	}
	return srv.ListenAndServe()
}

func (s *RelayServer) handleCreate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}
	sess := &rdv{chB: make(chan string, 1), done: make(chan struct{})}

	// コード生成・上限チェック・挿入をロック内で行い、重複コードの上書きを防ぐ。
	s.mu.Lock()
	if len(s.sessions) >= maxSessions {
		s.mu.Unlock()
		http.Error(w, "too many sessions", http.StatusServiceUnavailable)
		return
	}
	var code string
	for {
		code = randomCode(6)
		if _, exists := s.sessions[code]; !exists {
			break
		}
	}
	s.sessions[code] = sess
	s.mu.Unlock()

	// handleJoin が一度も呼ばれない場合の TTL クリーンアップ。
	go func() {
		select {
		case <-sess.done:
		case <-time.After(sessionTTL):
			s.mu.Lock()
			delete(s.sessions, code)
			s.mu.Unlock()
		}
	}()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"code": code}) //nolint:errcheck
}

func (s *RelayServer) handleJoin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}
	code := strings.TrimPrefix(r.URL.Path, "/session/")
	// 64 バイト上限: IPv6 アドレス最大長 ([xxxx:...:xxxx]:65535) は約 47 文字で収まる
	const maxAddrLen = 64
	body, _ := io.ReadAll(io.LimitReader(r.Body, maxAddrLen+1))
	if len(body) > maxAddrLen {
		http.Error(w, "address too long", http.StatusBadRequest)
		return
	}
	myAddr := strings.TrimSpace(string(body))
	if myAddr == "" {
		http.Error(w, "body must be external addr (ip:port)", http.StatusBadRequest)
		return
	}
	if _, _, err := net.SplitHostPort(myAddr); err != nil {
		http.Error(w, "invalid addr format: "+err.Error(), http.StatusBadRequest)
		return
	}

	s.mu.Lock()
	sess, ok := s.sessions[code]
	s.mu.Unlock()
	if !ok {
		http.Error(w, "session not found", http.StatusNotFound)
		return
	}

	// addrA の判定と書き込みを rdv のミューテックスで保護する。
	// 2接続が同時に sess.addrA == "" を見て両方が "最初の登録者" になるのを防ぐ。
	sess.mu.Lock()
	isFirst := sess.addrA == ""
	if isFirst {
		sess.addrA = myAddr
	}
	peerAddrA := sess.addrA // 2番目登録者が使う
	sess.mu.Unlock()

	var peerAddr string
	if isFirst {
		// 最初の登録 (受信側): 送信側が来るまで待機
		ctx, cancel := context.WithTimeout(r.Context(), 60*time.Second)
		defer cancel()
		select {
		case peerAddr = <-sess.chB:
			// ランデブー完了 — セッションを削除して TTL ゴルーチンを終了させる
			s.mu.Lock()
			delete(s.sessions, code)
			s.mu.Unlock()
			close(sess.done)
		case <-ctx.Done():
			s.mu.Lock()
			delete(s.sessions, code)
			s.mu.Unlock()
			close(sess.done)
			http.Error(w, "timeout: peer did not connect within 60s", http.StatusRequestTimeout)
			return
		}
	} else {
		// 2番目の登録 (送信側): 受信側を即時解除してピアアドレスを交換
		peerAddr = peerAddrA
		sess.chB <- myAddr
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"peer": peerAddr}) //nolint:errcheck
}

// CreateSession は relayURL に新しいセッションを作成してペアリングコードを返す。
func CreateSession(relayURL string) (string, error) {
	resp, err := http.Post(relayURL+"/session", "text/plain", nil)
	if err != nil {
		return "", fmt.Errorf("relay create: %w", err)
	}
	defer resp.Body.Close()
	var r map[string]string
	if err := json.NewDecoder(resp.Body).Decode(&r); err != nil {
		return "", fmt.Errorf("relay decode: %w", err)
	}
	code, ok := r["code"]
	if !ok {
		return "", fmt.Errorf("relay: missing code in response")
	}
	return code, nil
}

// Rendezvous は code セッションに myAddr を登録し、ピアの外部アドレスを返す。
// 最初の呼び出しはピアが登録するまで最大 60 秒ブロックする。
func Rendezvous(relayURL, code, myAddr string) (string, error) {
	client := &http.Client{Timeout: 70 * time.Second}
	resp, err := client.Post(
		relayURL+"/session/"+code,
		"text/plain",
		strings.NewReader(myAddr),
	)
	if err != nil {
		return "", fmt.Errorf("relay join: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		b, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("relay: %s", strings.TrimSpace(string(b)))
	}
	var r map[string]string
	if err := json.NewDecoder(resp.Body).Decode(&r); err != nil {
		return "", fmt.Errorf("relay decode: %w", err)
	}
	peer, ok := r["peer"]
	if !ok {
		return "", fmt.Errorf("relay: missing peer in response")
	}
	return peer, nil
}

func randomCode(n int) string {
	const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	// rejection sampling でモジュロバイアスを排除する。
	// 256 % 36 = 4 なのでバイト値 252-255 を棄却することで均一分布を保証する。
	const maxAccepted = byte(len(alpha) * (256 / len(alpha))) // = 252
	out := make([]byte, 0, n)
	buf := make([]byte, n+8) // 棄却分の余裕
	for len(out) < n {
		if _, err := rand.Read(buf); err != nil {
			panic(err)
		}
		for _, v := range buf {
			if len(out) == n {
				break
			}
			if v >= maxAccepted {
				continue
			}
			out = append(out, alpha[int(v)%len(alpha)])
		}
	}
	return string(out)
}
