import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Boru yalıtım malzemesi metrajı: hacim V = π/4·[(D + 2t)² − D²]·L,  dış (kaplama) yüzeyi A = π·(D + 2t)·L.
// Fire payı eklenir. Kalınlık ekonomik/yoğuşma gereksinimiyle ayrıca belirlenir (Yoğuşma Önleyici Yalıtım Kalınlığı).
export const boruYalitimMetrajiInputSchema = z.object({
  boruDisCapi_mm: z.number().positive(),
  yalitimKalinligi_mm: z.number().positive(),
  boruUzunlugu_m: z.number().positive(),
  fireYuzde: z.number().min(0).max(30),
});

export type BoruYalitimMetrajiInput = z.infer<typeof boruYalitimMetrajiInputSchema>;

export interface BoruYalitimMetrajiOutput {
  yalitimHacmi_m3: number;
}

function compute(input: BoruYalitimMetrajiInput): CalcResult<BoruYalitimMetrajiOutput> {
  const D = input.boruDisCapi_mm / 1000;
  const Dy = D + (2 * input.yalitimKalinligi_mm) / 1000;
  const hacim = (Math.PI / 4) * (Dy * Dy - D * D) * input.boruUzunlugu_m;
  const kPay = 1 + input.fireYuzde / 100;
  const yuzey = Math.PI * Dy * input.boruUzunlugu_m;
  return {
    value: { yalitimHacmi_m3: hacim * kPay },
    intermediates: {
      net_hacim_m3: hacim,
      dis_yuzey_alani_m2: yuzey,
      yalitim_dis_capi_mm: Dy * 1000,
      kaplama_alani_fireli_m2: yuzey * kPay,
      birim_uzunluk_hacmi_dm3_m: (hacim / input.boruUzunlugu_m) * 1000,
    },
    standardsUsed: [],
  };
}

export const boruYalitimMetraji: CalcModule<BoruYalitimMetrajiInput, BoruYalitimMetrajiOutput> = {
  id: "boru-yalitim-metraji",
  title: "Boru Yalıtımı Hacim ve Kaplama Metrajı",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruYalitimMetrajiInputSchema,
  compute,
};
