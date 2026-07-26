import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Newton soğuma yasası: düz bir yüzeyden taşınımla ısı kaybı Q = h × A × ΔT.
// h: taşınım ısı transfer katsayısı (W/m²K), A: yüzey alanı (m²),
// ΔT: yüzey ile ortam sıcaklık farkı (K veya °C).
export const duzYuzeyTasinimIsiKaybiInputSchema = z.object({
  tasinimKatsayisi_h_Wm2K: z.number().positive(),
  yuzeyAlani_A_m2: z.number().positive(),
  sicaklikFarki_dT_K: z.number().positive(),
});

export type DuzYuzeyTasinimIsiKaybiInput = z.infer<
  typeof duzYuzeyTasinimIsiKaybiInputSchema
>;

export interface DuzYuzeyTasinimIsiKaybiOutput {
  isiKaybi_Q_W: number;
}

function compute(
  input: DuzYuzeyTasinimIsiKaybiInput,
): CalcResult<DuzYuzeyTasinimIsiKaybiOutput> {
  const isiKaybi_Q_W =
    input.tasinimKatsayisi_h_Wm2K * input.yuzeyAlani_A_m2 * input.sicaklikFarki_dT_K;

  return {
    value: { isiKaybi_Q_W },
    intermediates: {
      yuzeyAlani_A_m2: input.yuzeyAlani_A_m2,
    },
    standardsUsed: ["Newton Soğuma Yasası"],
  };
}

export const duzYuzeyTasinimIsiKaybi: CalcModule<
  DuzYuzeyTasinimIsiKaybiInput,
  DuzYuzeyTasinimIsiKaybiOutput
> = {
  id: "duz-yuzey-tasinim-isi-kaybi",
  title: "Düz Yüzey Taşınımla Isı Kaybı",
  discipline: "mekanik",
  standards: ["Newton Soğuma Yasası"],
  inputSchema: duzYuzeyTasinimIsiKaybiInputSchema,
  compute,
};
