import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fan/vantilatör mil gücü: P = Q × ΔP / η.
// Q: hava debisi (m³/h), ΔP: toplam basınç kaybı (Pa), η: fan verimi (0-1).
export const fanGucuInputSchema = z.object({
  debi_Q_m3h: z.number().positive(),
  basincKaybi_dP_Pa: z.number().positive(),
  fanVerimi_eta: z.number().positive().max(1),
});

export type FanGucuInput = z.infer<typeof fanGucuInputSchema>;

export interface FanGucuOutput {
  guc_kW: number;
}

function compute(input: FanGucuInput): CalcResult<FanGucuOutput> {
  const debi_m3s = input.debi_Q_m3h / 3600;
  const guc_W = (debi_m3s * input.basincKaybi_dP_Pa) / input.fanVerimi_eta;
  const guc_kW = guc_W / 1000;

  return {
    value: { guc_kW },
    intermediates: {
      debi_m3s: Number(debi_m3s.toFixed(4)),
      fanVerimi_eta: input.fanVerimi_eta,
    },
    standardsUsed: [],
  };
}

export const fanGucu: CalcModule<FanGucuInput, FanGucuOutput> = {
  id: "fan-gucu",
  title: "Fan Gücü",
  discipline: "mekanik",
  standards: [],
  inputSchema: fanGucuInputSchema,
  compute,
};
