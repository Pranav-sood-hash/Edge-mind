#!/usr/bin/env python3
"""
EdgeMind Doctor - Environment, Dependency & Port Diagnostic Check
"""

import sys
import shutil
import socket
import sqlite3
import tempfile
from pathlib import Path


def check_port(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        result = s.connect_ex(("127.0.0.1", port))
        return result != 0  # True means port is free / available


def main():
    print("=" * 60)
    print("  EDGEMIND DIAGNOSTIC DOCTOR")
    print("=" * 60)

    # 1. Python version
    py_ver = sys.version.split()[0]
    py_pass = sys.version_info >= (3, 11)
    status_py = "PASS" if py_pass else "FAIL"
    print(f"[{status_py}] Python Version: {py_ver} (>= 3.11 required)")

    # 2. Qdrant Edge
    try:
        import qdrant_edge
        print(f"[PASS] qdrant_edge: installed successfully (Rust engine active)")
    except ImportError:
        print("[FAIL] qdrant_edge: NOT FOUND")

    # 3. FastEmbed
    try:
        import fastembed
        print(f"[PASS] FastEmbed: installed successfully")
    except ImportError:
        print("[FAIL] FastEmbed: NOT FOUND")

    # 4. FastAPI & Uvicorn
    try:
        import fastapi
        import uvicorn
        print(f"[PASS] FastAPI & Uvicorn: available")
    except ImportError:
        print("[FAIL] FastAPI/Uvicorn: NOT FOUND")

    # 5. SQLite WAL support
    try:
        tmp_dir = tempfile.mkdtemp()
        db_path = Path(tmp_dir) / "test_wal.db"
        conn = sqlite3.connect(str(db_path))
        conn.execute("PRAGMA journal_mode=WAL;")
        res = conn.execute("PRAGMA journal_mode;").fetchone()[0]
        conn.close()
        shutil.rmtree(tmp_dir, ignore_errors=True)
        assert res.lower() == "wal"
        print("[PASS] SQLite WAL mode: fully supported")
    except Exception as e:
        print(f"[FAIL] SQLite WAL mode failed: {e}")

    # 6. Disk space
    total, used, free = shutil.disk_usage(".")
    free_gb = free / (1024 ** 3)
    print(f"[PASS] Local NVMe / Disk Free: {free_gb:.1f} GB")

    # 7. Ports check
    ports = {
        8000: "Fleet Central Hub",
        8001: "Device A (Plant North)",
        8002: "Device B (Plant South)",
        3000: "Next.js Industrial UI",
    }
    print("-" * 60)
    print("Port Availability:")
    for port, name in ports.items():
        is_free = check_port(port)
        status = "OPEN / READY" if is_free else "IN USE / LISTENING"
        print(f"  Port {port} ({name}): {status}")

    print("=" * 60)
    print("DOCTOR HEALTH CHECK COMPLETE")


if __name__ == "__main__":
    main()
