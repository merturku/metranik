import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Güneş panelinin öğle vakti ışınlara dik olması için eğim açısı: β = |φ − δ|, φ enlem (kuzey +, güney −),
// δ güneş deklinasyonu (Cooper): δ = 23,45°·sin[360°·(284 + N)/365], N yılın günü (1–365).
// Panel kuzey yarımkürede güneye, güney yarımkürede kuzeye bakmalıdır (azimut 0°). Sabit yıllık eğim için pratik değer
// enlem civarıdır (denge gününde β = φ); kışa ağırlık verilecekse β ≈ φ + 10…15°. Gölgelenme/bulut/albedo dikkate alınmaz.
export const gesMevsimselEgimAcisiInputSchema = z.object({
  enlem_derece: z.number().min(-66).max(66),
  yilinGunu: z.number().int().min(1).max(365),
});

export type GesMevsimselEgimAcisiInput = z.infer<typeof gesMevsimselEgimAcisiInputSchema>;

export interface GesMevsimselEgimAcisiOutput {
  egimAcisi_derece: number;
}

function compute(input: GesMevsimselEgimAcisiInput): CalcResult<GesMevsimselEgimAcisiOutput> {
  const dekl = 23.45 * Math.sin(((2 * Math.PI) / 365) * (284 + input.yilinGunu));
  const beta = Math.abs(input.enlem_derece - dekl);
  const kisDekl = -23.45;
  const yazDekl = 23.45;
  return {
    value: { egimAcisi_derece: beta },
    intermediates: {
      deklinasyon_derece: dekl,
      panel_yonu: input.enlem_derece >= 0 ? "Güney (azimut 0°)" : "Kuzey (azimut 0°)",
      kis_gundonumu_egimi_derece: Math.abs(input.enlem_derece - (input.enlem_derece >= 0 ? kisDekl : yazDekl)),
      yaz_gundonumu_egimi_derece: Math.abs(input.enlem_derece - (input.enlem_derece >= 0 ? yazDekl : kisDekl)),
      denge_gunu_egimi_derece: Math.abs(input.enlem_derece),
    },
    standardsUsed: ["Cooper (1969) deklinasyon bağıntısı; güneş geometrisi"],
  };
}

export const gesMevsimselEgimAcisi: CalcModule<GesMevsimselEgimAcisiInput, GesMevsimselEgimAcisiOutput> = {
  id: "ges-mevsimsel-egim-acisi",
  title: "GES Panel Eğim Açısı (Gün/Mevsime Göre)",
  discipline: "ev",
  standards: [],
  inputSchema: gesMevsimselEgimAcisiInputSchema,
  compute,
};
