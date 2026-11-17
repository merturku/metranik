import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Seri: ΣR; paralel: 1/Σ(1/R). 0 değerler "kullanılmıyor" sayılır; en az bir direnç gerekir.
export const evDirencSeriParalelInputSchema = z
  .object({
    mod: z.enum(["seri", "paralel"]),
    r1: z.number().min(0),
    r2: z.number().min(0),
    r3: z.number().min(0),
    r4: z.number().min(0),
    r5: z.number().min(0),
  })
  .refine((v) => [v.r1, v.r2, v.r3, v.r4, v.r5].some((r) => r > 0), { message: "En az bir direnç girilmeli" });

export type EvDirencSeriParalelInput = z.infer<typeof evDirencSeriParalelInputSchema>;

export interface EvDirencSeriParalelOutput {
  esdegerDirenc_ohm: number;
}

function compute(input: EvDirencSeriParalelInput): CalcResult<EvDirencSeriParalelOutput> {
  const r = [input.r1, input.r2, input.r3, input.r4, input.r5].filter((x) => x > 0);
  const req = input.mod === "seri" ? r.reduce((a, b) => a + b, 0) : 1 / r.reduce((a, b) => a + 1 / b, 0);
  return {
    value: { esdegerDirenc_ohm: req },
    intermediates: { kullanilan_direnc_sayisi: r.length, iletkenlik_S: 1 / req },
    standardsUsed: [],
  };
}

export const evDirencSeriParalel: CalcModule<EvDirencSeriParalelInput, EvDirencSeriParalelOutput> = {
  id: "ev-direnc-seri-paralel",
  title: "Seri / Paralel Eşdeğer Direnç",
  discipline: "ev",
  standards: [],
  inputSchema: evDirencSeriParalelInputSchema,
  compute,
};
