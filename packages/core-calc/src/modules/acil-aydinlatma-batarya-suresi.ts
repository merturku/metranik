import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Batarya kapasitesi tanımı: C = I × t → t = C / I.
export const acilAydinlatmaBataryaSuresiInputSchema = z.object({
  bataryaKapasitesi_C_Ah: z.number().positive(),
  yukAkimi_I_A: z.number().positive(),
});

export type AcilAydinlatmaBataryaSuresiInput = z.infer<
  typeof acilAydinlatmaBataryaSuresiInputSchema
>;

export interface AcilAydinlatmaBataryaSuresiOutput {
  calismaSuresi_saat: number;
}

function compute(
  input: AcilAydinlatmaBataryaSuresiInput,
): CalcResult<AcilAydinlatmaBataryaSuresiOutput> {
  const calismaSuresiSaat = input.bataryaKapasitesi_C_Ah / input.yukAkimi_I_A;

  return {
    value: { calismaSuresi_saat: calismaSuresiSaat },
    intermediates: {
      calismaSuresi_dakika: calismaSuresiSaat * 60,
    },
    standardsUsed: [],
  };
}

export const acilAydinlatmaBataryaSuresi: CalcModule<
  AcilAydinlatmaBataryaSuresiInput,
  AcilAydinlatmaBataryaSuresiOutput
> = {
  id: "acil-aydinlatma-batarya-suresi",
  title: "Acil Aydınlatma Batarya Süresi",
  discipline: "elektrik",
  standards: [],
  inputSchema: acilAydinlatmaBataryaSuresiInputSchema,
  compute,
};
