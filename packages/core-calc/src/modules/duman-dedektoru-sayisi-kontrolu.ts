import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// NFPA 72, duman dedektörleri için birim kapsama alanı esasına dayanır:
// gerekli sayı = ⌈Alan / Birim Kapsama Alanı⌉. Konut tipi noktasal duman
// dedektörlerinde tipik kapsama alanı ~40 m² (yaklaşık 9 m aralık kuralına
// karşılık gelir); Yangın Söndürücü Sayısı ve Kapsama Kontrolü modülüyle
// aynı mantığı, farklı bir yaşam güvenliği ekipmanına uygular.
export const dumanDedektoruSayisiKontroluInputSchema = z.object({
  alan_m2: z.number().positive(),
  birimKapsamaAlani_m2: z.number().positive(),
  mevcutDedektorSayisi: z.number().int().nonnegative(),
});

export type DumanDedektoruSayisiKontroluInput = z.infer<
  typeof dumanDedektoruSayisiKontroluInputSchema
>;

export interface DumanDedektoruSayisiKontroluOutput {
  gerekliSayi: number;
}

function compute(
  input: DumanDedektoruSayisiKontroluInput,
): CalcResult<DumanDedektoruSayisiKontroluOutput> {
  const gerekliSayi = Math.ceil(input.alan_m2 / input.birimKapsamaAlani_m2);

  return {
    value: { gerekliSayi },
    intermediates: {
      mevcutDedektorSayisi: input.mevcutDedektorSayisi,
    },
    standardsUsed: ["NFPA 72"],
    verdict:
      input.mevcutDedektorSayisi >= gerekliSayi
        ? { status: "uygun", note: "Mevcut dedektör sayısı yeterli kapsama sağlıyor." }
        : { status: "uygunsuz", note: "Mevcut dedektör sayısı yetersiz." },
  };
}

export const dumanDedektoruSayisiKontrolu: CalcModule<
  DumanDedektoruSayisiKontroluInput,
  DumanDedektoruSayisiKontroluOutput
> = {
  id: "duman-dedektoru-sayisi-kontrolu",
  title: "Duman Dedektörü Sayısı ve Yerleşim Kontrolü",
  discipline: "ev",
  standards: ["NFPA 72"],
  inputSchema: dumanDedektoruSayisiKontroluInputSchema,
  compute,
};
