import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// NFPA 10 (ve yerelde TS 862/Binaların Yangından Korunması Yönetmeliği)
// portatif yangın söndürücüler için birim kapsama alanı esasına dayanır:
// gerekli sayı = ⌈Alan / Birim Kapsama Alanı⌉. Birim kapsama alanı, tehlike
// sınıfına (hafif/orta/ağır) ve söndürücü kapasitesine göre değişir; tipik
// hafif tehlike (konut) için 2A sınıfı söndürücüde ~280 m².
export const yanginSondurucuSayisiKontroluInputSchema = z.object({
  alan_m2: z.number().positive(),
  birimKapsamaAlani_m2: z.number().positive(),
  mevcutSonducuruSayisi: z.number().int().nonnegative(),
});

export type YanginSondurucuSayisiKontroluInput = z.infer<
  typeof yanginSondurucuSayisiKontroluInputSchema
>;

export interface YanginSondurucuSayisiKontroluOutput {
  gerekliSayi: number;
}

function compute(
  input: YanginSondurucuSayisiKontroluInput,
): CalcResult<YanginSondurucuSayisiKontroluOutput> {
  const gerekliSayi = Math.ceil(input.alan_m2 / input.birimKapsamaAlani_m2);

  return {
    value: { gerekliSayi },
    intermediates: {
      mevcutSonducuruSayisi: input.mevcutSonducuruSayisi,
    },
    standardsUsed: ["NFPA 10"],
    verdict:
      input.mevcutSonducuruSayisi >= gerekliSayi
        ? { status: "uygun", note: "Mevcut söndürücü sayısı yeterli kapsama sağlıyor." }
        : { status: "uygunsuz", note: "Mevcut söndürücü sayısı yetersiz." },
  };
}

export const yanginSondurucuSayisiKontrolu: CalcModule<
  YanginSondurucuSayisiKontroluInput,
  YanginSondurucuSayisiKontroluOutput
> = {
  id: "yangin-sondurucu-sayisi-kontrolu",
  title: "Yangın Söndürücü Sayısı ve Kapsama Kontrolü",
  discipline: "ev",
  standards: ["NFPA 10"],
  inputSchema: yanginSondurucuSayisiKontroluInputSchema,
  compute,
};
