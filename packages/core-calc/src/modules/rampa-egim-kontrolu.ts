import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Tekerlekli sandalye rampası eğim kontrolü: Eğim% = (Yükseklik / Uzunluk) × 100.
// TS 9111 (Erişilebilirlik) genel kullanım için ~%8 (1:12) üst sınır öngörür;
// kısa rampalarda bu sınır standarttaki tablo değerine göre gevşeyebilir.
export const rampaEgimKontroluInputSchema = z.object({
  yukseklik_m: z.number().positive(),
  rampaUzunlugu_m: z.number().positive(),
  izinVerilenEgim_yuzde: z.number().positive(),
});

export type RampaEgimKontroluInput = z.infer<typeof rampaEgimKontroluInputSchema>;

export interface RampaEgimKontroluOutput {
  egim_yuzde: number;
}

function compute(input: RampaEgimKontroluInput): CalcResult<RampaEgimKontroluOutput> {
  const egimYuzde = (input.yukseklik_m / input.rampaUzunlugu_m) * 100;
  const marjYuzde = input.izinVerilenEgim_yuzde - egimYuzde;

  return {
    value: { egim_yuzde: egimYuzde },
    intermediates: {
      marj_yuzde: marjYuzde,
    },
    standardsUsed: ["TS 9111"],
    verdict:
      egimYuzde <= input.izinVerilenEgim_yuzde
        ? { status: "uygun", note: "Eğim izin verilen sınırın altında." }
        : { status: "uygunsuz", note: "Eğim izin verilen sınırı aşıyor." },
  };
}

export const rampaEgimKontrolu: CalcModule<
  RampaEgimKontroluInput,
  RampaEgimKontroluOutput
> = {
  id: "rampa-egim-kontrolu",
  title: "Rampa Eğim Kontrolü",
  discipline: "ev",
  standards: ["TS 9111"],
  inputSchema: rampaEgimKontroluInputSchema,
  compute,
};
