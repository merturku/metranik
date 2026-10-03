import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const motorRotorBarAkimiSchema = z.object({
  guc_kW: z.number().positive(),
  verim_yuzde: z.number().positive().optional(),
  kutup_sayisi: z.number().positive().optional(),
});

export const motorRotorBarAkimi: CalcModule<any, any> = {
  id: "motor-rotor-bar-akimi",
  title: "Motor Rotor Bar Akımı (Eşdeğer)",
  discipline: "elektrik",
  standards: ["IEC 60034-30"],
  inputSchema: motorRotorBarAkimiSchema as any,

  compute(input: any) {
    const eta = (input.verim_yuzde ?? 90) / 100;
    const p = input.kutup_sayisi ?? 2;
    const akimi_A = (input.guc_kW * 1000) / (1.73 * 400 * eta);
    const rotor_bar_akimi = akimi_A / (p / 2);
    return {
      value: { rotor_bar_akimi_A: parseFloat(rotor_bar_akimi.toFixed(1)) },
      intermediates: { eta, akimi_A },
      standardsUsed: ["IEC 60034-30"],
    };
  },
};
