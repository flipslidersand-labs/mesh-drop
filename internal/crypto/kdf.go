package crypto

import (
	"crypto/sha256"
	"fmt"
	"io"

	"golang.org/x/crypto/hkdf"
)

// DeriveChunkStreamKey derives a per-chunk-stream symmetric key using HKDF-SHA256.
// encKey and decKey are the Noise transport cipher-state key material (32 bytes each).
// label is a unique per-stream identifier (e.g. "chunk-stream-3").
// The returned key is 32 bytes suitable for use as an AES-256 or ChaCha20 key.
func DeriveChunkStreamKey(encKey, decKey []byte, label string) ([]byte, error) {
	if len(encKey) != 32 {
		return nil, fmt.Errorf("DeriveChunkStreamKey: encKey must be 32 bytes, got %d", len(encKey))
	}
	if len(decKey) != 32 {
		return nil, fmt.Errorf("DeriveChunkStreamKey: decKey must be 32 bytes, got %d", len(decKey))
	}

	// IKM = encKey || decKey (64 bytes)
	ikm := make([]byte, 64)
	copy(ikm[:32], encKey)
	copy(ikm[32:], decKey)
	defer func() {
		for i := range ikm {
			ikm[i] = 0
		}
	}()

	r := hkdf.New(sha256.New, ikm, nil, []byte(label))
	key := make([]byte, 32)
	if _, err := io.ReadFull(r, key); err != nil {
		return nil, fmt.Errorf("DeriveChunkStreamKey: hkdf expand: %w", err)
	}
	return key, nil
}
