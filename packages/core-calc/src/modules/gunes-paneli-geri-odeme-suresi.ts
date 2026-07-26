import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit geri ödeme süresi (payback period): Süre = Yatırım Maliyeti / Yıllık Tasarruf.
// Enerji fiyat artışı, bakım maliyeti ve panel verim kaybı bu basit hesaba
// dahil değildir; daha kesin analiz için net bugünkü değer (NPV) yöntemi gerekir.
export const gunesPaneliGeriOdemeSuresiInputSchema = z.object({
  yatirimMaliyeti_TL: z.number().positive(),
  yillikTasarruf_TL: z.number().positive(),
});

export type GunesPaneliGeriOdemeSuresiInput = z.infer<
  typeof gunesPaneliGeriOdemeSuresiInputSchema
>;

export interface GunesPaneliGeriOdemeSuresiOutput {
  geriOdemeSuresi_yil: number;
}

function compute(
  input: GunesPaneliGeriOdemeSuresiInput,
): CalcResult<GunesPaneliGeriOdemeSuresiOutput> {
  const geriOdemeSuresi_yil = input.yatirimMaliyeti_TL / input.yillikTasarruf_TL;

  return {
    value: { geriOdemeSuresi_yil },
    intermediates: {
      yillikTasarruf_TL: input.yillikTasarruf_TL,
    },
    standardsUsed: [],
  };
}

export const gunesPaneliGeriOdemeSuresi: CalcModule<
  GunesPaneliGeriOdemeSuresiInput,
  GunesPaneliGeriOdemeSuresiOutput
> = {
  id: "gunes-paneli-geri-odeme-suresi",
  title: "Güneş Paneli Geri Ödeme Süresi",
  discipline: "ev",
  standards: [],
  inputSchema: gunesPaneliGeriOdemeSuresiInputSchema,
  compute,
};
