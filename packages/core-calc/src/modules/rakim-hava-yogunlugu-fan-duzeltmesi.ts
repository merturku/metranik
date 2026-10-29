import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Rakım ve sıcaklığa göre hava yoğunluğu ve fan düzeltmesi:
// Standart atmosfer basıncı (ASHRAE Fundamentals Bölüm 1, Eş. 3): p = 101,325·(1 − 2,25577·10⁻⁵·h)^5,25588 kPa
// İdeal gaz: ρ = p/(Rd·T),  Rd = 0,287042 kJ/(kg·K) (kuru hava), T = t + 273,15 K.
// Fan aynı hacimsel debiyi verir; basınç ve mil gücü yoğunlukla orantılı değişir (fan yasaları):
// ΔP = ΔP_std·(ρ/ρ_std),  P = P_std·(ρ/ρ_std).  Katalog standardı ρ_std = 1,2 kg/m³ alınır.
const STANDART_YOGUNLUK = 1.2;
const RD = 0.287042;

export const rakimHavaYogunluguFanDuzeltmesiInputSchema = z.object({
  rakim_m: z.number().min(-400).max(8000),
  sicaklik_C: z.number().min(-60).max(150),
  katalogBasinci_Pa: z.number().min(0),
  katalogMilGucu_kW: z.number().min(0),
});

export type RakimHavaYogunluguFanDuzeltmesiInput = z.infer<typeof rakimHavaYogunluguFanDuzeltmesiInputSchema>;

export interface RakimHavaYogunluguFanDuzeltmesiOutput {
  havaYogunlugu_kgm3: number;
}

function compute(
  input: RakimHavaYogunluguFanDuzeltmesiInput,
): CalcResult<RakimHavaYogunluguFanDuzeltmesiOutput> {
  const p = 101.325 * Math.pow(1 - 2.25577e-5 * input.rakim_m, 5.25588);
  const rho = p / (RD * (input.sicaklik_C + 273.15));
  const oran = rho / STANDART_YOGUNLUK;

  return {
    value: { havaYogunlugu_kgm3: rho },
    intermediates: {
      atmosfer_basinci_kPa: p,
      yogunluk_orani_rho_rho_std: oran,
      duzeltilmis_fan_basinci_Pa: input.katalogBasinci_Pa * oran,
      duzeltilmis_mil_gucu_kW: input.katalogMilGucu_kW * oran,
    },
    standardsUsed: ["ASHRAE Fundamentals — Bölüm 1 (standart atmosfer)"],
  };
}

export const rakimHavaYogunluguFanDuzeltmesi: CalcModule<
  RakimHavaYogunluguFanDuzeltmesiInput,
  RakimHavaYogunluguFanDuzeltmesiOutput
> = {
  id: "rakim-hava-yogunlugu-fan-duzeltmesi",
  title: "Rakıma Göre Hava Yoğunluğu ve Fan Düzeltmesi",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals — Bölüm 1 (standart atmosfer)"],
  inputSchema: rakimHavaYogunluguFanDuzeltmesiInputSchema,
  compute,
};
