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
	"sync"
	"time"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
	"github.com/flipslidersand/mesh-drop/internal/transfer"
)

//go:embed static
var staticFiles embed.FS

// ProgressEvent は SSE で送る進捗イベント。
type ProgressEvent struct {
	ID      string  `json:"id"`
	File    string  `json:"file"`
	Peer    string  `json:"peer"`
	Sent    int64   `json:"sent"`
	Total   int64   `json:"total"`
	Done    bool    `json:"done"`
	ErrMsg  string  `json:"error,omitempty"`
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

// Server は meshdrop UI の HTTP サーバ。
type Server struct {
	addr    string
	timeout time.Duration
	hub     *hub
}

func New(addr string, discoverTimeout time.Duration) *Server {
	return &Server{addr: addr, timeout: discoverTimeout, hub: newHub()}
}

func (s *Server) Run(ctx context.Context) error {
	mux := http.NewServeMux()

	sub, _ := fs.Sub(staticFiles, "static")
	mux.Handle("/", http.FileServer(http.FS(sub)))
	mux.HandleFunc("/api/peers", s.handlePeers)
	mux.HandleFunc("/api/send", s.handleSend)
	mux.HandleFunc("/sse/progress", s.handleSSE)

	srv := &http.Server{Addr: s.addr, Handler: mux}
	go func() {
		<-ctx.Done()
		srv.Shutdown(context.Background()) //nolint:errcheck
	}()
	return srv.ListenAndServe()
}

// handlePeers returns discovered mDNS peers as JSON.
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

// handleSend receives a multipart upload and sends to the chosen peer.
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

	// Write to temp file so transfer.Send can stat it.
	tmp, err := os.CreateTemp("", "meshdrop-ui-*-"+filepath.Base(header.Filename))
	if err != nil {
		http.Error(w, "temp file: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer os.Remove(tmp.Name())

	if _, err := io.Copy(tmp, file); err != nil {
		tmp.Close()
		http.Error(w, "write temp: "+err.Error(), http.StatusInternalServerError)
		return
	}
	tmp.Close()

	id := fmt.Sprintf("%d", time.Now().UnixNano())
	go func() {
		err := transfer.Send(r.Context(), peerAddr, tmp.Name(), 4, nil, nil, false, 0)
		ev := ProgressEvent{ID: id, File: header.Filename, Peer: peerAddr, Done: true}
		if err != nil {
			ev.ErrMsg = err.Error()
		}
		s.hub.publish(ev)
	}()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"id": id}) //nolint:errcheck
}

// handleSSE streams ProgressEvents to browser via Server-Sent Events.
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
