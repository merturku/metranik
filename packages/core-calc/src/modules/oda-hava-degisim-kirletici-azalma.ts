import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Tek bölgeli tam karışım modeli: kirletici (CO2 vb.) derişimi dış havayla seyreltilirken
// C(t) = Cd + (C0 − Cd)·e^(−N·t),  N = Q/V (hava değişim sayısı, 1/h)  →  t = ln((C0−Cd)/(Chedef−Cd))/N.
// ASHRAE Fundamentals Bölüm 16 (infiltrasyon/havalandırma) temel kütle dengesi.
export const odaHavaDegisimKirleticiAzalmaInputSchema = z
  .object({
    odaHacmi_m3: z.number().positive(),
    tazeHavaDebisi_m3h: z.number().positive(),
    baslangicDerisimi_ppm: z.number().positive(),
    disHavaDerisimi_ppm: z.number().min(0),
    hedefDerisim_ppm: z.number().positive(),
  })
  .refine((v) => v.disHavaDerisimi_ppm < v.hedefDerisim_ppm && v.hedefDerisim_ppm < v.baslangicDerisimi_ppm, {
    message: "Dış hava < hedef < başlangıç derişimi olmalı",
  });

export type OdaHavaDegisimKirleticiAzalmaInput = z.infer<typeof odaHavaDegisimKirleticiAzalmaInputSchema>;

export interface OdaHavaDegisimKirleticiAzalmaOutput {
  sure_dk: number;
}

function compute(input: OdaHavaDegisimKirleticiAzalmaInput): CalcResult<OdaHavaDegisimKirleticiAzalmaOutput> {
  const n = input.tazeHavaDebisi_m3h / input.odaHacmi_m3;
  const t_h =
    Math.log((input.baslangicDerisimi_ppm - input.disHavaDerisimi_ppm) / (input.hedefDerisim_ppm - input.disHavaDerisimi_ppm)) / n;
  return {
    value: { sure_dk: t_h * 60 },
    intermediates: {
      hava_degisim_sayisi_ACH: n,
      zaman_sabiti_dk: 60 / n,
      sure_saat: t_h,
      denge_derisimi_ppm: input.disHavaDerisimi_ppm,
    },
    standardsUsed: ["ASHRAE Fundamentals — Ventilation (tam karışım kütle dengesi)"],
  };
}

export const odaHavaDegisimKirleticiAzalma: CalcModule<OdaHavaDegisimKirleticiAzalmaInput, OdaHavaDegisimKirleticiAzalmaOutput> = {
  id: "oda-hava-degisim-kirletici-azalma",
  title: "Oda Havalandırma Süresi (CO₂ / Kirletici Azalması)",
  discipline: "ev",
  standards: ["ASHRAE Fundamentals"],
  inputSchema: odaHavaDegisimKirleticiAzalmaInputSchema,
  compute,
};
