import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const pompaKavitasyonSchema = z.object({
  emme_yuksekligi_m: z.number(),
  emme_hizi_ms: z.number().positive(),
  atm_basinci_bar: z.number().positive().optional(),
});

export const pompaKavitasyonRiski: CalcModule<any, any> = {
  id: "pompa-kavitasyon-riski",
  title: "Pompa Kavitasyon Riski (NPSH)",
  discipline: "mekanik",
  standards: ["ISO 20320"],
  inputSchema: pompaKavitasyonSchema as any,

  compute(input: any) {
    const P_atm = (input.atm_basinci_bar ?? 1.01) * 1e5;
    const P_buhar = 2340;
    const g = 9.81;
    const NPSHA = (P_atm - P_buhar) / (1000 * g) - input.emme_yuksekligi_m - (input.emme_hizi_ms ** 2) / (2 * g);
    const status = NPSHA > 0.5 ? "uygun" : "risk";
    return {
      value: { NPSHA: parseFloat(NPSHA.toFixed(2)) },
      intermediates: { P_atm, P_buhar },
      standardsUsed: ["ISO 20320"],
      verdict: { status, note: `NPSHA=${NPSHA.toFixed(2)}m` },
    };
  },
};
