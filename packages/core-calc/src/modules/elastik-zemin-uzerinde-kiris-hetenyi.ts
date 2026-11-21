import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Winkler zemini üzerinde sonsuz uzun kiriş, tekil yük (Hetényi): λ = (ks·b/(4EI))^(1/4)
// y0 = P·λ/(2·ks·b),  M0 = P/(4λ),  q0 = ks·y0;  sonsuz kiriş kabulü için λL ≥ π
export const elastikZeminUzerindeKirisHetenyiInputSchema = z.object({
  E_MPa: z.number().positive(),
  I_cm4: z.number().positive(),
  genislik_b_m: z.number().positive(),
  yatakKatsayisi_ks_kNm3: z.number().positive(),
  yuk_P_kN: z.number().min(0),
  kirisBoyu_L_m: z.number().positive(),
});

export type ElastikZeminUzerindeKirisHetenyiInput = z.infer<typeof elastikZeminUzerindeKirisHetenyiInputSchema>;
export interface ElastikZeminUzerindeKirisHetenyiOutput {
  maksimumMoment_kNm: number;
}

const STD = "Hetényi (1946) elastik zemin üzerinde kiriş / Winkler modeli";

function compute(input: ElastikZeminUzerindeKirisHetenyiInput): CalcResult<ElastikZeminUzerindeKirisHetenyiOutput> {
  const EI = input.E_MPa * 1000 * input.I_cm4 * 1e-8; // kN·m²
  const kb = input.yatakKatsayisi_ks_kNm3 * input.genislik_b_m; // kN/m²
  const lambda = Math.pow(kb / (4 * EI), 0.25);
  const y0 = (input.yuk_P_kN * lambda) / (2 * kb);
  const M0 = input.yuk_P_kN / (4 * lambda);
  const q0 = input.yatakKatsayisi_ks_kNm3 * y0;
  const lamL = lambda * input.kirisBoyu_L_m;
  const status = lamL >= Math.PI ? "uygun" : lamL >= Math.PI / 4 ? "sinirda" : "uygunsuz";
  const note =
    status === "uygun"
      ? `λL = ${lamL.toFixed(2)} ≥ π: uzun kiriş, sonsuz kiriş çözümü geçerli`
      : status === "sinirda"
        ? `λL = ${lamL.toFixed(2)}: kısa kiriş; sonsuz kiriş formülleri yaklaşıktır, uç etkisi dahil edilmeli`
        : `λL = ${lamL.toFixed(2)} < π/4: rijit kiriş; zemin tepkisi doğrusal dağılır, bu formüller geçerli değil`;
  return {
    value: { maksimumMoment_kNm: M0 },
    intermediates: {
      EI_kNm2: EI,
      lambda_1m: lambda,
      karakteristik_uzunluk_m: 1 / lambda,
      maks_cokme_mm: y0 * 1000,
      maks_zemin_gerilmesi_kPa: q0,
      lambda_L: lamL,
    },
    standardsUsed: [STD],
    verdict: { status, note },
  };
}

export const elastikZeminUzerindeKirisHetenyi: CalcModule<ElastikZeminUzerindeKirisHetenyiInput, ElastikZeminUzerindeKirisHetenyiOutput> = {
  id: "elastik-zemin-uzerinde-kiris-hetenyi",
  title: "Elastik Zemin Üzerinde Kiriş (Winkler, Tekil Yük)",
  discipline: "insaat",
  standards: [STD],
  inputSchema: elastikZeminUzerindeKirisHetenyiInputSchema,
  compute,
};
