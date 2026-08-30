#!/bin/bash
# MINIPC Platform リポジトリ定期バックアップスクリプト
# 実行: 毎週月曜 08:15 via cron: 15 8 * * 1 /usr/local/bin/backup-projects.sh

set -eo pipefail

# 多重起動防止 (flock) -------------------------------------------------------
LOCK_FILE="/var/lock/backup-projects.lock"
exec 200>"$LOCK_FILE"
if ! flock -n 200; then
    echo "[$( date '+%Y-%m-%d %H:%M:%S')] ⚠ Another backup is already running. Exiting." >&2
    exit 0
fi

# 設定
SOURCE_DIR="/home/yuki/projects"
BACKUP_MOUNT="/mnt/backup"
BACKUP_BASE="${BACKUP_MOUNT}/platform-repo"
LOG_FILE="/var/log/backup-projects.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
DATE_TAG=$(date '+%Y%m%d')
# ISO 8601 週タグ: 年跨ぎで week-01 が衝突しないよう %G-w%V を使用
WEEK_TAG=$(date '+%G-w%V')

# ログ関数
log() {
    echo "[$TIMESTAMP] $*" | tee -a "$LOG_FILE"
}

# Discord 通知送信関数 --------------------------------------------------------
# 引数: $1=title, $2=color(integer), $3=description
send_discord() {
    local title="$1"
    local color="$2"
    local description="$3"

    [ -z "$SKIP_NOTIFICATION" ] || return 0

    WEBHOOK_URL="${DISCORD_WEBHOOK_URL}"
    if [ -z "$WEBHOOK_URL" ] && [ -n "$VAULT_ADDR" ] && [ -n "$VAULT_TOKEN" ]; then
        WEBHOOK_URL=$(vault kv get -field=url secret/discord-webhook 2>/dev/null)
    fi

    [ -n "$WEBHOOK_URL" ] || return 0

    local embed_json
    embed_json=$(cat <<EOF
{
  "username": "MINIPC Backup",
  "avatar_url": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  "embeds": [
    {
      "title": "$title",
      "description": "$description",
      "color": $color,
      "footer": {"text": "MINIPC Backup"}
    }
  ]
}
EOF
)
    curl -s -X POST "$WEBHOOK_URL" \
        -H 'Content-Type: application/json' \
        -d "$embed_json" >/dev/null 2>&1 && \
        log "✓ Discord notification sent" || \
        log "⚠ Discord notification failed (curl error)"
}

# 失敗ハンドラ ---------------------------------------------------------------
BACKUP_FAILED=0
FAIL_REASON=""

fail() {
    BACKUP_FAILED=1
    FAIL_REASON="$*"
    log "✗ BACKUP FAILED: $*"
}

log "=== BACKUP START ==="

# Step 1: バックアップ先の確認
log "Checking backup destination..."
if ! mountpoint -q "$BACKUP_MOUNT"; then
    log "⚠ Backup mount point not available: $BACKUP_MOUNT"
    log "⚠ Skipping backup. Mount the backup drive or NAS:"
    log "  sudo mkdir -p $BACKUP_MOUNT"
    log "  sudo mount -t nfs <nas-ip>:<path> $BACKUP_MOUNT"
    log "⚠ Or configure USB: sudo mount /dev/sdXn $BACKUP_MOUNT"
    exit 1
fi
log "✓ Backup destination ready"

# Step 2: ディレクトリ作成
mkdir -p "$BACKUP_BASE/weekly" "$BACKUP_BASE/monthly" "$BACKUP_BASE/logs"

# Step 3: 差分バックアップ（毎週）
log "Starting weekly differential backup..."
WEEKLY_DIR="$BACKUP_BASE/weekly/week-${WEEK_TAG}"
mkdir -p "$WEEKLY_DIR"

# rsync の exit code を明示捕捉する
# exit code 24 = source ファイルが転送中に消えた (vanished) → 許容
RSYNC_EXIT=0
rsync -av --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='__pycache__' \
    --exclude='.venv' \
    --exclude='target' \
    --exclude='dist' \
    --exclude='.env' \
    --exclude='.env.*' \
    "${SOURCE_DIR}/" "$WEEKLY_DIR/" 2>&1 | tee -a "$LOG_FILE" || RSYNC_EXIT=$?

