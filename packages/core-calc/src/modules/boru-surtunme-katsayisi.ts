import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Swamee-Jain denklemi: Colebrook-White denkleminin açık (iteratifsiz) yaklaşımı.
// f = 0.25 / [log10(ε/(3.7D) + 5.74/Re^0.9)]². Boru Basınç Kaybı modülünün
// doğrudan girdi olarak aldığı sürtünme katsayısını (f) türbülanslı akış için
// (Re>4000) hesaplar; Boru Akış Rejimi modülünden gelen Re kullanılabilir.
export const boruSurtunmeKatsayisiInputSchema = z.object({
  reynoldsSayisi_Re: z.number().positive(),
  boruIcCapi_D_m: z.number().positive(),
  mutlakPuruzluluk_epsilon_m: z.number().positive(),
});

export type BoruSurtunmeKatsayisiInput = z.infer<typeof boruSurtunmeKatsayisiInputSchema>;

export interface BoruSurtunmeKatsayisiOutput {
  surtunmeKatsayisi_f: number;
}

function compute(input: BoruSurtunmeKatsayisiInput): CalcResult<BoruSurtunmeKatsayisiOutput> {
  const goreliPuruzlulukTerimi =
    input.mutlakPuruzluluk_epsilon_m / (3.7 * input.boruIcCapi_D_m);
  const reynoldsTerimi = 5.74 / Math.pow(input.reynoldsSayisi_Re, 0.9);
  const toplamTerim = goreliPuruzlulukTerimi + reynoldsTerimi;
  const surtunmeKatsayisiF = 0.25 / Math.pow(Math.log10(toplamTerim), 2);

  return {
    value: { surtunmeKatsayisi_f: surtunmeKatsayisiF },
    intermediates: {
      goreliPuruzluluk: input.mutlakPuruzluluk_epsilon_m / input.boruIcCapi_D_m,
      toplamTerim,
    },
    standardsUsed: ["Swamee-Jain"],
  };
}

export const boruSurtunmeKatsayisi: CalcModule<
  BoruSurtunmeKatsayisiInput,
  BoruSurtunmeKatsayisiOutput
> = {
  id: "boru-surtunme-katsayisi",
  title: "Boru Sürtünme Katsayısı (Darcy f, Swamee-Jain)",
  discipline: "mekanik",
  standards: ["Swamee-Jain"],
  inputSchema: boruSurtunmeKatsayisiInputSchema,
  compute,
};
