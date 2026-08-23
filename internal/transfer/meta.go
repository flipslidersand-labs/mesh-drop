package transfer

import (
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"path/filepath"
	"strings"
	"unicode/utf8"
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
	NoResume   bool       `json:"no_resume,omitempty"`  // 送信側が resume を無効化 (#255)
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
// 送信側はこれを見てスキップし、未完了チャンク/ファイルのみ再送する。
// 互換性: ResumeState を理解しない旧クライアントは無視してフル送信する。
type ResumeState struct {
	ChunksDone []int    `json:"chunks_done,omitempty"` // 完了済みチャンクのインデックス（シングルファイル用）
	DirDone    []string `json:"dir_done,omitempty"`    // 完了済みファイルの相対パス（ディレクトリ転送用）
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

// sanitizeName は名前文字列に制御文字・null バイト・不正 UTF-8・絶対パス・
// パストラバーサル（..）が含まれないかを検証する。
// ログ汚染やファイルシステムの予期しない挙動を防ぐ (#325, #348)。
func sanitizeName(s string) error {
	if !utf8.ValidString(s) {
		return fmt.Errorf("name contains invalid UTF-8: %q", s)
	}
	for i, r := range s {
		if r == utf8.RuneError || r < 0x20 || r == 0x7f {
			return fmt.Errorf("name contains control character at byte %d: %q", i, s)
		}
	}
	// Reject absolute paths (path traversal via absolute reference).
	if filepath.IsAbs(s) {
		return fmt.Errorf("name must not be an absolute path: %q", s)
	}
	// Reject any path component that is ".." (directory escape).
	for _, part := range strings.Split(filepath.ToSlash(s), "/") {
		if part == ".." {
			return fmt.Errorf("name contains path traversal component: %q", s)
		}
	}
	return nil
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
	// #325: 制御文字・null バイト・不正 UTF-8 を拒否する
	if err := sanitizeName(m.Name); err != nil {
		return Meta{}, fmt.Errorf("meta.Name: %w", err)
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
		// #325: FileMeta.Path も同様に制御文字を拒否する
		if err := sanitizeName(f.Path); err != nil {
			return Meta{}, fmt.Errorf("files[%d].Path: %w", i, err)
		}
	}
	return m, nil
}
