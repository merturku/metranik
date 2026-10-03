import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const kompresörHavaDebisiSchema = z.object({
  debi_m3min: z.number().positive(),
  esanzamanlılık_faktoru: z.number().positive().optional(),
});

export const kompresörHavaDebisiSecimi: CalcModule<any, any> = {
  id: "kompressor-hava-debisi-secimi",
  title: "Kompresör Hava Debisi Seçimi",
  discipline: "mekanik",
  standards: ["ISO 1217"],
  inputSchema: kompresörHavaDebisiSchema as any,

  compute(input: any) {
    const sf = input.esanzamanlılık_faktoru ?? 0.7;
    const fad_m3min = input.debi_m3min / sf;
    return {
      value: { fad_m3min: parseFloat(fad_m3min.toFixed(2)) },
      intermediates: { sf },
      standardsUsed: ["ISO 1217"],
    };
  },
};
