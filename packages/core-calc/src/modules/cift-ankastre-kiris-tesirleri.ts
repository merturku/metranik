import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İki ucu ankastre kiriş, tüm açıklıkta düzgün yayılı w + orta noktada tekil P (klasik kiriş teorisi, elastik).
// R = wL/2 + P/2;  M_uç = −(wL²/12 + PL/8);  M_orta = wL²/24 + PL/8;  δ = wL⁴/(384EI) + PL³/(192EI).
export const ciftAnkastreKirisTesirleriInputSchema = z.object({
  aciklik_m: z.number().positive(),
  yayiliYuk_kNm: z.number().min(0),
  ortaTekilYuk_kN: z.number().min(0),
  elastisiteModulu_GPa: z.number().positive(),
  atalet_cm4: z.number().positive(),
  sehimSiniriPaydasi: z.number().positive(),
});

export type CiftAnkastreKirisTesirleriInput = z.infer<typeof ciftAnkastreKirisTesirleriInputSchema>;
export interface CiftAnkastreKirisTesirleriOutput {
  ucMomenti_kNm: number;
}

const STD = "Klasik kiriş teorisi (Euler–Bernoulli), iki ucu ankastre kiriş tablosu";

function compute(input: CiftAnkastreKirisTesirleriInput): CalcResult<CiftAnkastreKirisTesirleriOutput> {
  const L = input.aciklik_m;
  const w = input.yayiliYuk_kNm;
  const P = input.ortaTekilYuk_kN;
  const EI = input.elastisiteModulu_GPa * 1e6 * (input.atalet_cm4 * 1e-8); // kN·m²
  const R = (w * L) / 2 + P / 2;
  const Mu = (w * L * L) / 12 + (P * L) / 8;
  const Mo = (w * L * L) / 24 + (P * L) / 8;
  const Mss = (w * L * L) / 8 + (P * L) / 4;
  const delta_m = (w * L ** 4) / (384 * EI) + (P * L ** 3) / (192 * EI);
  const delta_mm = delta_m * 1000;
  const izin_mm = (L * 1000) / input.sehimSiniriPaydasi;
  return {
    value: { ucMomenti_kNm: Mu },
    intermediates: {
      mesnet_reaksiyonu_kN: R,
      aciklik_ortasi_momenti_kNm: Mo,
      basit_mesnetli_Mmaks_kNm: Mss,
      denge_kontrolu_Muc_arti_Morta_kNm: Mu + Mo,
      EI_kNm2: EI,
      orta_sehim_mm: delta_mm,
      izin_sehim_mm: izin_mm,
    },
    standardsUsed: [STD],
    verdict: {
      status: delta_mm <= izin_mm ? "uygun" : "uygunsuz",
      note: `Orta sehim ${delta_mm.toFixed(2)} mm ${delta_mm <= izin_mm ? "≤" : ">"} L/${input.sehimSiniriPaydasi} = ${izin_mm.toFixed(2)} mm (elastik, çatlamamış kesit; betonarmede çatlama sehimi artırır)`,
    },
  };
}

export const ciftAnkastreKirisTesirleri: CalcModule<CiftAnkastreKirisTesirleriInput, CiftAnkastreKirisTesirleriOutput> = {
  id: "cift-ankastre-kiris-tesirleri",
  title: "İki Ucu Ankastre Kiriş Kesit Tesirleri ve Sehim",
  discipline: "insaat",
  standards: [STD],
  inputSchema: ciftAnkastreKirisTesirleriInputSchema,
  compute,
};
