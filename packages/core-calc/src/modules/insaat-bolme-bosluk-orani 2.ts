import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const bolmeBoslukSchema = z.object({
  toplam_alan_m2: z.number().positive(),
  pencere_alan_m2: z.number().positive().optional(),
  kapi_alan_m2: z.number().positive().optional(),
});

export const bolmeBoslukOrani: CalcModule<any, any> = {
  id: "insaat-bolme-bosluk-orani",
  title: "Bölme Boşluk Oranı Kontrolü",
  discipline: "insaat",
  standards: ["TS 12111"],
  inputSchema: bolmeBoslukSchema as any,

  compute(input: any) {
    const pencere = input.pencere_alan_m2 ?? 0;
    const kapi = input.kapi_alan_m2 ?? 0;
    const bosluk_toplam = pencere + kapi;
    const bosluk_orani = (bosluk_toplam / input.toplam_alan_m2) * 100;
    const status = bosluk_orani <= 30 ? "uygun" : "yüksek";
    return {
      value: { bosluk_orani_yuzde: parseFloat(bosluk_orani.toFixed(1)) },
      intermediates: { bosluk_toplam },
      standardsUsed: ["TS 12111"],
      verdict: { status, note: `${bosluk_orani.toFixed(1)}%` },
    };
  },
};
