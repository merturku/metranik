import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Gerekli kurulu güç: Pkwp = GünlükTüketim / (GüneşlenmeSaati × SistemVerimi).
// Sistem verimi; invertör, kablo ve kirlilik kayıplarını tek katsayıda toplar.
export const gunesPaneliKapasiteHesabiInputSchema = z.object({
  gunlukTuketim_kWh: z.number().positive(),
  guneslenmeSaati_h: z.number().positive(),
  sistemVerimi: z.number().positive().max(1),
});

export type GunesPaneliKapasiteHesabiInput = z.infer<
  typeof gunesPaneliKapasiteHesabiInputSchema
>;

export interface GunesPaneliKapasiteHesabiOutput {
  gerekliGuc_kWp: number;
}

function compute(
  input: GunesPaneliKapasiteHesabiInput,
): CalcResult<GunesPaneliKapasiteHesabiOutput> {
  const gerekliGucKWp =
    input.gunlukTuketim_kWh / (input.guneslenmeSaati_h * input.sistemVerimi);

  return {
    value: { gerekliGuc_kWp: gerekliGucKWp },
    intermediates: {
      guneslenmeSaati_h: input.guneslenmeSaati_h,
      sistemVerimi: input.sistemVerimi,
    },
    standardsUsed: [],
  };
}

export const gunesPaneliKapasiteHesabi: CalcModule<
  GunesPaneliKapasiteHesabiInput,
  GunesPaneliKapasiteHesabiOutput
> = {
  id: "gunes-paneli-kapasite-hesabi",
  title: "Güneş Paneli (GES) Kapasite Hesabı",
  discipline: "ev",
  standards: [],
  inputSchema: gunesPaneliKapasiteHesabiInputSchema,
  compute,
};
