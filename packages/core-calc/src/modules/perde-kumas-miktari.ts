import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Perde kumaşı miktarı (şerit/panel yöntemi): gereken açık genişlik W_t = W·pile + 2·yanPay,
// panel sayısı n = ⌈W_t / kumaşEni⌉, panel boyu = H + etek + üst payı, toplam = n·panel boyu.
// Pile katsayısı: düz 1,5–2,0 / ekstra pile 2,5–3,0 (tasarım pratiği).
export const perdeKumasMiktariInputSchema = z.object({
  pencereGenisligi_m: z.number().positive(),
  perdeYuksekligi_m: z.number().positive(),
  pileKatsayisi: z.number().min(1).max(4),
  kumasEni_m: z.number().positive(),
  yanPayi_m: z.number().min(0),
  etekVeUstPayi_m: z.number().min(0),
});

export type PerdeKumasMiktariInput = z.infer<typeof perdeKumasMiktariInputSchema>;

export interface PerdeKumasMiktariOutput {
  toplamKumas_m: number;
}

function compute(input: PerdeKumasMiktariInput): CalcResult<PerdeKumasMiktariOutput> {
  const gerekli = input.pencereGenisligi_m * input.pileKatsayisi + 2 * input.yanPayi_m;
  const panel = Math.ceil(gerekli / input.kumasEni_m - 1e-9);
  const panelBoyu = input.perdeYuksekligi_m + input.etekVeUstPayi_m;
  return {
    value: { toplamKumas_m: panel * panelBoyu },
    intermediates: {
      gereken_genislik_m: gerekli,
      panel_sayisi: panel,
      panel_boyu_m: panelBoyu,
      toplam_kumas_alani_m2: panel * panelBoyu * input.kumasEni_m,
    },
    standardsUsed: [],
  };
}

export const perdeKumasMiktari: CalcModule<PerdeKumasMiktariInput, PerdeKumasMiktariOutput> = {
  id: "perde-kumas-miktari",
  title: "Perde Kumaşı Miktarı",
  discipline: "ev",
  standards: [],
  inputSchema: perdeKumasMiktariInputSchema,
  compute,
};
