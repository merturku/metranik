import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Eşlik ısıtma: silindirik iletim q = 2πλ(Tt − Ta)/ln(D2/D1) (W/m); toplam P = q·L·(1 + pay). Tt ≤ Ta ise ısıtma gerekmez (0).
export const eslikIsitmaGucIhtiyaciInputSchema = z.object({
  boruDisCapi_mm: z.number().positive(),
  yalitimKalinligi_mm: z.number().positive(),
  lambda_WmK: z.number().positive(),
  tutulanSicaklik_C: z.number(),
  ortamSicakligi_C: z.number(),
  uzunluk_m: z.number().positive(),
  pay: z.number().min(0),
});

export type EslikIsitmaGucIhtiyaciInput = z.infer<typeof eslikIsitmaGucIhtiyaciInputSchema>;

export interface EslikIsitmaGucIhtiyaciOutput {
  birimKayip_Wm: number;
}

function compute(input: EslikIsitmaGucIhtiyaciInput): CalcResult<EslikIsitmaGucIhtiyaciOutput> {
  const D2 = input.boruDisCapi_mm + 2 * input.yalitimKalinligi_mm;
  const dT = Math.max(0, input.tutulanSicaklik_C - input.ortamSicakligi_C);
  const q = (2 * Math.PI * input.lambda_WmK * dT) / Math.log(D2 / input.boruDisCapi_mm);
  const P = q * input.uzunluk_m * (1 + input.pay);
  return {
    value: { birimKayip_Wm: q },
    intermediates: { toplam_guc_W: P, toplam_guc_kW: P / 1000, D2_mm: D2 },
    standardsUsed: ["IEC 62395-1 / IEEE 515"],
  };
}

export const eslikIsitmaGucIhtiyaci: CalcModule<EslikIsitmaGucIhtiyaciInput, EslikIsitmaGucIhtiyaciOutput> = {
  id: "eslik-isitma-guc-ihtiyaci",
  title: "Eşlik Isıtma (Heat Tracing) Güç İhtiyacı",
  discipline: "elektrik",
  standards: ["IEC 62395-1 / IEEE 515"],
  inputSchema: eslikIsitmaGucIhtiyaciInputSchema,
  compute,
};
