package crypto

import (
	"io"
	"sync"
	"testing"
)

type rwPair struct {
	io.Reader
	io.Writer
}

// pipeRWPair は双方向パイプを返す。a.Write → b.Read、b.Write → a.Read。
func pipeRWPair() (rwPair, rwPair, func()) {
	r1, w1 := io.Pipe()
	r2, w2 := io.Pipe()
	return rwPair{r2, w1}, rwPair{r1, w2}, func() {
		w1.Close()
		w2.Close()
	}
}

func TestNoiseHandshake_Completes(t *testing.T) {
	a, b, cleanup := pipeRWPair()
	defer cleanup()

	initKey, err := GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}
	respKey, err := GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	var initStream, respStream *NoiseStream
	var initErr, respErr error
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		initStream, initErr = HandshakeInitiator(a, initKey)
	}()
	go func() {
		defer wg.Done()
		respStream, respErr = HandshakeResponder(b, respKey)
	}()
	wg.Wait()

	if initErr != nil {
		t.Fatalf("initiator: %v", initErr)
	}
	if respErr != nil {
		t.Fatalf("responder: %v", respErr)
	}
	if initStream == nil || respStream == nil {
		t.Fatal("nil stream after handshake")
	}
}

func TestNoiseStream_RoundTrip(t *testing.T) {
	a, b, cleanup := pipeRWPair()
	defer cleanup()

	initKey, _ := GenerateKeypair()
	respKey, _ := GenerateKeypair()

	var initStream, respStream *NoiseStream
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		initStream, _ = HandshakeInitiator(a, initKey)
	}()
	go func() {
		defer wg.Done()
		respStream, _ = HandshakeResponder(b, respKey)
	}()
	wg.Wait()

	msg := []byte("hello secure meshdrop")

	wg.Add(1)
	go func() {
		defer wg.Done()
		if _, err := initStream.Write(msg); err != nil {
			t.Errorf("write: %v", err)
		}
	}()

	got := make([]byte, len(msg))
	if _, err := io.ReadFull(respStream, got); err != nil {
		t.Fatalf("read: %v", err)
	}
	wg.Wait()

	if string(got) != string(msg) {
		t.Errorf("got %q, want %q", got, msg)
	}
}

func TestNoiseStream_LargePayload(t *testing.T) {
	a, b, cleanup := pipeRWPair()
	defer cleanup()

	initKey, _ := GenerateKeypair()
	respKey, _ := GenerateKeypair()

	var initStream, respStream *NoiseStream
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		initStream, _ = HandshakeInitiator(a, initKey)
	}()
	go func() {
		defer wg.Done()
		respStream, _ = HandshakeResponder(b, respKey)
	}()
	wg.Wait()

	// maxChunk を超えるペイロード (2 メッセージに分割される)
	payload := make([]byte, maxChunk+1024)
	for i := range payload {
		payload[i] = byte(i % 251)
	}

	wg.Add(1)
	go func() {
		defer wg.Done()
		initStream.Write(payload)
	}()

	got := make([]byte, len(payload))
	if _, err := io.ReadFull(respStream, got); err != nil {
		t.Fatalf("read large: %v", err)
	}
	wg.Wait()

	for i, b := range got {
		if b != payload[i] {
			t.Fatalf("mismatch at byte %d: got %d, want %d", i, b, payload[i])
		}
	}
}
