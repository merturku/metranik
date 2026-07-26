import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Karışım oranı ilişkisi: Su Miktarı = (Su/Çimento Oranı) × Çimento Miktarı.
export const betonSuCimentoOraniInputSchema = z.object({
  suCimentoOrani: z.number().positive(),
  cimentoDozaji_kg_m3: z.number().positive(),
});

export type BetonSuCimentoOraniInput = z.infer<typeof betonSuCimentoOraniInputSchema>;

export interface BetonSuCimentoOraniOutput {
  suMiktari_kg_m3: number;
}

function compute(input: BetonSuCimentoOraniInput): CalcResult<BetonSuCimentoOraniOutput> {
  const suMiktariKgM3 = input.suCimentoOrani * input.cimentoDozaji_kg_m3;

  return {
    value: { suMiktari_kg_m3: suMiktariKgM3 },
    intermediates: {
      suCimentoOrani: input.suCimentoOrani,
    },
    standardsUsed: ["TS 802"],
  };
}

export const betonSuCimentoOrani: CalcModule<
  BetonSuCimentoOraniInput,
  BetonSuCimentoOraniOutput
> = {
  id: "beton-su-cimento-orani",
  title: "Beton Su/Çimento Oranı",
  discipline: "insaat",
  standards: ["TS 802"],
  inputSchema: betonSuCimentoOraniInputSchema,
  compute,
};
