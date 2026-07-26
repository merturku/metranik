import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60364-5-54 adyabatik formül: S = I·√t / k. I: hata akımı, t: kesme süresi,
// k: iletken/izolasyon malzemesine bağlı sabit (bakır+PVC için tipik 143).
export const topraklamaIletkeniKesitiInputSchema = z.object({
  hataAkimi_I_A: z.number().positive(),
  kesmeSuresi_t_s: z.number().positive(),
  malzemeKatsayisi_k: z.number().positive(),
});

export type TopraklamaIletkeniKesitiInput = z.infer<
  typeof topraklamaIletkeniKesitiInputSchema
>;

export interface TopraklamaIletkeniKesitiOutput {
  gerekliKesit_mm2: number;
}

function compute(
  input: TopraklamaIletkeniKesitiInput,
): CalcResult<TopraklamaIletkeniKesitiOutput> {
  const gerekliKesitMm2 =
    (input.hataAkimi_I_A * Math.sqrt(input.kesmeSuresi_t_s)) / input.malzemeKatsayisi_k;

  return {
    value: { gerekliKesit_mm2: gerekliKesitMm2 },
    intermediates: {
      malzemeKatsayisi_k: input.malzemeKatsayisi_k,
    },
    standardsUsed: ["IEC 60364-5-54"],
  };
}

export const topraklamaIletkeniKesiti: CalcModule<
  TopraklamaIletkeniKesitiInput,
  TopraklamaIletkeniKesitiOutput
> = {
  id: "topraklama-iletkeni-kesiti",
  title: "Topraklama İletkeni Kesiti (Adyabatik)",
  discipline: "elektrik",
  standards: ["IEC 60364-5-54"],
  inputSchema: topraklamaIletkeniKesitiInputSchema,
  compute,
};
