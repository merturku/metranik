import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60364-5-52 Ek G: u = b×(ρ×L/S×cosφ + λ×L×sinφ)×I, Δu% = 100×u/U0. Üç fazlı
// dengeli devre (b = 1, U0 = 230 V), cosφ = 1 ve reaktans ihmal (küçük kesitler
// için) varsayılır; ρ = 0,0175 Ω·mm²/m (bakır, 20 °C).
export const kabloDuşüşSchema = z.object({
  akım_A: z.number().positive(),
  uzunluk_m: z.number().positive(),
  kesit_mm2: z.number().positive(),
});

export type KabloDususInput = z.infer<typeof kabloDuşüşSchema>;

export interface KabloDususOutput {
  U_düşüş_V: number;
  U_düşüş_yuzde: number;
}

const BAKIR_OZDIRENCI_OHM_MM2_M = 0.0175;
const FAZ_NOTR_GERILIMI_V = 230;

function compute(input: KabloDususInput): CalcResult<KabloDususOutput> {
  const direncOhm = (BAKIR_OZDIRENCI_OHM_MM2_M * input.uzunluk_m) / input.kesit_mm2;
  const dususV = input.akım_A * direncOhm;

  return {
    value: { U_düşüş_V: dususV, U_düşüş_yuzde: (dususV / FAZ_NOTR_GERILIMI_V) * 100 },
    intermediates: { iletken_direnci_ohm: direncOhm },
    standardsUsed: ["IEC 60364-5-52"],
  };
}

export const kabloDuşüşKontrolu: CalcModule<KabloDususInput, KabloDususOutput> = {
  id: "kablo-gerilim-drop-kontrolu",
  title: "Kablo Gerilim Düşümü (ρ=0.0175)",
  discipline: "elektrik",
  standards: ["IEC 60364-5-52"],
  inputSchema: kabloDuşüşSchema,
  compute,
};
