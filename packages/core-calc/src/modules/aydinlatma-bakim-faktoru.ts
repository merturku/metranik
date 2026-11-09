import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aydınlatma bakım faktörü (CIE 97 / EN 12464-1): MF = LLMF · LSF · LMF · RMF
// LLMF lamba ışık akısı bakım faktörü (yaşlanma), LSF lamba ömrü faktörü (ömür içi arıza), LMF armatür bakım faktörü (kirlenme),
// RMF oda yüzeyi bakım faktörü. Değerler üretici verisi ve ortam kirlilik sınıfından alınır (girdi); örn. LED'de LLMF L80/L90 değerinden gelir.
// Aydınlatma Lüks Yöntemi modülü MF'yi girdi alır: gerekli armatür sayısı N = E·A/(Φ·UF·MF).
export const aydinlatmaBakimFaktoruInputSchema = z.object({
  llmf: z.number().gt(0).max(1),
  lsf: z.number().gt(0).max(1),
  lmf: z.number().gt(0).max(1),
  rmf: z.number().gt(0).max(1),
  tasarimAydinligi_lux: z.number().positive(),
});

export type AydinlatmaBakimFaktoruInput = z.infer<typeof aydinlatmaBakimFaktoruInputSchema>;

export interface AydinlatmaBakimFaktoruOutput {
  bakimFaktoru: number;
}

function compute(input: AydinlatmaBakimFaktoruInput): CalcResult<AydinlatmaBakimFaktoruOutput> {
  const mf = input.llmf * input.lsf * input.lmf * input.rmf;
  return {
    value: { bakimFaktoru: mf },
    intermediates: {
      baslangic_aydinligi_gerekli_lux: input.tasarimAydinligi_lux / mf,
      aydinlik_fazlasi_yuzde: (1 / mf - 1) * 100,
    },
    standardsUsed: ["CIE 97 (bakım faktörü)", "EN 12464-1"],
    verdict:
      mf < 0.5
        ? { status: "sinirda", note: "Bakım faktörü çok düşük (< 0,5): bakım aralığını kısaltın veya armatürü gözden geçirin." }
        : { status: "uygun", note: "Bakım faktörü makul aralıkta." },
  };
}

export const aydinlatmaBakimFaktoru: CalcModule<AydinlatmaBakimFaktoruInput, AydinlatmaBakimFaktoruOutput> = {
  id: "aydinlatma-bakim-faktoru",
  title: "Aydınlatma Bakım Faktörü (LLMF·LSF·LMF·RMF)",
  discipline: "elektrik",
  standards: ["EN 12464-1"],
  inputSchema: aydinlatmaBakimFaktoruInputSchema,
  compute,
};
