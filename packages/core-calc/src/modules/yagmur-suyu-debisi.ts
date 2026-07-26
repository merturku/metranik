import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Rasyonel yöntem (metrik): Q(L/s) = 2.778 × C × I × A.
// C: akış katsayısı (yüzey geçirgenliğine göre), I: yağış şiddeti (mm/h), A: alan (ha).
const RASYONEL_KATSAYI = 2.778;

export const yagmurSuyuDebisiInputSchema = z.object({
  akisKatsayisi_C: z.number().positive().max(1),
  yagisSiddeti_I_mmh: z.number().positive(),
  alan_A_ha: z.number().positive(),
});

export type YagmurSuyuDebisiInput = z.infer<typeof yagmurSuyuDebisiInputSchema>;

export interface YagmurSuyuDebisiOutput {
  debi_Ls: number;
}

function compute(input: YagmurSuyuDebisiInput): CalcResult<YagmurSuyuDebisiOutput> {
  const debiLs =
    RASYONEL_KATSAYI * input.akisKatsayisi_C * input.yagisSiddeti_I_mmh * input.alan_A_ha;

  return {
    value: { debi_Ls: debiLs },
    intermediates: {
      rasyonelKatsayi: RASYONEL_KATSAYI,
    },
    standardsUsed: ["Rasyonel Yöntem"],
  };
}

export const yagmurSuyuDebisi: CalcModule<YagmurSuyuDebisiInput, YagmurSuyuDebisiOutput> = {
  id: "yagmur-suyu-debisi",
  title: "Yağmur Suyu Debisi (Rasyonel Yöntem)",
  discipline: "mekanik",
  standards: ["Rasyonel Yöntem"],
  inputSchema: yagmurSuyuDebisiInputSchema,
  compute,
};
