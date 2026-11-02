import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Katı/sıvılaştırılmış yakıt miktarı: m = Q_yıllık/(Hu·η).  Alt ısıl değerler (tipik, kWh/kg):
// LPG 12,8 (≈46 MJ/kg), ahşap pelet 4,6 (EN ISO 17225-2 A1 asgari ≥ 4,6), kuru odun (%15–20 nem) ≈ 4,0.
// Gerçek değer ürün ve nem oranına bağlıdır — yakıt etiketinden/analizinden teyit edin.
export const yakitTuketimiLpgPeletOdunInputSchema = z.object({
  yillikIsiIhtiyaci_kWh: z.number().positive(),
  yakitTuru: z.enum(["lpg", "pelet", "odun"]),
  sistemVerimi: z.number().gt(0).max(1),
  yakitFiyati_TLkg: z.number().min(0),
  paketAgirligi_kg: z.number().positive(),
});

export type YakitTuketimiLpgPeletOdunInput = z.infer<typeof yakitTuketimiLpgPeletOdunInputSchema>;

export interface YakitTuketimiLpgPeletOdunOutput {
  yakitMiktari_kg: number;
}

const HU = { lpg: 12.8, pelet: 4.6, odun: 4.0 } as const;

function compute(input: YakitTuketimiLpgPeletOdunInput): CalcResult<YakitTuketimiLpgPeletOdunOutput> {
  const hu = HU[input.yakitTuru];
  const kg = input.yillikIsiIhtiyaci_kWh / (hu * input.sistemVerimi);
  return {
    value: { yakitMiktari_kg: kg },
    intermediates: {
      alt_isil_deger_kWhkg: hu,
      yakit_ton: kg / 1000,
      paket_sayisi: Math.ceil(kg / input.paketAgirligi_kg - 1e-9),
      yillik_maliyet_TL: kg * input.yakitFiyati_TLkg,
      birim_isi_maliyeti_TLkWh: (kg * input.yakitFiyati_TLkg) / input.yillikIsiIhtiyaci_kWh,
    },
    standardsUsed: ["EN ISO 17225-2 (pelet)"],
  };
}

export const yakitTuketimiLpgPeletOdun: CalcModule<YakitTuketimiLpgPeletOdunInput, YakitTuketimiLpgPeletOdunOutput> = {
  id: "yakit-tuketimi-lpg-pelet-odun",
  title: "Yakıt Tüketimi ve Maliyeti (LPG / Pelet / Odun)",
  discipline: "ev",
  standards: [],
  inputSchema: yakitTuketimiLpgPeletOdunInputSchema,
  compute,
};
