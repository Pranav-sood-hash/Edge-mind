"use client";

import React, { useState } from "react";
import { useDevice } from "@/components/DeviceContext";
import {
  ClipboardList,
  ShieldCheck,
  Zap,
  GitBranch,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";

export default function ActivityAuditPage() {
  const { device } = useDevice();
  const [filterKind, setFilterKind] = useState("all");

  const events = [
    {
      id: "EV-9941",
      ts: "14:23:18.910",
      kind: "POLICY_TRIAGE",
      badge: "HOLD",
      badgeType: "hold",
      title: "Classified Raw Vibration Stream MEM-1398 as HOLD",
      details: "Payload size 48.2 MB exceeds mesh radio link budget. Intercepted under Rule AIRGAP_OVERSIZED_TRUNC.",
      hash: "a882...7710",
    },
    {
      id: "EV-9940",
      ts: "14:22:45.321",
      kind: "PII_SCRUB",
      badge: "LOCAL_ONLY",
      badgeType: "local",
      title: "E.164 Telephone Detected in Field Note MEM-1401",
      details: "Pattern +49 171 555 0192 redacted to [REDACTED_TELEPHONE_SEC4]. Prohibited from external mesh sync.",
      hash: "4aa9...9b18",
    },
    {
      id: "EV-9938",
      ts: "14:18:02.140",
      kind: "CONFLICT_ARBITRATION",
      badge: "ARBITRATED",
      badgeType: "conflict",
      title: "Conflict #CR-4821 Arbitrated in Favor of Cloud Bulletin (45 Nm)",
      details: "Authority 3 dominance evaluated over local manual (40 Nm) and field note (42 Nm) in 1.4ms.",
      hash: "9d1a...88e2",
    },
    {
      id: "EV-9935",
      ts: "14:12:10.005",
      kind: "CRDT_SYNC_PULL",
      badge: "SYNCED",
      badgeType: "synced",
      title: "Received 3 Fleet Vectors from Central Hub",
      details: "Appended Compressor C-102 Overhaul Guide to fleet_mirror shard. CRDT clock advanced to v10.491.0.",
      hash: "7f8c...3a19",
    },
    {
      id: "EV-9931",
      ts: "14:00:55.228",
      kind: "HANDSHAKE_ESTABLISHED",
      badge: "ONLINE",
      badgeType: "synced",
      title: "P2P 802.15.4 Mesh Link Established",
      details: "Discovered 14 active peer nodes in Plant North subnet. Byte budget allocated: 5.0 MB.",
      hash: "010c...ff45",
    },
    {
      id: "EV-9920",
      ts: "13:45:00.000",
      kind: "BOOT_RECONCILE",
      badge: "IDEMPOTENT",
      badgeType: "synced",
      title: "SQLite WAL Boot Reconciliation Complete",
      details: "Reconciled 0 unapplied NEW outbox rows. Shard indices verified clean.",
      hash: "boot...init",
    },
  ];

  const filteredEvents =
    filterKind === "all" ? events : events.filter((e) => e.kind === filterKind);

  return (
    <div className="p-5 space-y-5 font-mono text-xs overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#34302A] pb-3">
        <div>
          <div className="text-[10px] text-[#8C867B] uppercase tracking-wider">
            ■ AUDIT STREAM // CRDT WAL EVENT LOG
          </div>
          <h1 className="text-lg font-bold text-[#F2EEE6] tracking-tight">
            ACTIVITY & PROVENANCE AUDIT
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#1A1917] border border-[#34302A] px-2.5 py-1">
            <Filter className="w-3 h-3 text-[#8C867B]" />
            <span className="text-[#8C867B]">FILTER:</span>
            <select
              value={filterKind}
              onChange={(e) => setFilterKind(e.target.value)}
              className="bg-transparent text-[#F2EEE6] focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="POLICY_TRIAGE">Policy Triage</option>
              <option value="PII_SCRUB">PII Scrub</option>
              <option value="CONFLICT_ARBITRATION">Conflict Arbitration</option>
              <option value="CRDT_SYNC_PULL">Sync Pull</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-3.5 bg-[#1A1917] border border-[#34302A] hover:border-[#F5A524] transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#8C867B]">{ev.id}</span>
                <span className="text-[#F5A524] font-bold">[{ev.kind}]</span>
                <span className="font-semibold text-sm text-[#F2EEE6]">{ev.title}</span>
              </div>

              <div className="flex items-center gap-2">
                {ev.badgeType === "hold" && (
                  <span className="px-1.5 py-0.5 border border-[#F5A524] text-[#F5A524] text-[10px]">
                    {ev.badge}
                  </span>
                )}
                {ev.badgeType === "local" && (
                  <span className="px-1.5 py-0.5 border border-[#8C867B] text-[#8C867B] text-[10px]">
                    {ev.badge}
                  </span>
                )}
                {ev.badgeType === "conflict" && (
                  <span className="px-1.5 py-0.5 bg-[#F5A524]/10 border-l border-l-[#F5A524] text-[#F5A524] text-[10px]">
                    {ev.badge}
                  </span>
                )}
                {ev.badgeType === "synced" && (
                  <span className="px-1.5 py-0.5 bg-[#22201D] text-[#8C867B] border border-[#34302A] text-[10px]">
                    {ev.badge}
                  </span>
                )}
                <span className="text-[#8C867B] text-[11px]">{ev.ts}</span>
              </div>
            </div>

            <p className="text-xs font-sans text-[#D1C9BC] leading-relaxed">
              {ev.details}
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-[#34302A]/60 text-[10px] text-[#8C867B]">
              <span>NODE: {device.name}</span>
              <span>SHA-256 HASH: {ev.hash}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
