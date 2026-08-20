package webui

import (
	"context"
	"embed"
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
	"github.com/flipslidersand/mesh-drop/internal/transfer"
)

//go:embed static
var staticFiles embed.FS

// ProgressEvent is sent over SSE for both send and receive events.
type ProgressEvent struct {
	ID        string `json:"id"`
	Direction string `json:"direction"` // "send"
	File      string `json:"file"`
	Peer      string `json:"peer"`
	Sent      int64  `json:"sent,omitempty"`
	Total     int64  `json:"total,omitempty"`
	Done      bool   `json:"done"`
	ErrMsg    string `json:"error,omitempty"`
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
	addr    string
	timeout time.Duration
	hub     *hub

	histMu  sync.Mutex
	history []HistoryEntry
}

func New(addr string, discoverTimeout time.Duration) *Server {
	return &Server{
		addr:    addr,
		timeout: discoverTimeout,
		hub:     newHub(),
	}
}

func (s *Server) Run(ctx context.Context) error {
	mux := http.NewServeMux()

	sub, _ := fs.Sub(staticFiles, "static")
	mux.Handle("/", http.FileServer(http.FS(sub)))
	mux.HandleFunc("/api/peers", s.handlePeers)
	mux.HandleFunc("/api/send", s.handleSend)
	mux.HandleFunc("/api/history", s.handleHistory)
	mux.HandleFunc("/sse/progress", s.handleSSE)

	srv := &http.Server{Addr: s.addr, Handler: mux}
	go func() {
		<-ctx.Done()
		srv.Shutdown(context.Background()) //nolint:errcheck
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

func (s *Server) handleSend(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}
	if err := r.ParseMultipartForm(512 << 20); err != nil {
		http.Error(w, "parse form: "+err.Error(), http.StatusBadRequest)
		return
	}
	peerAddr := r.FormValue("peer")
	if peerAddr == "" {
		http.Error(w, "peer is required", http.StatusBadRequest)
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
					s.hub.publish(ProgressEvent{
						ID: id, Direction: "send",
						File: header.Filename, Peer: peerAddr,
						Sent: pct, Total: total,
					})
				}
			}
		}()

		sendErr := transfer.Send(r.Context(), peerAddr, tmp.Name(), 4, nil, lim, compress, compLevel)
		close(done)

		ev := ProgressEvent{
			ID: id, Direction: "send",
			File: header.Filename, Peer: peerAddr,
			Sent: total, Total: total, Done: true,
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
		s.histMu.Lock()
		s.history = append(s.history, entry)
		s.histMu.Unlock()
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
