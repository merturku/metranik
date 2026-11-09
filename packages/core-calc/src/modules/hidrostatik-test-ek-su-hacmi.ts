import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Boru hattı hidrostatik testinde basınç yükseltmek için pompalanması gereken ek su: ΔV = V·ΔP·(1/Kw + D/(E·t)) (suyun sıkışması + ince cidar boru genleşmesi).
// EN 805 §11'de izin verilen kayıp ΔVmaks = 1,2·ΔV olarak verilir (hava cebi/uygulama payı); standardın güncel sürümünden teyit edin. Eksenel gerilme ve mesnet etkisi ihmal edilmiştir.
export const hidrostatikTestEkSuHacmiInputSchema = z.object({
  hatHacmi_L: z.number().positive(),
  basincArtisi_bar: z.number().positive(),
  icCap_mm: z.number().positive(),
  etKalinligi_mm: z.number().positive(),
  boruEMod_MPa: z.number().positive(),
  suHacimModulu_MPa: z.number().positive(),
});

export type HidrostatikTestEkSuHacmiInput = z.infer<typeof hidrostatikTestEkSuHacmiInputSchema>;

export interface HidrostatikTestEkSuHacmiOutput {
  ekSu_L: number;
}

function compute(input: HidrostatikTestEkSuHacmiInput): CalcResult<HidrostatikTestEkSuHacmiOutput> {
  const dp = input.basincArtisi_bar * 0.1; // MPa
  const suKismi = 1 / input.suHacimModulu_MPa;
  const boruKismi = input.icCap_mm / (input.boruEMod_MPa * input.etKalinligi_mm);
  const dv = input.hatHacmi_L * dp * (suKismi + boruKismi);
  return {
    value: { ekSu_L: dv },
    intermediates: {
      su_sikismasi_L: input.hatHacmi_L * dp * suKismi,
      boru_genlesmesi_L: input.hatHacmi_L * dp * boruKismi,
      izin_verilen_kayip_L: 1.2 * dv,
    },
    standardsUsed: ["EN 805 §11 (hidrostatik basınç deneyi)"],
  };
}

export const hidrostatikTestEkSuHacmi: CalcModule<HidrostatikTestEkSuHacmiInput, HidrostatikTestEkSuHacmiOutput> = {
  id: "hidrostatik-test-ek-su-hacmi",
  title: "Hidrostatik Test Ek Su Hacmi",
  discipline: "mekanik",
  standards: ["EN 805"],
  inputSchema: hidrostatikTestEkSuHacmiInputSchema,
  compute,
};
