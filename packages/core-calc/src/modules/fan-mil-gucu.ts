import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const fanMilGucuSchema = z.object({
  debi_m3s: z.number().positive(),
  basinc_pa: z.number().positive(),
  verim_yuzde: z.number().positive().default(75),
});

export type FanMilGucuInput = z.infer<typeof fanMilGucuSchema>;

export interface FanMilGucuOutput {
  hidrolik_guc_kW: number;
  mil_gucu_kW: number;
}

export const fanMilGucu: CalcModule<FanMilGucuInput, FanMilGucuOutput> = {
  id: "fan-mil-gucu",
  title: "Fan Mil Gücü",
  discipline: "mekanik",
  standards: ["ASHRAE"],
  inputSchema: fanMilGucuSchema,

  compute(input: FanMilGucuInput): CalcResult<FanMilGucuOutput> {
    const hidrolik_guc = input.debi_m3s * input.basinc_pa / 1000; // kW
    const mil_gucu = hidrolik_guc / (input.verim_yuzde / 100);

    return {
      value: {
        hidrolik_guc_kW: Math.round(hidrolik_guc * 100) / 100,
        mil_gucu_kW: Math.round(mil_gucu * 100) / 100,
      },
      intermediates: {
        verim: input.verim_yuzde / 100,
      },
      standardsUsed: ["ASHRAE"],
    };
  },
};
