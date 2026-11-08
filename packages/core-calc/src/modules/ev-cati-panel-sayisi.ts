import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çatıya sığan güneş paneli sayısı ve kurulu güç: n = ⌊A_çatı·kullanım/(boy·en)⌋ (panel aralıkları kullanım oranına dahil),
// P = n·P_panel. Kullanım oranı; baca, çatı penceresi, kenar boşluğu (yangın/rüzgâr) ve panel arası bakım aralığı için ayrılan payı çıkarır
// (düz çatıda sıra gölgelenmesi için ek pay gerekir — GES Panel Sıra Arası Mesafe modülü; eğimli çatıda genellikle 0,70–0,85).
// Yıllık üretim için Güneş Paneli Yıllık Enerji Üretimi modülünü kullanın. Gerçek yerleşim mimari plan ve statik kontrolle doğrulanmalıdır.
export const evCatiPanelSayisiInputSchema = z.object({
  catiAlani_m2: z.number().positive(),
  kullanimOrani: z.number().gt(0).max(1),
  panelBoyu_m: z.number().positive(),
  panelEni_m: z.number().positive(),
  panelGucu_W: z.number().positive(),
});

export type EvCatiPanelSayisiInput = z.infer<typeof evCatiPanelSayisiInputSchema>;

export interface EvCatiPanelSayisiOutput {
  panelSayisi: number;
}

function compute(input: EvCatiPanelSayisiInput): CalcResult<EvCatiPanelSayisiOutput> {
  const panelAlani = input.panelBoyu_m * input.panelEni_m;
  const kullanilabilir = input.catiAlani_m2 * input.kullanimOrani;
  const n = Math.floor(kullanilabilir / panelAlani + 1e-9);
  return {
    value: { panelSayisi: n },
    intermediates: {
      panel_alani_m2: panelAlani,
      kullanilabilir_alan_m2: kullanilabilir,
      kurulu_guc_kWp: (n * input.panelGucu_W) / 1000,
      panel_yuzey_verimi_Wm2: input.panelGucu_W / panelAlani,
      alan_kullanimi_yuzde: ((n * panelAlani) / input.catiAlani_m2) * 100,
    },
    standardsUsed: [],
  };
}

export const evCatiPanelSayisi: CalcModule<EvCatiPanelSayisiInput, EvCatiPanelSayisiOutput> = {
  id: "ev-cati-panel-sayisi",
  title: "Çatıya Sığan GES Panel Sayısı ve Kurulu Güç",
  discipline: "ev",
  standards: [],
  inputSchema: evCatiPanelSayisiInputSchema,
  compute,
};
