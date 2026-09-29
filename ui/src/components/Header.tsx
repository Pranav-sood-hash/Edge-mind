"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useDevice } from "./DeviceContext";
import { DEVICES } from "../lib/devices";
import { Database, RefreshCw, Zap, ChevronDown, User, ShieldAlert, Cpu } from "lucide-react";

export function Header({ isCloud = false }: { isCloud?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const { device, setDeviceId, linkState, toggleLink } = useDevice();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isOffline = linkState === "offline";

  return (
    <header className="h-16 bg-[#1A1917] border-b border-[#34302A] px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left side: Logo, Device Select, Status Pill */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link href={`/device/${device.id}`} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#22201D] border border-[#F5A524] flex items-center justify-center text-[#F5A524] font-black text-sm tracking-tighter">
            <div className="flex flex-col gap-0.5 items-center">
              <span className="w-4 h-0.5 bg-[#F5A524]"></span>
              <span className="w-3 h-0.5 bg-[#F5A524]"></span>
              <span className="w-4 h-0.5 bg-[#F5A524]"></span>
            </div>
          </div>
          <span className="font-bold tracking-widest text-[#F2EEE6] text-base font-mono">EDGEMIND</span>
        </Link>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-[#34302A]"></div>

        {/* Device Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#22201D] border border-[#34302A] hover:border-[#F5A524] text-xs font-mono text-[#F2EEE6] transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-[#F5A524]" />
            <span>{isCloud ? "Fleet Central Hub" : device.name}</span>
            <ChevronDown className="w-3 h-3 text-[#8C867B] ml-1" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-[#1A1917] border border-[#34302A] shadow-none z-50 py-1">
              <div className="px-3 py-1 text-[10px] font-mono text-[#8C867B] uppercase tracking-wider">
                Select Active Node
              </div>
              {Object.values(DEVICES).map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDeviceId(d.id);
                    setDropdownOpen(false);
                    router.push(`/device/${d.id}`);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center justify-between hover:bg-[#22201D] transition-colors ${
                    !isCloud && device.id === d.id ? "text-[#F5A524] bg-[#22201D]" : "text-[#F2EEE6]"
                  }`}
                >
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-[10px] text-[#8C867B]">{d.role}</div>
                  </div>
                  <span className="text-[10px] text-[#8C867B] border border-[#34302A] px-1 py-0.5">:{d.port}</span>
                </button>
              ))}
              <div className="h-px bg-[#34302A] my-1"></div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/cloud");
                }}
                className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center justify-between hover:bg-[#22201D] transition-colors ${
                  isCloud ? "text-[#F5A524] bg-[#22201D]" : "text-[#F2EEE6]"
                }`}
              >
                <div>
                  <div className="font-medium">Fleet Central Control Plane</div>
                  <div className="text-[10px] text-[#8C867B]">Meera S. • Port 8000</div>
                </div>
                <span className="text-[10px] text-[#F5A524] border border-[#F5A524]/40 px-1 py-0.5">HUB</span>
              </button>
            </div>
          )}
        </div>

        {/* Online / Offline status badge pill */}
        <button
          onClick={toggleLink}
          title="Click to toggle link state"
          className={`flex items-center gap-1.5 px-3 py-1 badge-pill text-xs font-mono transition-colors border ${
            isOffline
              ? "bg-[#22201D] text-[#8C867B] border-[#8C867B]/40 hover:border-[#8C867B]"
              : "bg-[#F5A524]/10 text-[#F5A524] border-[#F5A524]/30 hover:border-[#F5A524]"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOffline ? "bg-[#8C867B]" : "bg-[#F5A524] animate-pulse"}`}></span>
          <span>{isOffline ? "OFFLINE (AIR-GAPPED)" : "ONLINE / 14 PEERS"}</span>
        </button>
      </div>

      {/* Right side: Telemetry stats, User info, Quick navs */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#F2EEE6]">
        {/* Sync state */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#22201D] border border-[#34302A]">
          <RefreshCw className="w-3.5 h-3.5 text-[#F5A524]" />
          <span>Sync: {isOffline ? "Held" : "Active"}</span>
        </div>

        {/* Storage */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#22201D] border border-[#34302A]">
          <Database className="w-3.5 h-3.5 text-[#8C867B]" />
          <span>Storage: {device.storageUsed} / {device.storageTotal}</span>
        </div>

        {/* RTT */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#22201D] border border-[#34302A]">
          <Zap className="w-3.5 h-3.5 text-[#F5A524]" />
          <span>RTT: {isOffline ? "0ms" : `${device.rttMs}ms`}</span>
        </div>

        {/* Benchmark Proof Link */}
        <Link
          href="/eval"
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#22201D] border border-[#F5A524]/40 hover:border-[#F5A524] text-[#F5A524] transition-colors"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="font-bold">EVAL-BENCH</span>
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#34302A]">
          <div className="text-right leading-tight">
            <div className="font-medium text-[#F2EEE6]">{isCloud ? "Meera S." : device.techName}</div>
            <div className="text-[10px] text-[#8C867B]">{isCloud ? "RELIABILITY LEAD • FLEET" : `TECH ID: ${device.techId}`}</div>
          </div>
          <div className="w-8 h-8 bg-[#22201D] border border-[#34302A] flex items-center justify-center text-[#F5A524]">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
