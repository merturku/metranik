import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Joukowsky denklemi: ani vana kapanmasında oluşan basınç artışı
// ΔP = ρ × c × Δv (c: basınç dalgasının boru içindeki yayılma hızı).
export const suDarbesiBasinciInputSchema = z.object({
  suYogunlugu_rho_kgm3: z.number().positive(),
  basincDalgasiHizi_c_ms: z.number().positive(),
  hizDegisimi_dv_ms: z.number().positive(),
});

export type SuDarbesiBasinciInput = z.infer<typeof suDarbesiBasinciInputSchema>;

export interface SuDarbesiBasinciOutput {
  basincArtisi_bar: number;
}

function compute(input: SuDarbesiBasinciInput): CalcResult<SuDarbesiBasinciOutput> {
  const basincArtisiPa =
    input.suYogunlugu_rho_kgm3 * input.basincDalgasiHizi_c_ms * input.hizDegisimi_dv_ms;

  return {
    value: { basincArtisi_bar: basincArtisiPa / 1e5 },
    intermediates: {
      basincArtisi_Pa: basincArtisiPa,
    },
    standardsUsed: ["Joukowsky Denklemi"],
  };
}

export const suDarbesiBasinci: CalcModule<SuDarbesiBasinciInput, SuDarbesiBasinciOutput> = {
  id: "su-darbesi-basinci",
  title: "Su Darbesi Basıncı (Joukowsky)",
  discipline: "mekanik",
  standards: ["Joukowsky Denklemi"],
  inputSchema: suDarbesiBasinciInputSchema,
  compute,
};
