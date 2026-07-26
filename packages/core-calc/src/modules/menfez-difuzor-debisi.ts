import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Orifis/Bernoulli denklemi: Q = Cd·A·√(2·ΔP/ρ).
const HAVA_YOGUNLUGU_KG_M3 = 1.2;

export const menfezDifuzorDebisiInputSchema = z.object({
  menfezAlani_A_m2: z.number().positive(),
  debiKatsayisi_Cd: z.number().positive().max(1),
  basincFarki_dP_Pa: z.number().positive(),
});

export type MenfezDifuzorDebisiInput = z.infer<typeof menfezDifuzorDebisiInputSchema>;

export interface MenfezDifuzorDebisiOutput {
  debi_m3h: number;
}

function compute(input: MenfezDifuzorDebisiInput): CalcResult<MenfezDifuzorDebisiOutput> {
  const terminalHizMs = Math.sqrt((2 * input.basincFarki_dP_Pa) / HAVA_YOGUNLUGU_KG_M3);
  const debiM3s = input.debiKatsayisi_Cd * input.menfezAlani_A_m2 * terminalHizMs;

  return {
    value: { debi_m3h: debiM3s * 3600 },
    intermediates: {
      terminalHiz_ms: terminalHizMs,
      havaYogunlugu_kg_m3: HAVA_YOGUNLUGU_KG_M3,
    },
    standardsUsed: [],
  };
}

export const menfezDifuzorDebisi: CalcModule<
  MenfezDifuzorDebisiInput,
  MenfezDifuzorDebisiOutput
> = {
  id: "menfez-difuzor-debisi",
  title: "Menfez / Difüzör Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: menfezDifuzorDebisiInputSchema,
  compute,
};
