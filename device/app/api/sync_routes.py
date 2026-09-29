from __future__ import annotations

from typing import Any
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from device.app.conflicts.engine import ConflictEngine
from device.app.ledger.ledger import SQLiteLedger
from device.app.memory.models import Memory
from device.app.memory.store import QdrantEdgeMemoryStore
from device.app.policy.engine import PolicyEngine
from device.app.sync.cloud_client import CloudClient
from device.app.sync.coordinator import SyncCoordinator
from device.app.sync.link_state import LinkState
from device.app.sync.pull_worker import PullWorker, SyncReport
from device.app.sync.push_worker import PushWorker

router = APIRouter(prefix="/api", tags=["sync_and_governance"])

from device.app.api.search_routes import _store
_ledger = SQLiteLedger()
_link_state = LinkState(ledger=_ledger)
_cloud_client = CloudClient(link_state=_link_state)
_policy_engine = PolicyEngine()
_conflict_engine = ConflictEngine()

_push_worker = PushWorker(ledger=_ledger, cloud_client=_cloud_client, store=_store)
_pull_worker = PullWorker(
    ledger=_ledger,
    cloud_client=_cloud_client,
    store=_store,
    conflict_engine=_conflict_engine,
    device_profile={"site_id": "Plant North", "asset_id": "P-204"},
)
_coordinator = SyncCoordinator(
    push_worker=_push_worker,
    pull_worker=_pull_worker,
    ledger=_ledger,
    cloud_client=_cloud_client,
)


class LinkToggleRequest(BaseModel):
    state: str  # "online" | "offline"


class ResolveConflictRequest(BaseModel):
    resolution: str  # "accept_fleet" | "keep_local" | "escalate"


@router.get("/sync/status")
def get_sync_status() -> dict[str, Any]:
    pending_outbox = _ledger.get_pending_outbox(limit=100)
    all_outbox = _ledger.get_all_outbox(limit=100)
    decisions = _ledger.get_all_decisions(limit=100)
    conflicts = _ledger.get_conflicts(status="open")

    held_count = sum(1 for d in decisions if d["action"] in ("hold", "local_only"))
    synced_count = sum(1 for o in all_outbox if o["state"] == "SYNCED")

    return {
        "link_state": _link_state.get_state(),
        "is_online": _link_state.is_online(),
        "pending_ops_count": len(pending_outbox),
        "synced_ops_count": synced_count,
        "held_ops_count": held_count,
        "open_conflicts_count": len(conflicts),
        "total_decisions_count": len(decisions),
    }


@router.post("/sync/trigger", response_model=SyncReport)
def trigger_sync() -> SyncReport:
    return _coordinator.sync_cycle()


@router.post("/link/toggle")
def toggle_link(req: LinkToggleRequest) -> dict[str, Any]:
    _link_state.set_state(req.state)
    return {"status": "ok", "new_state": _link_state.get_state()}


@router.get("/decisions")
def get_decisions(limit: int = 50) -> list[dict[str, Any]]:
    return _ledger.get_all_decisions(limit=limit)


@router.get("/conflicts")
def get_conflicts(status: str | None = None, limit: int = 50) -> list[dict[str, Any]]:
    return _ledger.get_conflicts(status=status, limit=limit)


@router.post("/conflicts/{conflict_id}/resolve")
def resolve_conflict(conflict_id: str, req: ResolveConflictRequest) -> dict[str, Any]:
    _ledger.resolve_conflict(conflict_id=conflict_id, resolution=req.resolution)
    return {"status": "resolved", "conflict_id": conflict_id, "resolution": req.resolution}


@router.get("/events")
def get_events(limit: int = 50) -> list[dict[str, Any]]:
    return _ledger.get_events(limit=limit)


@router.get("/outbox")
def get_outbox(limit: int = 50) -> list[dict[str, Any]]:
    return _ledger.get_all_outbox(limit=limit)
