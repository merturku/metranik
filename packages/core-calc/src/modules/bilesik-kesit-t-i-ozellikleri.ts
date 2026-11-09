import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İki parçalı (başlık + gövde) bileşik kesit özellikleri; kalın/ince kenar yok, birleşim bölgesi çakışması yok.
// I (çift simetrik): h = 2tf + hw, ȳ = h/2, I = bf·h³/12 − (bf − tw)·hw³/12.
// T: A1 = bf·tf (üst başlık), A2 = tw·hw; ȳ üst liften, I = Σ(Ii + Ai·di²) (paralel eksenler teoremi).
// Birimler mm; I mm⁴, W mm³. Sehim/burkulma/gerilme modüllerinin I ve W girdisini üretir. Hadde profil tabloları için üretici değerleri esastır.
export const bilesikKesitTIOzellikleriInputSchema = z.object({
  sekil: z.enum(["I", "T"]),
  baslikGenisligi_bf_mm: z.number().positive(),
  baslikKalinligi_tf_mm: z.number().positive(),
  govdeYuksekligi_hw_mm: z.number().positive(),
  govdeKalinligi_tw_mm: z.number().positive(),
});

export type BilesikKesitTIOzellikleriInput = z.infer<typeof bilesikKesitTIOzellikleriInputSchema>;

export interface BilesikKesitTIOzellikleriOutput {
  atalet_mm4: number;
}

function compute(input: BilesikKesitTIOzellikleriInput): CalcResult<BilesikKesitTIOzellikleriOutput> {
  const { baslikGenisligi_bf_mm: bf, baslikKalinligi_tf_mm: tf, govdeYuksekligi_hw_mm: hw, govdeKalinligi_tw_mm: tw } = input;
  if (input.sekil === "I") {
    const h = 2 * tf + hw;
    const i = (bf * h ** 3) / 12 - ((bf - tw) * hw ** 3) / 12;
    const a = 2 * bf * tf + tw * hw;
    return {
      value: { atalet_mm4: i },
      intermediates: {
        toplam_yukseklik_mm: h,
        alan_mm2: a,
        agirlik_merkezi_ust_mm: h / 2,
        mukavemet_momenti_W_mm3: i / (h / 2),
        atalet_yaricapi_mm: Math.sqrt(i / a),
      },
      standardsUsed: ["Klasik kesit özellikleri (paralel eksenler teoremi)"],
    };
  }
  const a1 = bf * tf;
  const a2 = tw * hw;
  const a = a1 + a2;
  const h = tf + hw;
  const y = (a1 * (tf / 2) + a2 * (tf + hw / 2)) / a;
  const i =
    (bf * tf ** 3) / 12 + a1 * (y - tf / 2) ** 2 + (tw * hw ** 3) / 12 + a2 * (tf + hw / 2 - y) ** 2;
  return {
    value: { atalet_mm4: i },
    intermediates: {
      toplam_yukseklik_mm: h,
      alan_mm2: a,
      agirlik_merkezi_ust_mm: y,
      mukavemet_momenti_ust_W_mm3: i / y,
      mukavemet_momenti_alt_W_mm3: i / (h - y),
      atalet_yaricapi_mm: Math.sqrt(i / a),
    },
    standardsUsed: ["Klasik kesit özellikleri (paralel eksenler teoremi)"],
  };
}

export const bilesikKesitTIOzellikleri: CalcModule<BilesikKesitTIOzellikleriInput, BilesikKesitTIOzellikleriOutput> = {
  id: "bilesik-kesit-t-i-ozellikleri",
  title: "Bileşik Kesit (T / I) Ağırlık Merkezi ve Atalet Momenti",
  discipline: "insaat",
  standards: [],
  inputSchema: bilesikKesitTIOzellikleriInputSchema,
  compute,
};
