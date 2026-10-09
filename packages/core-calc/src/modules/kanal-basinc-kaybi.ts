import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const kanalBasincSchema = z.object({ debi_m3s: z.number().positive(), cap_mm: z.number().positive(), uzunluk_m: z.number().positive() });
export const kanalBasincKaybi: CalcModule<any, any> = {
  id: "kanal-basinc-kaybi",
  title: "Kanal Basınç Kaybı",
  discipline: "mekanik",
  standards: ["ASHRAE"],
  inputSchema: kanalBasincSchema as any,
  compute(input: any) {
    const V = (input.debi_m3s * 4) / (Math.PI * (input.cap_mm / 1000) ** 2);
    const dP = 0.025 * (input.uzunluk_m / (input.cap_mm / 1000)) * (1000 * V ** 2 / 2);
    return { value: { basinc_pa: parseFloat(dP.toFixed(1)) }, intermediates: { V }, standardsUsed: ["ASHRAE"] };
  },
};