if [ "$RSYNC_EXIT" -ne 0 ] && [ "$RSYNC_EXIT" -ne 24 ]; then
    fail "rsync exited with code $RSYNC_EXIT (weekly backup)"
else
    log "✓ Weekly differential backup completed"
fi

# Step 4: 月次フルバックアップ（毎月1日実行）
MONTH_DAY=$(date '+%d')
if [ "$MONTH_DAY" = "01" ]; then
    log "Starting monthly full backup (compressed)..."
    MONTHLY_DIR="$BACKUP_BASE/monthly"
    MONTHLY_FILE="${MONTHLY_DIR}/platform-$(date '+%Y-%m').tar.gz"

    TAR_EXIT=0
    tar --exclude='.git' \
        --exclude='node_modules' \
        --exclude='__pycache__' \
        --exclude='.venv' \
        --exclude='target' \
        --exclude='dist' \
        --exclude='.env' \
        --exclude='.env.*' \
        -czf "$MONTHLY_FILE" \
        -C "$(dirname "$SOURCE_DIR")" "$(basename "$SOURCE_DIR")" 2>&1 | tee -a "$LOG_FILE" || TAR_EXIT=$?

    if [ "$TAR_EXIT" -ne 0 ]; then
        fail "tar exited with code $TAR_EXIT (monthly backup)"
    else
        MONTHLY_SIZE=$(du -h "$MONTHLY_FILE" | cut -f1)
        log "✓ Monthly backup created: $MONTHLY_FILE ($MONTHLY_SIZE)"
    fi
else
    log "ℹ Monthly backup skipped (runs on 1st of month)"
fi

# Step 5: ローテーション（古いバックアップ削除）
log "Cleaning up old backups..."

# 週次: 15週分保持
WEEKLY_COUNT=$(ls -d "$BACKUP_BASE/weekly"/week-* 2>/dev/null | wc -l)
if [ "$WEEKLY_COUNT" -gt 15 ]; then
    REMOVE_COUNT=$((WEEKLY_COUNT - 15))
    ls -d "$BACKUP_BASE/weekly"/week-* | sort | head -n "$REMOVE_COUNT" | xargs -I {} rm -rf {} && \
    log "✓ Removed $REMOVE_COUNT old weekly backups"
fi

# 月次: 12ヶ月分保持
MONTHLY_COUNT=$(ls "$BACKUP_BASE/monthly"/*.tar.gz 2>/dev/null | wc -l)
if [ "$MONTHLY_COUNT" -gt 12 ]; then
    REMOVE_COUNT=$((MONTHLY_COUNT - 12))
    ls "$BACKUP_BASE/monthly"/*.tar.gz | sort | head -n "$REMOVE_COUNT" | xargs -I {} rm {} && \
    log "✓ Removed $REMOVE_COUNT old monthly backups"
fi

# Step 6: バックアップ統計
log "Computing backup statistics..."
TOTAL_SIZE=$(du -sh "$BACKUP_BASE" | cut -f1)
WEEKLY_SIZE=$(du -sh "$BACKUP_BASE/weekly" 2>/dev/null | cut -f1 || echo "0")
MONTHLY_SIZE=$(du -sh "$BACKUP_BASE/monthly" 2>/dev/null | cut -f1 || echo "0")

SUMMARY="
📦 **Backup Statistics**
• Total: $TOTAL_SIZE
• Weekly: $WEEKLY_SIZE
• Monthly: $MONTHLY_SIZE
"
log "$SUMMARY"

# Step 7: Discord 通知（成功 / 失敗を分岐）
if [ "$BACKUP_FAILED" -eq 0 ]; then
    log "=== BACKUP END (SUCCESS) ==="
    send_discord \
        "✅ Backup Completed" \
        3066993 \
        "Total: $TOTAL_SIZE | Weekly: $WEEKLY_SIZE | Monthly: $MONTHLY_SIZE"
else
    log "=== BACKUP END (FAILED) ==="
    # 失敗でも exit code を 1 にして cron に伝える
    send_discord \
        "🔴 Backup FAILED" \
        15158332 \
        "Reason: $FAIL_REASON\nCheck log: $LOG_FILE"
    exit 1
fi

log ""
