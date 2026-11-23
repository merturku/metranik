import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1992-1-1 §3.1.4 ve Eş. (3.9)–(3.12): toplam rötre εcs = εcd + εca.
// εcd,∞ = kh·εcd,0 (kh: Tablo 3.3, h0'a göre doğrusal enterpolasyon; εcd,0 Ek B/Tablo 3.2'den girdi),
// εca,∞ = 2,5(fck − 10)·10⁻⁶.  Boy kısalması ΔL = εcs·L.
export const betonRotreKisalmaInputSchema = z.object({
  fck_MPa: z.number().min(12).max(90),
  h0_mm: z.number().positive(),
  epsCd0_promil: z.number().min(0),
  uzunluk_m: z.number().positive(),
});

export type BetonRotreKisalmaInput = z.infer<typeof betonRotreKisalmaInputSchema>;
export interface BetonRotreKisalmaOutput {
  toplamRotre_promil: number;
}

const STD = "TS EN 1992-1-1 §3.1.4 (Eş. 3.9–3.12, Tablo 3.3)";
// EC2 Tablo 3.3: h0 → kh
const KH: [number, number][] = [
  [100, 1.0],
  [200, 0.85],
  [300, 0.75],
  [500, 0.7],
];

export function khKatsayisi(h0: number): number {
  const ilk = KH[0]!;
  const son = KH[KH.length - 1]!;
  if (h0 <= ilk[0]) return ilk[1];
  if (h0 >= son[0]) return son[1];
  for (let i = 0; i < KH.length - 1; i++) {
    const a = KH[i]!;
    const b = KH[i + 1]!;
    if (h0 >= a[0] && h0 <= b[0]) return a[1] + ((b[1] - a[1]) * (h0 - a[0])) / (b[0] - a[0]);
  }
  return son[1];
}

function compute(input: BetonRotreKisalmaInput): CalcResult<BetonRotreKisalmaOutput> {
  const kh = khKatsayisi(input.h0_mm);
  const epsCd = kh * input.epsCd0_promil; // ‰
  const epsCa = (2.5 * (input.fck_MPa - 10)) / 1000; // 2,5(fck−10)·10⁻⁶ → ‰
  const epsCs = epsCd + epsCa;
  const dL_mm = (epsCs / 1000) * input.uzunluk_m * 1000;
  return {
    value: { toplamRotre_promil: epsCs },
    intermediates: {
      kh,
      kuruma_rotresi_promil: epsCd,
      otojen_rotre_promil: epsCa,
      boy_kisalmasi_mm: dL_mm,
      kisalma_mm_m: dL_mm / input.uzunluk_m,
    },
    standardsUsed: [STD],
  };
}

export const betonRotreKisalma: CalcModule<BetonRotreKisalmaInput, BetonRotreKisalmaOutput> = {
  id: "beton-rotre-kisalma",
  title: "Beton Rötre Şekil Değiştirmesi ve Boy Kısalması",
  discipline: "insaat",
  standards: [STD],
  inputSchema: betonRotreKisalmaInputSchema,
  compute,
};
