import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// 1 ft³ = 0,0283168466 m³ → 1 CFM = 1,699011 m³/h;  1 m³/h = 0,2778 L/s.
export const havaDebisiBirimDonusumuInputSchema = z.object({
  debi_m3h: z.number().positive(),
});

export type HavaDebisiBirimDonusumuInput = z.infer<typeof havaDebisiBirimDonusumuInputSchema>;

export interface HavaDebisiBirimDonusumuOutput {
  debi_CFM: number;
}

function compute(input: HavaDebisiBirimDonusumuInput): CalcResult<HavaDebisiBirimDonusumuOutput> {
  const q = input.debi_m3h;
  return {
    value: { debi_CFM: q / 1.699011 },
    intermediates: { debi_Ls: q / 3.6, debi_m3s: q / 3600, debi_m3dk: q / 60, debi_ft3h: q * 35.3146667 },
    standardsUsed: ["1 CFM = 1,699011 m³/h; 1 m³/h = 1/3,6 L/s"],
  };
}

export const havaDebisiBirimDonusumu: CalcModule<HavaDebisiBirimDonusumuInput, HavaDebisiBirimDonusumuOutput> = {
  id: "hava-debisi-birim-donusumu",
  title: "Hava Debisi Birim Dönüşümü",
  discipline: "mekanik",
  standards: [],
  inputSchema: havaDebisiBirimDonusumuInputSchema,
  compute,
};
