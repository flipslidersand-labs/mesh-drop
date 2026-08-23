# Contributing to mesh-drop

## Dev setup

**Requirements:** Go 1.25+

```bash
git clone https://github.com/flipslidersand-labs/mesh-drop.git
cd mesh-drop
go mod download
go build ./...
```

## Running tests

```bash
go test ./...
```

Lint (requires [golangci-lint](https://golangci-lint.run/)):

```bash
golangci-lint run
```

## Making changes

1. Open or find an issue that describes the change
2. Create a branch: `git checkout -b fix/issue-number-short-description`
3. Write tests for your change
4. Run `go test ./...` and `go vet ./...` locally
5. Open a PR against `master`

### Branch naming

| Type | Pattern |
|---|---|
| Bug fix | `fix/NNN-description` |
| Feature | `feat/NNN-description` |
| Test | `test/NNN-description` |
| CI/tooling | `ci/NNN-description` |
| Security | `security/NNN-description` |

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(transfer): add zstd compression

Short explanation of what and why.
```

Types: `feat`, `fix`, `test`, `ci`, `docs`, `chore`, `perf`, `refactor`, `security`

## Architecture

```
cmd/meshdrop/        CLI entry point (cobra)
internal/
  discovery/         mDNS peer discovery
  nat/               QUIC relay server + client
  transfer/          QUIC file transfer engine (send/receive)
  webui/             Embedded HTTP Web UI
```

Key design decisions:
- **QUIC transport** — multiplexed streams, built-in TLS
- **Noise Protocol** handshake for peer authentication and E2E encryption
- **BLAKE3** for fast file integrity verification
- **Atomic writes** — temp file + `os.Rename` to prevent corrupt partial files on abort

## PR checklist

- [ ] Tests added or updated
- [ ] `go test ./...` passes
- [ ] `go vet ./...` passes
- [ ] Commit messages follow Conventional Commits
- [ ] CHANGELOG.md updated (add entry under `[Unreleased]`)
