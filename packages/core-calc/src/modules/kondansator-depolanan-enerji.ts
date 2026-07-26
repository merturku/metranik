import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kondansatörde depolanan elektrik enerjisi: E = 0.5 × C × V².
// C: kapasite (F), V: kondansatör üzerindeki gerilim (V).
export const kondansatorDepolananEnerjiInputSchema = z.object({
  kapasite_C_F: z.number().positive(),
  gerilim_V_V: z.number().positive(),
});

export type KondansatorDepolananEnerjiInput = z.infer<
  typeof kondansatorDepolananEnerjiInputSchema
>;

export interface KondansatorDepolananEnerjiOutput {
  enerji_J: number;
}

function compute(
  input: KondansatorDepolananEnerjiInput,
): CalcResult<KondansatorDepolananEnerjiOutput> {
  const enerji_J = 0.5 * input.kapasite_C_F * input.gerilim_V_V ** 2;

  return {
    value: { enerji_J },
    intermediates: {
      gerilim_V_V: input.gerilim_V_V,
    },
    standardsUsed: [],
  };
}

export const kondansatorDepolananEnerji: CalcModule<
  KondansatorDepolananEnerjiInput,
  KondansatorDepolananEnerjiOutput
> = {
  id: "kondansator-depolanan-enerji",
  title: "Kondansatör Depolanan Enerji",
  discipline: "elektrik",
  standards: [],
  inputSchema: kondansatorDepolananEnerjiInputSchema,
  compute,
};
