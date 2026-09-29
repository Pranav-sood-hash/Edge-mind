"use client";

import React, { useState } from "react";
import { useDevice } from "@/components/DeviceContext";
import { getMockMemoryRecords, submitMemory } from "@/lib/api";
import { MemoryRecord } from "@/lib/types";
import {
  Database,
  ArrowUpRight,
  Pause,
  Lock,
  GitBranch,
  ShieldAlert,
  Paperclip,
  CheckCircle,
  Clock,
  Sparkles,
  X,
  FileCheck,
} from "lucide-react";

export default function MemoryInspectorPage() {
  const { device } = useDevice();
  const [records, setRecords] = useState<MemoryRecord[]>(getMockMemoryRecords());
  const [selectedRecord, setSelectedRecord] = useState<MemoryRecord | null>(records[1]); // MEM-1401 with PII
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSensorDump, setHasSensorDump] = useState(true);

  // Form state
  const [content, setContent] = useState(
    "Observed severe impeller cavitation on slurry pump P-204 at 1,780 RPM. Spoke with OEM rep Hans (cell: +49 171 555 0192) who confirmed clearance shims should be reduced to 0.45mm. Replaced drive-end bearing race SKF-7314; shaft runout reduced to 0.04mm. Acoustic telemetry logged in 48MB vibration raw dump."
  );
  const [kind, setKind] = useState("fix");
  const [assetId, setAssetId] = useState("P-204");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitMemory(device.port, {
        content,
        kind,
        asset_id: assetId,
        site_id: device.site,
        source_device: device.name,
      });

      // Insert new evaluated record
      const newRec: MemoryRecord = {
        id: res.mem_ids[0] || "MEM-1403",
        content,
        preview: content.slice(0, 42) + "...",
        kind: kind as any,
        policy: res.pii_flagged ? "local_only" : "share",
        sync_state: res.pii_flagged ? "local" : "queue_staged",
        authority: 2,
        author: `${device.techName} (${device.techId})`,
        sha256: "9b81...f412",
        updated_at: "Just now",
        has_pii: res.pii_flagged,
        pii_raw: res.pii_flagged ? "+49 171 555 0192" : undefined,
        pii_redacted: res.pii_flagged ? "[REDACTED_TELEPHONE_SEC4]" : undefined,
        fleet_value: res.pii_flagged ? 0.11 : 0.94,
        factors: res.pii_flagged
          ? { pii_sensitivity: 10, redaction_req: 8, reusability: 1 }
          : { quality: 8, reusability: 9, safety: 10 },
        rationale: res.pii_flagged
          ? "EdgeMind regex/NER detector detected E.164 phone number. Auto-classified as restricted PII to protect technician personal telemetry under Field Ops Policy §4.1."
          : "Verified remediation procedure with measured shaft runout reduction. Safe for immediate fleet broadcast.",
      };

      setRecords([newRec, ...records]);
      setSelectedRecord(newRec);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 space-y-5 overflow-y-auto">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#34302A] pb-3">
        <div>
          <div className="text-[10px] font-mono text-[#8C867B] uppercase tracking-wider">
            ■ CORPUS ENGINE • STORAGE CORE §4
          </div>
          <h1 className="text-lg font-bold font-mono text-[#F2EEE6] tracking-tight">
            LOCAL MEMORY & KNOWLEDGE INGESTION
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 bg-[#1A1917] border border-[#34302A]">
            <span className="text-[#8C867B]">TOTAL LOCAL CHUNKS:</span>{" "}
            <strong className="text-[#F2EEE6]">1,402</strong>
          </div>
          <div className="px-3 py-1.5 bg-[#1A1917] border border-[#F5A524]/40">
            <span className="text-[#8C867B]">PENDING REVIEW:</span>{" "}
            <strong className="text-[#F5A524]">3</strong>
          </div>
          <div className="px-3 py-1.5 bg-[#1A1917] border border-[#34302A]">
            <span className="text-[#8C867B]">CRDT VECTOR:</span>{" "}
            <strong className="text-[#F2EEE6]">384-DIM</strong>
          </div>
          <div className="px-3 py-1.5 bg-[#1A1917] border border-[#34302A]">
            <span className="text-[#8C867B]">DEVICE STORAGE:</span>{" "}
            <strong className="text-[#F2EEE6]">{device.storageUsed} / {device.storageTotal}</strong>
          </div>
        </div>
      </div>

      {/* Field Capture Worklog Ingestion Box */}
      <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#34302A] pb-2 text-[#8C867B]">
          <span className="flex items-center gap-1.5 text-[#F2EEE6] font-semibold">
            <FileCheck className="w-3.5 h-3.5 text-[#F5A524]" />
            FIELD CAPTURE & PROVENANCE INGESTION [DISPATCH WORKLOG]
          </span>
          <span>STATION: RIG-ALPHA // DEPLOY_ID: 994-01</span>
        </div>

        <div>
          <div className="text-[10px] text-[#8C867B] uppercase mb-1">
            RAW NARRATIVE OBSERVATIONAL VECTOR
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full bg-[#121110] border border-[#34302A] p-3 text-sm font-mono text-[#F2EEE6] focus:border-[#F5A524] focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#121110] border border-[#34302A] px-2 py-1.5">
              <span className="text-[#8C867B]">KIND:</span>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="bg-transparent text-[#F2EEE6] focus:outline-none text-xs"
              >
                <option value="fix">Fix / Remediation</option>
                <option value="incident">Incident Report</option>
                <option value="manual">Manual Bulletin</option>
                <option value="note">Field Note</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-[#121110] border border-[#34302A] px-2 py-1.5">
              <span className="text-[#8C867B]">ASSET:</span>
              <select
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                className="bg-transparent text-[#F2EEE6] focus:outline-none text-xs"
              >
                <option value="P-204">Pump P-204 (Offshore Slurry Unit)</option>
                <option value="C-112">Compressor C-112</option>
                <option value="T-34">Gas Turbine T-34</option>
              </select>
            </div>

            <button
              onClick={() => setHasSensorDump(!hasSensorDump)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border transition-colors ${
                hasSensorDump
                  ? "bg-[#22201D] border-[#F5A524] text-[#F5A524]"
                  : "bg-[#121110] border-[#34302A] text-[#8C867B]"
              }`}
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>{hasSensorDump ? "Sensor Dump (.bin / 48MB attached)" : "Attach Sensor Dump"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setContent("")}
              className="px-3 py-1.5 bg-[#22201D] border border-[#34302A] hover:text-[#F2EEE6] text-[#8C867B]"
            >
              Reset Draft
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#F5A524] hover:bg-[#F5A524]/90 text-[#1A1100] font-bold tracking-wider transition-colors disabled:opacity-50"
            >
              <span>{isSubmitting ? "EVALUATING..." : "SUBMIT TO LOCAL MEMORY & EVALUATE POLICY"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Policy Decisions Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#8C867B]">
          <span className="uppercase tracking-wide">
            AUTOMATED CONTROL PLANE TRIAGE & FLEET POLICY DECISIONS (3 RECENT EVALUATIONS)
          </span>
          <span className="flex items-center gap-1 text-[#F5A524]">
            <Sparkles className="w-3 h-3" />
            ON-DEVICE AGENT: ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: SHARE */}
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold text-[11px]">
                <ArrowUpRight className="w-3 h-3" />
                SHARE
              </span>
              <span className="text-[#F2EEE6] font-bold">0.942 FLEET_VALUE</span>
            </div>

            <div className="font-semibold text-sm text-[#F2EEE6] leading-tight">
              P-204 Drive-End Bearing Replacement & Deflection Calibration
            </div>

            <div className="space-y-1.5 text-[11px] text-[#8C867B]">
              <div className="flex justify-between">
                <span>QUALITY FACTOR:</span>
                <span className="text-[#F2EEE6]">[████████░░] 8/10</span>
              </div>
              <div className="flex justify-between">
                <span>REUSABILITY FACTOR:</span>
                <span className="text-[#F2EEE6]">[█████████░] 9/10</span>
              </div>
              <div className="flex justify-between">
                <span>SAFETY COMPLIANCE:</span>
                <span className="text-[#F5A524]">[██████████] 10/10</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#34302A] text-xs font-sans text-[#D1C9BC] leading-relaxed">
              Verified remediation procedure with measured shaft runout reduction. Safe for immediate fleet-wide broadcast across Plant North & South.
            </div>
          </div>

          {/* Card 2: LOCAL_ONLY */}
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
              <span className="flex items-center gap-1 px-2 py-0.5 border border-[#8C867B] text-[#8C867B] text-[11px]">
                <Lock className="w-3 h-3" />
                LOCAL_ONLY
              </span>
              <span className="text-[#8C867B] font-bold">0.110 FLEET_VALUE</span>
            </div>

            <div className="font-semibold text-sm text-[#F2EEE6] leading-tight">
              OEM Representative Direct Contact Details & Field Notes
            </div>

            <div className="space-y-1.5 text-[11px] text-[#8C867B]">
              <div className="flex justify-between">
                <span className="text-[#F5A524]">PII SENSITIVITY:</span>
                <span className="text-[#F5A524]">[██████████] 10/10</span>
              </div>
              <div className="flex justify-between">
                <span>REDACTION REQUIRED:</span>
                <span className="text-[#F2EEE6]">[████████░░] 8/10</span>
              </div>
              <div className="flex justify-between">
                <span>FLEET REUSABILITY:</span>
                <span className="text-[#8C867B]">[█░░░░░░░░░] 1/10</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#34302A] text-xs font-sans text-[#D1C9BC] leading-relaxed">
              Contains unredacted personal phone number (+49 171 555 0192). Restricted to Device A local storage under fleet privacy policy §4.1.
            </div>
          </div>

          {/* Card 3: HOLD */}
          <div className="bg-[#1A1917] border border-[#34302A] p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
              <span className="flex items-center gap-1 px-2 py-0.5 border border-[#F5A524] text-[#F5A524] text-[11px]">
                <Pause className="w-3 h-3" />
                HOLD
              </span>
              <span className="text-[#F2EEE6] font-bold">0.680 FLEET_VALUE</span>
            </div>

            <div className="font-semibold text-sm text-[#F2EEE6] leading-tight">
              High-Frequency Acoustic & Accelerometer Raw Stream (48.2 MB)
            </div>

            <div className="space-y-1.5 text-[11px] text-[#8C867B]">
              <div className="flex justify-between">
                <span className="text-[#F5A524]">PAYLOAD SIZE:</span>
                <span className="text-[#F5A524]">[█████████░] 9/10</span>
              </div>
              <div className="flex justify-between">
                <span>BANDWIDTH COST:</span>
                <span className="text-[#F2EEE6]">[████████░░] 8/10</span>
              </div>
              <div className="flex justify-between">
                <span>COMPRESSION POTENTIAL:</span>
                <span className="text-[#F2EEE6]">[███████░░░] 7/10</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#34302A] text-xs font-sans text-[#D1C9BC] leading-relaxed">
              Raw sensor payload exceeds 25 MB mesh transfer limit. Held locally awaiting direct wired dock sync or offline summary extraction.
            </div>
          </div>
        </div>
      </div>

      {/* Main Table + Inspector Drawer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Memory Table (7 or 12 cols depending on drawer) */}
        <div className={`space-y-2 font-mono text-xs ${selectedRecord ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <div className="flex items-center justify-between text-[#8C867B]">
            <span className="font-semibold text-[#F2EEE6]">
              INDEXED CORPUS VECTORS ({records.length + 1397} RECORDS)
            </span>
            <span>CRDT HASH: 0x9B18..F42</span>
          </div>

          <div className="border border-[#34302A] bg-[#1A1917] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#34302A] text-[10px] text-[#8C867B] uppercase bg-[#121110]">
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">TEXT PREVIEW</th>
                  <th className="p-2.5">KIND</th>
                  <th className="p-2.5">POLICY</th>
                  <th className="p-2.5">SYNC STATE</th>
                  <th className="p-2.5">AUTHORITY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#34302A]/60">
                {records.map((r) => {
                  const isSelected = selectedRecord?.id === r.id;
                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedRecord(r)}
                      className={`cursor-pointer transition-colors hover:bg-[#22201D] ${
                        isSelected ? "bg-[#22201D] border-l-2 border-l-[#F5A524]" : ""
                      }`}
                    >
                      <td className="p-2.5 font-bold text-[#F5A524]">{r.id}</td>
                      <td className="p-2.5 text-[#F2EEE6] truncate max-w-xs">{r.preview}</td>
                      <td className="p-2.5 text-[#8C867B] uppercase">{r.kind}</td>
                      <td className="p-2.5">
                        {r.policy === "share" && (
                          <span className="px-1.5 py-0.5 bg-[#F5A524] text-[#1A1100] font-bold text-[10px]">
                            SHARE
                          </span>
                        )}
                        {r.policy === "local_only" && (
                          <span className="px-1.5 py-0.5 border border-[#8C867B] text-[#8C867B] text-[10px]">
                            LOCAL
                          </span>
                        )}
                        {r.policy === "hold" && (
                          <span className="px-1.5 py-0.5 border border-[#F5A524] text-[#F5A524] text-[10px]">
                            HOLD
                          </span>
                        )}
                        {r.policy === "conflict" && (
                          <span className="px-1.5 py-0.5 bg-[#F5A524]/10 text-[#F5A524] text-[10px] border-l border-l-[#F5A524]">
                            CONFLICT
                          </span>
                        )}
                      </td>
                      <td className="p-2.5">
                        <span className="text-[10px] text-[#8C867B] border border-[#34302A] px-1 py-0.5">
                          {r.sync_state}
                        </span>
                      </td>
                      <td className="p-2.5 text-[#8C867B]">{r.author}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8C867B] pt-2">
            <span>SHOWING {records.length} OF 1,402 VECTORS</span>
            <div className="flex items-center gap-2">
              <button className="px-2 py-0.5 border border-[#34302A] hover:text-[#F2EEE6]">← PREV</button>
              <span className="text-[#F2EEE6]">PAGE 1 / 281</span>
              <button className="px-2 py-0.5 border border-[#34302A] hover:text-[#F2EEE6]">NEXT →</button>
            </div>
          </div>
        </div>

        {/* Entry Inspector Drawer */}
        {selectedRecord && (
          <div className="lg:col-span-5 bg-[#1A1917] border border-[#34302A] p-4 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#34302A] pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#F2EEE6]">
                  ENTRY INSPECTOR: {selectedRecord.id}
                </span>
                <span className="px-1.5 py-0.5 border border-[#8C867B] text-[10px] text-[#8C867B]">
                  POLICY: {selectedRecord.policy.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-[#8C867B] hover:text-[#F2EEE6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Original Text with PII highlight */}
            <div>
              <div className="flex justify-between text-[10px] text-[#8C867B] mb-1">
                <span>ORIGINAL CAPTURED TEXT (DEVICE A)</span>
                {selectedRecord.has_pii && (
                  <span className="text-[#F5A524] font-bold">E.164 ENTITY DETECTED</span>
                )}
              </div>
              <div className="bg-[#121110] border border-[#34302A] p-3 text-xs leading-relaxed text-[#F2EEE6]">
                {selectedRecord.has_pii ? (
                  <>
                    Spoke with OEM rep Hans (cell:{" "}
                    <span className="px-1 py-0.5 bg-[#F5A524]/20 border border-[#F5A524] text-[#F5A524] font-bold">
                      {selectedRecord.pii_raw}
                    </span>
                    ) who confirmed clearance shims should be reduced to 0.45mm. Replaced drive-end bearing race SKF-7314; shaft runout reduced to 0.04mm.
                  </>
                ) : (
                  selectedRecord.content
                )}
              </div>
            </div>

            {/* Redacted Proposal */}
            {selectedRecord.has_pii && (
              <div>
                <div className="flex justify-between text-[10px] text-[#8C867B] mb-1">
                  <span>POLICY SANITIZED / REDACTED CORPUS</span>
                  <span>HASH: SHA256-4AA9</span>
                </div>
                <div className="bg-[#121110] border border-[#34302A] p-3 text-xs leading-relaxed text-[#D1C9BC]">
                  Spoke with OEM rep Hans (cell:{" "}
                  <span className="px-1 py-0.5 bg-[#22201D] border border-[#34302A] text-[#8C867B] font-bold">
                    [REDACTED_TELEPHONE_SEC4]
                  </span>
                  ) who confirmed clearance shims should be reduced to 0.45mm. Replaced drive-end bearing race SKF-7314; shaft runout reduced to 0.04mm.
                </div>
              </div>
            )}

            {/* Rationale & Audit Trigger */}
            <div>
              <div className="text-[10px] text-[#8C867B] uppercase mb-1">
                POLICY RATIONALE & AUDIT TRIGGER
              </div>
              <div className="bg-[#121110] border border-[#34302A] p-2.5 text-xs text-[#8C867B] leading-relaxed">
                {selectedRecord.rationale || "Evaluated by EdgeMind policy engine ruleset v1.4."}
              </div>
            </div>

            {/* Vector Provenance History */}
            <div className="border-t border-[#34302A] pt-3 text-[11px] space-y-1 text-[#8C867B]">
              <div className="text-[#F2EEE6] font-semibold text-[10px] uppercase">
                VECTOR PROVENANCE HISTORY
              </div>
              <div className="flex justify-between">
                <span>• v1.0 ({selectedRecord.updated_at})</span>
                <span>Captured by {selectedRecord.author}</span>
              </div>
              <div className="flex justify-between">
                <span>• v1.0-eval</span>
                <span>Classified {selectedRecord.policy.toUpperCase()} on-device</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-[#34302A] space-y-2">
              <button
                onClick={() => {
                  const updated = records.map((r) =>
                    r.id === selectedRecord.id ? { ...r, policy: "share" as const, sync_state: "queue_staged" as const } : r
                  );
                  setRecords(updated);
                  setSelectedRecord({ ...selectedRecord, policy: "share", sync_state: "queue_staged" });
                }}
                className="w-full py-2 bg-[#F5A524] text-[#1A1100] font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                FORCE SHARE (REDACTED)
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const updated = records.map((r) =>
                      r.id === selectedRecord.id ? { ...r, policy: "local_only" as const, sync_state: "local" as const } : r
                    );
                    setRecords(updated);
                    setSelectedRecord({ ...selectedRecord, policy: "local_only", sync_state: "local" });
                  }}
                  className="py-1.5 bg-[#22201D] border border-[#34302A] hover:border-[#8C867B] text-[#F2EEE6]"
                >
                  KEEP LOCAL
                </button>
                <button
                  onClick={() => {
                    const updated = records.map((r) =>
                      r.id === selectedRecord.id ? { ...r, policy: "hold" as const, sync_state: "queue_staged" as const } : r
                    );
                    setRecords(updated);
                    setSelectedRecord({ ...selectedRecord, policy: "hold", sync_state: "queue_staged" });
                  }}
                  className="py-1.5 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-[#F5A524]"
                >
                  HOLD FOR REVIEW
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
