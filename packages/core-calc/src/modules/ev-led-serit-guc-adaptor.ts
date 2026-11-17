import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// LED şerit: P = (W/m)·L; I = P/U; adaptör = P·(1 + yedek).
export const evLedSeritGucAdaptorInputSchema = z.object({
  wm: z.number().positive(),
  uzunluk_m: z.number().positive(),
  gerilim_V: z.number().positive(),
  yedek: z.number().min(0),
});

export type EvLedSeritGucAdaptorInput = z.infer<typeof evLedSeritGucAdaptorInputSchema>;

export interface EvLedSeritGucAdaptorOutput {
  toplamGuc_W: number;
}

function compute(input: EvLedSeritGucAdaptorInput): CalcResult<EvLedSeritGucAdaptorOutput> {
  const P = input.wm * input.uzunluk_m;
  return {
    value: { toplamGuc_W: P },
    intermediates: { akim_A: P / input.gerilim_V, adaptor_gucu_W: P * (1 + input.yedek), kWh_gunluk_6saat: (P * 6) / 1000 },
    standardsUsed: [],
  };
}

export const evLedSeritGucAdaptor: CalcModule<EvLedSeritGucAdaptorInput, EvLedSeritGucAdaptorOutput> = {
  id: "ev-led-serit-guc-adaptor",
  title: "LED Şerit Toplam Güç ve Adaptör Seçimi",
  discipline: "ev",
  standards: [],
  inputSchema: evLedSeritGucAdaptorInputSchema,
  compute,
};
