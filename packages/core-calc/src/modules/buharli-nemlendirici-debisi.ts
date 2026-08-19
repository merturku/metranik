import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Buharlı nemlendirici debisi: kütle dengesi ile hava akımının nem oranını
// hedef değere çıkarmak için gerekli buhar debisi.
// ṁbuhar = ṁhava × (w2 - w1). w: özgül nem (kg su buharı / kg kuru hava).
export const buharliNemlendiriciDebisiInputSchema = z.object({
  havaKutleselDebisi_m_kgh: z.number().positive(),
  girisNemOrani_w1_kgkg: z.number().nonnegative(),
  hedefNemOrani_w2_kgkg: z.number().nonnegative(),
});

export type BuharliNemlendiriciDebisiInput = z.infer<
  typeof buharliNemlendiriciDebisiInputSchema
>;

export interface BuharliNemlendiriciDebisiOutput {
  buharDebisi_kgh: number;
}

function compute(
  input: BuharliNemlendiriciDebisiInput,
): CalcResult<BuharliNemlendiriciDebisiOutput> {
  const nemFarkiKgKg = input.hedefNemOrani_w2_kgkg - input.girisNemOrani_w1_kgkg;
  const buharDebisiKgh = input.havaKutleselDebisi_m_kgh * nemFarkiKgKg;

  return {
    value: { buharDebisi_kgh: buharDebisiKgh },
    intermediates: {
      nemFarki_kgkg: nemFarkiKgKg,
    },
    standardsUsed: [],
  };
}

export const buharliNemlendiriciDebisi: CalcModule<
  BuharliNemlendiriciDebisiInput,
  BuharliNemlendiriciDebisiOutput
> = {
  id: "buharli-nemlendirici-debisi",
  title: "Buharlı Nemlendirici Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: buharliNemlendiriciDebisiInputSchema,
  compute,
};
