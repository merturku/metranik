import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çift simetrik kesitte elastik/plastik mukavemet momenti ve şekil faktörü (kök yuvarlatmaları ihmal).
// Dikdörtgen: Wel = bh²/6, Wpl = bh²/4 (α = 1,5).  I kesit: Wpl = bf·tf·(h − tf) + tw·hw²/4,
// I = bf·h³/12 − (bf − tw)·hw³/12, Wel = 2I/h.  Mpl,Rd = Wpl·fy/γM0 (TS EN 1993-1-1 §6.2.5, sınıf 1–2).
export const celikKesitPlastikMomentInputSchema = z.object({
  kesitTipi: z.enum(["dikdortgen", "I"]),
  genislik_b_mm: z.number().positive(),
  yukseklik_h_mm: z.number().positive(),
  govdeKalinligi_tw_mm: z.number().min(0),
  basliKalinligi_tf_mm: z.number().min(0),
  akmaDayanimi_MPa: z.number().positive(),
  gammaM0: z.number().min(1),
});
export type CelikKesitPlastikMomentInput = z.infer<typeof celikKesitPlastikMomentInputSchema>;
export interface CelikKesitPlastikMomentOutput {
  plastikMomentDayanimi_kNm: number;
}

const STD = "TS EN 1993-1-1 §6.2.5 (Mpl,Rd = Wpl·fy/γM0), kesit sınıfı 1–2";

function compute(input: CelikKesitPlastikMomentInput): CalcResult<CelikKesitPlastikMomentOutput> {
  const b = input.genislik_b_mm;
  const h = input.yukseklik_h_mm;
  let Wel: number;
  let Wpl: number;
  if (input.kesitTipi === "dikdortgen") {
    Wel = (b * h * h) / 6;
    Wpl = (b * h * h) / 4;
  } else {
    const tw = input.govdeKalinligi_tw_mm;
    const tf = input.basliKalinligi_tf_mm;
    if (tw <= 0 || tf <= 0 || tw >= b || 2 * tf >= h) {
      return {
        value: { plastikMomentDayanimi_kNm: NaN },
        intermediates: {},
        standardsUsed: [STD],
        verdict: { status: "uygunsuz", note: "I kesit geometrisi geçersiz (0 < tw < b ve 2tf < h olmalı)" },
      };
    }
    const hw = h - 2 * tf;
    const I = (b * h ** 3) / 12 - ((b - tw) * hw ** 3) / 12;
    Wel = (2 * I) / h;
    Wpl = b * tf * (h - tf) + (tw * hw * hw) / 4;
  }
  const Mpl = (Wpl * input.akmaDayanimi_MPa) / input.gammaM0 / 1e6;
  const Mel = (Wel * input.akmaDayanimi_MPa) / input.gammaM0 / 1e6;
  return {
    value: { plastikMomentDayanimi_kNm: Mpl },
    intermediates: {
      Wel_mm3: Wel,
      Wpl_mm3: Wpl,
      sekil_faktoru_alfa: Wpl / Wel,
      elastik_moment_dayanimi_kNm: Mel,
    },
    standardsUsed: [STD],
  };
}

export const celikKesitPlastikMoment: CalcModule<CelikKesitPlastikMomentInput, CelikKesitPlastikMomentOutput> = {
  id: "celik-kesit-plastik-moment",
  title: "Çelik Kesit Plastik Mukavemet Momenti ve Şekil Faktörü",
  discipline: "insaat",
  standards: [STD],
  inputSchema: celikKesitPlastikMomentInputSchema,
  compute,
};
