import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 825: çok katmanlı bir duvarın ısı geçirme katsayısı, katman dirençlerinin
// iç/dış yüzey dirençleriyle toplanıp tersinin alınmasıyla bulunur.
// U = 1/(Rsi + Σ(di/ki) + Rse). Bu modül iki katmana (ana malzeme + yalıtım)
// sınırlıdır; daha karmaşık duvarlarda katman dirençleri elle toplanmalıdır.
// Sonuç, Pencere/Duvar Isı Kaybı modülünün doğrudan girdi olarak aldığı U
// değerini üretir.
export const duvarUDegeriHesabiInputSchema = z.object({
  icYuzeyDirenci_Rsi_m2KW: z.number().positive(),
  disYuzeyDirenci_Rse_m2KW: z.number().positive(),
  katman1Kalinligi_d1_m: z.number().positive(),
  katman1Iletkenlik_k1_WmK: z.number().positive(),
  katman2Kalinligi_d2_m: z.number().positive(),
  katman2Iletkenlik_k2_WmK: z.number().positive(),
});

export type DuvarUDegeriHesabiInput = z.infer<typeof duvarUDegeriHesabiInputSchema>;

export interface DuvarUDegeriHesabiOutput {
  isiGecirmeKatsayisi_U_Wm2K: number;
}

function compute(input: DuvarUDegeriHesabiInput): CalcResult<DuvarUDegeriHesabiOutput> {
  const katman1DirenciM2KW = input.katman1Kalinligi_d1_m / input.katman1Iletkenlik_k1_WmK;
  const katman2DirenciM2KW = input.katman2Kalinligi_d2_m / input.katman2Iletkenlik_k2_WmK;
  const toplamDirencM2KW =
    input.icYuzeyDirenci_Rsi_m2KW +
    katman1DirenciM2KW +
    katman2DirenciM2KW +
    input.disYuzeyDirenci_Rse_m2KW;
  const isiGecirmeKatsayisiUWm2K = 1 / toplamDirencM2KW;

  return {
    value: { isiGecirmeKatsayisi_U_Wm2K: isiGecirmeKatsayisiUWm2K },
    intermediates: {
      katman1Direnci_m2KW: katman1DirenciM2KW,
      katman2Direnci_m2KW: katman2DirenciM2KW,
      toplamDirenc_m2KW: toplamDirencM2KW,
    },
    standardsUsed: ["TS 825"],
  };
}

export const duvarUDegeriHesabi: CalcModule<
  DuvarUDegeriHesabiInput,
  DuvarUDegeriHesabiOutput
> = {
  id: "duvar-u-degeri-hesabi",
  title: "Duvar/Çatı U-Değeri Hesabı",
  discipline: "mekanik",
  standards: ["TS 825"],
  inputSchema: duvarUDegeriHesabiInputSchema,
  compute,
};
