import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 62053-21/-22: yüzde hata e = (Em − Er)/Er·100; sınıf sınırı 0,5S: 0,5; 1: 1,0; 2: 2,0 (anma akımı, cosφ = 1).
const SINIR: Record<"0.5" | "1" | "2", number> = { "0.5": 0.5, "1": 1, "2": 2 };

export const sayacDogrulukKontroluInputSchema = z.object({
  sayac_kWh: z.number().positive(),
  referans_kWh: z.number().positive(),
  sinif: z.enum(["0.5", "1", "2"]),
});

export type SayacDogrulukKontroluInput = z.infer<typeof sayacDogrulukKontroluInputSchema>;

export interface SayacDogrulukKontroluOutput {
  hata_pct: number;
}

function compute(input: SayacDogrulukKontroluInput): CalcResult<SayacDogrulukKontroluOutput> {
  const e = ((input.sayac_kWh - input.referans_kWh) / input.referans_kWh) * 100;
  const sinir = SINIR[input.sinif];
  const k = Math.abs(e) / sinir;
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (k > 1 + 1e-9) {
    status = "uygunsuz";
    note = "Hata sınıf sınırını aşıyor: sayaç doğruluk sınıfı dışında.";
  } else if (k >= 0.8 - 1e-9) {
    status = "sinirda";
    note = "Hata sınıf sınırının %80–100'ü: ölçüm belirsizliği ile birlikte değerlendirin.";
  } else {
    status = "uygun";
    note = "Hata sınıf sınırının %80'inin altında.";
  }
  return {
    value: { hata_pct: e },
    intermediates: { sinir_pct: sinir, sinir_kullanimi: k },
    standardsUsed: ["IEC 62053-21 / -22"],
    verdict: { status, note },
  };
}

export const sayacDogrulukKontrolu: CalcModule<SayacDogrulukKontroluInput, SayacDogrulukKontroluOutput> = {
  id: "sayac-dogruluk-kontrolu",
  title: "Elektrik Sayacı Doğruluk Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 62053-21"],
  inputSchema: sayacDogrulukKontroluInputSchema,
  compute,
};
