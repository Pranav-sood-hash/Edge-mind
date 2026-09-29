"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Shield, Zap, RefreshCw, Cpu, Layers } from "lucide-react";

export default function BenchmarkProofPage() {
  return (
    <div className="min-h-screen bg-[#121110] text-[#F2EEE6] flex flex-col font-mono text-xs select-none">
      {/* Top Banner Header */}
      <header className="h-16 bg-[#1A1917] border-b border-[#34302A] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/device/device-a"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-[#8C867B] hover:text-[#F2EEE6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CONSOLE</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-[#F2EEE6] text-base">EDGEMIND</span>
            <span className="px-2 py-0.5 bg-[#22201D] border border-[#F5A524]/40 text-[#F5A524] text-[10px]">
              EVAL-BENCH // v1.4
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#34302A] text-[11px] text-[#8C867B]">
            <span>BENCHMARK AUDIT:</span>
            <span className="text-[#F2EEE6] font-semibold">OFFLINE INDUSTRIAL FLEET VERIFICATION</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="hidden lg:flex items-center gap-2 text-[#8C867B]">
            <span>HARDWARE:</span>
            <strong className="text-[#F2EEE6]">RK3588 NPU (8-CORE) // 16GB ECC</strong>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[#8C867B]">
            <span>MODEL:</span>
            <strong className="text-[#F5A524]">EdgeLLM-7B-Q4</strong>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#22201D] border border-[#F5A524] text-[#F5A524] font-bold badge-pill">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A524]" />
            <span>EVALUATION COMPLETE: PASS</span>
          </div>
        </div>
      </header>

      {/* Main Slide Content */}
      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Title & Dataset Subtitle */}
        <div className="border-b border-[#34302A] pb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] text-[#8C867B] uppercase tracking-wider">
              AUDIT SUMMARY SLIDE • TECHNICAL SPECIFICATION SHEET
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-[#F2EEE6] tracking-tight">
              PERFORMANCE & RELIABILITY BENCHMARK VALIDATION
            </h1>
          </div>
          <div className="text-[11px] text-[#8C867B] text-right">
            <div>TESTED DATASET: <strong className="text-[#F2EEE6]">14,820 INDUSTRIAL CHUNKS (384-DIM INT8)</strong></div>
            <div>SIMULATION RIG: <span className="text-[#F5A524]">RIG-ALPHA / DISPATCH STATION NORTH</span></div>
          </div>
        </div>

        {/* 4 Big Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Latency */}
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#8C867B]">
              <span>INFERENCE & RETRIEVAL LATENCY</span>
              <span className="px-1.5 py-0.5 border border-[#F5A524]/60 text-[#F5A524]">ON-DEVICE</span>
            </div>
            <div className="text-4xl font-extrabold text-[#F5A524] tracking-tight">
              14 <span className="text-2xl text-[#8C867B]">/</span> 28 <span className="text-sm">ms</span>
            </div>
            <div className="text-[11px] text-[#8C867B] flex justify-between">
              <span>p50: 14ms (MEDIAN)</span>
              <span>p95: 28ms (PEAK)</span>
            </div>
            <div className="pt-2 border-t border-[#34302A] text-[10px] text-[#8C867B] flex justify-between">
              <span>EMBED: 6ms • FUSE: 1ms</span>
              <span className="text-[#F2EEE6]">100% AIR-GAPPED</span>
            </div>
          </div>

          {/* Card 2: Leaks */}
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#8C867B]">
              <span>NETWORK SANITIZATION & LEAKS</span>
              <span className="px-1.5 py-0.5 border border-[#8C867B] text-[#8C867B]">LOCAL PRIVACY</span>
            </div>
            <div className="text-4xl font-extrabold text-[#F5A524] tracking-tight">
              0 <span className="text-2xl text-[#F2EEE6]">LEAKS</span>
            </div>
            <div className="text-[11px] text-[#8C867B]">
              PII REDACTION & STRICT FIELD POLICY PASS
            </div>
            <div className="pt-2 border-t border-[#34302A] text-[10px] text-[#8C867B] flex justify-between">
              <span>0 OUTBOUND EGRESS PACKETS</span>
              <span className="text-[#F5A524]">AIR-GAP CERTIFIED</span>
            </div>
          </div>

          {/* Card 3: Sync Efficiency */}
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#8C867B]">
              <span>SYNCHRONIZATION EFFICIENCY</span>
              <span className="px-1.5 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold">SAVED</span>
            </div>
            <div className="text-4xl font-extrabold text-[#F5A524] tracking-tight">
              82.4%
            </div>
            <div className="text-[11px] text-[#8C867B]">
              BANDWIDTH SAVED VS. RAW FLEET BROADCAST
            </div>
            <div className="pt-2 border-t border-[#34302A] text-[10px] text-[#8C867B] flex justify-between">
              <span>DELTA SYNC: 142 KB</span>
              <span className="line-through text-[#8C867B]">RAW: 810 KB</span>
            </div>
          </div>

          {/* Card 4: Crash Suite */}
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#8C867B]">
              <span>FAULT RESILIENCE // CRASH SUITE</span>
              <span className="px-1.5 py-0.5 border border-[#F5A524] text-[#F5A524]">DETERMINISTIC</span>
            </div>
            <div className="text-4xl font-extrabold text-[#F5A524] tracking-tight">
              20/20
            </div>
            <div className="text-[11px] text-[#8C867B]">
              ABRUPT POWER-CUT & CRDT FORK RECOVERY
            </div>
            <div className="pt-2 border-t border-[#34302A] text-[10px] text-[#8C867B] flex justify-between">
              <span>CORRUPTION EVENTS: 0</span>
              <span className="text-[#F2EEE6]">ZERO CORRUPTED CHUNKS</span>
            </div>
          </div>
        </div>

        {/* Main Split: Retrieval Accuracy (Left) & Durability Matrix (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Retrieval Comparison (8 cols) */}
          <div className="lg:col-span-8 bg-[#1A1917] border border-[#34302A] p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#34302A] pb-3">
              <div>
                <div className="text-[10px] text-[#8C867B] uppercase">
                  SEARCH RETRIEVAL ACCURACY // INDUSTRIAL FAULT CORPUS
                </div>
                <div className="text-base font-bold text-[#F2EEE6] tracking-tight mt-0.5">
                  DENSE (VECTOR) VS BM25 (LEXICAL) VS HYBRID FUSION (RRF)
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border border-[#8C867B]" />
                  <span className="text-[#8C867B]">Dense Vector</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border border-[#8C867B]" />
                  <span className="text-[#8C867B]">BM25 Lexical</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#F5A524]" />
                  <span className="text-[#F5A524] font-bold">Hybrid (EdgeMind)</span>
                </div>
              </div>
            </div>

            {/* Metric 1: Recall @ 5 */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#F2EEE6]">
                  RECALL @ 5{" "}
                  <span className="text-[11px] font-normal text-[#8C867B]">
                    (Relevant troubleshooting fixes retrieved in top-5 results)
                  </span>
                </span>
                <span className="text-[#F5A524] font-bold">+18.2% HYBRID ADVANTAGE</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-3">
                  <span className="w-28 text-[#8C867B]">Dense Vector</span>
                  <div className="flex-1 h-5 bg-[#121110] border border-[#34302A] p-0.5 flex items-center">
                    <div className="h-full bg-[#8C867B]/30" style={{ width: "72.4%" }} />
                  </div>
                  <span className="w-12 text-right text-[#8C867B]">0.724</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-28 text-[#8C867B]">BM25 Lexical</span>
                  <div className="flex-1 h-5 bg-[#121110] border border-[#34302A] p-0.5 flex items-center">
                    <div className="h-full bg-[#8C867B]/40" style={{ width: "78.1%" }} />
                  </div>
                  <span className="w-12 text-right text-[#8C867B]">0.781</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-28 text-[#F5A524] font-bold">Hybrid Fusion</span>
                  <div className="flex-1 h-5 bg-[#121110] border border-[#34302A] p-0.5 flex items-center relative">
                    <div className="h-full bg-[#F5A524]" style={{ width: "94.6%" }} />
                    <span className="absolute left-2 text-[10px] font-bold text-[#1A1100]">
                      EDGEMIND DEPLOYED ENGINE
                    </span>
                  </div>
                  <span className="w-12 text-right text-[#F5A524] font-bold">0.946</span>
                </div>
              </div>
            </div>

            {/* Metric 2: MRR */}
            <div className="space-y-2 pt-2 border-t border-[#34302A]">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#F2EEE6]">
                  MRR (MEAN RECIPROCAL RANK){" "}
                  <span className="text-[11px] font-normal text-[#8C867B]">
                    (Rank index of first verified OEM fix or torque spec)
                  </span>
                </span>
                <span className="text-[#F5A524] font-bold">+22.4% FIRST-RANK ACCURACY</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-3">
                  <span className="w-28 text-[#8C867B]">Dense Vector</span>
                  <div className="flex-1 h-5 bg-[#121110] border border-[#34302A] p-0.5 flex items-center">
                    <div className="h-full bg-[#8C867B]/30" style={{ width: "64.8%" }} />
                  </div>
                  <span className="w-12 text-right text-[#8C867B]">0.648</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-28 text-[#8C867B]">BM25 Lexical</span>
                  <div className="flex-1 h-5 bg-[#121110] border border-[#34302A] p-0.5 flex items-center">
                    <div className="h-full bg-[#8C867B]/40" style={{ width: "69.2%" }} />
                  </div>
                  <span className="w-12 text-right text-[#8C867B]">0.692</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-28 text-[#F5A524] font-bold">Hybrid Fusion</span>
                  <div className="flex-1 h-5 bg-[#121110] border border-[#34302A] p-0.5 flex items-center relative">
                    <div className="h-full bg-[#F5A524]" style={{ width: "89.4%" }} />
                    <span className="absolute left-2 text-[10px] font-bold text-[#1A1100]">
                      RECIPROCAL RANK FUSION (k=60)
                    </span>
                  </div>
                  <span className="w-12 text-right text-[#F5A524] font-bold">0.894</span>
                </div>
              </div>
            </div>

            {/* Formula footnote */}
            <div className="pt-2 border-t border-[#34302A] flex flex-wrap items-center justify-between text-[10px] text-[#8C867B]">
              <div>FORMULA: RRF_Score = Σ (1 / (60 + rank_dense) + 1 / (60 + rank_bm25))</div>
              <div>EVAL SET: 1,402 INDUSTRIAL TROUBLESHOOTING LOGS</div>
            </div>
          </div>

          {/* Right: Durability Crash Matrix & Policy Verification (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Durability Crash Matrix */}
            <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
                <span className="font-semibold text-[#F2EEE6] uppercase">DURABILITY CRASH MATRIX</span>
                <span className="text-[#F5A524] font-bold">20 OF 20 PASS</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 bg-[#121110] border border-[#34302A] space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-[#F2EEE6]">T-01: Hard SIGKILL during SQLite Write</strong>
                    <span className="text-[#F5A524] font-bold">PASS [10/10]</span>
                  </div>
                  <div className="text-[10px] text-[#8C867B]">WAL rollforward valid • 0 orphaned chunks</div>
                </div>

                <div className="p-2.5 bg-[#121110] border border-[#34302A] space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-[#F2EEE6]">T-02: Simultaneous Dual-Peer Fork Collision</strong>
                    <span className="text-[#F5A524] font-bold">PASS [5/5]</span>
                  </div>
                  <div className="text-[10px] text-[#8C867B]">CRDT Lamport clock resolved in 2.1ms</div>
                </div>

                <div className="p-2.5 bg-[#121110] border border-[#34302A] space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-[#F2EEE6]">T-03: Sudden Flash Storage Outage</strong>
                    <span className="text-[#F5A524] font-bold">PASS [5/5]</span>
                  </div>
                  <div className="text-[10px] text-[#8C867B]">Buffer flush to non-volatile ring log</div>
                </div>
              </div>

              <div className="text-[10px] text-[#8C867B] pt-1">
                STRESS CYCLE DURATION: <strong className="text-[#F2EEE6]">48 HRS CONTINUOUS</strong>
              </div>
            </div>

            {/* Policy & Privacy Verification */}
            <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
                <span className="font-semibold text-[#F2EEE6] uppercase">POLICY & PRIVACY VERIFICATION</span>
                <span className="px-1.5 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold text-[10px]">AUDITED</span>
              </div>

              <p className="text-xs font-sans text-[#D1C9BC] leading-relaxed">
                On-device regex/NER detector automatically parsed and scrubbed 100% of phone numbers, technician badges, and OEM contact parameters prior to queue stage.
              </p>

              <div className="space-y-1.5 text-[11px] border-t border-[#34302A] pt-2 text-[#8C867B]">
                <div className="flex justify-between">
                  <span>PII REGEX ACCURACY:</span>
                  <strong className="text-[#F5A524]">100.0% (0 False Negatives)</strong>
                </div>
                <div className="flex justify-between">
                  <span>UNAPPROVED FLEET PUSHES:</span>
                  <strong className="text-[#F2EEE6]">0 ATTEMPTS</strong>
                </div>
                <div className="flex justify-between">
                  <span>POLICY EVALUATION OVERHEAD:</span>
                  <strong className="text-[#F2EEE6]">1.2ms per memory chunk</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-[#34302A] flex justify-between text-[10px]">
                <span className="text-[#8C867B]">COMPLIANCE STATUS:</span>
                <span className="text-[#F5A524] font-bold">INDUSTRIAL SOC2 / AIR-GAP VALID</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Slide Deck Footer */}
      <footer className="h-10 bg-[#1A1917] border-t border-[#34302A] px-6 flex items-center justify-between text-[11px] text-[#8C867B]">
        <div className="flex items-center gap-4">
          <span className="text-[#F5A524] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#F5A524]" />
            EDGEMIND RESULTS DECK
          </span>
          <span>•</span>
          <span>OFFLINE AI MEMORY ARCHITECTURE</span>
          <span>•</span>
          <span>PILOT RUN: 14 FIELD TECHNICIANS (PLANT NORTH & SOUTH)</span>
        </div>

        <div>
          AUDITED BY: <strong className="text-[#F2EEE6]">MEERA S. (PRINCIPAL RELIABILITY ENG)</strong> | PRESS [ESC] OR [F11] FOR FULLSCREEN SLIDE
        </div>
      </footer>
    </div>
  );
}
