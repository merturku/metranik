import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: Qh = Qevap + W, COP = Qh/W → Qevap = Qh(1 − 1/COP); ṁ = Qevap/(cp·ΔT), cp = 4,186 kJ/kgK, ρ = 1000 kg/m³.
const CP = 4.186;
const RHO = 1000;

export const isiPompasiKaynakSuyuDebisiInputSchema = z.object({
  isitmaKapasitesi_kW: z.number().positive(),
  cop: z.number().gt(1),
  deltaT_K: z.number().positive(),
});

export type IsiPompasiKaynakSuyuDebisiInput = z.infer<typeof isiPompasiKaynakSuyuDebisiInputSchema>;

export interface IsiPompasiKaynakSuyuDebisiOutput {
  kaynakDebisi_m3h: number;
}

function compute(input: IsiPompasiKaynakSuyuDebisiInput): CalcResult<IsiPompasiKaynakSuyuDebisiOutput> {
  const Qh = input.isitmaKapasitesi_kW;
  const Qevap = Qh * (1 - 1 / input.cop);
  const m = Qevap / (CP * input.deltaT_K);
  return {
    value: { kaynakDebisi_m3h: (m * 3600) / RHO },
    intermediates: { evaporator_isisi_kW: Qevap, kompresor_gucu_kW: Qh / input.cop, kaynak_debisi_kgs: m },
    standardsUsed: ["Enerji dengesi (COP)"],
  };
}

export const isiPompasiKaynakSuyuDebisi: CalcModule<IsiPompasiKaynakSuyuDebisiInput, IsiPompasiKaynakSuyuDebisiOutput> = {
  id: "isi-pompasi-kaynak-suyu-debisi",
  title: "Su Kaynaklı Isı Pompası Kaynak Suyu Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiPompasiKaynakSuyuDebisiInputSchema,
  compute,
};
