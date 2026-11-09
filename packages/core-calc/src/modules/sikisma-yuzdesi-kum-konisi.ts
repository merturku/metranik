import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Saha sıkışma kontrolü: kuru birim hacim ağırlık γd = γ_yaş/(1 + w/100) (kum konisi/nükleer ölçümden doğal yaş birim ağırlık),
// bağıl sıkışma RC = γd,saha/γd,maks·100 (laboratuvar Proctor deneyinden, TS 1900-2 / ASTM D698–D1557).
// Kabul ölçütü projeye/şartnameye göre (yol/dolgu tipik ≥ %95 standart/modifiye Proctor); girdidir. Su içeriği optimumdan ±2% sapmayı da kontrol edin (wopt girilirse).
export const sikismaYuzdesiKumKonisiInputSchema = z.object({
  sahaYasBirimAgirlik_kNm3: z.number().positive(),
  sahaSuIcerigi_yuzde: z.number().min(0),
  maksKuruBirimAgirlik_kNm3: z.number().positive(),
  optimumSuIcerigi_yuzde: z.number().min(0),
  gerekliSikisma_yuzde: z.number().min(80).max(105),
});

export type SikismaYuzdesiKumKonisiInput = z.infer<typeof sikismaYuzdesiKumKonisiInputSchema>;

export interface SikismaYuzdesiKumKonisiOutput {
  sikisma_yuzde: number;
}

function compute(input: SikismaYuzdesiKumKonisiInput): CalcResult<SikismaYuzdesiKumKonisiOutput> {
  const gd = input.sahaYasBirimAgirlik_kNm3 / (1 + input.sahaSuIcerigi_yuzde / 100);
  const rc = (gd / input.maksKuruBirimAgirlik_kNm3) * 100;
  const wSapma = input.sahaSuIcerigi_yuzde - input.optimumSuIcerigi_yuzde;
  const durum = rc >= input.gerekliSikisma_yuzde ? "uygun" : rc >= input.gerekliSikisma_yuzde - 2 ? "sinirda" : "uygunsuz";
  return {
    value: { sikisma_yuzde: rc },
    intermediates: {
      saha_kuru_birim_agirlik_kNm3: gd,
      su_icerigi_sapmasi_wopt_yuzde: wSapma,
      su_icerigi_uyarisi: Math.abs(wSapma) > 2 ? "|w − wopt| > %2: su içeriğini düzeltin" : "su içeriği optimuma yakın",
      gerekli_kuru_birim_agirlik_kNm3: (input.gerekliSikisma_yuzde / 100) * input.maksKuruBirimAgirlik_kNm3,
    },
    standardsUsed: ["TS 1900-2 / ASTM D698–D1557 (Proctor); TS EN 1997-2"],
    verdict: {
      status: durum,
      note: durum === "uygun" ? "Bağıl sıkışma gereken değerin üstünde." : durum === "sinirda" ? "Gerekenin en fazla %2 altında; ek geçiş önerilir." : "Sıkışma yetersiz: ek silindir geçişi veya su içeriği düzeltmesi gerekir.",
    },
  };
}

export const sikismaYuzdesiKumKonisi: CalcModule<SikismaYuzdesiKumKonisiInput, SikismaYuzdesiKumKonisiOutput> = {
  id: "sikisma-yuzdesi-kum-konisi",
  title: "Saha Sıkışma Yüzdesi Kontrolü (Proctor Bağıl Sıkışma)",
  discipline: "insaat",
  standards: ["TS 1900-2"],
  inputSchema: sikismaYuzdesiKumKonisiInputSchema,
  compute,
};
