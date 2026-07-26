import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Askı noktası yükü: F = (boru + akışkan doğrusal ağırlığı) × askı aralığı.
// Newton'a çevirmek için yerçekimi ivmesi (fiziksel sabit) kullanılır.
const YERCEKIMI_M_S2 = 9.81;

export const askilamaHesabiInputSchema = z.object({
  boruAgirligi_kg_m: z.number().positive(),
  suAgirligi_kg_m: z.number().nonnegative(),
  askiAraligi_m: z.number().positive(),
});

export type AskilamaHesabiInput = z.infer<typeof askilamaHesabiInputSchema>;

export interface AskilamaHesabiOutput {
  askiYuku_kg: number;
}

function compute(input: AskilamaHesabiInput): CalcResult<AskilamaHesabiOutput> {
  const toplamDogrusalAgirlikKgM = input.boruAgirligi_kg_m + input.suAgirligi_kg_m;
  const askiYukuKg = toplamDogrusalAgirlikKgM * input.askiAraligi_m;
  const askiYukuN = askiYukuKg * YERCEKIMI_M_S2;

  return {
    value: { askiYuku_kg: askiYukuKg },
    intermediates: {
      toplamDogrusalAgirlik_kg_m: toplamDogrusalAgirlikKgM,
      askiYuku_N: askiYukuN,
    },
    standardsUsed: [],
  };
}

export const askilamaHesabi: CalcModule<AskilamaHesabiInput, AskilamaHesabiOutput> = {
  id: "askilama-hesabi",
  title: "Askılama Hesabı",
  discipline: "mekanik",
  standards: [],
  inputSchema: askilamaHesabiInputSchema,
  compute,
};
