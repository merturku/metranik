import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-1 Tablo 5.2: başlık (basınç, dış çıkıntı) 9ε/10ε/14ε; gövde (eğilme) 72ε/83ε/124ε. Kesit sınıfı = en kötü eleman.
export const celikIKesitSinifiInputSchema = z
  .object({
    fy_MPa: z.number().positive(),
    h_mm: z.number().positive(),
    b_mm: z.number().positive(),
    tf_mm: z.number().positive(),
    tw_mm: z.number().positive(),
    r_mm: z.number().min(0),
  })
  .refine((v) => v.b_mm - v.tw_mm - 2 * v.r_mm > 0 && v.h_mm - 2 * v.tf_mm - 2 * v.r_mm > 0, { message: "Geometri tutarsız: c ≤ 0" });

export type CelikIKesitSinifiInput = z.infer<typeof celikIKesitSinifiInputSchema>;

export interface CelikIKesitSinifiOutput {
  kesitSinifi: number;
}

function sinif(oran: number, s1: number, s2: number, s3: number): number {
  if (oran <= s1) return 1;
  if (oran <= s2) return 2;
  if (oran <= s3) return 3;
  return 4;
}

function compute(input: CelikIKesitSinifiInput): CalcResult<CelikIKesitSinifiOutput> {
  const eps = Math.sqrt(235 / input.fy_MPa);
  const cf = (input.b_mm - input.tw_mm - 2 * input.r_mm) / 2;
  const cw = input.h_mm - 2 * input.tf_mm - 2 * input.r_mm;
  const oranF = cf / input.tf_mm;
  const oranW = cw / input.tw_mm;
  const sf = sinif(oranF, 9 * eps, 10 * eps, 14 * eps);
  const sw = sinif(oranW, 72 * eps, 83 * eps, 124 * eps);
  const genel = Math.max(sf, sw);
  return {
    value: { kesitSinifi: genel },
    intermediates: { epsilon: eps, baslik_c_t: oranF, baslik_sinifi: sf, govde_c_t: oranW, govde_sinifi: sw },
    standardsUsed: ["TS EN 1993-1-1 Tablo 5.2"],
    verdict:
      genel <= 2
        ? { status: "uygun", note: "Sınıf 1–2: plastik moment dayanımı kullanılabilir." }
        : genel === 3
          ? { status: "sinirda", note: "Sınıf 3: yalnız elastik moment dayanımı (Wel) kullanılabilir." }
          : { status: "uygunsuz", note: "Sınıf 4: yerel burkulma için etkin kesit hesabı gerekir." },
  };
}

export const celikIKesitSinifi: CalcModule<CelikIKesitSinifiInput, CelikIKesitSinifiOutput> = {
  id: "celik-i-kesit-sinifi",
  title: "Çelik I Kesit Sınıflandırması (Eğilme)",
  discipline: "insaat",
  standards: ["TS EN 1993-1-1 Tablo 5.2"],
  inputSchema: celikIKesitSinifiInputSchema,
  compute,
};
