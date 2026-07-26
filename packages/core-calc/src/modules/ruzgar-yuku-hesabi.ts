import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1991-1-4 (Eurocode 1): qb = 0.5·ρ·vb² (temel hız basıncı),
// qp = ce·qb (tepe hız basıncı), we = qp·cpe (yüzey rüzgar basıncı).
const HAVA_YOGUNLUGU_KG_M3 = 1.25;

export const ruzgarYukuHesabiInputSchema = z.object({
  temelRuzgarHizi_ms: z.number().positive(),
  maruziyetKatsayisi_ce: z.number().positive(),
  basincKatsayisi_cpe: z.number().positive(),
});

export type RuzgarYukuHesabiInput = z.infer<typeof ruzgarYukuHesabiInputSchema>;

export interface RuzgarYukuHesabiOutput {
  ruzgarBasinci_kNm2: number;
}

function compute(input: RuzgarYukuHesabiInput): CalcResult<RuzgarYukuHesabiOutput> {
  const temelHizBasinciPa = 0.5 * HAVA_YOGUNLUGU_KG_M3 * input.temelRuzgarHizi_ms ** 2;
  const tepeHizBasinciPa = input.maruziyetKatsayisi_ce * temelHizBasinciPa;
  const yuzeyBasincPa = tepeHizBasinciPa * input.basincKatsayisi_cpe;

  return {
    value: { ruzgarBasinci_kNm2: yuzeyBasincPa / 1000 },
    intermediates: {
      temelHizBasinci_qb_Pa: temelHizBasinciPa,
      tepeHizBasinci_qp_Pa: tepeHizBasinciPa,
      havaYogunlugu_kg_m3: HAVA_YOGUNLUGU_KG_M3,
    },
    standardsUsed: ["TS EN 1991-1-4"],
  };
}

export const ruzgarYukuHesabi: CalcModule<RuzgarYukuHesabiInput, RuzgarYukuHesabiOutput> = {
  id: "ruzgar-yuku-hesabi",
  title: "Rüzgar Yükü Hesabı",
  discipline: "insaat",
  standards: ["TS EN 1991-1-4"],
  inputSchema: ruzgarYukuHesabiInputSchema,
  compute,
};
