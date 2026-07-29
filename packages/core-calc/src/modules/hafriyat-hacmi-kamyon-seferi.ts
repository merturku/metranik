import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hafriyat hacmi ve kamyon sefer sayısı: yerinde (bank) hacim basit prizma
// yaklaşımıyla (Alan × Derinlik) bulunur; kazılan zemin gevşediği için
// taşınacak hacim bir gevşeme (swell) faktörüyle büyütülür. Sefer sayısı,
// gevşemiş hacmin kamyon kapasitesine bölünüp yukarı yuvarlanmasıyla bulunur.
export const hafriyatHacmiKamyonSeferiInputSchema = z.object({
  kazilacakAlan_m2: z.number().positive(),
  kaziDerinligi_m: z.number().positive(),
  gevsemeFaktoru: z.number().positive(),
  kamyonKapasitesi_m3: z.number().positive(),
});

export type HafriyatHacmiKamyonSeferiInput = z.infer<
  typeof hafriyatHacmiKamyonSeferiInputSchema
>;

export interface HafriyatHacmiKamyonSeferiOutput {
  kamyonSeferSayisi: number;
}

function compute(
  input: HafriyatHacmiKamyonSeferiInput,
): CalcResult<HafriyatHacmiKamyonSeferiOutput> {
  const bankHacimM3 = input.kazilacakAlan_m2 * input.kaziDerinligi_m;
  const gevsekHacimM3 = bankHacimM3 * input.gevsemeFaktoru;
  const kamyonSeferSayisi = Math.ceil(gevsekHacimM3 / input.kamyonKapasitesi_m3);

  return {
    value: { kamyonSeferSayisi },
    intermediates: {
      bankHacim_m3: bankHacimM3,
      gevsekHacim_m3: gevsekHacimM3,
    },
    standardsUsed: [],
  };
}

export const hafriyatHacmiKamyonSeferi: CalcModule<
  HafriyatHacmiKamyonSeferiInput,
  HafriyatHacmiKamyonSeferiOutput
> = {
  id: "hafriyat-hacmi-kamyon-seferi",
  title: "Hafriyat Hacmi & Kamyon Sefer Sayısı",
  discipline: "insaat",
  standards: [],
  inputSchema: hafriyatHacmiKamyonSeferiInputSchema,
  compute,
};
