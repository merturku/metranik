import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// E = P·h·gün·kf/1000 (kWh/yıl).
export const evCihazYillikEnerjiMaliyetiInputSchema = z.object({
  guc_W: z.number().positive(),
  gunlukSaat_h: z.number().min(0).max(24),
  yilGun: z.number().positive().max(366),
  kf: z.number().min(0).max(1),
  fiyat: z.number().min(0),
});

export type EvCihazYillikEnerjiMaliyetiInput = z.infer<typeof evCihazYillikEnerjiMaliyetiInputSchema>;

export interface EvCihazYillikEnerjiMaliyetiOutput {
  yillikEnerji_kWh: number;
}

function compute(input: EvCihazYillikEnerjiMaliyetiInput): CalcResult<EvCihazYillikEnerjiMaliyetiOutput> {
  const gunluk = (input.guc_W * input.gunlukSaat_h * input.kf) / 1000;
  const yillik = gunluk * input.yilGun;
  const maliyet = yillik * input.fiyat;
  return {
    value: { yillikEnerji_kWh: yillik },
    intermediates: { yillik_maliyet: maliyet, aylik_maliyet: maliyet / 12, gunluk_kWh: gunluk },
    standardsUsed: [],
  };
}

export const evCihazYillikEnerjiMaliyeti: CalcModule<EvCihazYillikEnerjiMaliyetiInput, EvCihazYillikEnerjiMaliyetiOutput> = {
  id: "ev-cihaz-yillik-enerji-maliyeti",
  title: "Elektrikli Cihaz Yıllık Enerji Tüketimi ve Maliyeti",
  discipline: "ev",
  standards: [],
  inputSchema: evCihazYillikEnerjiMaliyetiInputSchema,
  compute,
};
