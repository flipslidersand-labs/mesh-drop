package transfer

import (
	"encoding/binary"
	"encoding/json"
	"io"
)

// Meta はコントロールストリームで送信するファイル全体情報。
// Files が非 nil のときはバッチ（ディレクトリ）転送モード。
// Size == -1 のときは pipe（ストリーミング）モード。
type Meta struct {
	Name    string     `json:"name"`
	Size    int64      `json:"size"`            // -1 = streaming/pipe
	Hash    string     `json:"hash"`            // BLAKE3-256 hex
	Chunks  int        `json:"chunks"`          // 並列データストリーム数
	Files   []FileMeta `json:"files,omitempty"` // nil = single-file mode
	IsBatch bool       `json:"is_batch,omitempty"`
	IsPipe  bool       `json:"is_pipe,omitempty"`
}

// FileMeta はバッチ転送時の個別ファイル情報。
type FileMeta struct {
	Path string `json:"path"` // 送信元からの相対パス
	Size int64  `json:"size"`
	Hash string `json:"hash"`
}

// ChunkMeta は各データストリームの先頭に送信するチャンク位置情報。
// FileIndex はバッチ転送時のみ有効。
type ChunkMeta struct {
	Index     int   `json:"index"`
	Offset    int64 `json:"offset"`
	Size      int64 `json:"size"`
	FileIndex int   `json:"file_index,omitempty"`
}

// ResumeState は受信側が送信側へ返す「完了済みチャンク」情報。
// 送信側はこれを見てスキップし、未完了チャンクのみ再送する。
// 互換性: ResumeState を理解しない旧クライアントは無視してフル送信する。
type ResumeState struct {
	ChunksDone []int `json:"chunks_done"` // 完了済みチャンクのインデックス
}

func writeResumeState(w io.Writer, rs ResumeState) error {
	b, err := json.Marshal(rs)
	if err != nil {
		return err
	}
	if err := binary.Write(w, binary.BigEndian, uint32(len(b))); err != nil {
		return err
	}
	_, err = w.Write(b)
	return err
}

func readResumeState(r io.Reader) (ResumeState, error) {
	var length uint32
	if err := binary.Read(r, binary.BigEndian, &length); err != nil {
		return ResumeState{}, err
	}
	buf := make([]byte, length)
	if _, err := io.ReadFull(r, buf); err != nil {
		return ResumeState{}, err
	}
	var rs ResumeState
	return rs, json.Unmarshal(buf, &rs)
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

func writeChunkMeta(w io.Writer, m ChunkMeta) error {
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

func readChunkMeta(r io.Reader) (ChunkMeta, error) {
	var length uint32
	if err := binary.Read(r, binary.BigEndian, &length); err != nil {
		return ChunkMeta{}, err
	}
	buf := make([]byte, length)
	if _, err := io.ReadFull(r, buf); err != nil {
		return ChunkMeta{}, err
	}
	var m ChunkMeta
	return m, json.Unmarshal(buf, &m)
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
