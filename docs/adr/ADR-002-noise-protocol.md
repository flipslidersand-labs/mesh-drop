# ADR-002: 鍵交換に Noise Protocol (Noise_XX) を使う

- **日付**: 2026-06-22
- **状態**: Accepted

## 決定

`Noise_XX_25519_ChaChaPoly_BLAKE2s` パターンで双方向認証・鍵交換を行う。

## 理由

- TLS より軽量でシンプル（証明書 CA 不要）
- `XX` パターンで送受信双方の静的鍵を相互認証できる
- Signal / WireGuard が採用しており、実績・監査済み
- `flynn/noise` は Pure Go で外部 C 依存なし

## トレードオフ

- TLS より一般的でないため、デバッグツールが少ない
- 静的鍵の管理（保存・ローテーション）を自前で実装する必要がある
