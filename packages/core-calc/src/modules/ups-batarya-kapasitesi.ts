import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Gerekli batarya kapasitesi: C(Ah) = (P×t) / (η×V).
export const upsBataryaKapasitesiInputSchema = z.object({
  yuk_W: z.number().positive(),
  yedekSure_h: z.number().positive(),
  verim_eta: z.number().positive().max(1),
  sistemGerilimi_V: z.number().positive(),
});

export type UpsBataryaKapasitesiInput = z.infer<typeof upsBataryaKapasitesiInputSchema>;

export interface UpsBataryaKapasitesiOutput {
  gerekliKapasite_Ah: number;
}

function compute(input: UpsBataryaKapasitesiInput): CalcResult<UpsBataryaKapasitesiOutput> {
  const gerekliKapasiteAh =
    (input.yuk_W * input.yedekSure_h) / (input.verim_eta * input.sistemGerilimi_V);

  return {
    value: { gerekliKapasite_Ah: gerekliKapasiteAh },
    intermediates: {
      verim_eta: input.verim_eta,
    },
    standardsUsed: [],
  };
}

export const upsBataryaKapasitesi: CalcModule<
  UpsBataryaKapasitesiInput,
  UpsBataryaKapasitesiOutput
> = {
  id: "ups-batarya-kapasitesi",
  title: "UPS / Batarya Kapasitesi",
  discipline: "elektrik",
  standards: [],
  inputSchema: upsBataryaKapasitesiInputSchema,
  compute,
};
