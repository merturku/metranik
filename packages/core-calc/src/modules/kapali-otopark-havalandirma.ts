import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kapalı otopark havalandırması — CO seyreltme (dilüsyon) denklemi:
// Q = G / (Cizin - Cdış). G: toplam CO üretim debisi (araç sayısı × araç başı
// CO üretimi), Cizin: izin verilen iç ortam CO derişimi (ppm), Cdış: dış/temiz
// hava CO derişimi (ppm). Genel taze hava debisi (basit hava değişimi) yerine
// kirletici bazlı seyreltme prensibi kullanılır (ASHRAE 62.1 Ek/NFPA 88A ruhu).
export const kapaliOtoparkHavalandirmaInputSchema = z.object({
  aracSayisi: z.number().positive(),
  aracBasiCOUretimi_m3h: z.number().positive(),
  izinVerilenCO_ppm: z.number().positive(),
  disOrtamCO_ppm: z.number().nonnegative(),
});

export type KapaliOtoparkHavalandirmaInput = z.infer<
  typeof kapaliOtoparkHavalandirmaInputSchema
>;

export interface KapaliOtoparkHavalandirmaOutput {
  gerekliDebi_m3h: number;
}

function compute(
  input: KapaliOtoparkHavalandirmaInput,
): CalcResult<KapaliOtoparkHavalandirmaOutput> {
  const toplamCOUretimiM3h = input.aracSayisi * input.aracBasiCOUretimi_m3h;
  const derisimFarkiPpm = input.izinVerilenCO_ppm - input.disOrtamCO_ppm;
  const gerekliDebiM3h = (toplamCOUretimiM3h * 1e6) / derisimFarkiPpm;

  return {
    value: { gerekliDebi_m3h: gerekliDebiM3h },
    intermediates: {
      toplamCOUretimi_m3h: toplamCOUretimiM3h,
      derisimFarki_ppm: derisimFarkiPpm,
    },
    standardsUsed: [],
  };
}

export const kapaliOtoparkHavalandirma: CalcModule<
  KapaliOtoparkHavalandirmaInput,
  KapaliOtoparkHavalandirmaOutput
> = {
  id: "kapali-otopark-havalandirma",
  title: "Kapalı Otopark Havalandırma",
  discipline: "mekanik",
  standards: [],
  inputSchema: kapaliOtoparkHavalandirmaInputSchema,
  compute,
};
