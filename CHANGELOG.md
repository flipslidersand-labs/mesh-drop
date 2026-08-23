# Changelog

All notable changes to mesh-drop are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-08-23

### Added
- Relay: `--max-sessions` flag and `MESHDROP_RELAY_MAX_SESSIONS` env var to cap concurrent relay sessions (#327)
- Relay: Prometheus `/metrics` endpoint exposing session counters and latency histograms (#328)
- WebUI: optional `--auth-token` flag for Bearer-token access control (#387)
- WebUI: per-IP rate limiting middleware (30 req/min, burst 10) (#367)
- Release: GoReleaser pipeline with SBOM generation (syft/SPDX-JSON) and cosign keyless signing (#334)
- CI: golangci-lint workflow with `only-new-issues` mode (#280)
- CI: TLS certificate bundle and fingerprint unit tests (#355)

### Fixed
- Transfer: write received files to `.meshdrop.tmp` and atomic rename on success to prevent corrupt partial files (#359)
- Transfer: `filepath.Walk` → `filepath.WalkDir` to skip symlinks and avoid infinite loops (#352)
- Transfer: `WalkDir` now respects context cancellation during directory enumeration (#350)
- Transfer: pipe mode no longer uses a nil QUIC config (#351)
- Transfer: `Meta.Name` and `FileMeta.Path` reject control characters, null bytes, and invalid UTF-8 (#325)
- WebUI: `srv.Shutdown` now uses a 5-second timeout to prevent graceful shutdown hang (#354)
- WebUI: upload handler wraps body with `http.MaxBytesReader` (512 MiB) and returns 413 on oversize (#257)
- WebUI: `Content-Disposition` header uses RFC 6266-compliant `mime.FormatMediaType` escaping (#258)
- WebUI: protect `downloads` map reads with `dlMu.RLock` (#277)
- NAT: relay server no longer panics on random peer ID collisions (#323)
- NAT: relay client retries rendezvous on transient errors (#326)

### Security
- WebUI: HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Content-Security-Policy`) on all responses (#347)
- TLS: self-signed certificate validity extended from 24 h to 10 years to prevent mid-transfer expiry (#324)

### Changed
- Relay: `NewRelayServer` replaced by `NewRelayServerFull(trustedProxies, maxSessions)` (backward-compatible via `DefaultMaxSessions`)
- Binary: `version` variable now injected at build time via ldflags

## [0.3.0] - 2026-07-15

### Added
- Directory transfer with resume support (`--no-resume` flag to disable)
- WebUI: directory send via `/api/send-dir`
- WebUI: browser download of received files via `/api/downloads/{id}`
- WebUI: transfer progress bar, detail settings, and history log
- Pipe mode: stream stdin/stdout over QUIC (`--pipe` flag)
- zstd compression support (`--compress`, `--comp-level`)

### Fixed
- WebUI: send uses `s.runCtx` instead of request context to outlive the HTTP request

## [0.2.0] - 2026-06-20

### Added
- mDNS peer discovery (LAN zero-config mode)
- QUIC-based relay server for cross-NAT transfers
- BLAKE3 file integrity hashing
- Noise Protocol handshake for end-to-end encryption
- Web UI (embedded static assets)

## [0.1.0] - 2026-05-01

### Added
- Initial release: QUIC file transfer between two peers on the same LAN
- TLS with self-signed certificates and fingerprint pinning

[Unreleased]: https://github.com/flipslidersand-labs/mesh-drop/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/flipslidersand-labs/mesh-drop/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/flipslidersand-labs/mesh-drop/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/flipslidersand-labs/mesh-drop/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/flipslidersand-labs/mesh-drop/releases/tag/v0.1.0
