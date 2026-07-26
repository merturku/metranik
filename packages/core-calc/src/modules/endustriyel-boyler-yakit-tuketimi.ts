import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yanma enerji dengesi: Isı Yükü = Yakıt Debisi × Alt Isıl Değer × Verim
// → Yakıt Debisi = Isı Yükü / (Alt Isıl Değer × Verim).
export const endustriyelBoylerYakitTuketimiInputSchema = z.object({
  isiYuku_Q_kW: z.number().positive(),
  yakitAltIsilDegeri_kWhm3: z.number().positive(),
  kazanVerimi_eta: z.number().positive().max(1),
});

export type EndustriyelBoylerYakitTuketimiInput = z.infer<
  typeof endustriyelBoylerYakitTuketimiInputSchema
>;

export interface EndustriyelBoylerYakitTuketimiOutput {
  yakitDebisi_m3h: number;
}

function compute(
  input: EndustriyelBoylerYakitTuketimiInput,
): CalcResult<EndustriyelBoylerYakitTuketimiOutput> {
  const yakitDebisiM3h =
    input.isiYuku_Q_kW / (input.yakitAltIsilDegeri_kWhm3 * input.kazanVerimi_eta);

  return {
    value: { yakitDebisi_m3h: yakitDebisiM3h },
    intermediates: {
      kazanVerimi_eta: input.kazanVerimi_eta,
    },
    standardsUsed: [],
  };
}

export const endustriyelBoylerYakitTuketimi: CalcModule<
  EndustriyelBoylerYakitTuketimiInput,
  EndustriyelBoylerYakitTuketimiOutput
> = {
  id: "endustriyel-boyler-yakit-tuketimi",
  title: "Endüstriyel Boyler Yakıt Tüketimi",
  discipline: "mekanik",
  standards: [],
  inputSchema: endustriyelBoylerYakitTuketimiInputSchema,
  compute,
};
