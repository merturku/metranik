import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isı geri kazanım ünitesinin yıllık tasarrufu: E = ρ·cp/3600·V̇·ε·DG·h/1000 [kWh],
// h = günlük çalışma saati (DG 24 saatlik derece-gün olduğundan h/24 ile ölçeklenir).
// Geri kazanım verimi ε Isı Geri Kazanım Verimi modülünden gelir; nem/gizli ısı ve donma koruması yok.
export const isiGeriKazanimYillikTasarrufInputSchema = z.object({
  debi_m3h: z.number().positive(),
  verim: z.number().gt(0).max(1),
  dereceGun_Kgun: z.number().positive(),
  gunlukCalismaSaati: z.number().gt(0).max(24),
});

export type IsiGeriKazanimYillikTasarrufInput = z.infer<typeof isiGeriKazanimYillikTasarrufInputSchema>;

export interface IsiGeriKazanimYillikTasarrufOutput {
  yillikTasarruf_kWh: number;
}

function compute(input: IsiGeriKazanimYillikTasarrufInput): CalcResult<IsiGeriKazanimYillikTasarrufOutput> {
  const kgKatsayisi = 1.2 * (1005 / 3600) * input.debi_m3h; // W/K
  const e = (kgKatsayisi * input.verim * input.dereceGun_Kgun * input.gunlukCalismaSaati) / 1000;
  return {
    value: { yillikTasarruf_kWh: e },
    intermediates: {
      hava_isil_kapasite_WK: kgKatsayisi,
      geri_kazanilan_guc_tasarim_DT10_kW: (kgKatsayisi * input.verim * 10) / 1000,
      yillik_tasarruf_MWh: e / 1000,
      yillik_tasarruf_GJ: e * 0.0036,
    },
    standardsUsed: ["Derece-gün yöntemi (ε-NTU verimi girdi)"],
  };
}

export const isiGeriKazanimYillikTasarruf: CalcModule<IsiGeriKazanimYillikTasarrufInput, IsiGeriKazanimYillikTasarrufOutput> = {
  id: "isi-geri-kazanim-yillik-tasarruf",
  title: "Isı Geri Kazanım Yıllık Enerji Tasarrufu",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiGeriKazanimYillikTasarrufInputSchema,
  compute,
};
