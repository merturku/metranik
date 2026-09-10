import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kompanzasyon kondansatör bankası, şebeke endüktansıyla birlikte paralel
// rezonans oluşturabilir; rezonans harmonik mertebesi h=√(Ssc/Qc) (Ssc: bara
// kısa devre gücü, Qc: kompanzasyon reaktif gücü). Bu mertebe, tesiste yaygın
// bulunan bir harmonik kaynağının (örn. 5. veya 7. harmonik, sürücüler/
// doğrultucular) mertebesine çok yakınsa rezonans amplifikasyonu riski
// oluşur.
export const kompanzasyonRezonansKontroluInputSchema = z.object({
  kisaDevreGucu_Ssc_kVA: z.number().positive(),
  kompanzasyonGucu_Qc_kVAr: z.number().positive(),
  riskliHarmonikMertebe_h: z.number().positive(),
  toleransOrani: z.number().positive().max(1),
});

export type KompanzasyonRezonansKontroluInput = z.infer<
  typeof kompanzasyonRezonansKontroluInputSchema
>;

export interface KompanzasyonRezonansKontroluOutput {
  rezonansHarmonikMertebesi_h: number;
}

function compute(
  input: KompanzasyonRezonansKontroluInput,
): CalcResult<KompanzasyonRezonansKontroluOutput> {
  const rezonansHarmonikMertebesiH = Math.sqrt(
    input.kisaDevreGucu_Ssc_kVA / input.kompanzasyonGucu_Qc_kVAr,
  );
  const bagilFark =
    Math.abs(rezonansHarmonikMertebesiH - input.riskliHarmonikMertebe_h) /
    input.riskliHarmonikMertebe_h;

  return {
    value: { rezonansHarmonikMertebesi_h: rezonansHarmonikMertebesiH },
    intermediates: {
      bagilFark_yuzde: bagilFark * 100,
    },
    standardsUsed: [],
    verdict:
      bagilFark >= input.toleransOrani
        ? { status: "uygun", note: "Rezonans mertebesi riskli harmonikten yeterince uzak." }
        : { status: "uygunsuz", note: "Rezonans mertebesi riskli harmoniğe çok yakın — amplifikasyon riski." },
  };
}

export const kompanzasyonRezonansKontrolu: CalcModule<
  KompanzasyonRezonansKontroluInput,
  KompanzasyonRezonansKontroluOutput
> = {
  id: "kompanzasyon-rezonans-kontrolu",
  title: "Kompanzasyon Rezonans Kontrolü",
  discipline: "elektrik",
  standards: [],
  inputSchema: kompanzasyonRezonansKontroluInputSchema,
  compute,
};
