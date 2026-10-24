import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const havalanSchema = z.object({
  debi_m3h: z.number().positive(),
  hiz_ms: z.number().positive().optional(),
});

export const havalanVentilAcikligi: CalcModule<any, any> = {
  id: "havalandirma-ventil-acikligi",
  title: "Havalandırma Ventil Açıklığı",
  discipline: "mekanik",
  standards: ["ASHRAE 62.1"],
  inputSchema: havalanSchema as any,

  compute(input: any) {
    const v = input.hiz_ms ?? 3;
    const debi_m3s = input.debi_m3h / 3600;
    const aciklik_m2 = debi_m3s / v;
    const cap_mm2 = aciklik_m2 * 1e6;
    return {
      value: { aciklik_m2: parseFloat(aciklik_m2.toFixed(4)), cap_mm2: parseFloat(cap_mm2.toFixed(0)) },
      intermediates: { v, debi_m3s },
      standardsUsed: ["ASHRAE 62.1"],
    };
  },
};
