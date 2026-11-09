import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Standart motor gücü seçimi: P_gerekli = P_mil · k_yedek; IEC 60072-1 / IEC 60034-30 uyumlu tercih edilen anma güçleri serisinden
// P_gerekli'ye eşit veya büyük en küçük değer seçilir. Seri üretici kataloglarında yaygın kW basamaklarıdır; yerel kataloğu teyit edin.
const SERI_KW = [0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250, 315];

export const standartMotorGucuSecimiInputSchema = z.object({
  milGucu_kW: z.number().positive(),
  yedekCarpani: z.number().min(1).max(2),
});

export type StandartMotorGucuSecimiInput = z.infer<typeof standartMotorGucuSecimiInputSchema>;

export interface StandartMotorGucuSecimiOutput {
  secilenMotor_kW: number | null;
}

function compute(input: StandartMotorGucuSecimiInput): CalcResult<StandartMotorGucuSecimiOutput> {
  const gerekli = input.milGucu_kW * input.yedekCarpani;
  const secilen = SERI_KW.find((p) => p >= gerekli - 1e-9) ?? null;
  return {
    value: { secilenMotor_kW: secilen },
    intermediates: {
      gerekli_guc_kW: gerekli,
      yuklenme_orani: secilen === null ? "—" : input.milGucu_kW / secilen,
      onceki_kademe_kW: secilen === null ? SERI_KW[SERI_KW.length - 1]! : (SERI_KW[SERI_KW.indexOf(secilen) - 1] ?? "—"),
    },
    standardsUsed: ["IEC 60072-1 (anma güçleri serisi)"],
    verdict:
      secilen === null
        ? { status: "uygunsuz", note: "Gerekli güç serinin (315 kW) üstünde; özel motor veya çoklu sürücü gerekir." }
        : { status: "uygun", note: `Seçilen: ${secilen} kW.` },
  };
}

export const standartMotorGucuSecimi: CalcModule<StandartMotorGucuSecimiInput, StandartMotorGucuSecimiOutput> = {
  id: "standart-motor-gucu-secimi",
  title: "Standart Motor Gücü Seçimi",
  discipline: "elektrik",
  standards: ["IEC 60072-1"],
  inputSchema: standartMotorGucuSecimiInputSchema,
  compute,
};
