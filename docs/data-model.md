# Data Model — MeshDrop

## ネットワークプロトコル

```go
// mDNS サービス発見
const ServiceType = "_meshdrop._tcp"

type PeerInfo struct {
    ID       string   // ランダム UUID
    Hostname string
    Addrs    []net.IP
    Port     int
}

// Noise Protocol ハンドシェイク後の セッション
type Session struct {
    LocalKey  noise.DHKey
    RemoteKey []byte
    Cipher    noise.CipherState // 送受信の暗号化状態
}

// 転送メタデータ (ハンドシェイク後に送受信)
type TransferMeta struct {
    Filename string `json:"filename"`
    Size     int64  `json:"size"`
    Hash     []byte `json:"hash"`   // BLAKE3 (32 bytes)
    ChunkSize int   `json:"chunk_size"`
}

// チャンク
type Chunk struct {
    Index  uint32
    Data   []byte
    Hash   []byte // チャンク単位の BLAKE3 (Phase 5)
}
```

## 転送状態遷移

```
送信側                          受信側
  |-- mDNS advertise ---------->|
  |<- mDNS discover ------------|
  |-- QUIC connect ------------>|
  |-- Noise XX init_msg ------->|
  |<- Noise XX resp_msg --------|
  |-- Noise XX final_msg ------>|
  |   (セッション確立)            |
  |-- TransferMeta (JSON) ----->|
  |<- ACK ----------------------|
  |-- Chunk[0..N] (QUIC) ------>|
  |<- HashVerify (OK/FAIL) -----|
```

## ファイル整合性

```go
// 送信前にファイル全体の BLAKE3 ハッシュを計算
hash := blake3.Sum256(fileBytes)

// 受信後に照合
receivedHash := blake3.Sum256(receivedBytes)
if hash != receivedHash { return ErrHashMismatch }
```
