import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ib ≤ In koşulundan en küçük tercihli nominal akım (IEC 60898-1 modüler kesici serisi, A).
const KADEME = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125] as const;
export const kesiciNominalAkimSecimiInputSchema = z.object({
  tasarimAkimi_A: z.number().positive(),
});

export type KesiciNominalAkimSecimiInput = z.infer<typeof kesiciNominalAkimSecimiInputSchema>;

export interface KesiciNominalAkimSecimiOutput {
  nominalAkim_A: number | null;
}

function compute(input: KesiciNominalAkimSecimiInput): CalcResult<KesiciNominalAkimSecimiOutput> {
  const secim = KADEME.find((k) => k >= input.tasarimAkimi_A - 1e-9);
  if (secim === undefined) {
    return {
      value: { nominalAkim_A: null },
      intermediates: { not: "125 A'yi aşıyor; kompakt (MCCB) kesici kullanın" },
      standardsUsed: ["IEC 60898-1"],
      verdict: { status: "uygunsuz", note: "Modüler kesici aralığı aşıldı." },
    };
  }
  return {
    value: { nominalAkim_A: secim },
    intermediates: {
      yuklenme_yuzde: (input.tasarimAkimi_A / secim) * 100,
      rezerv_A: secim - input.tasarimAkimi_A,
    },
    standardsUsed: ["IEC 60898-1 (tercihli nominal akımlar)"],
  };
}

export const kesiciNominalAkimSecimi: CalcModule<KesiciNominalAkimSecimiInput, KesiciNominalAkimSecimiOutput> = {
  id: "kesici-nominal-akim-secimi",
  title: "Kesici Nominal Akım Seçimi",
  discipline: "elektrik",
  standards: ["IEC 60898-1"],
  inputSchema: kesiciNominalAkimSecimiInputSchema,
  compute,
};
