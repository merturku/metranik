import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İki hava akımının (örn. taze + dönüş havası) adyabatik karışımı, ASHRAE
// Fundamentals Bölüm 1 (Psychrometrics): kuru hava kütlesi, nem ve entalpi
// korunur — ṁ3 = ṁ1 + ṁ2, ṁ3·W3 = ṁ1·W1 + ṁ2·W2, ṁ3·h3 = ṁ1·h1 + ṁ2·h2.
// Doyma basıncı Hyland-Wexler bağıntısı (Eş. 5 buz, Eş. 6 su), nem oranı
// W = 0,621945·pw/(p − pw), entalpi h = 1,006·t + W·(2501 + 1,86·t) kJ/kg,
// özgül hacim v = 0,287042·(t + 273,15)·(1 + 1,607858·W)/p m³/kg kuru hava.
// Hacimsel debiler kuru hava kütlesine her akımın kendi özgül hacmiyle çevrilir.
// Karışım yaş termometre sıcaklığı Eş. 35 (t* ≥ 0) / Eş. 37 (t* < 0) ikiye bölmeyle çözülür.
function doymaBasinci_kPa(t: number): number {
  const T = t + 273.15;
  const lnPws =
    t >= 0
      ? -5.8002206e3 / T + 1.3914993 - 4.8640239e-2 * T + 4.1764768e-5 * T ** 2 - 1.4452093e-8 * T ** 3 +
        6.5459673 * Math.log(T)
      : -5.6745359e3 / T + 6.3925247 - 9.677843e-3 * T + 6.2215701e-7 * T ** 2 + 2.0747825e-9 * T ** 3 -
        9.484024e-13 * T ** 4 + 4.1635019 * Math.log(T);
  return Math.exp(lnPws) / 1000;
}

const nemOrani = (pw: number, p: number) => (0.621945 * pw) / (p - pw);
const entalpi = (t: number, W: number) => 1.006 * t + W * (2501 + 1.86 * t);
const ozgulHacim = (t: number, W: number, p: number) => (0.287042 * (t + 273.15) * (1 + 1.607858 * W)) / p;

function yasTermometre(t: number, W: number, p: number): number {
  let alt = -60;
  let ust = t;
  for (let i = 0; i < 80; i++) {
    const ts = (alt + ust) / 2;
    const Ws = nemOrani(doymaBasinci_kPa(ts), p);
    const Wts =
      ts >= 0
        ? ((2501 - 2.326 * ts) * Ws - 1.006 * (t - ts)) / (2501 + 1.86 * t - 4.186 * ts)
        : ((2830 - 0.24 * ts) * Ws - 1.006 * (t - ts)) / (2830 + 1.86 * t - 2.1 * ts);
    if (Wts > W) ust = ts;
    else alt = ts;
  }
  return (alt + ust) / 2;
}

const sicaklik = z.number().min(-50).max(90);

export const havaKarisimNoktasiInputSchema = z.object({
  akim1Debisi_m3s: z.number().positive(),
  akim1Sicakligi_C: sicaklik,
  akim1BagilNem_yuzde: z.number().positive().max(100),
  akim2Debisi_m3s: z.number().positive(),
  akim2Sicakligi_C: sicaklik,
  akim2BagilNem_yuzde: z.number().positive().max(100),
  atmosferBasinci_kPa: z.number().min(50).max(110),
});

export type HavaKarisimNoktasiInput = z.infer<typeof havaKarisimNoktasiInputSchema>;

export interface HavaKarisimNoktasiOutput {
  karisimSicakligi_C: number;
}

function compute(input: HavaKarisimNoktasiInput): CalcResult<HavaKarisimNoktasiOutput> {
  const p = input.atmosferBasinci_kPa;
  const t1 = input.akim1Sicakligi_C;
  const t2 = input.akim2Sicakligi_C;
  const W1 = nemOrani((input.akim1BagilNem_yuzde / 100) * doymaBasinci_kPa(t1), p);
  const W2 = nemOrani((input.akim2BagilNem_yuzde / 100) * doymaBasinci_kPa(t2), p);
  const m1 = input.akim1Debisi_m3s / ozgulHacim(t1, W1, p);
  const m2 = input.akim2Debisi_m3s / ozgulHacim(t2, W2, p);
  const m3 = m1 + m2;

  const W3 = (m1 * W1 + m2 * W2) / m3;
  const h3 = (m1 * entalpi(t1, W1) + m2 * entalpi(t2, W2)) / m3;
  const t3 = (h3 - 2501 * W3) / (1.006 + 1.86 * W3);
  const pw3 = (p * W3) / (0.621945 + W3);
  const RH3 = (pw3 / doymaBasinci_kPa(t3)) * 100;

  const verdict: CalcResult<HavaKarisimNoktasiOutput>["verdict"] =
    RH3 < 100
      ? { status: "uygun", note: `Karışım doymamış (φ3 = %${RH3.toFixed(1)}); yoğuşma/sis oluşmaz.` }
      : {
          status: "uygunsuz",
          note: `Karışım doyma eğrisinin ötesinde (hesaplanan φ3 = %${RH3.toFixed(0)}): karışım kutusunda sis/yoğuşma oluşur ve gerçek sıcaklık hesaplanandan biraz yüksektir. Taze havayı karışımdan önce ön ısıtın.`,
        };

  return {
    value: { karisimSicakligi_C: t3 },
    intermediates: {
      akim1_nem_orani_g_kg: W1 * 1000,
      akim2_nem_orani_g_kg: W2 * 1000,
      akim1_kuru_hava_kg_s: m1,
      akim2_kuru_hava_kg_s: m2,
      akim1_kutle_orani_yuzde: (m1 / m3) * 100,
      karisim_nem_orani_g_kg: W3 * 1000,
      karisim_entalpisi_kJ_kg: h3,
      karisim_bagil_nemi_yuzde: RH3,
      karisim_yas_termometre_C: RH3 < 100 ? yasTermometre(t3, W3, p) : t3,
      karisim_hacimsel_debi_m3s: m3 * ozgulHacim(t3, W3, p),
    },
    standardsUsed: ["ASHRAE Fundamentals Bölüm 1 (Psikrometri)"],
    verdict,
  };
}

export const havaKarisimNoktasi: CalcModule<HavaKarisimNoktasiInput, HavaKarisimNoktasiOutput> = {
  id: "hava-karisim-noktasi",
  title: "Hava Karışım Noktası (Taze + Dönüş Havası)",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals Bölüm 1 (Psikrometri)"],
  inputSchema: havaKarisimNoktasiInputSchema,
  compute,
};
