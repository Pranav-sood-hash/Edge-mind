"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDevice } from "./DeviceContext";
import { Search, Database, RefreshCw, GitBranch, ClipboardList, Cloud } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { device } = useDevice();

  const navItems = [
    {
      name: "Search Playground",
      href: `/device/${device.id}`,
      icon: Search,
      exact: true,
    },
    {
      name: "Local Memory",
      href: `/device/${device.id}/memory`,
      icon: Database,
      badge: "1,402",
    },
    {
      name: "Sync Center",
      href: `/device/${device.id}/sync`,
      icon: RefreshCw,
      badge: "Q: 18",
    },
    {
      name: "Conflicts",
      href: `/device/${device.id}/conflicts`,
      icon: GitBranch,
      badge: "3",
      badgeColor: "amber",
    },
    {
      name: "Activity & Audit",
      href: `/device/${device.id}/activity`,
      icon: ClipboardList,
    },
    {
      name: "Cloud Console",
      href: `/cloud`,
      icon: Cloud,
      badge: "CENTRAL",
      badgeOutline: true,
    },
  ];

  return (
    <aside className="w-60 shrink-0 bg-[#1A1917] border-r border-[#34302A] flex flex-col justify-between select-none h-[calc(100vh-64px)]">
      {/* Navigation list */}
      <div className="p-3">
        <div className="px-3 py-2 text-[10px] font-mono text-[#8C867B] uppercase tracking-wider">
          CONSOLE NAVIGATION
        </div>

        <nav className="flex flex-col gap-1 mt-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 text-xs font-mono transition-colors border ${
                  isActive
                    ? "bg-[#22201D] border-[#F5A524] text-[#F2EEE6]"
                    : "border-transparent text-[#8C867B] hover:text-[#F2EEE6] hover:bg-[#22201D]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#F5A524]" : "text-[#8C867B]"}`} />
                  <span className="font-medium">{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 font-mono ${
                      item.badgeColor === "amber"
                        ? "bg-[#F5A524] text-[#1A1100] font-bold"
                        : item.badgeOutline
                        ? "border border-[#F5A524]/60 text-[#F5A524]"
                        : "bg-[#22201D] text-[#8C867B] border border-[#34302A]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom local engine card */}
      <div className="p-3 border-t border-[#34302A] bg-[#121110]">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F5A524]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]"></span>
          <span className="font-semibold tracking-wide uppercase">LOCAL ENGINE ACTIVE</span>
        </div>
        <div className="mt-1 font-mono font-bold text-xs text-[#F2EEE6]">EdgeLLM-7B-Q4</div>
        <div className="mt-0.5 text-[10px] font-mono text-[#8C867B]">
          100% ON-DEVICE • PUMP-DIAG-V3
        </div>
      </div>
    </aside>
  );
}
