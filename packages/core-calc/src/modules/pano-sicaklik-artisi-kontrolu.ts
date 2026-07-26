import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 61439 pano içi sıcaklık artış sınırı kontrolü: ölçülen - ortam sıcaklık
// farkı, izin verilen sıcaklık artışını (K) aşmamalı.
export const panoSicaklikArtisiKontroluInputSchema = z.object({
  ortamSicakligi_C: z.number(),
  olculenSicaklik_C: z.number(),
  izinVerilenSicaklikArtisi_K: z.number().positive(),
});

export type PanoSicaklikArtisiKontroluInput = z.infer<
  typeof panoSicaklikArtisiKontroluInputSchema
>;

export interface PanoSicaklikArtisiKontroluOutput {
  marj_K: number;
}

function compute(
  input: PanoSicaklikArtisiKontroluInput,
): CalcResult<PanoSicaklikArtisiKontroluOutput> {
  const sicaklikArtisiK = input.olculenSicaklik_C - input.ortamSicakligi_C;
  const marjK = input.izinVerilenSicaklikArtisi_K - sicaklikArtisiK;
  const uygun = marjK >= 0;

  return {
    value: { marj_K: marjK },
    intermediates: {
      sicaklikArtisi_K: sicaklikArtisiK,
      izinVerilenSicaklikArtisi_K: input.izinVerilenSicaklikArtisi_K,
    },
    standardsUsed: ["IEC 61439"],
    verdict: uygun
      ? { status: "uygun", note: "Ölçülen sıcaklık artışı izin verilen sınırın altında." }
      : { status: "uygunsuz", note: "Ölçülen sıcaklık artışı izin verilen sınırı aşıyor." },
  };
}

export const panoSicaklikArtisiKontrolu: CalcModule<
  PanoSicaklikArtisiKontroluInput,
  PanoSicaklikArtisiKontroluOutput
> = {
  id: "pano-sicaklik-artisi-kontrolu",
  title: "Pano Sıcaklık Artışı Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 61439"],
  inputSchema: panoSicaklikArtisiKontroluInputSchema,
  compute,
};
