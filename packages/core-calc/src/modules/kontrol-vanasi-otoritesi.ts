import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hidronik devrede iki yollu kontrol vanasının otoritesi:
// ΔPv = 100·(Q/Kvs)² kPa (Kvs: 1 bar basınç farkında m³/h, tam açık),
// N = ΔPv / (ΔPv + ΔPdevre). ΔPdevre: debisi vanayla birlikte değişen bölümün
// (batarya + aradaki boru/armatür, fark basınç kontrol noktaları arası) kaybı.
// Yaygın tasarım önerisi N ≥ 0,5; N < 0,25 kontrol kararsızlığı/salınım riski.
// N = 0,5 için gereken Kvs = Q/√(ΔPdevre/100); vanalar R5 dizisi Kvs adımlarıyla
// (1; 1,6; 2,5; 4; 6,3 × 10ⁿ) üretildiğinden bu değeri aşmayan en büyük adım önerilir.
const R5 = [1, 1.6, 2.5, 4, 6.3];
const EPS = 1e-9;

// 10^⌊log ust⌋ ≤ ust olduğundan aynı onlu basamakta en az R5[0] = 1 adımı her zaman uyar.
function standartKvs(ust: number): number {
  const onlu = 10 ** Math.floor(Math.log10(ust) + EPS);
  const adimlar = R5.map((r) => r * onlu).filter((k) => k <= ust * (1 + EPS));
  return adimlar[adimlar.length - 1] ?? onlu;
}

export const kontrolVanasiOtoritesiInputSchema = z.object({
  debi_m3h: z.number().positive(),
  vanaKvs_m3h: z.number().positive(),
  devreBasincKaybi_kPa: z.number().positive(),
});

export type KontrolVanasiOtoritesiInput = z.infer<typeof kontrolVanasiOtoritesiInputSchema>;

export interface KontrolVanasiOtoritesiOutput {
  vanaOtoritesi_N: number;
}

function compute(input: KontrolVanasiOtoritesiInput): CalcResult<KontrolVanasiOtoritesiOutput> {
  const dPv = 100 * (input.debi_m3h / input.vanaKvs_m3h) ** 2;
  const N = dPv / (dPv + input.devreBasincKaybi_kPa);
  const gerekliKvs = input.debi_m3h / Math.sqrt(input.devreBasincKaybi_kPa / 100);
  const onerilenKvs = standartKvs(gerekliKvs);

  const verdict: CalcResult<KontrolVanasiOtoritesiOutput>["verdict"] =
    N >= 0.5 - EPS
      ? { status: "uygun", note: `N = ${N.toFixed(2)} ≥ 0,5: vana debiyi kararlı kontrol eder.` }
      : N >= 0.25
        ? {
            status: "sinirda",
            note: `N = ${N.toFixed(2)}: 0,25–0,5 arası kabul edilebilir ama kısmi yükte kontrol hassasiyeti düşer. N ≥ 0,5 için Kvs ≤ ${gerekliKvs.toFixed(2)} (standart ${onerilenKvs}).`,
          }
        : {
            status: "uygunsuz",
            note: `N = ${N.toFixed(2)} < 0,25: vana aşırı büyük; küçük açıklıklarda salınım (aç-kapa davranışı) beklenir. Kvs ≤ ${gerekliKvs.toFixed(2)} seçin (standart ${onerilenKvs}).`,
          };

  return {
    value: { vanaOtoritesi_N: N },
    intermediates: {
      tam_acik_vana_kaybi_kPa: dPv,
      toplam_kayip_kPa: dPv + input.devreBasincKaybi_kPa,
      otorite_05_icin_gerekli_Kvs: gerekliKvs,
      onerilen_standart_Kvs: onerilenKvs,
    },
    standardsUsed: [],
    verdict,
  };
}

export const kontrolVanasiOtoritesi: CalcModule<KontrolVanasiOtoritesiInput, KontrolVanasiOtoritesiOutput> = {
  id: "kontrol-vanasi-otoritesi",
  title: "Kontrol Vanası Otoritesi",
  discipline: "mekanik",
  standards: [],
  inputSchema: kontrolVanasiOtoritesiInputSchema,
  compute,
};
