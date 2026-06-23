# Spec — MeshDrop

## プロジェクトの目的

同一 LAN またはインターネット経由で、端末同士が直接ファイルを P2P 転送する CLI ツール。
QUIC / mDNS / Noise Protocol を使って暗号化・端末発見・整合性確認を実装する。

## 利用イメージ

```bash
# 送信側
meshdrop send ./large-file.zip
# → LAN 内の受信待ち端末を発見
# → Noise Protocol でハンドシェイク
# → 転送開始: [████████░░] 73% 1.2 GB/s

# 受信側
meshdrop receive
# → LAN 内の送信元を発見し接続を待つ
# Received: large-file.zip (2.1 GB) ✓ hash verified
```

## MVP の境界線

### やること (Phase 1〜4)

- mDNS で LAN 内端末を発見
- QUIC + TLS 1.3 で 1 対 1 暗号化転送
- BLAKE3 ハッシュで転送整合性を確認
- CLI で進捗表示

### やらないこと (Phase 1)

- NAT Traversal (WebRTC)
- QR コードペアリング
- 中断再開
- 並列チャンク転送
- GUI

## 成功条件

| Phase   | 完成条件                                             |
| ------- | ---------------------------------------------------- |
| Phase 1 | mDNS で同一 LAN の meshdrop インスタンスを発見できる |
| Phase 2 | QUIC で接続し小さいファイルを転送できる              |
| Phase 3 | BLAKE3 ハッシュを検証し整合性を確認できる            |
| Phase 4 | Noise Protocol でハンドシェイクし鍵交換を完了する    |
| Phase 5 | 大ファイル (1GB+) を並列チャンクで転送できる         |
| Phase 6 | NAT Traversal で異なるネットワーク間で転送できる     |
