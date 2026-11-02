import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ana eş potansiyel bağlantı iletkeni (IEC 60364-5-54 §544.1.1):
// S ≥ 0,5 · S_PE,en büyük  ve  S ≥ 6 mm² Cu;  bakırda üst sınır 25 mm² (eşdeğer Al/çelik için dönüşüm gerekir).
// Standart kesit dizisine yukarı yuvarlanır: 6, 10, 16, 25 mm² Cu.
export const anaEsPotansiyelBaglantiIletkeniInputSchema = z.object({
  enBuyukPeKesiti_mm2: z.number().positive(),
});

export type AnaEsPotansiyelBaglantiIletkeniInput = z.infer<typeof anaEsPotansiyelBaglantiIletkeniInputSchema>;

export interface AnaEsPotansiyelBaglantiIletkeniOutput {
  baglantiKesiti_mm2: number;
}

const STANDART = [6, 10, 16, 25];

function compute(input: AnaEsPotansiyelBaglantiIletkeniInput): CalcResult<AnaEsPotansiyelBaglantiIletkeniOutput> {
  const yarisi = 0.5 * input.enBuyukPeKesiti_mm2;
  const gerekli = Math.min(25, Math.max(6, yarisi));
  const secilen = STANDART.find((s) => s >= gerekli - 1e-9) ?? 25;
  return {
    value: { baglantiKesiti_mm2: secilen },
    intermediates: {
      yari_pe_kesiti_mm2: yarisi,
      gerekli_kesit_mm2: gerekli,
      sinir_durumu: yarisi < 6 ? "Alt sınır 6 mm² belirleyici" : yarisi > 25 ? "Üst sınır 25 mm² belirleyici" : "0,5 × PE belirleyici",
    },
    standardsUsed: ["IEC 60364-5-54 §544.1.1"],
  };
}

export const anaEsPotansiyelBaglantiIletkeni: CalcModule<AnaEsPotansiyelBaglantiIletkeniInput, AnaEsPotansiyelBaglantiIletkeniOutput> = {
  id: "ana-es-potansiyel-baglanti-iletkeni",
  title: "Ana Eş Potansiyel Bağlantı İletkeni Kesiti",
  discipline: "elektrik",
  standards: ["IEC 60364-5-54"],
  inputSchema: anaEsPotansiyelBaglantiIletkeniInputSchema,
  compute,
};
