---
title: "gh pr merge が「not mergeable」「status checks are expected」「BEHIND」で繰り返し失敗する"
tags: [github, github-actions, branch-protection, gh-cli]
severity: low
date: "2026-09-17"
---

## 症状

全チェックが green（`gh pr checks` で確認済み）にもかかわらず、直後に
`gh pr merge --squash` すると以下のいずれかで失敗することがある：

- `X Pull request #NNN is not mergeable: the base branch policy prohibits the merge.`
- `GraphQL: N of N required status checks are expected. (mergePullRequest)`
- `mergeStateStatus: BEHIND`（`gh pr view --json mergeable,mergeStateStatus` で確認）

## 原因

- required status checks は **strict モード**（「マージ前に base と同期していること」）
  が有効な場合、GitHub 側の内部反映に数秒〜十数秒のラグがあり、`gh pr checks` で
  green に見えても API 側の判定がまだ追いついていないことがある。
- 並行セッションが同じリポジトリで頻繁に master へマージしていると、
  こちらの PR がその都度 `BEHIND` になり、rebase → force-push → CI 再実行が
  必要になる（1回のマージに複数往復することがある）。

## 解決策

マージは以下のリトライループで自動化する（このセッションで繰り返し使用）：

```bash
for attempt in 1 2 3 4; do
  out=$(gh pr merge <PR番号> --squash --delete-branch 2>&1)
  echo "$out"
  if echo "$out" | grep -qi "not mergeable\|BEHIND\|status checks are expected"; then
    git fetch origin master -q
    git rebase origin/master
    git push --force-with-lease origin <ブランチ名>
    # rebase後は新しいコミットに対してCIが再実行されるので待つ
    while true; do
      s=$(gh pr checks <PR番号> 2>&1)
      echo "$s" | grep -qi pending || break
      sleep 20
    done
    sleep 10  # GitHub側の反映ラグを吸収する明示的待機
    continue
  fi
  break
done
```

`git worktree` 環境で `gh pr merge --delete-branch` を使うと、マージ自体は成功して
いても「ローカルブランチを master に切り替える」後処理が
`fatal: 'master' is already used by worktree at '...'` で失敗することがある。
これは無害（マージは既に完了している）なので、`gh pr view --json state,mergedAt`
で実際のマージ状態を確認すればよい。

## 予防

- `gh pr merge` を1回呼んで失敗したら即座に諦めず、上記のリトライループを最初から
  仕込んでおく（特に並行セッションが同じリポジトリで活発に作業している場合）。
- マージ直前に `gh pr view --json mergeable,mergeStateStatus` で `BEHIND` を
  先読みしてから rebase するとリトライ回数を減らせる。
