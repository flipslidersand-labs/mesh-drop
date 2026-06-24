package transfer

import (
	"encoding/binary"
	"encoding/json"
	"io"
)

// Meta はファイルペイロードの前に長さプレフィックス付き JSON で送信する。
type Meta struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
	Hash string `json:"hash"` // BLAKE3-256 hex (Phase 3)
}

func writeMeta(w io.Writer, m Meta) error {
	b, err := json.Marshal(m)
	if err != nil {
		return err
	}
	if err := binary.Write(w, binary.BigEndian, uint32(len(b))); err != nil {
		return err
	}
	_, err = w.Write(b)
	return err
}

func readMeta(r io.Reader) (Meta, error) {
	var length uint32
	if err := binary.Read(r, binary.BigEndian, &length); err != nil {
		return Meta{}, err
	}
	buf := make([]byte, length)
	if _, err := io.ReadFull(r, buf); err != nil {
		return Meta{}, err
	}
	var m Meta
	return m, json.Unmarshal(buf, &m)
}
