import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hidronik hava ayırıcı (mikrokabarcık ayırıcı) çapı: mikrokabarcıkların
// yükselerek tahliye edilebilmesi için akış hızının bir üst sınırın altında
// kalması gerekir (Bell & Gossett / Spirotech üretici pratiği: ~0.9 m/s).
// Süreklilik denklemi: A = Q/v, D = √(4A/π).
const VARSAYILAN_MAKSIMUM_HIZ_MS = 0.9;

export const havaAyiriciBoyutlandirmaInputSchema = z.object({
  debit_Q_m3h: z.number().positive(),
  maksimumHiz_v_ms: z.number().positive().default(VARSAYILAN_MAKSIMUM_HIZ_MS),
});

export type HavaAyiriciBoyutlandirmaInput = z.infer<
  typeof havaAyiriciBoyutlandirmaInputSchema
>;

export interface HavaAyiriciBoyutlandirmaOutput {
  gerekliCap_mm: number;
}

function compute(
  input: HavaAyiriciBoyutlandirmaInput,
): CalcResult<HavaAyiriciBoyutlandirmaOutput> {
  const debitM3s = input.debit_Q_m3h / 3600;
  const kesitAlaniM2 = debitM3s / input.maksimumHiz_v_ms;
  const capM = Math.sqrt((4 * kesitAlaniM2) / Math.PI);
  const capMm = capM * 1000;

  return {
    value: { gerekliCap_mm: capMm },
    intermediates: {
      debit_m3s: debitM3s,
      kesitAlani_m2: kesitAlaniM2,
    },
    standardsUsed: [],
  };
}

export const havaAyiriciBoyutlandirma: CalcModule<
  HavaAyiriciBoyutlandirmaInput,
  HavaAyiriciBoyutlandirmaOutput
> = {
  id: "hava-ayirici-boyutlandirma",
  title: "Hava Ayırıcı Boyutlandırma",
  discipline: "mekanik",
  standards: [],
  inputSchema: havaAyiriciBoyutlandirmaInputSchema,
  compute,
};
