import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// LMTD yöntemi: Q = U·A·LMTD → A = Q / (U·LMTD).
export const esanjorBoyutlandirmaInputSchema = z.object({
  isilYuk_Q_kW: z.number().positive(),
  isiTransferKatsayisi_U_Wm2K: z.number().positive(),
  logaritmikOrtalamaSicaklikFarki_LMTD_C: z.number().positive(),
});

export type EsanjorBoyutlandirmaInput = z.infer<typeof esanjorBoyutlandirmaInputSchema>;

export interface EsanjorBoyutlandirmaOutput {
  gerekliYuzeyAlani_m2: number;
}

function compute(input: EsanjorBoyutlandirmaInput): CalcResult<EsanjorBoyutlandirmaOutput> {
  const isilYukW = input.isilYuk_Q_kW * 1000;
  const alanM2 =
    isilYukW / (input.isiTransferKatsayisi_U_Wm2K * input.logaritmikOrtalamaSicaklikFarki_LMTD_C);

  return {
    value: { gerekliYuzeyAlani_m2: alanM2 },
    intermediates: {
      isilYuk_W: isilYukW,
    },
    standardsUsed: [],
  };
}

export const esanjorBoyutlandirma: CalcModule<
  EsanjorBoyutlandirmaInput,
  EsanjorBoyutlandirmaOutput
> = {
  id: "esanjor-boyutlandirma",
  title: "Eşanjör Boyutlandırma (LMTD)",
  discipline: "mekanik",
  standards: [],
  inputSchema: esanjorBoyutlandirmaInputSchema,
  compute,
};
