import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Meyerhof taşıma gücü formülü: qu = c·Nc + q·Nq + 0.5·γ·B·Nγ.
// Taşıma gücü katsayıları (Nc, Nq, Nγ) zemin sürtünme açısına göre standart
// tablolardan alınır; bu modülde gömülü değildir, kullanıcı girer.
export const temelTasimaKapasitesiMeyerhofInputSchema = z.object({
  kohezyon_c_kPa: z.number().nonnegative(),
  ustYukGerilmesi_q_kPa: z.number().nonnegative(),
  birimHacimAgirlik_gamma_kNm3: z.number().positive(),
  temelGenisligi_B_m: z.number().positive(),
  tasimaGucuKatsayisi_Nc: z.number().nonnegative(),
  tasimaGucuKatsayisi_Nq: z.number().nonnegative(),
  tasimaGucuKatsayisi_Ngamma: z.number().nonnegative(),
});

export type TemelTasimaKapasitesiMeyerhofInput = z.infer<
  typeof temelTasimaKapasitesiMeyerhofInputSchema
>;

export interface TemelTasimaKapasitesiMeyerhofOutput {
  tasimaGucu_qu_kPa: number;
}

function compute(
  input: TemelTasimaKapasitesiMeyerhofInput,
): CalcResult<TemelTasimaKapasitesiMeyerhofOutput> {
  const kohezyonTerimiKPa = input.kohezyon_c_kPa * input.tasimaGucuKatsayisi_Nc;
  const derinlikTerimiKPa = input.ustYukGerilmesi_q_kPa * input.tasimaGucuKatsayisi_Nq;
  const genislikTerimiKPa =
    0.5 *
    input.birimHacimAgirlik_gamma_kNm3 *
    input.temelGenisligi_B_m *
    input.tasimaGucuKatsayisi_Ngamma;
  const quKPa = kohezyonTerimiKPa + derinlikTerimiKPa + genislikTerimiKPa;

  return {
    value: { tasimaGucu_qu_kPa: quKPa },
    intermediates: {
      kohezyonTerimi_kPa: kohezyonTerimiKPa,
      derinlikTerimi_kPa: derinlikTerimiKPa,
      genislikTerimi_kPa: genislikTerimiKPa,
    },
    standardsUsed: ["Meyerhof", "TS 500"],
  };
}

export const temelTasimaKapasitesiMeyerhof: CalcModule<
  TemelTasimaKapasitesiMeyerhofInput,
  TemelTasimaKapasitesiMeyerhofOutput
> = {
  id: "temel-tasima-kapasitesi-meyerhof",
  title: "Temel Taşıma Kapasitesi (Meyerhof)",
  discipline: "insaat",
  standards: ["Meyerhof", "TS 500"],
  inputSchema: temelTasimaKapasitesiMeyerhofInputSchema,
  compute,
};
