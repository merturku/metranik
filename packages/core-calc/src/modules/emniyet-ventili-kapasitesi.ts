import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: kazan tam güçte buhar üretirken emniyet ventili bu debiyi
// tahliye edebilmelidir. Q(kg/h) = P(kW) × 3600 / hfg(kJ/kg).
export const emniyetVentiliKapasitesiInputSchema = z.object({
  kazanGucu_P_kW: z.number().positive(),
  buharlasmaGizliIsisi_hfg_kJkg: z.number().positive(),
});

export type EmniyetVentiliKapasitesiInput = z.infer<
  typeof emniyetVentiliKapasitesiInputSchema
>;

export interface EmniyetVentiliKapasitesiOutput {
  tahliyeKapasitesi_kgh: number;
}

function compute(
  input: EmniyetVentiliKapasitesiInput,
): CalcResult<EmniyetVentiliKapasitesiOutput> {
  const tahliyeKapasitesiKgh =
    (input.kazanGucu_P_kW * 3600) / input.buharlasmaGizliIsisi_hfg_kJkg;

  return {
    value: { tahliyeKapasitesi_kgh: tahliyeKapasitesiKgh },
    intermediates: {
      buharlasmaGizliIsisi_hfg_kJkg: input.buharlasmaGizliIsisi_hfg_kJkg,
    },
    standardsUsed: ["TS EN 12828"],
  };
}

export const emniyetVentiliKapasitesi: CalcModule<
  EmniyetVentiliKapasitesiInput,
  EmniyetVentiliKapasitesiOutput
> = {
  id: "emniyet-ventili-kapasitesi",
  title: "Emniyet Ventili Kapasitesi",
  discipline: "mekanik",
  standards: ["TS EN 12828"],
  inputSchema: emniyetVentiliKapasitesiInputSchema,
  compute,
};
