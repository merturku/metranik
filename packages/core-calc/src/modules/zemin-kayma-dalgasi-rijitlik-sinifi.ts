import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kayma dalgası hızından zemin rijitliği: G = ρ·Vs² (küçük şekil değiştirme kayma modülü Gmaks), E = 2·G·(1 + ν), M (sıkışma modülü) = ρ·Vp².
// Zemin sınıfı Vs30'a göre (TBDY 2018 Tablo 16.1 yaklaşık eşikleri): ZA > 1500, ZB 760–1500, ZC 360–760, ZD 180–360, ZE < 180 m/s; sınıf tanımı yalnız Vs30 için
// (girilen Vs, üst 30 m ortalama kayma dalgası hızı ise) geçerlidir; ZF özel çalışma gerektirir. Eşikleri yönetmelikten teyit edin. Büyük şekil değiştirmede
// (deprem/temel yükü) G, Gmaks'tan çok daha düşüktür (G/Gmaks azalım eğrisi gerekir).
export const zeminKaymaDalgasiRijitlikSinifiInputSchema = z.object({
  kaymaDalgasiHizi_Vs_ms: z.number().positive(),
  yogunluk_kgm3: z.number().positive(),
  poisson_nu: z.number().min(0).max(0.5),
  vs30_ms: z.number().positive(),
});

export type ZeminKaymaDalgasiRijitlikSinifiInput = z.infer<typeof zeminKaymaDalgasiRijitlikSinifiInputSchema>;

export interface ZeminKaymaDalgasiRijitlikSinifiOutput {
  kaymaModulu_MPa: number;
}

function sinif(vs30: number): string {
  if (vs30 > 1500) return "ZA";
  if (vs30 > 760) return "ZB";
  if (vs30 > 360) return "ZC";
  if (vs30 > 180) return "ZD";
  return "ZE";
}

function compute(input: ZeminKaymaDalgasiRijitlikSinifiInput): CalcResult<ZeminKaymaDalgasiRijitlikSinifiOutput> {
  const g = (input.yogunluk_kgm3 * input.kaymaDalgasiHizi_Vs_ms ** 2) / 1e6;
  const e = 2 * g * (1 + input.poisson_nu);
  const vp = input.kaymaDalgasiHizi_Vs_ms * Math.sqrt((2 * (1 - input.poisson_nu)) / (1 - 2 * input.poisson_nu));
  return {
    value: { kaymaModulu_MPa: g },
    intermediates: {
      elastisite_modulu_MPa: e,
      sikisma_dalgasi_hizi_Vp_ms: Number.isFinite(vp) ? vp : "ν = 0,5: sonsuz (sıkıştırılamaz)",
      zemin_sinifi: sinif(input.vs30_ms),
      vs30_ms: input.vs30_ms,
    },
    standardsUsed: ["Elastik dalga teorisi G = ρVs²", "TBDY 2018 Tablo 16.1 (zemin sınıfları; eşikler teyit edilmeli)"],
  };
}

export const zeminKaymaDalgasiRijitlikSinifi: CalcModule<ZeminKaymaDalgasiRijitlikSinifiInput, ZeminKaymaDalgasiRijitlikSinifiOutput> = {
  id: "zemin-kayma-dalgasi-rijitlik-sinifi",
  title: "Kayma Dalgası Hızından Zemin Rijitliği ve Zemin Sınıfı",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: zeminKaymaDalgasiRijitlikSinifiInputSchema,
  compute,
};
