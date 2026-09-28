import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_239Schema = z.object({
  hacim_L: z.number().positive(),
  sicaklik_artisi_K: z.number().positive(),
  guc_kW: z.number().positive(),
});

export type Modul_239Input = z.infer<typeof modul_239Schema>;

export interface Modul_239Output {
  isinma_suresi_saat: number;
  isinma_suresi_dakika: number;
}

export const modul_239: CalcModule<Modul_239Input, Modul_239Output> = {
  id: "modul_239",
  title: "Sıcak Su Isınma Süresi",
  discipline: "mekanik",
  standards: ["DIN 4708"],
  inputSchema: modul_239Schema,

  compute(input: Modul_239Input): CalcResult<Modul_239Output> {
    // Q = m × cp × ΔT → t = Q / P = (V × 1000 × 4186 × ΔT) / (P × 1000)
    const E_kJ = input.hacim_L * 4.186 * input.sicaklik_artisi_K; // kJ
    const E_kWh = E_kJ / 3600; // kWh
    const t_saat = E_kWh / input.guc_kW;
    const t_dakika = t_saat * 60;

    return {
      value: {
        isinma_suresi_saat: Math.round(t_saat * 10) / 10,
        isinma_suresi_dakika: Math.round(t_dakika),
      },
      intermediates: { enerji_kWh: Math.round(E_kWh * 100) / 100 },
      standardsUsed: ["DIN 4708"],
    };
  },
};
