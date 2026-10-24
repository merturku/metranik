import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const motorVerimSchema = z.object({
  nominal_guc_kW: z.number().positive(),
  giris_gucu_kW: z.number().positive(),
  verim_beklenen_yuzde: z.number().positive().optional(),
});

export const motorVerimSinifi: CalcModule<any, any> = {
  id: "motor-verim-sinifi",
  title: "Motor Verim Sınıfı Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 60034-30-1"],
  inputSchema: motorVerimSchema as any,

  compute(input: any) {
    const verim_fiili = (input.nominal_guc_kW / input.giris_gucu_kW) * 100;
    const IE3_min = input.verim_beklenen_yuzde ?? 94;
    const sinif = verim_fiili >= IE3_min ? "IE3+" : verim_fiili >= 91 ? "IE2" : "IE1";
    return {
      value: { verim_fiili_yuzde: parseFloat(verim_fiili.toFixed(1)), sinif },
      intermediates: { IE3_min },
      standardsUsed: ["IEC 60034-30-1"],
    };
  },
};
