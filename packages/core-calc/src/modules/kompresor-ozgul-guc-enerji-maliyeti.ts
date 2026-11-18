import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Özgül güç = P/FAD (kW/(m³/dk)); kWh/m³ = P/(60·FAD); yıllık enerji = P·yük·saat.
export const kompresorOzgulGucEnerjiMaliyetiInputSchema = z.object({
  guc_kW: z.number().positive(),
  fad_m3dk: z.number().positive(),
  yukOrani: z.number().min(0).max(1),
  saat_h: z.number().positive(),
  fiyat: z.number().min(0),
});

export type KompresorOzgulGucEnerjiMaliyetiInput = z.infer<typeof kompresorOzgulGucEnerjiMaliyetiInputSchema>;

export interface KompresorOzgulGucEnerjiMaliyetiOutput {
  ozgulGuc: number;
}

function compute(input: KompresorOzgulGucEnerjiMaliyetiInput): CalcResult<KompresorOzgulGucEnerjiMaliyetiOutput> {
  const ozgul = input.guc_kW / input.fad_m3dk;
  const kwhM3 = input.guc_kW / (60 * input.fad_m3dk);
  const E = input.guc_kW * input.yukOrani * input.saat_h;
  return {
    value: { ozgulGuc: ozgul },
    intermediates: { kWh_per_m3: kwhM3, yillik_enerji_kWh: E, yillik_maliyet: E * input.fiyat, maliyet_1000m3: kwhM3 * 1000 * input.fiyat },
    standardsUsed: ["ISO 1217 / özgül güç tanımı"],
  };
}

export const kompresorOzgulGucEnerjiMaliyeti: CalcModule<
  KompresorOzgulGucEnerjiMaliyetiInput,
  KompresorOzgulGucEnerjiMaliyetiOutput
> = {
  id: "kompresor-ozgul-guc-enerji-maliyeti",
  title: "Kompresör Özgül Güç ve Yıllık Enerji Maliyeti",
  discipline: "mekanik",
  standards: [],
  inputSchema: kompresorOzgulGucEnerjiMaliyetiInputSchema,
  compute,
};
