import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sprinkler orifis debi denklemi Q = K·√P — NFPA 13 hidrolik hesabının temel
// bağıntısı (K-faktör üretici verisidir, tehlike sınıfı tasarım yoğunluğu tablosu
// bu modülde gömülü değildir; mühendis K ve basıncı kendi seçer).
export const sprinklerInputSchema = z.object({
  kFaktoru: z.number().positive(),
  basinc_bar: z.number().positive(),
});

export type SprinklerInput = z.infer<typeof sprinklerInputSchema>;

export interface SprinklerOutput {
  debi_L_dk: number;
}

function compute(input: SprinklerInput): CalcResult<SprinklerOutput> {
  const debiLDk = input.kFaktoru * Math.sqrt(input.basinc_bar);

  return {
    value: { debi_L_dk: debiLDk },
    intermediates: {
      kFaktoru: input.kFaktoru,
      basinc_bar: input.basinc_bar,
    },
    standardsUsed: ["NFPA 13"],
  };
}

export const sprinklerNfpa13: CalcModule<SprinklerInput, SprinklerOutput> = {
  id: "sprinkler-nfpa13",
  title: "Sprinkler Debi/Basınç",
  discipline: "mekanik",
  standards: ["NFPA 13"],
  inputSchema: sprinklerInputSchema,
  compute,
};
