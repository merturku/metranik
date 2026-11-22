import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kesme gerilmesi τ = V·Q/(I·b)  (Jourawski). Dikdörtgen: τmaks = 1,5·V/A.
// I kesit (simetrik): nötr eksende Q = bf·tf·(h − tf)/2 + tw·(h/2 − tf)²/2, b = tw;
// gövde–başlık birleşiminde (gövde tarafı) Q = bf·tf·(h − tf)/2, b = tw.
export const kirisKesmeGerilmesiJourawskiInputSchema = z.object({
  kesitTipi: z.enum(["dikdortgen", "i_kesit"]),
  kesmeKuvveti_V_kN: z.number().min(0),
  yukseklik_h_mm: z.number().positive(),
  genislik_b_mm: z.number().positive(),
  govdeKalinligi_tw_mm: z.number().positive(),
  baslikKalinligi_tf_mm: z.number().positive(),
  izinVerilenGerilme_MPa: z.number().positive(),
});

export type KirisKesmeGerilmesiJourawskiInput = z.infer<typeof kirisKesmeGerilmesiJourawskiInputSchema>;
export interface KirisKesmeGerilmesiJourawskiOutput {
  maksKesmeGerilmesi_MPa: number;
}

const STD = "Klasik mukavemet (Jourawski kesme gerilmesi formülü)";

function compute(input: KirisKesmeGerilmesiJourawskiInput): CalcResult<KirisKesmeGerilmesiJourawskiOutput> {
  const V = input.kesmeKuvveti_V_kN * 1000;
  const h = input.yukseklik_h_mm;
  const bf = input.genislik_b_mm;
  let tauMaks: number;
  const ara: Record<string, number | string> = {};
  if (input.kesitTipi === "dikdortgen") {
    const A = bf * h;
    tauMaks = (1.5 * V) / A;
    ara.A_mm2 = A;
    ara.ortalama_tau_MPa = V / A;
  } else {
    const tw = input.govdeKalinligi_tw_mm;
    const tf = input.baslikKalinligi_tf_mm;
    const hw = h - 2 * tf;
    if (hw <= 0 || tw >= bf) {
      return {
        value: { maksKesmeGerilmesi_MPa: NaN },
        intermediates: {},
        standardsUsed: [STD],
        verdict: { status: "uygunsuz", note: "Geometri geçersiz: h > 2·tf ve tw < bf olmalı" },
      };
    }
    const I = (bf * h ** 3 - (bf - tw) * hw ** 3) / 12;
    const Qb = (bf * tf * (h - tf)) / 2;
    const Qn = Qb + (tw * hw ** 2) / 8;
    tauMaks = (V * Qn) / (I * tw);
    const tauBirlesim = (V * Qb) / (I * tw);
    ara.I_mm4 = I;
    ara.Q_notr_eksen_mm3 = Qn;
    ara.tau_govde_baslik_birlesimi_MPa = tauBirlesim;
    ara.ortalama_govde_tau_MPa = V / (tw * h);
  }
  const oran = tauMaks / input.izinVerilenGerilme_MPa;
  const status = oran <= 0.9 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { maksKesmeGerilmesi_MPa: tauMaks },
    intermediates: { ...ara, gerilme_orani: oran },
    standardsUsed: [STD],
    verdict: { status, note: `τmaks / τizin = ${oran.toFixed(2)}; burkulma ve bileşik gerilme (von Mises) kontrolü ayrıca yapılmalı` },
  };
}

export const kirisKesmeGerilmesiJourawski: CalcModule<KirisKesmeGerilmesiJourawskiInput, KirisKesmeGerilmesiJourawskiOutput> = {
  id: "kiris-kesme-gerilmesi-jourawski",
  title: "Kiriş Kesme Gerilmesi Dağılımı (Jourawski)",
  discipline: "insaat",
  standards: [STD],
  inputSchema: kirisKesmeGerilmesiJourawskiInputSchema,
  compute,
};
