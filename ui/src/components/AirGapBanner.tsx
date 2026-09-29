"use client";

import React from "react";
import { useDevice } from "./DeviceContext";
import { Radio, RefreshCw, Zap, ShieldCheck } from "lucide-react";

export function AirGapBanner() {
  const { device, linkState, toggleLink, simulateHandshake, isHandshaking } = useDevice();
  const isOffline = linkState === "offline";

  return (
    <div
      className={`w-full px-4 py-2 text-xs font-mono flex items-center justify-between border-b transition-colors select-none ${
        isOffline
          ? "bg-[#1A1917] border-[#34302A] text-[#8C867B]"
          : "bg-[#22201D] border-[#34302A] text-[#F2EEE6]"
      }`}
    >
      {/* Banner text */}
      <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {isOffline ? (
          <Zap className="w-4 h-4 text-[#8C867B] shrink-0" />
        ) : (
          <ShieldCheck className="w-4 h-4 text-[#F5A524] shrink-0" />
        )}
        <span className="tracking-wide">
          {isOffline ? (
            <span className="font-semibold text-[#8C867B]">
              ⚡ OFFLINE - 0 NETWORK CALLS • LOCAL CACHE ACTIVE • ON-DEVICE VECTOR STORE ({device.vectorChunks.toLocaleString()} CHUNKS) • QUEUED FLEET SYNC: 18 EVENTS
            </span>
          ) : (
            <span className="font-semibold text-[#F2EEE6]">
              ● ONLINE - PEER MESH REPLICATION ACTIVE • FAST-SYNC WAL COMMITS • LOCAL EMBEDDER VERIFIED (384-DIM)
            </span>
          )}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <button
          onClick={toggleLink}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border font-mono transition-colors ${
            isOffline
              ? "bg-[#121110] border-[#34302A] text-[#8C867B] hover:text-[#F2EEE6] hover:border-[#8C867B]"
              : "bg-[#121110] border-[#F5A524]/40 text-[#F5A524] hover:bg-[#F5A524]/10"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOffline ? "border border-[#8C867B]" : "bg-[#F5A524]"}`}></span>
          <span>{isOffline ? "LINK: OFFLINE (DISCONNECTED)" : "LINK: ONLINE (CONNECTED)"}</span>
        </button>

        <button
          onClick={simulateHandshake}
          disabled={isHandshaking}
          className="flex items-center gap-1 px-2.5 py-1 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-[#F2EEE6] text-xs font-mono disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-3 h-3 text-[#F5A524] ${isHandshaking ? "animate-spin" : ""}`} />
          <span>{isHandshaking ? "HANDSHAKING..." : "SIMULATE HANDSHAKE"}</span>
        </button>
      </div>
    </div>
  );
}
