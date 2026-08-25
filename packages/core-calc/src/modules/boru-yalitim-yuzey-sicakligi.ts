import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Silindirik iletim (izolasyon) + taşınım (dış yüzey) direnç ağı: yüzey
// sıcaklığı, akışkan-ortam sıcaklık farkının iki direnç arasında bölüşümüyle
// bulunur. R'ins = ln(r2/r1)/(2πk), R'conv = 1/(h×2π×r2), Q' = ΔT/(R'ins+R'conv),
// Tyüzey = Tortam + Q'×R'conv. ASTM C1055, kazara temasla yanık riskini
// sınırlamak için erişilebilir yüzeylerde tipik ~60°C üst sınır önerir.
export const boruYalitimYuzeySicakligiInputSchema = z.object({
  izolasyonIsiIletkenligi_k_WmK: z.number().positive(),
  boruDisYaricapi_r1_mm: z.number().positive(),
  izolasyonDisYaricapi_r2_mm: z.number().positive(),
  icSicaklik_T1_C: z.number(),
  ortamSicakligi_Tamb_C: z.number(),
  disTasinimKatsayisi_h_Wm2K: z.number().positive(),
  izinVerilenMaxYuzeySicakligi_C: z.number().positive(),
});

export type BoruYalitimYuzeySicakligiInput = z.infer<
  typeof boruYalitimYuzeySicakligiInputSchema
>;

export interface BoruYalitimYuzeySicakligiOutput {
  yuzeySicakligi_C: number;
}

function compute(
  input: BoruYalitimYuzeySicakligiInput,
): CalcResult<BoruYalitimYuzeySicakligiOutput> {
  const r2MetreM = input.izolasyonDisYaricapi_r2_mm / 1000;
  const iletimDirenciMKW =
    Math.log(input.izolasyonDisYaricapi_r2_mm / input.boruDisYaricapi_r1_mm) /
    (2 * Math.PI * input.izolasyonIsiIletkenligi_k_WmK);
  const tasinimDirenciMKW = 1 / (input.disTasinimKatsayisi_h_Wm2K * 2 * Math.PI * r2MetreM);
  const isiAkisiWm =
    (input.icSicaklik_T1_C - input.ortamSicakligi_Tamb_C) /
    (iletimDirenciMKW + tasinimDirenciMKW);
  const yuzeySicakligiC = input.ortamSicakligi_Tamb_C + isiAkisiWm * tasinimDirenciMKW;

  return {
    value: { yuzeySicakligi_C: yuzeySicakligiC },
    intermediates: {
      iletimDirenci_mKW: iletimDirenciMKW,
      tasinimDirenci_mKW: tasinimDirenciMKW,
      isiAkisi_Wm: isiAkisiWm,
    },
    standardsUsed: ["ASTM C1055"],
    verdict:
      yuzeySicakligiC <= input.izinVerilenMaxYuzeySicakligi_C
        ? { status: "uygun", note: "Yüzey sıcaklığı izin verilen dokunma sınırının altında." }
        : { status: "uygunsuz", note: "Yüzey sıcaklığı izin verilen dokunma sınırını aşıyor." },
  };
}

export const boruYalitimYuzeySicakligi: CalcModule<
  BoruYalitimYuzeySicakligiInput,
  BoruYalitimYuzeySicakligiOutput
> = {
  id: "boru-yalitim-yuzey-sicakligi",
  title: "Yalıtımlı Boru Yüzey Sıcaklığı",
  discipline: "mekanik",
  standards: ["ASTM C1055"],
  inputSchema: boruYalitimYuzeySicakligiInputSchema,
  compute,
};
