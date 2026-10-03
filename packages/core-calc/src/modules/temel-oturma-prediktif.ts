import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const temelOturmaPrediktifSchema = z.object({
  agirlik_kN: z.number().positive(),
  temel_alani_m2: z.number().positive(),
  taşıma_gucu_kPa: z.number().positive(),
  konsolidasyon_suresi_yıl: z.number().positive().optional(),
});

export const temelOturmaPrediktif: CalcModule<any, any> = {
  id: "temel-oturma-prediktif",
  title: "Temel Oturma Tahmini (Terzaghi)",
  discipline: "insaat",
  standards: ["TS EN 1997-1"],
  inputSchema: temelOturmaPrediktifSchema as any,

  compute(input: any) {
    const gerilme_kPa = input.agirlik_kN / input.temel_alani_m2;
    const t_yil = input.konsolidasyon_suresi_yıl ?? 2;
    const oturma_mm = (gerilme_kPa / input.taşıma_gucu_kPa) * 100 * Math.sqrt(t_yil);
    return {
      value: { oturma_mm: parseFloat(oturma_mm.toFixed(1)) },
      intermediates: { gerilme_kPa, t_yil },
      standardsUsed: ["TS EN 1997-1"],
    };
  },
};
