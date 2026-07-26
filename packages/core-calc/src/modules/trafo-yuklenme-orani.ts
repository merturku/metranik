import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Trafo yüklenme oranı: yüklenme% = (Syük / Snominal) × 100.
// Anma gücünün sürekli aşılması sargı yalıtımının ısıl ömrünü kısaltır; genel
// pratik olarak sürekli işletmede %80'in altı güvenli, %80-100 arası izlenmeli,
// %100'ün üstü anma gücü aşımıdır.
export const trafoYuklenmeOraniInputSchema = z.object({
  yukGucu_S_kVA: z.number().positive(),
  nominalGuc_Sn_kVA: z.number().positive(),
});

export type TrafoYuklenmeOraniInput = z.infer<typeof trafoYuklenmeOraniInputSchema>;

export interface TrafoYuklenmeOraniOutput {
  yuklenmeOrani_yuzde: number;
}

function compute(input: TrafoYuklenmeOraniInput): CalcResult<TrafoYuklenmeOraniOutput> {
  const yuklenmeOrani_yuzde = (input.yukGucu_S_kVA / input.nominalGuc_Sn_kVA) * 100;

  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (yuklenmeOrani_yuzde <= 80) {
    status = "uygun";
    note = "Yüklenme oranı %80'in altında; sürekli işletme için güvenli.";
  } else if (yuklenmeOrani_yuzde <= 100) {
    status = "sinirda";
    note = "Yüklenme oranı %80-100 aralığında; sıcaklık ve yük artışı izlenmeli.";
  } else {
    status = "uygunsuz";
    note = "Yüklenme, trafo anma gücünü aşıyor; yalıtım ömrü kısalır.";
  }

  return {
    value: { yuklenmeOrani_yuzde },
    intermediates: {
      nominalGuc_Sn_kVA: input.nominalGuc_Sn_kVA,
    },
    standardsUsed: [],
    verdict: { status, note },
  };
}

export const trafoYuklenmeOrani: CalcModule<TrafoYuklenmeOraniInput, TrafoYuklenmeOraniOutput> = {
  id: "trafo-yuklenme-orani",
  title: "Trafo Yüklenme Oranı",
  discipline: "elektrik",
  standards: [],
  inputSchema: trafoYuklenmeOraniInputSchema,
  compute,
};
