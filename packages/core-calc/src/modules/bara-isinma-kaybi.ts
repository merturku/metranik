import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Joule ısınması: P = I² × R × L (R: birim uzunluk direnci).
export const baraIsinmaKaybiInputSchema = z.object({
  akim_I_A: z.number().positive(),
  birimDirenc_R_ohmm: z.number().positive(),
  uzunluk_L_m: z.number().positive(),
});

export type BaraIsinmaKaybiInput = z.infer<typeof baraIsinmaKaybiInputSchema>;

export interface BaraIsinmaKaybiOutput {
  isiKaybi_W: number;
}

function compute(input: BaraIsinmaKaybiInput): CalcResult<BaraIsinmaKaybiOutput> {
  const isiKaybiW =
    input.akim_I_A ** 2 * input.birimDirenc_R_ohmm * input.uzunluk_L_m;

  return {
    value: { isiKaybi_W: isiKaybiW },
    intermediates: {
      birimDirenc_R_ohmm: input.birimDirenc_R_ohmm,
    },
    standardsUsed: [],
  };
}

export const baraIsinmaKaybi: CalcModule<BaraIsinmaKaybiInput, BaraIsinmaKaybiOutput> = {
  id: "bara-isinma-kaybi",
  title: "Bara Isınma Kaybı (I²R)",
  discipline: "elektrik",
  standards: [],
  inputSchema: baraIsinmaKaybiInputSchema,
  compute,
};
