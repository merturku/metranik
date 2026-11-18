import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ortalama alan: V = L(A1 + A2)/2. Prizmoidal (Simpson): V = L(A1 + 4Am + A2)/6.
export const yolKesitHacmiOrtalamaPrizmoidalInputSchema = z.object({
  L_m: z.number().positive(),
  a1_m2: z.number().min(0),
  a2_m2: z.number().min(0),
  am_m2: z.number().min(0),
});

export type YolKesitHacmiOrtalamaPrizmoidalInput = z.infer<typeof yolKesitHacmiOrtalamaPrizmoidalInputSchema>;

export interface YolKesitHacmiOrtalamaPrizmoidalOutput {
  prizmoidalHacim_m3: number;
}

function compute(
  input: YolKesitHacmiOrtalamaPrizmoidalInput,
): CalcResult<YolKesitHacmiOrtalamaPrizmoidalOutput> {
  const ort = (input.L_m * (input.a1_m2 + input.a2_m2)) / 2;
  const priz = (input.L_m * (input.a1_m2 + 4 * input.am_m2 + input.a2_m2)) / 6;
  return {
    value: { prizmoidalHacim_m3: priz },
    intermediates: {
      ortalama_alan_hacmi_m3: ort,
      fark_m3: ort - priz,
      fark_pct: priz > 0 ? ((ort - priz) / priz) * 100 : 0,
    },
    standardsUsed: ["Ortalama alan / prizmoidal formül"],
  };
}

export const yolKesitHacmiOrtalamaPrizmoidal: CalcModule<
  YolKesitHacmiOrtalamaPrizmoidalInput,
  YolKesitHacmiOrtalamaPrizmoidalOutput
> = {
  id: "yol-kesit-hacmi-ortalama-prizmoidal",
  title: "Yol / Hendek Kesit Hacmi (Ortalama Alan ve Prizmoidal)",
  discipline: "insaat",
  standards: [],
  inputSchema: yolKesitHacmiOrtalamaPrizmoidalInputSchema,
  compute,
};
