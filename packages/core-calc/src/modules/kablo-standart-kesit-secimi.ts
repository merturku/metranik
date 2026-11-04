import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hesaplanan kesitten büyük/eşit en küçük standart iletken kesiti (IEC 60228 serisi, mm²).
const KESITLER = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630] as const;
export const kabloStandartKesitSecimiInputSchema = z.object({
  hesaplananKesit_mm2: z.number().positive(),
});

export type KabloStandartKesitSecimiInput = z.infer<typeof kabloStandartKesitSecimiInputSchema>;

export interface KabloStandartKesitSecimiOutput {
  standartKesit_mm2: number | null;
}

function compute(input: KabloStandartKesitSecimiInput): CalcResult<KabloStandartKesitSecimiOutput> {
  const secim = KESITLER.find((k) => k >= input.hesaplananKesit_mm2 - 1e-9);
  if (secim === undefined) {
    return {
      value: { standartKesit_mm2: null },
      intermediates: { not: "630 mm²'yi aşıyor; paralel kablo kullanın" },
      standardsUsed: ["IEC 60228"],
      verdict: { status: "uygunsuz", note: "Hesaplanan kesit tek iletkenle karşılanamıyor." },
    };
  }
  const alt = [...KESITLER].reverse().find((k) => k < secim);
  return {
    value: { standartKesit_mm2: secim },
    intermediates: {
      pay_yuzde: (secim / input.hesaplananKesit_mm2 - 1) * 100,
      bir_alt_standart_kesit_mm2: alt ?? "—",
    },
    standardsUsed: ["IEC 60228 (iletken kesit serisi)"],
  };
}

export const kabloStandartKesitSecimi: CalcModule<KabloStandartKesitSecimiInput, KabloStandartKesitSecimiOutput> = {
  id: "kablo-standart-kesit-secimi",
  title: "Kablo Standart Kesit Seçimi",
  discipline: "elektrik",
  standards: ["IEC 60228"],
  inputSchema: kabloStandartKesitSecimiInputSchema,
  compute,
};
