import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Rankine, c = 0: σa = Ka(q + Σγh) + u; sürşarj + nemli/batık zemin + hidrostatik su; bileşke ve etki yüksekliği.
export const istinatDuvariYanalBasincSurjTabanSuyuInputSchema = z
  .object({
    yukseklik_m: z.number().positive(),
    birimAgirlik_kNm3: z.number().positive(),
    batikBirimAgirlik_kNm3: z.number().positive(),
    phi_deg: z.number().positive().lt(60),
    surj_kPa: z.number().min(0),
    suDerinligi_m: z.number().min(0),
  })
  .refine((v) => v.suDerinligi_m <= v.yukseklik_m, { message: "Su seviyesi yüksekliği (taban üzeri) duvar yüksekliğini aşamaz" })
  .refine((v) => v.batikBirimAgirlik_kNm3 > 9.81, { message: "Doygun birim ağırlık suyunkinden büyük olmalı" });

export type IstinatDuvariYanalBasincSurjTabanSuyuInput = z.infer<typeof istinatDuvariYanalBasincSurjTabanSuyuInputSchema>;

export interface IstinatDuvariYanalBasincSurjTabanSuyuOutput {
  toplamItme_kNm: number;
}

function compute(input: IstinatDuvariYanalBasincSurjTabanSuyuInput): CalcResult<IstinatDuvariYanalBasincSurjTabanSuyuOutput> {
  const gw = 9.81;
  const ka = Math.tan(((45 - input.phi_deg / 2) * Math.PI) / 180) ** 2;
  const H = input.yukseklik_m;
  const hw = input.suDerinligi_m;
  const z1 = H - hw;
  const gb = input.batikBirimAgirlik_kNm3 - gw;
  // [kuvvet kN/m, taban üzerinden kol m]
  const parcalar: Array<[number, number]> = [
    [ka * input.surj_kPa * H, H / 2],
    [0.5 * ka * input.birimAgirlik_kNm3 * z1 * z1, hw + z1 / 3],
    [ka * input.birimAgirlik_kNm3 * z1 * hw, hw / 2],
    [0.5 * ka * gb * hw * hw, hw / 3],
    [0.5 * gw * hw * hw, hw / 3],
  ];
  let P = 0;
  let M = 0;
  for (const [f, kol] of parcalar) {
    P += f;
    M += f * kol;
  }
  const suItmesi = 0.5 * gw * hw * hw;
  return {
    value: { toplamItme_kNm: P },
    intermediates: {
      ka,
      etki_yuksekligi_m: M / P,
      devirme_momenti_kNm_m: M,
      surj_itmesi_kNm: parcalar[0]![0],
      su_itmesi_kNm: suItmesi,
      tabanda_basinc_kPa:
        ka * (input.surj_kPa + input.birimAgirlik_kNm3 * z1 + gb * hw) + gw * hw,
    },
    standardsUsed: [],
  };
}

export const istinatDuvariYanalBasincSurjTabanSuyu: CalcModule<IstinatDuvariYanalBasincSurjTabanSuyuInput, IstinatDuvariYanalBasincSurjTabanSuyuOutput> = {
  id: "istinat-duvari-yanal-basinc-surj-taban-suyu",
  title: "İstinat Duvarı Yanal Basıncı (Sürşarj ve Taban Suyu)",
  discipline: "insaat",
  standards: [],
  inputSchema: istinatDuvariYanalBasincSurjTabanSuyuInputSchema,
  compute,
};
