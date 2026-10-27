import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Soğutma ve nem alma serpantini (ASHRAE Fundamentals Bölüm 1, Psychrometrics):
// 1q2 = ṁda·[(h1 − h2) − (W1 − W2)·hw2],  hw2 ≈ 4,186·t2 (yoğuşan su t2'de ayrılır).
// Duyulur/gizli ayrımı: hx = h(t2, W1) → qduyulur = ṁda(h1 − hx), qgizli = ṁda(hx − h2), SHR = qduyulur/(qd + qg).
// Doyma basıncı Hyland-Wexler (Eş. 5 buz, Eş. 6 su), W = 0,621945·pw/(p − pw),
// h = 1,006·t + W·(2501 + 1,86·t) kJ/kg, v = 0,287042·(t + 273,15)·(1 + 1,607858·W)/p m³/kg kuru hava.
// Hacimsel debi serpantin girişindeki havanın özgül hacmiyle kuru hava kütlesine çevrilir.
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

export const sogutmaSerpantiniYukuInputSchema = z
  .object({
    havaDebisi_m3h: z.number().positive(),
    girisSicakligi_C: z.number().min(-20).max(60),
    girisBagilNem_yuzde: z.number().positive().max(100),
    cikisSicakligi_C: z.number().min(-20).max(60),
    cikisBagilNem_yuzde: z.number().positive().max(100),
    atmosferBasinci_kPa: z.number().min(50).max(110),
  })
  .refine((v) => v.cikisSicakligi_C < v.girisSicakligi_C, {
    message: "Serpantin çıkış sıcaklığı giriş sıcaklığından düşük olmalı",
  });

export type SogutmaSerpantiniYukuInput = z.infer<typeof sogutmaSerpantiniYukuInputSchema>;

export interface SogutmaSerpantiniYukuOutput {
  serpantinYuku_kW: number;
}

function compute(input: SogutmaSerpantiniYukuInput): CalcResult<SogutmaSerpantiniYukuOutput> {
  const p = input.atmosferBasinci_kPa;
  const t1 = input.girisSicakligi_C;
  const t2 = input.cikisSicakligi_C;
  const W1 = nemOrani((input.girisBagilNem_yuzde / 100) * doymaBasinci_kPa(t1), p);
  const W2 = nemOrani((input.cikisBagilNem_yuzde / 100) * doymaBasinci_kPa(t2), p);
  const h1 = entalpi(t1, W1);
  const ma = input.havaDebisi_m3h / 3600 / ozgulHacim(t1, W1, p);

  const nemAlinir = W2 <= W1;
  const W2e = nemAlinir ? W2 : W1;
  const h2e = entalpi(t2, W2e);
  const hx = entalpi(t2, W1);
  const hw2 = 4.186 * t2;
  const yogusma_kgs = ma * (W1 - W2e);
  const duyulur = ma * (h1 - hx);
  const gizli = ma * (hx - h2e);
  const yuk = ma * (h1 - h2e) - yogusma_kgs * hw2;

  // Nem eklenmeden yapılan kuru soğutmada çıkış bağıl nemi giriş nem oranıyla belirlenir.
  const kuruCikisNemi = ((p * W1) / (0.621945 + W1) / doymaBasinci_kPa(t2)) * 100;

  let verdict: CalcResult<SogutmaSerpantiniYukuOutput>["verdict"];
  if (!nemAlinir) {
    verdict = {
      status: "uygunsuz",
      note: `Girilen çıkış durumu girişten nemli (W2 = ${(W2 * 1000).toFixed(2)} > W1 = ${(W1 * 1000).toFixed(2)} g/kg): soğutma serpantini nem ekleyemez. Kuru soğutmada ${t2} °C çıkışta bağıl nem %${kuruCikisNemi.toFixed(1)} olur; yük bu durum için verildi.`,
    };
  }

  return {
    value: { serpantinYuku_kW: yuk },
    intermediates: {
      giris_nem_orani_W1_gkg: W1 * 1000,
      cikis_nem_orani_W2_gkg: W2e * 1000,
      giris_entalpisi_h1_kJkg: h1,
      cikis_entalpisi_h2_kJkg: h2e,
      kuru_hava_debisi_kgs: ma,
      duyulur_yuk_kW: duyulur,
      gizli_yuk_kW: gizli,
      duyulur_isi_orani_SHR: duyulur / (duyulur + gizli),
      yogusan_su_kgh: yogusma_kgs * 3600,
      yogusan_su_entalpi_payi_kW: yogusma_kgs * hw2,
    },
    standardsUsed: ["ASHRAE Fundamentals"],
    verdict,
  };
}

export const sogutmaSerpantiniYuku: CalcModule<SogutmaSerpantiniYukuInput, SogutmaSerpantiniYukuOutput> = {
  id: "sogutma-serpantini-yuku",
  title: "Soğutma Serpantini Yükü (Nem Alma)",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals"],
  inputSchema: sogutmaSerpantiniYukuInputSchema,
  compute,
};
