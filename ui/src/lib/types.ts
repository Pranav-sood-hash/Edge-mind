export interface DeviceConfig {
  id: string;
  name: string;
  site: string;
  port: number;
  techName: string;
  techId: string;
  role: string;
  storageUsed: string;
  storageTotal: string;
  rttMs: number;
  vectorChunks: number;
}

export interface SearchHit {
  mem_id: string;
  title: string;
  content: string;
  score: number;
  kind: string;
  authority: number;
  status?: string;
  chunk_id: string;
  sha256?: string;
  updated_at?: string;
  by_who?: string;
  branch_ranks?: {
    dense?: number;
    bm25?: number;
  };
  policy_action?: "share" | "hold" | "local_only" | "conflict" | "synced" | "superseded";
  tags?: string[];
  divergence_info?: string;
}

export interface ExtractiveAnswer {
  text: string;
  citations: string[];
  confidence: number;
  model: string;
  claims_verified?: string[];
}

export interface SearchLatency {
  embed_ms: number;
  retrieve_ms: number;
  fuse_ms: number;
  total_ms: number;
}

export interface SearchResultResponse {
  query: string;
  total_candidates: number;
  hits: SearchHit[];
  answer: ExtractiveAnswer;
  latency: SearchLatency;
  air_gapped: boolean;
  explain_mode: boolean;
}

export interface MemoryRecord {
  id: string;
  content: string;
  preview: string;
  kind: "note" | "manual" | "incident" | "fix" | "sensor";
  policy: "share" | "hold" | "local_only" | "conflict";
  sync_state: "synced" | "queue_staged" | "local" | "not_synced" | "fork_detected";
  authority: number;
  author: string;
  sha256: string;
  updated_at: string;
  has_pii?: boolean;
  pii_raw?: string;
  pii_redacted?: string;
  factors?: {
    quality?: number;
    reusability?: number;
    safety?: number;
    pii_sensitivity?: number;
    redaction_req?: number;
    payload_size?: number;
    bandwidth_cost?: number;
  };
  fleet_value?: number;
  rationale?: string;
}

export interface PolicyTriageItem {
  id: string;
  title: string;
  action: "share" | "hold" | "local_only";
  fleet_value: number;
  factors: Record<string, number>;
  explanation: string;
  raw_text?: string;
  redacted_text?: string;
}

export interface ConflictItem {
  id: string;
  title: string;
  asset_target: string;
  asset_id: string;
  detected_at: string;
  crdt_clock: string;
  policy: string;
  affected_peers: number;
  local_option: {
    title: string;
    authority: number;
    value: string;
    subtext: string;
    source: string;
    cached_at: string;
    sha256: string;
    details: string;
    status: string;
  };
  fleet_option: {
    title: string;
    authority: number;
    value: string;
    subtext: string;
    source: string;
    issued_at: string;
    sha256: string;
    details: string;
    system_choice: boolean;
  };
  field_option: {
    title: string;
    authority: number;
    value: string;
    subtext: string;
    source: string;
    logged_at: string;
    sha256: string;
    details: string;
    observation: string;
  };
  rule_trail: Array<{
    rule_num: string;
    rule_name: string;
    description: string;
    badge: string;
  }>;
  operational_summary: string;
  lineage: Array<{
    type: string;
    time: string;
    title: string;
    hash: string;
    tag?: string;
  }>;
}

export interface SyncOverview {
  link_state: "online" | "offline";
  is_online: boolean;
  pending_ops_count: number;
  synced_ops_count: number;
  held_ops_count: number;
  open_conflicts_count: number;
  bandwidth_saved_pct: number;
  bandwidth_preserved_kb: number;
  active_policy_bytes: number;
  naive_broadcast_bytes: number;
  pushed_items: Array<{
    id: string;
    title: string;
    badge: string;
    subtext: string;
    payload_kb: number;
    status_text: string;
  }>;
  held_items: Array<{
    id: string;
    title: string;
    subtext: string;
    size_on_disk: string;
    policy_rule: string;
  }>;
  pulled_items: Array<{
    id: string;
    title: string;
    badge: "synced" | "conflict";
    subtext: string;
    payload_kb: number;
    status_text: string;
  }>;
  outbox_queue: Array<{
    op_id: string;
    mem_ref: string;
    state: "PENDING" | "SYNCED" | "LOCAL_ONLY" | "FAILED";
    attempts: string;
    bytes: string;
    latency: string;
  }>;
  sync_logs: Array<{
    ts: string;
    tag: string;
    msg: string;
  }>;
}
