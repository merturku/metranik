import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çelik çekme elemanı tasarım dayanımı — TS EN 1993-1-1 §6.2.3:
// Npl,Rd = A·fy/γM0   (brüt kesit akması, Eş. 6.6)
// Nu,Rd  = 0,9·Anet·fu/γM2   (delikli net kesit kopması, Eş. 6.7)
// NRd = min(Npl,Rd; Nu,Rd);  NEd/NRd ≤ 1 (Eş. 6.5). γM0 = 1,00, γM2 = 1,25 (önerilen değerler).
const GAMA_M0 = 1.0;
const GAMA_M2 = 1.25;

export const celikCekmeElemaniDayanimiInputSchema = z
  .object({
    brutAlan_mm2: z.number().positive(),
    netAlan_mm2: z.number().positive(),
    akmaDayanimi_fy_MPa: z.number().positive(),
    cekmeDayanimi_fu_MPa: z.number().positive(),
    tasarimCekmeKuvveti_NEd_kN: z.number().min(0),
  })
  .refine((v) => v.netAlan_mm2 <= v.brutAlan_mm2, {
    message: "Net alan brüt alandan büyük olamaz",
    path: ["netAlan_mm2"],
  });

export type CelikCekmeElemaniDayanimiInput = z.infer<typeof celikCekmeElemaniDayanimiInputSchema>;

export interface CelikCekmeElemaniDayanimiOutput {
  cekmeDayanimi_NRd_kN: number;
}

function compute(input: CelikCekmeElemaniDayanimiInput): CalcResult<CelikCekmeElemaniDayanimiOutput> {
  const nplRd = (input.brutAlan_mm2 * input.akmaDayanimi_fy_MPa) / GAMA_M0 / 1000;
  const nuRd = (0.9 * input.netAlan_mm2 * input.cekmeDayanimi_fu_MPa) / GAMA_M2 / 1000;
  const nrd = Math.min(nplRd, nuRd);
  const ned = input.tasarimCekmeKuvveti_NEd_kN;

  let verdict: CalcResult<CelikCekmeElemaniDayanimiOutput>["verdict"];
  if (ned > 0) {
    const oran = ned / nrd;
    verdict =
      oran <= 1
        ? { status: "uygun", note: `NEd/NRd = ${oran.toFixed(3)} ≤ 1,0 (${nplRd <= nuRd ? "brüt kesit akması" : "net kesit kopması"} belirleyici).` }
        : { status: "uygunsuz", note: `NEd/NRd = ${oran.toFixed(3)} > 1,0: kesit büyütülmeli veya delik kaybı azaltılmalı.` };
  }

  return {
    value: { cekmeDayanimi_NRd_kN: nrd },
    intermediates: {
      Npl_Rd_kN: nplRd,
      Nu_Rd_kN: nuRd,
      belirleyici: nplRd <= nuRd ? "Brüt kesit akması (Npl,Rd)" : "Net kesit kopması (Nu,Rd)",
      kullanim_orani: ned > 0 ? ned / nrd : "—",
      net_brut_alan_orani: input.netAlan_mm2 / input.brutAlan_mm2,
    },
    standardsUsed: ["TS EN 1993-1-1"],
    verdict,
  };
}

export const celikCekmeElemaniDayanimi: CalcModule<
  CelikCekmeElemaniDayanimiInput,
  CelikCekmeElemaniDayanimiOutput
> = {
  id: "celik-cekme-elemani-dayanimi",
  title: "Çelik Çekme Elemanı Dayanımı",
  discipline: "insaat",
  standards: ["TS EN 1993-1-1"],
  inputSchema: celikCekmeElemaniDayanimiInputSchema,
  compute,
};
