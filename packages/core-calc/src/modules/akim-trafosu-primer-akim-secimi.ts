import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 61869-2 standart primer akımlar: 10, 12,5, 15, 20, 25, 30, 40, 50, 60, 75 A ve onun 10ⁿ katları.
const TABAN = [10, 12.5, 15, 20, 25, 30, 40, 50, 60, 75];
const SERI: number[] = [];
for (let n = 0; n <= 4; n++) for (const b of TABAN) SERI.push(Math.round(b * 10 ** n * 100) / 100);

export const akimTrafosuPrimerAkimSecimiInputSchema = z.object({
  isletmeAkimi_A: z.number().positive(),
  tasarimPayi: z.number().min(1),
  sekonderAkim_A: z.enum(["1", "5"]),
});

export type AkimTrafosuPrimerAkimSecimiInput = z.infer<typeof akimTrafosuPrimerAkimSecimiInputSchema>;
export interface AkimTrafosuPrimerAkimSecimiOutput {
  primerAkim_A: number | null;
}

function compute(input: AkimTrafosuPrimerAkimSecimiInput): CalcResult<AkimTrafosuPrimerAkimSecimiOutput> {
  const gerekli = input.isletmeAkimi_A * input.tasarimPayi;
  const ip = SERI.find((s) => s >= gerekli - 1e-9) ?? null;
  if (ip === null) {
    return {
      value: { primerAkim_A: null },
      intermediates: { gerekli_min_primer_A: gerekli, uyari: "Standart seri (750 kA'ya kadar) aşıldı" },
      standardsUsed: ["IEC 61869-2 (standart primer akımlar)"],
      verdict: { status: "uygunsuz", note: "Standart primer akım bulunamadı" },
    };
  }
  const yuk = input.isletmeAkimi_A / ip;
  const status = yuk >= 0.2 && yuk <= 1.2 ? "uygun" : "sinirda";
  return {
    value: { primerAkim_A: ip },
    intermediates: {
      gerekli_min_primer_A: gerekli,
      donusum_orani: `${ip}/${input.sekonderAkim_A}`,
      donusum_orani_sayisal: ip / Number(input.sekonderAkim_A),
      isletme_akimi_yuzdesi: yuk * 100,
    },
    standardsUsed: ["IEC 61869-2 (standart primer akımlar)"],
    verdict: {
      status,
      note: `İşletme akımı primerin %${(yuk * 100).toFixed(0)}'i; doğruluk sınıfı garantisi %20–%120 aralığındadır`,
    },
  };
}

export const akimTrafosuPrimerAkimSecimi: CalcModule<AkimTrafosuPrimerAkimSecimiInput, AkimTrafosuPrimerAkimSecimiOutput> = {
  id: "akim-trafosu-primer-akim-secimi",
  title: "Akım Trafosu Primer Akımı Seçimi",
  discipline: "elektrik",
  standards: ["IEC 61869-2 (standart primer akımlar)"],
  inputSchema: akimTrafosuPrimerAkimSecimiInputSchema,
  compute,
};
