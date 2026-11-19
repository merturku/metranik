import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Tava yükü w = Σ nᵢ·mᵢ·(1+ek); mesnet reaksiyonu R = wL/2; kullanım oranı = w / SWL (üretici beyanlı güvenli çalışma yükü, açıklığa göre)
export const kabloTavasiYukKapasitesiInputSchema = z.object({
  adet1: z.number().min(0),
  kutle1_kgm: z.number().min(0),
  adet2: z.number().min(0),
  kutle2_kgm: z.number().min(0),
  adet3: z.number().min(0),
  kutle3_kgm: z.number().min(0),
  ekYukPayi: z.number().min(0),
  acikligi_m: z.number().positive(),
  tavaGuvenliYuk_kgm: z.number().positive(),
});

export type KabloTavasiYukKapasitesiInput = z.infer<typeof kabloTavasiYukKapasitesiInputSchema>;
export interface KabloTavasiYukKapasitesiOutput {
  toplamYuk_kgm: number;
}

function compute(input: KabloTavasiYukKapasitesiInput): CalcResult<KabloTavasiYukKapasitesiOutput> {
  const ham = input.adet1 * input.kutle1_kgm + input.adet2 * input.kutle2_kgm + input.adet3 * input.kutle3_kgm;
  const w = ham * (1 + input.ekYukPayi);
  const oran = w / input.tavaGuvenliYuk_kgm;
  const status = oran <= 0.9 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { toplamYuk_kgm: w },
    intermediates: {
      kablo_kutlesi_kgm: ham,
      toplam_yuk_kNm: (w * 9.80665) / 1000,
      mesnet_reaksiyonu_kg: (w * input.acikligi_m) / 2,
      mesnet_momenti_kNm: (w * 9.80665 * input.acikligi_m ** 2) / 8000,
      kullanim_orani: oran,
    },
    standardsUsed: ["TS EN 61537 (güvenli çalışma yükü SWL)"],
    verdict: { status, note: `Yük / SWL = ${oran.toFixed(2)} (SWL açıklığa göre üretici tablosundan alınmalı)` },
  };
}

export const kabloTavasiYukKapasitesi: CalcModule<KabloTavasiYukKapasitesiInput, KabloTavasiYukKapasitesiOutput> = {
  id: "kablo-tavasi-yuk-kapasitesi",
  title: "Kablo Tavası Yük Kapasitesi Kontrolü (kg/m)",
  discipline: "elektrik",
  standards: ["TS EN 61537 (güvenli çalışma yükü SWL)"],
  inputSchema: kabloTavasiYukKapasitesiInputSchema,
  compute,
};
