import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Wenner dört elektrot yöntemiyle görünür zemin özdirenci (IEEE Std 81):
// eşit aralıklı (a) dört elektrot, b derinliğe çakılı; dış elektrotlardan akım verilip
// iç elektrotlar arası gerilimden ölçülen direnç R = V/I:
//   ρ = 4π·a·R / [1 + 2a/√(a² + 4b²) − a/√(a² + b²)]
// b ≪ a (b < a/20) iken ρ ≈ 2π·a·R. Ölçülen ρ yaklaşık olarak a derinliğine kadar
// olan zeminin ortalamasını temsil eder.
export const wennerZeminOzdirenciInputSchema = z
  .object({
    elektrotAraligi_a_m: z.number().positive(),
    olculenDirenc_R_ohm: z.number().positive(),
    elektrotDerinligi_b_m: z.number().min(0),
  })
  .refine((v) => v.elektrotDerinligi_b_m < v.elektrotAraligi_a_m, {
    message: "Elektrot derinliği elektrot aralığından küçük olmalı",
  });

export type WennerZeminOzdirenciInput = z.infer<typeof wennerZeminOzdirenciInputSchema>;

export interface WennerZeminOzdirenciOutput {
  zeminOzdirenci_ohm_m: number;
}

function compute(input: WennerZeminOzdirenciInput): CalcResult<WennerZeminOzdirenciOutput> {
  const a = input.elektrotAraligi_a_m;
  const b = input.elektrotDerinligi_b_m;
  const R = input.olculenDirenc_R_ohm;
  const payda = 1 + (2 * a) / Math.sqrt(a * a + 4 * b * b) - a / Math.sqrt(a * a + b * b);
  const rho = (4 * Math.PI * a * R) / payda;
  const basit = 2 * Math.PI * a * R;

  return {
    value: { zeminOzdirenci_ohm_m: rho },
    intermediates: {
      basitlestirilmis_2piaR_ohm_m: basit,
      basitlestirme_hatasi_yuzde: ((basit - rho) / rho) * 100,
      derinlik_aralik_orani_b_a: b / a,
      temsil_edilen_derinlik_m: a,
    },
    standardsUsed: ["IEEE Std 81"],
  };
}

export const wennerZeminOzdirenci: CalcModule<WennerZeminOzdirenciInput, WennerZeminOzdirenciOutput> = {
  id: "wenner-zemin-ozdirenci",
  title: "Zemin Özdirenci Ölçümü (Wenner Yöntemi)",
  discipline: "elektrik",
  standards: ["IEEE Std 81"],
  inputSchema: wennerZeminOzdirenciInputSchema,
  compute,
};
