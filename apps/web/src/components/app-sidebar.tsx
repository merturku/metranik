"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MODUL_GRUPLARI, grupBasinaModulSayisi } from "@/lib/modules";

export function AppSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(MODUL_GRUPLARI.map((g) => [g.label, false]))
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleGroup(label: string) {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-surface rounded-lg border border-border"
      >
        ☰
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`no-print fixed lg:relative w-64 h-full flex flex-col gap-4 overflow-y-auto border-r border-border px-4 py-6 z-40 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Link
          href="/uygulama"
          onClick={() => setSidebarOpen(false)}
          className={`rounded-lg px-3 py-2 text-body font-medium transition-colors duration-fast ${
            pathname === "/uygulama"
              ? "bg-accent/10 text-accent-text"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Kontrol Merkezi
        </Link>
        <Link
          href="/projelerim"
          onClick={() => setSidebarOpen(false)}
          className={`rounded-lg px-3 py-2 text-body font-medium transition-colors duration-fast ${
            pathname === "/projelerim"
              ? "bg-accent/10 text-accent-text"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Projelerim ★
        </Link>

        {MODUL_GRUPLARI.map((grup) => (
          <div key={grup.label}>
            <button
              onClick={() => toggleGroup(grup.label)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors duration-fast"
            >
              <span className="text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                {grup.label} · {grupBasinaModulSayisi(grup)}
              </span>
              <span className="text-text-tertiary text-lg leading-none">
                {expanded[grup.label] ? "−" : "+"}
              </span>
            </button>

            {expanded[grup.label] && (
              <div className="mt-1 ml-1 flex flex-col gap-2">
                {grup.subgroups.map((sg) => (
                  <div key={sg.label}>
                    {grup.subgroups.length > 1 && (
                      <p className="px-3 py-1 text-[10px] uppercase tracking-wide text-text-tertiary/70">
                        {sg.label}
                      </p>
                    )}
                    <div className="flex flex-col gap-0.5">
                      {sg.modules.map((m) => (
                        <Link
                          key={m.id}
                          href={m.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`rounded-lg px-3 py-1.5 text-body transition-colors duration-fast ${
                            pathname === m.href
                              ? "bg-accent/10 text-accent-text"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          {m.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
