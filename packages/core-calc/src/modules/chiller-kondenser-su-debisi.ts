import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Su soğutmalı chiller kondenser ısısı ve su debisi: W = Q_evap/COP,  Q_cond = Q_evap + W (kompresör ısısı atılır),
// ṁ = Q_cond/(cp·ΔT_cond),  V̇ = ṁ/ρ.  Açık/yarı hermetik kompresör motor kayıpları da kondenserden atıldığı için
// COP toplam elektrik girişine göre alınmalıdır. ΔT_cond tipik 5 K (ör. 30→35 °C kule suyu).
export const chillerKondenserSuDebisiInputSchema = z.object({
  sogutmaKapasitesi_kW: z.number().positive(),
  sogutmaCOP: z.number().gt(1).max(10),
  kondenserSuDeltaT_K: z.number().positive().max(15),
});

export type ChillerKondenserSuDebisiInput = z.infer<typeof chillerKondenserSuDebisiInputSchema>;

export interface ChillerKondenserSuDebisiOutput {
  kondenserSuDebisi_m3h: number;
}

function compute(input: ChillerKondenserSuDebisiInput): CalcResult<ChillerKondenserSuDebisiOutput> {
  const w = input.sogutmaKapasitesi_kW / input.sogutmaCOP;
  const qc = input.sogutmaKapasitesi_kW + w;
  const kgs = qc / (4.186 * input.kondenserSuDeltaT_K);
  return {
    value: { kondenserSuDebisi_m3h: kgs * 3.6 },
    intermediates: {
      kompresor_gucu_kW: w,
      kondenser_isisi_kW: qc,
      kondenser_isisi_TR: qc / 3.517,
      su_debisi_Ls: kgs,
      evaporator_debisi_5K_m3h: (input.sogutmaKapasitesi_kW / (4.186 * 5)) * 3.6,
    },
    standardsUsed: ["Enerji dengesi (Q_cond = Q_evap + W)"],
  };
}

export const chillerKondenserSuDebisi: CalcModule<ChillerKondenserSuDebisiInput, ChillerKondenserSuDebisiOutput> = {
  id: "chiller-kondenser-su-debisi",
  title: "Chiller Kondenser Isısı ve Su Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: chillerKondenserSuDebisiInputSchema,
  compute,
};
