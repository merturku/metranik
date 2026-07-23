"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MODUL_GRUPLARI, grupBasinaModulSayisi } from "@/lib/modules";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-64 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border px-4 py-6">
      <Link
        href="/uygulama"
        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ${
          pathname === "/uygulama"
            ? "bg-accent/10 text-accent"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Kontrol Merkezi
      </Link>

      {MODUL_GRUPLARI.map((grup) => (
        <div key={grup.label}>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            {grup.label} · {grupBasinaModulSayisi(grup)}
          </p>
          <div className="mt-1 flex flex-col gap-2.5">
            {grup.subgroups.map((sg) => (
              <div key={sg.label}>
                {grup.subgroups.length > 1 && (
                  <p className="px-3 py-0.5 text-[10px] uppercase tracking-wide text-text-tertiary/70">
                    {sg.label}
                  </p>
                )}
                <div className="flex flex-col gap-0.5">
                  {sg.modules.map((m) => (
                    <Link
                      key={m.id}
                      href={m.href}
                      className={`rounded-lg px-3 py-1.5 text-sm transition-colors duration-300 ${
                        pathname === m.href
                          ? "bg-accent/10 text-accent"
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
        </div>
      ))}
    </nav>
  );
}
