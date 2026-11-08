import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Döşeme kaplama katmanlarından ölü yük: g = Σ(ti·γi)  [kN/m²], ti (m), γi (kN/m³).
// Tasarım yükü TS 500 kombinasyonu Pd = 1,4·g + 1,6·q (Düşey Yük Kombinasyonu modülüyle aynı katsayılar).
// Birim hacim ağırlıklar TS 498 tablolarından alınmalıdır (tipik: betonarme 25, şap 22, seramik 27, sıva 20 kN/m³).
// Boş katman için kalınlığı 0 girin. Tavan asma/tesisat ve bölme duvar yükü ayrıca eklenmelidir.
export const dosemeOluYukuKatmanlarInputSchema = z.object({
  katman1_mm: z.number().min(0),
  katman1_gamma: z.number().min(0),
  katman2_mm: z.number().min(0),
  katman2_gamma: z.number().min(0),
  katman3_mm: z.number().min(0),
  katman3_gamma: z.number().min(0),
  katman4_mm: z.number().min(0),
  katman4_gamma: z.number().min(0),
  hareketliYuk_kNm2: z.number().min(0),
});

export type DosemeOluYukuKatmanlarInput = z.infer<typeof dosemeOluYukuKatmanlarInputSchema>;

export interface DosemeOluYukuKatmanlarOutput {
  oluYuk_kNm2: number;
}

function compute(input: DosemeOluYukuKatmanlarInput): CalcResult<DosemeOluYukuKatmanlarOutput> {
  const k = [
    (input.katman1_mm / 1000) * input.katman1_gamma,
    (input.katman2_mm / 1000) * input.katman2_gamma,
    (input.katman3_mm / 1000) * input.katman3_gamma,
    (input.katman4_mm / 1000) * input.katman4_gamma,
  ];
  const g = k.reduce((a, b) => a + b, 0);
  const q = input.hareketliYuk_kNm2;
  return {
    value: { oluYuk_kNm2: g },
    intermediates: {
      katman1_kNm2: k[0] ?? 0,
      katman2_kNm2: k[1] ?? 0,
      katman3_kNm2: k[2] ?? 0,
      katman4_kNm2: k[3] ?? 0,
      tasarim_yuku_TS500_kNm2: 1.4 * g + 1.6 * q,
      tasarim_yuku_EN1990_kNm2: 1.35 * g + 1.5 * q,
    },
    standardsUsed: ["TS 498 (birim hacim ağırlıklar)", "TS 500 (1,4G + 1,6Q)", "TS EN 1990 (Eş. 6.10)"],
  };
}

export const dosemeOluYukuKatmanlar: CalcModule<DosemeOluYukuKatmanlarInput, DosemeOluYukuKatmanlarOutput> = {
  id: "doseme-olu-yuku-katmanlar",
  title: "Döşeme Ölü Yükü (Kaplama Katmanları)",
  discipline: "insaat",
  standards: ["TS 498", "TS 500"],
  inputSchema: dosemeOluYukuKatmanlarInputSchema,
  compute,
};
