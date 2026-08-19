package transfer

import (
	"fmt"
	"io"

	"github.com/klauspost/compress/zstd"
)

// zstdEncoderLevel は compLevel (1-9, 0=default) を zstd.EncoderLevel に変換する。
func zstdEncoderLevel(compLevel int) zstd.EncoderLevel {
	switch {
	case compLevel <= 0:
		return zstd.SpeedDefault // level 3 相当
	case compLevel <= 2:
		return zstd.SpeedFastest
	case compLevel <= 5:
		return zstd.SpeedDefault
	case compLevel <= 7:
		return zstd.SpeedBetterCompression
	default:
		return zstd.SpeedBestCompression
	}
}

// newZstdEncoder は w へ書き込む zstd エンコーダーを返す。
func newZstdEncoder(w io.Writer, compLevel int) (*zstd.Encoder, error) {
	enc, err := zstd.NewWriter(w, zstd.WithEncoderLevel(zstdEncoderLevel(compLevel)))
	if err != nil {
		return nil, fmt.Errorf("zstd encoder: %w", err)
	}
	return enc, nil
}

// newZstdDecoder は r から読み込む zstd デコーダーを返す。
func newZstdDecoder(r io.Reader) (*zstd.Decoder, error) {
	dec, err := zstd.NewReader(r)
	if err != nil {
		return nil, fmt.Errorf("zstd decoder: %w", err)
	}
	return dec, nil
}
