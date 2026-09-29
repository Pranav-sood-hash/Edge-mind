"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import {
  Cloud,
  Check,
  X,
  Pause,
  ArrowUpRight,
  GitBranch,
  Shield,
  Layers,
  Database,
  Radio,
  FileText,
  Clock,
  Sparkles,
  Download,
} from "lucide-react";

export default function CloudConsolePage() {
  const [promotedIds, setPromotedIds] = useState<string[]>([]);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);

  const handlePromote = (id: string) => {
    setPromotedIds([...promotedIds, id]);
  };

  const handleReject = (id: string) => {
    setRejectedIds([...rejectedIds, id]);
  };

  return (
    <div className="min-h-screen bg-[#121110] flex flex-col">
      <Header isCloud={true} />

      <main className="flex-1 p-5 space-y-5 font-mono text-xs overflow-y-auto">
        {/* Top Control Plane Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#34302A] pb-3">
          <div>
            <div className="text-[10px] text-[#8C867B] uppercase tracking-wider">
              FLEET CENTRAL // RELIABILITY CONTROL PLANE // NODE CLUSTER: AP-SOUTH-01
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <h1 className="text-lg font-bold text-[#F2EEE6] tracking-tight">
                MEERA S. — LEAD RELIABILITY ENGINEER
              </h1>
              <span className="px-2 py-0.5 border border-[#34302A] bg-[#1A1917] text-[#8C867B] text-[10px]">
                [CENTRAL DESK AUTH]
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#22201D] border border-[#F5A524]/40 text-[#F5A524] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#F5A524] animate-pulse" />
              FLEET LINK: STEADY (94.2% AIR-GAP COMPLIANCE)
            </span>
            <span className="px-2.5 py-1 bg-[#1A1917] border border-[#34302A] text-[#8C867B]">
              POLICY RULES: STRICT EXTRACTIVE
            </span>
            <button className="px-3 py-1 bg-[#22201D] border border-[#34302A] hover:border-[#8C867B] text-[#F2EEE6]">
              Thresholds
            </button>
          </div>
        </div>

        {/* 5 Big Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-[#1A1917] border border-[#34302A] p-3.5 space-y-1">
            <div className="text-[10px] text-[#8C867B] uppercase">DEVICES ONLINE</div>
            <div className="text-3xl font-extrabold text-[#F2EEE6]">14 / 16</div>
            <div className="text-[10px] text-[#8C867B]">2 Air-Gapped / Isolated</div>
          </div>

          <div className="bg-[#1A1917] border border-[#34302A] p-3.5 space-y-1">
            <div className="text-[10px] text-[#8C867B] uppercase">FLEET KNOWLEDGE COUNT</div>
            <div className="text-3xl font-extrabold text-[#F2EEE6]">18,429</div>
            <div className="text-[10px] text-[#F5A524]">+142 chunks today</div>
          </div>

          <div className="bg-[#1A1917] border border-[#34302A] p-3.5 space-y-1">
            <div className="text-[10px] text-[#8C867B] uppercase">INBOX PENDING REVIEW</div>
            <div className="text-3xl font-extrabold text-[#F5A524]">7</div>
            <div className="text-[10px] text-[#8C867B]">Awaiting Meera Sign-off</div>
          </div>

          <div className="bg-[#1A1917] border border-[#34302A] p-3.5 space-y-1">
            <div className="text-[10px] text-[#8C867B] uppercase">PROMOTED TODAY</div>
            <div className="text-3xl font-extrabold text-[#F2EEE6]">38</div>
            <div className="text-[10px] text-[#8C867B]">Broadcast to all nodes</div>
          </div>

          <div className="bg-[#1A1917] border border-[#34302A] p-3.5 space-y-1 col-span-2 md:col-span-1">
            <div className="text-[10px] text-[#8C867B] uppercase">BANDWIDTH / BYTES SAVED</div>
            <div className="text-3xl font-extrabold text-[#F5A524]">412.8 <span className="text-sm">MB</span></div>
            <div className="text-[10px] text-[#8C867B]">87.4% edge deduplication</div>
          </div>
        </div>

        {/* Main Grid: Devices + Inbox (left 7 cols) & Broadcast Engine + Audit Trail (right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column (8 cols): Devices Table & Curator Inbox */}
          <div className="lg:col-span-8 space-y-5">
            {/* Devices Table */}
            <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#34302A] pb-2 text-[#8C867B]">
                <span className="font-semibold text-[#F2EEE6] uppercase">
                  FLEET DEVICES & AIR-GAP TELEMETRY
                </span>
                <span>POLL: 1000ms • AUTO-ROUTING ACTIVE</span>
              </div>

              <div className="border border-[#34302A] overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#34302A] text-[10px] text-[#8C867B] uppercase bg-[#121110]">
                      <th className="p-2.5">DEVICE ID & SITE</th>
                      <th className="p-2.5">MODEL & ROLE</th>
                      <th className="p-2.5">LINK STATE</th>
                      <th className="p-2.5">HEARTBEAT</th>
                      <th className="p-2.5">LOCAL CACHE</th>
                      <th className="p-2.5">QUEUED SYNC</th>
                      <th className="p-2.5 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#34302A]/60">
                    <tr className="hover:bg-[#22201D]">
                      <td className="p-2.5">
                        <div className="font-bold text-[#F2EEE6]">Device A</div>
                        <div className="text-[10px] text-[#8C867B]">Plant North • Offshore Platform #4</div>
                      </td>
                      <td className="p-2.5">
                        <div>Slurry Pump</div>
                        <div className="text-[10px] text-[#8C867B]">P-204 Monitor</div>
                      </td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 bg-[#22201D] text-[#F5A524] border border-[#F5A524]/40 text-[10px]">
                          ✓ SYNCED
                        </span>
                      </td>
                      <td className="p-2.5 text-[#8C867B]">3s ago • RTT 4ms</td>
                      <td className="p-2.5 text-[#F2EEE6]">14,820 chunks (4.2 GB)</td>
                      <td className="p-2.5 text-[#8C867B]">0 pending</td>
                      <td className="p-2.5 text-right">
                        <Link
                          href="/device/device-a"
                          className="px-2 py-1 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-[#F2EEE6] text-[10px]"
                        >
                          INSPECT NODE
                        </Link>
                      </td>
                    </tr>

                    <tr className="hover:bg-[#22201D]">
                      <td className="p-2.5">
                        <div className="font-bold text-[#F2EEE6]">Device B</div>
                        <div className="text-[10px] text-[#8C867B]">Plant South • Compressor Station 9</div>
                      </td>
                      <td className="p-2.5">
                        <div>Gas Turbine</div>
                        <div className="text-[10px] text-[#8C867B]">T-34 Thermal Array Node</div>
                      </td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 border border-[#8C867B] text-[#8C867B] text-[10px]">
                          AIR-GAPPED
                        </span>
                      </td>
                      <td className="p-2.5 text-[#8C867B]">48m ago • RF 802.15.4</td>
                      <td className="p-2.5 text-[#F2EEE6]">12,110 chunks (3.8 GB)</td>
                      <td className="p-2.5 text-[#F5A524] font-bold">18 queued</td>
                      <td className="p-2.5 text-right">
                        <Link
                          href="/device/device-b"
                          className="px-2 py-1 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-[#F2EEE6] text-[10px]"
                        >
                          INSPECT NODE
                        </Link>
                      </td>
                    </tr>

                    <tr className="hover:bg-[#22201D]">
                      <td className="p-2.5">
                        <div className="font-bold text-[#F2EEE6]">Device C</div>
                        <div className="text-[10px] text-[#8C867B]">Refinery Unit 2 • Catalytic Cracker</div>
                      </td>
                      <td className="p-2.5">
                        <div>Hydraulic Actuators</div>
                        <div className="text-[10px] text-[#8C867B]">Main Valve Feed</div>
                      </td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 bg-[#22201D] text-[#F5A524] border border-[#F5A524]/40 text-[10px]">
                          ✓ SYNCED
                        </span>
                      </td>
                      <td className="p-2.5 text-[#8C867B]">12s ago • RTT 18ms</td>
                      <td className="p-2.5 text-[#F2EEE6]">9,480 chunks (2.9 GB)</td>
                      <td className="p-2.5 text-[#8C867B]">2 pending</td>
                      <td className="p-2.5 text-right">
                        <button className="px-2 py-1 bg-[#22201D] border border-[#34302A] text-[#8C867B] text-[10px]">
                          INSPECT NODE
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inbox Review Queue */}
            <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-[#34302A] pb-2 text-[#8C867B]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#F2EEE6] uppercase">
                    INBOX REVIEW QUEUE (CURATOR TRIAGE)
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold text-[10px]">
                    7 ITEMS
                  </span>
                </div>
                <span>CRITERIA: HUMAN SIGN-OFF REQUIRED</span>
              </div>

              {/* Proposal 1 */}
              {!promotedIds.includes("REV-8802") && !rejectedIds.includes("REV-8802") && (
                <div className="p-4 bg-[#121110] border border-[#34302A] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-[#F5A524] font-bold mr-2">[REV-8802]</span>
                      <span className="font-bold text-sm text-[#F2EEE6]">
                        P-204 Coupling Torquing Calibration Delta
                      </span>
                      <div className="text-[10px] text-[#8C867B] mt-0.5">
                        Origin: Device A (Asha K., Tech #TK-904) • Asset: Pump P-204 • Confidence: 0.941
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold text-[10px]">
                      PROPOSAL: ↗ SHARE
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[#D1C9BC] leading-relaxed">
                    Field measurement confirmed 145 Nm prevents bearing race spalling on high-vibration runout; verified across 14 peers.
                  </p>

                  <div className="p-2.5 bg-[#1A1917] border border-[#34302A] text-[11px] font-mono space-y-1">
                    <div className="text-[10px] text-[#8C867B] uppercase">SPECIFICATION DIFF:</div>
                    <div className="line-through text-[#8C867B]">- spec: 210 Nm (obsolete bulletin)</div>
                    <div className="text-[#F5A524] font-bold">+ verified: 145 Nm star pattern in 40 Nm steps</div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button className="px-3 py-1.5 bg-[#22201D] border border-[#34302A] text-[#8C867B] hover:text-[#F2EEE6]">
                      Hold for Lab Data
                    </button>
                    <button
                      onClick={() => handleReject("REV-8802")}
                      className="px-3 py-1.5 bg-[#22201D] border border-[#34302A] text-[#8C867B] hover:text-[#F2EEE6]"
                    >
                      Reject / Keep Local
                    </button>
                    <button
                      onClick={() => handlePromote("REV-8802")}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F5A524] hover:bg-[#F5A524]/90 text-[#1A1100] font-bold transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>APPROVE & PROMOTE TO FLEET</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Proposal 2 */}
              <div className="p-4 bg-[#121110] border border-[#34302A] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-[#F5A524] font-bold mr-2">[REV-8803]</span>
                    <span className="font-bold text-sm text-[#F2EEE6]">
                      T-34 Gas Turbine Stator Thermal Drift Compensation
                    </span>
                    <div className="text-[10px] text-[#8C867B] mt-0.5">
                      Origin: Device B (Ravi M., Tech #TK-812) • Asset: Turbine T-34 • Confidence: 0.887
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#F5A524]/10 border-l border-l-[#F5A524] text-[#F5A524] text-[10px]">
                    PROPOSAL: ⑂ CONFLICT
                  </span>
                </div>

                <p className="text-xs font-sans text-[#D1C9BC] leading-relaxed">
                  Diverges with OEM Bulletin #TB-4012; local telemetry indicates 8°C sensor offset due to insulation degradation.
                </p>

                <div className="p-2.5 bg-[#1A1917] border border-[#34302A] text-[11px] font-mono space-y-1 text-[#8C867B]">
                  <div className="text-[10px] uppercase font-bold text-[#F2EEE6]">TELEMETRY ANOMALY IDENTIFIED:</div>
                  <div>• Sensor Array RTD-044 showing +8.2°C steady bias versus adjacent thermal pairs.</div>
                  <div>• Recommendation: Local sensor compensation override vs. fleet wide update.</div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button className="px-3 py-1.5 bg-[#22201D] border border-[#34302A] text-[#8C867B]">
                    Hold for Lab Data
                  </button>
                  <button className="px-3 py-1.5 bg-[#22201D] border border-[#34302A] text-[#8C867B]">
                    Reject / Keep Local
                  </button>
                  <button className="px-4 py-1.5 bg-[#F5A524] text-[#1A1100] font-bold">
                    APPROVE & PROMOTE TO FLEET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Broadcast Telemetry & Live Audit */}
          <div className="lg:col-span-4 space-y-5">
            {/* Broadcast Engine Telemetry */}
            <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
                <span className="font-semibold text-[#F2EEE6] uppercase">
                  BROADCAST ENGINE TELEMETRY
                </span>
                <span className="w-2 h-2 rounded-full bg-[#F5A524]" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8C867B]">CRDT Epoch:</span>
                  <span className="text-[#F2EEE6] font-bold">v10.492.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C867B]">Broadcast Queue:</span>
                  <span className="text-[#8C867B]">0 pending (flushed)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C867B]">Consensus Model:</span>
                  <span className="text-[#F2EEE6]">BFT-Raft (Quorum 11/14)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C867B]">Cryptographic Key:</span>
                  <span className="text-[#F5A524]">Ed25519: Meera_Active</span>
                </div>

                <div className="pt-2 border-t border-[#34302A]">
                  <div className="flex justify-between text-[11px] text-[#8C867B] mb-1">
                    <span>SYNC BUFFER SATURATION</span>
                    <span className="text-[#F2EEE6]">12%</span>
                  </div>
                  <div className="h-2 w-full bg-[#22201D] flex gap-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 ${i < 2 ? "bg-[#F5A524]" : "bg-[#34302A]"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Authoritative Audit Trail */}
            <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
                <span className="font-semibold text-[#F2EEE6] uppercase">
                  AUTHORITATIVE AUDIT TRAIL
                </span>
                <span className="text-[10px] text-[#F5A524]">LIVE LOG</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#8C867B]">
                    <span>11:42:09</span>
                    <span className="text-[#F5A524]">Device A → verified</span>
                  </div>
                  <div className="font-bold text-[#F2EEE6]">P-204 Drive-End Bearing Replacement Protocol</div>
                  <div className="text-[11px] text-[#8C867B]">
                    Promoted to Fleet Baseline v12.1. Broadcasted to 14 active nodes.
                  </div>
                  <div className="text-[10px] text-[#8C867B]">
                    SHA-256: 7F8E...3A19 • SIGNED: MEERA_S
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-[#34302A]/60">
                  <div className="flex justify-between text-[10px] text-[#8C867B]">
                    <span>10:15:33</span>
                    <span className="text-[#F5A524]">Device B → conflict</span>
                  </div>
                  <div className="font-bold text-[#F2EEE6]">Turbine T-34 Stator Drift Rule</div>
                  <div className="text-[11px] text-[#8C867B]">
                    Accepted as site-specific override for Plant South. Kept local to Device B.
                  </div>
                  <div className="text-[10px] text-[#8C867B]">
                    SHA-256: 4C1A...99E2 • SCOPE: ISOLATED
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-[#34302A]/60">
                  <div className="flex justify-between text-[10px] text-[#8C867B]">
                    <span>08:50:12</span>
                    <span className="text-[#F5A524]">Device A → verified</span>
                  </div>
                  <div className="font-bold text-[#F2EEE6]">Slurry Impeller Deflection Incidents</div>
                  <div className="text-[10px] text-[#8C867B]">
                    SHA-256: 11B0...6201 • FLEET EXPANSION
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#34302A] flex items-center justify-between text-[10px] text-[#8C867B]">
                <span>IMMUTABLE LEDGER • TAIL: 48,192 ENTRIES</span>
                <button className="flex items-center gap-1 text-[#F2EEE6] hover:text-[#F5A524]">
                  <Download className="w-3 h-3 text-[#F5A524]" />
                  <span>EXPORT JSON-LD</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
