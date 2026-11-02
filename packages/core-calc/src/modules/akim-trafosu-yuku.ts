import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Akım trafosu (CT) sekonder yükü (burden), IEC 61869-2:
// S = I2n²·R_kablo + S_röle ;  R_kablo = ρ·2L/A (gidiş-dönüş), ρ = 0,0225 Ω·mm²/m (bakır, ~75 °C, tutucu).
// S ≤ CT anma gücü (VA) olmalı; aşılırsa doğruluk sınıfı tutmaz ve CT erken doyar.
export const akimTrafosuYukuInputSchema = z.object({
  sekonderAkimi_A: z.enum(["1", "5"]),
  kabloUzunlugu_m: z.number().min(0),
  kabloKesiti_mm2: z.number().positive(),
  roleYuku_VA: z.number().min(0),
  ctAnmaGucu_VA: z.number().positive(),
});

export type AkimTrafosuYukuInput = z.infer<typeof akimTrafosuYukuInputSchema>;

export interface AkimTrafosuYukuOutput {
  toplamYuk_VA: number;
}

const RHO_CU_75 = 0.0225;

function compute(input: AkimTrafosuYukuInput): CalcResult<AkimTrafosuYukuOutput> {
  const r = (RHO_CU_75 * 2 * input.kabloUzunlugu_m) / input.kabloKesiti_mm2;
  const sKablo = Number(input.sekonderAkimi_A) ** 2 * r;
  const s = sKablo + input.roleYuku_VA;
  const uygun = s <= input.ctAnmaGucu_VA;
  return {
    value: { toplamYuk_VA: s },
    intermediates: {
      kablo_direnci_ohm: r,
      kablo_yuku_VA: sKablo,
      doluluk_yuzde: (s / input.ctAnmaGucu_VA) * 100,
      bos_kapasite_VA: input.ctAnmaGucu_VA - s,
    },
    standardsUsed: ["IEC 61869-2"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun
        ? `Sekonder yük ${s.toFixed(1)} VA ≤ CT anma gücü ${input.ctAnmaGucu_VA} VA.`
        : `Sekonder yük ${s.toFixed(1)} VA > CT anma gücü ${input.ctAnmaGucu_VA} VA; kesiti artırın, 1 A sekonder kullanın veya daha büyük VA'lı CT seçin.`,
    },
  };
}

export const akimTrafosuYuku: CalcModule<AkimTrafosuYukuInput, AkimTrafosuYukuOutput> = {
  id: "akim-trafosu-yuku",
  title: "Akım Trafosu (CT) Sekonder Yük Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 61869-2"],
  inputSchema: akimTrafosuYukuInputSchema,
  compute,
};
