import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duvara konsol (ankastre) montajlı boru destek braketinde eğilme gerilmesi
// kontrolü. Boru + akışkan ağırlığı yayılı yük olarak alınır; konsol için
// maksimum moment ankastre uçta M = w×L²/2 (klasik kiriş teorisi). Gerilme
// σ = M/Wx, izin verilen gerilmeyle karşılaştırılır.
export const konsolBoruDestekAraligiInputSchema = z.object({
  yayiliYuk_w_Nm: z.number().positive(),
  konsolUzunlugu_L_m: z.number().positive(),
  kesitModulu_Wx_cm3: z.number().positive(),
  izinVerilenGerilme_sigma_MPa: z.number().positive(),
});

export type KonsolBoruDestekAraligiInput = z.infer<
  typeof konsolBoruDestekAraligiInputSchema
>;

export interface KonsolBoruDestekAraligiOutput {
  gerilme_MPa: number;
}

function compute(
  input: KonsolBoruDestekAraligiInput,
): CalcResult<KonsolBoruDestekAraligiOutput> {
  const momentNm =
    (input.yayiliYuk_w_Nm * input.konsolUzunlugu_L_m ** 2) / 2;
  const kesitModuluM3 = input.kesitModulu_Wx_cm3 * 1e-6;
  const gerilmePa = momentNm / kesitModuluM3;
  const gerilmeMPa = gerilmePa / 1e6;

  return {
    value: { gerilme_MPa: gerilmeMPa },
    intermediates: {
      maksimumMoment_Nm: momentNm,
    },
    standardsUsed: [],
    verdict:
      gerilmeMPa <= input.izinVerilenGerilme_sigma_MPa
        ? { status: "uygun", note: "Hesaplanan gerilme izin verilen sınırın altında." }
        : { status: "uygunsuz", note: "Hesaplanan gerilme izin verilen sınırı aşıyor." },
  };
}

export const konsolBoruDestekAraligi: CalcModule<
  KonsolBoruDestekAraligiInput,
  KonsolBoruDestekAraligiOutput
> = {
  id: "konsol-boru-destek-araligi",
  title: "Konsol Boru Destek Aralığı Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: konsolBoruDestekAraligiInputSchema,
  compute,
};
