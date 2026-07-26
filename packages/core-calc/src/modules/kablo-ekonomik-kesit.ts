import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ekonomik akım yoğunluğu yöntemi: A = I / Je. Yatırım ve kayıp maliyetlerini
// dengeleyen akım yoğunluğu (Je) malzemeye ve kullanım süresine göre seçilir.
export const kabloEkonomikKesitInputSchema = z.object({
  akim_I_A: z.number().positive(),
  ekonomikAkimYogunlugu_Je_Amm2: z.number().positive(),
});

export type KabloEkonomikKesitInput = z.infer<typeof kabloEkonomikKesitInputSchema>;

export interface KabloEkonomikKesitOutput {
  ekonomikKesit_mm2: number;
}

function compute(input: KabloEkonomikKesitInput): CalcResult<KabloEkonomikKesitOutput> {
  const ekonomikKesitMm2 = input.akim_I_A / input.ekonomikAkimYogunlugu_Je_Amm2;

  return {
    value: { ekonomikKesit_mm2: ekonomikKesitMm2 },
    intermediates: {
      ekonomikAkimYogunlugu_Je_Amm2: input.ekonomikAkimYogunlugu_Je_Amm2,
    },
    standardsUsed: [],
  };
}

export const kabloEkonomikKesit: CalcModule<
  KabloEkonomikKesitInput,
  KabloEkonomikKesitOutput
> = {
  id: "kablo-ekonomik-kesit",
  title: "Kablo Ekonomik Kesit",
  discipline: "elektrik",
  standards: [],
  inputSchema: kabloEkonomikKesitInputSchema,
  compute,
};
