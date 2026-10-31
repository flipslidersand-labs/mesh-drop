---
title: "headless Chrome の --dump-dom が SSE を張るページで返らない／fetch が完了しない"
tags: [tooling, chrome, webui, testing]
severity: medium
date: "2026-10-01"
---

## 症状

Web UI を実ブラウザで検証しようと `google-chrome --headless=new --virtual-time-budget=5000 --dump-dom URL` を
実行したところ、JS が動くようになった版でだけ出力 0 バイトのまま timeout した。
`--timeout=9000` に変えると DOM は出るが、`fetch('/api/peers')`（サーバ側で約 3 秒かかる）の結果が
反映されないままだった。

## 原因

- `--virtual-time-budget` はネットワークが静かになるまで仮想時間を進める。`EventSource`（SSE）は
  接続を張りっぱなしにするため、ページが「完了」扱いにならない。
- `--timeout` モードでも、実時間で数秒かかる fetch の完了が DOM ダンプに反映されなかった。

## 解決策

Chrome DevTools Protocol を Node から直接叩く。Node 22+ は `WebSocket` がグローバルにあるため依存追加不要。

1. `google-chrome --headless=new --remote-debugging-port=9333 --user-data-dir=<tmp> about:blank` を起動
2. `http://127.0.0.1:9333/json` から page の `webSocketDebuggerUrl` を取得して接続
3. `Runtime.enable` / `Log.enable` → `Page.navigate` → 実時間で待機 → `Runtime.evaluate` で
   DOM 状態・`getComputedStyle` を取得。CSP 違反や例外は `Log.entryAdded` / `Runtime.exceptionThrown` で拾う

## 予防

- SSE / WebSocket / ロングポーリングを使うページは `--dump-dom` 系で検証しない。最初から CDP を使う。
- CSP 違反の有無は `--enable-logging=stderr` の `Content Security Policy` 行でも確認できる
  （JS が動かないページならこちらで十分）。
