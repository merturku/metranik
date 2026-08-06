import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yıllık ısıtma yakıt tüketimi ve maliyeti: yıllık ısı ihtiyacı, yakıtın alt
// ısıl değeri ve kazan/sistem verimiyle yakıt miktarına çevrilir.
// Tüketim = YıllıkIsıİhtiyacı / (AltIsılDeğer × Verim), Maliyet = Tüketim × BirimFiyat.
export const isitmaYakitTuketimiMaliyetiInputSchema = z.object({
  yillikIsiIhtiyaci_kWh: z.number().positive(),
  yakitAltIsilDegeri_kWh_birim: z.number().positive(),
  kazanVerimi: z.number().positive().max(1),
  yakitBirimFiyati_TL_birim: z.number().positive(),
});

export type IsitmaYakitTuketimiMaliyetiInput = z.infer<
  typeof isitmaYakitTuketimiMaliyetiInputSchema
>;

export interface IsitmaYakitTuketimiMaliyetiOutput {
  yillikMaliyet_TL: number;
}

function compute(
  input: IsitmaYakitTuketimiMaliyetiInput,
): CalcResult<IsitmaYakitTuketimiMaliyetiOutput> {
  const yillikYakitTuketimiBirim =
    input.yillikIsiIhtiyaci_kWh /
    (input.yakitAltIsilDegeri_kWh_birim * input.kazanVerimi);
  const yillikMaliyetTL =
    yillikYakitTuketimiBirim * input.yakitBirimFiyati_TL_birim;

  return {
    value: { yillikMaliyet_TL: yillikMaliyetTL },
    intermediates: {
      yillikYakitTuketimi_birim: yillikYakitTuketimiBirim,
    },
    standardsUsed: [],
  };
}

export const isitmaYakitTuketimiMaliyeti: CalcModule<
  IsitmaYakitTuketimiMaliyetiInput,
  IsitmaYakitTuketimiMaliyetiOutput
> = {
  id: "isitma-yakit-tuketimi-maliyeti",
  title: "Isıtma Yakıt Tüketimi & Maliyeti",
  discipline: "ev",
  standards: [],
  inputSchema: isitmaYakitTuketimiMaliyetiInputSchema,
  compute,
};
