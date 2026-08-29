#!/usr/bin/env bash
# gate-log.sh — 検証ゲートの各フェーズのメトリクス + AI指摘を構造化して記録する Day1 hook。
#
# これは #85（学習ラチェット）と #87（1週間後ログ分析）の土台。
# 「捕まえた指摘を貯めて、次回の自動チェックに焼く」ための入口。
#
# 動作（非ブロッキング・失敗してもゲートは止めない）:
#   1. 構造化 JSON レコードを stdout に出力（Actions ログから常に retrievable）
#   2. QDRANT_URL があれば gate_logs コレクションへ best-effort で蓄積
#
# 使い方:
#   scripts/gate-log.sh --tier T2 --reviewer gemini --pr 110 \
#       --diff-lines 320 --findings-file gemini-review.md
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

TIER="" REVIEWER="" PR="" DIFF_LINES="" FINDINGS_FILE="" VERDICT=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tier)          TIER="$2"; shift 2;;
    --reviewer)      REVIEWER="$2"; shift 2;;
    --pr)            PR="$2"; shift 2;;
    --diff-lines)    DIFF_LINES="$2"; shift 2;;
    --findings-file) FINDINGS_FILE="$2"; shift 2;;
    --verdict)       VERDICT="$2"; shift 2;;
    *) echo "gate-log: 不明な引数 $1"; shift;;
  esac
done

FINDINGS=""
[ -n "$FINDINGS_FILE" ] && [ -f "$FINDINGS_FILE" ] && FINDINGS=$(cat "$FINDINGS_FILE")

RECORD=$(TIER="$TIER" REVIEWER="$REVIEWER" PR="$PR" DIFF_LINES="$DIFF_LINES" \
  VERDICT="$VERDICT" FINDINGS="$FINDINGS" \
  REPO="${GITHUB_REPOSITORY:-local}" SHA="${GITHUB_SHA:-}" RUN_ID="${GITHUB_RUN_ID:-}" \
  python3 -c '
import json, os, datetime
print(json.dumps({
    "ts": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "repo": os.environ.get("REPO", ""),
    "pr": os.environ.get("PR", ""),
    "tier": os.environ.get("TIER", ""),
    "reviewer": os.environ.get("REVIEWER", ""),
    "diff_lines": os.environ.get("DIFF_LINES", ""),
    "verdict": os.environ.get("VERDICT", ""),
    "findings": os.environ.get("FINDINGS", ""),
    "sha": os.environ.get("SHA", ""),
    "run_id": os.environ.get("RUN_ID", ""),
}, ensure_ascii=False))')

# 1) 常に構造化ログを出力（Actions ログに残る = 最低限の retrievable 経路）
echo "::group::gate-log record"
echo "GATE_LOG_RECORD $RECORD"
echo "::endgroup::"

# 2) Qdrant があれば best-effort 蓄積（無くても成功扱い）
if [ -n "${QDRANT_URL:-}" ]; then
  # MINIPC embedding-svc (e5モデル) で embedding (#789 修正: Vertex → e5)
  # 内部 IP はハードコードせず EMBEDDING_SVC_URL 環境変数で指定すること
  # 例: export EMBEDDING_SVC_URL=http://<MINIPC_HOST>:9092
  _EMBED_SVC="${EMBEDDING_SVC_URL:-}"
  _EMBED_KEY="${EMBEDDING_API_KEY:-}"
  # ~/.config/memory-ingest/env から API キーを補完
  if [ -z "$_EMBED_KEY" ] && [ -f "$HOME/.config/memory-ingest/env" ]; then
    _EMBED_KEY=$(grep '^EMBEDDING_API_KEY=' "$HOME/.config/memory-ingest/env" | cut -d= -f2-)
  fi
  # ~/.config/memory-ingest/env から EMBEDDING_SVC_URL を補完
  if [ -z "$_EMBED_SVC" ] && [ -f "$HOME/.config/memory-ingest/env" ]; then
    _EMBED_SVC=$(grep '^EMBEDDING_SVC_URL=' "$HOME/.config/memory-ingest/env" | cut -d= -f2-)
  fi

  VEC="[]"
  if [ -n "$FINDINGS" ] && [ -n "$_EMBED_SVC" ]; then
    VEC=$(EMBED_SVC="$_EMBED_SVC" EMBED_KEY="$_EMBED_KEY" FINDINGS="$FINDINGS" python3 - <<'PYEMBED'
import json, os, urllib.request
try:
    url = os.environ["EMBED_SVC"].rstrip("/") + "/embed"
    key = os.environ.get("EMBED_KEY", "")
    text = "passage: " + os.environ.get("FINDINGS", "")[:1000]
    body = json.dumps({"text": text, "collection": "gate_logs", "mode": "index"}).encode()
    req = urllib.request.Request(url, data=body,
        headers={"Content-Type": "application/json", "X-API-Key": key})
    with urllib.request.urlopen(req, timeout=10) as r:
        print(json.dumps(json.loads(r.read())["vector"]))
except Exception:
    print("[]")
PYEMBED
    )
  fi

  RECORD="$RECORD" VEC="$VEC" QDRANT_URL="$QDRANT_URL" QDRANT_API_KEY="${QDRANT_API_KEY:-}" \
  python3 - <<'PY'
import json, os, urllib.request, hashlib

# best-effort: どんな失敗も握り潰す（ゲートを止めない・Traceback を出さない）
try:
    rec = json.loads(os.environ["RECORD"])
    base = os.environ["QDRANT_URL"].rstrip("/")
    api_key = os.environ.get("QDRANT_API_KEY", "")
    coll = "gate_logs"
    DIM = 768

    # 埋め込みベクトル（失敗/未取得なら zero-vector）
    try:
        vec = json.loads(os.environ.get("VEC", "[]"))
    except Exception:
        vec = []
    if not isinstance(vec, list) or len(vec) != DIM:
        vec = [0.0] * DIM

    # 同一 sha+tier+reviewer は上書き、複数指摘を区別するため findings 先頭も id に混ぜる
    seed = rec["sha"] + rec["tier"] + rec["reviewer"] + rec.get("findings", "")[:64]
    pid = int(hashlib.sha1(seed.encode()).hexdigest()[:15], 16)

    def req(method, path, body=None):
        data = json.dumps(body).encode() if body is not None else None
        r = urllib.request.Request(base + path, data=data, method=method,
                                   headers={"Content-Type": "application/json",
                                            **({"api-key": api_key} if api_key else {})})
        return urllib.request.urlopen(r, timeout=15)

    try:
        req("PUT", f"/collections/{coll}", {"vectors": {"size": DIM, "distance": "Cosine"}})
    except Exception:
        pass  # 既存コレクションなら 4xx — 無視

    req("PUT", f"/collections/{coll}/points",
        {"points": [{"id": pid, "vector": vec, "payload": rec}]})
    embedded = "embedded" if any(vec) else "zero-vec"
    print(f"gate-log: Qdrant {coll} に記録 (id={pid}, {embedded})")
except Exception as e:
    print(f"gate-log: Qdrant 蓄積は best-effort のためスキップ ({type(e).__name__})")
PY
fi
