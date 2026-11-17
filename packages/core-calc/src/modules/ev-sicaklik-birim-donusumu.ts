import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sıcaklık dönüşümü: önce °C'ye, sonra diğer birimlere. Mutlak sıfırın altı reddedilir.
const BIRIM_ALT_SINIR_C = -273.15;

function celsiusCevir(deger: number, birim: "C" | "K" | "F" | "R"): number {
  switch (birim) {
    case "C":
      return deger;
    case "K":
      return deger - 273.15;
    case "F":
      return ((deger - 32) * 5) / 9;
    case "R":
      return ((deger - 491.67) * 5) / 9;
  }
}

export const evSicaklikBirimDonusumuInputSchema = z
  .object({
    deger: z.number(),
    birim: z.enum(["C", "K", "F", "R"]),
  })
  .refine((v) => celsiusCevir(v.deger, v.birim) >= BIRIM_ALT_SINIR_C - 1e-9, { message: "Mutlak sıfırın altında sıcaklık olamaz" });

export type EvSicaklikBirimDonusumuInput = z.infer<typeof evSicaklikBirimDonusumuInputSchema>;

export interface EvSicaklikBirimDonusumuOutput {
  celsius_C: number;
}

function compute(input: EvSicaklikBirimDonusumuInput): CalcResult<EvSicaklikBirimDonusumuOutput> {
  const c = celsiusCevir(input.deger, input.birim);
  const k = c + 273.15;
  return {
    value: { celsius_C: c },
    intermediates: { kelvin_K: k, fahrenheit_F: (c * 9) / 5 + 32, rankine_R: (k * 9) / 5 },
    standardsUsed: [],
  };
}

export const evSicaklikBirimDonusumu: CalcModule<EvSicaklikBirimDonusumuInput, EvSicaklikBirimDonusumuOutput> = {
  id: "ev-sicaklik-birim-donusumu",
  title: "Sıcaklık Birim Dönüşümü (°C, K, °F, °R)",
  discipline: "ev",
  standards: [],
  inputSchema: evSicaklikBirimDonusumuInputSchema,
  compute,
};
