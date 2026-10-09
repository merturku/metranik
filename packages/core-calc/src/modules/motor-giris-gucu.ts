import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const motorGirisuSchema = z.object({ cikis_guc_kW: z.number().positive(), verim_yuzde: z.number().positive().optional() });
export const motorGirisGucu: CalcModule<any, any> = {
  id: "motor-giris-gucu",
  title: "Motor Giriş Gücü",
  discipline: "elektrik",
  standards: ["IEC 60034-1"],
  inputSchema: motorGirisuSchema as any,
  compute(input: any) {
    const eta = (input.verim_yuzde ?? 90) / 100;
    const P_giris = input.cikis_guc_kW / eta;
    const kayip = P_giris - input.cikis_guc_kW;
    return { value: { P_giris_kW: parseFloat(P_giris.toFixed(2)), kayip_kW: parseFloat(kayip.toFixed(2)) }, intermediates: { eta }, standardsUsed: ["IEC 60034-1"] };
  },
};
