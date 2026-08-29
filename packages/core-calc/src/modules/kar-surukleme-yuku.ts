import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 1991-1-3 Ek B (basitleştirilmiş): bir engelin (parapet/duvar) yanında
// biriken kar sürüklenmesi için sürükleme katsayısı μw = γ×h/sk (γ: kar özgül
// ağırlığı, h: engel yüksekliği, sk: karakteristik kar yükü), 0.8-4 aralığında
// sınırlanır. Sürüklenme yükü s = μw×Ce×Ct×sk. Kar Yükü Hesabı modülünün
// verdiği düzgün yayılı yükün üstüne, engel yakınında yerel ek yük olarak
// eklenir.
export const karSuruklemeYukuInputSchema = z.object({
  engelYuksekligi_h_m: z.number().positive(),
  karOzgulAgirligi_gamma_kNm3: z.number().positive(),
  karakteristikKarYuku_sk_kNm2: z.number().positive(),
  maruziyetKatsayisi_Ce: z.number().positive(),
  isilKatsayi_Ct: z.number().positive(),
  minSuruklemeKatsayisi_muMin: z.number().positive(),
  maxSuruklemeKatsayisi_muMax: z.number().positive(),
});

export type KarSuruklemeYukuInput = z.infer<typeof karSuruklemeYukuInputSchema>;

export interface KarSuruklemeYukuOutput {
  suruklemeYuku_s_kNm2: number;
}

function compute(input: KarSuruklemeYukuInput): CalcResult<KarSuruklemeYukuOutput> {
  const hesaplananMuw =
    (input.karOzgulAgirligi_gamma_kNm3 * input.engelYuksekligi_h_m) /
    input.karakteristikKarYuku_sk_kNm2;
  const sinirlanmisMuw = Math.min(
    Math.max(hesaplananMuw, input.minSuruklemeKatsayisi_muMin),
    input.maxSuruklemeKatsayisi_muMax,
  );
  const suruklemeYukuKNm2 =
    sinirlanmisMuw * input.maruziyetKatsayisi_Ce * input.isilKatsayi_Ct * input.karakteristikKarYuku_sk_kNm2;

  return {
    value: { suruklemeYuku_s_kNm2: suruklemeYukuKNm2 },
    intermediates: {
      hesaplananSuruklemeKatsayisi_muw: hesaplananMuw,
      sinirlanmisSuruklemeKatsayisi_muw: sinirlanmisMuw,
    },
    standardsUsed: ["EN 1991-1-3"],
  };
}

export const karSuruklemeYuku: CalcModule<KarSuruklemeYukuInput, KarSuruklemeYukuOutput> = {
  id: "kar-surukleme-yuku",
  title: "Kar Sürüklenme (Drift) Yükü",
  discipline: "insaat",
  standards: ["EN 1991-1-3"],
  inputSchema: karSuruklemeYukuInputSchema,
  compute,
};
