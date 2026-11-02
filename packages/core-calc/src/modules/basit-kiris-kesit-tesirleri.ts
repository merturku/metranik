import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit mesnetli kiriş (iki ucu mafsallı) kesit tesirleri — klasik statik:
// düzgün yayılı w ve orta noktada tekil P için  R = wL/2 + P/2,  Mmaks = wL²/8 + PL/4 (orta nokta),
// Vmaks = R (mesnette).  Birimler: kN, m, kNm.
export const basitKirisKesitTesirleriInputSchema = z.object({
  aciklik_m: z.number().positive(),
  yayiliYuk_kNm: z.number().min(0),
  ortaTekilYuk_kN: z.number().min(0),
});

export type BasitKirisKesitTesirleriInput = z.infer<typeof basitKirisKesitTesirleriInputSchema>;

export interface BasitKirisKesitTesirleriOutput {
  Mmaks_kNm: number;
}

function compute(input: BasitKirisKesitTesirleriInput): CalcResult<BasitKirisKesitTesirleriOutput> {
  const { aciklik_m: L, yayiliYuk_kNm: w, ortaTekilYuk_kN: P } = input;
  const r = (w * L) / 2 + P / 2;
  const mYayili = (w * L * L) / 8;
  const mTekil = (P * L) / 4;
  return {
    value: { Mmaks_kNm: mYayili + mTekil },
    intermediates: {
      mesnet_reaksiyonu_kN: r,
      Vmaks_kN: r,
      M_yayili_kNm: mYayili,
      M_tekil_kNm: mTekil,
      toplam_yuk_kN: w * L + P,
    },
    standardsUsed: ["Klasik kiriş statiği"],
  };
}

export const basitKirisKesitTesirleri: CalcModule<BasitKirisKesitTesirleriInput, BasitKirisKesitTesirleriOutput> = {
  id: "basit-kiris-kesit-tesirleri",
  title: "Basit Mesnetli Kiriş Kesit Tesirleri (M, V)",
  discipline: "insaat",
  standards: [],
  inputSchema: basitKirisKesitTesirleriInputSchema,
  compute,
};
