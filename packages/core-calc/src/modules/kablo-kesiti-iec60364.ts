import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Gerilim düşümü kriteriyle kesit hesabı: A = k·ρ·L·I / ΔU (k=2 tek faz, √3 üç faz).
// ρ (bakır özgül direnci) fiziksel bir sabittir. Akım taşıma kapasitesi (Iz) tabloları
// bu modülde gömülü değildir — ayrıca kontrol edilmelidir.
const BAKIR_OZGUL_DIRENC_OHM_MM2_M = 0.0175;

export const kabloKesitiInputSchema = z.object({
  akim_A: z.number().positive(),
  uzunluk_m: z.number().positive(),
  izinliGerilimDusumu_V: z.number().positive(),
  faz: z.enum(["tek", "uc"]),
});

export type KabloKesitiInput = z.infer<typeof kabloKesitiInputSchema>;

export interface KabloKesitiOutput {
  kesit_mm2: number;
}

function compute(input: KabloKesitiInput): CalcResult<KabloKesitiOutput> {
  const katsayi = input.faz === "tek" ? 2 : Math.sqrt(3);
  const kesitMm2 =
    (katsayi * BAKIR_OZGUL_DIRENC_OHM_MM2_M * input.uzunluk_m * input.akim_A) /
    input.izinliGerilimDusumu_V;

  return {
    value: { kesit_mm2: kesitMm2 },
    intermediates: {
      fazKatsayisi: katsayi,
      bakirOzgulDirenc_ohm_mm2_m: BAKIR_OZGUL_DIRENC_OHM_MM2_M,
    },
    standardsUsed: ["IEC 60364"],
  };
}

export const kabloKesitiIec60364: CalcModule<KabloKesitiInput, KabloKesitiOutput> = {
  id: "kablo-kesiti-iec60364",
  title: "Kablo Kesiti + Gerilim Düşümü",
  discipline: "elektrik",
  standards: ["IEC 60364"],
  inputSchema: kabloKesitiInputSchema,
  compute,
};
