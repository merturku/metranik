import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Klima yıllık işletme maliyeti: soğutma/ısıtma kapasitesi COP/EER ile çekilen
// elektrik gücüne çevrilir, günlük çalışma süresi ve yıllık gün sayısıyla
// yıllık tüketime, ardından birim fiyatla maliyete dönüştürülür.
// Elektrik Gücü = Kapasite / COP, Yıllık Tüketim = Elektrik Gücü × Saat × Gün.
export const klimaYillikIsletmeMaliyetiInputSchema = z.object({
  kapasite_kW: z.number().positive(),
  cop: z.number().positive(),
  gunlukCalismaSuresi_saat: z.number().positive().max(24),
  yillikCalismaGunSayisi: z.number().positive().max(366),
  birimFiyat_TLkWh: z.number().positive(),
});

export type KlimaYillikIsletmeMaliyetiInput = z.infer<
  typeof klimaYillikIsletmeMaliyetiInputSchema
>;

export interface KlimaYillikIsletmeMaliyetiOutput {
  yillikMaliyet_TL: number;
}

function compute(
  input: KlimaYillikIsletmeMaliyetiInput,
): CalcResult<KlimaYillikIsletmeMaliyetiOutput> {
  const elektrikGucuKW = input.kapasite_kW / input.cop;
  const yillikTuketimKWh =
    elektrikGucuKW * input.gunlukCalismaSuresi_saat * input.yillikCalismaGunSayisi;
  const yillikMaliyetTL = yillikTuketimKWh * input.birimFiyat_TLkWh;

  return {
    value: { yillikMaliyet_TL: yillikMaliyetTL },
    intermediates: {
      elektrikGucu_kW: elektrikGucuKW,
      yillikTuketim_kWh: yillikTuketimKWh,
    },
    standardsUsed: [],
  };
}

export const klimaYillikIsletmeMaliyeti: CalcModule<
  KlimaYillikIsletmeMaliyetiInput,
  KlimaYillikIsletmeMaliyetiOutput
> = {
  id: "klima-yillik-isletme-maliyeti",
  title: "Klima Yıllık İşletme Maliyeti",
  discipline: "ev",
  standards: [],
  inputSchema: klimaYillikIsletmeMaliyetiInputSchema,
  compute,
};
