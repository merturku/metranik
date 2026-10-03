import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_242Schema = z.object({
  devir_rpm: z.number().positive(),
  cap_mm: z.number().positive(),
  basinc_Pa: z.number().positive(),
  verim_yuzde: z.number().positive().optional(),
});

export type Modul_242Input = z.infer<typeof modul_242Schema>;

export interface Modul_242Output {
  mil_gucu_kW: number;
}

export const modul_242: CalcModule<Modul_242Input, Modul_242Output> = {
  id: "modul_242",
  title: "Fan Mil Gücü (P=ΔP×Q/η)",
  discipline: "mekanik",
  standards: ["ASHRAE"],
  inputSchema: modul_242Schema,

  compute(input: Modul_242Input): CalcResult<Modul_242Output> {
    // Q (m³/s) için π×r²×v = π×(D/2000)²×(ω×r) ≈ 0.001 × debi_m3h/3600
    const Q_m3s = 0.05 * input.devir_rpm / 1000; // yaklaşık
    const P_hid = Q_m3s * input.basinc_Pa / 1000;
    const P_mil = P_hid / (input.verim_yuzde / 100);

    return {
      value: {
        mil_gucu_kW: Math.round(P_mil * 1000) / 1000,
      },
      intermediates: { verim: input.verim_yuzde / 100 },
      standardsUsed: ["ASHRAE"],
    };
  },
};
