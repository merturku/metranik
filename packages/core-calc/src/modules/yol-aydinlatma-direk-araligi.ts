import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Lümen yöntemi (yol): Eort = Φ·UF·MF/(w·s) → s = Φ·UF·MF/(Eort·w).
export const yolAydinlatmaDirekAraligiInputSchema = z.object({
  aki_lm: z.number().positive(),
  uf: z.number().gt(0).max(1),
  mf: z.number().gt(0).max(1),
  hedefLux: z.number().positive(),
  yolGenisligi_m: z.number().positive(),
});

export type YolAydinlatmaDirekAraligiInput = z.infer<typeof yolAydinlatmaDirekAraligiInputSchema>;

export interface YolAydinlatmaDirekAraligiOutput {
  direkAraligi_m: number;
}

function compute(input: YolAydinlatmaDirekAraligiInput): CalcResult<YolAydinlatmaDirekAraligiOutput> {
  const faydali = input.aki_lm * input.uf * input.mf;
  const s = faydali / (input.hedefLux * input.yolGenisligi_m);
  return {
    value: { direkAraligi_m: s },
    intermediates: { yol_basina_aki_lmm: faydali / s, armatur_basina_aydinlik_lx: faydali / (input.yolGenisligi_m * s) },
    standardsUsed: ["EN 13201 (yol aydınlatması) — kullanım faktörü yöntemi"],
  };
}

export const yolAydinlatmaDirekAraligi: CalcModule<YolAydinlatmaDirekAraligiInput, YolAydinlatmaDirekAraligiOutput> = {
  id: "yol-aydinlatma-direk-araligi",
  title: "Yol Aydınlatması Direk Aralığı (Lümen Yöntemi)",
  discipline: "elektrik",
  standards: [],
  inputSchema: yolAydinlatmaDirekAraligiInputSchema,
  compute,
};
