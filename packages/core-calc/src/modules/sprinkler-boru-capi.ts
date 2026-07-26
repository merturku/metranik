import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Süreklilik denklemi: Q = A·v → D = √(4Q/(π·v)).
export const sprinklerBoruCapiInputSchema = z.object({
  debi_Q_Ls: z.number().positive(),
  akisHizi_v_ms: z.number().positive(),
});

export type SprinklerBoruCapiInput = z.infer<typeof sprinklerBoruCapiInputSchema>;

export interface SprinklerBoruCapiOutput {
  boruCapi_mm: number;
}

function compute(input: SprinklerBoruCapiInput): CalcResult<SprinklerBoruCapiOutput> {
  const debiM3s = input.debi_Q_Ls / 1000;
  const capM = Math.sqrt((4 * debiM3s) / (Math.PI * input.akisHizi_v_ms));

  return {
    value: { boruCapi_mm: capM * 1000 },
    intermediates: {
      debi_m3s: debiM3s,
    },
    standardsUsed: ["NFPA 13"],
  };
}

export const sprinklerBoruCapi: CalcModule<SprinklerBoruCapiInput, SprinklerBoruCapiOutput> = {
  id: "sprinkler-boru-capi",
  title: "Sprinkler Boru Çapı",
  discipline: "mekanik",
  standards: ["NFPA 13"],
  inputSchema: sprinklerBoruCapiInputSchema,
  compute,
};
