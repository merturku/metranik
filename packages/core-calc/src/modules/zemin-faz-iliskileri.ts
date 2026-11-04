import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Zemin faz ilişkileri: Sr·e = w·Gs;  γ = Gs·γw·(1+w)/(1+e);  γd = Gs·γw/(1+e);
// γsat = (Gs+e)·γw/(1+e);  γ' = γsat − γw;  n = e/(1+e).  γw = 9,81 kN/m³.
export const zeminFazIliskileriInputSchema = z
  .object({
    ozgulAgirlikGs: z.number().min(2).max(3.2),
    bosluk_orani_e: z.number().positive(),
    su_muhtevasi_w: z.number().min(0),
  })
  .refine((v) => v.su_muhtevasi_w * v.ozgulAgirlikGs <= v.bosluk_orani_e + 1e-9, { message: "w·Gs ≤ e olmalı (doygunluk ≤ %100)" });

export type ZeminFazIliskileriInput = z.infer<typeof zeminFazIliskileriInputSchema>;

export interface ZeminFazIliskileriOutput {
  dogalBirimHacimAgirlik_kNm3: number;
}

function compute(input: ZeminFazIliskileriInput): CalcResult<ZeminFazIliskileriOutput> {
  const gw = 9.81;
  const { ozgulAgirlikGs: gs, bosluk_orani_e: e, su_muhtevasi_w: w } = input;
  const gamma = (gs * gw * (1 + w)) / (1 + e);
  return {
    value: { dogalBirimHacimAgirlik_kNm3: gamma },
    intermediates: {
      kuru_birim_hacim_agirlik_kNm3: (gs * gw) / (1 + e),
      doygun_birim_hacim_agirlik_kNm3: ((gs + e) * gw) / (1 + e),
      batik_birim_hacim_agirlik_kNm3: ((gs - 1) * gw) / (1 + e),
      porozite_n: e / (1 + e),
      doygunluk_derecesi_Sr_yuzde: ((w * gs) / e) * 100,
    },
    standardsUsed: ["Zemin mekaniği faz ilişkileri (Das, Principles of Geotechnical Engineering)"],
  };
}

export const zeminFazIliskileri: CalcModule<ZeminFazIliskileriInput, ZeminFazIliskileriOutput> = {
  id: "zemin-faz-iliskileri",
  title: "Zemin Faz İlişkileri (Birim Hacim Ağırlık)",
  discipline: "insaat",
  standards: [],
  inputSchema: zeminFazIliskileriInputSchema,
  compute,
};
