import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: ısı kaynağının asgari çalışma süresini sağlamak için gerekli
// buffer/denge kabı hacmi. Enerji(kJ) = Q·t, V(L) = Enerji/(cp·ΔT).
const SU_OZGUL_ISI_KJ_KGK = 4.186;

export const dengeKabiHacmiInputSchema = z.object({
  isiKaynagiGucu_Q_kW: z.number().positive(),
  minimumCalismaSuresi_t_s: z.number().positive(),
  izinVerilenSicaklikFarki_dT_C: z.number().positive(),
});

export type DengeKabiHacmiInput = z.infer<typeof dengeKabiHacmiInputSchema>;

export interface DengeKabiHacmiOutput {
  gerekliHacim_L: number;
}

function compute(input: DengeKabiHacmiInput): CalcResult<DengeKabiHacmiOutput> {
  const enerjiKJ = input.isiKaynagiGucu_Q_kW * input.minimumCalismaSuresi_t_s;
  const gerekliHacimL = enerjiKJ / (SU_OZGUL_ISI_KJ_KGK * input.izinVerilenSicaklikFarki_dT_C);

  return {
    value: { gerekliHacim_L: gerekliHacimL },
    intermediates: {
      gerekliEnerji_kJ: enerjiKJ,
    },
    standardsUsed: [],
  };
}

export const dengeKabiHacmi: CalcModule<DengeKabiHacmiInput, DengeKabiHacmiOutput> = {
  id: "denge-kabi-hacmi",
  title: "Denge Kabı (Buffer Tank) Hacmi",
  discipline: "mekanik",
  standards: [],
  inputSchema: dengeKabiHacmiInputSchema,
  compute,
};
