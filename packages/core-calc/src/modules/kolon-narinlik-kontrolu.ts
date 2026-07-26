import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Narinlik oranı: λ = Lk/i, i = h/√12 (dikdörtgen kesit atalet yarıçapı).
// TBDY 2018/TS 500'de narin kolonlar için ek burkulma kontrolü gerekir;
// bu modül basit narinlik sınırını (λlim) kontrol eder.
export const kolonNarinlikKontroluInputSchema = z.object({
  etkiliBoy_Lk_m: z.number().positive(),
  kesitBoyutu_h_mm: z.number().positive(),
  narinlikSiniri_lambdaLim: z.number().positive(),
});

export type KolonNarinlikKontroluInput = z.infer<typeof kolonNarinlikKontroluInputSchema>;

export interface KolonNarinlikKontroluOutput {
  narinlikOrani_lambda: number;
}

function compute(input: KolonNarinlikKontroluInput): CalcResult<KolonNarinlikKontroluOutput> {
  const ataletYaricapiM = input.kesitBoyutu_h_mm / 1000 / Math.sqrt(12);
  const narinlikOrani = input.etkiliBoy_Lk_m / ataletYaricapiM;
  const marj = input.narinlikSiniri_lambdaLim - narinlikOrani;
  const uygun = marj >= 0;

  return {
    value: { narinlikOrani_lambda: narinlikOrani },
    intermediates: {
      ataletYaricapi_i_m: ataletYaricapiM,
      marj_lambda: marj,
    },
    standardsUsed: ["TBDY 2018", "TS 500"],
    verdict: uygun
      ? { status: "uygun", note: "Narinlik oranı sınırın altında." }
      : { status: "uygunsuz", note: "Narinlik oranı sınırı aşıyor, burkulma kontrolü gerekir." },
  };
}

export const kolonNarinlikKontrolu: CalcModule<
  KolonNarinlikKontroluInput,
  KolonNarinlikKontroluOutput
> = {
  id: "kolon-narinlik-kontrolu",
  title: "Kolon Narinlik Kontrolü",
  discipline: "insaat",
  standards: ["TBDY 2018", "TS 500"],
  inputSchema: kolonNarinlikKontroluInputSchema,
  compute,
};
