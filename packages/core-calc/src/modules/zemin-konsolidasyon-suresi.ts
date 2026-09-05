import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Terzaghi konsolidasyon teorisi, zaman faktörü Tv üzerinden konsolidasyon
// süresini verir: t = Tv×H²/cv. H, drenaj yolu uzunluğudur (tek yüzeyden
// drenajda tabaka kalınlığı, çift yüzeyden drenajda kalınlığın yarısı).
// Tv, hedeflenen konsolidasyon derecesine (U%) bağlı standart bir katsayıdır
// (örn. U=%50 için Tv≈0.197, U=%90 için Tv≈0.848). Zemin Konsolidasyon
// Oturması modülünün verdiği oturma miktarının ne kadar sürede oluşacağını
// tamamlayıcı olarak hesaplar.
export const zeminKonsolidasyonSuresiInputSchema = z.object({
  zamanFaktoru_Tv: z.number().positive(),
  drenajYoluUzunlugu_H_m: z.number().positive(),
  konsolidasyonKatsayisi_cv_m2yil: z.number().positive(),
});

export type ZeminKonsolidasyonSuresiInput = z.infer<
  typeof zeminKonsolidasyonSuresiInputSchema
>;

export interface ZeminKonsolidasyonSuresiOutput {
  konsolidasyonSuresi_t_yil: number;
}

function compute(
  input: ZeminKonsolidasyonSuresiInput,
): CalcResult<ZeminKonsolidasyonSuresiOutput> {
  const konsolidasyonSuresiTYil =
    (input.zamanFaktoru_Tv * input.drenajYoluUzunlugu_H_m ** 2) /
    input.konsolidasyonKatsayisi_cv_m2yil;

  return {
    value: { konsolidasyonSuresi_t_yil: konsolidasyonSuresiTYil },
    intermediates: {
      drenajYoluUzunluguKaresi_H2_m2: input.drenajYoluUzunlugu_H_m ** 2,
    },
    standardsUsed: ["Terzaghi"],
  };
}

export const zeminKonsolidasyonSuresi: CalcModule<
  ZeminKonsolidasyonSuresiInput,
  ZeminKonsolidasyonSuresiOutput
> = {
  id: "zemin-konsolidasyon-suresi",
  title: "Zemin Konsolidasyon Süresi (Terzaghi Zaman Faktörü)",
  discipline: "insaat",
  standards: ["Terzaghi"],
  inputSchema: zeminKonsolidasyonSuresiInputSchema,
  compute,
};
