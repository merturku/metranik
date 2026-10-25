import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-8 §4.5.3.3 köşe kaynağı basitleştirilmiş yöntemi: birim uzunluktaki
// bileşke kuvvet Fw,Ed ≤ Fw,Rd = fvw,d · a,  fvw,d = (fu/√3)/(βw · γM2).
// fu: birleşen parçalardan zayıf olanın çekme dayanımı (TS EN 1993-1-1 Tablo 3.1,
// EN 10025-2, t ≤ 40 mm), βw: Tablo 4.1 korelasyon katsayısı.
// Etkin uzunluk tam kesitli dikiş boyudur; uç kraterleri varsa L − 2a alınır (§4.5.1).
// a ≥ 3 mm (§4.5.2) ve etkin boy ≥ max(30 mm, 6a) olmayan dikiş taşıyıcı sayılmaz.
// Kuvvet doğrultusunda 150a'dan uzun bindirmeli birleşimlerde dayanım
// βLw.1 = 1,2 − 0,2·Lj/(150a) ≤ 1 ile azaltılır (§4.11); burada Lj = dikiş boyu.
const CELIK: Record<"S235" | "S275" | "S355", { fu_MPa: number; betaW: number }> = {
  S235: { fu_MPa: 360, betaW: 0.8 },
  S275: { fu_MPa: 430, betaW: 0.85 },
  S355: { fu_MPa: 510, betaW: 0.9 },
};

export const koseKaynagiDikisKapasitesiInputSchema = z.object({
  celikSinifi: z.enum(["S235", "S275", "S355"]),
  kaynakKalinligi_a_mm: z.number().positive(),
  kaynakUzunlugu_L_mm: z.number().positive(),
  dikisSayisi: z.number().int().min(1),
  uzunlukTipi: z.enum(["tam", "krater"]),
  kuvvetYonu: z.enum(["enine", "boyuna"]),
  tasarimKuvveti_FEd_kN: z.number().min(0),
  gammaM2: z.number().positive(),
});

export type KoseKaynagiDikisKapasitesiInput = z.infer<typeof koseKaynagiDikisKapasitesiInputSchema>;

export interface KoseKaynagiDikisKapasitesiOutput {
  kaynakTasarimDayanimi_kN: number;
}

function compute(input: KoseKaynagiDikisKapasitesiInput): CalcResult<KoseKaynagiDikisKapasitesiOutput> {
  const { fu_MPa, betaW } = CELIK[input.celikSinifi];
  const a = input.kaynakKalinligi_a_mm;
  const fvwd = fu_MPa / Math.sqrt(3) / (betaW * input.gammaM2);
  const birimDayanim_N_mm = fvwd * a;
  const etkinBoy = input.uzunlukTipi === "krater" ? input.kaynakUzunlugu_L_mm - 2 * a : input.kaynakUzunlugu_L_mm;
  const uzunBirlesim = input.kuvvetYonu === "boyuna" && input.kaynakUzunlugu_L_mm > 150 * a;
  const betaLw = uzunBirlesim ? Math.max(0, 1.2 - (0.2 * input.kaynakUzunlugu_L_mm) / (150 * a)) : 1;
  const dayanim_kN = (input.dikisSayisi * betaLw * birimDayanim_N_mm * Math.max(0, etkinBoy)) / 1000;
  const minBoy = Math.max(30, 6 * a);
  const kullanim = dayanim_kN > 0 ? input.tasarimKuvveti_FEd_kN / dayanim_kN : Infinity;

  const verdict: CalcResult<KoseKaynagiDikisKapasitesiOutput>["verdict"] =
    a < 3
      ? { status: "uygunsuz", note: `a = ${a} mm < 3 mm: köşe kaynağı boğaz kalınlığı en az 3 mm olmalı (§4.5.2).` }
      : etkinBoy < minBoy
        ? {
            status: "uygunsuz",
            note: `Etkin boy ${etkinBoy.toFixed(0)} mm < max(30 mm; 6a) = ${minBoy.toFixed(0)} mm: dikiş taşıyıcı kabul edilmez (§4.5.1).`,
          }
        : kullanim <= 1
          ? {
              status: "uygun",
              note: `FEd = ${input.tasarimKuvveti_FEd_kN} kN ≤ Fw,Rd = ${dayanim_kN.toFixed(1)} kN (kullanım %${(kullanim * 100).toFixed(0)}).`,
            }
          : {
              status: "uygunsuz",
              note: `FEd = ${input.tasarimKuvveti_FEd_kN} kN > Fw,Rd = ${dayanim_kN.toFixed(1)} kN: boğaz kalınlığını veya dikiş boyunu artırın.`,
            };

  return {
    value: { kaynakTasarimDayanimi_kN: dayanim_kN },
    intermediates: {
      cekme_dayanimi_fu_MPa: fu_MPa,
      korelasyon_katsayisi_betaW: betaW,
      kaynak_kayma_dayanimi_fvwd_MPa: fvwd,
      birim_boy_dayanimi_N_mm: birimDayanim_N_mm,
      etkin_dikis_boyu_mm: etkinBoy,
      uzun_birlesim_azaltmasi_betaLw: betaLw,
      kullanim_orani: kullanim,
    },
    standardsUsed: ["TS EN 1993-1-8", "TS EN 1993-1-1"],
    verdict,
  };
}

export const koseKaynagiDikisKapasitesi: CalcModule<
  KoseKaynagiDikisKapasitesiInput,
  KoseKaynagiDikisKapasitesiOutput
> = {
  id: "kose-kaynagi-dikis-kapasitesi",
  title: "Köşe Kaynağı Dikiş Kapasitesi",
  discipline: "insaat",
  standards: ["TS EN 1993-1-8", "TS EN 1993-1-1"],
  inputSchema: koseKaynagiDikisKapasitesiInputSchema,
  compute,
};
