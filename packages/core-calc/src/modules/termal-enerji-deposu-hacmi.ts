import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const termalEnerjiDeposuHacmiSchema = z.object({
  gunluk_enerji_ihtiyaci_kWh: z.number().positive(),
  atim_suresi_saat: z.number().positive(),
  sicaklik_farki_C: z.number().positive(),
});

export type TermalEnerjiDeposuHacmiInput = z.infer<typeof termalEnerjiDeposuHacmiSchema>;

export interface TermalEnerjiDeposuHacmiOutput {
  hacim_L: number;
}

export const termalEnerjiDeposuHacmi: CalcModule<TermalEnerjiDeposuHacmiInput, TermalEnerjiDeposuHacmiOutput> = {
  id: "termal-enerji-deposu-hacmi",
  title: "Termal Enerji Depolama Tank Hacmi",
  discipline: "mekanik",
  standards: ["EN 12392"],
  inputSchema: termalEnerjiDeposuHacmiSchema as any,

  compute(input: TermalEnerjiDeposuHacmiInput): CalcResult<TermalEnerjiDeposuHacmiOutput> {
    const enerji_J = input.gunluk_enerji_ihtiyaci_kWh * 3.6e6;
    const su_ozel_isi = 4186;
    const kutlesi_kg = enerji_J / (su_ozel_isi * input.sicaklik_farki_C);
    const hacim_L = (kutlesi_kg / 1) * 1000;

    return {
      value: { hacim_L: Math.round(hacim_L) },
      intermediates: { enerji_J, su_ozel_isi, kutlesi_kg },
      standardsUsed: ["EN 12392"],
    };
  },
};
