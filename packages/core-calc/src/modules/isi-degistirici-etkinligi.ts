import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const isiDegistiricietkinligiSchema = z.object({
  sicak_giris_C: z.number(),
  sicak_cikis_C: z.number(),
  soguk_giris_C: z.number(),
  soguk_cikis_C: z.number().optional(),
});

export const isiDegistiricietkinligi: CalcModule<any, any> = {
  id: "isi-degistirici-etkinligi",
  title: "Isı Değiştirici Etkinliği (ε-NTU)",
  discipline: "mekanik",
  standards: ["EN 12815"],
  inputSchema: isiDegistiricietkinligiSchema as any,

  compute(input: any) {
    const dT_max = input.sicak_giris_C - input.soguk_giris_C;
    const dT_fiili = input.sicak_giris_C - input.sicak_cikis_C;
    const etkinlik = dT_fiili / dT_max * 100;
    return {
      value: { etkinlik_yuzde: parseFloat(etkinlik.toFixed(1)) },
      intermediates: { dT_max, dT_fiili },
      standardsUsed: ["EN 12815"],
    };
  },
};
