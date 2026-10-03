import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const evElektrikTasarufuSchema = z.object({
  yatirim_TL: z.number().positive(),
  yillik_tasarruf_TL: z.number().positive(),
});

export const evElektrikTasarufuGeriOdeme: CalcModule<any, any> = {
  id: "ev-elektrik-tasarrufu-geri-odeme",
  title: "Elektrik Tasarrufu Geri Ödeme Süresi",
  discipline: "ev",
  standards: ["—"],
  inputSchema: evElektrikTasarufuSchema as any,

  compute(input: any) {
    const sure_yil = input.yatirim_TL / input.yillik_tasarruf_TL;
    return {
      value: { sure_yil: parseFloat(sure_yil.toFixed(1)) },
      intermediates: { yatirim: input.yatirim_TL, yillik_tasarruf: input.yillik_tasarruf_TL },
      standardsUsed: ["—"],
    };
  },
};
