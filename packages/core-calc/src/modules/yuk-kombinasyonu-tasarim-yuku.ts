import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Düşey yük kombinasyonları (sürekli + hareketli):
//  - TS 500 §6.2: Fd = 1,4·G + 1,6·Q
//  - TS EN 1990 Denklem 6.10: Fd = 1,35·G + 1,5·Q (yük kısmi katsayıları, önerilen değerler; ulusal ek teyidi)
//  - Servis (karakteristik): G + Q
// Rüzgâr/kar/deprem kombinasyonları (TBDY 2018, EN 1990 6.10a/b) kapsam dışıdır.
export const yukKombinasyonuTasarimYukuInputSchema = z.object({
  oluYuk: z.number().min(0),
  hareketliYuk: z.number().min(0),
});

export type YukKombinasyonuTasarimYukuInput = z.infer<typeof yukKombinasyonuTasarimYukuInputSchema>;

export interface YukKombinasyonuTasarimYukuOutput {
  Fd_TS500: number;
}

function compute(input: YukKombinasyonuTasarimYukuInput): CalcResult<YukKombinasyonuTasarimYukuOutput> {
  const g = input.oluYuk;
  const q = input.hareketliYuk;
  const ts500 = 1.4 * g + 1.6 * q;
  const ec = 1.35 * g + 1.5 * q;
  return {
    value: { Fd_TS500: ts500 },
    intermediates: {
      Fd_EN1990_610: ec,
      servis_G_Q: g + q,
      TS500_servis_orani: g + q > 0 ? ts500 / (g + q) : 0,
      hareketli_yuk_payi_yuzde: g + q > 0 ? (q / (g + q)) * 100 : 0,
    },
    standardsUsed: ["TS 500 §6.2", "TS EN 1990 Denk. 6.10"],
  };
}

export const yukKombinasyonuTasarimYuku: CalcModule<YukKombinasyonuTasarimYukuInput, YukKombinasyonuTasarimYukuOutput> = {
  id: "yuk-kombinasyonu-tasarim-yuku",
  title: "Düşey Yük Kombinasyonu (1,4G+1,6Q / 1,35G+1,5Q)",
  discipline: "insaat",
  standards: ["TS 500", "TS EN 1990"],
  inputSchema: yukKombinasyonuTasarimYukuInputSchema,
  compute,
};
