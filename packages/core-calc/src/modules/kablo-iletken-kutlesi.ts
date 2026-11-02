import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kablo iletken (metal) kütlesi: m = A·n·L·ρ;  ρ_Cu = 8960, ρ_Al = 2700 kg/m³ (20 °C).
// Yalıtım, kılıf ve zırh ağırlığı dahil değildir — kablo çekme ve taşıma yükü için üretici toplam ağırlığı esas alınmalıdır.
export const kabloIletkenKutlesiInputSchema = z.object({
  kesit_mm2: z.number().positive(),
  damarSayisi: z.number().int().min(1).max(60),
  uzunluk_m: z.number().positive(),
  malzeme: z.enum(["bakir", "aluminyum"]),
});

export type KabloIletkenKutlesiInput = z.infer<typeof kabloIletkenKutlesiInputSchema>;

export interface KabloIletkenKutlesiOutput {
  kutle_kg: number;
}

const RHO = { bakir: 8960, aluminyum: 2700 } as const;

function compute(input: KabloIletkenKutlesiInput): CalcResult<KabloIletkenKutlesiOutput> {
  const birim = input.kesit_mm2 * 1e-6 * input.damarSayisi * RHO[input.malzeme];
  return {
    value: { kutle_kg: birim * input.uzunluk_m },
    intermediates: {
      birim_uzunluk_kutlesi_kgm: birim,
      toplam_metal_kesiti_mm2: input.kesit_mm2 * input.damarSayisi,
      toplam_kutle_ton: (birim * input.uzunluk_m) / 1000,
    },
    standardsUsed: [],
  };
}

export const kabloIletkenKutlesi: CalcModule<KabloIletkenKutlesiInput, KabloIletkenKutlesiOutput> = {
  id: "kablo-iletken-kutlesi",
  title: "Kablo İletken Metal Kütlesi",
  discipline: "elektrik",
  standards: [],
  inputSchema: kabloIletkenKutlesiInputSchema,
  compute,
};
