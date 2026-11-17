import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ACI 318-19 §6.6.4.5: ötelenmesiz kolonda moment büyütme. Pc = π²(EI)eff/(k·lu)², (EI)eff = 0,4EcIg/(1+βdns),
// δns = Cm/(1 − Pu/(0,75Pc)) ≥ 1,0. Pu ≥ 0,75Pc → kolon stabil değil (null).
export const kolonMomentBuyutmeKatsayisiInputSchema = z.object({
  pu_kN: z.number().min(0),
  ec_MPa: z.number().positive(),
  b_mm: z.number().positive(),
  h_mm: z.number().positive(),
  betaDns: z.number().min(0).max(1),
  k: z.number().min(0.5),
  lu_m: z.number().positive(),
  cm: z.number().min(0.4).max(1),
});

export type KolonMomentBuyutmeKatsayisiInput = z.infer<typeof kolonMomentBuyutmeKatsayisiInputSchema>;

export interface KolonMomentBuyutmeKatsayisiOutput {
  delta_ns: number | null;
}

function compute(input: KolonMomentBuyutmeKatsayisiInput): CalcResult<KolonMomentBuyutmeKatsayisiOutput> {
  const Ig = (input.b_mm * Math.pow(input.h_mm, 3)) / 12; // mm⁴
  const EI = (0.4 * input.ec_MPa * Ig) / (1 + input.betaDns); // N·mm²
  const luMm = input.lu_m * 1000;
  const PcN = (Math.PI * Math.PI * EI) / Math.pow(input.k * luMm, 2);
  const PcKN = PcN / 1000;
  const oran = input.pu_kN / (0.75 * PcKN);
  const stabil = oran < 1;
  const delta = stabil ? Math.max(1, input.cm / (1 - oran)) : null;
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (!stabil) {
    status = "uygunsuz";
    note = "Pu ≥ 0,75·Pc: kolon stabil değil, kesit büyütülmeli.";
  } else if (delta !== null && delta > 1.4) {
    status = "sinirda";
    note = "δns > 1,4: narinlik etkisi büyük, kesit artırımı düşünülmeli.";
  } else {
    status = "uygun";
    note = "Moment büyütme katsayısı makul düzeyde.";
  }
  return {
    value: { delta_ns: delta },
    intermediates: { Pc_kN: PcKN, EI_eff_kNm2: EI / 1e9, Pu_Pc_orani: oran },
    standardsUsed: ["ACI 318-19 §6.6.4.5"],
    verdict: { status, note },
  };
}

export const kolonMomentBuyutmeKatsayisi: CalcModule<KolonMomentBuyutmeKatsayisiInput, KolonMomentBuyutmeKatsayisiOutput> = {
  id: "kolon-moment-buyutme-katsayisi",
  title: "Kolon Moment Büyütme Katsayısı (Narinlik Etkisi)",
  discipline: "insaat",
  standards: ["ACI 318-19 §6.6.4.5"],
  inputSchema: kolonMomentBuyutmeKatsayisiInputSchema,
  compute,
};
