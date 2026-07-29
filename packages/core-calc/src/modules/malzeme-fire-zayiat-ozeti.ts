import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Malzeme fire/zayiat özeti: teorik (net) miktar üzerine kesim/kırılma/artık
// kayıplarını karşılayan fire oranı eklenerek satın alınacak brüt miktar
// bulunur. GerekliMiktar = TeorikMiktar × (1 + FireOranı).
export const malzemeFireZayiatOzetiInputSchema = z.object({
  teorikMiktar: z.number().positive(),
  fireOrani_yuzde: z.number().nonnegative(),
});

export type MalzemeFireZayiatOzetiInput = z.infer<
  typeof malzemeFireZayiatOzetiInputSchema
>;

export interface MalzemeFireZayiatOzetiOutput {
  gerekliMiktar: number;
}

function compute(
  input: MalzemeFireZayiatOzetiInput,
): CalcResult<MalzemeFireZayiatOzetiOutput> {
  const gerekliMiktar =
    input.teorikMiktar * (1 + input.fireOrani_yuzde / 100);
  const fireMiktari = gerekliMiktar - input.teorikMiktar;

  return {
    value: { gerekliMiktar },
    intermediates: {
      fireMiktari,
    },
    standardsUsed: [],
  };
}

export const malzemeFireZayiatOzeti: CalcModule<
  MalzemeFireZayiatOzetiInput,
  MalzemeFireZayiatOzetiOutput
> = {
  id: "malzeme-fire-zayiat-ozeti",
  title: "Malzeme Fire / Zayiat Özeti",
  discipline: "insaat",
  standards: [],
  inputSchema: malzemeFireZayiatOzetiInputSchema,
  compute,
};
