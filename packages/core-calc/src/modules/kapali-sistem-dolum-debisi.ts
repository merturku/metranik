import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const kapalıSistemDolumDebisiSchema = z.object({
  kazan_hacmi_L: z.number().positive(),
  radyator_toplam_hacmi_L: z.number().nonnegative(),
  boru_hacmi_L: z.number().nonnegative(),
  dolum_hizi_mh: z.number().positive(),
});

export type KapalıSistemDolumDebisiInput = z.infer<typeof kapalıSistemDolumDebisiSchema>;

export interface KapalıSistemDolumDebisiOutput {
  gereken_dolum_debisi_Lh: number;
  dolum_suresi_dakika: number;
}

export const kapalıSistemDolumDebisi: CalcModule<KapalıSistemDolumDebisiInput, KapalıSistemDolumDebisiOutput> = {
  id: "kapali-sistem-dolum-debisi",
  title: "Kapalı Sistem Dolum Debisi",
  discipline: "mekanik",
  standards: ["EN 12828"],
  inputSchema: kapalıSistemDolumDebisiSchema,

  compute(input: KapalıSistemDolumDebisiInput): CalcResult<KapalıSistemDolumDebisiOutput> {
    const sistem_hacmi_L = input.kazan_hacmi_L + input.radyator_toplam_hacmi_L + input.boru_hacmi_L;
    const A_sistem_m2 = sistem_hacmi_L / 1000; // 1 m³ = 1000 L

    // EN 12828: Dolum hızı = 0.5 m/h × sistem alanı
    // Q = 0.5 [m/h] × A [m²] → [m³/h] → [L/h]
    const gereken_dolum_debisi_Lh = input.dolum_hizi_mh * A_sistem_m2 * 1000;
    const dolum_suresi_dakika = (sistem_hacmi_L / gereken_dolum_debisi_Lh) * 60;

    return {
      value: {
        gereken_dolum_debisi_Lh: Math.round(gereken_dolum_debisi_Lh * 10) / 10,
        dolum_suresi_dakika: Math.round(dolum_suresi_dakika * 10) / 10,
      },
      intermediates: {
        sistem_toplam_hacmi_L: sistem_hacmi_L,
      },
      standardsUsed: ["EN 12828"],
    };
  },
};
