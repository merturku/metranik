import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isı yalıtımı yatırım geri ödeme süresi: yalıtım sayesinde azalan yıllık ısı
// kaybının yakıt maliyetine çevrilmesiyle yıllık tasarruf, yatırım tutarının
// yıllık tasarrufa bölünmesiyle de geri ödeme süresi bulunur.
export const isiYalitimiGeriOdemeSuresiInputSchema = z.object({
  yatirimTutari_TL: z.number().positive(),
  yillikIsiKaybiAzalmasi_kWh: z.number().positive(),
  yakitFiyati_TL_kWh: z.number().positive(),
});

export type IsiYalitimiGeriOdemeSuresiInput = z.infer<
  typeof isiYalitimiGeriOdemeSuresiInputSchema
>;

export interface IsiYalitimiGeriOdemeSuresiOutput {
  geriOdemeSuresi_yil: number;
}

function compute(
  input: IsiYalitimiGeriOdemeSuresiInput,
): CalcResult<IsiYalitimiGeriOdemeSuresiOutput> {
  const yillikTasarrufTL =
    input.yillikIsiKaybiAzalmasi_kWh * input.yakitFiyati_TL_kWh;
  const geriOdemeSuresiYil = input.yatirimTutari_TL / yillikTasarrufTL;

  return {
    value: { geriOdemeSuresi_yil: geriOdemeSuresiYil },
    intermediates: {
      yillikTasarruf_TL: yillikTasarrufTL,
    },
    standardsUsed: [],
  };
}

export const isiYalitimiGeriOdemeSuresi: CalcModule<
  IsiYalitimiGeriOdemeSuresiInput,
  IsiYalitimiGeriOdemeSuresiOutput
> = {
  id: "isi-yalitimi-geri-odeme-suresi",
  title: "Isı Yalıtımı Yatırım Geri Ödeme Süresi",
  discipline: "ev",
  standards: [],
  inputSchema: isiYalitimiGeriOdemeSuresiInputSchema,
  compute,
};
