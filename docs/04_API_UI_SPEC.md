# 04_API_UI_SPEC

## 3. UI Component & API Specification

### 3.1 Device Node REST API (/api/v1)
All device nodes (Device A on port 8001, Device B on port 8002) expose the canonical v1 API:

- `POST /api/v1/search`: Hybrid search request `{query, limit, explain, filters}` -> `{query, total_candidates, hits, answer, latency, explain_mode, air_gapped}`.
- `GET /api/v1/memories`: Scan memories with optional filters and cursor pagination.
- `GET /api/v1/memories/{id}`: Fetch single memory by ID.
- `POST /api/v1/memories`: Ingest new note/record with chunking and policy evaluation.
- `POST /api/v1/memories/bulk`: Batch ingestion of memories.
- `POST /api/v1/memories/{id}/override`: Apply technician override `{action, who, why}`.
- `GET /api/v1/link`: Fetch link state `{state: "online" | "offline"}`.
- `POST /api/v1/link`: Set link state `{state: "online" | "offline"}`.
- `GET /api/v1/sync/status`: Summary counts for pending outbox, synced, held, conflicts.
- `POST /api/v1/sync/run`: Execute immediate push and pull synchronization cycle.
- `GET /api/v1/sync/report/{id}`: Fetch specific historical sync cycle report.
- `GET /api/v1/decisions`: List stored policy triage evaluations.
- `GET /api/v1/conflicts`: List detected conflict arbitration records.
- `GET /api/v1/events`: List ledger operational events (SSE or poll).
- `GET /api/v1/facets`: Aggregate faceted counts by field (`kind`, `status`, `authority`).
- `GET /api/v1/health`: On-device health check and air-gap certification.
- `POST /api/v1/admin/reset`: Reset local shards and ledger for clean demonstration.
- `POST /api/v1/admin/optimize`: Force HNSW vector index optimization.

### 3.2 Hub Control Plane REST API
Exposed by Fleet Central Hub (port 8000):
- `POST /devices/heartbeat`: Device telemetry heartbeat, returning byte budget and policy.
- `GET /devices`: Registry of fleet edge devices.
- `GET /inbox`: Items awaiting curator triage.
- `POST /inbox/{id}/promote`: Promote inbox proposal into fleet knowledge.
- `POST /inbox/{id}/reject`: Reject proposal.
- `GET /knowledge`: Browse fleet knowledge collection.
- `GET /conflicts`: Fleet-level unresolved conflict items.
- `GET /stats`: High-level fleet metrics (bandwidth preserved, devices online, knowledge count).

### 3.3 Design System & Theme Specification
- Industrial dark console palette:
  - `--bg`: `#121110`
  - `--surface`: `#1A1917`
  - `--surface-2`: `#22201D`
  - `--border`: `#34302A`
  - `--text`: `#F2EEE6`
  - `--muted`: `#8C867B`
  - `--accent`: `#F5A524` (single active accent color)
  - `--accent-ink`: `#1A1100`
  - `--accent-dim`: `rgba(245,165,36,0.14)`
- Zero shadows, zero gradients, zero glow, 1px borders, 2px radius everywhere.
- When `link=offline`, active accent flips from amber (`#F5A524`) to industrial gray (`#8C867B`), and offline banner activates.
