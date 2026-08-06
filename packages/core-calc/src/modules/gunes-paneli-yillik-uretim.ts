import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çatı güneş paneli (GES) yıllık enerji üretim tahmini — gunes-paneli-kapasite-hesabi'nin
// tersi: tüketimden gerekli gücü bulmak yerine, kurulu güçten yıllık üretimi bulur.
// YıllıkÜretim = KuruluGüç × GünlükGüneşlenmeSaati × PerformansOranı × 365.
// Performans oranı; invertör, kablo, sıcaklık ve kirlilik kayıplarını tek katsayıda toplar.
export const gunesPaneliYillikUretimInputSchema = z.object({
  kuruluGuc_kWp: z.number().positive(),
  guneslenmeSaati_h: z.number().positive(),
  performansOrani: z.number().positive().max(1),
});

export type GunesPaneliYillikUretimInput = z.infer<
  typeof gunesPaneliYillikUretimInputSchema
>;

export interface GunesPaneliYillikUretimOutput {
  yillikUretim_kWh: number;
}

function compute(
  input: GunesPaneliYillikUretimInput,
): CalcResult<GunesPaneliYillikUretimOutput> {
  const gunlukUretimKWh =
    input.kuruluGuc_kWp * input.guneslenmeSaati_h * input.performansOrani;
  const yillikUretimKWh = gunlukUretimKWh * 365;

  return {
    value: { yillikUretim_kWh: yillikUretimKWh },
    intermediates: {
      gunlukUretim_kWh: gunlukUretimKWh,
    },
    standardsUsed: [],
  };
}

export const gunesPaneliYillikUretim: CalcModule<
  GunesPaneliYillikUretimInput,
  GunesPaneliYillikUretimOutput
> = {
  id: "gunes-paneli-yillik-uretim",
  title: "Güneş Paneli Yıllık Enerji Üretimi",
  discipline: "ev",
  standards: [],
  inputSchema: gunesPaneliYillikUretimInputSchema,
  compute,
};
