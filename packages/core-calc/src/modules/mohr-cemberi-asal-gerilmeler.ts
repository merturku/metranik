import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Düzlem gerilme durumunda Mohr çemberi: σ1,2 = (σx+σy)/2 ± R,  R = √(((σx−σy)/2)² + τxy²),
// asal düzlem açısı θp = ½·atan2(2τxy, σx−σy),  τmaks = R,  von Mises σvm = √(σ1² − σ1σ2 + σ2²).
// Klasik malzeme mukavemeti (ör. Beer & Johnston, Mechanics of Materials). Gerilmeler aynı birimde (MPa) girilir; çekme +.
export const mohrCemberiAsalGerilmelerInputSchema = z.object({
  sigmaX_MPa: z.number().finite(),
  sigmaY_MPa: z.number().finite(),
  tauXY_MPa: z.number().finite(),
});

export type MohrCemberiAsalGerilmelerInput = z.infer<typeof mohrCemberiAsalGerilmelerInputSchema>;

export interface MohrCemberiAsalGerilmelerOutput {
  sigma1_MPa: number;
}

function compute(input: MohrCemberiAsalGerilmelerInput): CalcResult<MohrCemberiAsalGerilmelerOutput> {
  const { sigmaX_MPa: sx, sigmaY_MPa: sy, tauXY_MPa: t } = input;
  const ort = (sx + sy) / 2;
  const r = Math.hypot((sx - sy) / 2, t);
  const s1 = ort + r;
  const s2 = ort - r;
  const thetaP = 0.5 * Math.atan2(2 * t, sx - sy);
  return {
    value: { sigma1_MPa: s1 },
    intermediates: {
      sigma2_MPa: s2,
      ortalama_gerilme_MPa: ort,
      cember_yaricapi_tau_maks_MPa: r,
      asal_duzlem_acisi_derece: (thetaP * 180) / Math.PI,
      von_mises_MPa: Math.sqrt(s1 * s1 - s1 * s2 + s2 * s2),
    },
    standardsUsed: ["Mohr çemberi (düzlem gerilme dönüşümü)"],
  };
}

export const mohrCemberiAsalGerilmeler: CalcModule<MohrCemberiAsalGerilmelerInput, MohrCemberiAsalGerilmelerOutput> = {
  id: "mohr-cemberi-asal-gerilmeler",
  title: "Mohr Çemberi: Asal Gerilmeler ve Maksimum Kayma",
  discipline: "insaat",
  standards: [],
  inputSchema: mohrCemberiAsalGerilmelerInputSchema,
  compute,
};
