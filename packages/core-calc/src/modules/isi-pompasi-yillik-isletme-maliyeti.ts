import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isı pompası yıllık işletme maliyeti: ısıtma-yakit-tuketimi-maliyeti modülünün
// elektrikli ısı pompası eşdeğeri. Yıllık ısı ihtiyacı, mevsimsel performans
// katsayısına (SPF) bölünerek elektrik tüketimine, ardından birim fiyatla
// maliyete çevrilir. Tüketim = Yıllık Isı İhtiyacı / SPF.
export const isiPompasiYillikIsletmeMaliyetiInputSchema = z.object({
  yillikIsiIhtiyaci_kWh: z.number().positive(),
  spf: z.number().positive(),
  birimFiyat_TLkWh: z.number().positive(),
});

export type IsiPompasiYillikIsletmeMaliyetiInput = z.infer<
  typeof isiPompasiYillikIsletmeMaliyetiInputSchema
>;

export interface IsiPompasiYillikIsletmeMaliyetiOutput {
  yillikMaliyet_TL: number;
}

function compute(
  input: IsiPompasiYillikIsletmeMaliyetiInput,
): CalcResult<IsiPompasiYillikIsletmeMaliyetiOutput> {
  const yillikTuketimKWh = input.yillikIsiIhtiyaci_kWh / input.spf;
  const yillikMaliyetTL = yillikTuketimKWh * input.birimFiyat_TLkWh;

  return {
    value: { yillikMaliyet_TL: yillikMaliyetTL },
    intermediates: {
      yillikTuketim_kWh: yillikTuketimKWh,
    },
    standardsUsed: [],
  };
}

export const isiPompasiYillikIsletmeMaliyeti: CalcModule<
  IsiPompasiYillikIsletmeMaliyetiInput,
  IsiPompasiYillikIsletmeMaliyetiOutput
> = {
  id: "isi-pompasi-yillik-isletme-maliyeti",
  title: "Isı Pompası Yıllık İşletme Maliyeti",
  discipline: "ev",
  standards: [],
  inputSchema: isiPompasiYillikIsletmeMaliyetiInputSchema,
  compute,
};
