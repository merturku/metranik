import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çelik boru + içindeki su + yalıtım birim uzunluk ağırlığı (geometrik alan × yoğunluk):
// çelik 7850 kg/m³, su 1000 kg/m³; yalıtım yoğunluğu kullanıcı girdisi (taş yünü ~100, elastomerik ~60 kg/m³).
// Askılama Hesabı'nın boru ve su ağırlığı girdilerini üretir. Toplam, askı/destek yük hesabına girer.
export const boruBirimAgirligiInputSchema = z
  .object({
    disCap_mm: z.number().positive(),
    etKalinligi_mm: z.number().positive(),
    yalitimKalinligi_mm: z.number().min(0),
    yalitimYogunlugu_kgm3: z.number().min(0),
    icerik: z.enum(["dolu", "bos"]),
  })
  .refine((v) => v.etKalinligi_mm * 2 < v.disCap_mm, { message: "Et kalınlığı çapa göre çok büyük" });

export type BoruBirimAgirligiInput = z.infer<typeof boruBirimAgirligiInputSchema>;

export interface BoruBirimAgirligiOutput {
  toplam_kgm: number;
}

const RHO_CELIK = 7850;
const RHO_SU = 1000;

function compute(input: BoruBirimAgirligiInput): CalcResult<BoruBirimAgirligiOutput> {
  const D = input.disCap_mm / 1000;
  const di = (input.disCap_mm - 2 * input.etKalinligi_mm) / 1000;
  const dy = D + (2 * input.yalitimKalinligi_mm) / 1000;
  const k = Math.PI / 4;
  const celik = k * (D * D - di * di) * RHO_CELIK;
  const su = input.icerik === "dolu" ? k * di * di * RHO_SU : 0;
  const yalitim = k * (dy * dy - D * D) * input.yalitimYogunlugu_kgm3;
  const toplam = celik + su + yalitim;
  return {
    value: { toplam_kgm: toplam },
    intermediates: {
      celik_boru_kgm: celik,
      su_kgm: su,
      yalitim_kgm: yalitim,
      ic_cap_mm: di * 1000,
      toplam_N_m: toplam * 9.80665,
    },
    standardsUsed: ["Geometrik ağırlık (çelik 7850, su 1000 kg/m³)"],
  };
}

export const boruBirimAgirligi: CalcModule<BoruBirimAgirligiInput, BoruBirimAgirligiOutput> = {
  id: "boru-birim-agirligi",
  title: "Boru Birim Uzunluk Ağırlığı (Boru + Su + Yalıtım)",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruBirimAgirligiInputSchema,
  compute,
};
