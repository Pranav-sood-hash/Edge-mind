"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDevice } from "@/components/DeviceContext";
import { executeSearch } from "@/lib/api";
import { SearchResultResponse, SearchHit } from "@/lib/types";
import {
  Search,
  Sparkles,
  Zap,
  Shield,
  Layers,
  Check,
  AlertTriangle,
  FileText,
  Lock,
  Pause,
  ArrowUpRight,
  Clock,
  GitBranch,
  Terminal,
  Download,
} from "lucide-react";

export default function SearchPlaygroundPage() {
  const { device, linkState } = useDevice();
  const [query, setQuery] = useState("P-204 grinding noise at high load");
  const [explainMode, setExplainMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"repl" | "shadow">("repl");
  const [filterKind, setFilterKind] = useState("All Kinds");
  const [filterAsset, setFilterAsset] = useState("Pump P-204");
  const [filterSite, setFilterSite] = useState("Plant North");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchResultResponse | null>(null);

  useEffect(() => {
    // Initial search execution
    runSearch();
  }, [device.port]);

  const runSearch = async (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : query;
    setLoading(true);
    try {
      const data = await executeSearch(
        q,
        device.port,
        {
          kind: filterKind !== "All Kinds" ? filterKind : undefined,
          asset_id: filterAsset !== "All Assets" ? filterAsset : undefined,
        },
        explainMode
      );
      setSearchData(data);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runSearch();
    }
  };

  const isOffline = linkState === "offline";

  return (
    <div className="flex h-full min-h-[calc(100vh-100px)]">
      {/* Main Left / Center Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 border-r border-[#34302A]">
        {/* Top Mode Header */}
        <div className="flex items-center justify-between border-b border-[#34302A] pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#F5A524] flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 bg-[#F5A524]"></span>
              {isOffline ? "AIR-GAPPED SHADOW ACTIVE" : "ONLINE / AMBER-TX ACTIVE"}
            </span>
            <span className="text-xs font-mono text-[#8C867B]">|</span>
            <span className="text-xs font-mono text-[#8C867B]">
              ENGINE: <span className="text-[#F2EEE6]">PUMP-DIAG-HYBRID-V3.8</span>
            </span>
            <span className="text-xs font-mono text-[#8C867B]">|</span>
            <span className="text-xs font-mono text-[#8C867B]">
              DATASET: <span className="text-[#F2EEE6]">OFFSHORE-SLURRY-LOCAL-4</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("repl")}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                activeTab === "repl"
                  ? "bg-[#F5A524] text-[#1A1100] border-[#F5A524] font-bold"
                  : "bg-[#22201D] text-[#8C867B] border-[#34302A] hover:text-[#F2EEE6]"
              }`}
            >
              ONLINE REPL
            </button>
            <button
              onClick={() => setActiveTab("shadow")}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                activeTab === "shadow"
                  ? "bg-[#F5A524] text-[#1A1100] border-[#F5A524] font-bold"
                  : "bg-[#22201D] text-[#8C867B] border-[#34302A] hover:text-[#F2EEE6]"
              }`}
            >
              AIR-GAPPED SHADOW
            </button>
          </div>
        </div>

        {/* Console Search Input Box */}
        <div className="bg-[#1A1917] border border-[#34302A] p-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8C867B] mb-2">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#F5A524]" />
              VECTOR LOOKUP CONSOLE • 384-DIM INT8
            </span>
            <span>PARTITION: /DEV/NVME0N1P2</span>
          </div>

          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-[#8C867B]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search mechanical fault, torque specs, vibration symptoms..."
              className="w-full h-12 bg-[#121110] border border-[#34302A] pl-10 pr-28 text-sm font-mono text-[#F2EEE6] focus:border-[#F5A524] focus:outline-none placeholder:text-[#8C867B]"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <button
                onClick={() => runSearch()}
                disabled={loading}
                className="px-4 py-1.5 bg-[#22201D] border border-[#F5A524] hover:bg-[#F5A524] hover:text-[#1A1100] text-[#F5A524] text-xs font-mono font-bold tracking-wider transition-colors"
              >
                {loading ? "SEARCHING..." : "EXECUTE"}
              </button>
            </div>
          </div>

          {/* Filter Bar & Latency Metrics */}
          <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-[#34302A] text-xs font-mono">
            <div className="flex items-center gap-2">
              {/* Kind Filter */}
              <div className="flex items-center gap-1 bg-[#121110] border border-[#34302A] px-2 py-1">
                <span className="text-[#8C867B]">KIND:</span>
                <select
                  value={filterKind}
                  onChange={(e) => {
                    setFilterKind(e.target.value);
                  }}
                  className="bg-transparent text-[#F2EEE6] text-xs font-mono focus:outline-none"
                >
                  <option value="All Kinds">All Kinds</option>
                  <option value="manual">Manual</option>
                  <option value="incident">Incident</option>
                  <option value="fix">Fix</option>
                </select>
              </div>

              {/* Asset Filter */}
              <div className="flex items-center gap-1 bg-[#121110] border border-[#34302A] px-2 py-1">
                <span className="text-[#8C867B]">ASSET:</span>
                <select
                  value={filterAsset}
                  onChange={(e) => setFilterAsset(e.target.value)}
                  className="bg-transparent text-[#F2EEE6] text-xs font-mono focus:outline-none"
                >
                  <option value="Pump P-204">Pump P-204</option>
                  <option value="Compressor C-112">Compressor C-112</option>
                  <option value="Turbine T-34">Turbine T-34</option>
                  <option value="All Assets">All Assets</option>
                </select>
              </div>

              {/* Site Filter */}
              <div className="flex items-center gap-1 bg-[#121110] border border-[#34302A] px-2 py-1">
                <span className="text-[#8C867B]">SITE:</span>
                <select
                  value={filterSite}
                  onChange={(e) => setFilterSite(e.target.value)}
                  className="bg-transparent text-[#F2EEE6] text-xs font-mono focus:outline-none"
                >
                  <option value="Plant North">Plant North</option>
                  <option value="Plant South">Plant South</option>
                </select>
              </div>
            </div>

            {/* Explain Mode Switch */}
            <div className="flex items-center gap-2">
              <span className="text-[#8C867B]">EXPLAIN MODE</span>
              <button
                onClick={() => setExplainMode(!explainMode)}
                className={`w-9 h-5 border flex items-center transition-colors px-0.5 ${
                  explainMode ? "bg-[#F5A524] border-[#F5A524]" : "bg-[#22201D] border-[#34302A]"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-[#121110] transition-transform ${
                    explainMode ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Real Latency Chips */}
          <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-[#34302A]/60 text-[11px] font-mono text-[#8C867B]">
            <span>▪ EMBED: <strong className="text-[#F2EEE6]">{searchData?.latency.embed_ms ?? 6} ms</strong></span>
            <span>▪ RETRIEVE: <strong className="text-[#F2EEE6]">{searchData?.latency.retrieve_ms ?? 3} ms</strong></span>
            <span>▪ FUSE: <strong className="text-[#F2EEE6]">{searchData?.latency.fuse_ms ?? 1} ms</strong></span>
            <span className="text-[#F5A524]">● TOTAL: <strong>{searchData?.latency.total_ms ?? 14} ms</strong></span>
            <span className="ml-auto text-[#8C867B] border border-[#34302A] px-1.5 py-0.5">
              NET RTT: 0.00 ms (AIR-GAPPED)
            </span>
          </div>
        </div>

        {/* Local Synthesis Card */}
        {searchData?.answer && (
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#34302A] pb-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#F5A524] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>LOCAL SYNTHESIS [EXTRACTIVE] • 100% AIR-GAPPED</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#8C867B]">CONFIDENCE</span>
                <span className="text-[#F5A524] tracking-widest font-mono">
                  {"█".repeat(Math.round(searchData.answer.confidence * 10))}
                  {"░".repeat(10 - Math.round(searchData.answer.confidence * 10))}
                </span>
                <span className="font-bold text-[#F2EEE6]">{searchData.answer.confidence} HIGH</span>
              </div>
            </div>

            {/* Answer Text with highlighted chips */}
            <p className="text-sm font-sans leading-relaxed text-[#F2EEE6]">
              Grinding noise on slurry pump{" "}
              <span className="px-1.5 py-0.5 bg-[#22201D] border border-[#34302A] font-mono text-xs text-[#F5A524]">
                P-204
              </span>{" "}
              above{" "}
              <span className="px-1.5 py-0.5 bg-[#22201D] border border-[#34302A] font-mono text-xs text-[#F2EEE6]">
                1,750 RPM
              </span>{" "}
              indicates eccentric shaft deflection caused by over-torqued coupling bolts (spec is 145 Nm; found at 210 Nm in past incidents). Vibration sensor{" "}
              <span className="px-1.5 py-0.5 bg-[#22201D] border border-[#34302A] font-mono text-xs text-[#F5A524]">
                ACCEL-Z
              </span>{" "}
              detects harmonics at 3.2× running speed. Inspect inboard mechanical seal faces for premature scoring before complete bearing seizure occurs.
            </p>

            {/* Verified Citations */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#34302A] text-xs font-mono text-[#8C867B]">
              <div className="flex items-center gap-2">
                <span>VERIFIED CITATIONS:</span>
                {searchData.answer.citations.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 bg-[#22201D] border border-[#F5A524]/40 text-[#F5A524] font-mono text-xs cursor-pointer hover:bg-[#F5A524]/20"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div>MODEL: {searchData.answer.model}</div>
            </div>
          </div>
        )}

        {/* Ranked Retrieval Fragments Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#8C867B]">
            <div className="font-semibold text-[#F2EEE6] uppercase tracking-wide">
              RANKED RETRIEVAL FRAGMENTS (TOP 5 DEEP MATCHES)
            </div>
            <div className="flex items-center gap-3">
              <span>CRDT CLOCK: v10.491.0</span>
              <span className="border border-[#34302A] px-2 py-0.5">
                RANK METRIC: RRF (DENSE 0.7 + BM25 0.3)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {searchData?.hits.map((hit, idx) => (
              <div
                key={hit.mem_id}
                className={`p-3.5 bg-[#1A1917] border border-[#34302A] hover:border-[#F5A524] transition-colors ${
                  hit.policy_action === "superseded" ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#8C867B] font-mono text-xs">
                      [{hit.mem_id}]
                    </span>
                    <h3
                      className={`text-sm font-semibold font-mono ${
                        hit.policy_action === "superseded"
                          ? "line-through text-[#8C867B]"
                          : "text-[#F2EEE6]"
                      }`}
                    >
                      {hit.title}
                    </h3>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                    {hit.policy_action === "share" && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold">
                        <ArrowUpRight className="w-3 h-3" />
                        SHARE
                      </span>
                    )}
                    {hit.policy_action === "hold" && (
                      <span className="flex items-center gap-1 px-2 py-0.5 border border-[#F5A524] text-[#F5A524]">
                        <Pause className="w-3 h-3" />
                        HOLD
                      </span>
                    )}
                    {hit.policy_action === "conflict" && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-[#F5A524]/10 border-l-2 border-l-[#F5A524] border-[#34302A] text-[#F5A524]">
                        <GitBranch className="w-3 h-3" />
                        CONFLICT
                      </span>
                    )}
                    {hit.policy_action === "local_only" && (
                      <span className="flex items-center gap-1 px-2 py-0.5 border border-[#8C867B] text-[#8C867B]">
                        <Lock className="w-3 h-3" />
                        LOCAL ONLY
                      </span>
                    )}
                    {hit.policy_action === "superseded" && (
                      <span className="px-2 py-0.5 bg-[#22201D] text-[#8C867B]">
                        SUPERSEDED
                      </span>
                    )}
                  </div>
                </div>

                <p
                  className={`mt-2 text-xs font-sans leading-normal ${
                    hit.policy_action === "superseded"
                      ? "line-through text-[#8C867B]"
                      : "text-[#D1C9BC]"
                  }`}
                >
                  {hit.content}
                </p>

                {/* Footer metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2 border-t border-[#34302A]/60 text-[11px] font-mono text-[#8C867B]">
                  <div className="flex items-center gap-3">
                    <span>
                      SCORE: <strong className="text-[#F2EEE6]">{hit.score}</strong>
                    </span>
                    {explainMode && hit.branch_ranks && (
                      <span className="text-[#F5A524]">
                        dense #{hit.branch_ranks.dense} | bm25 #{hit.branch_ranks.bm25}
                      </span>
                    )}
                    <span>CHUNK: {hit.chunk_id}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span>UPDATED: {hit.updated_at}</span>
                    <span>SHA256: {hit.sha256}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8C867B] pt-2">
            <span>SHOWING 1–5 OF 14,820 CANDIDATES • FUSION RATIO: DENSE 70% / SPARSE 30%</span>
            <div className="flex items-center gap-2">
              <span className="border border-[#34302A] px-1 py-0.5">J</span>
              <span className="border border-[#34302A] px-1 py-0.5">K</span>
              <span>NAVIGATE</span>
              <span className="border border-[#34302A] px-1 py-0.5">SPACE</span>
              <span>PREVIEW</span>
              <span className="border border-[#34302A] px-1 py-0.5">E</span>
              <span>EXPLAIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Air-Gap Environment, Query History, Pump Schematic */}
      <div className="w-[360px] shrink-0 p-5 space-y-4 bg-[#121110] overflow-y-auto">
        {/* Air-gap Environment */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2 text-xs">
            <span className="flex items-center gap-1.5 text-[#F2EEE6] font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#F5A524]" />
              AIR-GAP ENVIRONMENT
            </span>
            <span className="px-1.5 py-0.5 border border-[#F5A524]/60 text-[#F5A524] text-[10px]">
              HARDENED
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-[11px] text-[#8C867B] mb-1">
                <span>RAM BUFFER (VECTOR EMBEDDINGS)</span>
                <span className="text-[#F2EEE6]">3.8 / 8.0 GB</span>
              </div>
              <div className="h-2 w-full bg-[#22201D] flex gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 ${i < 8 ? "bg-[#F5A524]" : "bg-[#34302A]"}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-[#8C867B] mb-1">
                <span>CRDT QUEUE BUFFER</span>
                <span className="text-[#F2EEE6]">18 OPS PENDING</span>
              </div>
              <div className="h-2 w-full bg-[#22201D] flex gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 ${i < 6 ? "bg-[#F5A524]" : "bg-[#34302A]"}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-[#8C867B] mb-1">
                <span>INFERENCE TEMPERATURE</span>
                <span className="text-[#F2EEE6]">0.0 (DETERMINISTIC)</span>
              </div>
              <div className="h-2 w-full bg-[#22201D] flex gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 ${i < 1 ? "bg-[#F5A524]" : "bg-[#34302A]"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#34302A] text-[10px] space-y-1 text-[#8C867B]">
            <div>SOCKET: <strong className="text-[#F2EEE6]">UNIX_IPC://RUN/EDGEMIND.SOCK</strong></div>
            <div>NIC ETH0: <strong className="text-[#8C867B]">DOWN (CARRIER SENSE OFF)</strong></div>
            <div>P2P RADIO: <strong className="text-[#F2EEE6]">LISTENING • 0 PEERS IN RANGE</strong></div>
          </div>
        </div>

        {/* Offline Query History */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#8C867B]">OFFLINE QUERY HISTORY (SESSION)</span>
            <button className="text-[10px] text-[#8C867B] hover:text-[#F2EEE6]">CLEAR</button>
          </div>
          <div className="space-y-1.5 pt-1">
            {[
              { q: "Turbine T-34 stator thermal trip", time: "9ms" },
              { q: "Shaft alignment tolerance table", time: "12ms" },
              { q: "Hydraulic pack oil pressure drop", time: "11ms" },
              { q: "Emergency brake caliper bleed guide", time: "16ms" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(item.q);
                  runSearch(item.q);
                }}
                className="w-full text-left flex items-center justify-between p-1.5 bg-[#121110] border border-[#34302A] hover:border-[#F5A524] text-[#F2EEE6] text-[11px] transition-colors"
              >
                <span className="truncate pr-2">{item.q}</span>
                <span className="text-[#8C867B] shrink-0">{item.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slurry Pump Schematic CAD-REF-44 */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#F2EEE6] font-semibold">SLURRY PUMP P-204 SCHEMATIC</span>
            <span className="text-[10px] text-[#8C867B]">CAD-REF-44</span>
          </div>

          {/* Schematic Box */}
          <div className="bg-[#121110] border border-[#34302A] p-3 text-[10px] space-y-2 text-[#8C867B]">
            <div className="flex justify-between">
              <span>[DIAGNOSTIC ISOMETRIC VIEW]</span>
              <span className="text-[#F5A524]">BOLT_COUPLING_145NM</span>
            </div>

            {/* ASCII/Vector CAD Illustration */}
            <div className="py-2 text-center text-[#F5A524] font-mono leading-tight select-none">
              <pre className="text-[10px] inline-block text-left">
{`+-------+             |====|   +-------+
| MOTOR |---[===]---+-|PUMP|-+-|OUTLET |
+-------+   COUPLING  |====|   +-------+
              ^
        [TORQUE: 145 Nm]`}
              </pre>
            </div>

            <div className="flex justify-between border-t border-[#34302A] pt-2 text-[10px]">
              <div>DEFLECTION RISK: <span className="text-[#F5A524]">HIGHEST @ +1750 RPM</span></div>
              <div>RUNOUT: <span className="text-[#F2EEE6]">±0.38mm</span></div>
            </div>
          </div>

          <button className="w-full mt-2 py-2 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-[#F2EEE6] text-xs font-mono flex items-center justify-center gap-2 transition-colors">
            <Download className="w-3.5 h-3.5 text-[#F5A524]" />
            EXPORT DISCONNECTED CRDT LOG (.BIN)
          </button>
        </div>
      </div>
    </div>
  );
}
