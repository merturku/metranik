import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ASTM C1074 olgunluk yöntemi, Nurse-Saul sıcaklık-zaman faktörü:
// M = Σ(Ta − T0)·Δt. Aynı betonun aynı dayanıma aynı M değerinde ulaştığı kabulüyle,
// laboratuvarda Tref sıcaklığında tref sürede ulaşılan hedef dayanıma şantiyedeki
// ortalama beton sıcaklığında ulaşma süresi: t = tref·(Tref − T0)/(Tş − T0).
// T0 (datum sıcaklığı) altında dayanım kazanımı yok kabul edilir; T0 ideal olarak
// laboratuvar deneyiyle belirlenir.
export const betonOlgunlukKalipAlmaSuresiInputSchema = z
  .object({
    referansSicaklik_Tref_C: z.number(),
    referansSure_tref_gun: z.number().positive(),
    santiyeOrtalamaSicaklik_C: z.number(),
    datumSicakligi_T0_C: z.number(),
  })
  .refine((v) => v.santiyeOrtalamaSicaklik_C > v.datumSicakligi_T0_C, {
    message: "Şantiye beton sıcaklığı datum sıcaklığının üstünde olmalı (altında dayanım kazanılmaz)",
  })
  .refine((v) => v.referansSicaklik_Tref_C > v.datumSicakligi_T0_C, {
    message: "Referans sıcaklık datum sıcaklığının üstünde olmalı",
  });

export type BetonOlgunlukKalipAlmaSuresiInput = z.infer<typeof betonOlgunlukKalipAlmaSuresiInputSchema>;

export interface BetonOlgunlukKalipAlmaSuresiOutput {
  gerekliSure_gun: number;
}

function compute(input: BetonOlgunlukKalipAlmaSuresiInput): CalcResult<BetonOlgunlukKalipAlmaSuresiOutput> {
  const referansFark = input.referansSicaklik_Tref_C - input.datumSicakligi_T0_C;
  const santiyeFark = input.santiyeOrtalamaSicaklik_C - input.datumSicakligi_T0_C;
  const hedefOlgunluk = referansFark * input.referansSure_tref_gun * 24;
  const gerekliSureGun = (input.referansSure_tref_gun * referansFark) / santiyeFark;

  return {
    value: { gerekliSure_gun: gerekliSureGun },
    intermediates: {
      hedef_olgunluk_M_Csaat: hedefOlgunluk,
      gerekli_sure_saat: gerekliSureGun * 24,
      sure_orani: gerekliSureGun / input.referansSure_tref_gun,
    },
    standardsUsed: ["ASTM C1074"],
  };
}

export const betonOlgunlukKalipAlmaSuresi: CalcModule<
  BetonOlgunlukKalipAlmaSuresiInput,
  BetonOlgunlukKalipAlmaSuresiOutput
> = {
  id: "beton-olgunluk-kalip-alma-suresi",
  title: "Beton Olgunluk Yöntemi ile Kalıp Alma Süresi",
  discipline: "insaat",
  standards: ["ASTM C1074"],
  inputSchema: betonOlgunlukKalipAlmaSuresiInputSchema,
  compute,
};
