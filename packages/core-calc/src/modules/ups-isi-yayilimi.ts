import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// UPS ısı yayılımı: Qısı = Pçıkış·(1/η − 1) (kayıplar ısıya dönüşür). 1 kW = 3412,14 BTU/h; 1 TR = 3,51685 kW.
export const upsIsiYayilimiInputSchema = z.object({
  cikisGucu_kW: z.number().positive(),
  verim: z.number().min(0.5).max(1),
  yedekPayi: z.number().min(0),
});

export type UpsIsiYayilimiInput = z.infer<typeof upsIsiYayilimiInputSchema>;

export interface UpsIsiYayilimiOutput {
  isiYayilimi_kW: number;
}

function compute(input: UpsIsiYayilimiInput): CalcResult<UpsIsiYayilimiOutput> {
  const girisGucu = input.cikisGucu_kW / input.verim;
  const Q = girisGucu - input.cikisGucu_kW;
  const Qs = Q * (1 + input.yedekPayi);
  return {
    value: { isiYayilimi_kW: Q },
    intermediates: {
      giris_gucu_kW: girisGucu,
      gerekli_sogutma_kW: Qs,
      gerekli_sogutma_BTUh: Qs * 3412.14,
      gerekli_sogutma_TR: Qs / 3.51685,
    },
    standardsUsed: ["IEC 62040-3"],
  };
}

export const upsIsiYayilimi: CalcModule<UpsIsiYayilimiInput, UpsIsiYayilimiOutput> = {
  id: "ups-isi-yayilimi",
  title: "UPS Isı Yayılımı ve Oda Soğutma Yükü",
  discipline: "elektrik",
  standards: ["IEC 62040-3"],
  inputSchema: upsIsiYayilimiInputSchema,
  compute,
};
