import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Durgun su dolu borunun donma sıcaklığına inme süresi (toplu kapasite / ısıl zaman sabiti):
// C' = ρ·c·A_iç (J/m·K, yalnız su; boru çeperi ihmal),  τ = C'/U' (U' boyca ısı kaybı katsayısı, W/m·K),
// t = τ·ln[(Ti − Te)/(Tf − Te)].  Te ≥ Tf ise su donma sıcaklığına inmez (süre sonsuz).
// Yalnız 0 °C'ye ulaşma süresidir; gizli ısı nedeniyle tam donma daha uzun sürer, ancak buz tıkacı/çatlama riski 0 °C'den itibaren başlar.
// U' izolasyonlu boru için Boru Isı Kaybı (izolasyon) modülüyle hesaplanabilir; rüzgâr/hava hareketi U'yu artırır.
const RHO_C_SU = 998 * 4180; // J/m³K

export const boruDonmaSuresiInputSchema = z.object({
  icCap_mm: z.number().positive(),
  boyIsiKaybiKatsayisi_WmK: z.number().positive(),
  baslangicSicakligi_C: z.number(),
  disSicaklik_C: z.number(),
  donmaSicakligi_C: z.number(),
});

export type BoruDonmaSuresiInput = z.infer<typeof boruDonmaSuresiInputSchema>;

export interface BoruDonmaSuresiOutput {
  sure_saat: number | null;
}

function compute(input: BoruDonmaSuresiInput): CalcResult<BoruDonmaSuresiOutput> {
  const a = (Math.PI * (input.icCap_mm / 1000) ** 2) / 4;
  const cPrime = RHO_C_SU * a;
  const tau = cPrime / input.boyIsiKaybiKatsayisi_WmK;
  const standards = ["Toplu kapasite (lumped) modeli, Newton soğuma yasası"];
  if (input.baslangicSicakligi_C <= input.donmaSicakligi_C) {
    return {
      value: { sure_saat: 0 },
      intermediates: { zaman_sabiti_saat: tau / 3600 },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Su zaten donma sıcaklığında veya altında." },
    };
  }
  if (input.disSicaklik_C >= input.donmaSicakligi_C) {
    return {
      value: { sure_saat: null },
      intermediates: { zaman_sabiti_saat: tau / 3600, not: "Dış sıcaklık donma sıcaklığının altına inmiyor" },
      standardsUsed: standards,
      verdict: { status: "uygun", note: "Dış sıcaklık donma sıcaklığının üstünde; donma beklenmez." },
    };
  }
  const t = tau * Math.log((input.baslangicSicakligi_C - input.disSicaklik_C) / (input.donmaSicakligi_C - input.disSicaklik_C));
  return {
    value: { sure_saat: t / 3600 },
    intermediates: {
      zaman_sabiti_saat: tau / 3600,
      boy_basina_isil_kapasite_JmK: cPrime,
      sure_dakika: t / 60,
    },
    standardsUsed: standards,
    verdict: {
      status: t / 3600 < 6 ? "uygunsuz" : t / 3600 < 24 ? "sinirda" : "uygun",
      note: "Süre 6 saatten kısaysa donma riski yüksek (yalıtım/ısıtma kablosu/sirkülasyon); 6–24 saat sınırda (pratik eşik, projeye göre belirleyin).",
    },
  };
}

export const boruDonmaSuresi: CalcModule<BoruDonmaSuresiInput, BoruDonmaSuresiOutput> = {
  id: "boru-donma-suresi",
  title: "Boru İçi Suyun Donma Süresi (Isıl Zaman Sabiti)",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruDonmaSuresiInputSchema,
  compute,
};
