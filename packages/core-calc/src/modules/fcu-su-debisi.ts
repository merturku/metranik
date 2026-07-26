import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: Q = ṁ·cp·ΔT → ṁ = Q/(cp·ΔT). Su özgül ısısı cp=4.186 kJ/kgK,
// yoğunluğu ~1 kg/L kabulüyle kütlesel debi hacimsel debiye eşitlenir.
const SU_OZGUL_ISI_KJ_KGK = 4.186;

export const fcuSuDebisiInputSchema = z.object({
  isilYuk_Q_kW: z.number().positive(),
  suSicaklikFarki_dT_C: z.number().positive(),
});

export type FcuSuDebisiInput = z.infer<typeof fcuSuDebisiInputSchema>;

export interface FcuSuDebisiOutput {
  suDebisi_Ls: number;
}

function compute(input: FcuSuDebisiInput): CalcResult<FcuSuDebisiOutput> {
  const suDebisiLs = input.isilYuk_Q_kW / (SU_OZGUL_ISI_KJ_KGK * input.suSicaklikFarki_dT_C);

  return {
    value: { suDebisi_Ls: suDebisiLs },
    intermediates: {
      suOzgulIsi_kJ_kgK: SU_OZGUL_ISI_KJ_KGK,
    },
    standardsUsed: [],
  };
}

export const fcuSuDebisi: CalcModule<FcuSuDebisiInput, FcuSuDebisiOutput> = {
  id: "fcu-su-debisi",
  title: "FCU Su Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: fcuSuDebisiInputSchema,
  compute,
};
