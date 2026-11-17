import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Branson: Ie = (Mcr/Ma)³·Ig + [1 − (Mcr/Ma)³]·Icr ≤ Ig. Ma ≤ Mcr → Ie = Ig.
export const bransonEtkinAtaletMomentiInputSchema = z
  .object({
    mcr_kNm: z.number().positive(),
    ma_kNm: z.number().positive(),
    ig_mm4: z.number().positive(),
    icr_mm4: z.number().positive(),
  })
  .refine((v) => v.icr_mm4 <= v.ig_mm4, { message: "Icr ≤ Ig olmalı" });

export type BransonEtkinAtaletMomentiInput = z.infer<typeof bransonEtkinAtaletMomentiInputSchema>;

export interface BransonEtkinAtaletMomentiOutput {
  ie_mm4: number;
}

function compute(input: BransonEtkinAtaletMomentiInput): CalcResult<BransonEtkinAtaletMomentiOutput> {
  const oran = input.mcr_kNm / input.ma_kNm;
  const cekirdek = Math.pow(oran, 3);
  const catlamamis = oran >= 1;
  const ie = catlamamis ? input.ig_mm4 : Math.min(input.ig_mm4, cekirdek * input.ig_mm4 + (1 - cekirdek) * input.icr_mm4);
  return {
    value: { ie_mm4: ie },
    intermediates: { mcr_ma_orani: oran, ie_ig_orani: ie / input.ig_mm4, durum: catlamamis ? "Çatlamamış (Ma ≤ Mcr)" : "Çatlamış" },
    standardsUsed: ["ACI 318-19 §24.2.3.5 (Branson denklemi)"],
  };
}

export const bransonEtkinAtaletMomenti: CalcModule<BransonEtkinAtaletMomentiInput, BransonEtkinAtaletMomentiOutput> = {
  id: "branson-etkin-atalet-momenti",
  title: "Branson Etkin Atalet Momenti (Çatlamış Kesit)",
  discipline: "insaat",
  standards: ["ACI 318-19 §24.2.3.5"],
  inputSchema: bransonEtkinAtaletMomentiInputSchema,
  compute,
};
