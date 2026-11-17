import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Akım dengesizliği: max|Ii − Ort|/Ort. Nötr akımı = √(Ia²+Ib²+Ic²−IaIb−IbIc−IcIa) (faz açıları 120° kabul).
export const fazAkimiDengesizligiKontroluInputSchema = z.object({
  ia_A: z.number().positive(),
  ib_A: z.number().positive(),
  ic_A: z.number().positive(),
});

export type FazAkimiDengesizligiKontroluInput = z.infer<typeof fazAkimiDengesizligiKontroluInputSchema>;

export interface FazAkimiDengesizligiKontroluOutput {
  dengesizlik_pct: number;
}

function compute(input: FazAkimiDengesizligiKontroluInput): CalcResult<FazAkimiDengesizligiKontroluOutput> {
  const { ia_A: a, ib_A: b, ic_A: c } = input;
  const ort = (a + b + c) / 3;
  const sapma = Math.max(Math.abs(a - ort), Math.abs(b - ort), Math.abs(c - ort));
  const pct = (sapma / ort) * 100;
  const notr = Math.sqrt(Math.max(0, a * a + b * b + c * c - a * b - b * c - c * a));
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (pct <= 5) {
    status = "uygun";
    note = "Akım dengesizliği %5 veya altında.";
  } else if (pct <= 10) {
    status = "sinirda";
    note = "Akım dengesizliği %5–%10: motor derating ve yük dağılımı gözden geçirilmeli.";
  } else {
    status = "uygunsuz";
    note = "Akım dengesizliği %10'un üzerinde: yük dağılımını dengeleyin.";
  }
  return {
    value: { dengesizlik_pct: pct },
    intermediates: { ortalama_A: ort, en_buyuk_sapma_A: sapma, "nötr_akimi_A": notr },
    standardsUsed: ["NEMA MG 1 §14.36 / pratik sınırlar"],
    verdict: { status, note },
  };
}

export const fazAkimiDengesizligiKontrolu: CalcModule<FazAkimiDengesizligiKontroluInput, FazAkimiDengesizligiKontroluOutput> = {
  id: "faz-akimi-dengesizligi-kontrolu",
  title: "Faz Akımı Dengesizliği Kontrolü",
  discipline: "elektrik",
  standards: [],
  inputSchema: fazAkimiDengesizligiKontroluInputSchema,
  compute,
};
