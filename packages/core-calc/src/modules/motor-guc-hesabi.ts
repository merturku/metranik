import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const motorGucSchema = z.object({ P_cikis_kW: z.number().positive(), eta: z.number().positive().optional() });
export const motorGucHesabi: CalcModule<any, any> = {
  id: "motor-guc-hesabi",
  title: "Motor Giriş Gücü",
  discipline: "elektrik",
  standards: ["IEC 60034"],
  inputSchema: motorGucSchema as any,
  compute(input: any) {
    const verim = (input.eta ?? 90) / 100;
    const P_giris = input.P_cikis_kW / verim;
    return { value: { P_giris_kW: parseFloat(P_giris.toFixed(2)) }, intermediates: { verim }, standardsUsed: ["IEC 60034"] };
  },
};
