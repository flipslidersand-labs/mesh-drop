package nat

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
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

type rdv struct {
	addrA string     // 最初に登録したピア (受信側)
	chB   chan string // 2番目のピア (送信側) が登録すると addrA の待機を解除
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
	return http.ListenAndServe(addr, s.Handler())
}

func (s *RelayServer) handleCreate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}
	code := randomCode(6)
	s.mu.Lock()
	s.sessions[code] = &rdv{chB: make(chan string, 1)}
	s.mu.Unlock()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"code": code}) //nolint:errcheck
}

func (s *RelayServer) handleJoin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}
	code := strings.TrimPrefix(r.URL.Path, "/session/")
	body, _ := io.ReadAll(io.LimitReader(r.Body, 64))
	myAddr := strings.TrimSpace(string(body))
	if myAddr == "" {
		http.Error(w, "body must be external addr (ip:port)", http.StatusBadRequest)
		return
	}

	s.mu.Lock()
	sess, ok := s.sessions[code]
	s.mu.Unlock()
	if !ok {
		http.Error(w, "session not found", http.StatusNotFound)
		return
	}

	var peerAddr string
	if sess.addrA == "" {
		// 最初の登録 (受信側): 送信側が来るまで待機
		sess.addrA = myAddr
		ctx, cancel := context.WithTimeout(r.Context(), 60*time.Second)
		defer cancel()
		select {
		case peerAddr = <-sess.chB:
		case <-ctx.Done():
			http.Error(w, "timeout: peer did not connect within 60s", http.StatusRequestTimeout)
			return
		}
	} else {
		// 2番目の登録 (送信側): 受信側を即時解除してピアアドレスを交換
		peerAddr = sess.addrA
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
	b := make([]byte, n)
	for i := range b {
		b[i] = alpha[rand.Intn(len(alpha))]
	}
	return string(b)
}
