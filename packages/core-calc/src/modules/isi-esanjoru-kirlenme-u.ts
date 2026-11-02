import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isı geçirgenlik katsayısı direnç ağı (TEMA, düz cidar yaklaşımı):
// 1/U = 1/h1 + Rf1 + t/k + Rf2 + 1/h2 ;  temiz U ise Rf = 0 ile.
// Eşanjör Boyutlandırma'nın girdi aldığı U'yu, taşınım katsayıları ve kirlenme dirençlerinden üretir.
export const isiEsanjoruKirlenmeUInputSchema = z.object({
  h1_Wm2K: z.number().positive(),
  h2_Wm2K: z.number().positive(),
  cidarKalinligi_mm: z.number().min(0),
  cidarIletkenligi_WmK: z.number().positive(),
  kirlenme1_m2KW: z.number().min(0),
  kirlenme2_m2KW: z.number().min(0),
});

export type IsiEsanjoruKirlenmeUInput = z.infer<typeof isiEsanjoruKirlenmeUInputSchema>;

export interface IsiEsanjoruKirlenmeUOutput {
  U_kirli_Wm2K: number;
}

function compute(input: IsiEsanjoruKirlenmeUInput): CalcResult<IsiEsanjoruKirlenmeUOutput> {
  const rCidar = input.cidarKalinligi_mm / 1000 / input.cidarIletkenligi_WmK;
  const rTemiz = 1 / input.h1_Wm2K + rCidar + 1 / input.h2_Wm2K;
  const rKirli = rTemiz + input.kirlenme1_m2KW + input.kirlenme2_m2KW;
  const uTemiz = 1 / rTemiz;
  const uKirli = 1 / rKirli;
  return {
    value: { U_kirli_Wm2K: uKirli },
    intermediates: {
      U_temiz_Wm2K: uTemiz,
      cidar_direnci_m2KW: rCidar,
      toplam_kirlenme_m2KW: input.kirlenme1_m2KW + input.kirlenme2_m2KW,
      kirlenme_ile_azalma_yuzde: (1 - uKirli / uTemiz) * 100,
      fazla_alan_yuzde: (uTemiz / uKirli - 1) * 100,
    },
    standardsUsed: ["TEMA (kirlenme direnci yöntemi)"],
  };
}

export const isiEsanjoruKirlenmeU: CalcModule<IsiEsanjoruKirlenmeUInput, IsiEsanjoruKirlenmeUOutput> = {
  id: "isi-esanjoru-kirlenme-u",
  title: "Eşanjör Toplam Isı Geçirgenliği (Kirlenme Dahil)",
  discipline: "mekanik",
  standards: ["TEMA"],
  inputSchema: isiEsanjoruKirlenmeUInputSchema,
  compute,
};
