import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-8 Tablo 3.4: Fv,Rd = αv·fub·A/γM2, Ft,Rd = k2·fub·As/γM2 (k2 = 0,9), etkileşim Fv,Ed/Fv,Rd + Ft,Ed/(1,4·Ft,Rd) ≤ 1.
const FUB: Record<string, number> = { "4.6": 400, "4.8": 400, "5.6": 500, "5.8": 500, "6.8": 600, "8.8": 800, "10.9": 1000 };
const ALFA_V_DISLI: Record<string, number> = { "4.6": 0.6, "4.8": 0.5, "5.6": 0.6, "5.8": 0.5, "6.8": 0.5, "8.8": 0.6, "10.9": 0.5 };
const GAMMA_M2 = 1.25;

export const bulonKesmeCekmeEtkilesimiInputSchema = z.object({
  sinif: z.enum(["4.6", "4.8", "5.6", "5.8", "6.8", "8.8", "10.9"]),
  duzlem: z.enum(["disli", "govde"]),
  d_mm: z.number().positive(),
  as_mm2: z.number().positive(),
  fvEd_kN: z.number().min(0),
  ftEd_kN: z.number().min(0),
});

export type BulonKesmeCekmeEtkilesimiInput = z.infer<typeof bulonKesmeCekmeEtkilesimiInputSchema>;

export interface BulonKesmeCekmeEtkilesimiOutput {
  etkilesimOrani: number;
}

function compute(input: BulonKesmeCekmeEtkilesimiInput): CalcResult<BulonKesmeCekmeEtkilesimiOutput> {
  const fub = FUB[input.sinif] as number;
  const disli = input.duzlem === "disli";
  const alfa = disli ? (ALFA_V_DISLI[input.sinif] as number) : 0.6;
  const A = disli ? input.as_mm2 : (Math.PI * input.d_mm * input.d_mm) / 4;
  const FvRd = (alfa * fub * A) / GAMMA_M2 / 1000; // kN
  const FtRd = (0.9 * fub * input.as_mm2) / GAMMA_M2 / 1000; // kN
  const kesme = input.fvEd_kN / FvRd;
  const cekme = input.ftEd_kN / (1.4 * FtRd);
  const toplam = kesme + cekme;
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (toplam > 1 || input.ftEd_kN > FtRd || input.fvEd_kN > FvRd) {
    status = "uygunsuz";
    note = "Etkileşim oranı > 1 veya tek başına çekme/kesme dayanımı aşılıyor.";
  } else if (toplam > 0.9) {
    status = "sinirda";
    note = "Etkileşim oranı 0,90–1,00: marj dar.";
  } else {
    status = "uygun";
    note = "Birleşik kesme-çekme etkileşimi sağlanıyor.";
  }
  return {
    value: { etkilesimOrani: toplam },
    intermediates: { fub_MPa: fub, alfa_v: alfa, Fv_Rd_kN: FvRd, Ft_Rd_kN: FtRd, kesme_orani: kesme, cekme_orani: cekme },
    standardsUsed: ["TS EN 1993-1-8 Tablo 3.4"],
    verdict: { status, note },
  };
}

export const bulonKesmeCekmeEtkilesimi: CalcModule<BulonKesmeCekmeEtkilesimiInput, BulonKesmeCekmeEtkilesimiOutput> = {
  id: "bulon-kesme-cekme-etkilesimi",
  title: "Bulon Kesme–Çekme Etkileşim Kontrolü",
  discipline: "insaat",
  standards: ["TS EN 1993-1-8 Tablo 3.4"],
  inputSchema: bulonKesmeCekmeEtkilesimiInputSchema,
  compute,
};
