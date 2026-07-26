import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Özgül yakıt tüketimi (SFC) yöntemi: Yakıt Debisi = Güç × SFC.
export const jeneratorYakitTuketimiInputSchema = z.object({
  guc_kW: z.number().positive(),
  ozgulYakitTuketimi_SFC_Lkwh: z.number().positive(),
});

export type JeneratorYakitTuketimiInput = z.infer<
  typeof jeneratorYakitTuketimiInputSchema
>;

export interface JeneratorYakitTuketimiOutput {
  yakitDebisi_Lh: number;
}

function compute(
  input: JeneratorYakitTuketimiInput,
): CalcResult<JeneratorYakitTuketimiOutput> {
  const yakitDebisiLh = input.guc_kW * input.ozgulYakitTuketimi_SFC_Lkwh;

  return {
    value: { yakitDebisi_Lh: yakitDebisiLh },
    intermediates: {
      ozgulYakitTuketimi_SFC_Lkwh: input.ozgulYakitTuketimi_SFC_Lkwh,
    },
    standardsUsed: [],
  };
}

export const jeneratorYakitTuketimi: CalcModule<
  JeneratorYakitTuketimiInput,
  JeneratorYakitTuketimiOutput
> = {
  id: "jenerator-yakit-tuketimi",
  title: "Jeneratör Yakıt Tüketimi",
  discipline: "elektrik",
  standards: [],
  inputSchema: jeneratorYakitTuketimiInputSchema,
  compute,
};
