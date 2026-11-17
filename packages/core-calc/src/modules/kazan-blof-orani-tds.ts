import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sürekli blöf: F = S + B, F·Sf = B·Sk → B = S·Sf/(Sk − Sf). Sk > Sf olmalı.
export const kazanBlofOraniTdsInputSchema = z
  .object({
    buharDebisi_kgh: z.number().positive(),
    tdsBesi_ppm: z.number().positive(),
    tdsKazan_ppm: z.number().positive(),
  })
  .refine((v) => v.tdsKazan_ppm > v.tdsBesi_ppm, { message: "Kazan suyu TDS limiti besi suyu TDS'inden büyük olmalı" });

export type KazanBlofOraniTdsInput = z.infer<typeof kazanBlofOraniTdsInputSchema>;

export interface KazanBlofOraniTdsOutput {
  blofDebisi_kgh: number;
}

function compute(input: KazanBlofOraniTdsInput): CalcResult<KazanBlofOraniTdsOutput> {
  const B = (input.buharDebisi_kgh * input.tdsBesi_ppm) / (input.tdsKazan_ppm - input.tdsBesi_ppm);
  const F = input.buharDebisi_kgh + B;
  return {
    value: { blofDebisi_kgh: B },
    intermediates: { besi_suyu_debisi_kgh: F, blof_orani_besi_pct: (B / F) * 100, blof_orani_buhar_pct: (B / input.buharDebisi_kgh) * 100 },
    standardsUsed: ["TDS kütle dengesi / EN 12953-10"],
  };
}

export const kazanBlofOraniTds: CalcModule<KazanBlofOraniTdsInput, KazanBlofOraniTdsOutput> = {
  id: "kazan-blof-orani-tds",
  title: "Kazan Blöf Debisi ve Oranı (TDS Yöntemi)",
  discipline: "mekanik",
  standards: ["EN 12953-10"],
  inputSchema: kazanBlofOraniTdsInputSchema,
  compute,
};
