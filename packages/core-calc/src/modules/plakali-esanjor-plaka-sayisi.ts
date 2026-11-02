import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Plakalı eşanjör ön boyutlandırma: gerekli alan A = Q/(U·LMTD) · (1 + güvenlik payı);
// ısı transfer eden plaka sayısı n = ⌈A/A_plaka⌉, toplam plaka = n + 1 (iki uç plakası ısı geçirmez).
// U ve LMTD, Eşanjör Kirlenme-U ve Eşanjör Boyutlandırma modüllerinden alınabilir; plaka alanı üretici verisidir.
export const plakaliEsanjorPlakaSayisiInputSchema = z.object({
  isiYuku_kW: z.number().positive(),
  U_Wm2K: z.number().positive(),
  LMTD_K: z.number().positive(),
  plakaAlani_m2: z.number().positive(),
  guvenlikPayiYuzde: z.number().min(0).max(50),
});

export type PlakaliEsanjorPlakaSayisiInput = z.infer<typeof plakaliEsanjorPlakaSayisiInputSchema>;

export interface PlakaliEsanjorPlakaSayisiOutput {
  toplamPlakaSayisi: number;
}

function compute(input: PlakaliEsanjorPlakaSayisiInput): CalcResult<PlakaliEsanjorPlakaSayisiOutput> {
  const aNet = (input.isiYuku_kW * 1000) / (input.U_Wm2K * input.LMTD_K);
  const aGerekli = aNet * (1 + input.guvenlikPayiYuzde / 100);
  const n = Math.ceil(aGerekli / input.plakaAlani_m2 - 1e-9);
  return {
    value: { toplamPlakaSayisi: n + 1 },
    intermediates: {
      net_alan_m2: aNet,
      gerekli_alan_m2: aGerekli,
      isi_transfer_plaka_sayisi: n,
      kurulu_alan_m2: n * input.plakaAlani_m2,
      gercek_fazla_alan_yuzde: ((n * input.plakaAlani_m2) / aNet - 1) * 100,
    },
    standardsUsed: ["LMTD yöntemi (Q = U·A·LMTD)"],
  };
}

export const plakaliEsanjorPlakaSayisi: CalcModule<PlakaliEsanjorPlakaSayisiInput, PlakaliEsanjorPlakaSayisiOutput> = {
  id: "plakali-esanjor-plaka-sayisi",
  title: "Plakalı Eşanjör Plaka Sayısı",
  discipline: "mekanik",
  standards: [],
  inputSchema: plakaliEsanjorPlakaSayisiInputSchema,
  compute,
};
