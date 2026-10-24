import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const betonAğirlikSchema = z.object({
  hacim_m3: z.number().positive(),
  yoğunluk_kgm3: z.number().positive().optional(),
});

export const betonAğirlikHesabi: CalcModule<any, any> = {
  id: "insaat-beton-agirlik-hesabi",
  title: "Beton Ağırlık Hesabı",
  discipline: "insaat",
  standards: ["TS EN 206"],
  inputSchema: betonAğirlikSchema as any,

  compute(input: any) {
    const yogunluk = input.yoğunluk_kgm3 ?? 2400;
    const agirlik_kg = input.hacim_m3 * yogunluk;
    const agirlik_ton = agirlik_kg / 1000;
    return {
      value: { agirlik_ton: parseFloat(agirlik_ton.toFixed(2)) },
      intermediates: { yogunluk, agirlik_kg },
      standardsUsed: ["TS EN 206"],
    };
  },
};
