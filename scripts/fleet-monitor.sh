#!/bin/bash
# fleet-monitor.sh — ランナーフリート死活監視 (MINIPC cron 5分間隔)
#
# 監視対象: YUKI (ai-primary) / DS1 (ai-secondary) / dev-pc (arc-dev-nodee)
#
# 環境変数 (~/.config/fleet-monitor/env):
#   DISCORD_WEBHOOK    — Discord Webhook URL
#   YUKI_IP            — YUKI の IP アドレス
#   YUKI_MAC           — YUKI の MAC アドレス (WoL 用)
#   YUKI_LABEL         — YUKI のラベル (default: ai-primary)
#   YUKI_SSH_USER      — YUKI SSH ユーザー
#   YUKI_SSH_PORT      — YUKI SSH ポート (default: 22)
#   DS1_IP             — DS1 の IP アドレス
#   DS1_MAC            — DS1 の MAC アドレス (WoL 用)
#   DS1_WOL_BROADCAST  — DS1 WoL ブロードキャストアドレス
#   DS1_LABEL          — DS1 のラベル (default: ai-secondary)
#   DS1_SSH_USER       — DS1 WSL SSH ユーザー
#   DS1_SSH_PORT       — DS1 WSL SSH ポート (default: 2222)
#   ARC_NAMESPACE      — ARC runner namespace (default: arc-systems)
#
# cron 登録例:
#   */5 * * * * bash /home/dev-nodee/projects/scripts/fleet-monitor.sh >> /var/log/fleet-monitor/monitor.log 2>&1

set -euo pipefail

# ── 設定 ────────────────────────────────────────────────────────────────────
ENV_FILE="${FLEET_MONITOR_ENV:-$HOME/.config/fleet-monitor/env}"
LOG_DIR="/var/log/fleet-monitor"
STATE_DIR="/tmp/fleet-monitor-state"
LOCK_FILE="/tmp/fleet-monitor.lock"

# ── 初期化 ──────────────────────────────────────────────────────────────────
mkdir -p "$LOG_DIR" "$STATE_DIR"

# 環境変数ロード
if [ -f "$ENV_FILE" ]; then
  # shellcheck source=/dev/null
  source "$ENV_FILE"
fi

# IP/MAC/ユーザー名はすべて env から読む（ハードコード禁止・#980 対応）
DISCORD_WEBHOOK="${DISCORD_WEBHOOK:-}"

YUKI_IP="${YUKI_IP:-}"
YUKI_MAC="${YUKI_MAC:-}"
YUKI_LABEL="${YUKI_LABEL:-ai-primary}"
YUKI_SSH_USER="${YUKI_SSH_USER:-}"
YUKI_SSH_PORT="${YUKI_SSH_PORT:-22}"

DS1_IP="${DS1_IP:-}"
DS1_MAC="${DS1_MAC:-}"
DS1_WOL_BROADCAST="${DS1_WOL_BROADCAST:-}"
DS1_LABEL="${DS1_LABEL:-ai-secondary}"
DS1_SSH_USER="${DS1_SSH_USER:-}"
DS1_SSH_PORT="${DS1_SSH_PORT:-2222}"

ARC_NAMESPACE="${ARC_NAMESPACE:-arc-systems}"

# ── 多重起動防止 ─────────────────────────────────────────────────────────────
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "[$(date -u +%H:%M:%S)] fleet-monitor already running, skipping" >&2
  exit 0
fi

# ── ヘルパー関数 ─────────────────────────────────────────────────────────────
ts() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

log() {
  echo "[$(ts)] $*"
}

discord_alert() {
  local msg="$1"
  if [ -z "$DISCORD_WEBHOOK" ]; then
    log "DISCORD_WEBHOOK not set — skipping alert: $msg"
    return
  fi
  curl -sf -H "Content-Type: application/json" \
    -d "{\"content\":\"${msg}\"}" \
    "$DISCORD_WEBHOOK" >/dev/null 2>&1 || log "Discord alert failed"
}

# SSH 到達確認 (5秒タイムアウト)
is_ssh_reachable() {
  local ip="$1"
  nc -zw5 "$ip" 22 2>/dev/null
}

# k8s でランナー Pod が Running か確認 (SSH 経由)
# arc-systems namespace の Running pod 数を返す
is_runner_pod_running() {
  local ip="$1"
  local user="$2"
  local port="${3:-22}"
  local count
  count=$(ssh -o ConnectTimeout=5 -o BatchMode=yes -o StrictHostKeyChecking=no \
    -p "$port" "${user}@${ip}" \
    "kubectl get pods -n ${ARC_NAMESPACE} --no-headers 2>/dev/null | grep -c Running" \
    2>/dev/null || echo 0)
  echo "${count:-0}"
}

