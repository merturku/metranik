import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kablo kapasitif şarj akımı (faz başına): Ic = 2π·f·C·U0·L, U0 = U/√3; üç faz reaktif şarj gücü Qc = √3·U·Ic = 2π·f·C·L·U².
// Orta/yüksek gerilim kablolarında yüksüz hat şarjı ve kompanzasyon (şönt reaktör) için kullanılır. C üretici kablo kataloğundan (nF/km).
export const kabloSarjAkimiInputSchema = z.object({
  kapasitans_nFkm: z.number().positive(),
  uzunluk_km: z.number().positive(),
  hatGerilimi_kV: z.number().positive(),
  frekans_Hz: z.number().positive(),
});

export type KabloSarjAkimiInput = z.infer<typeof kabloSarjAkimiInputSchema>;

export interface KabloSarjAkimiOutput {
  sarjAkimi_A: number;
}

function compute(input: KabloSarjAkimiInput): CalcResult<KabloSarjAkimiOutput> {
  const c = input.kapasitans_nFkm * 1e-9 * input.uzunluk_km;
  const u = input.hatGerilimi_kV * 1e3;
  const w = 2 * Math.PI * input.frekans_Hz;
  const ic = (w * c * u) / Math.sqrt(3);
  return {
    value: { sarjAkimi_A: ic },
    intermediates: {
      toplam_kapasitans_uF: c * 1e6,
      sarj_gucu_kVAr: (w * c * u * u) / 1000,
    },
    standardsUsed: ["IEC 60287 (kablo kapasitansı); Ic = ωCU0"],
  };
}

export const kabloSarjAkimi: CalcModule<KabloSarjAkimiInput, KabloSarjAkimiOutput> = {
  id: "kablo-sarj-akimi",
  title: "Kablo Kapasitif Şarj Akımı",
  discipline: "elektrik",
  standards: [],
  inputSchema: kabloSarjAkimiInputSchema,
  compute,
};
