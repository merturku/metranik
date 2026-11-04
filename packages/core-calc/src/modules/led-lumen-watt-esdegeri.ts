import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Işık etkinliği η = Φ/P [lm/W]: aynı ışık akısı (lm) için LED gücü P = Φ/η_LED.
// Etkinlik üretici verisidir (LED tipik 80–130, akkor ≈ 12–15, halojen ≈ 18–25 lm/W).
export const ledLumenWattEsdegeriInputSchema = z.object({
  hedefLumen_lm: z.number().positive(),
  ledEtkinligi_lmW: z.number().positive(),
  eskiLambaGucu_W: z.number().positive(),
});

export type LedLumenWattEsdegeriInput = z.infer<typeof ledLumenWattEsdegeriInputSchema>;

export interface LedLumenWattEsdegeriOutput {
  ledGucu_W: number;
}

function compute(input: LedLumenWattEsdegeriInput): CalcResult<LedLumenWattEsdegeriOutput> {
  const led = input.hedefLumen_lm / input.ledEtkinligi_lmW;
  return {
    value: { ledGucu_W: led },
    intermediates: {
      eski_lamba_etkinligi_lmW: input.hedefLumen_lm / input.eskiLambaGucu_W,
      tasarruf_W: input.eskiLambaGucu_W - led,
      tasarruf_yuzde: ((input.eskiLambaGucu_W - led) / input.eskiLambaGucu_W) * 100,
    },
    standardsUsed: ["Işık etkinliği η = Φ/P [lm/W]"],
  };
}

export const ledLumenWattEsdegeri: CalcModule<LedLumenWattEsdegeriInput, LedLumenWattEsdegeriOutput> = {
  id: "led-lumen-watt-esdegeri",
  title: "LED Lümen–Watt Eşdeğeri",
  discipline: "ev",
  standards: [],
  inputSchema: ledLumenWattEsdegeriInputSchema,
  compute,
};
