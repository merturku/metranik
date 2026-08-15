import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basınçlı hava deposu (receiver tank) boyutlandırma: kısa süreli yüksek
// talep anında depo basıncının izin verilen alt sınırın altına düşmemesi
// için gerekli hacim. V = (Q × t × Pa) / (P1 - P2). Q: talep debisi (serbest
// hava), t: talep süresi, Pa: atmosfer basıncı (mutlak), P1: depo üst basınç,
// P2: izin verilen alt basınç.
export const havaDeposuBoyutlandirmaInputSchema = z.object({
  talepDebisi_Q_Ldk: z.number().positive(),
  talepSuresi_t_dk: z.number().positive(),
  atmosferBasinci_Pa_bar: z.number().positive(),
  depoUstBasinc_P1_bar: z.number().positive(),
  depoAltBasinc_P2_bar: z.number().positive(),
});

export type HavaDeposuBoyutlandirmaInput = z.infer<
  typeof havaDeposuBoyutlandirmaInputSchema
>;

export interface HavaDeposuBoyutlandirmaOutput {
  gerekliHacim_L: number;
}

function compute(
  input: HavaDeposuBoyutlandirmaInput,
): CalcResult<HavaDeposuBoyutlandirmaOutput> {
  const basincFarkiBar = input.depoUstBasinc_P1_bar - input.depoAltBasinc_P2_bar;
  const gerekliHacimL =
    (input.talepDebisi_Q_Ldk * input.talepSuresi_t_dk * input.atmosferBasinci_Pa_bar) /
    basincFarkiBar;

  return {
    value: { gerekliHacim_L: gerekliHacimL },
    intermediates: {
      basincFarki_bar: basincFarkiBar,
    },
    standardsUsed: [],
  };
}

export const havaDeposuBoyutlandirma: CalcModule<
  HavaDeposuBoyutlandirmaInput,
  HavaDeposuBoyutlandirmaOutput
> = {
  id: "hava-deposu-boyutlandirma",
  title: "Hava Deposu (Receiver Tank) Boyutlandırma",
  discipline: "mekanik",
  standards: [],
  inputSchema: havaDeposuBoyutlandirmaInputSchema,
  compute,
};
