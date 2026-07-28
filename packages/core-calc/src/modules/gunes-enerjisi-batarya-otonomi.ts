import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Off-grid güneş enerjisi sisteminde, güneşsiz günlerde tüketimi
// karşılayacak batarya kapasitesi. UPS'teki yedekleme süresinden farklı
// olarak burada gün bazlı otonomi ve izin verilen deşarj derinliği (DoD)
// esas alınır: E_gerekli(Wh) = GünlükTüketim(Wh) × OtonomiGünü / DoD,
// C(Ah) = E_gerekli / V.
export const gunesEnerjisiBataryaOtonomiInputSchema = z.object({
  gunlukTuketim_kWh: z.number().positive(),
  otonomiGunSayisi: z.number().positive(),
  izinVerilenDesarjDerinligi_DoD: z.number().positive().max(1),
  sistemGerilimi_V: z.number().positive(),
});

export type GunesEnerjisiBataryaOtonomiInput = z.infer<
  typeof gunesEnerjisiBataryaOtonomiInputSchema
>;

export interface GunesEnerjisiBataryaOtonomiOutput {
  gerekliKapasite_Ah: number;
}

function compute(
  input: GunesEnerjisiBataryaOtonomiInput,
): CalcResult<GunesEnerjisiBataryaOtonomiOutput> {
  const gerekliEnerjiWh =
    (input.gunlukTuketim_kWh * 1000 * input.otonomiGunSayisi) /
    input.izinVerilenDesarjDerinligi_DoD;
  const gerekliKapasiteAh = gerekliEnerjiWh / input.sistemGerilimi_V;

  return {
    value: { gerekliKapasite_Ah: gerekliKapasiteAh },
    intermediates: {
      gerekliEnerji_Wh: gerekliEnerjiWh,
    },
    standardsUsed: [],
  };
}

export const gunesEnerjisiBataryaOtonomi: CalcModule<
  GunesEnerjisiBataryaOtonomiInput,
  GunesEnerjisiBataryaOtonomiOutput
> = {
  id: "gunes-enerjisi-batarya-otonomi",
  title: "Güneş Enerjisi Bataryası Otonomi Kapasitesi",
  discipline: "ev",
  standards: [],
  inputSchema: gunesEnerjisiBataryaOtonomiInputSchema,
  compute,
};
