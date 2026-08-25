import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TBDY 2018 §4.7: taban kesme kuvvetinin katlara dağılımı. En üst kata ek
// bir kuvvet (ΔFN) ayrılır, kalan (Vt-ΔFN) her kata ağırlık×yükseklik
// çarpımı oranında (wi×hi/Σwj×hj) paylaştırılır; ΔFN yalnız en üst kata
// eklenir. Fi = (Vt-ΔFN)×(wihi/Σwjhj) [+ ΔFN, en üst kat ise].
export const depremYatayYukDagilimiInputSchema = z.object({
  tabanKesmeKuvveti_Vt_kN: z.number().positive(),
  enUstKatEkKuvveti_DeltaFN_kN: z.number().nonnegative(),
  katAgirlikYukseklikCarpimi_wihi_kNm: z.number().positive(),
  toplamAgirlikYukseklikCarpimi_kNm: z.number().positive(),
  buKatEnUstKatMi: z.enum(["evet", "hayir"]),
});

export type DepremYatayYukDagilimiInput = z.infer<
  typeof depremYatayYukDagilimiInputSchema
>;

export interface DepremYatayYukDagilimiOutput {
  katKesmeKuvveti_Fi_kN: number;
}

function compute(
  input: DepremYatayYukDagilimiInput,
): CalcResult<DepremYatayYukDagilimiOutput> {
  const kalanKuvvetKN = input.tabanKesmeKuvveti_Vt_kN - input.enUstKatEkKuvveti_DeltaFN_kN;
  const katPayOrani =
    input.katAgirlikYukseklikCarpimi_wihi_kNm / input.toplamAgirlikYukseklikCarpimi_kNm;
  const payKuvvetiKN = kalanKuvvetKN * katPayOrani;
  const katKesmeKuvvetiKN =
    payKuvvetiKN + (input.buKatEnUstKatMi === "evet" ? input.enUstKatEkKuvveti_DeltaFN_kN : 0);

  return {
    value: { katKesmeKuvveti_Fi_kN: katKesmeKuvvetiKN },
    intermediates: {
      kalanKuvvet_kN: kalanKuvvetKN,
      katPayOrani,
    },
    standardsUsed: ["TBDY 2018"],
  };
}

export const depremYatayYukDagilimi: CalcModule<
  DepremYatayYukDagilimiInput,
  DepremYatayYukDagilimiOutput
> = {
  id: "deprem-yatay-yuk-dagilimi",
  title: "Deprem Yatay Yük Dağılımı (Kat Kesme Kuvveti)",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: depremYatayYukDagilimiInputSchema,
  compute,
};
