import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Radyatör dilim (veya panel metre) sayısı, TS EN 442-2:
// logaritmik sıcaklık farkı ΔTln = (Tg − Td) / ln[(Tg − To)/(Td − To)],
// işletme kapasitesi Φ = Φ50 · (ΔTln/50)^n  (Φ50: katalogdaki ΔT = 50 K kapasite,
// nominal 75/65/20 °C koşulu; n: katalogdaki radyatör üssü, tipik 1,25–1,35),
// birim sayısı N = ⌈Q / Φbirim⌉.
export const radyatorDilimSayisiInputSchema = z
  .object({
    odaIsiKaybi_W: z.number().positive(),
    birimKapasitesiDT50_W: z.number().positive(),
    radyatorUssu_n: z.number().min(1).max(2),
    gidisSicakligi_C: z.number(),
    donusSicakligi_C: z.number(),
    odaSicakligi_C: z.number(),
  })
  .refine((v) => v.gidisSicakligi_C > v.donusSicakligi_C && v.donusSicakligi_C > v.odaSicakligi_C, {
    message: "Sıcaklıklar gidiş > dönüş > oda sıralamasında olmalı",
  });

export type RadyatorDilimSayisiInput = z.infer<typeof radyatorDilimSayisiInputSchema>;

export interface RadyatorDilimSayisiOutput {
  dilimSayisi: number;
}

function compute(input: RadyatorDilimSayisiInput): CalcResult<RadyatorDilimSayisiOutput> {
  const Tg = input.gidisSicakligi_C;
  const Td = input.donusSicakligi_C;
  const To = input.odaSicakligi_C;
  const dTln = (Tg - Td) / Math.log((Tg - To) / (Td - To));
  const katsayi = (dTln / 50) ** input.radyatorUssu_n;
  const birim = input.birimKapasitesiDT50_W * katsayi;
  const N = Math.ceil(input.odaIsiKaybi_W / birim - 1e-9);

  return {
    value: { dilimSayisi: N },
    intermediates: {
      logaritmik_sicaklik_farki_K: dTln,
      aritmetik_sicaklik_farki_K: (Tg + Td) / 2 - To,
      kapasite_duzeltme_katsayisi: katsayi,
      isletmede_birim_kapasitesi_W: birim,
      kurulu_kapasite_W: N * birim,
      fazla_kapasite_yuzde: ((N * birim) / input.odaIsiKaybi_W - 1) * 100,
    },
    standardsUsed: ["TS EN 442-2"],
  };
}

export const radyatorDilimSayisi: CalcModule<RadyatorDilimSayisiInput, RadyatorDilimSayisiOutput> = {
  id: "radyator-dilim-sayisi",
  title: "Radyatör Dilim Sayısı",
  discipline: "ev",
  standards: ["TS EN 442-2"],
  inputSchema: radyatorDilimSayisiInputSchema,
  compute,
};
