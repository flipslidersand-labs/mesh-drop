package transfer

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
)

// checkpointState はチャンク単位の受信進捗を記録するファイル形式。
// ファイルパス: {outPath}.meshdrop-state
type checkpointState struct {
	Name        string `json:"name"`
	Size        int64  `json:"size"`
	Hash        string `json:"hash"`
	ChunksTotal int    `json:"chunks_total"`
	ChunksDone  []bool `json:"chunks_done"` // インデックス = チャンク番号
}

// checkpoint は並行アクセスを安全に処理するチェックポイントマネージャ。
type checkpoint struct {
	path  string
	state checkpointState
	mu    sync.Mutex
}

// checkpointPath は outPath に対応する状態ファイルパスを返す。
func checkpointPath(outPath string) string {
	return outPath + ".meshdrop-state"
}

// loadOrCreate は既存の状態ファイルを読み込むか、新規作成する。
// meta が一致しない場合（ファイル名/サイズ/ハッシュが異なる）は新規扱い。
func loadOrCreate(outPath string, meta Meta) *checkpoint {
	cp := &checkpoint{
		path: checkpointPath(outPath),
		state: checkpointState{
			Name:        meta.Name,
			Size:        meta.Size,
			Hash:        meta.Hash,
			ChunksTotal: meta.Chunks,
			ChunksDone:  make([]bool, meta.Chunks),
		},
	}

	data, err := os.ReadFile(cp.path)
	if err != nil {
		return cp // 新規
	}

	var existing checkpointState
	if err := json.Unmarshal(data, &existing); err != nil {
		return cp // 破損 → 新規
	}

	// 同一転送かを確認（名前・サイズ・ハッシュ・チャンク数が一致）
	if existing.Name != meta.Name ||
		existing.Size != meta.Size ||
		existing.Hash != meta.Hash ||
		existing.ChunksTotal != meta.Chunks {
		return cp // 別の転送 → 新規
	}

	cp.state = existing
	return cp
}

// doneIndices は完了済みチャンクのインデックス一覧を返す。
func (cp *checkpoint) doneIndices() []int {
	cp.mu.Lock()
	defer cp.mu.Unlock()
	var done []int
	for i, d := range cp.state.ChunksDone {
		if d {
			done = append(done, i)
		}
	}
	return done
}

// markDone はチャンク idx を完了としてマークし状態ファイルを更新する。
func (cp *checkpoint) markDone(idx int) error {
	cp.mu.Lock()
	defer cp.mu.Unlock()
	if idx < 0 || idx >= len(cp.state.ChunksDone) {
		return fmt.Errorf("markDone: index %d out of range [0, %d)", idx, len(cp.state.ChunksDone))
	}
	cp.state.ChunksDone[idx] = true
	return cp.save()
}

// save は状態ファイルに書き出す（ロック取得済みで呼ぶこと）。
// クラッシュ時の破損を防ぐため tmp ファイルへ書いてから rename する。
func (cp *checkpoint) save() error {
	data, err := json.Marshal(cp.state)
	if err != nil {
		return err
	}
	tmp := cp.path + ".tmp"
	if err := os.WriteFile(tmp, data, 0o600); err != nil {
		return err
	}
	return os.Rename(tmp, cp.path)
}

// finish は転送完了時に状態ファイルを削除する。
func (cp *checkpoint) finish() {
	_ = os.Remove(cp.path)
}

// isAllDone は全チャンクが完了しているかを返す。
func (cp *checkpoint) isAllDone() bool {
	cp.mu.Lock()
	defer cp.mu.Unlock()
	for _, d := range cp.state.ChunksDone {
		if !d {
			return false
		}
	}
	return true
}
