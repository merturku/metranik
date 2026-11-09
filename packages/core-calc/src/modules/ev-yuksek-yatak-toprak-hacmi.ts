import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yüksek yatak / saksı toprak hacmi: V = L·G·H; torba sayısı = ⌈V·(1 + oturma)/V_torba⌉. Oturma payı organik karışımın ilk sezon çökmesi içindir (≈ %10–20).
export const evYuksekYatakToprakHacmiInputSchema = z.object({
  uzunluk_m: z.number().positive(),
  genislik_m: z.number().positive(),
  derinlik_m: z.number().positive(),
  oturmaPayiYuzde: z.number().min(0).max(50),
  torbaHacmi_L: z.number().positive(),
});

export type EvYuksekYatakToprakHacmiInput = z.infer<typeof evYuksekYatakToprakHacmiInputSchema>;

export interface EvYuksekYatakToprakHacmiOutput {
  torbaSayisi: number;
}

function compute(input: EvYuksekYatakToprakHacmiInput): CalcResult<EvYuksekYatakToprakHacmiOutput> {
  const v = input.uzunluk_m * input.genislik_m * input.derinlik_m;
  const vL = v * 1000 * (1 + input.oturmaPayiYuzde / 100);
  const n = Math.ceil(vL / input.torbaHacmi_L - 1e-9);
  return {
    value: { torbaSayisi: n },
    intermediates: { net_hacim_m3: v, oturma_dahil_hacim_L: vL, satin_alinan_hacim_L: n * input.torbaHacmi_L },
    standardsUsed: [],
  };
}

export const evYuksekYatakToprakHacmi: CalcModule<EvYuksekYatakToprakHacmiInput, EvYuksekYatakToprakHacmiOutput> = {
  id: "ev-yuksek-yatak-toprak-hacmi",
  title: "Yüksek Yatak / Saksı Toprak Hacmi ve Torba Sayısı",
  discipline: "ev",
  standards: [],
  inputSchema: evYuksekYatakToprakHacmiInputSchema,
  compute,
};
