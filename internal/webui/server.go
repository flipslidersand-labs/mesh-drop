package webui

import (
	"context"
	"embed"
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"mime"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
	"github.com/flipslidersand/mesh-drop/internal/transfer"
	"golang.org/x/time/rate"
)

//go:embed static
var staticFiles embed.FS

// rateLimiter manages per-IP token-bucket limiters.
// lastSeen tracks the most recent request time per IP so that evict can
// remove only idle entries rather than resetting all buckets at once.
type rateLimiter struct {
	mu       sync.Mutex
	visitors map[string]*rate.Limiter
	lastSeen map[string]time.Time
}

// idleTimeout is how long an IP must be silent before its limiter is evicted.
const idleTimeout = 5 * time.Minute

// newRateLimiter creates a rateLimiter and starts the background eviction
// goroutine.  The goroutine stops when ctx is cancelled, preventing goroutine
// leaks after the Server is shut down.
func newRateLimiter(ctx context.Context) *rateLimiter {
	rl := &rateLimiter{
		visitors: make(map[string]*rate.Limiter),
		lastSeen: make(map[string]time.Time),
	}
	go rl.evict(ctx)
	return rl
}

// getVisitor returns (creating if necessary) a Limiter for the given IP.
// Configured at 30 req/min (one token every 2 s) with a burst of 10.
// lastSeen is updated on every access so that active IPs are not evicted.
func (rl *rateLimiter) getVisitor(ip string) *rate.Limiter {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	rl.lastSeen[ip] = time.Now()
	if lim, ok := rl.visitors[ip]; ok {
		return lim
	}
	lim := rate.NewLimiter(rate.Every(2*time.Second), 10)
	rl.visitors[ip] = lim
	return lim
}

// evict removes only IP entries that have been idle for longer than
// idleTimeout.  This preserves the token-bucket state of active IPs so that
// rate limiting is not inadvertently reset.  The goroutine exits when ctx is
// cancelled, eliminating the goroutine leak that existed previously.
func (rl *rateLimiter) evict(ctx context.Context) {
	t := time.NewTicker(time.Minute)
	defer t.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case now := <-t.C:
			rl.mu.Lock()
			for ip, ts := range rl.lastSeen {
				if now.Sub(ts) > idleTimeout {
					delete(rl.visitors, ip)
					delete(rl.lastSeen, ip)
				}
			}
			rl.mu.Unlock()
		}
	}
}

