import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji korunumu: Q = ṁ · cp · ΔT. Suyun özgül ısısı ve yoğunluğu fiziksel
// sabitlerdir (bir standart tablosundan alınmadı, bu yüzden yer tutucu değildir).
const OZGUL_ISI_KJ_KGK = 4.186;
const YOGUNLUK_KG_M3 = 1000;

export const hidronikSuDebisiInputSchema = z.object({
  isiYuku: z.number().positive(),
  deltaT: z.number().positive(),
});

export type HidronikSuDebisiInput = z.infer<typeof hidronikSuDebisiInputSchema>;

export interface HidronikSuDebisiOutput {
  debi_m3h: number;
  debi_ls: number;
}

function compute(input: HidronikSuDebisiInput): CalcResult<HidronikSuDebisiOutput> {
  const kutleselDebiKgS = (input.isiYuku / (OZGUL_ISI_KJ_KGK * input.deltaT)) * 1;
  const debiLs = kutleselDebiKgS / (YOGUNLUK_KG_M3 / 1000);
  const debiM3h = debiLs * 3.6;

  return {
    value: { debi_m3h: debiM3h, debi_ls: debiLs },
    intermediates: {
      kutleselDebi_kg_s: kutleselDebiKgS,
      ozgulIsi_kJ_kgK: OZGUL_ISI_KJ_KGK,
      yogunluk_kg_m3: YOGUNLUK_KG_M3,
    },
    standardsUsed: [],
  };
}

export const hidronikSuDebisi: CalcModule<HidronikSuDebisiInput, HidronikSuDebisiOutput> = {
  id: "hidronik-su-debisi",
  title: "Hidronik Su Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: hidronikSuDebisiInputSchema,
  compute,
};
