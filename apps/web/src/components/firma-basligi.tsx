"use client";

import { useEffect, useState } from "react";
import { BOS_FIRMA, firmaGetir, firmaVarMi, type FirmaBilgisi } from "@/lib/firma";

/** Yalnız yazdırmada (PDF) görünen antet; firma bilgisi yoksa hiçbir şey çizmez. */
export function FirmaBasligi() {
  const [f, setF] = useState<FirmaBilgisi>(BOS_FIRMA);
  useEffect(() => setF(firmaGetir()), []);
  if (!firmaVarMi(f)) return null;
  return (
    <div className="print-only mb-4 flex items-center gap-4 border-b border-border pb-3">
      {f.logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={f.logo} alt="" className="h-12 w-auto max-w-[160px] object-contain" />
      )}
      <div className="text-caption text-text-secondary">
        {f.ad && <p className="text-body font-semibold text-text-primary">{f.ad}</p>}
        {f.adres && <p>{f.adres}</p>}
        {(f.telefon || f.eposta) && <p>{[f.telefon, f.eposta].filter(Boolean).join(" · ")}</p>}
      </div>
    </div>
  );
}
