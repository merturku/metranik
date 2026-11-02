import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Drenaj / pis su pompa kuyusu (sump) faydalı hacmi: tek pompada çevrim süresi T = dolma + boşalma
// en kısa T = 4·V/Q olduğunda (Q_gelen = Q_pompa/2) → V = Q_pompa·T_min/4.
// T_min = 60/N_azami (N: saatte azami kalkış sayısı, motor üretici sınırı; küçük motorlarda 10–15).
export const pisSuPompaKuyusuHacmiInputSchema = z.object({
  pompaDebisi_Lmin: z.number().positive(),
  azamiKalkisSayisi_saat: z.number().positive().max(60),
  kuyuKesitAlani_m2: z.number().positive(),
});

export type PisSuPompaKuyusuHacmiInput = z.infer<typeof pisSuPompaKuyusuHacmiInputSchema>;

export interface PisSuPompaKuyusuHacmiOutput {
  faydaliHacim_L: number;
}

function compute(input: PisSuPompaKuyusuHacmiInput): CalcResult<PisSuPompaKuyusuHacmiOutput> {
  const tMin = 60 / input.azamiKalkisSayisi_saat;
  const v = (input.pompaDebisi_Lmin * tMin) / 4;
  return {
    value: { faydaliHacim_L: v },
    intermediates: {
      en_kisa_cevrim_dk: tMin,
      faydali_hacim_m3: v / 1000,
      start_stop_seviye_farki_m: v / 1000 / input.kuyuKesitAlani_m2,
    },
    standardsUsed: ["ANSI/HI 9.8 (çevrim süresi yöntemi)"],
  };
}

export const pisSuPompaKuyusuHacmi: CalcModule<PisSuPompaKuyusuHacmiInput, PisSuPompaKuyusuHacmiOutput> = {
  id: "pis-su-pompa-kuyusu-hacmi",
  title: "Drenaj / Pis Su Pompa Kuyusu Faydalı Hacmi",
  discipline: "mekanik",
  standards: ["ANSI/HI 9.8"],
  inputSchema: pisSuPompaKuyusuHacmiInputSchema,
  compute,
};