# WoL パケット送信
send_wol() {
  local mac="$1"
  local broadcast="${2:-}"
  if [ -z "$broadcast" ]; then
    log "WoL broadcast address not set — skipping WoL for $mac"
    return 1
  fi
  python3 - <<EOF
import socket
mac = "$mac"
mac_bytes = bytes.fromhex(mac.replace(":", ""))
packet = b"\xff" * 6 + mac_bytes * 16
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    s.sendto(packet, ("$broadcast", 9))
print(f"WoL sent to {mac}")
EOF
}

# ステート管理: 直前の通知時刻を記録してアラート重複を防ぐ
# 同じ障害で 30 分以内は再通知しない
should_alert() {
  local key="$1"
  local state_file="$STATE_DIR/${key}.last_alert"
  local now
  now=$(date +%s)
  local cooldown=1800  # 30分

  if [ -f "$state_file" ]; then
    local last
    last=$(cat "$state_file")
    if [ $((now - last)) -lt $cooldown ]; then
      return 1  # クールダウン中
    fi
  fi
  echo "$now" > "$state_file"
  return 0
}

clear_alert_state() {
  local key="$1"
  rm -f "$STATE_DIR/${key}.last_alert"
}

# ── YUKI 監視 ────────────────────────────────────────────────────────────────
log "=== Fleet Monitor Start ==="

check_yuki() {
  if [ -z "$YUKI_IP" ] || [ -z "$YUKI_SSH_USER" ]; then
    log "YUKI_IP / YUKI_SSH_USER not set in env — skipping YUKI check"
    return
  fi
  log "Checking YUKI ($YUKI_IP)..."
  local runner_count
  runner_count=$(is_runner_pod_running "$YUKI_IP" "$YUKI_SSH_USER" "$YUKI_SSH_PORT")

  if [ "${runner_count}" -gt 0 ] 2>/dev/null; then
    log "✅ YUKI: runner pods online (count=${runner_count})"
    clear_alert_state "yuki_offline"
    clear_alert_state "yuki_wsl2_stopped"
    return
  fi

  # pod offline — SSH で生死確認
  if is_ssh_reachable "$YUKI_IP"; then
    log "⚠️ YUKI: SSH reachable but runner pods not Running — WSL2 / k3s may not be running"
    if should_alert "yuki_wsl2_stopped"; then
      discord_alert "⚠️ **[fleet-monitor] YUKI WSL2 停止疑い**\nSSH は応答するが arc-systems pods がオフライン。\nWSL2 / k3s / ARC runner を手動確認してください。\nHost: ${YUKI_IP}"
    fi
  else
    log "❌ YUKI: offline — sending WoL"
    send_wol "$YUKI_MAC" "$DS1_WOL_BROADCAST" || log "WoL send failed"

    if should_alert "yuki_offline"; then
      discord_alert "⚠️ **[fleet-monitor] YUKI オフライン検知 → WoL 送信**\nIP: ${YUKI_IP} / MAC: ${YUKI_MAC}\n起動後に WSL2 / k3s / ARC runner を確認してください。"
    fi
  fi
}

# ── DS1 監視 ─────────────────────────────────────────────────────────────────
check_ds1() {
  if [ -z "$DS1_IP" ] || [ -z "$DS1_SSH_USER" ]; then
    log "DS1_IP / DS1_SSH_USER not set in env — skipping DS1 check"
    return
  fi
  log "Checking DS1 ($DS1_IP)..."
  local runner_count
  runner_count=$(is_runner_pod_running "$DS1_IP" "$DS1_SSH_USER" "$DS1_SSH_PORT")

  if [ "${runner_count}" -gt 0 ] 2>/dev/null; then
    log "✅ DS1: runner pods online (count=${runner_count})"
    clear_alert_state "ds1_offline"
    clear_alert_state "ds1_wsl2_stopped"
    return
  fi

  if is_ssh_reachable "$DS1_IP"; then
    log "⚠️ DS1: SSH reachable but runner pods not Running — WSL2 / k3s may not be running"
    if should_alert "ds1_wsl2_stopped"; then
      discord_alert "⚠️ **[fleet-monitor] DS1 WSL2 停止疑い**\nSSH は応答するが arc-systems pods がオフライン。\nWSL2 / k3s / ARC runner を手動確認してください。\nHost: ${DS1_IP}"
    fi
  else
    log "❌ DS1: offline — sending WoL"
    send_wol "$DS1_MAC" "$DS1_WOL_BROADCAST" || log "WoL send failed"

    if should_alert "ds1_offline"; then
      discord_alert "⚠️ **[fleet-monitor] DS1 オフライン検知 → WoL 送信**\nIP: ${DS1_IP} / MAC: ${DS1_MAC}\n起動後に WSL2 / k3s / ARC runner を確認してください。"
    fi
  fi
}

check_yuki
check_ds1

log "=== Fleet Monitor End ==="
