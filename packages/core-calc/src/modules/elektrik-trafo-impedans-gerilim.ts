import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Etiket değerlerinden (IEC 60076-1): uR = Pk/Sn×100, uX = √(uk² − uR²). Yük
// altındaki gerilim düşümü (regülasyon), β yüklenme oranıyla:
// ΔU% = β(uR·cosφ + uX·sinφ) + β²(uX·cosφ − uR·sinφ)² / 200.
export const trafoImpedansSchema = z
  .object({
    guc_kVA: z.number().positive(),
    kisa_devre_kaybi_kW: z.number().positive(),
    kisa_devre_gerilimi_yuzde: z.number().positive(),
    yuklenme_orani: z.number().positive(),
    guc_faktoru_cosfi: z.number().positive().max(1),
  })
  .refine((v) => (v.kisa_devre_kaybi_kW / v.guc_kVA) * 100 < v.kisa_devre_gerilimi_yuzde, {
    message: "uR = Pk/Sn, uk'dan küçük olmalı",
  });

export type TrafoImpedansInput = z.infer<typeof trafoImpedansSchema>;

export interface TrafoImpedansOutput {
  gerilim_dusumu_yuzde: number;
}

function compute(input: TrafoImpedansInput): CalcResult<TrafoImpedansOutput> {
  const uR = (input.kisa_devre_kaybi_kW / input.guc_kVA) * 100;
  const uX = Math.sqrt(input.kisa_devre_gerilimi_yuzde ** 2 - uR ** 2);
  const cos = input.guc_faktoru_cosfi;
  const sin = Math.sqrt(1 - cos ** 2);
  const beta = input.yuklenme_orani;
  const birinciDerece = beta * (uR * cos + uX * sin);
  const ikinciDerece = (beta * (uX * cos - uR * sin)) ** 2 / 200;

  return {
    value: { gerilim_dusumu_yuzde: birinciDerece + ikinciDerece },
    intermediates: {
      rezistif_gerilim_uR_yuzde: uR,
      reaktif_gerilim_uX_yuzde: uX,
      birinci_derece_terim_yuzde: birinciDerece,
    },
    standardsUsed: ["IEC 60076-1"],
  };
}

export const trafoImpedansGerilim: CalcModule<TrafoImpedansInput, TrafoImpedansOutput> = {
  id: "elektrik-trafo-impedans-gerilim",
  title: "Trafo Empedans Gerilim Düşümü",
  discipline: "elektrik",
  standards: ["IEC 60076-1"],
  inputSchema: trafoImpedansSchema,
  compute,
};
