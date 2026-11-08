import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pompa manometrik (toplam) yüksekliği — saha ölçümü (devreye alma/performans testi):
// H = (p_basma − p_emme)/(ρ·g) + (z_basma − z_emme) + (v_basma² − v_emme²)/(2g).
// Manometre okumaları gösterge basıncıdır (bar); okuma noktaları arası kot farkı ve hızlar (Q/A) girdidir. Sonuç Pompa Hidrolik Gücü ve
// Yangın Pompası Performans Kontrolü modüllerinin H girdisidir; üretici eğrisiyle aynı debide karşılaştırılmalıdır (ISO 9906 toleransı).
const G = 9.81;

export const pompaManometrikYukseklikOlcumuInputSchema = z.object({
  basmaBasinci_bar: z.number(),
  emmeBasinci_bar: z.number(),
  kotFarki_m: z.number(),
  basmaHizi_ms: z.number().min(0),
  emmeHizi_ms: z.number().min(0),
  yogunluk_kgm3: z.number().positive(),
});

export type PompaManometrikYukseklikOlcumuInput = z.infer<typeof pompaManometrikYukseklikOlcumuInputSchema>;

export interface PompaManometrikYukseklikOlcumuOutput {
  manometrikYukseklik_m: number;
}

function compute(input: PompaManometrikYukseklikOlcumuInput): CalcResult<PompaManometrikYukseklikOlcumuOutput> {
  const basinc = ((input.basmaBasinci_bar - input.emmeBasinci_bar) * 1e5) / (input.yogunluk_kgm3 * G);
  const hiz = (input.basmaHizi_ms ** 2 - input.emmeHizi_ms ** 2) / (2 * G);
  const h = basinc + input.kotFarki_m + hiz;
  return {
    value: { manometrikYukseklik_m: h },
    intermediates: {
      basinc_yuksekligi_m: basinc,
      kot_farki_m: input.kotFarki_m,
      hiz_yuksekligi_farki_m: hiz,
      toplam_basinc_farki_bar: h * input.yogunluk_kgm3 * G / 1e5,
    },
    standardsUsed: ["Bernoulli denklemi; ISO 9906 (pompa performans testi)"],
  };
}

export const pompaManometrikYukseklikOlcumu: CalcModule<PompaManometrikYukseklikOlcumuInput, PompaManometrikYukseklikOlcumuOutput> = {
  id: "pompa-manometrik-yukseklik-olcumu",
  title: "Pompa Manometrik Yüksekliği (Saha Ölçümü)",
  discipline: "mekanik",
  standards: ["ISO 9906"],
  inputSchema: pompaManometrikYukseklikOlcumuInputSchema,
  compute,
};
