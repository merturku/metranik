import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// CO2 bazlı taze hava debisi (talebe bağlı havalandırma / DCV): kararlı
// durum kütle dengesi — kişilerin ürettiği CO2, taze hava ile seyreltilerek
// iç ortam set noktasında tutulur. Q = N×G / (Cs-Co), G kişi başına CO2
// üretim debisi, Cs iç ortam set noktası, Co dış ortam CO2 derişimi (ppm).
// ASHRAE 62.1 Informative Appendix C'de tarif edilen yöntem; sabit
// kişi/alan bazlı statik yöntemin (taze hava debisi ASHRAE 62.1 modülü)
// dinamik/talebe bağlı alternatifidir.
export const co2BazliTazeHavaDebisiInputSchema = z.object({
  kisiSayisi: z.number().positive(),
  kisiBasinaCo2Uretimi_Ls: z.number().positive(),
  icOrtamCo2SetNoktasi_ppm: z.number().positive(),
  disOrtamCo2_ppm: z.number().positive(),
});

export type Co2BazliTazeHavaDebisiInput = z.infer<
  typeof co2BazliTazeHavaDebisiInputSchema
>;

export interface Co2BazliTazeHavaDebisiOutput {
  tazeHavaDebisi_m3h: number;
}

function compute(
  input: Co2BazliTazeHavaDebisiInput,
): CalcResult<Co2BazliTazeHavaDebisiOutput> {
  const derisimFarkiPpm = input.icOrtamCo2SetNoktasi_ppm - input.disOrtamCo2_ppm;
  const debisiLs =
    (input.kisiSayisi * input.kisiBasinaCo2Uretimi_Ls * 1_000_000) / derisimFarkiPpm;
  const debisiM3h = debisiLs * 3.6;

  return {
    value: { tazeHavaDebisi_m3h: debisiM3h },
    intermediates: {
      derisimFarki_ppm: derisimFarkiPpm,
      debisi_Ls: debisiLs,
    },
    standardsUsed: ["ASHRAE 62.1"],
  };
}

export const co2BazliTazeHavaDebisi: CalcModule<
  Co2BazliTazeHavaDebisiInput,
  Co2BazliTazeHavaDebisiOutput
> = {
  id: "co2-bazli-taze-hava-debisi",
  title: "CO2 Bazlı Taze Hava Debisi (DCV)",
  discipline: "mekanik",
  standards: ["ASHRAE 62.1"],
  inputSchema: co2BazliTazeHavaDebisiInputSchema,
  compute,
};
