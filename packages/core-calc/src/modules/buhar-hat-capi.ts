import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Süreklilik denklemi: Q = A·v → D = √(4Q/(π·v)).
// Q (m³/s), kütlesel debi (kg/h) ve buhar özgül hacminden (m³/kg) hesaplanır.
export const buharHatCapiInputSchema = z.object({
  kutleselDebi_kgh: z.number().positive(),
  ozgulHacim_vg_m3kg: z.number().positive(),
  buharHizi_v_ms: z.number().positive(),
});

export type BuharHatCapiInput = z.infer<typeof buharHatCapiInputSchema>;

export interface BuharHatCapiOutput {
  boruCapi_mm: number;
}

function compute(input: BuharHatCapiInput): CalcResult<BuharHatCapiOutput> {
  const hacimselDebiM3s = (input.kutleselDebi_kgh * input.ozgulHacim_vg_m3kg) / 3600;
  const capM = Math.sqrt((4 * hacimselDebiM3s) / (Math.PI * input.buharHizi_v_ms));

  return {
    value: { boruCapi_mm: capM * 1000 },
    intermediates: {
      hacimselDebi_m3s: hacimselDebiM3s,
    },
    standardsUsed: [],
  };
}

export const buharHatCapi: CalcModule<BuharHatCapiInput, BuharHatCapiOutput> = {
  id: "buhar-hat-capi",
  title: "Buhar Hat Çapı",
  discipline: "mekanik",
  standards: [],
  inputSchema: buharHatCapiInputSchema,
  compute,
};
