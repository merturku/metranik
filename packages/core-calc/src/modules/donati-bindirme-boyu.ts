import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1992-1-1 §8.7.3: l0 = α1·α2·α3·α5·α6·lb,rqd ≥ l0,min = max(0,3·α6·lb,rqd; 15φ; 200 mm).
// α6 = (ρ1/25)^0,5, 1 ≤ α6 ≤ 1,5 (ρ1: bindirme kesitinden 0,65·l0 uzaklıktaki içinde bindirilen çubukların toplam çubuğa oranı, %).
export const donatiBindirmeBoyuInputSchema = z.object({
  temelKenetlenmeBoyu_mm: z.number().positive(),
  capi_mm: z.number().positive(),
  bindirilenOrani_yuzde: z.number().min(0).max(100),
  digerKatsayilarCarpimi: z.number().positive(),
});
export type DonatiBindirmeBoyuInput = z.infer<typeof donatiBindirmeBoyuInputSchema>;
export interface DonatiBindirmeBoyuOutput {
  bindirmeBoyu_mm: number;
}

const STD = "TS EN 1992-1-1 §8.7.3 (Eş. 8.10, 8.11); kenetlenme boyu §8.4.4";

function compute(input: DonatiBindirmeBoyuInput): CalcResult<DonatiBindirmeBoyuOutput> {
  const a6 = Math.min(1.5, Math.max(1, Math.sqrt(input.bindirilenOrani_yuzde / 25)));
  const l0 = input.digerKatsayilarCarpimi * a6 * input.temelKenetlenmeBoyu_mm;
  const lmin = Math.max(0.3 * a6 * input.temelKenetlenmeBoyu_mm, 15 * input.capi_mm, 200);
  const l = Math.max(l0, lmin);
  return {
    value: { bindirmeBoyu_mm: l },
    intermediates: {
      alfa6: a6,
      hesaplanan_l0_mm: l0,
      asgari_l0min_mm: lmin,
      bindirme_boyu_cap_kati: l / input.capi_mm,
      asgari_belirleyici: l0 >= lmin ? "hesaplanan" : "asgari",
    },
    standardsUsed: [STD],
  };
}

export const donatiBindirmeBoyu: CalcModule<DonatiBindirmeBoyuInput, DonatiBindirmeBoyuOutput> = {
  id: "donati-bindirme-boyu",
  title: "Donatı Bindirme (Ek) Boyu",
  discipline: "insaat",
  standards: [STD],
  inputSchema: donatiBindirmeBoyuInputSchema,
  compute,
};
