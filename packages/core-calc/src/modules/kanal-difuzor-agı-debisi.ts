import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const kanalDifuzorAgiSchemaSchema = z.object({
  hızlı_havayolu_hızı_ms: z.number().positive().optional(),
  difuzor_alanı_m2: z.number().positive(),
});

export const kanalDifuzorAgiDebisi: CalcModule<any, any> = {
  id: "kanal-difuzor-agi-debisi",
  title: "Kanal Difüzör Ağı Debisi",
  discipline: "mekanik",
  standards: ["ASHRAE 62.1"],
  inputSchema: kanalDifuzorAgiDebisi as any as any,

  compute(input: any) {
    const v = input.hızlı_havayolu_hızı_ms ?? 4;
    const debi_m3s = v * input.difuzor_alanı_m2;
    const debi_m3h = debi_m3s * 3600;
    return {
      value: { debi_m3h: parseFloat(debi_m3h.toFixed(1)) },
      intermediates: { v, debi_m3s },
      standardsUsed: ["ASHRAE 62.1"],
    };
  },
};
