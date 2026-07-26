import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Akım yoğunluğu yöntemi: I = J × A. Bakır bara için havada doğal soğutmada
// tipik akım yoğunluğu J ~1.6-2 A/mm².
export const baraAkimTasimaKapasitesiInputSchema = z.object({
  akimYogunlugu_J_Amm2: z.number().positive(),
  baraKesitAlani_mm2: z.number().positive(),
});

export type BaraAkimTasimaKapasitesiInput = z.infer<
  typeof baraAkimTasimaKapasitesiInputSchema
>;

export interface BaraAkimTasimaKapasitesiOutput {
  akimTasimaKapasitesi_A: number;
}

function compute(
  input: BaraAkimTasimaKapasitesiInput,
): CalcResult<BaraAkimTasimaKapasitesiOutput> {
  const akimTasimaKapasitesiA = input.akimYogunlugu_J_Amm2 * input.baraKesitAlani_mm2;

  return {
    value: { akimTasimaKapasitesi_A: akimTasimaKapasitesiA },
    intermediates: {
      akimYogunlugu_J_Amm2: input.akimYogunlugu_J_Amm2,
    },
    standardsUsed: [],
  };
}

export const baraAkimTasimaKapasitesi: CalcModule<
  BaraAkimTasimaKapasitesiInput,
  BaraAkimTasimaKapasitesiOutput
> = {
  id: "bara-akim-tasima-kapasitesi",
  title: "Bara (Busbar) Akım Taşıma Kapasitesi",
  discipline: "elektrik",
  standards: [],
  inputSchema: baraAkimTasimaKapasitesiInputSchema,
  compute,
};
