import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sıcak su deposunda depolanan kullanılabilir ısı: E = V·ρ·cp·(Tüst − Talt)/3600 [kWh]; ρ = 1000 kg/m³, cp = 4,186 kJ/kgK (yaklaşık).
// Depo kaybı ve tabakalaşma verimi ayrı girdi (η_depo); eşdeğer elektrikli ısıtma süresi P ile verilir.
export const evIsiDepolamaKapasitesiInputSchema = z.object({
  hacim_L: z.number().positive(),
  ustSicaklik_C: z.number().finite(),
  altSicaklik_C: z.number().finite(),
  depoVerimi: z.number().gt(0).max(1),
  isiticiGucu_kW: z.number().positive(),
});

export type EvIsiDepolamaKapasitesiInput = z.infer<typeof evIsiDepolamaKapasitesiInputSchema>;

export interface EvIsiDepolamaKapasitesiOutput {
  depolananEnerji_kWh: number;
}

function compute(input: EvIsiDepolamaKapasitesiInput): CalcResult<EvIsiDepolamaKapasitesiOutput> {
  const dT = input.ustSicaklik_C - input.altSicaklik_C;
  const brut = (input.hacim_L * 4.186 * Math.max(0, dT)) / 3600;
  const net = brut * input.depoVerimi;
  return {
    value: { depolananEnerji_kWh: net },
    intermediates: {
      brut_enerji_kWh: brut,
      sicaklik_farki_K: dT,
      sarj_suresi_saat: brut / input.isiticiGucu_kW,
      not: dT <= 0 ? "Üst sıcaklık alt sıcaklıktan yüksek olmalı" : "—",
    },
    standardsUsed: [],
  };
}

export const evIsiDepolamaKapasitesi: CalcModule<EvIsiDepolamaKapasitesiInput, EvIsiDepolamaKapasitesiOutput> = {
  id: "ev-isi-depolama-kapasitesi",
  title: "Sıcak Su Deposu Isı Depolama Kapasitesi",
  discipline: "ev",
  standards: [],
  inputSchema: evIsiDepolamaKapasitesiInputSchema,
  compute,
};
