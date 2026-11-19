import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Su darbesi dalga hızı (Korteweg/Joukowsky): a = √(K/ρ) / √(1 + (K/E)(D/e)c1)
// c1: ince cidarlı boru için mesnet/ankraj durumuna göre (Wylie & Streeter).
export const suDarbesiDalgaHiziInputSchema = z.object({
  hacimselModul_GPa: z.number().positive(),
  yogunluk_kgm3: z.number().positive(),
  borucapi_mm: z.number().positive(),
  etKalinligi_mm: z.number().positive(),
  elastisiteModulu_GPa: z.number().positive(),
  poisson: z.number().min(0).max(0.5),
  ankraj: z.enum(["tum", "genlesme", "serbest"]),
});

export type SuDarbesiDalgaHiziInput = z.infer<typeof suDarbesiDalgaHiziInputSchema>;
export interface SuDarbesiDalgaHiziOutput {
  dalgaHizi_ms: number;
}

function compute(input: SuDarbesiDalgaHiziInput): CalcResult<SuDarbesiDalgaHiziOutput> {
  const nu = input.poisson;
  const c1 = input.ankraj === "tum" ? 1 - nu * nu : input.ankraj === "genlesme" ? 1 - nu / 2 : 1.25 - nu;
  const K = input.hacimselModul_GPa * 1e9;
  const E = input.elastisiteModulu_GPa * 1e9;
  const a0 = Math.sqrt(K / input.yogunluk_kgm3);
  const De = input.borucapi_mm / input.etKalinligi_mm;
  const carpan = 1 + (K / E) * De * c1;
  const a = a0 / Math.sqrt(carpan);
  return {
    value: { dalgaHizi_ms: a },
    intermediates: {
      rijit_boru_dalga_hizi_ms: a0,
      c1_katsayisi: c1,
      D_e_orani: De,
      esneklik_carpani: carpan,
      uyari: De < 25 ? "D/e < 25: ince cidar varsayımı zayıf, sonuç yaklaşıktır" : "—",
    },
    standardsUsed: ["Korteweg / Joukowsky (Wylie & Streeter)"],
  };
}

export const suDarbesiDalgaHizi: CalcModule<SuDarbesiDalgaHiziInput, SuDarbesiDalgaHiziOutput> = {
  id: "su-darbesi-dalga-hizi",
  title: "Su Darbesi Basınç Dalgası Hızı",
  discipline: "mekanik",
  standards: ["Korteweg / Joukowsky (Wylie & Streeter)"],
  inputSchema: suDarbesiDalgaHiziInputSchema,
  compute,
};
