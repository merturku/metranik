import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sektörde yaygın ön boyutlandırma kuralı: Q = Alan × W/m² katsayısı.
export const radyantIsiticiKapasitesiInputSchema = z.object({
  alan_m2: z.number().positive(),
  katsayi_Wm2: z.number().positive(),
});

export type RadyantIsiticiKapasitesiInput = z.infer<
  typeof radyantIsiticiKapasitesiInputSchema
>;

export interface RadyantIsiticiKapasitesiOutput {
  gerekliKapasite_W: number;
}

function compute(
  input: RadyantIsiticiKapasitesiInput,
): CalcResult<RadyantIsiticiKapasitesiOutput> {
  const gerekliKapasiteW = input.alan_m2 * input.katsayi_Wm2;

  return {
    value: { gerekliKapasite_W: gerekliKapasiteW },
    intermediates: {
      katsayi_Wm2: input.katsayi_Wm2,
    },
    standardsUsed: [],
  };
}

export const radyantIsiticiKapasitesi: CalcModule<
  RadyantIsiticiKapasitesiInput,
  RadyantIsiticiKapasitesiOutput
> = {
  id: "radyant-isitici-kapasitesi",
  title: "Radyant Isıtıcı Kapasitesi",
  discipline: "mekanik",
  standards: [],
  inputSchema: radyantIsiticiKapasitesiInputSchema,
  compute,
};
