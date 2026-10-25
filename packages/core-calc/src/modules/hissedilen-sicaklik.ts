import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hissedilen sıcaklık: soğukta rüzgar soğuğu, sıcakta ısı indeksi.
// Rüzgar soğuğu (NWS/Environment Canada 2001, T ≤ 10 °C ve V > 4,8 km/h):
//   WCI = 13,12 + 0,6215T − 11,37V^0,16 + 0,3965T·V^0,16  (°C, km/h, 10 m rüzgar hızı)
// Isı indeksi (NWS, Rothfusz regresyonu, T ≥ 26,7 °C = 80 °F), °F ve % ile:
//   önce basit Steadman formülü HI = 0,5·[T + 61 + 1,2(T − 68) + 0,094RH]; bunun T ile
//   ortalaması ≥ 80 °F ise tam regresyon ve NWS'nin düşük/yüksek nem düzeltmeleri.
// Risk kategorileri: ısı indeksi NWS (80/90/103/125 °F), rüzgar soğuğu Environment
// Canada (−10/−28/−40/−48/−55 °C). Isı indeksi gölge ve hafif rüzgar içindir; doğrudan
// güneşte değer 8 °C'ye kadar yükselebilir.
const cToF = (c: number) => c * 1.8 + 32;
const fToC = (f: number) => (f - 32) / 1.8;

function isiIndeksiF(T: number, RH: number): number {
  const basit = 0.5 * (T + 61 + (T - 68) * 1.2 + RH * 0.094);
  if ((basit + T) / 2 < 80) return basit;
  let hi =
    -42.379 +
    2.04901523 * T +
    10.14333127 * RH -
    0.22475541 * T * RH -
    0.00683783 * T * T -
    0.05481717 * RH * RH +
    0.00122874 * T * T * RH +
    0.00085282 * T * RH * RH -
    0.00000199 * T * T * RH * RH;
  if (RH < 13 && T >= 80 && T <= 112) hi -= ((13 - RH) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
  if (RH > 85 && T >= 80 && T <= 87) hi += ((RH - 85) / 10) * ((87 - T) / 5);
  return hi;
}

export const hissedilenSicaklikInputSchema = z.object({
  havaSicakligi_C: z.number().min(-50).max(55),
  bagilNem_yuzde: z.number().min(0).max(100),
  ruzgarHizi_kmh: z.number().min(0),
});

export type HissedilenSicaklikInput = z.infer<typeof hissedilenSicaklikInputSchema>;

export interface HissedilenSicaklikOutput {
  hissedilenSicaklik_C: number;
}

function compute(input: HissedilenSicaklikInput): CalcResult<HissedilenSicaklikOutput> {
  const T = input.havaSicakligi_C;
  const V = input.ruzgarHizi_kmh;
  type Verdict = NonNullable<CalcResult<HissedilenSicaklikOutput>["verdict"]>;

  if (T <= 10 && V > 4.8) {
    const v16 = V ** 0.16;
    const wci = 13.12 + 0.6215 * T - 11.37 * v16 + 0.3965 * T * v16;
    const w = Math.round(wci);
    const verdict: Verdict =
      w > -10
        ? { status: "uygun", note: `Rüzgar soğuğu ${w}: düşük risk.` }
        : w >= -27
          ? { status: "sinirda", note: `Rüzgar soğuğu ${w}: orta risk — korunmasız uzun sürede hipotermi riski; katmanlı giyinin.` }
          : {
              status: "uygunsuz",
              note:
                w >= -39
                  ? `Rüzgar soğuğu ${w}: yüksek risk — açık deri 10–30 dakikada donabilir.`
                  : w >= -47
                    ? `Rüzgar soğuğu ${w}: çok yüksek risk — açık deri 5–10 dakikada donabilir.`
                    : w >= -54
                      ? `Rüzgar soğuğu ${w}: ciddi risk — açık deri 2–5 dakikada donabilir.`
                      : `Rüzgar soğuğu ${w}: aşırı risk — açık deri 2 dakikadan kısa sürede donabilir.`,
            };
    return {
      value: { hissedilenSicaklik_C: wci },
      intermediates: { kullanilan_yontem: "Rüzgar soğuğu (NWS/EC 2001)", hava_ile_fark_K: wci - T },
      standardsUsed: ["NWS / Environment Canada Rüzgar Soğuğu (2001)"],
      verdict,
    };
  }

  if (T >= fToC(80)) {
    const hiF = isiIndeksiF(cToF(T), input.bagilNem_yuzde);
    const hi = fToC(hiF);
    const verdict: Verdict =
      hiF < 80
        ? { status: "uygun", note: `Isı indeksi ${hi.toFixed(1)} °C: ısı stresi beklenmez.` }
        : hiF < 90
          ? { status: "sinirda", note: `Isı indeksi ${hi.toFixed(1)} °C — Dikkat: uzun süreli maruziyette yorgunluk.` }
          : hiF < 103
            ? {
                status: "sinirda",
                note: `Isı indeksi ${hi.toFixed(1)} °C — Aşırı dikkat: güneş çarpması/ısı krampı olası; su için, gölgede dinlenin.`,
              }
            : hiF < 125
              ? {
                  status: "uygunsuz",
                  note: `Isı indeksi ${hi.toFixed(1)} °C — Tehlike: sıcak çarpması olası; ağır fiziksel işten kaçının.`,
                }
              : { status: "uygunsuz", note: `Isı indeksi ${hi.toFixed(1)} °C — Aşırı tehlike: sıcak çarpması yüksek olasılıkla.` };
    return {
      value: { hissedilenSicaklik_C: hi },
      intermediates: { kullanilan_yontem: "Isı indeksi (NWS Rothfusz)", isi_indeksi_F: hiF, hava_ile_fark_K: hi - T },
      standardsUsed: ["NWS Isı İndeksi (Rothfusz)"],
      verdict,
    };
  }

  return {
    value: { hissedilenSicaklik_C: T },
    intermediates: { kullanilan_yontem: "Düzeltme yok (10 °C < T < 26,7 °C veya rüzgarsız)", hava_ile_fark_K: 0 },
    standardsUsed: [],
    verdict: { status: "uygun", note: "Isı indeksi veya rüzgar soğuğu düzeltmesi gerektirmeyen koşul." },
  };
}

export const hissedilenSicaklik: CalcModule<HissedilenSicaklikInput, HissedilenSicaklikOutput> = {
  id: "hissedilen-sicaklik",
  title: "Hissedilen Sıcaklık (Isı İndeksi / Rüzgar Soğuğu)",
  discipline: "ev",
  standards: ["NWS Isı İndeksi (Rothfusz)", "NWS / Environment Canada Rüzgar Soğuğu (2001)"],
  inputSchema: hissedilenSicaklikInputSchema,
  compute,
};
