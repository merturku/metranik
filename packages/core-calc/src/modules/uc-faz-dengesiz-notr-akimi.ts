import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dengesiz üç fazlı yükte nötr akımı (fazlar 120° arayla, cosφ'ler aynı kabulüyle fazör toplamı):
// IN = √(IA² + IB² + IC² − IA·IB − IB·IC − IC·IA).
// Faz akımı dengesizliği = max|Ii − Iort|/Iort. Nötr iletkenin akım taşıma kapasitesi girilirse IN ile karşılaştırılır.
// Not: üçün katı harmonikler (nötrde aritmetik toplanır) bu bağıntıya dahil değildir; bkz. Akım Harmonik Bozulması modülü.
export const ucFazDengesizNotrAkimiInputSchema = z.object({
  akimL1_A: z.number().min(0),
  akimL2_A: z.number().min(0),
  akimL3_A: z.number().min(0),
  notrKapasitesi_A: z.number().min(0),
});

export type UcFazDengesizNotrAkimiInput = z.infer<typeof ucFazDengesizNotrAkimiInputSchema>;

export interface UcFazDengesizNotrAkimiOutput {
  notrAkimi_A: number;
}

function compute(input: UcFazDengesizNotrAkimiInput): CalcResult<UcFazDengesizNotrAkimiOutput> {
  const a = input.akimL1_A;
  const b = input.akimL2_A;
  const c = input.akimL3_A;
  const ic = Math.sqrt(Math.max(0, a * a + b * b + c * c - a * b - b * c - c * a));
  const ort = (a + b + c) / 3;
  const dengesizlik = ort > 0 ? (Math.max(Math.abs(a - ort), Math.abs(b - ort), Math.abs(c - ort)) / ort) * 100 : 0;

  let verdict: CalcResult<UcFazDengesizNotrAkimiOutput>["verdict"];
  if (input.notrKapasitesi_A > 0) {
    verdict =
      ic <= input.notrKapasitesi_A
        ? { status: "uygun", note: `IN = ${ic.toFixed(1)} A ≤ nötr iletken kapasitesi ${input.notrKapasitesi_A} A.` }
        : { status: "uygunsuz", note: `IN = ${ic.toFixed(1)} A > nötr iletken kapasitesi ${input.notrKapasitesi_A} A: nötr kesitini büyütün veya yükleri fazlara yeniden dağıtın.` };
  }

  return {
    value: { notrAkimi_A: ic },
    intermediates: {
      ortalama_faz_akimi_A: ort,
      faz_akimi_dengesizligi_yuzde: dengesizlik,
      en_yuksek_faz_akimi_A: Math.max(a, b, c),
      notr_faz_orani: Math.max(a, b, c) > 0 ? ic / Math.max(a, b, c) : 0,
    },
    standardsUsed: [],
    verdict,
  };
}

export const ucFazDengesizNotrAkimi: CalcModule<UcFazDengesizNotrAkimiInput, UcFazDengesizNotrAkimiOutput> = {
  id: "uc-faz-dengesiz-notr-akimi",
  title: "Üç Faz Dengesiz Yük Nötr Akımı",
  discipline: "elektrik",
  standards: [],
  inputSchema: ucFazDengesizNotrAkimiInputSchema,
  compute,
};
