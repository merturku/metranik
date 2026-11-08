import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pitot tüpü (dinamik basınç) ile kanal hızı ve debisi: v = Cp·√(2Δp/ρ),  Q = v·A.
// ρ = p/(R·T) (kuru hava, R = 287,05 J/(kg·K)); Δp = toplam − statik basınç farkı (dinamik basınç).
// Sıkıştırılabilirlik ihmal edilir (Mach < 0,3 ≈ 100 m/s altında geçerli). Kanalda tek noktalı ölçüm merkez
// hızıdır; ortalama hız için kesit ağ ölçümü (log-Tchebycheff) gerekir, merkez/ortalama oranı ≈ 0,85–0,9.
const R_HAVA = 287.05;

export const pitotTupuHizDebiInputSchema = z.object({
  dinamikBasinc_Pa: z.number().positive(),
  sicaklik_C: z.number().min(-50).max(500),
  mutlakBasinc_kPa: z.number().positive(),
  kesitAlani_m2: z.number().positive(),
  pitotKatsayisi: z.number().min(0.9).max(1.1),
});

export type PitotTupuHizDebiInput = z.infer<typeof pitotTupuHizDebiInputSchema>;

export interface PitotTupuHizDebiOutput {
  hiz_ms: number;
}

function compute(input: PitotTupuHizDebiInput): CalcResult<PitotTupuHizDebiOutput> {
  const T = input.sicaklik_C + 273.15;
  const rho = (input.mutlakBasinc_kPa * 1000) / (R_HAVA * T);
  const v = input.pitotKatsayisi * Math.sqrt((2 * input.dinamikBasinc_Pa) / rho);
  const q = v * input.kesitAlani_m2;
  const mach = v / Math.sqrt(1.4 * R_HAVA * T);
  return {
    value: { hiz_ms: v },
    intermediates: {
      hava_yogunlugu_kgm3: rho,
      debi_m3s: q,
      debi_m3h: q * 3600,
      mach_sayisi: mach,
      ...(mach > 0.3 ? { uyari: "Mach > 0,3: sıkıştırılabilirlik düzeltmesi gerekir" } : {}),
    },
    standardsUsed: ["Bernoulli denklemi (Pitot ilkesi); ölçüm yöntemi için ISO 3966"],
  };
}

export const pitotTupuHizDebi: CalcModule<PitotTupuHizDebiInput, PitotTupuHizDebiOutput> = {
  id: "pitot-tupu-hiz-debi",
  title: "Pitot Tüpü ile Hava Hızı ve Debisi",
  discipline: "mekanik",
  standards: ["ISO 3966"],
  inputSchema: pitotTupuHizDebiInputSchema,
  compute,
};
