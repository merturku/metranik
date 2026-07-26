import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sehim kontrolü için basitleştirilmiş açıklık/derinlik oranı kuralı (TS 500/ACI 318
// Tablo 9.5(a) benzeri): hmin = Ln / mn. mn mesnet koşuluna göre değişir
// (basit mesnetli ~20, tek ucu sürekli ~24, iki ucu sürekli ~28, konsol ~10).
export const dosemeKalinligiInputSchema = z.object({
  serbestAciklik_Ln_m: z.number().positive(),
  mesnetKatsayisi_mn: z.number().positive(),
});

export type DosemeKalinligiInput = z.infer<typeof dosemeKalinligiInputSchema>;

export interface DosemeKalinligiOutput {
  minimumKalinlik_cm: number;
}

function compute(input: DosemeKalinligiInput): CalcResult<DosemeKalinligiOutput> {
  const minimumKalinlikM = input.serbestAciklik_Ln_m / input.mesnetKatsayisi_mn;

  return {
    value: { minimumKalinlik_cm: minimumKalinlikM * 100 },
    intermediates: {
      mesnetKatsayisi_mn: input.mesnetKatsayisi_mn,
    },
    standardsUsed: ["TS 500", "TBDY 2018"],
  };
}

export const dosemeKalinligi: CalcModule<DosemeKalinligiInput, DosemeKalinligiOutput> = {
  id: "doseme-kalinligi",
  title: "Döşeme Kalınlığı (Sehim Kontrolü)",
  discipline: "insaat",
  standards: ["TS 500", "TBDY 2018"],
  inputSchema: dosemeKalinligiInputSchema,
  compute,
};
