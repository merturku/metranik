import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// 1 kWh = 3,6 MJ = 3412,14 BTU;  1 kcal (IT) = 4186,8 J;  doğalgaz Hu ≈ 9,59 kWh/m³ (8250 kcal/m³, dağıtıcı değerini teyit edin).
export const enerjiBirimDonusumuInputSchema = z.object({
  enerji_kWh: z.number().positive(),
});

export type EnerjiBirimDonusumuInput = z.infer<typeof enerjiBirimDonusumuInputSchema>;

export interface EnerjiBirimDonusumuOutput {
  enerji_MJ: number;
}

function compute(input: EnerjiBirimDonusumuInput): CalcResult<EnerjiBirimDonusumuOutput> {
  const e = input.enerji_kWh;
  return {
    value: { enerji_MJ: e * 3.6 },
    intermediates: {
      enerji_GJ: e * 0.0036,
      enerji_kcal: (e * 3.6e6) / 4186.8,
      enerji_BTU: e * 3412.14,
      dogalgaz_m3_Hu9_59: e / 9.59,
      enerji_therm: e * 0.0341214,
    },
    standardsUsed: ["1 kWh = 3,6 MJ; 1 kcal(IT) = 4,1868 kJ; 1 kWh = 3412,14 BTU"],
  };
}

export const enerjiBirimDonusumu: CalcModule<EnerjiBirimDonusumuInput, EnerjiBirimDonusumuOutput> = {
  id: "enerji-birim-donusumu",
  title: "Enerji Birim Dönüşümü",
  discipline: "ev",
  standards: [],
  inputSchema: enerjiBirimDonusumuInputSchema,
  compute,
};