// middleware returns an http.Handler that enforces per-IP rate limits.
func (rl *rateLimiter) middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip, _, err := net.SplitHostPort(r.RemoteAddr)
		if err != nil {
			ip = r.RemoteAddr
		}
		if !rl.getVisitor(ip).Allow() {
			http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// ProgressEvent is sent over SSE for both send and receive events.
type ProgressEvent struct {
	ID        string `json:"id"`
	Direction string `json:"direction"` // "send" | "recv"
	File      string `json:"file"`
	Peer      string `json:"peer"`
	Sent      int64  `json:"sent,omitempty"`
	Total     int64  `json:"total,omitempty"`
	Done      bool   `json:"done"`
	ErrMsg    string `json:"error,omitempty"`
	ElapsedMs int64  `json:"elapsed_ms,omitempty"`
	SpeedBps  int64  `json:"speed_bps,omitempty"`
	EtaMs     int64  `json:"eta_ms,omitempty"`
}

// HistoryEntry records a completed transfer.
type HistoryEntry struct {
	ID        string    `json:"id"`
	Direction string    `json:"direction"`
	File      string    `json:"file"`
	Peer      string    `json:"peer"`
	Size      int64     `json:"size"`
	ErrMsg    string    `json:"error,omitempty"`
	At        time.Time `json:"at"`
}

type hub struct {
	mu      sync.Mutex
	clients map[chan ProgressEvent]struct{}
}

func newHub() *hub {
	return &hub{clients: make(map[chan ProgressEvent]struct{})}
}

func (h *hub) subscribe() chan ProgressEvent {
	ch := make(chan ProgressEvent, 32)
	h.mu.Lock()
	h.clients[ch] = struct{}{}
	h.mu.Unlock()
	return ch
}

func (h *hub) unsubscribe(ch chan ProgressEvent) {
	h.mu.Lock()
	delete(h.clients, ch)
	h.mu.Unlock()
}

func (h *hub) publish(e ProgressEvent) {
	h.mu.Lock()
	defer h.mu.Unlock()
	for ch := range h.clients {
		select {
		case ch <- e:
		default:
		}
	}
}

// Server is the meshdrop Web UI HTTP server.
type Server struct {
	AuthToken string // optional Bearer token; if set, all requests must authenticate
	HistPath  string // path to history.json for persistence; empty = in-memory only

	addr    string
	timeout time.Duration
	hub     *hub
	runCtx  context.Context

	histMu  sync.Mutex
	history []HistoryEntry

	dlMu      sync.RWMutex
	downloads map[string]string // id → abs file path
	recvDir   string
}

func New(addr string, discoverTimeout time.Duration) *Server {
	return &Server{
		addr:      addr,
		timeout:   discoverTimeout,
		hub:       newHub(),
		runCtx:    context.Background(),
		downloads: make(map[string]string),
	}
}

// loadHistory reads persisted history from HistPath into s.history.
// Errors are silently ignored — the server starts with empty history on failure.
func (s *Server) loadHistory() {
	if s.HistPath == "" {
		return
	}
	data, err := os.ReadFile(s.HistPath)
	if err != nil {
		return
	}
	var h []HistoryEntry
	if err := json.Unmarshal(data, &h); err != nil {
		return
	}
	s.histMu.Lock()
	s.history = h
	s.histMu.Unlock()
}

// appendHistory adds entry to in-memory history and persists to disk (best-effort).
func (s *Server) appendHistory(entry HistoryEntry) {
	s.histMu.Lock()
	s.history = append(s.history, entry)
	snapshot := make([]HistoryEntry, len(s.history))
	copy(snapshot, s.history)
	s.histMu.Unlock()

	if s.HistPath != "" {
		_ = s.saveHistory(snapshot)
	}
}

// saveHistory atomically writes history to HistPath via a temp file + rename.
func (s *Server) saveHistory(h []HistoryEntry) error {
	if err := os.MkdirAll(filepath.Dir(s.HistPath), 0o700); err != nil {
		return err
	}
	data, err := json.Marshal(h)
	if err != nil {
		return err
	}
	tmp := s.HistPath + ".tmp"
	if err := os.WriteFile(tmp, data, 0o600); err != nil {
		return err
	}
	return os.Rename(tmp, s.HistPath)
}

func (s *Server) Run(ctx context.Context) error {
	s.runCtx = ctx
	s.loadHistory()
	// Create persistent recv dir for the session.
	recvDir, err := os.MkdirTemp("", "meshdrop-ui-recv-*")
	if err != nil {
		return fmt.Errorf("recv dir: %w", err)
	}
	s.recvDir = recvDir
	defer os.RemoveAll(recvDir)

	go s.runReceiver(ctx, recvDir)

	rl := newRateLimiter(ctx)

	mux := http.NewServeMux()

	sub, _ := fs.Sub(staticFiles, "static")
	mux.Handle("/", http.FileServer(http.FS(sub)))
	mux.Handle("/api/peers", rl.middleware(http.HandlerFunc(s.handlePeers)))
	mux.Handle("/api/send", rl.middleware(http.HandlerFunc(s.handleSend)))
	mux.Handle("/api/send-dir", rl.middleware(http.HandlerFunc(s.handleSendDir)))
	mux.Handle("/api/history", rl.middleware(http.HandlerFunc(s.handleHistory)))
	mux.Handle("/api/downloads/", rl.middleware(http.HandlerFunc(s.handleDownload)))
	mux.Handle("/sse/progress", rl.middleware(http.HandlerFunc(s.handleSSE)))

	srv := &http.Server{Addr: s.addr, Handler: authMiddleware(s.AuthToken, secureHeaders(mux))}
	go func() {
		<-ctx.Done()
		shutCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		_ = srv.Shutdown(shutCtx)
	}()
	return srv.ListenAndServe()
}

func (s *Server) handlePeers(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), s.timeout)
	defer cancel()

	peers, err := discovery.Browse(ctx, s.timeout)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	type peerDTO struct {
		Name string `json:"name"`
		Addr string `json:"addr"`
	}
	out := make([]peerDTO, len(peers))
	for i, p := range peers {
		out[i] = peerDTO{Name: p.Name, Addr: p.Addr()}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(out) //nolint:errcheck
}

// handleHistory returns the in-memory transfer history (newest first, max 50).
func (s *Server) handleHistory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	s.histMu.Lock()
	h := make([]HistoryEntry, len(s.history))
	copy(h, s.history)
	s.histMu.Unlock()

	if len(h) > 50 {
		h = h[len(h)-50:]
	}
	for i, j := 0, len(h)-1; i < j; i, j = i+1, j-1 {
		h[i], h[j] = h[j], h[i]
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(h) //nolint:errcheck
}

