import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji tüketiminden CO₂ emisyonu: E = Σ tüketim_i · emisyon faktörü_i.
// Doğalgaz faktörü IPCC 2006: 56,1 kgCO₂/GJ × ≈34,5 MJ/m³ ≈ 1,93 kgCO₂/m³ (varsayılan 1,935).
// Elektrik şebeke faktörü ülke/yıla göre değişir — resmi güncel kaynaktan girin (varsayılan yalnız örnektir).
export const enerjiCo2EmisyonuInputSchema = z.object({
  elektrik_kWh: z.number().min(0),
  elektrikFaktoru_kgkWh: z.number().min(0).max(1.5),
  dogalgaz_m3: z.number().min(0),
  dogalgazFaktoru_kgm3: z.number().min(0).max(3),
});

export type EnerjiCo2EmisyonuInput = z.infer<typeof enerjiCo2EmisyonuInputSchema>;

export interface EnerjiCo2EmisyonuOutput {
  toplamEmisyon_kg: number;
}

function compute(input: EnerjiCo2EmisyonuInput): CalcResult<EnerjiCo2EmisyonuOutput> {
  const el = input.elektrik_kWh * input.elektrikFaktoru_kgkWh;
  const gaz = input.dogalgaz_m3 * input.dogalgazFaktoru_kgm3;
  const top = el + gaz;
  return {
    value: { toplamEmisyon_kg: top },
    intermediates: {
      elektrik_emisyonu_kg: el,
      dogalgaz_emisyonu_kg: gaz,
      toplam_ton: top / 1000,
      elektrik_payi_yuzde: top > 0 ? (el / top) * 100 : 0,
    },
    standardsUsed: ["IPCC 2006 Guidelines (doğalgaz emisyon faktörü)"],
  };
}

export const enerjiCo2Emisyonu: CalcModule<EnerjiCo2EmisyonuInput, EnerjiCo2EmisyonuOutput> = {
  id: "enerji-co2-emisyonu",
  title: "Enerji Tüketiminden CO₂ Emisyonu",
  discipline: "ev",
  standards: ["IPCC 2006"],
  inputSchema: enerjiCo2EmisyonuInputSchema,
  compute,
};
