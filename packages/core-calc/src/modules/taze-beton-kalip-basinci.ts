import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ACI 347 (metrik): Pmax = min(ρ·H, Cw·Cc·(7.2 + 785·R/(T+17.8))).
// Hidrostatik basınç ile kimyasal/dökme hızına bağlı ampirik formülün küçüğü esas alınır.
export const tazeBetonKalipBasinciInputSchema = z.object({
  betonBirimAgirlik_kNm3: z.number().positive(),
  kalipYuksekligi_m: z.number().positive(),
  birimAgirlikKatsayisi_Cw: z.number().positive(),
  katkiKatsayisi_Cc: z.number().positive(),
  dokmeHizi_R_mh: z.number().positive(),
  betonSicakligi_T_C: z.number(),
});

export type TazeBetonKalipBasinciInput = z.infer<typeof tazeBetonKalipBasinciInputSchema>;

export interface TazeBetonKalipBasinciOutput {
  tasarimBasinci_kPa: number;
}

function compute(input: TazeBetonKalipBasinciInput): CalcResult<TazeBetonKalipBasinciOutput> {
  const hidrostatikKPa = input.betonBirimAgirlik_kNm3 * input.kalipYuksekligi_m;
  const aciKPa =
    input.birimAgirlikKatsayisi_Cw *
    input.katkiKatsayisi_Cc *
    (7.2 + (785 * input.dokmeHizi_R_mh) / (input.betonSicakligi_T_C + 17.8));
  const tasarimBasinciKPa = Math.min(hidrostatikKPa, aciKPa);

  return {
    value: { tasarimBasinci_kPa: tasarimBasinciKPa },
    intermediates: {
      hidrostatikBasinc_kPa: hidrostatikKPa,
      aciFormulBasinci_kPa: aciKPa,
    },
    standardsUsed: ["ACI 347", "TS EN 12812"],
  };
}

export const tazeBetonKalipBasinci: CalcModule<
  TazeBetonKalipBasinciInput,
  TazeBetonKalipBasinciOutput
> = {
  id: "taze-beton-kalip-basinci",
  title: "Taze Beton Kalıp Basıncı",
  discipline: "insaat",
  standards: ["ACI 347", "TS EN 12812"],
  inputSchema: tazeBetonKalipBasinciInputSchema,
  compute,
};
