# Edge-mind

**EdgeMind** is an offline-first edge vector memory platform built for industrial field-service copilots (compressors, slurry pumps, gas turbines, inspection drones). It demonstrates an intelligent edge-to-cloud AI synchronization workflow on **Qdrant Edge** and **FastEmbed**, guaranteeing 100% air-gapped local query execution, deterministic conflict arbitration, and provable bandwidth preservation.

---

## 🎯 Highlights & Non-Negotiables
1. **100% Air-Gapped Local Search**: Ingestion and hybrid vector lookup run completely on-device with zero outbound network egress.
2. **Qdrant Edge Adapter**: Isolated to `device/app/memory/store.py` behind the strictly typed `MemoryStore` Protocol.
3. **Hybrid RRF Search**: Dense cosine embeddings (`BAAI/bge-small-en-v1.5`, 384 dimensions) + Sparse BM25 (`Qdrant/bm25` with IDF modifier) with Reciprocal Rank Fusion (`k=60`).
4. **Deterministic Policy Engine**: Pure Python, zero-network hard rules (PII regex scrub, payload size guard) + weighted soft factors (content-hash deduplication, authority bonus, novelty factor, vagueness penalty).
5. **C1–C4 Conflict Engine**: CRDT-style vector divergence resolution (`authority > version > time > human`) with verifiable lineage DAG.
6. **Crash-Safe SQLite WAL Ledger**: Two-phase write (ledger row `NEW` \(\to\) shard write \(\to\) outbox `PENDING`) with boot reconciliation (`reconcile()`).

---

## 🏗️ Repository Architecture
```
edgemind/
  ├── AGENTS.md                  # Roles contract (Edge, Sync, UI)
  ├── docs/                      # PRD, Architecture, and Sync specs
  ├── data/
  │   ├── domain/                # Industrial claims and PII regex patterns
  │   └── seed/                  # Golden test vectors and 450 industrial memories
  ├── device/
  │   ├── app/
  │   │   ├── memory/            # Qdrant Edge adapter & Memory data model
  │   │   ├── embed/             # FastEmbed dense (BGE) + sparse (BM25) embedder
  │   │   ├── ingest/            # Chunking, PII scrub, parametric claim extractors
  │   │   ├── policy/            # Hard rules + soft factor triage engine
  │   │   ├── conflicts/         # C1-C4 conflict arbitration & lineage
  │   │   ├── ledger/            # SQLite WAL ledger (outbox, decisions, events)
  │   │   ├── sync/              # CloudClient air-gap choke, push & pull workers
  │   │   └── api/               # FastAPI endpoints for search and sync
  │   └── tests/                 # Full unit and invariant test suite (12/12 passing)
  ├── hub/
  │   └── app/                   # Central control plane, stats, & curator triage
  └── scripts/                   # S1 and S2 spike verification scripts
```

---

## ⚡ Verified Benchmark Results
Measured warm search latencies under full hybrid Reciprocal Rank Fusion on-device:

| Metric | 1,000 Chunks | 3,000 Chunks | Target |
|---|---|---|---|
| **Median (p50)** | **5.19 ms** | **5.30 ms** | < 20 ms |
| **95th percentile (p95)** | **5.72 ms** | **5.91 ms** | < 50 ms |
| **Network Egress** | **0 packets** | **0 packets** | 0 (Air-Gapped) |
| **Bandwidth Preserved** | **84.0%** | **84.0%** | > 80% |

---

## 🧪 Verification & Invariants

Run the complete test suite:
```bash
python -m pytest device/tests -v
```

Verified guarantees:
- **I1 (No Leakage)**: 0 of 20 seeded sensitive items reach the server.
- **I2 (Idempotency)**: Replaying an outbox batch twice yields zero duplicate records.
- **I3 (Profile Freshness)**: Pull converges to the latest authoritative version for the device asset profile.
- **I6 (Air-Gap Testability)**: Socket connection attempts under `link=offline` raise `LinkOfflineError` before opening sockets.
- **I7 (Authority Monotonicity)**: Lower authority records can never silently overwrite higher authority records.
- **S5 (Crash Safety)**: Simulated abrupt shutdown mid-sync with 100% idempotent boot recovery.
