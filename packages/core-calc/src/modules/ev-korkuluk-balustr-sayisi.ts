import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// n balüstr, (n+1) boşluk: n·w + (n+1)·g = L → g = (L − n·w)/(n+1) ≤ g_maks ⇒ n ≥ (L − g_maks)/(w + g_maks).
export const evKorkulukBalustrSayisiInputSchema = z
  .object({
    aciklik_m: z.number().positive(),
    balustrKalinligi_mm: z.number().positive(),
    azamiBosluk_mm: z.number().positive(),
  })
  .refine((v) => v.aciklik_m * 1000 > v.balustrKalinligi_mm, { message: "Açıklık balüstr kalınlığından büyük olmalı" });

export type EvKorkulukBalustrSayisiInput = z.infer<typeof evKorkulukBalustrSayisiInputSchema>;

export interface EvKorkulukBalustrSayisiOutput {
  balustrSayisi: number;
}

function compute(input: EvKorkulukBalustrSayisiInput): CalcResult<EvKorkulukBalustrSayisiOutput> {
  const L = input.aciklik_m * 1000;
  const w = input.balustrKalinligi_mm;
  const n = Math.max(0, Math.ceil((L - input.azamiBosluk_mm) / (w + input.azamiBosluk_mm) - 1e-9));
  const bosluk = (L - n * w) / (n + 1);
  return {
    value: { balustrSayisi: n },
    intermediates: { net_bosluk_mm: bosluk, balustr_aksi_mm: bosluk + w },
    standardsUsed: [],
  };
}

export const evKorkulukBalustrSayisi: CalcModule<EvKorkulukBalustrSayisiInput, EvKorkulukBalustrSayisiOutput> = {
  id: "ev-korkuluk-balustr-sayisi",
  title: "Korkuluk Dikme (Balüstr) Sayısı ve Boşluk",
  discipline: "ev",
  standards: [],
  inputSchema: evKorkulukBalustrSayisiInputSchema,
  compute,
};
