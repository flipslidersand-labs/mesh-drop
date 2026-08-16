package crypto

import (
	"crypto/rand"
	"encoding/binary"
	"fmt"
	"io"
	"sync"

	"github.com/flynn/noise"
)

// noiseReadPool pools ciphertext read buffers (max Noise frame = 65535 bytes).
var noiseReadPool = sync.Pool{
	New: func() interface{} {
		b := make([]byte, 65535)
		return &b
	},
}

// noisePlainPool pools plaintext buffers reused after Decrypt (#172).
var noisePlainPool = sync.Pool{
	New: func() interface{} {
		b := make([]byte, 65535)
		return &b
	},
}

// noiseWritePool pools outbound frame buffers: 2-byte length prefix + payload (#149, #173).
// Size: 2 (len prefix) + maxChunk + 16 (AEAD tag) = 65018 bytes worst case.
var noiseWritePool = sync.Pool{
	New: func() interface{} {
		b := make([]byte, 2+maxChunk+16)
		return &b
	},
}

const maxChunk = 65000 // Noise メッセージあたりの最大平文バイト数 (65535 - 16 AEAD tag の安全マージン)

// maxHandshakeMsgLen is the maximum size allowed for a single Noise handshake message.
// Noise_XX messages are small (ephemeral key + static key + tag overhead), well under 1 KiB.
// #171: Reject oversized handshake frames before allocating memory.
const maxHandshakeMsgLen = uint16(4096)

// derivedKeyLen is the length in bytes of a key derived for a chunk stream.
const derivedKeyLen = 32

// NoiseStream は io.ReadWriter を Noise トランスポート暗号化でラップする。
type NoiseStream struct {
	rw   io.ReadWriter
	enc  *noise.CipherState
	dec  *noise.CipherState
	rbuf []byte // 復号済みだが未返却のバイト
}

func (s *NoiseStream) Write(p []byte) (int, error) {
	written := 0
	for len(p) > 0 {
		chunk := p
		if len(chunk) > maxChunk {
			chunk = p[:maxChunk]
		}

		// #149: get a pooled write buffer large enough for prefix + ciphertext.
		// Layout: [2-byte length][ciphertext (plaintext + 16-byte AEAD tag)]
		frameBufPtr := noiseWritePool.Get().(*[]byte)
		frameBuf := *frameBufPtr

		// Encrypt into frameBuf[2:] so we can prepend the length in-place.
		ct, err := s.enc.Encrypt(frameBuf[2:2], nil, chunk)
		if err != nil {
			noiseWritePool.Put(frameBufPtr)
			return written, err
		}

		ctLen := len(ct)
		// Write length prefix directly into the first two bytes of frameBuf.
		binary.BigEndian.PutUint16(frameBuf[:2], uint16(ctLen))

		// #173: single Write call for length prefix + ciphertext together.
		frame := frameBuf[:2+ctLen]
		_, werr := s.rw.Write(frame)
		noiseWritePool.Put(frameBufPtr)
		if werr != nil {
			return written, werr
		}

		written += len(chunk)
		p = p[len(chunk):]
	}
	return written, nil
}

func (s *NoiseStream) Read(p []byte) (int, error) {
	if len(s.rbuf) > 0 {
		n := copy(p, s.rbuf)
		s.rbuf = s.rbuf[n:]
		return n, nil
	}
	var lb [2]byte
	if _, err := io.ReadFull(s.rw, lb[:]); err != nil {
		return 0, err
	}
	size := int(binary.BigEndian.Uint16(lb[:]))

	// Get pooled ciphertext buffer.
	ctBufPtr := noiseReadPool.Get().(*[]byte)
	if size > len(*ctBufPtr) {
		noiseReadPool.Put(ctBufPtr)
		return 0, fmt.Errorf("noise chunk size %d exceeds buffer capacity %d", size, len(*ctBufPtr))
	}
	ct := (*ctBufPtr)[:size]
	if _, err := io.ReadFull(s.rw, ct); err != nil {
		noiseReadPool.Put(ctBufPtr)
		return 0, err
	}

	// #172: get a pooled plaintext buffer and pass it as dst to Decrypt.
	ptBufPtr := noisePlainPool.Get().(*[]byte)
	pt, err := s.dec.Decrypt((*ptBufPtr)[:0], nil, ct)

	// Ciphertext buffer no longer needed after Decrypt.
	noiseReadPool.Put(ctBufPtr)

	if err != nil {
		// #166: zero before pool return even on error path.
		zeroBytes(*ptBufPtr)
		noisePlainPool.Put(ptBufPtr)
		return 0, fmt.Errorf("noise decrypt: %w", err)
	}

	n := copy(p, pt)
	if n < len(pt) {
		s.rbuf = append(s.rbuf[:0], pt[n:]...)
	}

	// #166: zero the decrypted plaintext region before returning to the pool.
	// sync.Pool buffers are shared across goroutines; residual plaintext must not
	// leak to the next caller that obtains this buffer slot.
	zeroBytes((*ptBufPtr)[:len(pt)])
	noisePlainPool.Put(ptBufPtr)
	return n, nil
}

// zeroBytes overwrites b with zeros to erase sensitive data.
func zeroBytes(b []byte) {
	for i := range b {
		b[i] = 0
	}
}

// GenerateKeypair は新しい X25519 鍵ペアを生成する。
func GenerateKeypair() (noise.DHKey, error) {
	return noise.DH25519.GenerateKeypair(rand.Reader)
}

