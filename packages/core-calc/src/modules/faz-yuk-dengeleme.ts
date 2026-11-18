import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yük dengeleme: LPT (en büyük yük önce, en az toplamlı faza). Dengesizlik = max|Ii − Ort|/Ort·100. Nötr: √(ΣI² − IaIb − IbIc − IcIa).
export const fazYukDengelemeInputSchema = z
  .object({
    y1: z.number().min(0),
    y2: z.number().min(0),
    y3: z.number().min(0),
    y4: z.number().min(0),
    y5: z.number().min(0),
    y6: z.number().min(0),
    y7: z.number().min(0),
    y8: z.number().min(0),
  })
  .refine((v) => [v.y1, v.y2, v.y3, v.y4, v.y5, v.y6, v.y7, v.y8].some((y) => y > 0), { message: "En az bir yük girilmeli" });

export type FazYukDengelemeInput = z.infer<typeof fazYukDengelemeInputSchema>;

export interface FazYukDengelemeOutput {
  dengesizlik_pct: number;
}

function compute(input: FazYukDengelemeInput): CalcResult<FazYukDengelemeOutput> {
  const yukler = [input.y1, input.y2, input.y3, input.y4, input.y5, input.y6, input.y7, input.y8]
    .filter((y) => y > 0)
    .sort((a, b) => b - a);
  const toplam = [0, 0, 0];
  const liste: number[][] = [[], [], []];
  for (const y of yukler) {
    let k = 0;
    if ((toplam[1] as number) < (toplam[k] as number)) k = 1;
    if ((toplam[2] as number) < (toplam[k] as number)) k = 2;
    toplam[k] = (toplam[k] as number) + y;
    (liste[k] as number[]).push(y);
  }
  const [a, b, c] = toplam as [number, number, number];
  const ort = (a + b + c) / 3;
  const sapma = Math.max(Math.abs(a - ort), Math.abs(b - ort), Math.abs(c - ort));
  const notr = Math.sqrt(Math.max(0, a * a + b * b + c * c - a * b - b * c - c * a));
  return {
    value: { dengesizlik_pct: (sapma / ort) * 100 },
    intermediates: {
      l1_A: a,
      l2_A: b,
      l3_A: c,
      notr_akimi_A: notr,
      atama: liste.map((l, i) => `L${i + 1}: ${l.join("+") || "—"}`).join("; "),
    },
    standardsUsed: ["IEC 60364-3 — yük dengeleme ilkesi"],
  };
}

export const fazYukDengeleme: CalcModule<FazYukDengelemeInput, FazYukDengelemeOutput> = {
  id: "faz-yuk-dengeleme",
  title: "Tek Faz Yüklerin Fazlara Dengeli Dağıtımı",
  discipline: "elektrik",
  standards: [],
  inputSchema: fazYukDengelemeInputSchema,
  compute,
};
