import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Redresör akımı: I = Iyük + k·C/t (k = şarj verimsizliği). P = U·I.
export const akuSarjRedresoruAkimiInputSchema = z.object({
  kapasite_Ah: z.number().positive(),
  sarjSuresi_h: z.number().positive(),
  yukAkimi_A: z.number().min(0),
  k: z.number().min(1),
  gerilim_V: z.number().positive(),
});

export type AkuSarjRedresoruAkimiInput = z.infer<typeof akuSarjRedresoruAkimiInputSchema>;

export interface AkuSarjRedresoruAkimiOutput {
  redresorAkimi_A: number;
}

function compute(input: AkuSarjRedresoruAkimiInput): CalcResult<AkuSarjRedresoruAkimiOutput> {
  const sarj = (input.k * input.kapasite_Ah) / input.sarjSuresi_h;
  const I = input.yukAkimi_A + sarj;
  return {
    value: { redresorAkimi_A: I },
    intermediates: { sarj_akimi_A: sarj, redresor_gucu_kW: (I * input.gerilim_V) / 1000 },
    standardsUsed: ["Akü şarj akımı dengesi (C/t) — IEEE 485 ilkesi"],
  };
}

export const akuSarjRedresoruAkimi: CalcModule<AkuSarjRedresoruAkimiInput, AkuSarjRedresoruAkimiOutput> = {
  id: "aku-sarj-redresoru-akimi",
  title: "Akü Şarj Redresörü Akımı ve Gücü",
  discipline: "elektrik",
  standards: [],
  inputSchema: akuSarjRedresoruAkimiInputSchema,
  compute,
};
