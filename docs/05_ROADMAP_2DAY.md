# 05_ROADMAP_2DAY

## 2-Day Execution Roadmap & Verification

### Day 1: Edge & Sync Foundations
- [x] S1: Qdrant Edge dual-shard adapter (`device_memory`, `fleet_mirror`) + FastEmbed hybrid search (BGE-small + BM25).
- [x] Ingest pipeline with regex claim extraction, PII scrubber, content-hashing.
- [x] Extractive answer synthesis with verified citations and confidence scores.
- [x] S2: SQLite WAL ledger, Outbox worker with backoff and byte budgeting.
- [x] Pure-Python Policy Engine with explainable factor breakdown.
- [x] Conflict arbitration engine for rules C1–C4 with lineage DAG.
- [x] Invariant tests I1 (no leaks), I2 (idempotency), I3 (freshness), I6 (air-gap testability), I7 (authority monotonicity).

### Day 2: Industrial Console UI & End-to-End Beats
- [ ] S3: Next.js 14 App Router console matching flat amber industrial telemetry spec.
- [ ] Screen 1: Search Playground with hybrid branch breakdown and extractive answers.
- [ ] Screen 2: Memory Inspector with live capture composer, PII redaction drawer, and policy triage factor bars.
- [ ] Screen 3: Sync Center with real-time bandwidth savings calculator (82%+), push/held/pulled columns, and link toggle.
- [ ] Screen 4: Live Activity & Audit stream.
- [ ] Screen 5: Conflicts View with side-by-side arbitration, rule trail, and CRDT lineage graph.
- [ ] Cloud Console: Fleet central control plane for Meera S. (Lead Reliability Engineer) with inbox review queue.
- [ ] 6 Demo beats scenario runner (`scripts/demo.py`) and root Makefile targets.
