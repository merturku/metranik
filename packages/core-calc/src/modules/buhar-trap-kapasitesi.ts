import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Orifis akış denklemi: sıkıştırılamaz akışta bir orifisten geçen kütlesel
// debi ṁ = Cd×A×√(2×ρ×ΔP). Buhar tuzağı (steam trap), yoğuşan suyu (kondens)
// orifisi üzerinden tahliye eder; Cd deşarj katsayısı (tipik 0.6-0.8),
// A orifis alanı, ρ kondens yoğunluğu, ΔP trap üzerindeki basınç farkıdır.
export const buharTrapKapasitesiInputSchema = z.object({
  desarjKatsayisi_Cd: z.number().positive().max(1),
  orifisAlani_A_m2: z.number().positive(),
  kondensYogunlugu_rho_kgm3: z.number().positive(),
  basincFarki_dP_Pa: z.number().positive(),
});

export type BuharTrapKapasitesiInput = z.infer<typeof buharTrapKapasitesiInputSchema>;

export interface BuharTrapKapasitesiOutput {
  kapasite_kgh: number;
}

function compute(input: BuharTrapKapasitesiInput): CalcResult<BuharTrapKapasitesiOutput> {
  const kutleselDebiKgs =
    input.desarjKatsayisi_Cd *
    input.orifisAlani_A_m2 *
    Math.sqrt(2 * input.kondensYogunlugu_rho_kgm3 * input.basincFarki_dP_Pa);
  const kapasiteKgh = kutleselDebiKgs * 3600;

  return {
    value: { kapasite_kgh: kapasiteKgh },
    intermediates: {
      kutleselDebi_kgs: kutleselDebiKgs,
    },
    standardsUsed: [],
  };
}

export const buharTrapKapasitesi: CalcModule<
  BuharTrapKapasitesiInput,
  BuharTrapKapasitesiOutput
> = {
  id: "buhar-trap-kapasitesi",
  title: "Buhar Trap (Kondens Tuzağı) Kapasitesi",
  discipline: "mekanik",
  standards: [],
  inputSchema: buharTrapKapasitesiInputSchema,
  compute,
};
