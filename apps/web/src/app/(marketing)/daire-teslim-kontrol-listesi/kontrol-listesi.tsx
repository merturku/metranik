"use client";

import { useEffect, useState } from "react";
import { TESLIM_LISTESI } from "@/lib/teslim-listesi";

const ANAHTAR = "metranik.teslim_listesi";

export function KontrolListesi() {
  const [isaretli, setIsaretli] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const ham = localStorage.getItem(ANAHTAR);
      if (ham) setIsaretli(JSON.parse(ham) as Record<string, boolean>);
    } catch {
      /* depolama yoksa liste yine çalışır */
    }
  }, []);

  function degistir(madde: string) {
    setIsaretli((o) => {
      const yeni = { ...o, [madde]: !o[madde] };
      try {
        localStorage.setItem(ANAHTAR, JSON.stringify(yeni));
      } catch {
        /* yoksay */
      }
      return yeni;
    });
  }

  function sifirla() {
    setIsaretli({});
    try {
      localStorage.removeItem(ANAHTAR);
    } catch {
      /* yoksay */
    }
  }

  const toplam = TESLIM_LISTESI.reduce((t, g) => t + g.maddeler.length, 0);
  const tamam = TESLIM_LISTESI.reduce((t, g) => t + g.maddeler.filter((m) => isaretli[m]).length, 0);

  return (
    <div>
      <div className="mt-6 flex items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-text-secondary" aria-live="polite">
          {tamam} / {toplam} madde kontrol edildi
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => window.print()} className="border border-border px-3 py-1.5 text-xs text-text-primary hover:border-accent-text">
            Yazdır / PDF
          </button>
          <button type="button" onClick={sifirla} className="border border-border px-3 py-1.5 text-xs text-text-secondary hover:border-accent-text">
            Sıfırla
          </button>
        </div>
      </div>

      {TESLIM_LISTESI.map((g) => (
        <section key={g.baslik} className="mt-8 break-inside-avoid">
          <h2 className="text-base font-semibold text-text-primary">{g.baslik}</h2>
          <ul className="mt-2 space-y-2">
            {g.maddeler.map((m) => (
              <li key={m}>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
                  <input type="checkbox" checked={!!isaretli[m]} onChange={() => degistir(m)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent)]" />
                  <span className={isaretli[m] ? "text-text-tertiary line-through" : ""}>{m}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
