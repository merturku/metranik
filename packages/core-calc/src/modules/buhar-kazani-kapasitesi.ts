import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Buhar kazanı buhar üretim kapasitesi: ısıl güç, suyun buharlaşma gizli
// ısısına bölünerek kütlesel buhar debisine çevrilir.
// BuharKapasitesi (kg/h) = Güç (kW) × 3600 / GizliBuharlaşmaIsısı (kJ/kg).
export const buharKazaniKapasitesiInputSchema = z.object({
  isilGuc_kW: z.number().positive(),
  gizliBuharlasmaIsisi_kJkg: z.number().positive(),
});

export type BuharKazaniKapasitesiInput = z.infer<
  typeof buharKazaniKapasitesiInputSchema
>;

export interface BuharKazaniKapasitesiOutput {
  buharKapasitesi_kgh: number;
}

function compute(
  input: BuharKazaniKapasitesiInput,
): CalcResult<BuharKazaniKapasitesiOutput> {
  const isilGucKJh = input.isilGuc_kW * 3600;
  const buharKapasitesiKgh = isilGucKJh / input.gizliBuharlasmaIsisi_kJkg;

  return {
    value: { buharKapasitesi_kgh: buharKapasitesiKgh },
    intermediates: {
      isilGuc_kJh: isilGucKJh,
    },
    standardsUsed: [],
  };
}

export const buharKazaniKapasitesi: CalcModule<
  BuharKazaniKapasitesiInput,
  BuharKazaniKapasitesiOutput
> = {
  id: "buhar-kazani-kapasitesi",
  title: "Buhar Kazanı Kapasitesi",
  discipline: "mekanik",
  standards: [],
  inputSchema: buharKazaniKapasitesiInputSchema,
  compute,
};
