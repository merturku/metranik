import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500/TBDY 2018: basit eksenel taşıma kapasitesi (moment etkileşimi hariç).
// Nu = 0.85·fcd·(Ac−As) + fyd·As, fcd=fck/1.5, fyd=fyk/1.15.
const BETON_GAMMA_C = 1.5;
const CELIK_GAMMA_S = 1.15;

export const kolonBoyutlandirmaInputSchema = z.object({
  betonKarakteristikDayanim_fck_MPa: z.number().positive(),
  celikAkmaDayanimi_fyk_MPa: z.number().positive(),
  kolonKesitAlani_Ac_mm2: z.number().positive(),
  donatiAlani_As_mm2: z.number().nonnegative(),
});

export type KolonBoyutlandirmaInput = z.infer<typeof kolonBoyutlandirmaInputSchema>;

export interface KolonBoyutlandirmaOutput {
  eksenelKapasite_kN: number;
}

function compute(input: KolonBoyutlandirmaInput): CalcResult<KolonBoyutlandirmaOutput> {
  const fcdMPa = input.betonKarakteristikDayanim_fck_MPa / BETON_GAMMA_C;
  const fydMPa = input.celikAkmaDayanimi_fyk_MPa / CELIK_GAMMA_S;
  const nuN =
    0.85 * fcdMPa * (input.kolonKesitAlani_Ac_mm2 - input.donatiAlani_As_mm2) +
    fydMPa * input.donatiAlani_As_mm2;

  return {
    value: { eksenelKapasite_kN: nuN / 1000 },
    intermediates: {
      betonHesapDayanimi_fcd_MPa: fcdMPa,
      celikHesapDayanimi_fyd_MPa: fydMPa,
    },
    standardsUsed: ["TS 500", "TBDY 2018"],
  };
}

export const kolonBoyutlandirma: CalcModule<
  KolonBoyutlandirmaInput,
  KolonBoyutlandirmaOutput
> = {
  id: "kolon-boyutlandirma",
  title: "Kolon Boyutlandırma (Eksenel Kapasite)",
  discipline: "insaat",
  standards: ["TS 500", "TBDY 2018"],
  inputSchema: kolonBoyutlandirmaInputSchema,
  compute,
};
