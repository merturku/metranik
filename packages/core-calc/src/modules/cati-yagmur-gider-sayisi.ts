import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çatı yağmur gideri sayısı (rasyonel yöntem): Q = C·i·A/3600 [L/s] (i mm/h, A m²),
// gider sayısı n = ⌈Q/Q_gider⌉, ayrıca taşma (emniyet) gideri +1 (EN 12056-3: ana tahliyeden bağımsız taşma önlemi).
// Q_gider seçilen gider çapı/başlığının üretici kapasitesidir (su derinliğine bağlı).
export const catiYagmurGiderSayisiInputSchema = z.object({
  catiAlani_m2: z.number().positive(),
  yagisSiddeti_mmh: z.number().positive(),
  akisKatsayisi: z.number().gt(0).max(1),
  giderKapasitesi_Ls: z.number().positive(),
});

export type CatiYagmurGiderSayisiInput = z.infer<typeof catiYagmurGiderSayisiInputSchema>;

export interface CatiYagmurGiderSayisiOutput {
  giderSayisi: number;
}

function compute(input: CatiYagmurGiderSayisiInput): CalcResult<CatiYagmurGiderSayisiOutput> {
  const q = (input.akisKatsayisi * input.yagisSiddeti_mmh * input.catiAlani_m2) / 3600;
  const n = Math.max(1, Math.ceil(q / input.giderKapasitesi_Ls - 1e-9));
  return {
    value: { giderSayisi: n },
    intermediates: {
      yagmur_debisi_Ls: q,
      yagmur_debisi_m3h: q * 3.6,
      tasma_dahil_toplam_gider: n + 1,
      gider_basina_alan_m2: input.catiAlani_m2 / n,
      gider_doluluk_yuzde: (q / (n * input.giderKapasitesi_Ls)) * 100,
    },
    standardsUsed: ["TS EN 12056-3 (rasyonel yöntem)"],
  };
}

export const catiYagmurGiderSayisi: CalcModule<CatiYagmurGiderSayisiInput, CatiYagmurGiderSayisiOutput> = {
  id: "cati-yagmur-gider-sayisi",
  title: "Çatı Yağmur Gideri Sayısı",
  discipline: "insaat",
  standards: ["TS EN 12056-3"],
  inputSchema: catiYagmurGiderSayisiInputSchema,
  compute,
};
