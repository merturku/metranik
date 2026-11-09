import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kohezyonsuz zeminde bağıl sıkılık: e = Gs·γw/γd − 1;  Dr = (emaks − e)/(emaks − emin). emaks/emin laboratuvarda ASTM D4254 / D4253 ile bulunur.
// Sınıflama (Lambe & Whitman / Das): < %15 çok gevşek, 15–35 gevşek, 35–65 orta sıkı, 65–85 sıkı, > 85 çok sıkı.
const GAMMA_W = 9.81;

export const zeminBagilSikilikInputSchema = z
  .object({
    ozgulAgirlikGs: z.number().min(2).max(3.2),
    kuruBirimHacimAgirlik_kNm3: z.number().positive(),
    emaks: z.number().positive(),
    emin: z.number().positive(),
  })
  .refine((v) => v.emaks > v.emin, { message: "emaks > emin olmalı" });

export type ZeminBagilSikilikInput = z.infer<typeof zeminBagilSikilikInputSchema>;

export interface ZeminBagilSikilikOutput {
  bagilSikilik_yuzde: number;
}

function compute(input: ZeminBagilSikilikInput): CalcResult<ZeminBagilSikilikOutput> {
  const e = (input.ozgulAgirlikGs * GAMMA_W) / input.kuruBirimHacimAgirlik_kNm3 - 1;
  const dr = ((input.emaks - e) / (input.emaks - input.emin)) * 100;
  const sinif = dr < 15 ? "Çok gevşek" : dr < 35 ? "Gevşek" : dr < 65 ? "Orta sıkı" : dr < 85 ? "Sıkı" : "Çok sıkı";
  return {
    value: { bagilSikilik_yuzde: dr },
    intermediates: {
      bosluk_orani_e: e,
      sinif,
      not: dr < 0 || dr > 100 ? "Dr aralık dışı: γd veya emaks/emin tutarsız" : "—",
    },
    standardsUsed: ["ASTM D4254 / D4253 (emaks, emin)"],
  };
}

export const zeminBagilSikilik: CalcModule<ZeminBagilSikilikInput, ZeminBagilSikilikOutput> = {
  id: "zemin-bagil-sikilik",
  title: "Zemin Bağıl Sıkılık (Dr) ve Sınıfı",
  discipline: "insaat",
  standards: ["ASTM D4254", "ASTM D4253"],
  inputSchema: zeminBagilSikilikInputSchema,
  compute,
};
