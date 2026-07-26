import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fire payı eklenmiş malzeme miktarı: Gerekli Miktar = Alan × (1 + Fire Oranı).
export const fayansDosemeMalzemeMiktariInputSchema = z.object({
  alan_m2: z.number().positive(),
  fireOrani: z.number().nonnegative(),
});

export type FayansDosemeMalzemeMiktariInput = z.infer<
  typeof fayansDosemeMalzemeMiktariInputSchema
>;

export interface FayansDosemeMalzemeMiktariOutput {
  gerekliMalzeme_m2: number;
}

function compute(
  input: FayansDosemeMalzemeMiktariInput,
): CalcResult<FayansDosemeMalzemeMiktariOutput> {
  const gerekliMalzemeM2 = input.alan_m2 * (1 + input.fireOrani);

  return {
    value: { gerekliMalzeme_m2: gerekliMalzemeM2 },
    intermediates: {
      fireOrani_yuzde: input.fireOrani * 100,
    },
    standardsUsed: [],
  };
}

export const fayansDosemeMalzemeMiktari: CalcModule<
  FayansDosemeMalzemeMiktariInput,
  FayansDosemeMalzemeMiktariOutput
> = {
  id: "fayans-doseme-malzeme-miktari",
  title: "Fayans / Döşeme Malzeme Miktarı",
  discipline: "ev",
  standards: [],
  inputSchema: fayansDosemeMalzemeMiktariInputSchema,
  compute,
};
