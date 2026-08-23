package transfer

import (
	"fmt"
	"io"
	"os"

	"github.com/klauspost/compress/zstd"
)

// compressedMagics は既圧縮フォーマットのマジックバイト列。
// 各エントリは先頭 N バイトに対してプレフィックスマッチを行う。
var compressedMagics = [][]byte{
	{0x1F, 0x8B},                         // gzip
	{0x28, 0xB5, 0x2F, 0xFD},             // zstd
	{0x50, 0x4B, 0x03, 0x04},             // zip (local file header)
	{0x50, 0x4B, 0x05, 0x06},             // zip (end of central dir)
	{0x50, 0x4B, 0x07, 0x08},             // zip (data descriptor)
	{0x42, 0x5A, 0x68},                   // bzip2
	{0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00}, // xz
	{0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C}, // 7-zip
	{0x52, 0x61, 0x72, 0x21, 0x1A, 0x07}, // rar
	{0xFF, 0xD8, 0xFF},                   // jpeg
	{0x89, 0x50, 0x4E, 0x47},             // png
	{0x47, 0x49, 0x46, 0x38},             // gif
	{0x49, 0x44, 0x33},                   // mp3 (ID3v2 tag)
	{0xFF, 0xFB},                         // mp3 (sync word)
	{0xFF, 0xF3},                         // mp3 (sync word variant)
	{0xFF, 0xF2},                         // mp3 (sync word variant)
	{0x66, 0x74, 0x79, 0x70},             // mp4 / m4a (ftyp box, at offset 4)
	{0x4F, 0x67, 0x67, 0x53},             // ogg
	{0x66, 0x4C, 0x61, 0x43},             // flac
	{0x1A, 0x45, 0xDF, 0xA3},             // webm / mkv (EBML)
	{0x52, 0x49, 0x46, 0x46},             // avi / wav (RIFF)
	{0x25, 0x50, 0x44, 0x46},             // pdf
}

// isAlreadyCompressed は path のマジックバイトを検査し、既圧縮フォーマットなら true を返す。
// 読み取りに失敗した場合は false を返す（圧縮を試みる方向に倒す）。
func isAlreadyCompressed(path string) bool {
	f, err := os.Open(path)
	if err != nil {
		return false
	}
	defer f.Close()

	const headerLen = 8
	buf := make([]byte, headerLen)
	n, err := f.Read(buf)
	if err != nil || n < 2 {
		return false
	}
	buf = buf[:n]

	for _, magic := range compressedMagics {
		if len(buf) >= len(magic) {
			match := true
			for i, b := range magic {
				if buf[i] != b {
					match = false
					break
				}
			}
			if match {
				return true
			}
		}
	}
	// mp4 の ftyp ボックスはオフセット 4 にある (先頭 4 バイトはボックスサイズ)。
	if n >= 8 {
		ftyp := []byte{0x66, 0x74, 0x79, 0x70}
		match := true
		for i, b := range ftyp {
			if buf[4+i] != b {
				match = false
				break
			}
		}
		if match {
			return true
		}
	}
	return false
}

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
