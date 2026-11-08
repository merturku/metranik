import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Binanın yaklaşık birinci doğal titreşim periyodu (ampirik): T ≈ Ct·HN^(3/4), HN bina yüksekliği (m).
// Ct yapı sistemine bağlıdır (çerçeveli betonarme ≈ 0,07; çelik çerçeve ≈ 0,08; perdeli/diğer ≈ 0,05 — yönetmelikten
// teyit edin, girdidir). Kaba kural T ≈ 0,1·N (N kat sayısı). Elastik Tasarım Spektrumu modülünün T girdisi için
// ön değerdir; kesin periyot modal analizden alınmalı, yönetmelik ampirik değerin belirli bir katını sınır koyar.
export const binaYaklasikDogalPeriyotInputSchema = z.object({
  katsayiCt: z.number().positive(),
  binaYuksekligi_m: z.number().positive(),
  katSayisi: z.number().int().min(1),
});

export type BinaYaklasikDogalPeriyotInput = z.infer<typeof binaYaklasikDogalPeriyotInputSchema>;

export interface BinaYaklasikDogalPeriyotOutput {
  periyot_s: number;
}

function compute(input: BinaYaklasikDogalPeriyotInput): CalcResult<BinaYaklasikDogalPeriyotOutput> {
  const t = input.katsayiCt * input.binaYuksekligi_m ** 0.75;
  return {
    value: { periyot_s: t },
    intermediates: {
      HN_uzeri_0_75: input.binaYuksekligi_m ** 0.75,
      kaba_kural_T_0_1N_s: 0.1 * input.katSayisi,
      dogal_frekans_Hz: 1 / t,
      ortalama_kat_yuksekligi_m: input.binaYuksekligi_m / input.katSayisi,
    },
    standardsUsed: ["TBDY 2018 (yaklaşık doğal periyot, T = Ct·HN^¾; madde ve Ct değerini yönetmelikten teyit edin)"],
  };
}

export const binaYaklasikDogalPeriyot: CalcModule<BinaYaklasikDogalPeriyotInput, BinaYaklasikDogalPeriyotOutput> = {
  id: "bina-yaklasik-dogal-periyot",
  title: "Bina Yaklaşık Doğal Periyodu (Ampirik)",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: binaYaklasikDogalPeriyotInputSchema,
  compute,
};
