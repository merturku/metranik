import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Performans katsayısı tanımı: COP = Isıtma Yükü / Kompresör Gücü
// → gerekli kompresör gücü = Isıtma Yükü / COP.
export const isiPompasiKompresorGucuInputSchema = z.object({
  isitmaYuku_kW: z.number().positive(),
  performansKatsayisi_COP: z.number().positive(),
});

export type IsiPompasiKompresorGucuInput = z.infer<
  typeof isiPompasiKompresorGucuInputSchema
>;

export interface IsiPompasiKompresorGucuOutput {
  gerekliKompresorGucu_kW: number;
}

function compute(
  input: IsiPompasiKompresorGucuInput,
): CalcResult<IsiPompasiKompresorGucuOutput> {
  const gerekliKompresorGucuKW = input.isitmaYuku_kW / input.performansKatsayisi_COP;

  return {
    value: { gerekliKompresorGucu_kW: gerekliKompresorGucuKW },
    intermediates: {
      performansKatsayisi_COP: input.performansKatsayisi_COP,
    },
    standardsUsed: [],
  };
}

export const isiPompasiKompresorGucu: CalcModule<
  IsiPompasiKompresorGucuInput,
  IsiPompasiKompresorGucuOutput
> = {
  id: "isi-pompasi-kompresor-gucu",
  title: "Isı Pompası Kompresör Gücü",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiPompasiKompresorGucuInputSchema,
  compute,
};
