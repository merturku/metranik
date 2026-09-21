import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const akumulatorTankiHacmiSchema = z.object({
  olü_hacmi_L: z.number().positive(),
  max_basinc_bar: z.number().positive(),
  min_basinc_bar: z.number().positive(),
});

export type AkumulatorTankiHacmiInput = z.infer<typeof akumulatorTankiHacmiSchema>;

export interface AkumulatorTankiHacmiOutput {
  kullanilabilir_hacmi_L: number;
  toplam_tanki_hacmi_L: number;
}

export const akumulatorTankiHacmi: CalcModule<AkumulatorTankiHacmiInput, AkumulatorTankiHacmiOutput> = {
  id: "akumulator-tanki-hacmi",
  title: "Akümülatör Tankı Hacmi",
  discipline: "mekanik",
  standards: ["—"],
  inputSchema: akumulatorTankiHacmiSchema,

  compute(input: AkumulatorTankiHacmiInput): CalcResult<AkumulatorTankiHacmiOutput> {
    // Boyle yasası: P1×V1 = P2×V2 (izotermal)
    // Kullanılabilir hacim = V_ölü × ln(P_max/P_min) / (P_max - P_min)
    const ln_oran = Math.log(input.max_basinc_bar / input.min_basinc_bar);
    const kullanilabilir_hacmi_L = input.olü_hacmi_L * ln_oran / (input.max_basinc_bar - input.min_basinc_bar);
    const toplam_tanki_hacmi_L = input.olü_hacmi_L + kullanilabilir_hacmi_L;

    return {
      value: {
        kullanilabilir_hacmi_L: Math.round(kullanilabilir_hacmi_L * 10) / 10,
        toplam_tanki_hacmi_L: Math.round(toplam_tanki_hacmi_L * 10) / 10,
      },
      intermediates: {
        basinc_farki_bar: input.max_basinc_bar - input.min_basinc_bar,
        ln_oran: Math.round(ln_oran * 1000) / 1000,
      },
      standardsUsed: ["—"],
    };
  },
};
