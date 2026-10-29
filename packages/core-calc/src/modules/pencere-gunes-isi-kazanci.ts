import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Cam yüzeyden güneş ısı kazancı (ASHRAE Fundamentals, Fenestration, SHGC yöntemi):
// Q = A·SHGC·Et·Fg,  Et = pencere düzlemine gelen toplam güneş ışınımı (W/m²),
// SHGC güneş ısı kazanç katsayısı (0–1, camın üretici verisi), Fg dış gölgeleme/perde çarpanı (1 = gölgesiz).
// Klima kapasitesi seçiminde duyulur yüke eklenir (1 W = 3,412 Btu/h).
export const penceregunesIsiKazanciInputSchema = z.object({
  pencereAlani_m2: z.number().positive(),
  shgc: z.number().gt(0).max(1),
  gunesIsinimi_Wm2: z.number().min(0),
  golgelemeCarpani: z.number().min(0).max(1),
});

export type PencereGunesIsiKazanciInput = z.infer<typeof penceregunesIsiKazanciInputSchema>;

export interface PencereGunesIsiKazanciOutput {
  isiKazanci_W: number;
}

function compute(input: PencereGunesIsiKazanciInput): CalcResult<PencereGunesIsiKazanciOutput> {
  const q = input.pencereAlani_m2 * input.shgc * input.gunesIsinimi_Wm2 * input.golgelemeCarpani;
  return {
    value: { isiKazanci_W: q },
    intermediates: {
      isi_kazanci_Btuh: q * 3.412,
      birim_alan_kazanci_Wm2: input.pencereAlani_m2 > 0 ? q / input.pencereAlani_m2 : 0,
      gunes_gecirgenligi_ozet: `SHGC ${input.shgc} → gelen ışınımın %${(input.shgc * 100).toFixed(0)}'i ısıya dönüşür`,
      golgeleme_ile_azalma_W: input.pencereAlani_m2 * input.shgc * input.gunesIsinimi_Wm2 * (1 - input.golgelemeCarpani),
    },
    standardsUsed: ["ASHRAE Fundamentals — Fenestration"],
  };
}

export const pencereGunesIsiKazanci: CalcModule<PencereGunesIsiKazanciInput, PencereGunesIsiKazanciOutput> = {
  id: "pencere-gunes-isi-kazanci",
  title: "Pencere Güneş Isı Kazancı (SHGC)",
  discipline: "ev",
  standards: ["ASHRAE Fundamentals — Fenestration"],
  inputSchema: penceregunesIsiKazanciInputSchema,
  compute,
};
