import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit hacim/debi ilişkisi: yakıt deposunun kesintisiz besleyebileceği süre,
// depo hacminin yakıt tüketim debisine bölünmesiyle bulunur. t = V/Q.
// Jeneratör Yakıt Tüketimi veya Endüstriyel Boyler Yakıt Tüketimi
// modüllerinin ürettiği debiyi girdi olarak kullanır.
export const yakitDeposuOtonomiSuresiInputSchema = z.object({
  depoHacmi_V_L: z.number().positive(),
  yakitTuketimDebisi_Q_Lh: z.number().positive(),
});

export type YakitDeposuOtonomiSuresiInput = z.infer<
  typeof yakitDeposuOtonomiSuresiInputSchema
>;

export interface YakitDeposuOtonomiSuresiOutput {
  otonomiSuresi_saat: number;
}

function compute(
  input: YakitDeposuOtonomiSuresiInput,
): CalcResult<YakitDeposuOtonomiSuresiOutput> {
  const otonomiSuresiSaat = input.depoHacmi_V_L / input.yakitTuketimDebisi_Q_Lh;

  return {
    value: { otonomiSuresi_saat: otonomiSuresiSaat },
    intermediates: {
      otonomiSuresi_gun: otonomiSuresiSaat / 24,
    },
    standardsUsed: [],
  };
}

export const yakitDeposuOtonomiSuresi: CalcModule<
  YakitDeposuOtonomiSuresiInput,
  YakitDeposuOtonomiSuresiOutput
> = {
  id: "yakit-deposu-otonomi-suresi",
  title: "Yakıt Deposu Otonomi Süresi",
  discipline: "mekanik",
  standards: [],
  inputSchema: yakitDeposuOtonomiSuresiInputSchema,
  compute,
};
