import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ağırlık = hacim × birim hacim ağırlığı. TS EN 206'ya göre normal beton kuru
// birim hacim ağırlığı 2000-2600 kg/m³ aralığındadır (donatılı beton için ~2500).
export const betonAğirlikSchema = z.object({
  hacim_m3: z.number().positive(),
  yoğunluk_kgm3: z.number().positive(),
});

export type BetonAgirlikInput = z.infer<typeof betonAğirlikSchema>;

export interface BetonAgirlikOutput {
  agirlik_ton: number;
}

function compute(input: BetonAgirlikInput): CalcResult<BetonAgirlikOutput> {
  const agirlikKg = input.hacim_m3 * input.yoğunluk_kgm3;

  return {
    value: { agirlik_ton: agirlikKg / 1000 },
    intermediates: { agirlik_kg: agirlikKg, yogunluk_kgm3: input.yoğunluk_kgm3 },
    standardsUsed: ["TS EN 206"],
  };
}

export const betonAğirlikHesabi: CalcModule<BetonAgirlikInput, BetonAgirlikOutput> = {
  id: "insaat-beton-agirlik-hesabi",
  title: "Beton Ağırlık Hesabı",
  discipline: "insaat",
  standards: ["TS EN 206"],
  inputSchema: betonAğirlikSchema,
  compute,
};
