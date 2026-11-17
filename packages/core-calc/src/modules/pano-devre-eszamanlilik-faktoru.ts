import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 61439-1 Tablo 101: anma eşzamanlılık faktörü. 1 devre → 1,0; 2–3 → 0,9; 4–5 → 0,8; 6–9 → 0,7; ≥ 10 → 0,6.
export const panoDevreEszamanlilikFaktoruInputSchema = z.object({
  devreSayisi: z.number().int().min(1),
  toplamAkim_A: z.number().positive(),
});

export type PanoDevreEszamanlilikFaktoruInput = z.infer<typeof panoDevreEszamanlilikFaktoruInputSchema>;

export interface PanoDevreEszamanlilikFaktoruOutput {
  tasarimAkimi_A: number;
}

function rdf(n: number): number {
  if (n <= 1) return 1;
  if (n <= 3) return 0.9;
  if (n <= 5) return 0.8;
  if (n <= 9) return 0.7;
  return 0.6;
}

function compute(input: PanoDevreEszamanlilikFaktoruInput): CalcResult<PanoDevreEszamanlilikFaktoruOutput> {
  const f = rdf(input.devreSayisi);
  return {
    value: { tasarimAkimi_A: input.toplamAkim_A * f },
    intermediates: { rdf: f, toplam_akim_A: input.toplamAkim_A },
    standardsUsed: ["IEC 61439-1 Tablo 101"],
  };
}

export const panoDevreEszamanlilikFaktoru: CalcModule<PanoDevreEszamanlilikFaktoruInput, PanoDevreEszamanlilikFaktoruOutput> = {
  id: "pano-devre-eszamanlilik-faktoru",
  title: "Pano Devre Eşzamanlılık (RDF) Faktörü",
  discipline: "elektrik",
  standards: ["IEC 61439-1"],
  inputSchema: panoDevreEszamanlilikFaktoruInputSchema,
  compute,
};
