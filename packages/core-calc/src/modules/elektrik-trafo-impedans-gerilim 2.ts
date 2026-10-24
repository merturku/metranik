import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const trafoImpedansSchema = z.object({
  guc_kVA: z.number().positive(),
  kisa_devre_kaybi_kW: z.number().positive(),
  voltaj_birincil_kV: z.number().positive(),
});

export const trafoImpedansGerilim: CalcModule<any, any> = {
  id: "elektrik-trafo-impedans-gerilim",
  title: "Trafo Empedans Gerilim Düşümü",
  discipline: "elektrik",
  standards: ["IEC 60076"],
  inputSchema: trafoImpedansSchema as any,

  compute(input: any) {
    const baseZim = (input.voltaj_birincil_kV ** 2) / input.guc_kVA * 1000;
    const Z_yuzde = (input.kisa_devre_kaybi_kW * baseZim) / (input.voltaj_birincil_kV ** 2 * 10);
    return {
      value: { Z_yuzde: parseFloat(Z_yuzde.toFixed(2)) },
      intermediates: { baseZim },
      standardsUsed: ["IEC 60076"],
    };
  },
};
