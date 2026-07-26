import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İletim ısı kaybı: Q = U × A × ΔT.
export const pencereDuvarIsiKaybiInputSchema = z.object({
  isiGecirmeKatsayisi_U_Wm2K: z.number().positive(),
  yuzeyAlani_A_m2: z.number().positive(),
  sicaklikFarki_dT_C: z.number().positive(),
});

export type PencereDuvarIsiKaybiInput = z.infer<typeof pencereDuvarIsiKaybiInputSchema>;

export interface PencereDuvarIsiKaybiOutput {
  isiKaybi_W: number;
}

function compute(input: PencereDuvarIsiKaybiInput): CalcResult<PencereDuvarIsiKaybiOutput> {
  const isiKaybiW =
    input.isiGecirmeKatsayisi_U_Wm2K * input.yuzeyAlani_A_m2 * input.sicaklikFarki_dT_C;

  return {
    value: { isiKaybi_W: isiKaybiW },
    intermediates: {
      isiGecirmeKatsayisi_U_Wm2K: input.isiGecirmeKatsayisi_U_Wm2K,
    },
    standardsUsed: ["TS 825"],
  };
}

export const pencereDuvarIsiKaybi: CalcModule<
  PencereDuvarIsiKaybiInput,
  PencereDuvarIsiKaybiOutput
> = {
  id: "pencere-duvar-isi-kaybi",
  title: "Pencere / Duvar Isı Kaybı",
  discipline: "mekanik",
  standards: ["TS 825"],
  inputSchema: pencereDuvarIsiKaybiInputSchema,
  compute,
};
