import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// AASHTO: d = 0,278·V·t + V²/(254·(a/9,81 + G)); V km/h, a m/s², G eğim (yokuş yukarı +). Payda ≤ 0 → durma mümkün değil (null).
export const durmaGorusMesafesiInputSchema = z.object({
  hiz_kmh: z.number().positive(),
  tepkiSuresi_s: z.number().min(0),
  yavaslama_ms2: z.number().positive(),
  egim: z.number().min(-0.3).max(0.3),
});

export type DurmaGorusMesafesiInput = z.infer<typeof durmaGorusMesafesiInputSchema>;

export interface DurmaGorusMesafesiOutput {
  durmaMesafesi_m: number | null;
}

function compute(input: DurmaGorusMesafesiInput): CalcResult<DurmaGorusMesafesiOutput> {
  const tepki = 0.278 * input.hiz_kmh * input.tepkiSuresi_s;
  const payda = 254 * (input.yavaslama_ms2 / 9.81 + input.egim);
  if (payda <= 0) {
    return {
      value: { durmaMesafesi_m: null },
      intermediates: { tepki_mesafesi_m: tepki, fren_mesafesi_m: "Eğim yavaşlamayı aşıyor: fren mesafesi tanımsız" },
      standardsUsed: ["AASHTO Green Book (SSD)"],
    };
  }
  const fren = (input.hiz_kmh * input.hiz_kmh) / payda;
  return {
    value: { durmaMesafesi_m: tepki + fren },
    intermediates: { tepki_mesafesi_m: tepki, fren_mesafesi_m: fren },
    standardsUsed: ["AASHTO Green Book (SSD)"],
  };
}

export const durmaGorusMesafesi: CalcModule<DurmaGorusMesafesiInput, DurmaGorusMesafesiOutput> = {
  id: "durma-gorus-mesafesi",
  title: "Durma Görüş Mesafesi (Yol Tasarımı)",
  discipline: "insaat",
  standards: ["AASHTO Green Book"],
  inputSchema: durmaGorusMesafesiInputSchema,
  compute,
};
