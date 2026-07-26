import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Üç fazlı görünür güç: S = √3 × V × I.
export const kisaDevreGucuInputSchema = z.object({
  hatGerilimi_V_V: z.number().positive(),
  kisaDevreAkimi_I_A: z.number().positive(),
});

export type KisaDevreGucuInput = z.infer<typeof kisaDevreGucuInputSchema>;

export interface KisaDevreGucuOutput {
  kisaDevreGucu_kVA: number;
}

function compute(input: KisaDevreGucuInput): CalcResult<KisaDevreGucuOutput> {
  const kisaDevreGucuVA = Math.sqrt(3) * input.hatGerilimi_V_V * input.kisaDevreAkimi_I_A;

  return {
    value: { kisaDevreGucu_kVA: kisaDevreGucuVA / 1000 },
    intermediates: {
      kisaDevreGucu_VA: kisaDevreGucuVA,
    },
    standardsUsed: [],
  };
}

export const kisaDevreGucu: CalcModule<KisaDevreGucuInput, KisaDevreGucuOutput> = {
  id: "kisa-devre-gucu",
  title: "Kısa Devre Gücü",
  discipline: "elektrik",
  standards: [],
  inputSchema: kisaDevreGucuInputSchema,
  compute,
};
