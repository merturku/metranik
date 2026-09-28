import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const klimaYillikIsletmeMaliyetiSchema = z.object({
  kapasite_kW: z.number().positive(),
  saat_yillik: z.number().positive().default(3000),
  COP: z.number().positive().default(3.5),
  fiyat_kwh: z.number().positive().default(3),
});

export type KlimaYillikIsletmeMaliyetiInput = z.infer<typeof klimaYillikIsletmeMaliyetiSchema>;

export interface KlimaYillikIsletmeMaliyetiOutput {
  yillik_tüketim_kWh: number;
  yillik_maliyet_TL: number;
}

export const klimaYillikIsletmeMaliyeti: CalcModule<KlimaYillikIsletmeMaliyetiInput, KlimaYillikIsletmeMaliyetiOutput> = {
  id: "klima-yillik-isletme-maliyeti",
  title: "Klima Yıllık İşletme Maliyeti",
  discipline: "ev",
  standards: ["—"],
  inputSchema: klimaYillikIsletmeMaliyetiSchema,

  compute(input: KlimaYillikIsletmeMaliyetiInput): CalcResult<KlimaYillikIsletmeMaliyetiOutput> {
    const tüketim = (input.kapasite_kW * input.saat_yillik) / input.COP;
    const maliyet = tüketim * input.fiyat_kwh;

    return {
      value: {
        yillik_tüketim_kWh: Math.round(tüketim),
        yillik_maliyet_TL: Math.round(maliyet),
      },
      intermediates: { COP_kullanılan: input.COP },
      standardsUsed: ["—"],
    };
  },
};
