import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// VAV kutusu minimum debisi, tasarım (maksimum) debisinin bir oranı olarak
// belirlenir: Qmin = Qmax × Minimum Oran.
export const vavKutusuMinimumDebiInputSchema = z.object({
  maksimumDebi_Qmax_m3h: z.number().positive(),
  minimumOran: z.number().positive().max(1),
});

export type VavKutusuMinimumDebiInput = z.infer<typeof vavKutusuMinimumDebiInputSchema>;

export interface VavKutusuMinimumDebiOutput {
  minimumDebi_m3h: number;
}

function compute(input: VavKutusuMinimumDebiInput): CalcResult<VavKutusuMinimumDebiOutput> {
  const minimumDebiM3h = input.maksimumDebi_Qmax_m3h * input.minimumOran;

  return {
    value: { minimumDebi_m3h: minimumDebiM3h },
    intermediates: {
      minimumOran: input.minimumOran,
    },
    standardsUsed: [],
  };
}

export const vavKutusuMinimumDebi: CalcModule<
  VavKutusuMinimumDebiInput,
  VavKutusuMinimumDebiOutput
> = {
  id: "vav-kutusu-minimum-debi",
  title: "VAV Kutusu Minimum Debi",
  discipline: "mekanik",
  standards: [],
  inputSchema: vavKutusuMinimumDebiInputSchema,
  compute,
};