func newHS(initiator bool, key noise.DHKey) (*noise.HandshakeState, error) {
	cs := noise.NewCipherSuite(noise.DH25519, noise.CipherChaChaPoly, noise.HashBLAKE2s)
	return noise.NewHandshakeState(noise.Config{
		CipherSuite:   cs,
		Random:        rand.Reader,
		Pattern:       noise.HandshakeXX,
		Initiator:     initiator,
		StaticKeypair: key,
	})
}

// HandshakeInitiator は Noise_XX のイニシエーター側ハンドシェイクを実行する。
//
// #148 NOTE: This function is intended for the *control stream only*.
// Chunk streams must NOT call this; derive per-stream keys with DeriveChunkStreamKey
// from the control stream's session keys instead.
// TODO(#148): enforce at the type level — a ChunkStream constructor should accept
// a derived key and refuse a HandshakeState.
func HandshakeInitiator(rw io.ReadWriter, key noise.DHKey) (*NoiseStream, error) {
	ns, _, err := HandshakeInitiatorFull(rw, key)
	return ns, err
}

// HandshakeResponder は Noise_XX のレスポンダー側ハンドシェイクを実行する。
//
// #148 NOTE: control stream only — see HandshakeInitiator for the chunk-stream policy.
func HandshakeResponder(rw io.ReadWriter, key noise.DHKey) (*NoiseStream, error) {
	ns, _, err := HandshakeResponderFull(rw, key)
	return ns, err
}

// HandshakeInitiatorFull はハンドシェイクを実行し、暗号ストリームとピアの静的公開鍵を返す。
// 制御ストリームや TOFU 検証が必要な箇所で使用する。
func HandshakeInitiatorFull(rw io.ReadWriter, key noise.DHKey) (*NoiseStream, []byte, error) {
	hs, err := newHS(true, key)
	if err != nil {
		return nil, nil, err
	}
	return doXX(rw, hs, true)
}

// HandshakeResponderFull はハンドシェイクを実行し、暗号ストリームとピアの静的公開鍵を返す。
// 制御ストリームや TOFU 検証が必要な箇所で使用する。
func HandshakeResponderFull(rw io.ReadWriter, key noise.DHKey) (*NoiseStream, []byte, error) {
	hs, err := newHS(false, key)
	if err != nil {
		return nil, nil, err
	}
	return doXX(rw, hs, false)
}

// doXX は Noise_XX の 3 メッセージハンドシェイクを実行し、暗号化ストリームとピアの静的公開鍵を返す。
//
// XX パターン:
//
//	→ e              (msg1: initiator 送信)
//	← e, ee, s, es   (msg2: responder 送信)
//	→ s, se           (msg3: initiator 送信 → 両側で CipherState 取得)
//
// CipherState の方向: cs0 = I→R (initiator enc / responder dec)
//
//	cs1 = R→I (responder enc / initiator dec)
func doXX(rw io.ReadWriter, hs *noise.HandshakeState, initiator bool) (*NoiseStream, []byte, error) {
	send := func() (*noise.CipherState, *noise.CipherState, error) {
		msg, cs0, cs1, err := hs.WriteMessage(nil, nil)
		if err != nil {
			return nil, nil, err
		}
		var lb [2]byte
		binary.BigEndian.PutUint16(lb[:], uint16(len(msg)))
		if _, err := rw.Write(lb[:]); err != nil {
			return nil, nil, err
		}
		if _, err := rw.Write(msg); err != nil {
			return nil, nil, err
		}
		return cs0, cs1, nil
	}

	// #171: recv validates the length-prefixed handshake frame before allocating.
	recv := func() (*noise.CipherState, *noise.CipherState, error) {
		var lb [2]byte
		if _, err := io.ReadFull(rw, lb[:]); err != nil {
			return nil, nil, err
		}
		msgLen := binary.BigEndian.Uint16(lb[:])
		// #171: Reject oversized handshake messages to prevent memory exhaustion.
		if msgLen > maxHandshakeMsgLen {
			return nil, nil, fmt.Errorf("noise handshake: message length %d exceeds maximum %d", msgLen, maxHandshakeMsgLen)
		}
		msg := make([]byte, msgLen)
		if _, err := io.ReadFull(rw, msg); err != nil {
			return nil, nil, err
		}
		_, cs0, cs1, err := hs.ReadMessage(nil, msg)
		return cs0, cs1, err
	}

	if initiator {
		if _, _, err := send(); err != nil {
			return nil, nil, err
		}
		if _, _, err := recv(); err != nil {
			return nil, nil, err
		}
		cs0, cs1, err := send() // msg3 → cipher states; peer static available after msg2
		if err != nil {
			return nil, nil, err
		}
		// initiator: enc=cs0 (I→R), dec=cs1 (R→I)
		return &NoiseStream{rw: rw, enc: cs0, dec: cs1}, hs.PeerStatic(), nil
	}

	if _, _, err := recv(); err != nil {
		return nil, nil, err
	}
	if _, _, err := send(); err != nil {
		return nil, nil, err
	}
	cs0, cs1, err := recv() // msg3 受信 → cipher states; peer static available after msg3
	if err != nil {
		return nil, nil, err
	}
	// responder: enc=cs1 (R→I), dec=cs0 (I→R)
	return &NoiseStream{rw: rw, enc: cs1, dec: cs0}, hs.PeerStatic(), nil
}
