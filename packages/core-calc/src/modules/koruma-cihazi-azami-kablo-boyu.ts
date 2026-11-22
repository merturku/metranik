import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TN sistemde otomatik açma için azami kablo boyu (IEC 60364-4-41 / 60364-6 pratik yöntem):
// Lmaks = 0,8·U0·S_faz / (ρθ·(1+m)·Ia),  m = S_faz/S_pe,  Ia = k·In (B 5, C 10, D 20 — IEC 60898-1)
// 0,8: kaynak empedansı payı (kaynağın gerilimi %80'e düşer); ρθ = ρ20·(1 + α(θ − 20))
export const koruyucuCihazAzamiKabloBoyuInputSchema = z.object({
  U0_V: z.number().positive(),
  fazKesiti_mm2: z.number().positive(),
  pe_Kesiti_mm2: z.number().positive(),
  anmaAkimi_A: z.number().positive(),
  egri: z.enum(["B", "C", "D"]),
  iletkenMalzemesi: z.enum(["bakir", "aluminyum"]),
  hataSicakligi_C: z.number().min(20).max(250),
  gerceklKabloBoyu_m: z.number().min(0),
});

export type KoruyucuCihazAzamiKabloBoyuInput = z.infer<typeof koruyucuCihazAzamiKabloBoyuInputSchema>;
export interface KoruyucuCihazAzamiKabloBoyuOutput {
  azamiKabloBoyu_m: number;
}

const STD = "IEC 60364-4-41 §411.4 ve IEC 60364-6 (TN otomatik açma); IEC 60898-1 (açma akımı katsayıları)";
const K: Record<string, number> = { B: 5, C: 10, D: 20 };
const RHO20: Record<string, number> = { bakir: 0.017241, aluminyum: 0.02826 };
const ALFA: Record<string, number> = { bakir: 0.00393, aluminyum: 0.00403 };

function compute(input: KoruyucuCihazAzamiKabloBoyuInput): CalcResult<KoruyucuCihazAzamiKabloBoyuOutput> {
  const Ia = K[input.egri]! * input.anmaAkimi_A;
  const rho = RHO20[input.iletkenMalzemesi]! * (1 + ALFA[input.iletkenMalzemesi]! * (input.hataSicakligi_C - 20));
  const m = input.fazKesiti_mm2 / input.pe_Kesiti_mm2;
  const Lmaks = (0.8 * input.U0_V * input.fazKesiti_mm2) / (rho * (1 + m) * Ia);
  const oran = input.gerceklKabloBoyu_m / Lmaks;
  const status = oran <= 0.8 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { azamiKabloBoyu_m: Lmaks },
    intermediates: {
      Ia_A: Ia,
      iletken_ozdirenci_ohm_mm2_m: rho,
      m_faz_pe_orani: m,
      kullanim_orani: oran,
    },
    standardsUsed: [STD],
    verdict: {
      status,
      note: `Gerçek boy / azami boy = ${oran.toFixed(2)}. Yöntem yaklaşık (reaktans ve kaynak empedansı ihmal, 0,8 payı); kesin doğrulama Zs ölçümü veya Hata Çevrim Empedansı Kontrolü ile yapılmalı`,
    },
  };
}

export const koruyucuCihazAzamiKabloBoyu: CalcModule<KoruyucuCihazAzamiKabloBoyuInput, KoruyucuCihazAzamiKabloBoyuOutput> = {
  id: "koruma-cihazi-azami-kablo-boyu",
  title: "Koruma Cihazı İçin Azami Kablo Boyu (TN Otomatik Açma)",
  discipline: "elektrik",
  standards: [STD],
  inputSchema: koruyucuCihazAzamiKabloBoyuInputSchema,
  compute,
};
