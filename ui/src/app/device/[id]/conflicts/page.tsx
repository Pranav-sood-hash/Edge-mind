"use client";

import React, { useState } from "react";
import { useDevice } from "@/components/DeviceContext";
import { getMockConflict } from "@/lib/api";
import { ConflictItem } from "@/lib/types";
import {
  GitBranch,
  ShieldCheck,
  Key,
  Clock,
  UserCheck,
  Check,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function ConflictsPage() {
  const { device } = useDevice();
  const [conflict, setConflict] = useState<ConflictItem>(getMockConflict());
  const [selectedResolution, setSelectedResolution] = useState<string>("fleet");

  return (
    <div className="p-5 space-y-5 overflow-y-auto">
      {/* Top Header & Pagination */}
      <div className="bg-[#1A1917] border border-[#34302A] p-4 font-mono text-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#34302A] pb-2 text-[#8C867B]">
          <div className="flex items-center gap-2 text-[#F5A524]">
            <GitBranch className="w-4 h-4" />
            <span className="font-semibold">
              CRDT DIVERGENCE (3 COMMITS PENDING RESOLUTION) [CR-4821] PIT-3 / NORTH-PLANT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2.5 py-1 bg-[#22201D] border border-[#34302A] hover:text-[#F2EEE6] text-[#8C867B]">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREV CONFLICT</span>
            </button>
            <button className="flex items-center gap-1 px-2.5 py-1 bg-[#22201D] border border-[#34302A] hover:text-[#F2EEE6] text-[#8C867B]">
              <span>NEXT (2 OF 3)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-base font-bold text-[#F2EEE6] tracking-tight">
            {conflict.title}
          </h1>
          <div className="text-[11px] text-[#8C867B] mt-0.5">
            ASSET TARGET: <span className="text-[#F2EEE6]">{conflict.asset_target}</span>
          </div>
        </div>

        {/* Metadata chips */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#34302A] text-[11px] text-[#8C867B]">
          <div>DETECTED: <strong className="text-[#F2EEE6]">{conflict.detected_at}</strong></div>
          <div>CRDT CLOCK: <strong className="text-[#F2EEE6]">{conflict.crdt_clock}</strong></div>
          <div>POLICY: <strong className="text-[#F5A524]">{conflict.policy}</strong></div>
          <div>AFFECTED PEERS: <strong className="text-[#F2EEE6]">{conflict.affected_peers} ONLINE</strong></div>
        </div>
      </div>

      {/* 3-Way Divergence Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Box 1: Local Manual Cache (40 Nm) */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3 opacity-80">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#8C867B] font-semibold">{conflict.local_option.title}</span>
            <span className="px-1.5 py-0.5 bg-[#22201D] border border-[#34302A] text-[10px] text-[#8C867B]">
              AUTHORITY 1
            </span>
          </div>

          <div className="p-3 bg-[#121110] border border-[#34302A] text-center space-y-1">
            <div className="text-3xl font-extrabold line-through text-[#8C867B]">
              {conflict.local_option.value}
            </div>
            <div className="text-[10px] text-[#8C867B] uppercase">
              {conflict.local_option.subtext}
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-[#8C867B]">
            <div>SOURCE: <strong className="text-[#F2EEE6]">{conflict.local_option.source}</strong></div>
            <div>{conflict.local_option.cached_at}</div>
          </div>

          <div className="pt-2 border-t border-[#34302A] text-[11px] text-[#8C867B] space-y-1">
            <div className="font-semibold text-[#F2EEE6]">SPECIFICATION RECORD</div>
            <div className="leading-relaxed">{conflict.local_option.details}</div>
          </div>

          <div className="p-2 bg-[#121110] border border-[#34302A] text-[10px] text-[#8C867B] leading-tight">
            STATUS: {conflict.local_option.status}
          </div>
        </div>

        {/* Box 2: Cloud Bulletin (45 Nm) - Winner Candidate */}
        <div className="bg-[#1A1917] border-2 border-[#F5A524] p-4 space-y-3 relative">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <div className="flex items-center gap-1.5 text-[#F5A524] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{conflict.fleet_option.title}</span>
            </div>
            <span className="px-1.5 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold text-[10px]">
              AUTH 3
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 text-[#F5A524] font-bold">
              <Check className="w-3.5 h-3.5" />
              SYNCED • ACTIVE
            </span>
            <span className="px-1.5 py-0.5 bg-[#22201D] border border-[#F5A524]/60 text-[#F5A524]">
              SYSTEM CHOICE
            </span>
          </div>

          <div className="p-3 bg-[#121110] border border-[#F5A524]/40 text-center space-y-1">
            <div className="text-4xl font-extrabold text-[#F5A524] tracking-tight">
              {conflict.fleet_option.value}
            </div>
            <div className="text-[10px] text-[#F2EEE6] uppercase font-bold">
              {conflict.fleet_option.subtext}
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-[#8C867B]">
            <div>SOURCE: <strong className="text-[#F2EEE6]">{conflict.fleet_option.source}</strong></div>
            <div>{conflict.fleet_option.issued_at}</div>
          </div>

          <div className="pt-2 border-t border-[#34302A] text-[11px] text-[#8C867B] space-y-1">
            <div className="font-semibold text-[#F2EEE6]">REVISED DIRECTIVE MANDATE</div>
            <div className="text-[#D1C9BC] leading-relaxed">{conflict.fleet_option.details}</div>
          </div>

          <div className="p-2 bg-[#22201D] border border-[#F5A524]/30 text-[10px] text-[#F5A524] leading-tight">
            AUTONOMOUS ARBITRATION SELECTED THIS RECORD BASED ON AUTHORITY 3 DOMINANCE OVER LOCAL MANUAL AND FIELD NOTES.
          </div>
        </div>

        {/* Box 3: Technician Field Log (42 Nm) */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#F2EEE6] font-semibold">{conflict.field_option.title}</span>
            <span className="px-1.5 py-0.5 bg-[#22201D] border border-[#34302A] text-[10px] text-[#8C867B]">
              AUTHORITY 2
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 text-[#8C867B] border border-dashed border-[#8C867B] px-1.5 py-0.5">
              ROUTED TO REVIEW
            </span>
            <span className="text-[#8C867B] font-mono">TK-904</span>
          </div>

          <div className="p-3 bg-[#121110] border border-[#34302A] text-center space-y-1">
            <div className="text-3xl font-extrabold text-[#F2EEE6]">
              {conflict.field_option.value}
            </div>
            <div className="text-[10px] text-[#8C867B] uppercase">
              {conflict.field_option.subtext}
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-[#8C867B]">
            <div>SOURCE: <strong className="text-[#F2EEE6]">{conflict.field_option.source}</strong></div>
            <div>{conflict.field_option.logged_at}</div>
          </div>

          <div className="pt-2 border-t border-[#34302A] text-[11px] text-[#8C867B] space-y-1">
            <div className="font-semibold text-[#F2EEE6]">OBSERVATION TELEMETRY</div>
            <div className="text-[#D1C9BC] leading-relaxed italic">{conflict.field_option.observation}</div>
          </div>

          <div className="p-2 bg-[#121110] border border-[#34302A] text-[10px] text-[#8C867B] leading-tight">
            {conflict.field_option.details}
          </div>
        </div>
      </div>

      {/* Autonomous Arbitration Rule Trail */}
      <div className="bg-[#1A1917] border border-[#34302A] p-4 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
          <span className="text-[#F2EEE6] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A524]" />
            AUTONOMOUS ARBITRATION RULE TRAIL (WHY CLOUD BULLETIN WON)
          </span>
          <span className="text-[#8C867B]">EVAL TIME: 1.4MS</span>
        </div>

        <div className="space-y-2">
          {conflict.rule_trail.map((rule, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-[#121110] border border-[#34302A] flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[#F5A524] font-bold">{rule.rule_num} —</span>
                <span className="text-[#F2EEE6]">{rule.rule_name}</span>
              </div>
              <span className="px-2 py-0.5 bg-[#22201D] border border-[#F5A524]/40 text-[#F5A524] text-[10px] font-bold">
                {rule.badge}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#121110] border border-[#34302A] text-xs font-sans text-[#D1C9BC] leading-relaxed">
          <div className="font-mono text-[10px] font-bold text-[#F5A524] uppercase mb-1">
            OPERATIONAL CONTEXT SUMMARY:
          </div>
          {conflict.operational_summary}
        </div>
      </div>

      {/* CRDT Vector Lineage DAG */}
      <div className="bg-[#1A1917] border border-[#34302A] p-4 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
          <span className="text-[#F2EEE6] font-semibold flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-[#F5A524]" />
            CRDT VECTOR LINEAGE & AUDIT GRAPH
          </span>
          <span className="text-[#8C867B]">DAG: STATE-FORK-3</span>
        </div>

        <div className="space-y-2">
          {conflict.lineage.map((item, idx) => (
            <div
              key={idx}
              className="p-2 bg-[#121110] border border-[#34302A] flex flex-wrap items-center justify-between gap-2 text-[11px]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#8C867B] w-24 shrink-0 font-bold">{item.type}</span>
                <span className="text-[#F2EEE6]">{item.title}</span>
              </div>
              <div className="flex items-center gap-3">
                {item.tag && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] ${
                      item.tag === "ACTIVE BROADCAST"
                        ? "bg-[#F5A524] text-[#1A1100] font-bold"
                        : item.tag === "FORK DETECTED"
                        ? "border border-[#F5A524] text-[#F5A524]"
                        : "bg-[#22201D] text-[#8C867B]"
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
                <span className="text-[#8C867B]">{item.hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decision Footer Bar */}
      <div className="bg-[#1A1917] border border-[#34302A] p-4 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5A524]" />
          <span className="text-[#8C867B]">DECISION STATUS:</span>
          <span className="text-[#F5A524] font-bold">
            TENTATIVE ACCEPTANCE (CLOUD BULLETIN 45 Nm APPLIED TO LOCAL RUNTIME)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedResolution("local")}
            className="px-3 py-1.5 bg-[#22201D] border border-[#34302A] hover:border-[#8C867B] text-[#F2EEE6]"
          >
            RESTORE LOCAL MANUAL (40 Nm)
          </button>
          <button
            onClick={() => setSelectedResolution("fork")}
            className="px-3 py-1.5 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-[#F5A524]"
          >
            ESCALATE TO PLANT LEAD (HOLD FORK)
          </button>
          <button
            onClick={() => setSelectedResolution("fleet")}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F5A524] hover:bg-[#F5A524]/90 text-[#1A1100] font-bold tracking-wider"
          >
            <Check className="w-3.5 h-3.5" />
            <span>ACCEPT FLEET RESOLUTION (45 Nm)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