// maxSingleFileUpload is the maximum allowed upload body size for a single file.
// Declared as a package-level var so tests can override it without sending 512 MiB.
var maxSingleFileUpload = int64(512 << 20) // 512 MiB (#257)

func (s *Server) handleSend(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, maxSingleFileUpload)
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		status := http.StatusBadRequest
		if strings.Contains(err.Error(), "request body too large") {
			status = http.StatusRequestEntityTooLarge
		}
		http.Error(w, "parse form: "+err.Error(), status)
		return
	}
	peerAddr := r.FormValue("peer")
	if peerAddr == "" {
		http.Error(w, "peer is required", http.StatusBadRequest)
		return
	}
	if _, _, err := net.SplitHostPort(peerAddr); err != nil {
		http.Error(w, "peer must be host:port", http.StatusBadRequest)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "file is required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	tmp, err := os.CreateTemp("", "meshdrop-ui-*-"+filepath.Base(header.Filename))
	if err != nil {
		http.Error(w, "temp file: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := io.Copy(tmp, file); err != nil {
		tmp.Close()
		os.Remove(tmp.Name())
		http.Error(w, "write temp: "+err.Error(), http.StatusInternalServerError)
		return
	}
	tmp.Close()

	// Optional: rate-limit and compression settings (#239).
	rateLimitStr := strings.TrimSpace(r.FormValue("rate_limit"))
	compress := r.FormValue("compress") == "true"
	compLevel, _ := strconv.Atoi(r.FormValue("compress_level"))

	lim, limErr := transfer.ParseRateLimit(rateLimitStr)
	if limErr != nil {
		os.Remove(tmp.Name())
		http.Error(w, limErr.Error(), http.StatusBadRequest)
		return
	}

	id := fmt.Sprintf("%d", time.Now().UnixNano())
	total := header.Size

	go func() {
		defer os.Remove(tmp.Name())

		start := time.Now()

		// Publish heartbeat progress events while sending (#238).
		done := make(chan struct{})
		go func() {
			ticker := time.NewTicker(300 * time.Millisecond)
			defer ticker.Stop()
			pct := int64(0)
			for {
				select {
				case <-done:
					return
				case <-ticker.C:
					// Increment by a small amount so the bar is animated;
					// exact bytes are not available without deeper integration.
					if pct < total*9/10 {
						pct += total / 20
					}
					elapsed := time.Since(start)
					elapsedMs := elapsed.Milliseconds()
					speedBps := int64(0)
					if elapsed.Seconds() > 0 {
						speedBps = int64(float64(pct) / elapsed.Seconds())
					}
					etaMs := int64(0)
					if speedBps > 0 && total > pct {
						etaMs = int64(float64(total-pct) / float64(speedBps) * 1000)
					}
					s.hub.publish(ProgressEvent{
						ID: id, Direction: "send",
						File: header.Filename, Peer: peerAddr,
						Sent: pct, Total: total,
						ElapsedMs: elapsedMs, SpeedBps: speedBps, EtaMs: etaMs,
					})
				}
			}
		}()

		sendErr := transfer.Send(s.runCtx, peerAddr, tmp.Name(), 4, nil, lim, compress, compLevel, false)
		close(done)

		elapsed := time.Since(start)
		elapsedMs := elapsed.Milliseconds()
		finalSpeedBps := int64(0)
		if elapsed.Seconds() > 0 {
			finalSpeedBps = int64(float64(total) / elapsed.Seconds())
		}

		ev := ProgressEvent{
			ID: id, Direction: "send",
			File: header.Filename, Peer: peerAddr,
			Sent: total, Total: total, Done: true,
			ElapsedMs: elapsedMs, SpeedBps: finalSpeedBps,
		}
		if sendErr != nil {
			ev.ErrMsg = sendErr.Error()
			ev.Sent = 0
		}
		s.hub.publish(ev)

		entry := HistoryEntry{
			ID: id, Direction: "send",
			File: header.Filename, Peer: peerAddr,
			Size: total, At: time.Now(),
		}
		if sendErr != nil {
			entry.ErrMsg = sendErr.Error()
		}
		s.appendHistory(entry)
	}()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"id": id}) //nolint:errcheck
}

