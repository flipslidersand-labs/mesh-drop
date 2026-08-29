#!/usr/bin/env python3
"""
Qdrant [knowledge] + Ollama RAG クエリスクリプト

使い方:
  python rag-query.py "Goのエラーハンドリングのベストプラクティスは？"
  python rag-query.py "Pythonで型エラーを防ぐには" --model llama3.2 --top-k 5
  python rag-query.py "..." --no-stream   # ストリーミング無効
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

# Parse --qdrant-url / --ollama-url before importing ingest modules so that
# QDRANT_URL is set in the environment before the module-level client is built.
def _parse_urls_early() -> tuple[str, str]:
    qdrant_default = os.getenv("QDRANT_URL", "http://localhost:6333")
    ollama_default = os.getenv("OLLAMA_URL", "http://localhost:11434")
    for i, arg in enumerate(sys.argv[1:], 1):
        if arg.startswith("--qdrant-url="):
            qdrant_default = arg.split("=", 1)[1]
        elif arg == "--qdrant-url" and i < len(sys.argv) - 1:
            qdrant_default = sys.argv[i + 1]
        if arg.startswith("--ollama-url="):
            ollama_default = arg.split("=", 1)[1]
        elif arg == "--ollama-url" and i < len(sys.argv) - 1:
            ollama_default = sys.argv[i + 1]
    return qdrant_default, ollama_default


_QDRANT_URL_EARLY, _OLLAMA_URL_EARLY = _parse_urls_early()
os.environ["QDRANT_URL"] = _QDRANT_URL_EARLY

sys.path.insert(0, str(Path(__file__).parent))
from ingest import embedder
from ingest import qdrant as qdrant_store

COLLECTION = "knowledge"
OLLAMA_URL = _OLLAMA_URL_EARLY
DEFAULT_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
DEFAULT_TOP_K = 5

SYSTEM_PROMPT = """あなたはプログラミングの専門家です。
提供されたコンテキスト（参考資料）を優先的に使い、質問に答えてください。
コンテキストに答えがない場合は、その旨を伝えた上で一般知識で補完してください。
回答は日本語で、具体的なコード例や理由を含めてください。"""


def search_knowledge(query: str, top_k: int, qdrant_url: str) -> list[dict]:
    try:
        vector = embedder.embed(query, collection=COLLECTION, mode="search")
        results = qdrant_store.search(COLLECTION, vector, limit=top_k)
        return results
    except (ConnectionRefusedError, OSError) as e:
        print(
            f"[エラー] embedding-svc / Qdrant に接続できません ({qdrant_url}): {e}",
            file=sys.stderr,
        )
        print(
            "  → MINIPC が起動しているか確認してください: ssh minipc 'systemctl --user status embedding-svc qdrant'",
            file=sys.stderr,
        )
        sys.exit(1)
    except Exception as e:
        print(f"[エラー] 検索中に予期しないエラー: {e}", file=sys.stderr)
        sys.exit(1)


def build_context(results: list[dict]) -> str:
    if not results:
        return "（参考資料なし）"
    parts = []
    for i, r in enumerate(results, 1):
        score = r.get("score", 0)
        url = r.get("url", "")
        title = r.get("title", "")
        text = r.get("text", "")
        parts.append(f"[{i}] {title} ({url}) score={score:.3f}\n{text[:600]}")
    return "\n\n---\n\n".join(parts)


def call_ollama_stream(prompt: str, model: str, ollama_url: str):
    payload = json.dumps(
        {
            "model": model,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            "stream": True,
        }
    ).encode()

    req = urllib.request.Request(
        f"{ollama_url}/api/chat",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            for line in resp:
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                    content = data.get("message", {}).get("content", "")
                    if content:
                        print(content, end="", flush=True)
                    if data.get("done"):
                        break
                except json.JSONDecodeError:
                    continue
        print()
    except (urllib.error.URLError, ConnectionRefusedError, OSError) as e:
        print(
            f"\n[エラー] Ollama に接続できません ({ollama_url}): {e}",
            file=sys.stderr,
        )
        print(
            "  → Ollama が起動しているか確認してください: ollama serve  または  systemctl --user status ollama",
            file=sys.stderr,
        )
        sys.exit(1)


def call_ollama_blocking(prompt: str, model: str, ollama_url: str) -> str:
    payload = json.dumps(
        {
            "model": model,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            "stream": False,
        }
    ).encode()

    req = urllib.request.Request(
        f"{ollama_url}/api/chat",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
        return data.get("message", {}).get("content", "")
    except (urllib.error.URLError, ConnectionRefusedError, OSError) as e:
        print(
            f"[エラー] Ollama に接続できません ({ollama_url}): {e}",
            file=sys.stderr,
        )
        print(
            "  → Ollama が起動しているか確認してください: ollama serve  または  systemctl --user status ollama",
            file=sys.stderr,
        )
        sys.exit(1)


def main():
    global OLLAMA_URL
    parser = argparse.ArgumentParser(description="Qdrant + Ollama RAG")
    parser.add_argument("query", help="質問テキスト")
    parser.add_argument(
        "--model", default=DEFAULT_MODEL, help=f"Ollama モデル名 (default: {DEFAULT_MODEL})"
    )
    parser.add_argument("--top-k", type=int, default=DEFAULT_TOP_K, help="参照チャンク数")
    parser.add_argument("--no-stream", action="store_true", help="ストリーミング無効")
    parser.add_argument("--show-sources", action="store_true", help="参照元を表示")
    parser.add_argument(
        "--qdrant-url",
        default=_QDRANT_URL_EARLY,
    )
    parser.add_argument("--ollama-url", default=_OLLAMA_URL_EARLY)
    args = parser.parse_args()

    # URLs already applied to env before import; keep OLLAMA_URL in sync
    OLLAMA_URL = args.ollama_url

    print(f"[検索中] collection={COLLECTION}, top_k={args.top_k}...")
    results = search_knowledge(args.query, args.top_k, args.qdrant_url)

    if args.show_sources:
        print(f"\n--- 参照元 ({len(results)} 件) ---")
        for r in results:
            score = r.get("score", 0)
            url = r.get("url", "")
            title = r.get("title", "no title")
            print(f"  [{score:.3f}] {title}\n         {url}")
        print()

    context = build_context(results)
    prompt = f"""以下の参考資料を踏まえて質問に答えてください。

## 参考資料
{context}

## 質問
{args.query}"""

    print(f"[Ollama: {args.model}] 回答生成中...\n")
    if args.no_stream:
        answer = call_ollama_blocking(prompt, args.model, args.ollama_url)
        print(answer)
    else:
        call_ollama_stream(prompt, args.model, args.ollama_url)


if __name__ == "__main__":
    main()
