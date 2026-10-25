import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Üç fazlı sistemde ölçülen üç hat (faz-faz) geriliminden gerilim dengesizliği.
// IEC 61000-4-30: ters bileşen / doğru bileşen oranı, yalnız hat gerilimi
// genliklerinden kesin olarak:
//   β = (Vab⁴ + Vbc⁴ + Vca⁴)/(Vab² + Vbc² + Vca²)²,  u2 = √[(1 − √(3 − 6β))/(1 + √(3 − 6β))]
// NEMA MG 1 §14.36 tanımı (LVUR): ortalamadan en büyük sapma / ortalama.
// NEMA'ya göre en yüksek akımlı faz sargısındaki sıcaklık artışının yüzde artışı
// yaklaşık 2·(dengesizlik %)²'dir. Değerlendirme EN 50160 / IEC 61000-2-2 uyumluluk
// seviyesine göre: u2 ≤ %2 olağan; tek fazlı yükü yoğun bölgelerde %3'e kadar görülebilir.
export const gerilimDengesizligiKontroluInputSchema = z
  .object({
    hatGerilimiAB_V: z.number().positive(),
    hatGerilimiBC_V: z.number().positive(),
    hatGerilimiCA_V: z.number().positive(),
  })
  .refine(
    (v) => {
      const [a, b, c] = [v.hatGerilimiAB_V, v.hatGerilimiBC_V, v.hatGerilimiCA_V];
      return a < b + c && b < a + c && c < a + b;
    },
    { message: "Üç hat gerilimi bir üçgen oluşturmalı (her biri diğer ikisinin toplamından küçük)" },
  );

export type GerilimDengesizligiKontroluInput = z.infer<typeof gerilimDengesizligiKontroluInputSchema>;

export interface GerilimDengesizligiKontroluOutput {
  dengesizlikOrani_u2_yuzde: number;
}

function compute(input: GerilimDengesizligiKontroluInput): CalcResult<GerilimDengesizligiKontroluOutput> {
  const V = [input.hatGerilimiAB_V, input.hatGerilimiBC_V, input.hatGerilimiCA_V];
  const kareToplam = V.reduce((s, x) => s + x * x, 0);
  const beta = V.reduce((s, x) => s + x ** 4, 0) / kareToplam ** 2;
  const kok = Math.sqrt(Math.max(0, 3 - 6 * beta));
  const u2 = Math.sqrt(Math.max(0, (1 - kok) / (1 + kok))) * 100;

  const ortalama = (V[0]! + V[1]! + V[2]!) / 3;
  const maksSapma = Math.max(...V.map((x) => Math.abs(x - ortalama)));
  const lvur = (maksSapma / ortalama) * 100;

  const verdict: CalcResult<GerilimDengesizligiKontroluOutput>["verdict"] =
    u2 <= 2
      ? { status: "uygun", note: `u2 = %${u2.toFixed(2)} ≤ %2 (EN 50160 / IEC 61000-2-2 uyumluluk seviyesi).` }
      : u2 <= 3
        ? {
            status: "sinirda",
            note: `u2 = %${u2.toFixed(2)}: %2'nin üstünde, tek fazlı yükü yoğun şebekelerde görülen %3 sınırının altında. Fazlar arası yük dağılımını dengeleyin; motorlar için NEMA MG 1 güç düşürme eğrisini uygulayın.`,
          }
        : {
            status: "uygunsuz",
            note: `u2 = %${u2.toFixed(2)} > %3: motor sargılarında aşırı ısınma riski. Tek fazlı yükleri yeniden dağıtın, gevşek bağlantı/arızalı kondansatör kademesi arayın; NEMA %5 üzerinde motor işletmeyi önermez.`,
          };

  return {
    value: { dengesizlikOrani_u2_yuzde: u2 },
    intermediates: {
      ortalama_hat_gerilimi_V: ortalama,
      ortalamadan_maks_sapma_V: maksSapma,
      nema_lvur_yuzde: lvur,
      beta_katsayisi: beta,
      motor_sicaklik_artisi_artis_yuzde: 2 * lvur * lvur,
    },
    standardsUsed: ["IEC 61000-4-30", "EN 50160", "NEMA MG 1 §14.36"],
    verdict,
  };
}

export const gerilimDengesizligiKontrolu: CalcModule<
  GerilimDengesizligiKontroluInput,
  GerilimDengesizligiKontroluOutput
> = {
  id: "gerilim-dengesizligi-kontrolu",
  title: "Gerilim Dengesizliği Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 61000-4-30", "EN 50160", "NEMA MG 1 §14.36"],
  inputSchema: gerilimDengesizligiKontroluInputSchema,
  compute,
};
