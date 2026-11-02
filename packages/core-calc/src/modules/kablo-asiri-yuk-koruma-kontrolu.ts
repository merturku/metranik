import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aşırı yük korumasının kablo ile koordinasyonu (IEC 60364-4-43 §433.1):
//   (i)  Ib ≤ In ≤ Iz        (ii)  I2 ≤ 1,45·Iz
// I2 = koruma cihazının konvansiyonel açma akımı: kesici (IEC 60898-1) 1,45·In,
// gG sigorta (IEC 60269-1, In ≥ 16 A) 1,6·In. Sigortada (ii) koşulu In ≤ 0,9·Iz'ye iner.
export const kabloAsiriYukKorumaKontroluInputSchema = z.object({
  tasarimAkimi_A: z.number().positive(),
  korumaNominalAkimi_A: z.number().positive(),
  kabloAkimTasima_A: z.number().positive(),
  korumaTipi: z.enum(["kesici", "sigorta"]),
});

export type KabloAsiriYukKorumaKontroluInput = z.infer<typeof kabloAsiriYukKorumaKontroluInputSchema>;

export interface KabloAsiriYukKorumaKontroluOutput {
  I2_A: number;
}

function compute(input: KabloAsiriYukKorumaKontroluInput): CalcResult<KabloAsiriYukKorumaKontroluOutput> {
  const { tasarimAkimi_A: ib, korumaNominalAkimi_A: inom, kabloAkimTasima_A: iz } = input;
  const k2 = input.korumaTipi === "kesici" ? 1.45 : 1.6;
  const i2 = k2 * inom;
  const kosul1 = ib <= inom && inom <= iz;
  const kosul2 = i2 <= 1.45 * iz;
  const uygun = kosul1 && kosul2;
  const sorunlar: string[] = [];
  if (ib > inom) sorunlar.push("Ib > In (koruma tasarım akımında açar)");
  if (inom > iz) sorunlar.push("In > Iz (kablo korunmuyor)");
  if (!kosul2) sorunlar.push(`I2 = ${i2.toFixed(1)} A > 1,45·Iz = ${(1.45 * iz).toFixed(1)} A`);
  return {
    value: { I2_A: i2 },
    intermediates: {
      k2_katsayisi: k2,
      sinir_1_45_Iz_A: 1.45 * iz,
      azami_In_kosul2_A: (1.45 * iz) / k2,
      kosul_1: kosul1 ? "Sağlandı (Ib ≤ In ≤ Iz)" : "Sağlanmadı",
      kosul_2: kosul2 ? "Sağlandı (I2 ≤ 1,45·Iz)" : "Sağlanmadı",
    },
    standardsUsed: ["IEC 60364-4-43 §433.1"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun ? "Aşırı yük koruması kabloyla koordineli." : sorunlar.join("; ") + ".",
    },
  };
}

export const kabloAsiriYukKorumaKontrolu: CalcModule<KabloAsiriYukKorumaKontroluInput, KabloAsiriYukKorumaKontroluOutput> = {
  id: "kablo-asiri-yuk-koruma-kontrolu",
  title: "Kablo Aşırı Yük Koruma Koordinasyonu",
  discipline: "elektrik",
  standards: ["IEC 60364-4-43"],
  inputSchema: kabloAsiriYukKorumaKontroluInputSchema,
  compute,
};
