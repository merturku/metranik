import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// 3 yollu karışım vanası (enerji/kütle dengesi): sekonder devreye giden Q su, T1 sıcaklıklı primer (gidiş)
// ve T2 sıcaklıklı sekonder dönüş suyunun karışımıdır: Tm = (x·T1 + (1 − x)·T2) → x = (Tm − T2)/(T1 − T2).
// Primer debi = x·Q, vana bypass/dönüş payı = (1 − x)·Q. Suyun özgül ısısı sıcaklıkla sabit kabul edilir
// (aynı akışkan, küçük ΔT). T2 < Tm < T1 olmalıdır; aksi hâlde karışımla istenen sıcaklığa ulaşılamaz.
export const ucYolluVanaKarisimDebisiInputSchema = z.object({
  primerSicaklik_C: z.number(),
  donusSicakligi_C: z.number(),
  hedefKarisimSicakligi_C: z.number(),
  sekonderDebi_m3h: z.number().positive(),
});

export type UcYolluVanaKarisimDebisiInput = z.infer<typeof ucYolluVanaKarisimDebisiInputSchema>;

export interface UcYolluVanaKarisimDebisiOutput {
  primerDebi_m3h: number | null;
}

function compute(input: UcYolluVanaKarisimDebisiInput): CalcResult<UcYolluVanaKarisimDebisiOutput> {
  const { primerSicaklik_C: t1, donusSicakligi_C: t2, hedefKarisimSicakligi_C: tm, sekonderDebi_m3h: q } = input;
  const standards = ["Kütle ve enerji dengesi (adyabatik karışım)"];
  if (!(t1 > t2 && tm > t2 && tm <= t1)) {
    return {
      value: { primerDebi_m3h: null },
      intermediates: { not: "Koşul: dönüş < hedef ≤ primer sıcaklığı" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Hedef karışım sıcaklığı bu primer ve dönüş sıcaklıklarıyla sağlanamaz." },
    };
  }
  const x = (tm - t2) / (t1 - t2);
  return {
    value: { primerDebi_m3h: x * q },
    intermediates: {
      primer_payi_x: x,
      bypass_donus_debisi_m3h: (1 - x) * q,
      sekonder_debi_m3h: q,
    },
    standardsUsed: standards,
  };
}

export const ucYolluVanaKarisimDebisi: CalcModule<UcYolluVanaKarisimDebisiInput, UcYolluVanaKarisimDebisiOutput> = {
  id: "uc-yollu-vana-karisim-debisi",
  title: "3 Yollu Karışım Vanası Debi Payı",
  discipline: "mekanik",
  standards: [],
  inputSchema: ucYolluVanaKarisimDebisiInputSchema,
  compute,
};
