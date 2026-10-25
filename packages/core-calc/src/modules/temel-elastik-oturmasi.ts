import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Elastik (ani) oturma, TS EN 1997-1 Ek F.2 elastik yöntemi / Timoshenko-Goodier:
// s = q·B·(1 − ν²)·Is / Es. Is etki katsayısı temel şekline, rijitliğine ve
// noktaya bağlıdır (örn. esnek kare temel merkezi 1,12, ortalama 0,95; rijit kare
// 0,82) ve tablodan mühendis tarafından girilir. Konsolidasyon oturmasından
// (Zemin Konsolidasyon Oturması) ayrıdır: yükleme anında, drenajsız/kumlu
// zeminlerde baskın olan bileşendir; toplam oturma ikisinin toplamıdır.
export const temelElastikOturmasiInputSchema = z.object({
  netTemelBasinci_q_kPa: z.number().positive(),
  temelGenisligi_B_m: z.number().positive(),
  poissonOrani: z.number().min(0).max(0.5),
  zeminElastisiteModulu_Es_kPa: z.number().positive(),
  etkiKatsayisi_Is: z.number().positive(),
  izinVerilenOturma_mm: z.number().positive(),
});

export type TemelElastikOturmasiInput = z.infer<typeof temelElastikOturmasiInputSchema>;

export interface TemelElastikOturmasiOutput {
  oturma_mm: number;
}

function compute(input: TemelElastikOturmasiInput): CalcResult<TemelElastikOturmasiOutput> {
  const poissonCarpani = 1 - input.poissonOrani ** 2;
  const oturmaM =
    (input.netTemelBasinci_q_kPa * input.temelGenisligi_B_m * poissonCarpani * input.etkiKatsayisi_Is) /
    input.zeminElastisiteModulu_Es_kPa;
  const oturmaMm = oturmaM * 1000;
  const uygun = oturmaMm <= input.izinVerilenOturma_mm;

  return {
    value: { oturma_mm: oturmaMm },
    intermediates: {
      poisson_carpani: poissonCarpani,
      kullanim_orani_yuzde: (oturmaMm / input.izinVerilenOturma_mm) * 100,
    },
    standardsUsed: ["TS EN 1997-1"],
    verdict: uygun
      ? {
          status: "uygun",
          note: `Elastik oturma ${oturmaMm.toFixed(1)} mm ≤ ${input.izinVerilenOturma_mm} mm.`,
        }
      : {
          status: "uygunsuz",
          note: `Elastik oturma ${oturmaMm.toFixed(1)} mm > ${input.izinVerilenOturma_mm} mm: temel boyutunu büyütün veya zemin iyileştirmesi değerlendirin.`,
        },
  };
}

export const temelElastikOturmasi: CalcModule<TemelElastikOturmasiInput, TemelElastikOturmasiOutput> = {
  id: "temel-elastik-oturmasi",
  title: "Temel Elastik (Ani) Oturması",
  discipline: "insaat",
  standards: ["TS EN 1997-1"],
  inputSchema: temelElastikOturmasiInputSchema,
  compute,
};
