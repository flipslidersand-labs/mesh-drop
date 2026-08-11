package transfer

import (
	"encoding/hex"
	"errors"
	"io"

	"lukechampine.com/blake3"
)

// ErrHashMismatch はファイルの BLAKE3 ハッシュが送信側と一致しない場合に返す。
var ErrHashMismatch = errors.New("BLAKE3 hash mismatch: file may be corrupted in transit")

// hashReader は r の内容を読み切り、BLAKE3-256 の hex 文字列を返す。
func hashReader(r io.Reader) (string, error) {
	h := blake3.New(32, nil)
	if _, err := io.Copy(h, r); err != nil {
		return "", err
	}
	return hex.EncodeToString(h.Sum(nil)), nil
}
