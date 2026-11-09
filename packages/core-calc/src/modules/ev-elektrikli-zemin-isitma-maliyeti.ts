import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Elektrikli yerden ısıtma (mat/kablo) gücü ve işletme maliyeti: P = q·A (kW = W/m² × m²/1000),
// günlük enerji = P·t·λ (λ termostat çalışma oranı/yük faktörü), aylık = günlük × gün, maliyet = enerji × birim fiyat.
// q yalıtım ve oda ısı kaybına göre seçilir (konut ana ısıtmada tipik 100–150 W/m², konfor/ek ısıtmada 60–100 W/m²; üretici/proje değeri girdidir).
// Isı kaybı ve gerekli güç için Isıtma Yükü / Pencere-Duvar Isı Kaybı modüllerini kullanın.
export const evElektrikliZeminIsitmaMaliyetiInputSchema = z.object({
  guc_yogunlugu_Wm2: z.number().positive(),
  alan_m2: z.number().positive(),
  gunlukSaat_h: z.number().positive().max(24),
  calismaOrani: z.number().gt(0).max(1),
  aylikGun: z.number().int().min(1).max(31),
  birimFiyat_TLkWh: z.number().min(0),
});

export type EvElektrikliZeminIsitmaMaliyetiInput = z.infer<typeof evElektrikliZeminIsitmaMaliyetiInputSchema>;

export interface EvElektrikliZeminIsitmaMaliyetiOutput {
  aylikMaliyet_TL: number;
}

function compute(input: EvElektrikliZeminIsitmaMaliyetiInput): CalcResult<EvElektrikliZeminIsitmaMaliyetiOutput> {
  const p = (input.guc_yogunlugu_Wm2 * input.alan_m2) / 1000;
  const gunluk = p * input.gunlukSaat_h * input.calismaOrani;
  const aylik = gunluk * input.aylikGun;
  return {
    value: { aylikMaliyet_TL: aylik * input.birimFiyat_TLkWh },
    intermediates: {
      kurulu_guc_kW: p,
      gunluk_enerji_kWh: gunluk,
      aylik_enerji_kWh: aylik,
      faz_basina_akim_A_230V: (p * 1000) / 230,
    },
    standardsUsed: [],
  };
}

export const evElektrikliZeminIsitmaMaliyeti: CalcModule<EvElektrikliZeminIsitmaMaliyetiInput, EvElektrikliZeminIsitmaMaliyetiOutput> = {
  id: "ev-elektrikli-zemin-isitma-maliyeti",
  title: "Elektrikli Yerden Isıtma Gücü ve Aylık Maliyet",
  discipline: "ev",
  standards: [],
  inputSchema: evElektrikliZeminIsitmaMaliyetiInputSchema,
  compute,
};
