import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aron (iki wattmetre) yöntemi: dengeli veya dengesiz 3 telli üç fazlı yükte iki wattmetre okuması W1, W2 ile
// P = W1 + W2,  Q = √3·(W1 − W2),  S = √(P² + Q²),  cosφ = P/S.  Okumalardan biri negatif olabilir (cosφ < 0,5).
// Yük dengeli ve dalga biçimi sinüsoidal kabul edilir (Q formülü dengeli yük için geçerlidir).
export const aronIkiWattmetreYontemiInputSchema = z.object({
  w1_W: z.number().finite(),
  w2_W: z.number().finite(),
});

export type AronIkiWattmetreYontemiInput = z.infer<typeof aronIkiWattmetreYontemiInputSchema>;

export interface AronIkiWattmetreYontemiOutput {
  aktifGuc_W: number;
}

function compute(input: AronIkiWattmetreYontemiInput): CalcResult<AronIkiWattmetreYontemiOutput> {
  const { w1_W: w1, w2_W: w2 } = input;
  const p = w1 + w2;
  const q = Math.sqrt(3) * (w1 - w2);
  const s = Math.hypot(p, q);
  const cosphi = s === 0 ? 0 : p / s;
  return {
    value: { aktifGuc_W: p },
    intermediates: {
      reaktif_guc_VAr: q,
      gorunen_guc_VA: s,
      guc_faktoru: cosphi,
      faz_acisi_derece: s === 0 ? 0 : (Math.atan2(q, p) * 180) / Math.PI,
      not: w2 < 0 || w1 < 0 ? "Bir wattmetre negatif: cosφ < 0,5" : "Okumalar pozitif: cosφ ≥ 0,5",
    },
    standardsUsed: ["Aron teoremi (iki wattmetre yöntemi)"],
  };
}

export const aronIkiWattmetreYontemi: CalcModule<AronIkiWattmetreYontemiInput, AronIkiWattmetreYontemiOutput> = {
  id: "aron-iki-wattmetre-yontemi",
  title: "İki Wattmetre (Aron) Yöntemiyle Üç Faz Güç Ölçümü",
  discipline: "elektrik",
  standards: [],
  inputSchema: aronIkiWattmetreYontemiInputSchema,
  compute,
};
