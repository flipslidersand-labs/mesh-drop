---
title: "最終パスを塞いで rename 失敗を起こすテストが、上書き拒否の導入で事前エラーに変わり意図を失う"
tags: [go, testing, transfer]
severity: medium
date: "2026-10-01"
---

## 症状

受信先の既存ファイル上書きを拒否する変更を master に rebase したところ、コンフリクトは無かったのに
既存の回帰テスト 3 件が失敗した。

```text
TestRoundTrip_ReceiverFailureReported/file: Send error = ... refusing to overwrite existing file: hello.bin ..., want receiver failure
TestRoundTrip_ResumeAfterReceiverError: partial state not kept after receiver error: state=... no such file or directory
```

## 原因

これらのテストは「最終パスに空でないディレクトリを置く → 受信完了直前の `os.Rename` が失敗する」ことで
受信側エラーを起こしていた。上書き拒否（`refuseExisting`）は受信開始前に既存パスを弾くため、
転送が始まる前にエラーになり、テストが本来検証したい「受信完了直前の失敗」に到達しなくなった。
テストは「エラーが出ること」だけでなくエラー経路まで前提にしていた。

## 解決策

最終 rename を差し替え可能なフックにし、テストから失敗を注入する。受信処理は別 goroutine で動くため
単純な `var renameFinal = os.Rename` の差し替えは `-race` でデータ競合になる。`atomic.Pointer` で持つ。

```go
var renameFinalHook atomic.Pointer[func(oldpath, newpath string) error]

func renameFinal(oldpath, newpath string) error {
	if h := renameFinalHook.Load(); h != nil {
		return (*h)(oldpath, newpath)
	}
	return os.Rename(oldpath, newpath)
}
```

## 予防

- ファイルシステムの状態で失敗を「演出」するテストは、入力検証が強化されると失敗箇所が前倒しになり
  意図が崩れる。失敗させたい箇所に直接フックを置く方が堅い。
- 変更ブランチを rebase したら、コンフリクトの有無に関わらず `go test -race ./...` を必ず回す
  （テキスト上は独立でも意味的に衝突する）。
