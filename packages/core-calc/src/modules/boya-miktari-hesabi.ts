import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Malzeme verimi ilişkisi: Gerekli Miktar = Alan × Kat Sayısı / Verim.
export const boyaMiktariHesabiInputSchema = z.object({
  alan_m2: z.number().positive(),
  katSayisi: z.number().positive(),
  boyaVerimi_m2L: z.number().positive(),
});

export type BoyaMiktariHesabiInput = z.infer<typeof boyaMiktariHesabiInputSchema>;

export interface BoyaMiktariHesabiOutput {
  gerekliBoya_L: number;
}

function compute(input: BoyaMiktariHesabiInput): CalcResult<BoyaMiktariHesabiOutput> {
  const gerekliBoyaL = (input.alan_m2 * input.katSayisi) / input.boyaVerimi_m2L;

  return {
    value: { gerekliBoya_L: gerekliBoyaL },
    intermediates: {
      katSayisi: input.katSayisi,
    },
    standardsUsed: [],
  };
}

export const boyaMiktariHesabi: CalcModule<BoyaMiktariHesabiInput, BoyaMiktariHesabiOutput> = {
  id: "boya-miktari-hesabi",
  title: "Boya Miktarı Hesabı",
  discipline: "ev",
  standards: [],
  inputSchema: boyaMiktariHesabiInputSchema,
  compute,
};
