import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Bağıl nem → mutlak nem (su buharı yoğunluğu): Pv = RH·Psat(T);  ρv = Pv/(Rv·T) ≈ 216,7·Pv[hPa]/(T[K]) g/m³.
// Psat Magnus formülüyle: Psat[hPa] = 6,112·exp(17,62·T/(243,12 + T)) (−45…60 °C, yaklaşık ±%0,4).
// Özgül nem W = 0,622·Pv/(P − Pv) (kg/kg kuru hava, P toplam basınç). İç ortam nem kontrolü ve nem alma/nemlendirme debisi hesaplarının girdisidir.
export const mutlakNemBagilNemDonusumuInputSchema = z.object({
  sicaklik_C: z.number().min(-45).max(60),
  bagilNem_yuzde: z.number().min(0).max(100),
  toplamBasinc_hPa: z.number().positive(),
});

export type MutlakNemBagilNemDonusumuInput = z.infer<typeof mutlakNemBagilNemDonusumuInputSchema>;

export interface MutlakNemBagilNemDonusumuOutput {
  mutlakNem_gm3: number;
}

function compute(input: MutlakNemBagilNemDonusumuInput): CalcResult<MutlakNemBagilNemDonusumuOutput> {
  const t = input.sicaklik_C;
  const psat = 6.112 * Math.exp((17.62 * t) / (243.12 + t));
  const pv = (input.bagilNem_yuzde / 100) * psat;
  const rho = (216.7 * pv) / (t + 273.15);
  const w = (0.622 * pv) / (input.toplamBasinc_hPa - pv);
  const td = (243.12 * Math.log(pv / 6.112)) / (17.62 - Math.log(pv / 6.112));
  return {
    value: { mutlakNem_gm3: rho },
    intermediates: {
      doyma_buhar_basinci_hPa: psat,
      buhar_basinci_hPa: pv,
      ozgul_nem_gkg: w * 1000,
      ciy_noktasi_C: pv > 0 ? td : "—",
      doygun_mutlak_nem_gm3: (216.7 * psat) / (t + 273.15),
    },
    standardsUsed: ["Magnus formülü (WMO/Alduchov-Eskridge katsayıları); ideal gaz yasası"],
  };
}

export const mutlakNemBagilNemDonusumu: CalcModule<MutlakNemBagilNemDonusumuInput, MutlakNemBagilNemDonusumuOutput> = {
  id: "mutlak-nem-bagil-nem-donusumu",
  title: "Bağıl Nem – Mutlak Nem – Özgül Nem Dönüşümü",
  discipline: "ev",
  standards: [],
  inputSchema: mutlakNemBagilNemDonusumuInputSchema,
  compute,
};
