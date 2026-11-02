import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kolon eksenel yük toplama (etki alanı yöntemi): N = n_kat·A·q_kat + A·q_çatı + G_kolon
// A: kolonun etki alanı (komşu açıklıkların yarısı), q: katsayılı tasarım yükü (kN/m²,
// Düşey Yük Kombinasyonu modülüyle bulunur). Kolon öz ağırlığı yaklaşık kN olarak girilir.
// Çıkan N, Kolon Ön Boyutlandırma ve Kolon Boyutlandırma modüllerinin girdisidir.
export const kolonYukToplamaInputSchema = z.object({
  katSayisi: z.number().int().min(1).max(60),
  etkiAlani_m2: z.number().positive(),
  katTasarimYuku_kNm2: z.number().positive(),
  catiTasarimYuku_kNm2: z.number().min(0),
  kolonOzAgirligi_kN: z.number().min(0),
});

export type KolonYukToplamaInput = z.infer<typeof kolonYukToplamaInputSchema>;

export interface KolonYukToplamaOutput {
  eksenelYuk_kN: number;
}

function compute(input: KolonYukToplamaInput): CalcResult<KolonYukToplamaOutput> {
  const kat = input.katSayisi * input.etkiAlani_m2 * input.katTasarimYuku_kNm2;
  const cati = input.etkiAlani_m2 * input.catiTasarimYuku_kNm2;
  const n = kat + cati + input.kolonOzAgirligi_kN;
  return {
    value: { eksenelYuk_kN: n },
    intermediates: {
      kat_yukleri_kN: kat,
      cati_yuku_kN: cati,
      kolon_oz_agirligi_kN: input.kolonOzAgirligi_kN,
      kat_basina_yuk_kN: kat / input.katSayisi,
    },
    standardsUsed: ["Etki alanı (tributary area) yöntemi"],
  };
}

export const kolonYukToplama: CalcModule<KolonYukToplamaInput, KolonYukToplamaOutput> = {
  id: "kolon-yuk-toplama",
  title: "Kolon Eksenel Yük Toplama (Etki Alanı)",
  discipline: "insaat",
  standards: [],
  inputSchema: kolonYukToplamaInputSchema,
  compute,
};
