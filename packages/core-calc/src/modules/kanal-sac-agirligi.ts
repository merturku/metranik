import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dikdörtgen hava kanalı sac alanı ve ağırlığı: A = 2(a + b)·L, m = A·t·ρ·(1 + fire), ρ_galvaniz sac ≈ 7850 kg/m³.
// Sac kalınlığı SMACNA/üretici tablosundan kanal boyutuna göre girilir; flanş, köşebent ve bağlantı elemanları dahil değildir.
export const kanalSacAgirligiInputSchema = z.object({
  genislik_mm: z.number().positive(),
  yukseklik_mm: z.number().positive(),
  uzunluk_m: z.number().positive(),
  sacKalinligi_mm: z.number().positive().max(5),
  fireYuzde: z.number().min(0).max(30),
});

export type KanalSacAgirligiInput = z.infer<typeof kanalSacAgirligiInputSchema>;

export interface KanalSacAgirligiOutput {
  agirlik_kg: number;
}

function compute(input: KanalSacAgirligiInput): CalcResult<KanalSacAgirligiOutput> {
  const alan = (2 * (input.genislik_mm + input.yukseklik_mm) / 1000) * input.uzunluk_m;
  const net = alan * (input.sacKalinligi_mm / 1000) * 7850;
  const brut = net * (1 + input.fireYuzde / 100);
  return {
    value: { agirlik_kg: brut },
    intermediates: {
      sac_alani_m2: alan,
      net_agirlik_kg: net,
      birim_uzunluk_agirligi_kgm: net / input.uzunluk_m,
      birim_alan_agirligi_kgm2: net / alan,
    },
    standardsUsed: ["SMACNA (sac kalınlığı girdisi)"],
  };
}

export const kanalSacAgirligi: CalcModule<KanalSacAgirligiInput, KanalSacAgirligiOutput> = {
  id: "kanal-sac-agirligi",
  title: "Hava Kanalı Sac Alanı ve Ağırlığı",
  discipline: "mekanik",
  standards: ["SMACNA"],
  inputSchema: kanalSacAgirligiInputSchema,
  compute,
};
