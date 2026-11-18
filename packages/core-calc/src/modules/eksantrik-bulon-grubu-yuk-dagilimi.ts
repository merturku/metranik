import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Elastik yöntem: Fd = V/n, T = V·e, Fx = T·ry/Σr², Fy = V/n + T·rx/Σr²; en kritik bulon köşe bulonu.
export const eksantrikBulonGrubuYukDagilimiInputSchema = z
  .object({
    nx: z.number().int().min(1).max(20),
    ny: z.number().int().min(1).max(20),
    sx_mm: z.number().min(0),
    sy_mm: z.number().min(0),
    V_kN: z.number().min(0),
    e_mm: z.number().min(0),
    FvRd_kN: z.number().positive(),
  })
  .refine((v) => v.nx * v.ny >= 2, { message: "En az 2 bulon gerekir" });

export type EksantrikBulonGrubuYukDagilimiInput = z.infer<typeof eksantrikBulonGrubuYukDagilimiInputSchema>;

export interface EksantrikBulonGrubuYukDagilimiOutput {
  enBuyukBulonKuvveti_kN: number;
}

function compute(input: EksantrikBulonGrubuYukDagilimiInput): CalcResult<EksantrikBulonGrubuYukDagilimiOutput> {
  const n = input.nx * input.ny;
  const sumX2 = (input.ny * input.sx_mm ** 2 * input.nx * (input.nx ** 2 - 1)) / 12;
  const sumY2 = (input.nx * input.sy_mm ** 2 * input.ny * (input.ny ** 2 - 1)) / 12;
  const sumR2 = sumX2 + sumY2;
  const rx = ((input.nx - 1) * input.sx_mm) / 2;
  const ry = ((input.ny - 1) * input.sy_mm) / 2;
  const T = input.V_kN * input.e_mm; // kN·mm
  const Fd = input.V_kN / n;
  const Fx = sumR2 > 0 ? (T * ry) / sumR2 : 0;
  const Fy = Fd + (sumR2 > 0 ? (T * rx) / sumR2 : 0);
  const F = Math.hypot(Fx, Fy);
  const kullanim = F / input.FvRd_kN;
  return {
    value: { enBuyukBulonKuvveti_kN: F },
    intermediates: {
      bulon_sayisi: n,
      sum_r2_mm2: sumR2,
      burulma_momenti_kNmm: T,
      dogrudan_kesme_kN: Fd,
      yatay_bilesen_kN: Fx,
      dusey_bilesen_kN: Fy,
      kullanim_orani: kullanim,
    },
    standardsUsed: ["TS EN 1993-1-8"],
    verdict:
      kullanim <= 0.95
        ? { status: "uygun", note: "En büyük bulon kuvveti kesme dayanımının %95'inin altında." }
        : kullanim <= 1
          ? { status: "sinirda", note: "Kullanım oranı %95–100 arasında." }
          : { status: "uygunsuz", note: "En büyük bulon kuvveti bulon kesme dayanımını aşıyor." },
  };
}

export const eksantrikBulonGrubuYukDagilimi: CalcModule<EksantrikBulonGrubuYukDagilimiInput, EksantrikBulonGrubuYukDagilimiOutput> = {
  id: "eksantrik-bulon-grubu-yuk-dagilimi",
  title: "Eksantrik Yüklü Bulon Grubu En Büyük Bulon Kuvveti (Elastik Yöntem)",
  discipline: "insaat",
  standards: ["TS EN 1993-1-8"],
  inputSchema: eksantrikBulonGrubuYukDagilimiInputSchema,
  compute,
};
