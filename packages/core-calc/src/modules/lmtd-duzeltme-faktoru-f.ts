import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// 1 gövde geçişli / 2 (veya çift katı) tüp geçişli eşanjör için LMTD düzeltme faktörü F (Bowman, Mueller & Nagle 1940; TEMA):
// P = (Tc2−Tc1)/(Th1−Tc1), R = (Th1−Th2)/(Tc2−Tc1), S = √(R²+1)
// F = [S/(R−1)]·ln[(1−P)/(1−RP)] / ln{[2−P(R+1−S)]/[2−P(R+1+S)]};  R = 1: F = [√2·P/(1−P)] / ln{[2−P(2−√2)]/[2−P(2+√2)]}
export const lmtdDuzeltmeFaktoruFInputSchema = z
  .object({
    sicakGiris_C: z.number(),
    sicakCikis_C: z.number(),
    soguukGiris_C: z.number(),
    soguukCikis_C: z.number(),
  })
  .refine((v) => v.sicakGiris_C > v.sicakCikis_C, { message: "Sıcak akışkan çıkışı girişten düşük olmalı" })
  .refine((v) => v.soguukCikis_C > v.soguukGiris_C, { message: "Soğuk akışkan çıkışı girişten yüksek olmalı" })
  .refine((v) => v.sicakGiris_C > v.soguukGiris_C && v.sicakCikis_C > v.soguukGiris_C - 1e-12, {
    message: "Sıcak akışkan girişi soğuk akışkan girişinden yüksek olmalı",
  });

export type LmtdDuzeltmeFaktoruFInput = z.infer<typeof lmtdDuzeltmeFaktoruFInputSchema>;
export interface LmtdDuzeltmeFaktoruFOutput {
  F: number | null;
  lmtdDuzeltilmis_K: number | null;
}

const STD = "TEMA / Bowman-Mueller-Nagle (1 gövde geçişli eşanjör F faktörü)";

function compute(input: LmtdDuzeltmeFaktoruFInput): CalcResult<LmtdDuzeltmeFaktoruFOutput> {
  const { sicakGiris_C: Th1, sicakCikis_C: Th2, soguukGiris_C: Tc1, soguukCikis_C: Tc2 } = input;
  const dT1 = Th1 - Tc2; // sıcak giriş – soğuk çıkış (karşıt akış ucu 1)
  const dT2 = Th2 - Tc1; // sıcak çıkış – soğuk giriş (karşıt akış ucu 2)
  const P = (Tc2 - Tc1) / (Th1 - Tc1);
  const R = (Th1 - Th2) / (Tc2 - Tc1);
  const kesisme = dT1 <= 0 || dT2 <= 0;
  const lmtdKarsit = kesisme ? null : Math.abs(dT1 - dT2) < 1e-9 ? dT1 : (dT1 - dT2) / Math.log(dT1 / dT2);

  let F: number | null = null;
  if (!kesisme && P > 0 && P < 1) {
    const S = Math.sqrt(R * R + 1);
    let pay: number;
    let arg1: number;
    let arg2: number;
    if (Math.abs(R - 1) < 1e-9) {
      arg1 = 2 - P * (2 - Math.SQRT2);
      arg2 = 2 - P * (2 + Math.SQRT2);
      pay = (Math.SQRT2 * P) / (1 - P);
    } else {
      const oran = (1 - P) / (1 - R * P);
      arg1 = 2 - P * (R + 1 - S);
      arg2 = 2 - P * (R + 1 + S);
      pay = oran > 0 ? (S / (R - 1)) * Math.log(oran) : NaN;
    }
    if (arg1 > 0 && arg2 > 0 && Number.isFinite(pay)) {
      const f = pay / Math.log(arg1 / arg2);
      if (Number.isFinite(f) && f > 0) F = f;
    }
  }

  const ara = { P, R, lmtd_karsit_akis_K: lmtdKarsit ?? "tanımsız (sıcaklık kesişmesi)" };
  if (F === null || lmtdKarsit === null) {
    return {
      value: { F: null, lmtdDuzeltilmis_K: null },
      intermediates: { ...ara, uyari: "1 gövde geçişli eşanjörde bu sıcaklıklar için F tanımsız (sıcaklık kesişmesi)" },
      standardsUsed: [STD],
      verdict: { status: "uygunsuz", note: "Bu sıcaklık programı 1 gövde geçişli eşanjörle sağlanamaz; çok gövdeli veya karşıt akışlı eşanjör gerekir" },
    };
  }
  const lmtdD = F * lmtdKarsit;
  return {
    value: { F, lmtdDuzeltilmis_K: lmtdD },
    intermediates: { ...ara, F, lmtd_duzeltilmis_K: lmtdD },
    standardsUsed: [STD],
    verdict: {
      status: F >= 0.8 ? "uygun" : F >= 0.75 ? "sinirda" : "uygunsuz",
      note: `F = ${F.toFixed(3)} (genel tasarım ölçütü F ≥ 0,75–0,80; altında eşanjör çok gövdeli/karşıt akışlı seçilmeli)`,
    },
  };
}

export const lmtdDuzeltmeFaktoruF: CalcModule<LmtdDuzeltmeFaktoruFInput, LmtdDuzeltmeFaktoruFOutput> = {
  id: "lmtd-duzeltme-faktoru-f",
  title: "LMTD Düzeltme Faktörü F (Gövde-Tüp Eşanjör)",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: lmtdDuzeltmeFaktoruFInputSchema,
  compute,
};
