import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Soğutma kulesi makyaj suyu (kütle ve enerji dengesi):
// buharlaşma E = Q_dolaşım·ρ·cp·Range/h_fg  (h_fg ≈ 2430 kJ/kg, ~30 °C);
// yoğunlaşma çevrimi COC = M/(B + D) → B + D = E/(COC − 1);  M = E + B + D = E·COC/(COC − 1).
// D sürüklenme (drift) kaybı, dolaşım debisinin yüzdesi (modern damlacık tutucu ≈ %0,005–0,02).
export const sogutmaKulesiMakyajSuyuInputSchema = z.object({
  dolasimDebisi_m3h: z.number().positive(),
  rangeSicakligi_K: z.number().positive().max(20),
  yogunlasmaCevrimi: z.number().gt(1).max(20),
  suruklenmeYuzde: z.number().min(0).max(1),
});

export type SogutmaKulesiMakyajSuyuInput = z.infer<typeof sogutmaKulesiMakyajSuyuInputSchema>;

export interface SogutmaKulesiMakyajSuyuOutput {
  makyajSuyu_m3h: number;
}

const CP = 4.186;
const HFG = 2430;

function compute(input: SogutmaKulesiMakyajSuyuInput): CalcResult<SogutmaKulesiMakyajSuyuOutput> {
  const e = (input.dolasimDebisi_m3h * CP * input.rangeSicakligi_K) / HFG;
  const bPlusD = e / (input.yogunlasmaCevrimi - 1);
  const d = (input.dolasimDebisi_m3h * input.suruklenmeYuzde) / 100;
  const b = Math.max(0, bPlusD - d);
  const m = e + b + d;
  return {
    value: { makyajSuyu_m3h: m },
    intermediates: {
      buharlasma_m3h: e,
      blof_m3h: b,
      suruklenme_m3h: d,
      makyaj_yuzde_dolasim: (m / input.dolasimDebisi_m3h) * 100,
      gunluk_makyaj_m3_24h: m * 24,
    },
    standardsUsed: ["ASHRAE HVAC Systems and Equipment — Cooling Towers (kütle/enerji dengesi)"],
  };
}

export const sogutmaKulesiMakyajSuyu: CalcModule<SogutmaKulesiMakyajSuyuInput, SogutmaKulesiMakyajSuyuOutput> = {
  id: "sogutma-kulesi-makyaj-suyu",
  title: "Soğutma Kulesi Makyaj Suyu ve Blöf",
  discipline: "mekanik",
  standards: ["ASHRAE HVAC Systems and Equipment"],
  inputSchema: sogutmaKulesiMakyajSuyuInputSchema,
  compute,
};
