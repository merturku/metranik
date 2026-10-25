import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yangın söndürme borularında sürtünme kaybı, Hazen-Williams formülü (NFPA 13
// hidrolik hesap yöntemi), SI birimleriyle:
//   pm = 6,05·10⁵ · Q^1,85 / (C^1,85 · d^4,87)   [bar/m; Q: L/dk, d: iç çap mm]
// (ABD birimleriyle p = 4,52·Q^1,85/(C^1,85·d^4,87) psi/ft, Q: gpm, d: inç — aynı bağıntı).
// C: boru pürüzlülük katsayısı (NFPA 13 tablosu: siyah/galvaniz çelik kuru sistem 100,
// ıslak sistem 120; bakır ve plastik 150; çimento kaplı döküm 140).
// Toplam kayıp = pm × (boru boyu + bağlantı parçalarının eşdeğer boyu).
export const hazenWilliamsSurtunmeKaybiInputSchema = z.object({
  debi_Lmin: z.number().positive(),
  boruIcCapi_mm: z.number().positive(),
  puruzlulukKatsayisi_C: z.number().min(60).max(160),
  esdegerBoruBoyu_m: z.number().positive(),
});

export type HazenWilliamsSurtunmeKaybiInput = z.infer<typeof hazenWilliamsSurtunmeKaybiInputSchema>;

export interface HazenWilliamsSurtunmeKaybiOutput {
  toplamSurtunmeKaybi_bar: number;
}

function compute(input: HazenWilliamsSurtunmeKaybiInput): CalcResult<HazenWilliamsSurtunmeKaybiOutput> {
  const Q = input.debi_Lmin;
  const d = input.boruIcCapi_mm;
  const C = input.puruzlulukKatsayisi_C;
  const birim = (6.05e5 * Q ** 1.85) / (C ** 1.85 * d ** 4.87);
  const toplam = birim * input.esdegerBoruBoyu_m;
  const hiz = Q / 60000 / ((Math.PI * (d / 1000) ** 2) / 4);

  return {
    value: { toplamSurtunmeKaybi_bar: toplam },
    intermediates: {
      birim_kayip_bar_m: birim,
      birim_kayip_kPa_m: birim * 100,
      toplam_kayip_mSS: toplam * 10.197,
      akis_hizi_ms: hiz,
    },
    standardsUsed: ["NFPA 13"],
  };
}

export const hazenWilliamsSurtunmeKaybi: CalcModule<HazenWilliamsSurtunmeKaybiInput, HazenWilliamsSurtunmeKaybiOutput> = {
  id: "hazen-williams-surtunme-kaybi",
  title: "Hazen-Williams Sürtünme Kaybı (Yangın Tesisatı)",
  discipline: "mekanik",
  standards: ["NFPA 13"],
  inputSchema: hazenWilliamsSurtunmeKaybiInputSchema,
  compute,
};
