import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ASHRAE 62.1 nefes alma bölgesi debisi: Vbz = Rp·Pz + Ra·Az. Kişi başı (Rp) ve
// alan başı (Ra) debi oranları kullanım tipine göre standart tablosundan gelir;
// bu modülde gömülü değildir, mühendis girdisidir.
export const tazeHavaInputSchema = z.object({
  kisiSayisi: z.number().nonnegative(),
  alan_m2: z.number().positive(),
  kisiBasiDebi_Rp: z.number().nonnegative(),
  alanBasiDebi_Ra: z.number().nonnegative(),
});

export type TazeHavaInput = z.infer<typeof tazeHavaInputSchema>;

export interface TazeHavaOutput {
  debi_L_s: number;
}

function compute(input: TazeHavaInput): CalcResult<TazeHavaOutput> {
  const kisiPayiLS = input.kisiSayisi * input.kisiBasiDebi_Rp;
  const alanPayiLS = input.alan_m2 * input.alanBasiDebi_Ra;
  const toplamLS = kisiPayiLS + alanPayiLS;

  return {
    value: { debi_L_s: toplamLS },
    intermediates: {
      kisiPayi_L_s: kisiPayiLS,
      alanPayi_L_s: alanPayiLS,
    },
    standardsUsed: ["ASHRAE 62.1"],
  };
}

export const tazeHavaAshrae62: CalcModule<TazeHavaInput, TazeHavaOutput> = {
  id: "taze-hava-ashrae62",
  title: "Taze Hava Debisi",
  discipline: "mekanik",
  standards: ["ASHRAE 62.1"],
  inputSchema: tazeHavaInputSchema,
  compute,
};
