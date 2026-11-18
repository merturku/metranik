import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Asfalt metrajı: V = G·L·t; W = V·ρ·(1 + fire); bitüm = W·oran.
export const asfaltKaplamaTonajiInputSchema = z.object({
  genislik_m: z.number().positive(),
  uzunluk_m: z.number().positive(),
  kalinlik_cm: z.number().positive(),
  yogunluk_tm3: z.number().positive(),
  firePayi: z.number().min(0),
  bitumOrani: z.number().min(0).max(0.2),
});

export type AsfaltKaplamaTonajiInput = z.infer<typeof asfaltKaplamaTonajiInputSchema>;

export interface AsfaltKaplamaTonajiOutput {
  asfaltTonaji_t: number;
}

function compute(input: AsfaltKaplamaTonajiInput): CalcResult<AsfaltKaplamaTonajiOutput> {
  const alan = input.genislik_m * input.uzunluk_m;
  const V = alan * (input.kalinlik_cm / 100);
  const W = V * input.yogunluk_tm3 * (1 + input.firePayi);
  return {
    value: { asfaltTonaji_t: W },
    intermediates: {
      sikismis_hacim_m3: V,
      bitum_ton: W * input.bitumOrani,
      alan_m2: alan,
      ton_per_m2: (input.kalinlik_cm / 100) * input.yogunluk_tm3 * 1000,
    },
    standardsUsed: [],
  };
}

export const asfaltKaplamaTonaji: CalcModule<AsfaltKaplamaTonajiInput, AsfaltKaplamaTonajiOutput> = {
  id: "asfalt-kaplama-tonaji",
  title: "Asfalt Kaplama Tonajı ve Bitüm Miktarı",
  discipline: "insaat",
  standards: [],
  inputSchema: asfaltKaplamaTonajiInputSchema,
  compute,
};
