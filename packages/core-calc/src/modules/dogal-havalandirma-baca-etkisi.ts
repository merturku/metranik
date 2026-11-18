import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Baca etkisi: Q = Cd·A*·√(2g·ΔH·(Ti − To)/Ti); seri açıklıklar A* = 1/√(1/A1² + 1/A2²).
export const dogalHavalandirmaBacaEtkisiInputSchema = z
  .object({
    girisAlani_m2: z.number().positive(),
    cikisAlani_m2: z.number().positive(),
    yukseklikFarki_m: z.number().positive(),
    icSicaklik_C: z.number(),
    disSicaklik_C: z.number(),
    cd: z.number().gt(0).max(1),
    hacim_m3: z.number().positive(),
  })
  .refine((v) => v.icSicaklik_C > v.disSicaklik_C && v.disSicaklik_C > -273.15, {
    message: "İç sıcaklık dış sıcaklıktan yüksek olmalı (baca etkisi için)",
  });

export type DogalHavalandirmaBacaEtkisiInput = z.infer<typeof dogalHavalandirmaBacaEtkisiInputSchema>;

export interface DogalHavalandirmaBacaEtkisiOutput {
  debi_m3h: number;
}

function compute(input: DogalHavalandirmaBacaEtkisiInput): CalcResult<DogalHavalandirmaBacaEtkisiOutput> {
  const g = 9.80665;
  const aEtkin = 1 / Math.sqrt(1 / input.girisAlani_m2 ** 2 + 1 / input.cikisAlani_m2 ** 2);
  const Ti = input.icSicaklik_C + 273.15;
  const hiz = Math.sqrt((2 * g * input.yukseklikFarki_m * (input.icSicaklik_C - input.disSicaklik_C)) / Ti);
  const Q = input.cd * aEtkin * hiz;
  return {
    value: { debi_m3h: Q * 3600 },
    intermediates: {
      debi_m3s: Q,
      etkin_alan_m2: aEtkin,
      teorik_hiz_ms: hiz,
      hava_degisimi_1h: (Q * 3600) / input.hacim_m3,
    },
    standardsUsed: ["ASHRAE Fundamentals Bölüm 16"],
  };
}

export const dogalHavalandirmaBacaEtkisi: CalcModule<DogalHavalandirmaBacaEtkisiInput, DogalHavalandirmaBacaEtkisiOutput> = {
  id: "dogal-havalandirma-baca-etkisi",
  title: "Doğal Havalandırma Debisi (Baca Etkisi)",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals Bölüm 16"],
  inputSchema: dogalHavalandirmaBacaEtkisiInputSchema,
  compute,
};
