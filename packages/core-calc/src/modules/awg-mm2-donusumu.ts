import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ASTM B258: d(n) = 0,127·92^((36 − n)/39) mm. n = 0 → 1/0 (53,5 mm²); n = −3 → 4/0 (107,2 mm²).
const IEC_KESITLER = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630];

export const awgMm2DonusumuInputSchema = z.object({
  awg: z.number().int().min(-3).max(40),
});

export type AwgMm2DonusumuInput = z.infer<typeof awgMm2DonusumuInputSchema>;

export interface AwgMm2DonusumuOutput {
  kesit_mm2: number;
}

function compute(input: AwgMm2DonusumuInput): CalcResult<AwgMm2DonusumuOutput> {
  const d = 0.127 * Math.pow(92, (36 - input.awg) / 39);
  const A = (Math.PI * d * d) / 4;
  const yakin = IEC_KESITLER.reduce((en, s) => (Math.abs(s - A) < Math.abs(en - A) ? s : en), IEC_KESITLER[0] as number);
  return {
    value: { kesit_mm2: A },
    intermediates: { cap_mm: d, en_yakin_iec_kesit_mm2: yakin },
    standardsUsed: ["ASTM B258 (AWG formülü)"],
  };
}

export const awgMm2Donusumu: CalcModule<AwgMm2DonusumuInput, AwgMm2DonusumuOutput> = {
  id: "awg-mm2-donusumu",
  title: "AWG – mm² Kablo Kesiti Dönüşümü",
  discipline: "elektrik",
  standards: [],
  inputSchema: awgMm2DonusumuInputSchema,
  compute,
};
