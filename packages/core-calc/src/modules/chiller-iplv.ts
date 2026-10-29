import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Chiller kısmi yük ağırlıklı verimi — AHRI Standard 550/590 (IPLV):
// IPLV = 0,01·A + 0,42·B + 0,45·C + 0,12·D
// A, B, C, D = %100, %75, %50, %25 yükteki verim; COP/EER için doğrudan ağırlıklı ortalama alınır
// (kW/TR cinsinden ağırlıklı ortalama bu formülle bire bir aynı sonucu vermez, bu yüzden COP girilir).
// Dönüşümler: EER = 3,412·COP, kW/TR = 3,517/COP.
// Standart değerlendirme koşulları (SI, su soğutmalı): yoğuşturucu giriş suyu 29,4 / 23,9 / 18,3 / 18,3 °C.
const A_AGIRLIK = 0.01;
const B_AGIRLIK = 0.42;
const C_AGIRLIK = 0.45;
const D_AGIRLIK = 0.12;

export const chillerIplvInputSchema = z.object({
  cop100: z.number().positive(),
  cop75: z.number().positive(),
  cop50: z.number().positive(),
  cop25: z.number().positive(),
});

export type ChillerIplvInput = z.infer<typeof chillerIplvInputSchema>;

export interface ChillerIplvOutput {
  iplv_COP: number;
}

function compute(input: ChillerIplvInput): CalcResult<ChillerIplvOutput> {
  const iplv =
    A_AGIRLIK * input.cop100 + B_AGIRLIK * input.cop75 + C_AGIRLIK * input.cop50 + D_AGIRLIK * input.cop25;

  return {
    value: { iplv_COP: iplv },
    intermediates: {
      agirlik_toplami: A_AGIRLIK + B_AGIRLIK + C_AGIRLIK + D_AGIRLIK,
      iplv_EER: 3.412 * iplv,
      iplv_kW_per_TR: 3.517 / iplv,
      tam_yuk_COP: input.cop100,
      iplv_tam_yuk_orani: iplv / input.cop100,
    },
    standardsUsed: ["AHRI Std 550/590"],
  };
}

export const chillerIplv: CalcModule<ChillerIplvInput, ChillerIplvOutput> = {
  id: "chiller-iplv",
  title: "Chiller Kısmi Yük Verimi (IPLV)",
  discipline: "mekanik",
  standards: ["AHRI Std 550/590"],
  inputSchema: chillerIplvInputSchema,
  compute,
};
