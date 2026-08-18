import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Baca doğal çekişi (stack effect): sıcak baca gazı ile soğuk dış hava
// arasındaki yoğunluk farkının oluşturduğu kaldırma basıncı.
// ρdış = P / (R·Tdış) (ideal gaz), Δp = g·H·ρdış·(Tbaca-Tdış)/Tbaca.
const YERCEKIMI_g_ms2 = 9.81;
const HAVA_GAZ_SABITI_R_JkgK = 287;
const KELVIN_DONUSUM = 273.15;

export const bacaCekisiHesabiInputSchema = z.object({
  bacaYuksekligi_H_m: z.number().positive(),
  disOrtamSicakligi_Tdis_C: z.number(),
  bacaGaziSicakligi_Tbaca_C: z.number(),
  atmosferBasinci_P_Pa: z.number().positive(),
});

export type BacaCekisiHesabiInput = z.infer<typeof bacaCekisiHesabiInputSchema>;

export interface BacaCekisiHesabiOutput {
  cekisBasinci_Pa: number;
}

function compute(input: BacaCekisiHesabiInput): CalcResult<BacaCekisiHesabiOutput> {
  const tDisK = input.disOrtamSicakligi_Tdis_C + KELVIN_DONUSUM;
  const tBacaK = input.bacaGaziSicakligi_Tbaca_C + KELVIN_DONUSUM;
  const rhoDisKgM3 = input.atmosferBasinci_P_Pa / (HAVA_GAZ_SABITI_R_JkgK * tDisK);
  const cekisBasinciPa =
    YERCEKIMI_g_ms2 * input.bacaYuksekligi_H_m * rhoDisKgM3 * ((tBacaK - tDisK) / tBacaK);

  return {
    value: { cekisBasinci_Pa: cekisBasinciPa },
    intermediates: {
      disOrtamYogunlugu_kg_m3: rhoDisKgM3,
    },
    standardsUsed: [],
  };
}

export const bacaCekisiHesabi: CalcModule<BacaCekisiHesabiInput, BacaCekisiHesabiOutput> = {
  id: "baca-cekisi-hesabi",
  title: "Baca Doğal Çekişi Hesabı",
  discipline: "mekanik",
  standards: [],
  inputSchema: bacaCekisiHesabiInputSchema,
  compute,
};
