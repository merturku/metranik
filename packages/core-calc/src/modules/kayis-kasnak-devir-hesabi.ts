import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// V kayış–kasnak sürücüsü: çalıştırılan devir N2 = N1·D1/D2·(1 − kayma), kayış hızı v = π·D1·N1/60000 [m/s],
// kayış boyu L = 2C + π(D1 + D2)/2 + (D1 − D2)²/(4C). Kayma tipik %1–2 (V kayış). Hız sınırı klasik V kayışta ≈ 30 m/s.
// Fan devri değişince debi/basınç/güç için Fan Afinite Yasaları modülü kullanılır.
export const kayisKasnakDevirHesabiInputSchema = z
  .object({
    motorDevri_dk: z.number().positive(),
    motorKasnakCapi_mm: z.number().positive(),
    fanKasnakCapi_mm: z.number().positive(),
    eksenMesafesi_mm: z.number().positive(),
    kaymaYuzde: z.number().min(0).max(5),
  })
  .refine((v) => v.eksenMesafesi_mm > Math.abs(v.motorKasnakCapi_mm - v.fanKasnakCapi_mm) / 2, {
    message: "Eksen mesafesi kasnak çap farkının yarısından büyük olmalı",
  });

export type KayisKasnakDevirHesabiInput = z.infer<typeof kayisKasnakDevirHesabiInputSchema>;

export interface KayisKasnakDevirHesabiOutput {
  fanDevri_dk: number;
}

function compute(input: KayisKasnakDevirHesabiInput): CalcResult<KayisKasnakDevirHesabiOutput> {
  const d1 = input.motorKasnakCapi_mm;
  const d2 = input.fanKasnakCapi_mm;
  const c = input.eksenMesafesi_mm;
  const n2 = ((input.motorDevri_dk * d1) / d2) * (1 - input.kaymaYuzde / 100);
  const v = (Math.PI * d1 * input.motorDevri_dk) / 60000;
  const L = 2 * c + (Math.PI * (d1 + d2)) / 2 + (d1 - d2) ** 2 / (4 * c);
  const sarim = Math.PI - 2 * Math.asin(Math.abs(d2 - d1) / (2 * c));
  const hizUygun = v <= 30;
  return {
    value: { fanDevri_dk: n2 },
    intermediates: {
      devir_orani: d1 / d2,
      kayis_hizi_ms: v,
      kayis_boyu_mm: L,
      kucuk_kasnak_sarim_acisi_derece: (sarim * 180) / Math.PI,
    },
    standardsUsed: ["ISO 4184 (V kayış boyu) / sürücü geometrisi"],
    verdict: {
      status: hizUygun ? "uygun" : "uygunsuz",
      note: hizUygun
        ? `Kayış hızı ${v.toFixed(1)} m/s ≤ 30 m/s.`
        : `Kayış hızı ${v.toFixed(1)} m/s > 30 m/s; motor kasnağını küçültün veya dar kesitli kayış kullanın.`,
    },
  };
}

export const kayisKasnakDevirHesabi: CalcModule<KayisKasnakDevirHesabiInput, KayisKasnakDevirHesabiOutput> = {
  id: "kayis-kasnak-devir-hesabi",
  title: "Kayış–Kasnak Devir ve Kayış Boyu Hesabı",
  discipline: "mekanik",
  standards: ["ISO 4184"],
  inputSchema: kayisKasnakDevirHesabiInputSchema,
  compute,
};
