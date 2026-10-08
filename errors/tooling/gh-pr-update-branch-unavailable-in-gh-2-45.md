---
title: "gh 2.45 では gh pr update-branch が存在せずヘルプを出して成功扱いで終わる"
tags: [tooling, gh, github]
severity: low
date: "2026-10-01"
---

## 症状

strict な required status checks（up to date 必須）で BEHIND になった PR を
`gh pr update-branch <n>` で更新しようとしたが、ブランチは更新されず BEHIND のままだった。
出力はヘルプの断片（`view` など）だけで、エラーに気づきにくい。

## 原因

`gh pr update-branch` サブコマンドは gh 2.45.0（Ubuntu パッケージ版）には無い。

## 解決策

REST API を直接呼ぶ。

```bash
gh api -X PUT repos/<owner>/<repo>/pulls/<n>/update-branch -q .message
# => "Updating pull request branch."
```

その後 CI 完了を待ち、`mergeStateStatus` が `CLEAN` になってからマージする。

## 予防

- 複数 PR を順にマージする場合、1 件マージするたびに残りが BEHIND になる。
  「update-branch → CI 待ち → merge」を 1 件ずつ回す（まとめて update しても次のマージでまた BEHIND になる）。
- 更新後は `gh pr view <n> --json mergeStateStatus,headRefOid` で head が進んだことを確認する。
