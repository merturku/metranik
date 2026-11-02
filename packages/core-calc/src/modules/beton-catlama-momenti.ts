import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dikdörtgen betonarme kesitin çatlama momenti (brüt kesit, donatı katkısı ihmal):
// Mcr = fctm · W,  W = b·h²/6.  fctm = 0,30·fck^(2/3) (TS EN 1992-1-1 Tablo 3.1, fck ≤ 50 MPa).
// İsteğe bağlı servis momenti Msd ile karşılaştırılır (Msd < Mcr → kesit çatlamamış).
export const betonCatlamaMomentiInputSchema = z.object({
  fck_MPa: z.number().min(12).max(50),
  genislik_mm: z.number().positive(),
  yukseklik_mm: z.number().positive(),
  servisMomenti_kNm: z.number().min(0),
});

export type BetonCatlamaMomentiInput = z.infer<typeof betonCatlamaMomentiInputSchema>;

export interface BetonCatlamaMomentiOutput {
  Mcr_kNm: number;
}

function compute(input: BetonCatlamaMomentiInput): CalcResult<BetonCatlamaMomentiOutput> {
  const fctm = 0.3 * Math.pow(input.fck_MPa, 2 / 3);
  const w = (input.genislik_mm * input.yukseklik_mm ** 2) / 6;
  const mcr = (fctm * w) / 1e6;
  const catlar = input.servisMomenti_kNm > mcr;
  return {
    value: { Mcr_kNm: mcr },
    intermediates: {
      fctm_MPa: fctm,
      kesit_modulu_mm3: w,
      Msd_Mcr_orani: mcr > 0 ? input.servisMomenti_kNm / mcr : 0,
      durum: catlar ? "Kesit çatlamış (Msd > Mcr)" : "Kesit çatlamamış (Msd ≤ Mcr)",
    },
    standardsUsed: ["TS EN 1992-1-1 Tablo 3.1"],
    verdict: {
      status: catlar ? "sinirda" : "uygun",
      note: catlar
        ? "Servis momenti çatlama momentini aşıyor; sehim ve çatlak genişliği hesaplarında çatlamış kesit özellikleri kullanılmalı."
        : "Servis momenti çatlama momentinin altında; brüt kesit özellikleri geçerli.",
    },
  };
}

export const betonCatlamaMomenti: CalcModule<BetonCatlamaMomentiInput, BetonCatlamaMomentiOutput> = {
  id: "beton-catlama-momenti",
  title: "Betonarme Kesit Çatlama Momenti",
  discipline: "insaat",
  standards: ["TS EN 1992-1-1"],
  inputSchema: betonCatlamaMomentiInputSchema,
  compute,
};
