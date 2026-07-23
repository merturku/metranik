import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60364-6 Tablo 6.1'de yaygın olarak yayınlanan asgari yalıtım direnci
// değerleri (devre nominal gerilimine göre). Bu değerler standardın farklı
// baskı/ek (amendment) sürümlerinde değişebilir; kullanmadan önce yerel
// baskıdan teyit edilmelidir.
const KATEGORI_VERISI = {
  selv: { testGerilimi_V: 250, asgariDirenc_MOhm: 0.5 },
  dusuk: { testGerilimi_V: 500, asgariDirenc_MOhm: 1.0 },
  yuksek: { testGerilimi_V: 1000, asgariDirenc_MOhm: 1.0 },
} as const;

export const yalitimDirenciTestiInputSchema = z.object({
  kategori: z.enum(["selv", "dusuk", "yuksek"]),
  olculenDirenc_MOhm: z.number().positive(),
});

export type YalitimDirenciTestiInput = z.infer<typeof yalitimDirenciTestiInputSchema>;

export interface YalitimDirenciTestiOutput {
  asgariDirenc_MOhm: number;
}

function compute(input: YalitimDirenciTestiInput): CalcResult<YalitimDirenciTestiOutput> {
  const kategoriVerisi = KATEGORI_VERISI[input.kategori];
  const uygun = input.olculenDirenc_MOhm >= kategoriVerisi.asgariDirenc_MOhm;

  return {
    value: { asgariDirenc_MOhm: kategoriVerisi.asgariDirenc_MOhm },
    intermediates: {
      testGerilimi_V: kategoriVerisi.testGerilimi_V,
      olculenDirenc_MOhm: input.olculenDirenc_MOhm,
    },
    standardsUsed: ["IEC 60364-6"],
    verdict: uygun
      ? { status: "uygun", note: "Ölçülen direnç asgari değerin üzerinde." }
      : { status: "uygunsuz", note: "Ölçülen direnç asgari değerin altında." },
  };
}

export const yalitimDirenciTesti: CalcModule<YalitimDirenciTestiInput, YalitimDirenciTestiOutput> = {
  id: "yalitim-direnci-testi",
  title: "Yalıtım Direnci Testi",
  discipline: "elektrik",
  standards: ["IEC 60364-6"],
  inputSchema: yalitimDirenciTestiInputSchema,
  compute,
};
