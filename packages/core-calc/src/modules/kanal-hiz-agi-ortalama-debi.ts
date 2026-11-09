import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kanal kesiti hız taraması (ölçüm ağı): ortalama hız V̄ = Σvᵢ/n, debi Q = V̄·A; standart sapma ve değişim katsayısı hız dağılımının düzgünlüğünü verir.
// Ölçüm noktaları eşit alanlı bölgelerin merkezlerinde (veya log-Tchebycheff dağılımıyla, ISO 3966/ASHRAE 111) alınmalı, en az 6–10 nokta ve düz kanal
// bölümünde (akış yönünde ≥ 7,5 D, öncesinde ≥ 3 D) ölçüm yapılmalıdır. Noktalar dinamik basınçtan hesaplanmış hızlar olabilir (Pitot Tüpü modülü).
// Boş noktalar için 0 girmeyin; kullanılmayan noktaları boş değer yerine tekrar etmeyin (yalnız ölçülen noktalar için hız girin, kalanlar 0 ise sayılmaz).
export const kanalHizAgiOrtalamaDebiInputSchema = z.object({
  kesitAlani_m2: z.number().positive(),
  v1: z.number().min(0),
  v2: z.number().min(0),
  v3: z.number().min(0),
  v4: z.number().min(0),
  v5: z.number().min(0),
  v6: z.number().min(0),
  tasarimDebisi_m3h: z.number().min(0),
});

export type KanalHizAgiOrtalamaDebiInput = z.infer<typeof kanalHizAgiOrtalamaDebiInputSchema>;

export interface KanalHizAgiOrtalamaDebiOutput {
  debi_m3h: number;
}

function compute(input: KanalHizAgiOrtalamaDebiInput): CalcResult<KanalHizAgiOrtalamaDebiOutput> {
  const v = [input.v1, input.v2, input.v3, input.v4, input.v5, input.v6].filter((x) => x > 0);
  const n = v.length;
  if (n === 0) {
    return {
      value: { debi_m3h: 0 },
      intermediates: { not: "En az bir ölçüm noktası girilmeli" },
      standardsUsed: ["ISO 3966 / ASHRAE 111 (hız taraması)"],
      verdict: { status: "uygunsuz", note: "Ölçüm noktası yok." },
    };
  }
  const mean = v.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  const q = mean * input.kesitAlani_m2 * 3600;
  const sapma = input.tasarimDebisi_m3h > 0 ? ((q - input.tasarimDebisi_m3h) / input.tasarimDebisi_m3h) * 100 : null;
  const durum = sapma === null ? undefined : Math.abs(sapma) <= 10 ? "uygun" : Math.abs(sapma) <= 15 ? "sinirda" : "uygunsuz";
  return {
    value: { debi_m3h: q },
    intermediates: {
      nokta_sayisi: n,
      ortalama_hiz_ms: mean,
      standart_sapma_ms: sd,
      degisim_katsayisi_yuzde: (sd / mean) * 100,
      debi_m3s: mean * input.kesitAlani_m2,
      tasarim_debisinden_sapma_yuzde: sapma ?? "—",
    },
    standardsUsed: ["ISO 3966 / ASHRAE 111 (kanal hız taraması)"],
    verdict: durum
      ? { status: durum, note: durum === "uygun" ? "Ölçülen debi tasarımın ±%10'u içinde." : durum === "sinirda" ? "Sapma %10–15: damper/fan ayarını gözden geçirin." : "Sapma %15'i aşıyor: dengeleme gerekli." }
      : undefined,
  };
}

export const kanalHizAgiOrtalamaDebi: CalcModule<KanalHizAgiOrtalamaDebiInput, KanalHizAgiOrtalamaDebiOutput> = {
  id: "kanal-hiz-agi-ortalama-debi",
  title: "Kanal Hız Taraması — Ortalama Hız ve Debi",
  discipline: "mekanik",
  standards: ["ISO 3966"],
  inputSchema: kanalHizAgiOrtalamaDebiInputSchema,
  compute,
};
