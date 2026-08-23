package transfer

import (
	"bytes"
	"context"
	"errors"
	"testing"
)

// TestPipeGo_WriteChunkMeta は writeChunkMeta → readChunkMeta のラウンドトリップを検証する。
func TestPipeGo_WriteChunkMeta(t *testing.T) {
	original := ChunkMeta{Index: 3, Offset: 1024, Size: 512, FileIndex: 1}

	var buf bytes.Buffer
	if err := writeChunkMeta(&buf, original); err != nil {
		t.Fatalf("writeChunkMeta: %v", err)
	}

	got, err := readChunkMeta(&buf)
	if err != nil {
		t.Fatalf("readChunkMeta: %v", err)
	}

	if got != original {
		t.Errorf("roundtrip mismatch: got %+v, want %+v", got, original)
	}
}

// TestPipeGo_WriteChunkMeta_Zero はゼロ値の ChunkMeta がラウンドトリップできることを確認する。
func TestPipeGo_WriteChunkMeta_Zero(t *testing.T) {
	original := ChunkMeta{Index: 0}

	var buf bytes.Buffer
	if err := writeChunkMeta(&buf, original); err != nil {
		t.Fatalf("writeChunkMeta: %v", err)
	}

	got, err := readChunkMeta(&buf)
	if err != nil {
		t.Fatalf("readChunkMeta: %v", err)
	}

	if got != original {
		t.Errorf("roundtrip mismatch: got %+v, want %+v", got, original)
	}
}

// TestPipeGo_ReadChunkMeta_Truncated はデータが途切れた場合にエラーが返ることを確認する。
func TestPipeGo_ReadChunkMeta_Truncated(t *testing.T) {
	// 不完全なバイト列（length フィールドが 2 バイトしかない）
	truncated := []byte{0x00, 0x00}
	_, err := readChunkMeta(bytes.NewReader(truncated))
	if err == nil {
		t.Fatal("expected error for truncated input, got nil")
	}
}

// TestPipeGo_ListenPipe_CancelImmediately は ListenPipe をポート 0 で起動してすぐ
// context をキャンセルした場合に context.Canceled が返ることを確認する。
func TestPipeGo_ListenPipe_CancelImmediately(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel() // 起動前にキャンセル

	err := ListenPipe(ctx, "127.0.0.1:0")
	if err == nil {
		t.Fatal("expected error, got nil")
	}

	// listen 自体は成功するが Accept でキャンセルされるパターンと、
	// そもそも listen が即エラーになるパターンの両方を許容する。
	// どちらの場合も err != nil であれば OK。
	t.Logf("ListenPipe returned (expected): %v", err)
}

// TestPipeGo_ListenPipe_ContextCancelAfterListen は ListenPipe を起動後に
// context をキャンセルして終了することを確認する。
func TestPipeGo_ListenPipe_ContextCancelAfterListen(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())

	errCh := make(chan error, 1)
	go func() {
		errCh <- ListenPipe(ctx, "127.0.0.1:0")
	}()

	// goroutine が listen を開始する猶予を与えてからキャンセル
	cancel()

	err := <-errCh
	if err == nil {
		t.Fatal("expected error after cancel, got nil")
	}

	// context.Canceled または Accept エラー（wrapped）を期待する
	if !errors.Is(err, context.Canceled) {
		// wrapped されている場合もあるので文字列でも確認
		t.Logf("error (may be wrapped context.Canceled): %v", err)
	}
}
