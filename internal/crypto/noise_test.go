package crypto

import (
	"context"
	"io"
	"net"
	"sync"
	"testing"
	"time"
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

// TestNoiseStream_BidirectionalRoundTrip は CipherState の enc/dec 割り当てが
// 双方向で正しいことを検証する。enc/dec が逆なら R→I 方向の受信が失敗する。
func TestNoiseStream_BidirectionalRoundTrip(t *testing.T) {
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

	// I→R direction
	msg1 := []byte("initiator to responder")
	wg.Add(1)
	go func() {
		defer wg.Done()
		if _, err := initStream.Write(msg1); err != nil {
			t.Errorf("I→R write: %v", err)
		}
	}()
	got1 := make([]byte, len(msg1))
	if _, err := io.ReadFull(respStream, got1); err != nil {
		t.Fatalf("I→R read: %v", err)
	}
	wg.Wait()
	if string(got1) != string(msg1) {
		t.Errorf("I→R: got %q, want %q", got1, msg1)
	}

	// R→I direction
	msg2 := []byte("responder to initiator")
	wg.Add(1)
	go func() {
		defer wg.Done()
		if _, err := respStream.Write(msg2); err != nil {
			t.Errorf("R→I write: %v", err)
		}
	}()
	got2 := make([]byte, len(msg2))
	if _, err := io.ReadFull(initStream, got2); err != nil {
		t.Fatalf("R→I read: %v", err)
	}
	wg.Wait()
	if string(got2) != string(msg2) {
		t.Errorf("R→I: got %q, want %q", got2, msg2)
	}
}

// TestHandshakeFull_PeerStaticKey は HandshakeInitiatorFull/ResponderFull が
// 正しくピアの静的公開鍵を返すことを検証する。
func TestHandshakeFull_PeerStaticKey(t *testing.T) {
	a, b, cleanup := pipeRWPair()
	defer cleanup()

	initKey, _ := GenerateKeypair()
	respKey, _ := GenerateKeypair()

	var initPeerStatic, respPeerStatic []byte
	var initErr, respErr error
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		_, initPeerStatic, initErr = HandshakeInitiatorFull(a, initKey)
	}()
	go func() {
		defer wg.Done()
		_, respPeerStatic, respErr = HandshakeResponderFull(b, respKey)
	}()
	wg.Wait()

	if initErr != nil {
		t.Fatalf("initiator: %v", initErr)
	}
	if respErr != nil {
		t.Fatalf("responder: %v", respErr)
	}

	// initiator should see responder's public key and vice versa
	if string(initPeerStatic) != string(respKey.Public) {
		t.Errorf("initiator saw wrong peer key: got %x, want %x", initPeerStatic, respKey.Public)
	}
	if string(respPeerStatic) != string(initKey.Public) {
		t.Errorf("responder saw wrong peer key: got %x, want %x", respPeerStatic, initKey.Public)
	}
}

// TestHandshakeInitiatorCtx_Timeout は悪意あるピア (応答しない) に対して
// HandshakeInitiatorCtx がコンテキストの deadline 通りにタイムアウトすることを検証する (#479)。
// net.Conn を使うことで applyHandshakeDeadline の SetDeadline パスを実際に走らせる。
func TestHandshakeInitiatorCtx_Timeout(t *testing.T) {
	// net.Pipe() は両端が net.Conn なので SetDeadline が機能する。
	client, server := net.Pipe()
	defer client.Close()
	defer server.Close()

	key, err := GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	// 短い deadline を持つ ctx を渡す。ピア側は何も送らない。
	deadline := time.Now().Add(150 * time.Millisecond)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	done := make(chan error, 1)
	go func() {
		_, err := HandshakeInitiatorCtx(ctx, client, key)
		done <- err
	}()

	select {
	case err := <-done:
		if err == nil {
			t.Fatal("expected timeout error, got nil")
		}
		// 実際の経過時間が deadline を大幅に超えていないことを確認する。
		// (goroutine リークがなく正しく中断された証拠)
		elapsed := time.Since(deadline)
		if elapsed > 2*time.Second {
			t.Errorf("handshake returned %v after deadline by %v — possible goroutine block", err, elapsed)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("HandshakeInitiatorCtx did not return after deadline — goroutine leaked")
	}
}

// TestHandshakeResponderCtx_Timeout は悪意あるピア (応答しない) に対して
// HandshakeResponderCtx がコンテキストの deadline 通りにタイムアウトすることを検証する (#479)。
func TestHandshakeResponderCtx_Timeout(t *testing.T) {
	client, server := net.Pipe()
	defer client.Close()
	defer server.Close()

	key, err := GenerateKeypair()
	if err != nil {
		t.Fatal(err)
	}

	deadline := time.Now().Add(150 * time.Millisecond)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	done := make(chan error, 1)
	go func() {
		// responder は最初に recv を呼ぶので、クライアントが何も送らなければすぐにブロックする。
		_, err := HandshakeResponderCtx(ctx, server, key)
		done <- err
	}()

	select {
	case err := <-done:
		if err == nil {
			t.Fatal("expected timeout error, got nil")
		}
		elapsed := time.Since(deadline)
		if elapsed > 2*time.Second {
			t.Errorf("handshake returned %v after deadline by %v — possible goroutine block", err, elapsed)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("HandshakeResponderCtx did not return after deadline — goroutine leaked")
	}
}
