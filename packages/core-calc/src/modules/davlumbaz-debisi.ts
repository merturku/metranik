import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yakalama hızı (capture velocity) prensibi: Q = v × A. Endüstriyel havalandırmada
// kirletici kaynağın yakalanması için gerekli hava hızı açıklık alanıyla çarpılır.
export const davlumbazDebisiInputSchema = z.object({
  yakalamaHizi_v_ms: z.number().positive(),
  aciklikAlani_A_m2: z.number().positive(),
});

export type DavlumbazDebisiInput = z.infer<typeof davlumbazDebisiInputSchema>;

export interface DavlumbazDebisiOutput {
  debi_m3h: number;
}

function compute(input: DavlumbazDebisiInput): CalcResult<DavlumbazDebisiOutput> {
  const debiM3s = input.yakalamaHizi_v_ms * input.aciklikAlani_A_m2;

  return {
    value: { debi_m3h: debiM3s * 3600 },
    intermediates: {
      debi_m3s: debiM3s,
    },
    standardsUsed: ["ACGIH"],
  };
}

export const davlumbazDebisi: CalcModule<DavlumbazDebisiInput, DavlumbazDebisiOutput> = {
  id: "davlumbaz-debisi",
  title: "Davlumbaz Debisi (Yakalama Hızı)",
  discipline: "mekanik",
  standards: ["ACGIH"],
  inputSchema: davlumbazDebisiInputSchema,
  compute,
};
