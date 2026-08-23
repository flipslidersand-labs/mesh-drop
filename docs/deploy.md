# MeshDrop Relay Server — Deployment Guide

This guide explains how to run a `meshdrop relay` server for NAT traversal in
production.  The relay is a lightweight HTTP(S) signalling server — it never
sees file content.

---

## Prerequisites

- A publicly accessible Linux server (VPS, VM, bare-metal)
- Port 8080 (or your chosen port) open in the firewall
- Docker or Go 1.21+ installed

---

## 1. Basic HTTP Setup

### Binary install

```sh
# Download the latest release binary for linux/amd64
curl -L https://github.com/flipslidersand-labs/mesh-drop/releases/latest/download/meshdrop-linux-amd64.tar.gz \
  | tar xz -C /usr/local/bin

# Start the relay (listens on :8080 by default)
meshdrop relay --addr :8080
```

### Systemd unit file

Create `/etc/systemd/system/meshdrop-relay.service`:

```ini
[Unit]
Description=MeshDrop relay server
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/meshdrop relay --addr :8080 --max-sessions 5000
Restart=on-failure
RestartSec=5
User=nobody
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes

[Install]
WantedBy=multi-user.target
```

Enable and start:

```sh
systemctl daemon-reload
systemctl enable --now meshdrop-relay
journalctl -u meshdrop-relay -f
```

---

## 2. HTTPS Setup (recommended)

Use `--cert` and `--key` to enable TLS directly on the relay:

```sh
meshdrop relay --addr :443 \
  --cert /etc/letsencrypt/live/relay.example.com/fullchain.pem \
  --key  /etc/letsencrypt/live/relay.example.com/privkey.pem
```

Or terminate TLS at a reverse proxy (see below).

---

## 3. Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl http2;
    server_name relay.example.com;

    ssl_certificate     /etc/letsencrypt/live/relay.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relay.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        # Required for long-poll rendezvous (up to 70s).
        proxy_read_timeout  90s;
        proxy_send_timeout  90s;

        # Forward the real client IP for accurate rate limiting.
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Start the relay with your proxy IP trusted:

```sh
meshdrop relay --addr :8080 --trusted-proxy 127.0.0.1
```

---

## 4. Docker Compose

```yaml
services:
  meshdrop-relay:
    image: ghcr.io/flipslidersand-labs/mesh-drop:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    command: ["relay", "--addr", ":8080", "--max-sessions", "5000"]
```

With nginx on the same host:

```yaml
services:
  meshdrop-relay:
    image: ghcr.io/flipslidersand-labs/mesh-drop:latest
    restart: unless-stopped
    expose:
      - "8080"
    command: ["relay", "--addr", ":8080", "--trusted-proxy", "172.17.0.1"]

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - meshdrop-relay
```

---

## 5. Health Check

The relay exposes a JSON health endpoint:

```sh
curl http://relay.example.com:8080/health
# {"sessions":3,"status":"ok"}
```

Use this for load balancer health checks or monitoring:

```nginx
location /health {
    proxy_pass http://127.0.0.1:8080;
    access_log off;
}
```

---

## 6. Prometheus Metrics

```sh
curl http://relay.example.com:8080/metrics
# relay_sessions_active 3
# relay_sessions_total 1042
# relay_create_rate_limited_total 5
# relay_join_rate_limited_total 12
# relay_session_duration_seconds_sum 183.4
# relay_session_duration_seconds_count 1042
```

---

## 7. Security Notes

- The relay never sees file content — only UDP `ip:port` pairs.
- Per-IP rate limiting (5 creates/min, 20 joins/min) is built in.
- Each IP is limited to 5 concurrent sessions to prevent resource exhaustion.
- `--max-sessions` caps global concurrent sessions (default: 10 000).
- Sessions auto-expire after 70 seconds if no peer joins.
- Run the relay as `nobody` (no write access to the filesystem).
- Place the relay behind Cloudflare or a WAF for additional DDoS protection.

---

## 8. Using a Self-Hosted Relay

```sh
# Sender (one side)
meshdrop receive --relay http://relay.example.com:8080

# Receiver outputs a pairing code; share it out-of-band, then:
meshdrop send --relay http://relay.example.com:8080 --code <CODE> myfile.txt
```

Or set the relay in your config file (`~/.meshdrop/config.yaml`):

```yaml
relay: "http://relay.example.com:8080"
```

Then `meshdrop send` and `meshdrop receive` will use it by default.
