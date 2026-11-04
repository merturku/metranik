import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// 1 bar = 10⁵ Pa;  1 mSS = 9806,65 Pa (g_n·1000 kg/m³);  1 psi = 6894,757 Pa;  1 atm = 101 325 Pa.
export const basincBirimDonusumuInputSchema = z.object({
  basinc_bar: z.number().positive(),
});

export type BasincBirimDonusumuInput = z.infer<typeof basincBirimDonusumuInputSchema>;

export interface BasincBirimDonusumuOutput {
  basinc_kPa: number;
}

function compute(input: BasincBirimDonusumuInput): CalcResult<BasincBirimDonusumuOutput> {
  const b = input.basinc_bar;
  return {
    value: { basinc_kPa: b * 100 },
    intermediates: {
      basinc_Pa: b * 1e5,
      basinc_psi: b * 14.5037738,
      basinc_mSS: (b * 1e5) / 9806.65,
      basinc_mmSS: (b * 1e5) / 9.80665,
      basinc_atm: b / 1.01325,
    },
    standardsUsed: ["1 bar = 100 kPa; 1 atm = 101,325 kPa; 1 mmSS = 9,80665 Pa; 1 psi = 6894,757 Pa"],
  };
}

export const basincBirimDonusumu: CalcModule<BasincBirimDonusumuInput, BasincBirimDonusumuOutput> = {
  id: "basinc-birim-donusumu",
  title: "Basınç Birim Dönüşümü",
  discipline: "mekanik",
  standards: [],
  inputSchema: basincBirimDonusumuInputSchema,
  compute,
};
