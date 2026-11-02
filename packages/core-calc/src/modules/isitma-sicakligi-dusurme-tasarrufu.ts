import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İç sıcaklık düşürmenin ısıtma enerjisine etkisi: ısı kaybı (iletim + havalandırma) iç–dış sıcaklık farkıyla
// orantılıdır → tasarruf oranı = (Ti − Ti') / (Ti − Te,ort), Te,ort ısıtma sezonu ortalama dış sıcaklığı.
// Sabit dış sıcaklıkta doğrusal modeldir; iç kazançlar ve ısı ataleti ihmal edilir (yaygın "°C başına ≈ %6" kuralının fiziksel temeli).
export const isitmaSicakligiDusurmeTasarrufuInputSchema = z
  .object({
    mevcutIcSicaklik_C: z.number().min(10).max(30),
    yeniIcSicaklik_C: z.number().min(10).max(30),
    sezonOrtalamaDisSicaklik_C: z.number().min(-20).max(15),
    yillikIsitmaEnerjisi_kWh: z.number().positive(),
    birimEnerjiFiyati_TLkWh: z.number().min(0),
  })
  .refine((v) => v.sezonOrtalamaDisSicaklik_C < v.yeniIcSicaklik_C && v.yeniIcSicaklik_C <= v.mevcutIcSicaklik_C, {
    message: "Dış < yeni iç ≤ mevcut iç sıcaklık olmalı",
  });

export type IsitmaSicakligiDusurmeTasarrufuInput = z.infer<typeof isitmaSicakligiDusurmeTasarrufuInputSchema>;

export interface IsitmaSicakligiDusurmeTasarrufuOutput {
  tasarrufOrani_yuzde: number;
}

function compute(input: IsitmaSicakligiDusurmeTasarrufuInput): CalcResult<IsitmaSicakligiDusurmeTasarrufuOutput> {
  const oran = (input.mevcutIcSicaklik_C - input.yeniIcSicaklik_C) / (input.mevcutIcSicaklik_C - input.sezonOrtalamaDisSicaklik_C);
  const enerji = input.yillikIsitmaEnerjisi_kWh * oran;
  return {
    value: { tasarrufOrani_yuzde: oran * 100 },
    intermediates: {
      sicaklik_dusurmesi_K: input.mevcutIcSicaklik_C - input.yeniIcSicaklik_C,
      yillik_enerji_tasarrufu_kWh: enerji,
      yillik_para_tasarrufu_TL: enerji * input.birimEnerjiFiyati_TLkWh,
      derece_basina_tasarruf_yuzde:
        input.mevcutIcSicaklik_C === input.yeniIcSicaklik_C ? 0 : (oran * 100) / (input.mevcutIcSicaklik_C - input.yeniIcSicaklik_C),
      yeni_yillik_enerji_kWh: input.yillikIsitmaEnerjisi_kWh - enerji,
    },
    standardsUsed: ["Isı kaybı ∝ ΔT (TS 825 iletim/havalandırma kaybı)"],
  };
}

export const isitmaSicakligiDusurmeTasarrufu: CalcModule<IsitmaSicakligiDusurmeTasarrufuInput, IsitmaSicakligiDusurmeTasarrufuOutput> = {
  id: "isitma-sicakligi-dusurme-tasarrufu",
  title: "İç Sıcaklık Düşürme ile Isıtma Tasarrufu",
  discipline: "ev",
  standards: ["TS 825"],
  inputSchema: isitmaSicakligiDusurmeTasarrufuInputSchema,
  compute,
};
