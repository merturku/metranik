import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-8 §4.5.3.3: fvw,d = (fu/√3)/(βw·γM2). Leff = max(F/(a·fvw,d), max(30, 6a)); toplam L = Leff + 2a.
export const koseKaynagiGerekliBoyInputSchema = z.object({
  f_kN: z.number().positive(),
  a_mm: z.number().positive(),
  fu_MPa: z.number().positive(),
  betaW: z.number().positive(),
  gammaM2: z.number().min(1),
});

export type KoseKaynagiGerekliBoyInput = z.infer<typeof koseKaynagiGerekliBoyInputSchema>;

export interface KoseKaynagiGerekliBoyOutput {
  dikisBoyu_mm: number;
}

function compute(input: KoseKaynagiGerekliBoyInput): CalcResult<KoseKaynagiGerekliBoyOutput> {
  const fvw = input.fu_MPa / Math.sqrt(3) / (input.betaW * input.gammaM2);
  const birim = input.a_mm * fvw; // N/mm
  const gerekli = (input.f_kN * 1000) / birim;
  const asgari = Math.max(30, 6 * input.a_mm);
  const leff = Math.max(gerekli, asgari);
  return {
    value: { dikisBoyu_mm: leff + 2 * input.a_mm },
    intermediates: { fvw_d_MPa: fvw, birim_kapasite_Nmm: birim, etkin_boy_mm: leff, asgari_boy_mm: asgari },
    standardsUsed: ["TS EN 1993-1-8 §4.5.3.3"],
  };
}

export const koseKaynagiGerekliBoy: CalcModule<KoseKaynagiGerekliBoyInput, KoseKaynagiGerekliBoyOutput> = {
  id: "kose-kaynagi-gerekli-boy",
  title: "Köşe Kaynağı Gerekli Dikiş Boyu",
  discipline: "insaat",
  standards: ["TS EN 1993-1-8 §4.5.3.3"],
  inputSchema: koseKaynagiGerekliBoyInputSchema,
  compute,
};