func (s *Server) handleSendDir(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}
	const (
		maxDirUploadSize = int64(2 << 30)
		multipartMemory  = 32 << 20
	)
	r.Body = http.MaxBytesReader(w, r.Body, maxDirUploadSize)
	if err := r.ParseMultipartForm(multipartMemory); err != nil {
		status := http.StatusBadRequest
		if strings.Contains(err.Error(), "request body too large") {
			status = http.StatusRequestEntityTooLarge
		}
		http.Error(w, "parse form: "+err.Error(), status)
		return
	}
	peerAddr := r.FormValue("peer")
	if peerAddr == "" {
		http.Error(w, "peer is required", http.StatusBadRequest)
		return
	}
	if _, _, err := net.SplitHostPort(peerAddr); err != nil {
		http.Error(w, "peer must be host:port", http.StatusBadRequest)
		return
	}
	fileHeaders := r.MultipartForm.File["files"]
	if len(fileHeaders) == 0 {
		http.Error(w, "files is required", http.StatusBadRequest)
		return
	}
	var paths []string
	if err := json.Unmarshal([]byte(r.FormValue("paths")), &paths); err != nil || len(paths) != len(fileHeaders) {
		http.Error(w, "paths must be a JSON array matching files length", http.StatusBadRequest)
		return
	}

	rateLimitStr := strings.TrimSpace(r.FormValue("rate_limit"))
	compress := r.FormValue("compress") == "true"
	compLevel, _ := strconv.Atoi(r.FormValue("compress_level"))
	lim, limErr := transfer.ParseRateLimit(rateLimitStr)
	if limErr != nil {
		http.Error(w, limErr.Error(), http.StatusBadRequest)
		return
	}

	tmpDir, err := os.MkdirTemp("", "meshdrop-ui-dir-*")
	if err != nil {
		http.Error(w, "temp dir: "+err.Error(), http.StatusInternalServerError)
		return
	}
	absBase, _ := filepath.Abs(tmpDir)

	var totalSize int64
	var topDir string
	for i, fh := range fileHeaders {
		cleanPath := filepath.Clean(filepath.ToSlash(paths[i]))
		if cleanPath == "." || cleanPath == ".." || strings.HasPrefix(cleanPath, "../") || filepath.IsAbs(cleanPath) {
			os.RemoveAll(tmpDir)
			http.Error(w, "invalid path: "+paths[i], http.StatusBadRequest)
			return
		}
		slash := strings.IndexByte(cleanPath, '/')
		if slash <= 0 || i == 0 && slash == len(cleanPath)-1 {
			os.RemoveAll(tmpDir)
			http.Error(w, "invalid directory path: "+paths[i], http.StatusBadRequest)
			return
		}
		currentTop := cleanPath[:slash]
		if topDir == "" {
			topDir = currentTop
		} else if topDir != currentTop {
			os.RemoveAll(tmpDir)
			http.Error(w, "all files must be from one top-level directory", http.StatusBadRequest)
			return
		}
		relPath := filepath.FromSlash(cleanPath)
		absOut, _ := filepath.Abs(filepath.Join(absBase, relPath))
		rel, relErr := filepath.Rel(absBase, absOut)
		if relErr != nil || strings.HasPrefix(rel, "..") || filepath.IsAbs(rel) {
			os.RemoveAll(tmpDir)
			http.Error(w, "invalid path: "+paths[i], http.StatusBadRequest)
			return
		}
		if err := os.MkdirAll(filepath.Dir(absOut), 0o755); err != nil {
			os.RemoveAll(tmpDir)
			http.Error(w, "mkdir: "+err.Error(), http.StatusInternalServerError)
			return
		}
		src, err := fh.Open()
		if err != nil {
			os.RemoveAll(tmpDir)
			http.Error(w, "open upload: "+err.Error(), http.StatusInternalServerError)
			return
		}
		f, err := os.Create(absOut)
		if err != nil {
			src.Close()
			os.RemoveAll(tmpDir)
			http.Error(w, "create: "+err.Error(), http.StatusInternalServerError)
			return
		}
		_, err = io.Copy(f, src)
		src.Close()
		f.Close()
		if err != nil {
			os.RemoveAll(tmpDir)
			http.Error(w, "write: "+err.Error(), http.StatusInternalServerError)
			return
		}
		totalSize += fh.Size
	}

	// webkitRelativePath is always "dirName/..." — extract the top-level dir.
	dirName := topDir
	sendPath := filepath.Join(tmpDir, dirName)

	id := fmt.Sprintf("%d", time.Now().UnixNano())
	total := totalSize

	go func() {
		defer os.RemoveAll(tmpDir)

		start := time.Now()

		// #319: 擬似タイマーを削除し、progressFn で実転送バイト数を配信する。
		progressFn := func(sent, tot int64) {
			elapsed := time.Since(start)
			elapsedMs := elapsed.Milliseconds()
			speedBps := int64(0)
			if elapsed.Seconds() > 0 {
				speedBps = int64(float64(sent) / elapsed.Seconds())
			}
			etaMs := int64(0)
			if speedBps > 0 && tot > sent {
				etaMs = int64(float64(tot-sent) / float64(speedBps) * 1000)
			}
			s.hub.publish(ProgressEvent{
				ID: id, Direction: "send",
				File: dirName, Peer: peerAddr,
				Sent: sent, Total: tot,
				ElapsedMs: elapsedMs, SpeedBps: speedBps, EtaMs: etaMs,
			})
		}

		sendErr := transfer.SendDir(s.runCtx, peerAddr, sendPath, 4, nil, lim, compress, compLevel, false, progressFn)

		elapsed := time.Since(start)
		elapsedMs := elapsed.Milliseconds()
		finalSpeedBps := int64(0)
		if elapsed.Seconds() > 0 {
			finalSpeedBps = int64(float64(total) / elapsed.Seconds())
		}

		ev := ProgressEvent{
			ID: id, Direction: "send",
			File: dirName, Peer: peerAddr,
			Sent: total, Total: total, Done: true,
			ElapsedMs: elapsedMs, SpeedBps: finalSpeedBps,
		}
		if sendErr != nil {
			ev.ErrMsg = sendErr.Error()
			ev.Sent = 0
		}
		s.hub.publish(ev)

		entry := HistoryEntry{
			ID: id, Direction: "send",
			File: dirName, Peer: peerAddr,
			Size: total, At: time.Now(),
		}
		if sendErr != nil {
			entry.ErrMsg = sendErr.Error()
		}
		s.appendHistory(entry)
	}()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"id": id}) //nolint:errcheck
}

