# Tech Stack — MeshDrop

## 言語・バージョン

- Go 1.26 (`go.mod` の `go` / `toolchain` を正とする)

## 主要パッケージ

| パッケージ                          | 役割                                            | 使用箇所                             |
| ----------------------------------- | ----------------------------------------------- | ------------------------------------ |
| `github.com/quic-go/quic-go`        | QUIC トランスポート (TLS 1.3 内蔵・多重化)      | `internal/transfer`, `internal/nat`  |
| `github.com/grandcat/zeroconf`      | mDNS 端末発見 (純 Go)                           | `internal/discovery`                 |
| `github.com/flynn/noise`            | Noise Protocol (XX) ハンドシェイク              | `internal/crypto`                    |
| `golang.org/x/crypto` (hkdf)        | HKDF による鍵導出                               | `internal/crypto/kdf.go`             |
| `lukechampine.com/blake3`           | BLAKE3-256 による整合性検証                     | `internal/transfer/hash.go`          |
| `github.com/klauspost/compress`     | zstd 圧縮 (`--compress`)                        | `internal/transfer/compress.go`      |
| `golang.org/x/time` (rate)          | 帯域制限 (`--rate-limit`)・Web UI のレート制限  | `internal/transfer`, `internal/webui`|
| `golang.org/x/sync`                 | errgroup (並列チャンク制御)・singleflight (TOFU)| `internal/transfer`, `internal/crypto`|
| `golang.org/x/term`                 | TTY 判定 (ピア選択・TOFU 確認の対話可否)        | `cmd/meshdrop`                       |
| `gopkg.in/yaml.v3`                  | 設定ファイル (`~/.meshdrop/config.yaml`)        | `internal/config`                    |
| `github.com/schollz/progressbar/v3` | CLI 進捗バー                                    | `internal/transfer`                  |
| `github.com/spf13/cobra`            | CLI フレームワーク                              | `cmd/meshdrop`                       |

Web UI は標準 `net/http` と `go:embed` した静的ファイル (`internal/webui/static`) で構成し、外部フレームワークは使わない。

## パッケージ構成

```
cmd/meshdrop/        CLI エントリポイント (send / receive / ui / info ほか)
internal/
  config/            設定ファイルの読み込み
  crypto/            Noise ハンドシェイク・X25519 identity・HKDF・TOFU ピア固定
  discovery/         mDNS による端末発見
  nat/               STUN・リレーサーバ/クライアント(Rendezvous)・UDP ホールパンチ
  transfer/          転送エンジン (単一ファイル・ディレクトリ・pipe・resume・圧縮・帯域制限)
  webui/             埋め込み HTTP Web UI (SSE による進捗配信)
```

構成の概要は `CONTRIBUTING.md` の Architecture も参照。

## アーキテクチャ

### LAN (同一ネットワーク)

```
meshdrop send ./file-or-dir
  ├── [Discovery] mDNS で受信側を探す
  ├── [Transport] QUIC 接続 (TLS フィンガープリントを TOFU で固定)
  ├── [Control]   Stream 0: Noise XX → Meta 送信 ← ResumeState (完了済みチャンク)
  ├── [Data]      Stream 1..N: チャンクごとに Noise XX → ChunkMeta + 本体 (任意で zstd)
  └── [Verify]    BLAKE3-256 を受信側と照合

meshdrop receive
  ├── [Discovery] mDNS で自分をアドバタイズ
  ├── [Control]   Noise XX で応答 → ResumeState を返す
  ├── [Data]      チャンクを tmp ファイルへ書き込み (中断時はチェックポイントから再開)
  └── [Verify]    BLAKE3-256 照合後、os.Rename で確定 (atomic write)
```

### 別ネットワーク (NAT 越え)

```
receive --relay <URL>                 send --relay <URL> --code <CODE>
  ├── UDP ソケットを bind                 ├── UDP ソケットを bind
  ├── STUN で外部アドレス取得             ├── STUN で外部アドレス取得
  │    (ソケット経由が失敗したら          │    (同左)
  │     DiscoverExternalIP で代替)        │
  ├── リレーでペアリングコード発行        ├── コードでリレーに参加
  ├── Rendezvous: 外部アドレスを交換 ←──→ Rendezvous: 外部アドレスを交換
  ├── UDP ホールパンチ ←──────────────→ UDP ホールパンチ
  └── 同じ UDP ソケット上で QUIC listen   └── 同じ UDP ソケット上で QUIC dial → 以降は LAN と同じ
```

### 転送モード

| モード       | 概要                                                           |
| ------------ | -------------------------------------------------------------- |
| 単一ファイル | 並列チャンク転送。resume・zstd 圧縮・帯域制限に対応            |
| ディレクトリ | バッチ Meta + ファイル配列。チャンクは FileIndex で書き込み先を選ぶ |
| pipe         | `--pipe` で stdin → stdout を中継 (ファイル非経由)             |
| Web UI       | `meshdrop ui`。ブラウザから送受信し、進捗は SSE で配信         |
