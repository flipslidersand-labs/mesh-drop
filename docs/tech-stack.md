# Tech Stack — MeshDrop

## 言語・バージョン

- Go 1.22+

## 主要パッケージ

| パッケージ                          | 役割                          | 選定理由                       |
| ----------------------------------- | ----------------------------- | ------------------------------ |
| `github.com/quic-go/quic-go`        | QUIC トランスポート           | 高速・多重化・組み込み TLS 1.3 |
| `github.com/grandcat/zeroconf`      | mDNS 端末発見                 | 純 Go 実装・外部依存なし       |
| `github.com/flynn/noise`            | Noise Protocol ハンドシェイク | 軽量・監査済み暗号プロトコル   |
| `lukechampine.com/blake3`           | BLAKE3 ハッシュ検証           | SHA256 より高速・並列対応      |
| `github.com/schollz/progressbar/v3` | CLI 進捗バー                  | シンプルで見た目が良い         |
| `github.com/spf13/cobra`            | CLI                           | Go 標準 CLI フレームワーク     |

## アーキテクチャ

```
meshdrop send ./file
  ├── [Discovery] mDNS で受信側を探す
  ├── [Handshake] Noise_XX パターンで鍵交換
  ├── [Transfer]  QUIC Stream でチャンク送信
  └── [Verify]    BLAKE3 ハッシュを受信側と照合

meshdrop receive
  ├── [Discovery] mDNS で自分をアドバタイズ
  ├── [Handshake] Noise_XX で応答
  ├── [Transfer]  QUIC Stream でチャンク受信
  └── [Verify]    BLAKE3 ハッシュを送信側と照合
```
