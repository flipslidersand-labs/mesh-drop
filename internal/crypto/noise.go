package crypto

import (
	"crypto/rand"
	"encoding/binary"
	"fmt"
	"io"

	"github.com/flynn/noise"
)

const maxChunk = 65000 // Noise メッセージあたりの最大平文バイト数 (65535 - 16 AEAD tag の安全マージン)

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
		ct, err := s.enc.Encrypt(nil, nil, chunk)
		if err != nil {
			return written, err
		}
		var lb [2]byte
		binary.BigEndian.PutUint16(lb[:], uint16(len(ct)))
		if _, err := s.rw.Write(lb[:]); err != nil {
			return written, err
		}
		if _, err := s.rw.Write(ct); err != nil {
			return written, err
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
	ct := make([]byte, binary.BigEndian.Uint16(lb[:]))
	if _, err := io.ReadFull(s.rw, ct); err != nil {
		return 0, err
	}
	pt, err := s.dec.Decrypt(nil, nil, ct)
	if err != nil {
		return 0, fmt.Errorf("noise decrypt: %w", err)
	}
	n := copy(p, pt)
	if n < len(pt) {
		s.rbuf = append(s.rbuf[:0], pt[n:]...)
	}
	return n, nil
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
func HandshakeInitiator(rw io.ReadWriter, key noise.DHKey) (*NoiseStream, error) {
	hs, err := newHS(true, key)
	if err != nil {
		return nil, err
	}
	return doXX(rw, hs, true)
}

// HandshakeResponder は Noise_XX のレスポンダー側ハンドシェイクを実行する。
func HandshakeResponder(rw io.ReadWriter, key noise.DHKey) (*NoiseStream, error) {
	hs, err := newHS(false, key)
	if err != nil {
		return nil, err
	}
	return doXX(rw, hs, false)
}

// doXX は Noise_XX の 3 メッセージハンドシェイクを実行し、暗号化ストリームを返す。
//
// XX パターン:
//
//	→ e              (msg1: initiator 送信)
//	← e, ee, s, es   (msg2: responder 送信)
//	→ s, se           (msg3: initiator 送信 → 両側で CipherState 取得)
func doXX(rw io.ReadWriter, hs *noise.HandshakeState, initiator bool) (*NoiseStream, error) {
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

	recv := func() (*noise.CipherState, *noise.CipherState, error) {
		var lb [2]byte
		if _, err := io.ReadFull(rw, lb[:]); err != nil {
			return nil, nil, err
		}
		msg := make([]byte, binary.BigEndian.Uint16(lb[:]))
		if _, err := io.ReadFull(rw, msg); err != nil {
			return nil, nil, err
		}
		_, cs0, cs1, err := hs.ReadMessage(nil, msg)
		return cs0, cs1, err
	}

	if initiator {
		if _, _, err := send(); err != nil {
			return nil, err
		}
		if _, _, err := recv(); err != nil {
			return nil, err
		}
		cs0, cs1, err := send() // msg3 → cipher states
		if err != nil {
			return nil, err
		}
		return &NoiseStream{rw: rw, enc: cs0, dec: cs1}, nil
	}

	if _, _, err := recv(); err != nil {
		return nil, err
	}
	if _, _, err := send(); err != nil {
		return nil, err
	}
	cs0, cs1, err := recv() // msg3 受信 → cipher states
	if err != nil {
		return nil, err
	}
	// responder: cs0 = I→R (dec), cs1 = R→I (enc)
	return &NoiseStream{rw: rw, enc: cs1, dec: cs0}, nil
}
