import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Terzaghi tek boyutlu konsolidasyon formülü:
// Δh = (Cc·H)/(1+e0) × log10((σ0+Δσ)/σ0).
export const zeminKonsolidasyonOturmasiInputSchema = z.object({
  sikismaKatsayisi_Cc: z.number().positive(),
  tabakaKalinligi_H_m: z.number().positive(),
  ilkBosluklOrani_e0: z.number().positive(),
  ilkGerilme_sigma0_kPa: z.number().positive(),
  ekGerilme_dsigma_kPa: z.number().positive(),
});

export type ZeminKonsolidasyonOturmasiInput = z.infer<
  typeof zeminKonsolidasyonOturmasiInputSchema
>;

export interface ZeminKonsolidasyonOturmasiOutput {
  oturma_mm: number;
}

function compute(
  input: ZeminKonsolidasyonOturmasiInput,
): CalcResult<ZeminKonsolidasyonOturmasiOutput> {
  const oturmaM =
    (input.sikismaKatsayisi_Cc * input.tabakaKalinligi_H_m) /
    (1 + input.ilkBosluklOrani_e0) *
    Math.log10(
      (input.ilkGerilme_sigma0_kPa + input.ekGerilme_dsigma_kPa) / input.ilkGerilme_sigma0_kPa,
    );

  return {
    value: { oturma_mm: oturmaM * 1000 },
    intermediates: {
      gerilmeOrani: (input.ilkGerilme_sigma0_kPa + input.ekGerilme_dsigma_kPa) / input.ilkGerilme_sigma0_kPa,
    },
    standardsUsed: ["Terzaghi Konsolidasyon Teorisi"],
  };
}

export const zeminKonsolidasyonOturmasi: CalcModule<
  ZeminKonsolidasyonOturmasiInput,
  ZeminKonsolidasyonOturmasiOutput
> = {
  id: "zemin-konsolidasyon-oturmasi",
  title: "Zemin Konsolidasyon Oturması",
  discipline: "insaat",
  standards: ["Terzaghi Konsolidasyon Teorisi"],
  inputSchema: zeminKonsolidasyonOturmasiInputSchema,
  compute,
};
