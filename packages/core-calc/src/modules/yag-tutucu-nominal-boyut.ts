import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1825-2: NS = Qs·ft·fd·fr. Ticari nominal boyut serisi (NS): 1, 2, 4, 7, 10, 15, 20, 25, 30, ... (5'er artış).
const NS_SERISI = [1, 2, 4, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

export const yagTutucuNominalBoyutInputSchema = z.object({
  qs_Ls: z.number().positive(),
  ft: z.number().min(1),
  fd: z.number().min(1),
  fr: z.number().min(1),
});

export type YagTutucuNominalBoyutInput = z.infer<typeof yagTutucuNominalBoyutInputSchema>;

export interface YagTutucuNominalBoyutOutput {
  nominalBoyut_NS: number;
}

function compute(input: YagTutucuNominalBoyutInput): CalcResult<YagTutucuNominalBoyutOutput> {
  const ns = input.qs_Ls * input.ft * input.fd * input.fr;
  const secilen = NS_SERISI.find((s) => s >= ns - 1e-9);
  return {
    value: { nominalBoyut_NS: ns },
    intermediates: { onerilen_standart_NS: secilen ?? "NS 100 üstü: özel tasarım" },
    standardsUsed: ["TS EN 1825-2"],
  };
}

export const yagTutucuNominalBoyut: CalcModule<YagTutucuNominalBoyutInput, YagTutucuNominalBoyutOutput> = {
  id: "yag-tutucu-nominal-boyut",
  title: "Yağ Tutucu (Gres Separatörü) Nominal Boyutu",
  discipline: "mekanik",
  standards: ["TS EN 1825-2"],
  inputSchema: yagTutucuNominalBoyutInputSchema,
  compute,
};
