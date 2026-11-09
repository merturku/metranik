import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Coulomb aktif toprak basıncı (kohezyonsuz zemin, duvar sürtünmeli, eğimli yüzey/duvar):
// Ka = cos²(φ − θ) / { cos²θ·cos(δ + θ)·[1 + √( sin(φ + δ)·sin(φ − β) / (cos(δ + θ)·cos(θ − β)) )]² },  Pa = ½·γ·H²·Ka.
// φ iç sürtünme açısı, δ duvar–zemin sürtünme açısı (tipik 2/3φ), θ duvar arkasının düşeyden eğimi, β dolgu yüzeyinin yataydan eğimi (β < φ).
// θ = β = δ = 0 için Rankine ile aynıdır (Ka = tan²(45° − φ/2)). Pa duvar arkasına δ açısıyla etkir (yatay bileşen Pa·cos(δ + θ)).
export const istinatCoulombAktifBasincInputSchema = z.object({
  birimHacimAgirlik_kNm3: z.number().positive(),
  yukseklik_m: z.number().positive(),
  icSurtunmeAcisi_derece: z.number().min(10).max(50),
  duvarSurtunmeAcisi_derece: z.number().min(0).max(50),
  duvarEgimi_derece: z.number().min(-30).max(45),
  yuzeyEgimi_derece: z.number().min(0).max(45),
});

export type IstinatCoulombAktifBasincInput = z.infer<typeof istinatCoulombAktifBasincInputSchema>;

export interface IstinatCoulombAktifBasincOutput {
  aktifKuvvet_kNm: number;
}

const R = Math.PI / 180;

function compute(input: IstinatCoulombAktifBasincInput): CalcResult<IstinatCoulombAktifBasincOutput> {
  const phi = input.icSurtunmeAcisi_derece * R;
  const del = input.duvarSurtunmeAcisi_derece * R;
  const th = input.duvarEgimi_derece * R;
  const be = input.yuzeyEgimi_derece * R;
  if (be >= phi) {
    return {
      value: { aktifKuvvet_kNm: Number.NaN },
      intermediates: { not: "Yüzey eğimi β, iç sürtünme açısı φ'den küçük olmalı" },
      standardsUsed: ["Coulomb aktif toprak basıncı teorisi"],
      verdict: { status: "uygunsuz", note: "β ≥ φ: dolgu kararsız, formül geçersiz." },
    };
  }
  const kok = Math.sqrt((Math.sin(phi + del) * Math.sin(phi - be)) / (Math.cos(del + th) * Math.cos(th - be)));
  const ka = Math.cos(phi - th) ** 2 / (Math.cos(th) ** 2 * Math.cos(del + th) * (1 + kok) ** 2);
  const pa = 0.5 * input.birimHacimAgirlik_kNm3 * input.yukseklik_m ** 2 * ka;
  return {
    value: { aktifKuvvet_kNm: pa },
    intermediates: {
      aktif_katsayi_Ka: ka,
      yatay_bilesen_kNm: pa * Math.cos(del + th),
      dusey_bilesen_kNm: pa * Math.sin(del + th),
      etki_yuksekligi_m: input.yukseklik_m / 3,
      rankine_Ka_karsilastirma: Math.tan(Math.PI / 4 - phi / 2) ** 2,
    },
    standardsUsed: ["Coulomb aktif toprak basıncı teorisi"],
  };
}

export const istinatCoulombAktifBasinc: CalcModule<IstinatCoulombAktifBasincInput, IstinatCoulombAktifBasincOutput> = {
  id: "istinat-coulomb-aktif-basinc",
  title: "Coulomb Aktif Toprak Basıncı (Duvar Sürtünmeli)",
  discipline: "insaat",
  standards: [],
  inputSchema: istinatCoulombAktifBasincInputSchema,
  compute,
};
