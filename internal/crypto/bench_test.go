package crypto

import (
	"io"
	"sync"
	"testing"
)

// setupNoiseStream performs a Noise_XX handshake over an in-process pipe and
// returns the initiator and responder NoiseStream instances.  It is a helper
// shared by all benchmarks in this file.
func setupNoiseStream(tb testing.TB) (init_ *NoiseStream, resp *NoiseStream, cleanup func()) {
	tb.Helper()
	a, b, closePipes := pipeRWPair()

	initKey, err := GenerateKeypair()
	if err != nil {
		tb.Fatal(err)
	}
	respKey, err := GenerateKeypair()
	if err != nil {
		tb.Fatal(err)
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
		tb.Fatalf("initiator handshake: %v", initErr)
	}
	if respErr != nil {
		tb.Fatalf("responder handshake: %v", respErr)
	}
	return initStream, respStream, closePipes
}

// BenchmarkNoiseStreamWrite measures the throughput of encrypting and writing
// plaintext through a NoiseStream.  The responder goroutine drains bytes so
// that the pipe does not block.
func BenchmarkNoiseStreamWrite(b *testing.B) {
	sizes := []struct {
		name string
		size int
	}{
		{"1KB", 1 << 10},
		{"16KB", 16 << 10},
		{"64KB", 64 << 10},   // one full Noise frame
		{"256KB", 256 << 10}, // four frames
		{"1MB", 1 << 20},
	}

	for _, tc := range sizes {
		tc := tc
		b.Run(tc.name, func(b *testing.B) {
			initStream, respStream, cleanup := setupNoiseStream(b)
			defer cleanup()

			payload := make([]byte, tc.size)
			for i := range payload {
				payload[i] = byte(i & 0xFF)
			}

			// Drain goroutine: keeps the pipe from blocking the writer.
			done := make(chan struct{})
			go func() {
				defer close(done)
				discard := make([]byte, tc.size)
				for {
					_, err := io.ReadFull(respStream, discard)
					if err != nil {
						return
					}
				}
			}()

			b.SetBytes(int64(tc.size))
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				if _, err := initStream.Write(payload); err != nil {
					b.Fatal(err)
				}
			}
			b.StopTimer()
			<-done
		})
	}
}

// BenchmarkNoiseStreamRead measures the throughput of decrypting data read
// from a NoiseStream.
func BenchmarkNoiseStreamRead(b *testing.B) {
	const msgSize = 64 << 10 // one max Noise frame worth of plaintext

	initStream, respStream, cleanup := setupNoiseStream(b)
	defer cleanup()

	payload := make([]byte, msgSize)

	// Writer goroutine: keeps writing so the reader never starves.
	go func() {
		for {
			if _, err := initStream.Write(payload); err != nil {
				return
			}
		}
	}()

	buf := make([]byte, msgSize)
	b.SetBytes(msgSize)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		if _, err := io.ReadFull(respStream, buf); err != nil {
			b.Fatal(err)
		}
	}
}

// BenchmarkNoiseHandshake measures the latency of a full Noise_XX handshake.
// This is performed over an in-process io.Pipe (no real network), so the
// result reflects pure crypto cost rather than network RTT.
func BenchmarkNoiseHandshake(b *testing.B) {
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		a, bPipe, cleanup := pipeRWPair()

		initKey, _ := GenerateKeypair()
		respKey, _ := GenerateKeypair()

		var wg sync.WaitGroup
		wg.Add(2)
		go func() {
			defer wg.Done()
			HandshakeInitiator(a, initKey) //nolint:errcheck
		}()
		go func() {
			defer wg.Done()
			HandshakeResponder(bPipe, respKey) //nolint:errcheck
		}()
		wg.Wait()
		cleanup()
	}
}

// BenchmarkDeriveChunkStreamKey measures the HKDF key-derivation cost per
// chunk stream.  In a typical transfer the sender calls this once per data
// stream (up to maxChunks=65536 times), so latency here matters.
func BenchmarkDeriveChunkStreamKey(b *testing.B) {
	encKey := make([]byte, 32)
	decKey := make([]byte, 32)
	for i := range encKey {
		encKey[i] = byte(i)
		decKey[i] = byte(255 - i)
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, err := DeriveChunkStreamKey(encKey, decKey, "chunk-stream-0")
		if err != nil {
			b.Fatal(err)
		}
	}
}

// BenchmarkNoiseStreamWrite_Parallel measures concurrent write throughput
// when multiple goroutines share independent NoiseStream pairs.  This
// simulates the multi-chunk parallel transfer path.
func BenchmarkNoiseStreamWrite_Parallel(b *testing.B) {
	const msgSize = 32 << 10

	b.RunParallel(func(pb *testing.PB) {
		initStream, respStream, cleanup := setupNoiseStream(b)
		defer cleanup()

		payload := make([]byte, msgSize)
		discard := make([]byte, msgSize)

		done := make(chan struct{})
		go func() {
			defer close(done)
			for {
				if _, err := io.ReadFull(respStream, discard); err != nil {
					return
				}
			}
		}()

		for pb.Next() {
			if _, err := initStream.Write(payload); err != nil {
				b.Error(err)
				return
			}
		}
		<-done
	})
}
