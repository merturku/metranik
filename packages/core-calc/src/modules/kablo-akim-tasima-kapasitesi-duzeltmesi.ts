import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60364-5-52: temel akım taşıma kapasitesi, ortam sıcaklığı ve gruplama
// (birlikte döşenen kablo sayısı) düzeltme katsayılarıyla çarpılır.
// Iz,düzeltilmiş = Iz × kT × kG.
export const kabloAkimTasimaKapasitesiDuzeltmesiInputSchema = z.object({
  temelAkimTasimaKapasitesi_Iz_A: z.number().positive(),
  sicaklikDuzeltmeKatsayisi_kT: z.number().positive(),
  gruplamaDuzeltmeKatsayisi_kG: z.number().positive(),
});

export type KabloAkimTasimaKapasitesiDuzeltmesiInput = z.infer<
  typeof kabloAkimTasimaKapasitesiDuzeltmesiInputSchema
>;

export interface KabloAkimTasimaKapasitesiDuzeltmesiOutput {
  duzeltilmisAkimTasimaKapasitesi_A: number;
}

function compute(
  input: KabloAkimTasimaKapasitesiDuzeltmesiInput,
): CalcResult<KabloAkimTasimaKapasitesiDuzeltmesiOutput> {
  const duzeltilmisA =
    input.temelAkimTasimaKapasitesi_Iz_A *
    input.sicaklikDuzeltmeKatsayisi_kT *
    input.gruplamaDuzeltmeKatsayisi_kG;

  return {
    value: { duzeltilmisAkimTasimaKapasitesi_A: duzeltilmisA },
    intermediates: {
      sicaklikDuzeltmeKatsayisi_kT: input.sicaklikDuzeltmeKatsayisi_kT,
      gruplamaDuzeltmeKatsayisi_kG: input.gruplamaDuzeltmeKatsayisi_kG,
    },
    standardsUsed: ["IEC 60364-5-52"],
  };
}

export const kabloAkimTasimaKapasitesiDuzeltmesi: CalcModule<
  KabloAkimTasimaKapasitesiDuzeltmesiInput,
  KabloAkimTasimaKapasitesiDuzeltmesiOutput
> = {
  id: "kablo-akim-tasima-kapasitesi-duzeltmesi",
  title: "Kablo Akım Taşıma Kapasitesi Düzeltmesi",
  discipline: "elektrik",
  standards: ["IEC 60364-5-52"],
  inputSchema: kabloAkimTasimaKapasitesiDuzeltmesiInputSchema,
  compute,
};
