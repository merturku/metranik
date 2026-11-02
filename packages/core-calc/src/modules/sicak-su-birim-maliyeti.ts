import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sıcak su birim maliyeti: enerji = m·cp·ΔT/η, m = V·ρ (ρ = 1000 kg/m³, cp = 4,186 kJ/kgK, 1 kWh = 3600 kJ).
// Maliyet = enerji (kWh) × birim enerji fiyatı (₺/kWh). Yakıt/elektrik fiyatını kWh'e çevirmek kullanıcıya bırakılmıştır
// (doğalgaz: ₺/m³ ÷ ~9,59 kWh/m³; elektrik: doğrudan ₺/kWh).
export const sicakSuBirimMaliyetiInputSchema = z.object({
  soguklukSuSicakligi_C: z.number().min(0).max(40),
  sicakSuSicakligi_C: z.number().min(30).max(95),
  cihazVerimi: z.number().gt(0).max(1.2),
  enerjiFiyati_TLkWh: z.number().min(0),
  aylikSicakSuHacmi_m3: z.number().positive(),
});

export type SicakSuBirimMaliyetiInput = z.infer<typeof sicakSuBirimMaliyetiInputSchema>;

export interface SicakSuBirimMaliyetiOutput {
  birimMaliyet_TLm3: number;
}

function compute(input: SicakSuBirimMaliyetiInput): CalcResult<SicakSuBirimMaliyetiOutput> {
  const dT = input.sicakSuSicakligi_C - input.soguklukSuSicakligi_C;
  const kwhM3 = (1000 * 4.186 * dT) / 3600 / input.cihazVerimi;
  const maliyet = kwhM3 * input.enerjiFiyati_TLkWh;
  return {
    value: { birimMaliyet_TLm3: maliyet },
    intermediates: {
      sicaklik_farki_K: dT,
      birim_enerji_kWh_m3: kwhM3,
      litre_basi_maliyet_TL: maliyet / 1000,
      aylik_enerji_kWh: kwhM3 * input.aylikSicakSuHacmi_m3,
      aylik_maliyet_TL: maliyet * input.aylikSicakSuHacmi_m3,
    },
    standardsUsed: [],
  };
}

export const sicakSuBirimMaliyeti: CalcModule<SicakSuBirimMaliyetiInput, SicakSuBirimMaliyetiOutput> = {
  id: "sicak-su-birim-maliyeti",
  title: "Sıcak Su Birim Maliyeti",
  discipline: "ev",
  standards: [],
  inputSchema: sicakSuBirimMaliyetiInputSchema,
  compute,
};
