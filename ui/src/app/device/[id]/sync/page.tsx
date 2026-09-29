"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDevice } from "@/components/DeviceContext";
import { getMockSyncOverview } from "@/lib/api";
import { SyncOverview } from "@/lib/types";
import {
  RefreshCw,
  Zap,
  ArrowUpRight,
  Pause,
  GitBranch,
  Check,
  Clock,
  Layers,
  ShieldCheck,
  Radio,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function SyncCenterPage() {
  const { device, linkState, toggleLink } = useDevice();
  const [syncData, setSyncData] = useState<SyncOverview>(getMockSyncOverview());
  const [isSyncing, setIsSyncing] = useState(false);
  const [paused, setPaused] = useState(false);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 900);
  };

  const isOffline = linkState === "offline";

  return (
    <div className="p-5 space-y-5 overflow-y-auto">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#1A1917] border border-[#34302A] p-3 font-mono text-xs">
        <div className="flex items-center gap-4">
          {/* Link status & toggle switch */}
          <div className="flex items-center gap-2">
            <span className="text-[#8C867B]">LINK:</span>
            <button
              onClick={toggleLink}
              className={`flex items-center gap-1.5 px-2.5 py-1 border transition-colors ${
                isOffline
                  ? "bg-[#121110] border-[#8C867B] text-[#8C867B]"
                  : "bg-[#121110] border-[#F5A524] text-[#F5A524]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOffline ? "border border-[#8C867B]" : "bg-[#F5A524]"}`} />
              <span>{isOffline ? "OFFLINE (AIR-GAPPED)" : "ONLINE (PEER MESH ACTIVE)"}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[#F5A524]">
            <Clock className="w-3.5 h-3.5" />
            <span>PENDING QUEUE: {syncData.pending_ops_count} OPS</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[#8C867B]">
            <span>LAST SYNC: 14s AGO (FLEET MASTER A-01)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className={`px-3 py-1.5 border transition-colors ${
              paused
                ? "bg-[#F5A524] text-[#1A1100] border-[#F5A524] font-bold"
                : "bg-[#22201D] border-[#34302A] hover:border-[#8C867B] text-[#F2EEE6]"
            }`}
          >
            {paused ? "RESUME SYNC" : "PAUSE CRDT SYNC"}
          </button>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing || isOffline}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F5A524] hover:bg-[#F5A524]/90 text-[#1A1100] font-bold transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "SYNCING..." : "SYNC NOW [F5]"}</span>
          </button>
        </div>
      </div>

      {/* Hero Stat: BANDWIDTH SAVED 82% */}
      <div className="bg-[#1A1917] border border-[#34302A] p-5 font-mono space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#34302A] pb-3">
          <div>
            <div className="text-[10px] text-[#8C867B] uppercase tracking-wider">
              FLEET CRDT SYNC EFFICIENCY • SELECTIVE REPLICATION ACTIVE
            </div>
            <div className="flex items-baseline gap-4 mt-1">
              <span className="text-4xl lg:text-5xl font-extrabold text-[#F5A524] tracking-tight">
                BANDWIDTH SAVED 82%
              </span>
              <span className="text-xs text-[#8C867B] hidden sm:inline">
                3.42 MB transferred vs 19.00 MB unpruned full broadcast across mesh
              </span>
            </div>
          </div>

          <div className="px-3 py-1.5 bg-[#22201D] border border-[#F5A524]/40 text-[#F5A524] text-xs font-bold">
            +15,580 KB AIR-GAP BANDWIDTH PRESERVED
          </div>
        </div>

        {/* Comparison Bars */}
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#F2EEE6] font-semibold">
                ▪ ACTIVE POLICY (SELECTIVE CRDT DIFF): 3,420 KB
              </span>
              <span className="text-[#F5A524] font-bold">18.0% OF TOTAL CAPACITY</span>
            </div>
            <div className="h-3 w-full bg-[#121110] border border-[#34302A] p-0.5">
              <div className="h-full bg-[#F5A524] w-[18%] transition-all duration-500" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#8C867B]">
                ▪ NAIVE BROADCAST (UNFILTERED): 19,000 KB
              </span>
              <span className="text-[#8C867B]">100.0% BASELINE WORST-CASE</span>
            </div>
            <div className="h-3 w-full bg-[#121110] border border-[#34302A] p-0.5">
              <div className="h-full bg-[#8C867B]/40 w-[100%]" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Columns: Pushed, Held, Pulled */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Column 1: PUSHED TO FLEET */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#F2EEE6] font-semibold flex items-center gap-1.5">
              <span>📤</span> PUSHED TO FLEET
              <span className="px-1.5 py-0.2 bg-[#22201D] text-[#F5A524] border border-[#34302A]">
                {syncData.pushed_items.length}
              </span>
            </span>
            <span className="text-[#8C867B]">1,240 KB</span>
          </div>

          <div className="space-y-2">
            {syncData.pushed_items.map((item) => (
              <div key={item.id} className="p-2.5 bg-[#121110] border border-[#34302A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#8C867B]">{item.id}</span>
                  {item.badge === "SHARE" ? (
                    <span className="px-1.5 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold text-[10px]">
                      SHARE
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-[#22201D] text-[#8C867B] border border-[#34302A] text-[10px]">
                      ✓ SYNCED
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-[#F2EEE6]">{item.title}</div>
                <div className="text-[11px] text-[#8C867B] leading-tight">{item.subtext}</div>
                <div className="flex justify-between pt-1 border-t border-[#34302A]/60 text-[10px] text-[#8C867B]">
                  <span>PAYLOAD: {item.payload_kb} KB</span>
                  <span className="text-[#F5A524]">{item.status_text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: HELD LOCALLY */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#F2EEE6] font-semibold flex items-center gap-1.5">
              <span>⏸</span> HELD LOCALLY
              <span className="px-1.5 py-0.2 bg-[#22201D] text-[#F5A524] border border-[#34302A]">
                {syncData.held_items.length}
              </span>
            </span>
            <span className="text-[#8C867B]">14,800 KB</span>
          </div>

          <div className="space-y-2">
            {syncData.held_items.map((item) => (
              <div key={item.id} className="p-2.5 bg-[#121110] border border-[#34302A] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#8C867B]">{item.id}</span>
                  <span className="px-1.5 py-0.5 border border-[#F5A524] text-[#F5A524] text-[10px]">
                    HOLD
                  </span>
                </div>
                <div className="font-semibold text-xs text-[#F2EEE6]">{item.title}</div>
                <div className="text-[11px] text-[#8C867B] leading-tight">{item.subtext}</div>
                <div className="text-[10px] text-[#8C867B] space-y-0.5 pt-1 border-t border-[#34302A]/60">
                  <div>SIZE ON DISK: <strong className="text-[#F2EEE6]">{item.size_on_disk}</strong></div>
                  <div>POLICY RULE: <strong className="text-[#F5A524]">{item.policy_rule}</strong></div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button className="py-1 bg-[#22201D] border border-[#F5A524]/60 text-[#F5A524] text-xs">
                    FORCE PUSH
                  </button>
                  <button className="py-1 bg-[#22201D] border border-[#34302A] text-[#8C867B] text-xs">
                    INSPECT
                  </button>
                </div>
              </div>
            ))}

            <div className="p-3 border border-dashed border-[#34302A] text-center text-[10px] text-[#8C867B] space-y-1">
              <div className="font-semibold text-[#F2EEE6]">SELECTIVE HOLD FILTER ACTIVE</div>
              <div>Payloads &gt;2MB intercepted automatically</div>
            </div>
          </div>
        </div>

        {/* Column 3: PULLED FROM FLEET */}
        <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#F2EEE6] font-semibold flex items-center gap-1.5">
              <span>📥</span> PULLED FROM FLEET
              <span className="px-1.5 py-0.2 bg-[#22201D] text-[#F5A524] border border-[#34302A]">
                {syncData.pulled_items.length}
              </span>
            </span>
            <span className="text-[#8C867B]">2,180 KB</span>
          </div>

          <div className="space-y-2">
            {syncData.pulled_items.map((item) => (
              <div key={item.id} className="p-2.5 bg-[#121110] border border-[#34302A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#8C867B]">{item.id}</span>
                  {item.badge === "synced" ? (
                    <span className="px-1.5 py-0.5 bg-[#22201D] text-[#8C867B] border border-[#34302A] text-[10px]">
                      ✓ SYNCED
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-[#F5A524]/10 border-l border-l-[#F5A524] text-[#F5A524] text-[10px]">
                      ⑂ CONFLICT
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-[#F2EEE6]">{item.title}</div>
                <div className="text-[11px] text-[#8C867B] leading-tight">{item.subtext}</div>
                <div className="flex justify-between pt-1 border-t border-[#34302A]/60 text-[10px] text-[#8C867B]">
                  <span>PAYLOAD: {item.payload_kb} KB</span>
                  {item.badge === "conflict" ? (
                    <Link
                      href={`/device/${device.id}/conflicts`}
                      className="text-[#F5A524] hover:underline"
                    >
                      {item.status_text}
                    </Link>
                  ) : (
                    <span className="text-[#F2EEE6]">{item.status_text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Outbox Dispatch Queue & Real-Time Sync Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 font-mono text-xs">
        {/* Outbox Queue */}
        <div className="lg:col-span-7 bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#F2EEE6] font-semibold">
              OUTBOX DISPATCH QUEUE • CRDT VECTOR STATE MACHINE
            </span>
            <span className="text-[#F5A524]">18 OPERATIONS PENDING</span>
          </div>

          <div className="border border-[#34302A] overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#34302A] text-[10px] text-[#8C867B] uppercase bg-[#121110]">
                  <th className="p-2">OP ID</th>
                  <th className="p-2">MEMORY REF</th>
                  <th className="p-2">STATE</th>
                  <th className="p-2">ATTEMPTS</th>
                  <th className="p-2">BYTES</th>
                  <th className="p-2">LATENCY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#34302A]/60">
                {syncData.outbox_queue.map((op) => (
                  <tr key={op.op_id} className="hover:bg-[#22201D]">
                    <td className="p-2 text-[#F5A524] font-bold">{op.op_id}</td>
                    <td className="p-2 text-[#F2EEE6]">{op.mem_ref}</td>
                    <td className="p-2">
                      {op.state === "PENDING" && (
                        <span className="px-1.5 py-0.5 border border-dashed border-[#F5A524] text-[#F5A524] text-[10px]">
                          PENDING
                        </span>
                      )}
                      {op.state === "SYNCED" && (
                        <span className="px-1.5 py-0.5 bg-[#22201D] text-[#8C867B] border border-[#34302A] text-[10px]">
                          ✓ SYNCED
                        </span>
                      )}
                      {op.state === "LOCAL_ONLY" && (
                        <span className="px-1.5 py-0.5 border border-[#8C867B] text-[#8C867B] text-[10px]">
                          LOCAL_ONLY
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-[#8C867B]">{op.attempts}</td>
                    <td className="p-2 text-[#F2EEE6]">{op.bytes}</td>
                    <td className="p-2 text-[#8C867B]">{op.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#8C867B]">SHOWING 5 OF 18 QUEUED OPS</span>
            <button className="px-3 py-1 bg-[#22201D] border border-[#F5A524]/60 text-[#F5A524] hover:bg-[#F5A524] hover:text-[#1A1100] font-bold transition-colors">
              BULK FLUSH DISPATCH
            </button>
          </div>
        </div>

        {/* Real-Time Sync Log */}
        <div className="lg:col-span-5 bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
            <span className="text-[#F2EEE6] font-semibold">REAL-TIME SYNC LOG</span>
            <span className="text-[11px] text-[#F5A524] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524] animate-pulse" />
              DEV-B (10.240.12.8)
            </span>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto">
            {syncData.sync_logs.map((log, i) => (
              <div key={i} className="text-[11px] leading-relaxed flex items-start gap-2">
                <span className="text-[#8C867B] shrink-0">[{log.ts}]</span>
                <div>
                  <span className="text-[#F5A524] font-bold mr-1.5">{log.tag}:</span>
                  <span className="text-[#D1C9BC]">{log.msg}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#34302A] text-[10px] text-[#8C867B]">
            <span>((•)) BUFFER: 128 KB RING BUFFER</span>
            <button className="hover:text-[#F2EEE6]">CLEAR VIEW</button>
          </div>
        </div>
      </div>
    </div>
  );
}
