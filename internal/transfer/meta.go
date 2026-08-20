package transfer

import (
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
)

// Meta はコントロールストリームで送信するファイル全体情報。
// Files が非 nil のときはバッチ（ディレクトリ）転送モード。
// Size == -1 のときは pipe（ストリーミング）モード。
type Meta struct {
	Name       string     `json:"name"`
	Size       int64      `json:"size"`               // -1 = streaming/pipe
	Hash       string     `json:"hash"`               // BLAKE3-256 hex
	Chunks     int        `json:"chunks"`             // 並列データストリーム数
	Files      []FileMeta `json:"files,omitempty"`    // nil = single-file mode
	IsBatch    bool       `json:"is_batch,omitempty"`
	IsPipe     bool       `json:"is_pipe,omitempty"`
	Compressed bool       `json:"compressed,omitempty"` // チャンクを zstd 圧縮する
	CompLevel  int        `json:"comp_level,omitempty"` // 0=default(3), 1-9
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

// ResumeState は受信側が送信側へ返す「完了済み」情報。
// 送信側はこれを見てスキップし、未完了分のみ再送する。
// 互換性: ResumeState を理解しない旧クライアントは無視してフル送信する。
type ResumeState struct {
	ChunksDone []int    `json:"chunks_done"`          // 完了済みチャンクインデックス（シングルファイル）
	DirDone    []string `json:"dir_done,omitempty"`   // 完了済みファイルパス（ディレクトリ転送）
}

// DirSendState は送信側がディレクトリ転送で DirDone を受け取った後、
// 実際に送るチャンク数を受信側へ通知する。
// 受信側はこの値でチャンク受信ループの反復数を確定する。
// 互換性: 旧クライアントはこのメッセージを送らない。readDirSendState は EOF を
// graceful に扱い、その場合は ActualChunks=0 (= 元の Meta.Chunks を使う) を返す。
type DirSendState struct {
	ActualChunks int `json:"actual_chunks"`
}

func writeDirSendState(w io.Writer, dss DirSendState) error {
	b, err := json.Marshal(dss)
	if err != nil {
		return err
	}
	if err := binary.Write(w, binary.BigEndian, uint32(len(b))); err != nil {
		return err
	}
	_, err = w.Write(b)
	return err
}

func readDirSendState(r io.Reader) (DirSendState, error) {
	var length uint32
	if err := binary.Read(r, binary.BigEndian, &length); err != nil {
		return DirSendState{}, err
	}
	if length > maxMetaLength {
		return DirSendState{}, fmt.Errorf("dir send state too large: %d bytes", length)
	}
	buf := make([]byte, length)
	if _, err := io.ReadFull(r, buf); err != nil {
		return DirSendState{}, err
	}
	var dss DirSendState
	return dss, json.Unmarshal(buf, &dss)
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

const maxMetaLength = 1 << 20 // 1 MiB

// 受信側で強制するサニティ上限。送信側は正常値しか生成しないが、
// ネットワーク越しに受け取る値なので範囲を制限する。
const (
	maxFileSize  = int64(1) << 40 // 1 TiB
	maxFileCount = 100_000
	maxChunks    = 65_536
)

func readResumeState(r io.Reader) (ResumeState, error) {
	var length uint32
	if err := binary.Read(r, binary.BigEndian, &length); err != nil {
		return ResumeState{}, err
	}
	if length > maxMetaLength {
		return ResumeState{}, fmt.Errorf("resume state too large: %d bytes", length)
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
	if length > maxMetaLength {
		return ChunkMeta{}, fmt.Errorf("chunk meta too large: %d bytes", length)
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
	if length > maxMetaLength {
		return Meta{}, fmt.Errorf("meta too large: %d bytes", length)
	}
	buf := make([]byte, length)
	if _, err := io.ReadFull(r, buf); err != nil {
		return Meta{}, err
	}
	var m Meta
	if err := json.Unmarshal(buf, &m); err != nil {
		return Meta{}, err
	}
	if !m.IsPipe {
		if m.Size < 0 || m.Size > maxFileSize {
			return Meta{}, fmt.Errorf("meta.Size out of range: %d", m.Size)
		}
		// #169: Chunks==0 is valid only for zero-byte files.
		if m.Chunks < 0 || m.Chunks > maxChunks {
			return Meta{}, fmt.Errorf("meta.Chunks out of range: %d", m.Chunks)
		}
		if m.Chunks == 0 && m.Size > 0 {
			return Meta{}, fmt.Errorf("meta.Chunks==0 with non-zero Size %d is invalid", m.Size)
		}
	}
	if len(m.Files) > maxFileCount {
		return Meta{}, fmt.Errorf("too many files: %d (max %d)", len(m.Files), maxFileCount)
	}
	for i, f := range m.Files {
		if f.Size < 0 || f.Size > maxFileSize {
			return Meta{}, fmt.Errorf("files[%d].Size out of range: %d", i, f.Size)
		}
	}
	return m, nil
}
