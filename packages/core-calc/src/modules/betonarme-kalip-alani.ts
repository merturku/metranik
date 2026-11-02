import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Betonarme eleman kalıp yüzey alanı (metraj):
//  kolon : 2(b + h)·H            (dört yüz)
//  kiriş : (b + 2h)·L            (taban + iki yan; döşeme birleşimi düşülmez → hafif tutucu)
//  döşeme: b·h (alt yüzey, plan boyutları) ; boy_m kullanılmaz
// Kalıp malzemesi kayıpları için fire payı eklenir.
export const betonarmeKalipAlaniInputSchema = z.object({
  tip: z.enum(["kolon", "kiris", "doseme"]),
  adet: z.number().int().positive(),
  boyut1_m: z.number().positive(),
  boyut2_m: z.number().positive(),
  boy_m: z.number().min(0),
  fireYuzde: z.number().min(0).max(30),
});

export type BetonarmeKalipAlaniInput = z.infer<typeof betonarmeKalipAlaniInputSchema>;

export interface BetonarmeKalipAlaniOutput {
  kalipAlani_m2: number;
}

function compute(input: BetonarmeKalipAlaniInput): CalcResult<BetonarmeKalipAlaniOutput> {
  const { boyut1_m: b, boyut2_m: h, boy_m: L } = input;
  const birim = input.tip === "kolon" ? 2 * (b + h) * L : input.tip === "kiris" ? (b + 2 * h) * L : b * h;
  const net = birim * input.adet;
  const brut = net * (1 + input.fireYuzde / 100);
  const beton = input.tip === "doseme" ? 0 : b * h * L * input.adet;
  return {
    value: { kalipAlani_m2: brut },
    intermediates: {
      birim_eleman_kalip_m2: birim,
      net_kalip_m2: net,
      fire_m2: brut - net,
      beton_hacmi_m3: beton,
      kalip_beton_orani_m2m3: beton > 0 ? net / beton : 0,
    },
    standardsUsed: [],
  };
}

export const betonarmeKalipAlani: CalcModule<BetonarmeKalipAlaniInput, BetonarmeKalipAlaniOutput> = {
  id: "betonarme-kalip-alani",
  title: "Betonarme Kalıp Alanı Metrajı",
  discipline: "insaat",
  standards: [],
  inputSchema: betonarmeKalipAlaniInputSchema,
  compute,
};
