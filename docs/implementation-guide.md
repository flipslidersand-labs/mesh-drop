# Implementation Guide — MeshDrop

## Phase 1: mDNS 端末発見（1週）

- `internal/discovery/mdns.go` — zeroconf で `_meshdrop._tcp` をアドバタイズ / Browse
- `meshdrop receive` で自分をアドバタイズ、`meshdrop send` で受信側を Browse

**完成条件**: 同一 LAN の 2 端末が互いを発見できる

---

## Phase 2: QUIC 接続 + ファイル転送（1週）

- `internal/transfer/quic.go` — quic-go でリスナー / ダイアラーを実装
- `TransferMeta` を JSON で送信後、ファイルを QUIC Stream で転送
- デフォルト TLS (自己署名) で暗号化

**完成条件**: LAN 内で 100MB ファイルを転送できる

---

## Phase 3: BLAKE3 ハッシュ検証（2日）

- 送信前にファイル全体の BLAKE3 を計算して `TransferMeta.Hash` に含める
- 受信完了後に照合し不一致なら `ErrHashMismatch`

---

## Phase 4: Noise Protocol ハンドシェイク（1週）

- `internal/crypto/noise.go` — `Noise_XX_25519_ChaChaPoly_BLAKE2s` パターン
- QUIC の上で Noise ハンドシェイクを行い、その後のデータを Noise で暗号化

**難所**: QUIC の TLS と Noise を二重にかけるか、QUIC の TLS を無効にして Noise だけにするか → Noise のみに統一

---

## Phase 5: 並列チャンク転送（1週）

- ファイルを N チャンクに分割し、QUIC の複数 Stream で並列送信
- 受信側でチャンクを index 順に結合

---

## Phase 6: NAT Traversal（2週）

- STUN サーバーで外部 IP を取得
- UDP hole punching または WebRTC DataChannel で NAT を超える
