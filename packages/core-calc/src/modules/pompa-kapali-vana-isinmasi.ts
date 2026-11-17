import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kapalı vana: Pmil tamamı gövdedeki suyu ısıtır (adyabatik): dT/dt = Pmil/(m·cp). cp = 4186 J/kgK.
const CP = 4186;

export const pompaKapaliVanaIsinmasiInputSchema = z.object({
  milGucu_kW: z.number().positive(),
  suKutlesi_kg: z.number().positive(),
  izinliArtis_K: z.number().positive(),
});

export type PompaKapaliVanaIsinmasiInput = z.infer<typeof pompaKapaliVanaIsinmasiInputSchema>;

export interface PompaKapaliVanaIsinmasiOutput {
  isinmaHizi_Kdk: number;
}

function compute(input: PompaKapaliVanaIsinmasiInput): CalcResult<PompaKapaliVanaIsinmasiOutput> {
  const hizKs = (input.milGucu_kW * 1000) / (input.suKutlesi_kg * CP);
  return {
    value: { isinmaHizi_Kdk: hizKs * 60 },
    intermediates: {
      isinma_hizi_Ks: hizKs,
      izinli_artis_suresi_dk: input.izinliArtis_K / hizKs / 60,
    },
    standardsUsed: ["Enerji dengesi / minimum debi ilkesi"],
  };
}

export const pompaKapaliVanaIsinmasi: CalcModule<PompaKapaliVanaIsinmasiInput, PompaKapaliVanaIsinmasiOutput> = {
  id: "pompa-kapali-vana-isinmasi",
  title: "Pompa Kapalı Vanada Isınma Süresi (Minimum Debi)",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompaKapaliVanaIsinmasiInputSchema,
  compute,
};
