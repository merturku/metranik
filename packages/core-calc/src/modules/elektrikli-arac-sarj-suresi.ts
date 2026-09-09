import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji-güç ilişkisi: gerekli enerji, batarya kapasitesinin doldurulacak
// kısmıdır (kapasite × (1-mevcut şarj oranı)); şarj süresi bu enerjinin
// şarj gücüne ve şarj verimine bölünmesiyle bulunur. t = E/(P×η).
export const elektrikliAracSarjSuresiInputSchema = z.object({
  bataryaKapasitesi_kWh: z.number().positive(),
  mevcutSarjOrani: z.number().min(0).max(1),
  sarjGucu_P_kW: z.number().positive(),
  sarjVerimi_eta: z.number().positive().max(1),
});

export type ElektrikliAracSarjSuresiInput = z.infer<
  typeof elektrikliAracSarjSuresiInputSchema
>;

export interface ElektrikliAracSarjSuresiOutput {
  sarjSuresi_saat: number;
}

function compute(
  input: ElektrikliAracSarjSuresiInput,
): CalcResult<ElektrikliAracSarjSuresiOutput> {
  const gerekliEnerjiKWh =
    input.bataryaKapasitesi_kWh * (1 - input.mevcutSarjOrani);
  const sarjSuresiSaat = gerekliEnerjiKWh / (input.sarjGucu_P_kW * input.sarjVerimi_eta);

  return {
    value: { sarjSuresi_saat: sarjSuresiSaat },
    intermediates: {
      gerekliEnerji_kWh: gerekliEnerjiKWh,
    },
    standardsUsed: [],
  };
}

export const elektrikliAracSarjSuresi: CalcModule<
  ElektrikliAracSarjSuresiInput,
  ElektrikliAracSarjSuresiOutput
> = {
  id: "elektrikli-arac-sarj-suresi",
  title: "Elektrikli Araç Şarj Süresi",
  discipline: "ev",
  standards: [],
  inputSchema: elektrikliAracSarjSuresiInputSchema,
  compute,
};
