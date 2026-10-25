import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-1 §6.3.2.2 genel yöntem, çift simetrik I kesitte yanal burulmalı burkulma.
// Elastik kritik moment (yük kesme merkezinde, uçlarda çarpılma ve dönme serbest, k = kw = 1):
//   Mcr = C1·(π²·E·Iz/L²)·√(Iw/Iz + L²·G·It/(π²·E·Iz))
// C1 moment dağılımı katsayısı (sabit moment 1,0; düzgün yayılı yükte basit kiriş ≈ 1,13).
// λ̄LT = √(Wpl·fy/Mcr), ΦLT = 0,5·[1 + αLT·(λ̄LT − 0,2) + λ̄LT²],
// χLT = 1/(ΦLT + √(ΦLT² − λ̄LT²)) ≤ 1, Mb,Rd = χLT·Wpl·fy/γM1 (sınıf 1–2).
// αLT Tablo 6.3/6.4: hadde I h/b ≤ 2 → a (0,21), h/b > 2 → b (0,34); kaynaklı I h/b ≤ 2 → c, > 2 → d.
const E_MPa = 210000;
const G_MPa = 81000;
const FY: Record<"S235" | "S275" | "S355", number> = { S235: 235, S275: 275, S355: 355 };
const ALFA_LT: Record<"a" | "b" | "c" | "d", number> = { a: 0.21, b: 0.34, c: 0.49, d: 0.76 };

export const celikKirisYanalBurulmaliBurkulmaInputSchema = z.object({
  celikSinifi: z.enum(["S235", "S275", "S355"]),
  plastikMukavemetMomenti_Wpl_cm3: z.number().positive(),
  zayifEksenAtaleti_Iz_cm4: z.number().positive(),
  burulmaAtaleti_It_cm4: z.number().positive(),
  carpilmaSabiti_Iw_cm6: z.number().positive(),
  yanalTutulmamisBoy_L_m: z.number().positive(),
  momentKatsayisi_C1: z.number().min(1).max(3),
  burkulmaEgrisi: z.enum(["a", "b", "c", "d"]),
  gammaM1: z.number().positive(),
  tasarimMomenti_MEd_kNm: z.number().min(0),
});

export type CelikKirisYanalBurulmaliBurkulmaInput = z.infer<typeof celikKirisYanalBurulmaliBurkulmaInputSchema>;

export interface CelikKirisYanalBurulmaliBurkulmaOutput {
  burkulmaMomentDayanimi_MbRd_kNm: number;
}

function compute(
  input: CelikKirisYanalBurulmaliBurkulmaInput,
): CalcResult<CelikKirisYanalBurulmaliBurkulmaOutput> {
  const fy = FY[input.celikSinifi];
  const Wpl = input.plastikMukavemetMomenti_Wpl_cm3 * 1e3;
  const Iz = input.zayifEksenAtaleti_Iz_cm4 * 1e4;
  const It = input.burulmaAtaleti_It_cm4 * 1e4;
  const Iw = input.carpilmaSabiti_Iw_cm6 * 1e6;
  const L = input.yanalTutulmamisBoy_L_m * 1000;

  const eulerTerimi = (Math.PI ** 2 * E_MPa * Iz) / L ** 2;
  const Mcr = input.momentKatsayisi_C1 * eulerTerimi * Math.sqrt(Iw / Iz + (L ** 2 * G_MPa * It) / (Math.PI ** 2 * E_MPa * Iz));
  const Mpl = Wpl * fy;
  const lambdaLT = Math.sqrt(Mpl / Mcr);
  const alfa = ALFA_LT[input.burkulmaEgrisi];
  const phi = 0.5 * (1 + alfa * (lambdaLT - 0.2) + lambdaLT ** 2);
  const chi = lambdaLT <= 0.2 ? 1 : Math.min(1, 1 / (phi + Math.sqrt(phi ** 2 - lambdaLT ** 2)));
  const MbRd = (chi * Mpl) / input.gammaM1 / 1e6;
  const kullanim = input.tasarimMomenti_MEd_kNm / MbRd;

  const verdict: CalcResult<CelikKirisYanalBurulmaliBurkulmaOutput>["verdict"] =
    kullanim <= 1
      ? {
          status: "uygun",
          note: `MEd = ${input.tasarimMomenti_MEd_kNm} kNm ≤ Mb,Rd = ${MbRd.toFixed(1)} kNm (χLT = ${chi.toFixed(3)}, kullanım %${(kullanim * 100).toFixed(0)}).`,
        }
      : {
          status: "uygunsuz",
          note: `MEd = ${input.tasarimMomenti_MEd_kNm} kNm > Mb,Rd = ${MbRd.toFixed(1)} kNm: basınç başlığını ara noktalardan yanal tutun (L'yi kısaltın) veya daha geniş başlıklı profil seçin.`,
        };

  return {
    value: { burkulmaMomentDayanimi_MbRd_kNm: MbRd },
    intermediates: {
      elastik_kritik_moment_Mcr_kNm: Mcr / 1e6,
      plastik_moment_Mpl_kNm: Mpl / 1e6,
      boyutsuz_narinlik_lambdaLT: lambdaLT,
      kusur_katsayisi_alfaLT: alfa,
      phiLT: phi,
      azaltma_katsayisi_chiLT: chi,
      kullanim_orani: kullanim,
    },
    standardsUsed: ["TS EN 1993-1-1"],
    verdict,
  };
}

export const celikKirisYanalBurulmaliBurkulma: CalcModule<
  CelikKirisYanalBurulmaliBurkulmaInput,
  CelikKirisYanalBurulmaliBurkulmaOutput
> = {
  id: "celik-kiris-yanal-burulmali-burkulma",
  title: "Çelik Kiriş Yanal Burulmalı Burkulma",
  discipline: "insaat",
  standards: ["TS EN 1993-1-1"],
  inputSchema: celikKirisYanalBurulmaliBurkulmaInputSchema,
  compute,
};
