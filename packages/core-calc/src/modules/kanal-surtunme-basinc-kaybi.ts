import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Havalandırma kanalında sürtünme basınç kaybı (Darcy-Weisbach):
// ΔP = f × (L/Dh) × (ρ×V²/2). f: sürtünme katsayısı, L: kanal uzunluğu,
// Dh: hidrolik çap, ρ: hava yoğunluğu, V: hava hızı.
export const kanalSurtunmeBasincKaybiInputSchema = z.object({
  surtunmeKatsayisi_f: z.number().positive(),
  kanalUzunlugu_L_m: z.number().positive(),
  hidroliCap_Dh_m: z.number().positive(),
  havaYogunlugu_rho_kgm3: z.number().positive(),
  hiz_V_ms: z.number().positive(),
});

export type KanalSurtunmeBasincKaybiInput = z.infer<
  typeof kanalSurtunmeBasincKaybiInputSchema
>;

export interface KanalSurtunmeBasincKaybiOutput {
  basincKaybi_Pa: number;
}

function compute(
  input: KanalSurtunmeBasincKaybiInput,
): CalcResult<KanalSurtunmeBasincKaybiOutput> {
  const dinamikBasincPa =
    (input.havaYogunlugu_rho_kgm3 * input.hiz_V_ms ** 2) / 2;
  const basincKaybiPa =
    input.surtunmeKatsayisi_f *
    (input.kanalUzunlugu_L_m / input.hidroliCap_Dh_m) *
    dinamikBasincPa;

  return {
    value: { basincKaybi_Pa: basincKaybiPa },
    intermediates: {
      dinamikBasinc_Pa: dinamikBasincPa,
    },
    standardsUsed: [],
  };
}

export const kanalSurtunmeBasincKaybi: CalcModule<
  KanalSurtunmeBasincKaybiInput,
  KanalSurtunmeBasincKaybiOutput
> = {
  id: "kanal-surtunme-basinc-kaybi",
  title: "Kanal Sürtünme Basınç Kaybı",
  discipline: "mekanik",
  standards: [],
  inputSchema: kanalSurtunmeBasincKaybiInputSchema,
  compute,
};
