import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Cam ağırlığı: m = ρ·A·t·n (soda-kireç camı ρ = 2500 kg/m³).
export const evCamLevhaAgirligiInputSchema = z.object({
  genislik_m: z.number().positive(),
  yukseklik_m: z.number().positive(),
  kalinlik_mm: z.number().positive(),
  adet: z.number().int().min(1),
  yogunluk_kgm3: z.number().positive(),
});

export type EvCamLevhaAgirligiInput = z.infer<typeof evCamLevhaAgirligiInputSchema>;

export interface EvCamLevhaAgirligiOutput {
  toplamAgirlik_kg: number;
}

function compute(input: EvCamLevhaAgirligiInput): CalcResult<EvCamLevhaAgirligiOutput> {
  const alan = input.genislik_m * input.yukseklik_m;
  const birim = input.yogunluk_kgm3 * (input.kalinlik_mm / 1000);
  const tek = birim * alan;
  return {
    value: { toplamAgirlik_kg: tek * input.adet },
    intermediates: { birim_alan_agirligi_kgm2: birim, tek_levha_kg: tek, toplam_alan_m2: alan * input.adet },
    standardsUsed: ["TS EN 572-1"],
  };
}

export const evCamLevhaAgirligi: CalcModule<EvCamLevhaAgirligiInput, EvCamLevhaAgirligiOutput> = {
  id: "ev-cam-levha-agirligi",
  title: "Cam Levha Ağırlığı",
  discipline: "ev",
  standards: ["TS EN 572-1"],
  inputSchema: evCamLevhaAgirligiInputSchema,
  compute,
};
