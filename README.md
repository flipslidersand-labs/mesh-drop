# MeshDrop

P2P encrypted file transfer over LAN or the Internet — Go / QUIC / Noise Protocol / BLAKE3

```
meshdrop send ./large-file.zip          # LAN: auto-discover receiver
meshdrop receive                        # LAN: wait for sender

meshdrop send --pipe < archive.tar.gz   # pipe: stdin → receiver stdout
meshdrop receive --pipe > out.tar.gz

meshdrop send ./mydir/                  # directory: whole folder transfer
```

## Features

| Feature                | Detail                                                     |
| ---------------------- | ---------------------------------------------------------- |
| **Auto-discovery**     | mDNS — zero config on the same LAN                         |
| **Encryption**         | Noise Protocol (XX handshake) per QUIC stream              |
| **Integrity**          | BLAKE3-256 hash verified on arrival                        |
| **Parallel chunks**    | Multiple QUIC streams — saturates bandwidth                |
| **Resume**             | Interrupted transfers resume from the last completed chunk |
| **Directory transfer** | Recursive folder send, tree reconstructed on receiver      |
| **Pipe mode**          | Stdin → stdout streaming between any two hosts             |
| **NAT traversal**      | STUN + relay signaling + UDP hole punching                 |

## Install

**Download a pre-built binary** from [Releases](https://github.com/flipslidersand/mesh-drop/releases):

```bash
# Linux amd64
curl -L https://github.com/flipslidersand/mesh-drop/releases/latest/download/meshdrop-linux-amd64 \
  -o meshdrop && chmod +x meshdrop && sudo mv meshdrop /usr/local/bin/
```

**Build from source** (requires Go 1.25+):

```bash
go install github.com/flipslidersand/mesh-drop/cmd/meshdrop@latest
```

### Verify a release binary (optional)

Each release includes a `checksums.txt` signed with [cosign](https://github.com/sigstore/cosign) via Sigstore keyless signing.

```bash
# 1. Install cosign
brew install cosign   # macOS
# or: go install github.com/sigstore/cosign/v2/cmd/cosign@latest

# 2. Verify the checksum signature (downloads transparency log proof automatically)
cosign verify-blob checksums.txt \
  --bundle checksums.txt.bundle \
  --certificate-identity-regexp "https://github.com/flipslidersand-labs/mesh-drop/.github/workflows/release.yml" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com"

# 3. Verify your binary matches the checksum
sha256sum --check --ignore-missing checksums.txt
```

## Usage

### LAN (same network — zero config)

```bash
# Receiver
meshdrop receive

# Sender (discovers receiver automatically via mDNS)
meshdrop send ./file.zip
meshdrop send ./mydir/          # directory
meshdrop send --chunks 8 ./big.iso   # more parallel streams
```

When multiple receivers are found, an interactive prompt lets you choose.

### Resume an interrupted transfer

Just re-run the same command — MeshDrop detects the `.meshdrop-state` checkpoint and skips already-transferred chunks:

```bash
meshdrop send ./huge.iso        # interrupted mid-way
meshdrop send ./huge.iso        # resumes: "skipping 3/8 chunks"
```

### Pipe mode

```bash
# Sender
tar czf - ./src/ | meshdrop send --pipe

# Receiver
meshdrop receive --pipe | tar xzf -
```

### NAT traversal (different networks)

Start a relay server on a public host:

```bash
meshdrop relay --addr :8080
```

Then:

```bash
# Receiver
meshdrop receive --relay http://your-server:8080
# Outputs: Pairing code: XXXXXXXX

# Sender
meshdrop send --relay http://your-server:8080 --code XXXXXXXX ./file.zip
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│ meshdrop send                   meshdrop receive        │
│                                                         │
│  mDNS Advertise ←─────────────→ mDNS Browse            │
│                                                         │
│  QUIC dial ──────────────────→ QUIC listen              │
│                                                         │
│  Stream 0 (control)                                     │
│    Noise XX ──── Meta ────────────────────→             │
│               ←────── ResumeState ────────              │
│                                                         │
│  Stream 1..N (data, parallel)                           │
│    Noise XX ──── ChunkMeta + bytes ───────→             │
│                                                         │
│  BLAKE3-256 hash verified on completion                 │
└─────────────────────────────────────────────────────────┘
```

**Transport**: QUIC (quic-go) over UDP  
**Encryption**: Noise Protocol XX handshake per stream (flynn/noise)  
**Hash**: BLAKE3-256 (lukechampine/blake3)  
**Discovery**: mDNS / Zeroconf (grandcat/zeroconf)  
**NAT**: STUN (RFC 5389) + relay signaling + UDP hole punching

## License

MIT
