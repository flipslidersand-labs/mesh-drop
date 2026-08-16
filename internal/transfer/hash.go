package transfer

import (
	"encoding/hex"
	"errors"
	"io"
	"os"

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

// hashFileAt hashes an open file by reading it sequentially from offset 0 via
// ReadAt, without seeking. This is safe to call concurrently with sendChunk
// (which also uses ReadAt) and avoids the TOCTOU window that would arise from
// closing and re-opening the file between the hash pass and the data pass.
// #187: Use the already-open file handle and ReadAt to compute the hash,
// so the same kernel file-description is used for both hashing and sending.
func hashFileAt(f *os.File, size int64) (string, error) {
	h := blake3.New(32, nil)
	const bufSize = 1 << 20 // 1 MiB read buffer
	buf := make([]byte, bufSize)
	var off int64
	for off < size {
		want := int64(bufSize)
		if size-off < want {
			want = size - off
		}
		n, err := f.ReadAt(buf[:want], off)
		if n > 0 {
			if _, herr := h.Write(buf[:n]); herr != nil {
				return "", herr
			}
			off += int64(n)
		}
		if err != nil {
			if err == io.EOF {
				break
			}
			return "", err
		}
	}
	return hex.EncodeToString(h.Sum(nil)), nil
}
