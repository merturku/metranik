import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Vana akış katsayısı (metrik Kv): Kv = Q × √(SG/ΔP).
// Q: debi (m³/h), SG: akışkanın özgül ağırlığı (suya göre), ΔP: vana üzerindeki basınç farkı (bar).
export const vanaKvDegeriInputSchema = z.object({
  debi_Q_m3h: z.number().positive(),
  ozgulAgirlik_SG: z.number().positive(),
  basincFarki_dP_bar: z.number().positive(),
});

export type VanaKvDegeriInput = z.infer<typeof vanaKvDegeriInputSchema>;

export interface VanaKvDegeriOutput {
  kv: number;
}

function compute(input: VanaKvDegeriInput): CalcResult<VanaKvDegeriOutput> {
  const kv = input.debi_Q_m3h * Math.sqrt(input.ozgulAgirlik_SG / input.basincFarki_dP_bar);

  return {
    value: { kv },
    intermediates: {
      ozgulAgirlik_SG: input.ozgulAgirlik_SG,
    },
    standardsUsed: [],
  };
}

export const vanaKvDegeri: CalcModule<VanaKvDegeriInput, VanaKvDegeriOutput> = {
  id: "vana-kv-degeri",
  title: "Vana Akış Katsayısı (Kv)",
  discipline: "mekanik",
  standards: [],
  inputSchema: vanaKvDegeriInputSchema,
  compute,
};
