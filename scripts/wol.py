#!/usr/bin/env python3
"""
WoL (Wake-on-LAN) コマンド
Usage:
  python3 scripts/wol.py           # YUKI + DS1 両方起動
  python3 scripts/wol.py yuki      # YUKI のみ
  python3 scripts/wol.py ds1       # DS1 のみ
  python3 scripts/wol.py status    # 両台の SSH 到達確認
"""

import socket
import sys

NODES = {
    "yuki": {"ip": "192.168.68.56", "mac": "bc:fc:e7:87:78:cb", "label": "YUKI (RTX4070)"},
    "ds1": {"ip": "192.168.68.60", "mac": "60:cf:84:cb:39:88", "label": "DS1  (RTX4060)"},
}
BROADCAST = "192.168.68.255"


def send_wol(mac: str) -> None:
    mac_bytes = bytes.fromhex(mac.replace(":", ""))
    packet = b"\xff" * 6 + mac_bytes * 16
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        s.sendto(packet, (BROADCAST, 9))


def is_reachable(ip: str, port: int = 22, timeout: float = 3.0) -> bool:
    """nc の代わりに socket.create_connection で SSH 到達確認（nc 依存なし）"""
    try:
        with socket.create_connection((ip, port), timeout=timeout):
            return True
    except OSError:
        return False


def wake(name: str) -> None:
    node = NODES[name]
    send_wol(node["mac"])
    print(f"WoL sent → {node['label']}  {node['ip']}  {node['mac']}")


def status() -> None:
    all_ok = True
    for name, node in NODES.items():
        reachable = is_reachable(node["ip"])
        if not reachable:
            all_ok = False
        mark = "✅" if reachable else "❌"
        print(f"{mark} {node['label']}  {node['ip']}  {'SSH OK' if reachable else 'offline'}")
    if not all_ok:
        sys.exit(1)


def main() -> None:
    args = sys.argv[1:]

    if not args:
        for name in NODES:
            wake(name)
        return

    cmd = args[0].lower()

    if cmd == "status":
        status()
    elif cmd in NODES:
        wake(cmd)
    else:
        print(f"Unknown target: {cmd}")
        print(f"Usage: wol [{'|'.join(NODES)}|status]")
        sys.exit(1)


if __name__ == "__main__":
    main()
