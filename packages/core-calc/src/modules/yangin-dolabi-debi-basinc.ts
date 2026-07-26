import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Lüle (nozul) debisi, orifis/Bernoulli denklemiyle: Q = Cd·A·√(2·ΔP/ρ).
// TS 9811 uyarınca yangın dolabı hattında en olumsuz noktada asgari debi sağlanmalı.
const SU_YOGUNLUGU_KG_M3 = 1000;

export const yanginDolabiDebiBasincInputSchema = z.object({
  luleCapi_mm: z.number().positive(),
  basinc_bar: z.number().positive(),
  debiKatsayisi_Cd: z.number().positive().max(1),
  izinVerilenMinimumDebi_Lmin: z.number().positive(),
});

export type YanginDolabiDebiBasincInput = z.infer<typeof yanginDolabiDebiBasincInputSchema>;

export interface YanginDolabiDebiBasincOutput {
  debi_Lmin: number;
}

function compute(input: YanginDolabiDebiBasincInput): CalcResult<YanginDolabiDebiBasincOutput> {
  const alanM2 = (Math.PI / 4) * (input.luleCapi_mm / 1000) ** 2;
  const basincFarkiPa = input.basinc_bar * 1e5;
  const debiM3s =
    input.debiKatsayisi_Cd * alanM2 * Math.sqrt((2 * basincFarkiPa) / SU_YOGUNLUGU_KG_M3);
  const debiLmin = debiM3s * 1000 * 60;
  const marjLmin = debiLmin - input.izinVerilenMinimumDebi_Lmin;
  const uygun = marjLmin >= 0;

  return {
    value: { debi_Lmin: debiLmin },
    intermediates: {
      luleAlani_m2: alanM2,
      izinVerilenMinimumDebi_Lmin: input.izinVerilenMinimumDebi_Lmin,
      marj_Lmin: marjLmin,
    },
    standardsUsed: ["TS 9811"],
    verdict: uygun
      ? { status: "uygun", note: "Debi, asgari gerekli değerin üzerinde." }
      : { status: "uygunsuz", note: "Debi, asgari gerekli değerin altında." },
  };
}

export const yanginDolabiDebiBasinc: CalcModule<
  YanginDolabiDebiBasincInput,
  YanginDolabiDebiBasincOutput
> = {
  id: "yangin-dolabi-debi-basinc",
  title: "Yangın Dolabı Debi/Basınç",
  discipline: "mekanik",
  standards: ["TS 9811"],
  inputSchema: yanginDolabiDebiBasincInputSchema,
  compute,
};
