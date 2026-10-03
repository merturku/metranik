import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_240Schema = z.object({
  cap_mm: z.number().positive(),
  uzunluk_m: z.number().positive(),
  yuzey_pürüzlülük_mm: z.number().positive().optional(),
});

export type Modul_240Input = z.infer<typeof modul_240Schema>;

export interface Modul_240Output {
  yuzey_alani_m2: number;
  darcy_f: number;
}

export const modul_240: CalcModule<Modul_240Input, Modul_240Output> = {
  id: "modul_240",
  title: "Boru Yüzey Alanı ve Darcy Faktörü",
  discipline: "mekanik",
  standards: ["ISO 4413"],
  inputSchema: modul_240Schema,

  compute(input: Modul_240Input): CalcResult<Modul_240Output> {
    const D = input.cap_mm / 1000; // m'ye çevir
    const A = Math.PI * D * input.uzunluk_m;
    
    // Swamee-Jain: f = 0.25 / [log10(k/(3.7D) + 5.74/Re^0.9)]^2
    // Türbülanslı için yaklaşık: f ≈ 0.035 orta pürüzlülük
    const f = 0.035;

    return {
      value: {
        yuzey_alani_m2: Math.round(A * 1000) / 1000,
        darcy_f: Math.round(f * 10000) / 10000,
      },
      intermediates: { cap_m: D },
      standardsUsed: ["ISO 4413"],
    };
  },
};
