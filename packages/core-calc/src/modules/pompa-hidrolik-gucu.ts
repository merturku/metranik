import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pompa mil gücü: P = ρ×g×Q×H / η.
// ρ: akışkan yoğunluğu (kg/m³), g: yerçekimi ivmesi (9.81 m/s²), Q: debi (m³/s),
// H: toplam basma yüksekliği (m), η: pompa verimi (0-1).
const YERCEKIMI_g = 9.81;

export const pompaHidrolikGucuInputSchema = z.object({
  yogunluk_rho_kgm3: z.number().positive(),
  debi_Q_m3h: z.number().positive(),
  basmaYuksekligi_H_m: z.number().positive(),
  pompaVerimi_eta: z.number().positive().max(1),
});

export type PompaHidrolikGucuInput = z.infer<typeof pompaHidrolikGucuInputSchema>;

export interface PompaHidrolikGucuOutput {
  milGucu_kW: number;
}

function compute(input: PompaHidrolikGucuInput): CalcResult<PompaHidrolikGucuOutput> {
  const debi_m3s = input.debi_Q_m3h / 3600;
  const hidrolikGuc_W =
    input.yogunluk_rho_kgm3 * YERCEKIMI_g * debi_m3s * input.basmaYuksekligi_H_m;
  const milGucu_kW = hidrolikGuc_W / input.pompaVerimi_eta / 1000;

  return {
    value: { milGucu_kW },
    intermediates: {
      debi_m3s: Number(debi_m3s.toFixed(5)),
      hidrolikGuc_kW: Number((hidrolikGuc_W / 1000).toFixed(3)),
      pompaVerimi_eta: input.pompaVerimi_eta,
    },
    standardsUsed: [],
  };
}

export const pompaHidrolikGucu: CalcModule<PompaHidrolikGucuInput, PompaHidrolikGucuOutput> = {
  id: "pompa-hidrolik-gucu",
  title: "Pompa Hidrolik Gücü",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompaHidrolikGucuInputSchema,
  compute,
};
