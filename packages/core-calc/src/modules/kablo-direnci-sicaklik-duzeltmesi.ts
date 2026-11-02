import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İletken DC direnci ve sıcaklık düzeltmesi (IEC 60228 / IEC 60287):
// R20 = ρ20·L/A  (ρ20: Cu 0,017241, Al 0,028264 Ω·mm²/m);  R_T = R20·[1 + α20·(T − 20)]  (α20: Cu 0,00393, Al 0,00403 1/K).
// AC direnci için deri/yakınlık etkisi bu modülde yoktur (büyük kesitlerde R_ac > R_dc).
export const kabloDirenciSicaklikDuzeltmesiInputSchema = z.object({
  kesit_mm2: z.number().positive(),
  uzunluk_m: z.number().positive(),
  malzeme: z.enum(["bakir", "aluminyum"]),
  iletkenSicakligi_C: z.number().min(-40).max(250),
});

export type KabloDirenciSicaklikDuzeltmesiInput = z.infer<typeof kabloDirenciSicaklikDuzeltmesiInputSchema>;

export interface KabloDirenciSicaklikDuzeltmesiOutput {
  direnc_ohm: number;
}

const MALZEME = {
  bakir: { rho: 0.017241, alfa: 0.00393 },
  aluminyum: { rho: 0.028264, alfa: 0.00403 },
} as const;

function compute(input: KabloDirenciSicaklikDuzeltmesiInput): CalcResult<KabloDirenciSicaklikDuzeltmesiOutput> {
  const m = MALZEME[input.malzeme];
  const r20 = (m.rho * input.uzunluk_m) / input.kesit_mm2;
  const carpan = 1 + m.alfa * (input.iletkenSicakligi_C - 20);
  const rT = r20 * carpan;
  return {
    value: { direnc_ohm: rT },
    intermediates: {
      R20_ohm: r20,
      sicaklik_carpani: carpan,
      direnc_ohm_km: (rT / input.uzunluk_m) * 1000,
      R20_ohm_km: (r20 / input.uzunluk_m) * 1000,
    },
    standardsUsed: ["IEC 60228", "IEC 60287"],
  };
}

export const kabloDirenciSicaklikDuzeltmesi: CalcModule<KabloDirenciSicaklikDuzeltmesiInput, KabloDirenciSicaklikDuzeltmesiOutput> = {
  id: "kablo-direnci-sicaklik-duzeltmesi",
  title: "Kablo İletken Direnci ve Sıcaklık Düzeltmesi",
  discipline: "elektrik",
  standards: ["IEC 60228", "IEC 60287"],
  inputSchema: kabloDirenciSicaklikDuzeltmesiInputSchema,
  compute,
};
