import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const fanGucuSchema = z.object({
  volumetrik_debi_m3s: z.number().positive(),
  toplam_basinc_Pa: z.number().positive(),
  verim_yuzde: z.number().positive().max(100),
});

export type FanGucuInput = z.infer<typeof fanGucuSchema>;

export interface FanGucuOutput {
  hidrolik_guç_kW: number;
  motor_gucu_kW: number;
}

export const fanGucu: CalcModule<FanGucuInput, FanGucuOutput> = {
  id: "fan-gucu",
  title: "Fan Gücü",
  discipline: "mekanik",
  standards: ["ASHRAE"],
  inputSchema: fanGucuSchema,

  compute(input: FanGucuInput): CalcResult<FanGucuOutput> {
    const hidrolik_guç_W = input.volumetrik_debi_m3s * input.toplam_basinc_Pa;
    const hidrolik_guç_kW = hidrolik_guç_W / 1000;
    const motor_gucu_kW = hidrolik_guç_kW / (input.verim_yuzde / 100);

    return {
      value: {
        hidrolik_guç_kW: Math.round(hidrolik_guç_kW * 100) / 100,
        motor_gucu_kW: Math.round(motor_gucu_kW * 100) / 100,
      },
      intermediates: {
        verim_oran: input.verim_yuzde / 100,
      },
      standardsUsed: ["ASHRAE"],
    };
  },
};