func (s *Server) handleSSE(w http.ResponseWriter, r *http.Request) {
	fl, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "SSE not supported", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	ch := s.hub.subscribe()
	defer s.hub.unsubscribe(ch)

	for {
		select {
		case <-r.Context().Done():
			return
		case ev := <-ch:
			data, _ := json.Marshal(ev)
			fmt.Fprintf(w, "data: %s\n\n", data)
			fl.Flush()
		}
	}
}

// handleDownload serves a received file for browser download.
func (s *Server) handleDownload(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/api/downloads/")
	s.dlMu.RLock()
	path, ok := s.downloads[id]
	s.dlMu.RUnlock()
	if !ok {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	name := filepath.Base(path)
	// #258: mime.FormatMediaType で RFC 6266 準拠のエスケープを行う
	w.Header().Set("Content-Disposition", mime.FormatMediaType("attachment", map[string]string{"filename": name}))
	http.ServeFile(w, r, path)
}

// authMiddleware enforces optional Bearer-token authentication.
// When token is empty the middleware is a no-op (backward-compatible).
// Clients may supply the token via the Authorization header ("Bearer <token>")
// or via the "token" query parameter.
func authMiddleware(token string, next http.Handler) http.Handler {
	if token == "" {
		return next // no auth configured — pass through
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		bearer := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		query := r.URL.Query().Get("token")
		if bearer != token && query != token {
			w.Header().Set("WWW-Authenticate", `Bearer realm="meshdrop"`)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// secureHeaders sets security-related HTTP response headers on every response.
func secureHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "no-referrer")
		w.Header().Set("Content-Security-Policy", "default-src 'self'")
		next.ServeHTTP(w, r)
	})
}

// runReceiver starts a QUIC listener that accepts incoming transfers in a loop.
// Received files land in recvDir and become available via /api/downloads/{id}.
func (s *Server) runReceiver(ctx context.Context, recvDir string) {
	bundle, err := transfer.NewTLSBundle()
	if err != nil {
		return
	}
	go discovery.Advertise(ctx, discovery.DefaultPort, bundle.Fingerprint) //nolint:errcheck

	addr := fmt.Sprintf("0.0.0.0:%d", discovery.DefaultPort)
	_ = transfer.ListenContinuous(ctx, addr, bundle, recvDir, func(name, path string, size int64, peer string) {
		id := fmt.Sprintf("recv-%d", time.Now().UnixNano())

		s.dlMu.Lock()
		s.downloads[id] = path
		s.dlMu.Unlock()

		s.hub.publish(ProgressEvent{
			ID: id, Direction: "recv",
			File: name, Peer: peer,
			Sent: size, Total: size, Done: true,
		})
		s.appendHistory(HistoryEntry{
			ID: id, Direction: "recv",
			File: name, Peer: peer,
			Size: size, At: time.Now(),
		})
	})
}

