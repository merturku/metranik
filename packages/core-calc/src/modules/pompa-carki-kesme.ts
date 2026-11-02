import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pompa çarkı tıraşlama (impeller trim) afinite bağıntıları (sabit devirde, çap oranı r = D2/D1):
// Q2 = Q1·r ;  H2 = H1·r² ;  P2 = P1·r³  (Hydraulic Institute / ISO 9906 pratiği).
// Yaklaşık yöntemdir; büyük kesmelerde verim düşer ve bağıntı sapar (üretici eğrisi esastır).
export const pompaCarkiKesmeInputSchema = z
  .object({
    orijinalCap_mm: z.number().positive(),
    kesilmisCap_mm: z.number().positive(),
    debi_m3h: z.number().positive(),
    basma_mSS: z.number().positive(),
    guc_kW: z.number().positive(),
  })
  .refine((v) => v.kesilmisCap_mm <= v.orijinalCap_mm, { message: "Kesilmiş çap orijinalden büyük olamaz" });

export type PompaCarkiKesmeInput = z.infer<typeof pompaCarkiKesmeInputSchema>;

export interface PompaCarkiKesmeOutput {
  debi_m3h: number;
  basma_mSS: number;
  guc_kW: number;
}

function compute(input: PompaCarkiKesmeInput): CalcResult<PompaCarkiKesmeOutput> {
  const r = input.kesilmisCap_mm / input.orijinalCap_mm;
  const status = r >= 0.8 ? "uygun" : r >= 0.7 ? "sinirda" : "uygunsuz";
  return {
    value: { debi_m3h: input.debi_m3h * r, basma_mSS: input.basma_mSS * r * r, guc_kW: input.guc_kW * r ** 3 },
    intermediates: {
      yeni_basma_mSS: input.basma_mSS * r * r,
      yeni_guc_kW: input.guc_kW * r ** 3,
      cap_orani: r,
      kesme_yuzde: (1 - r) * 100,
      guc_azalmasi_yuzde: (1 - r ** 3) * 100,
    },
    standardsUsed: ["Hydraulic Institute / ISO 9906 (afinite bağıntıları)"],
    verdict: {
      status,
      note:
        status === "uygun"
          ? "Çap oranı ≥ 0,80: afinite bağıntıları makul doğrulukta."
          : "Kesme büyük (oran < 0,80): verim düşer, bağıntı sapar; üretici kesme eğrisini kullanın. Üretici izin verdiği azami kesmeyi (genellikle %20–25) aşmayın.",
    },
  };
}

export const pompaCarkiKesme: CalcModule<PompaCarkiKesmeInput, PompaCarkiKesmeOutput> = {
  id: "pompa-carki-kesme",
  title: "Pompa Çarkı Tıraşlama (Çap Değişimi)",
  discipline: "mekanik",
  standards: ["ISO 9906"],
  inputSchema: pompaCarkiKesmeInputSchema,
  compute,
};
