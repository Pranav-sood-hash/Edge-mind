from __future__ import annotations

from typing import Any
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from device.app.api.search import SearchResponse, SearchService
from device.app.embed.embedder import EdgeEmbedder
from device.app.ingest.pipeline import IngestPipeline
from device.app.memory.models import Memory
from device.app.memory.store import QdrantEdgeMemoryStore

router = APIRouter(prefix="/api", tags=["search_and_memory"])

# Global singletons for edge node runtime
_embedder = EdgeEmbedder.get_instance()
_store = QdrantEdgeMemoryStore(embedder=_embedder)
_search_service = SearchService(store=_store)
_pipeline = IngestPipeline(store=_store, embedder=_embedder)


class IngestRequest(BaseModel):
    content: str
    kind: str = "note"
    site_id: str = "Plant North"
    source_device: str = "Device A"
    asset_id: str | None = None
    asset_type: str | None = None
    authority: int = 0
    scope: str = "device"
    target_shard: str = "device_memory"


class IngestResponse(BaseModel):
    mem_ids: list[str]
    elapsed_ms: float
    total_chunks: int
    pii_flagged: bool
    status: str = "ok"


@router.get("/search", response_model=SearchResponse)
def search_memory(
    q: str = Query(..., description="Natural language search query"),
    limit: int = Query(5, ge=1, le=50),
    explain: bool = Query(True, description="Return branch ranks and explain details"),
    kind: str | None = Query(None, description="Optional kind filter"),
    asset_id: str | None = Query(None, description="Optional asset ID filter"),
) -> SearchResponse:
    filters: dict[str, Any] = {}
    if kind and kind != "All Kinds":
        filters["kind"] = kind.lower()
    if asset_id and asset_id != "All Assets":
        filters["asset_id"] = asset_id

    return _search_service.execute_search(
        query=q,
        limit=limit,
        explain=explain,
        filters=filters if filters else None,
    )


@router.post("/ingest", response_model=IngestResponse)
def ingest_record(req: IngestRequest) -> IngestResponse:
    mems, elapsed_ms = _pipeline.ingest_note(
        content=req.content,
        kind=req.kind,
        site_id=req.site_id,
        source_device=req.source_device,
        asset_id=req.asset_id,
        asset_type=req.asset_type,
        authority=req.authority,
        scope=req.scope,
        target_shard=req.target_shard,
    )
    pii_flagged = any(m.payload.get("has_pii", False) for m in mems)
    return IngestResponse(
        mem_ids=[m.mem_id for m in mems],
        elapsed_ms=round(elapsed_ms, 2),
        total_chunks=len(mems),
        pii_flagged=pii_flagged,
    )
