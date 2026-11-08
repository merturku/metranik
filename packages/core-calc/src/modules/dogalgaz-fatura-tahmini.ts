import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Doğalgaz fatura tahmini: tüketim m³ → enerji kWh = m³·Hu (Hu ≈ 9,59 kWh/m³ ≈ 8250 kcal/m³, dağıtım şirketi
// değerini kullanın); tutar = (kWh·birim fiyat + sabit bedel)·(1 + vergi). Fiyat/vergi tarife dönemine göre değişir ve girdidir.
export const dogalgazFaturaTahminiInputSchema = z.object({
  tuketim_m3: z.number().min(0),
  isilDeger_kWhm3: z.number().positive(),
  birimFiyat_TLkWh: z.number().min(0),
  sabitBedel_TL: z.number().min(0),
  vergi_yuzde: z.number().min(0).max(100),
});

export type DogalgazFaturaTahminiInput = z.infer<typeof dogalgazFaturaTahminiInputSchema>;

export interface DogalgazFaturaTahminiOutput {
  toplamTutar_TL: number;
}

function compute(input: DogalgazFaturaTahminiInput): CalcResult<DogalgazFaturaTahminiOutput> {
  const kwh = input.tuketim_m3 * input.isilDeger_kWhm3;
  const ara = kwh * input.birimFiyat_TLkWh + input.sabitBedel_TL;
  const toplam = ara * (1 + input.vergi_yuzde / 100);
  return {
    value: { toplamTutar_TL: toplam },
    intermediates: {
      enerji_kWh: kwh,
      vergisiz_tutar_TL: ara,
      vergi_tutari_TL: toplam - ara,
      m3_basina_maliyet_TL: input.tuketim_m3 > 0 ? toplam / input.tuketim_m3 : "—",
    },
    standardsUsed: [],
  };
}

export const dogalgazFaturaTahmini: CalcModule<DogalgazFaturaTahminiInput, DogalgazFaturaTahminiOutput> = {
  id: "dogalgaz-fatura-tahmini",
  title: "Doğalgaz Fatura Tahmini (m³ → kWh)",
  discipline: "ev",
  standards: [],
  inputSchema: dogalgazFaturaTahminiInputSchema,
  compute,
};
