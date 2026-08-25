import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Nötr topraklama direnci (NGR): Ohm yasasıyla, hedeflenen sınırlı toprak
// arıza akımını (jeneratör/trafo koruması için tipik olarak birkaç yüz
// amperle sınırlanır) sağlayacak direnç R = Vfaz/Iarıza. Arıza anındaki
// direnç üzerindeki güç kaybı da (kısa süreli, termik boyutlandırma için)
// bilgi amaçlı hesaplanır.
export const notrTopraklamaDirenciSecimiInputSchema = z.object({
  fazGerilimi_V: z.number().positive(),
  hedefArizaAkimi_A: z.number().positive(),
});

export type NotrTopraklamaDirenciSecimiInput = z.infer<
  typeof notrTopraklamaDirenciSecimiInputSchema
>;

export interface NotrTopraklamaDirenciSecimiOutput {
  ngrDirenci_ohm: number;
}

function compute(
  input: NotrTopraklamaDirenciSecimiInput,
): CalcResult<NotrTopraklamaDirenciSecimiOutput> {
  const ngrDirenciOhm = input.fazGerilimi_V / input.hedefArizaAkimi_A;
  const gucKaybiKW =
    (input.hedefArizaAkimi_A * input.hedefArizaAkimi_A * ngrDirenciOhm) / 1000;

  return {
    value: { ngrDirenci_ohm: ngrDirenciOhm },
    intermediates: {
      gucKaybi_kW: gucKaybiKW,
    },
    standardsUsed: [],
  };
}

export const notrTopraklamaDirenciSecimi: CalcModule<
  NotrTopraklamaDirenciSecimiInput,
  NotrTopraklamaDirenciSecimiOutput
> = {
  id: "notr-topraklama-direnci-secimi",
  title: "Nötr Topraklama Direnci (NGR) Seçimi",
  discipline: "elektrik",
  standards: [],
  inputSchema: notrTopraklamaDirenciSecimiInputSchema,
  compute,
};
