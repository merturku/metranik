import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yalıtımlı borunun sonundaki akışkan sıcaklığı (Ramey/Newton): T(L) = Ta + (Ti − Ta)·exp(−U'·L/(ṁ·cp)), U' = boy başına toplam ısı geçirgenliği (W/mK).
// Isı kaybı Q = ṁ·cp·(Ti − T(L)). Su için ρ = 1000 kg/m³, cp = 4186 J/kgK kabul edilir; sabit U' ve sabit ortam sıcaklığı varsayımı.
export const boruBoyuncaSicaklikDusumuInputSchema = z.object({
  girisSicakligi_C: z.number().finite(),
  ortamSicakligi_C: z.number().finite(),
  boyBasinaGecirgenlik_WmK: z.number().positive(),
  uzunluk_m: z.number().positive(),
  debi_m3h: z.number().positive(),
});

export type BoruBoyuncaSicaklikDusumuInput = z.infer<typeof boruBoyuncaSicaklikDusumuInputSchema>;

export interface BoruBoyuncaSicaklikDusumuOutput {
  cikisSicakligi_C: number;
}

function compute(input: BoruBoyuncaSicaklikDusumuInput): CalcResult<BoruBoyuncaSicaklikDusumuOutput> {
  const mcp = ((input.debi_m3h * 1000) / 3600) * 4186;
  const x = (input.boyBasinaGecirgenlik_WmK * input.uzunluk_m) / mcp;
  const tc = input.ortamSicakligi_C + (input.girisSicakligi_C - input.ortamSicakligi_C) * Math.exp(-x);
  return {
    value: { cikisSicakligi_C: tc },
    intermediates: {
      sicaklik_dusumu_K: input.girisSicakligi_C - tc,
      isi_kaybi_W: mcp * (input.girisSicakligi_C - tc),
      ntu_benzeri_us: x,
      ortalama_kayip_Wm: (mcp * (input.girisSicakligi_C - tc)) / input.uzunluk_m,
    },
    standardsUsed: ["Üstel soğuma (Ramey) — enerji dengesi"],
  };
}

export const boruBoyuncaSicaklikDusumu: CalcModule<BoruBoyuncaSicaklikDusumuInput, BoruBoyuncaSicaklikDusumuOutput> = {
  id: "boru-boyunca-sicaklik-dusumu",
  title: "Boru Boyunca Akışkan Sıcaklık Düşümü",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruBoyuncaSicaklikDusumuInputSchema,
  compute,
};
