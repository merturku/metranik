import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const evSuTuketimSchema = z.object({
  kisi_sayisi: z.number().positive(),
  gunluk_tüketim_kisibasina_L: z.number().positive().optional(),
});

export const evSuTuketimTahmini: CalcModule<any, any> = {
  id: "ev-su-tuketim-tahmini",
  title: "Günlük Su Tüketim Tahmini",
  discipline: "ev",
  standards: ["TS 1074"],
  inputSchema: evSuTuketimSchema as any,

  compute(input: any) {
    const kisi_tüketim = input.gunluk_tüketim_kisibasina_L ?? 150;
    const gunluk_m3 = (input.kisi_sayisi * kisi_tüketim) / 1000;
    const yillik_m3 = gunluk_m3 * 365;
    return {
      value: { gunluk_m3: parseFloat(gunluk_m3.toFixed(2)), yillik_m3: parseFloat(yillik_m3.toFixed(0)) },
      intermediates: { kisi_tüketim },
      standardsUsed: ["TS 1074"],
    };
  },
};
