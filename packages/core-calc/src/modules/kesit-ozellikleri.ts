import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit kesit geometrik özellikleri (mm, mm², mm⁴): 
//  dikdörtgen b×h : A = bh, I = bh³/12, W = I/(h/2)
//  dolu daire Ø d : A = πd²/4, I = πd⁴/64, W = I/(d/2)
//  boru Ø D, et t : A = π(D² − d²)/4, I = π(D⁴ − d⁴)/64, d = D − 2t
// i = √(I/A) atalet yarıçapı. Eğilme eksen asal eksendir (dikdörtgende güçlü eksen: h boyutu).
export const kesitOzellikleriInputSchema = z
  .object({
    tip: z.enum(["dikdortgen", "daire", "boru"]),
    boyut1_mm: z.number().positive(),
    boyut2_mm: z.number().positive(),
  })
  .refine((v) => v.tip !== "boru" || 2 * v.boyut2_mm < v.boyut1_mm, { message: "Boruda 2·t < D olmalı" });

export type KesitOzellikleriInput = z.infer<typeof kesitOzellikleriInputSchema>;

export interface KesitOzellikleriOutput {
  alan_mm2: number;
}

function compute(input: KesitOzellikleriInput): CalcResult<KesitOzellikleriOutput> {
  let A: number;
  let I: number;
  let c: number;
  if (input.tip === "dikdortgen") {
    const b = input.boyut1_mm;
    const h = input.boyut2_mm;
    A = b * h;
    I = (b * h ** 3) / 12;
    c = h / 2;
  } else if (input.tip === "daire") {
    const d = input.boyut1_mm;
    A = (Math.PI * d * d) / 4;
    I = (Math.PI * d ** 4) / 64;
    c = d / 2;
  } else {
    const D = input.boyut1_mm;
    const di = D - 2 * input.boyut2_mm;
    A = (Math.PI * (D * D - di * di)) / 4;
    I = (Math.PI * (D ** 4 - di ** 4)) / 64;
    c = D / 2;
  }
  return {
    value: { alan_mm2: A },
    intermediates: {
      atalet_momenti_mm4: I,
      mukavemet_momenti_mm3: I / c,
      atalet_yaricapi_mm: Math.sqrt(I / A),
      ekstrem_lif_mesafesi_mm: c,
    },
    standardsUsed: ["Klasik mukavemet (kesit geometrisi)"],
  };
}

export const kesitOzellikleri: CalcModule<KesitOzellikleriInput, KesitOzellikleriOutput> = {
  id: "kesit-ozellikleri",
  title: "Kesit Özellikleri (Dikdörtgen / Daire / Boru)",
  discipline: "insaat",
  standards: [],
  inputSchema: kesitOzellikleriInputSchema,
  compute,
};
