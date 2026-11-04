import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Bekleme tüketimi: E = P_bekleme·adet·saat/gün·365/1000 [kWh/yıl]; maliyet = E × birim fiyat.
// Bekleme gücü cihaz etiketi veya watt-metre ölçümüdür; fiyat örnek girdidir.
export const evBeklemeTuketimiMaliyetiInputSchema = z.object({
  beklemeGucu_W: z.number().min(0),
  cihazSayisi: z.number().positive(),
  gunlukBeklemeSaati: z.number().gt(0).max(24),
  birimFiyat_TLkWh: z.number().min(0),
});

export type EvBeklemeTuketimiMaliyetiInput = z.infer<typeof evBeklemeTuketimiMaliyetiInputSchema>;

export interface EvBeklemeTuketimiMaliyetiOutput {
  yillikMaliyet_TL: number;
}

function compute(input: EvBeklemeTuketimiMaliyetiInput): CalcResult<EvBeklemeTuketimiMaliyetiOutput> {
  const kwh = (input.beklemeGucu_W * input.cihazSayisi * input.gunlukBeklemeSaati * 365) / 1000;
  return {
    value: { yillikMaliyet_TL: kwh * input.birimFiyat_TLkWh },
    intermediates: {
      yillik_enerji_kWh: kwh,
      toplam_bekleme_gucu_W: input.beklemeGucu_W * input.cihazSayisi,
      aylik_maliyet_TL: (kwh * input.birimFiyat_TLkWh) / 12,
    },
    standardsUsed: ["E = P·n·h·365/1000 (enerji = güç × süre)"],
  };
}

export const evBeklemeTuketimiMaliyeti: CalcModule<EvBeklemeTuketimiMaliyetiInput, EvBeklemeTuketimiMaliyetiOutput> = {
  id: "ev-bekleme-tuketimi-maliyeti",
  title: "Bekleme (Standby) Tüketimi Maliyeti",
  discipline: "ev",
  standards: [],
  inputSchema: evBeklemeTuketimiMaliyetiInputSchema,
  compute,
};
