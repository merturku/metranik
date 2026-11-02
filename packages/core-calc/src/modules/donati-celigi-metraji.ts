import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Nervürlü/düz donatı çeliği ağırlığı: m = π/4·d²·ρ·L, ρ = 7850 kg/m³ (TS 708 nominal birim kütle
// ≈ 0,00617·d² kg/m ile uyumlu). Fire/bindirme payı yüzde olarak eklenir (satın alma miktarı).
export const donatiCeligiMetrajiInputSchema = z.object({
  cap_mm: z.number().min(6).max(50),
  adet: z.number().int().positive(),
  boy_m: z.number().positive(),
  fireYuzde: z.number().min(0).max(30),
});

export type DonatiCeligiMetrajiInput = z.infer<typeof donatiCeligiMetrajiInputSchema>;

export interface DonatiCeligiMetrajiOutput {
  agirlik_kg: number;
}

function compute(input: DonatiCeligiMetrajiInput): CalcResult<DonatiCeligiMetrajiOutput> {
  const d = input.cap_mm / 1000;
  const birim = (Math.PI / 4) * d * d * 7850;
  const net = birim * input.adet * input.boy_m;
  const brut = net * (1 + input.fireYuzde / 100);
  return {
    value: { agirlik_kg: brut },
    intermediates: {
      birim_agirlik_kgm: birim,
      toplam_boy_m: input.adet * input.boy_m,
      net_agirlik_kg: net,
      brut_agirlik_ton: brut / 1000,
      fire_kg: brut - net,
    },
    standardsUsed: ["TS 708"],
  };
}

export const donatiCeligiMetraji: CalcModule<DonatiCeligiMetrajiInput, DonatiCeligiMetrajiOutput> = {
  id: "donati-celigi-metraji",
  title: "Donatı Çeliği Ağırlığı ve Metrajı",
  discipline: "insaat",
  standards: ["TS 708"],
  inputSchema: donatiCeligiMetrajiInputSchema,
  compute,
};
