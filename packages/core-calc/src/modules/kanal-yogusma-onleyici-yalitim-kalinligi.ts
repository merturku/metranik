import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Düzlemsel direnç ağı: (Ta − Ts)/(Ta − Tc) = Ro/(Ro + t/λ) → t = λ·Ro·[(Ta − Tc)/(Ta − Ts) − 1], Ro = 1/ho. Ts = Tçiy + pay.
const MAGNUS_A = 17.62;
const MAGNUS_B = 243.12;

export const kanalYogusmaOnleyiciYalitimKalinligiInputSchema = z.object({
  ortamSicakligi_C: z.number(),
  bagilNem_pct: z.number().min(1).max(100),
  kanalSicakligi_C: z.number(),
  lambda_WmK: z.number().positive(),
  hDis_Wm2K: z.number().positive(),
  pay_K: z.number().min(0),
});

export type KanalYogusmaOnleyiciYalitimKalinligiInput = z.infer<typeof kanalYogusmaOnleyiciYalitimKalinligiInputSchema>;

export interface KanalYogusmaOnleyiciYalitimKalinligiOutput {
  kalinlik_mm: number | null;
}

function compute(
  input: KanalYogusmaOnleyiciYalitimKalinligiInput,
): CalcResult<KanalYogusmaOnleyiciYalitimKalinligiOutput> {
  const Ta = input.ortamSicakligi_C;
  const gamma = Math.log(input.bagilNem_pct / 100) + (MAGNUS_A * Ta) / (MAGNUS_B + Ta);
  const Td = (MAGNUS_B * gamma) / (MAGNUS_A - gamma);
  const Ts = Td + input.pay_K;
  const Tc = input.kanalSicakligi_C;
  const standart = ["TS EN ISO 12241"];
  if (Ts >= Ta) {
    return {
      value: { kalinlik_mm: null },
      intermediates: { ciy_noktasi_C: Td, hedef_yuzey_sicakligi_C: Ts, not_: "Hedef yüzey sıcaklığı ortam sıcaklığına ulaşıyor (nem çok yüksek): yalıtımla çözülemez, nem alma gerekir" },
      standardsUsed: standart,
    };
  }
  if (Tc >= Ts) {
    return {
      value: { kalinlik_mm: 0 },
      intermediates: { ciy_noktasi_C: Td, hedef_yuzey_sicakligi_C: Ts, not_: "Kanal sıcaklığı zaten hedef yüzey sıcaklığının üstünde: yoğuşma yok" },
      standardsUsed: standart,
    };
  }
  const t = (input.lambda_WmK / input.hDis_Wm2K) * ((Ta - Tc) / (Ta - Ts) - 1);
  return {
    value: { kalinlik_mm: t * 1000 },
    intermediates: { ciy_noktasi_C: Td, hedef_yuzey_sicakligi_C: Ts, not_: "—" },
    standardsUsed: standart,
  };
}

export const kanalYogusmaOnleyiciYalitimKalinligi: CalcModule<
  KanalYogusmaOnleyiciYalitimKalinligiInput,
  KanalYogusmaOnleyiciYalitimKalinligiOutput
> = {
  id: "kanal-yogusma-onleyici-yalitim-kalinligi",
  title: "Soğuk Hava Kanalı Yoğuşma Önleyici Yalıtım Kalınlığı",
  discipline: "mekanik",
  standards: ["TS EN ISO 12241"],
  inputSchema: kanalYogusmaOnleyiciYalitimKalinligiInputSchema,
  compute,
};
