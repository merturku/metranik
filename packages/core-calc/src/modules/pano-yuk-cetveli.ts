import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Talep faktörü yöntemi: tüm yükler aynı anda tam kapasitede çalışmadığından,
// pano tasarım gücü Ptalep = ΣPkurulu × talep faktörü olarak alınır.
export const panoYukCetveliInputSchema = z.object({
  toplamKuruluGuc_kW: z.number().positive(),
  talepFaktoru: z.number().positive().max(1),
});

export type PanoYukCetveliInput = z.infer<typeof panoYukCetveliInputSchema>;

export interface PanoYukCetveliOutput {
  talepGucu_kW: number;
}

function compute(input: PanoYukCetveliInput): CalcResult<PanoYukCetveliOutput> {
  const talepGucuKW = input.toplamKuruluGuc_kW * input.talepFaktoru;

  return {
    value: { talepGucu_kW: talepGucuKW },
    intermediates: {
      talepFaktoru: input.talepFaktoru,
    },
    standardsUsed: [],
  };
}

export const panoYukCetveli: CalcModule<PanoYukCetveliInput, PanoYukCetveliOutput> = {
  id: "pano-yuk-cetveli",
  title: "Pano Yük Cetveli (Talep Faktörü)",
  discipline: "elektrik",
  standards: [],
  inputSchema: panoYukCetveliInputSchema,
  compute,
};
