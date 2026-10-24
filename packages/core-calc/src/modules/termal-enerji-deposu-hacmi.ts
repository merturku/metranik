import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duyulur ısı depolaması: E = m×cp×ΔT → V = E / (ρ×cp×ΔT). Atım (deşarj) süresi
// depodan çekilecek ortalama gücü verir: P = E / t.
export const termalEnerjiDeposuHacmiSchema = z.object({
  gunluk_enerji_ihtiyaci_kWh: z.number().positive(),
  atim_suresi_saat: z.number().positive(),
  sicaklik_farki_C: z.number().positive(),
});

export type TermalEnerjiDeposuHacmiInput = z.infer<typeof termalEnerjiDeposuHacmiSchema>;

export interface TermalEnerjiDeposuHacmiOutput {
  hacim_L: number;
}

const SU_YOGUNLUGU_KG_L = 1;
const SU_OZGUL_ISI_KJ_KGK = 4.186;
const KJ_PER_KWH = 3600;

function compute(input: TermalEnerjiDeposuHacmiInput): CalcResult<TermalEnerjiDeposuHacmiOutput> {
  const enerjiKJ = input.gunluk_enerji_ihtiyaci_kWh * KJ_PER_KWH;
  const kutleKg = enerjiKJ / (SU_OZGUL_ISI_KJ_KGK * input.sicaklik_farki_C);
  const hacimL = kutleKg / SU_YOGUNLUGU_KG_L;

  return {
    value: { hacim_L: hacimL },
    intermediates: {
      enerji_kJ: enerjiKJ,
      su_kutlesi_kg: kutleKg,
      ortalama_desarj_gucu_kW: input.gunluk_enerji_ihtiyaci_kWh / input.atim_suresi_saat,
    },
    standardsUsed: [],
  };
}

export const termalEnerjiDeposuHacmi: CalcModule<
  TermalEnerjiDeposuHacmiInput,
  TermalEnerjiDeposuHacmiOutput
> = {
  id: "termal-enerji-deposu-hacmi",
  title: "Termal Enerji Depolama Tank Hacmi",
  discipline: "mekanik",
  standards: [],
  inputSchema: termalEnerjiDeposuHacmiSchema,
  compute,
};
