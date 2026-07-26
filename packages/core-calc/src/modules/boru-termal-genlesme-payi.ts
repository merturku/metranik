import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Doğrusal termal genleşme: ΔL = α × L × ΔT.
export const boruTermalGenlesmePayiInputSchema = z.object({
  genlesmeKatsayisi_alpha_mmMK: z.number().positive(),
  boruUzunlugu_L_m: z.number().positive(),
  sicaklikFarki_dT_C: z.number().positive(),
});

export type BoruTermalGenlesmePayiInput = z.infer<
  typeof boruTermalGenlesmePayiInputSchema
>;

export interface BoruTermalGenlesmePayiOutput {
  genlesme_mm: number;
}

function compute(
  input: BoruTermalGenlesmePayiInput,
): CalcResult<BoruTermalGenlesmePayiOutput> {
  const genlesmeMm =
    input.genlesmeKatsayisi_alpha_mmMK * input.boruUzunlugu_L_m * input.sicaklikFarki_dT_C;

  return {
    value: { genlesme_mm: genlesmeMm },
    intermediates: {
      sicaklikFarki_dT_C: input.sicaklikFarki_dT_C,
    },
    standardsUsed: [],
  };
}

export const boruTermalGenlesmePayi: CalcModule<
  BoruTermalGenlesmePayiInput,
  BoruTermalGenlesmePayiOutput
> = {
  id: "boru-termal-genlesme-payi",
  title: "Boru Termal Genleşme Payı",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruTermalGenlesmePayiInputSchema,
  compute,
};
