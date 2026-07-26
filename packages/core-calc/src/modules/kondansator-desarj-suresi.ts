import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// RC deşarj denklemi: V(t) = V0·e^(-t/RC) → t = R·C·ln(V1/V2).
export const kondansatorDesarjSuresiInputSchema = z.object({
  desarjDirenci_R_ohm: z.number().positive(),
  kapasite_C_F: z.number().positive(),
  ilkGerilim_V1_V: z.number().positive(),
  hedefGerilim_V2_V: z.number().positive(),
});

export type KondansatorDesarjSuresiInput = z.infer<
  typeof kondansatorDesarjSuresiInputSchema
>;

export interface KondansatorDesarjSuresiOutput {
  desarjSuresi_s: number;
}

function compute(
  input: KondansatorDesarjSuresiInput,
): CalcResult<KondansatorDesarjSuresiOutput> {
  const desarjSuresiS =
    input.desarjDirenci_R_ohm *
    input.kapasite_C_F *
    Math.log(input.ilkGerilim_V1_V / input.hedefGerilim_V2_V);

  return {
    value: { desarjSuresi_s: desarjSuresiS },
    intermediates: {
      zamanSabiti_RC_s: input.desarjDirenci_R_ohm * input.kapasite_C_F,
    },
    standardsUsed: ["RC Deşarj Denklemi"],
  };
}

export const kondansatorDesarjSuresi: CalcModule<
  KondansatorDesarjSuresiInput,
  KondansatorDesarjSuresiOutput
> = {
  id: "kondansator-desarj-suresi",
  title: "Kondansatör Deşarj Süresi",
  discipline: "elektrik",
  standards: ["RC Deşarj Denklemi"],
  inputSchema: kondansatorDesarjSuresiInputSchema,
  compute,
};
