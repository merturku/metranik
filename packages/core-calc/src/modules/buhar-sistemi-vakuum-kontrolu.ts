import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const buharSistemiVakuumKontroluSchema = z.object({
  kondenser_basinc_kPa: z.number().positive(),
  adiabatik_sicaklık_C: z.number().positive(),
  max_izin_vakuum_kPa: z.number().default(95),
});

export type BuharSistemiVakuumKontroluInput = z.infer<typeof buharSistemiVakuumKontroluSchema>;

export interface BuharSistemiVakuumKontroluOutput {
  vakuum_kPa: number;
  doyma_sicakligi_C: number;
  verdict?: { status: "uygun" | "sinirda"; note: string };
}

export const buharSistemiVakuumKontrolu: CalcModule<BuharSistemiVakuumKontroluInput, BuharSistemiVakuumKontroluOutput> = {
  id: "buhar-sistemi-vakuum-kontrolu",
  title: "Buhar Sistemi Vakuum Kontrolü",
  discipline: "mekanik",
  standards: ["ASME PTC 12.2", "EN 12952"],
  inputSchema: buharSistemiVakuumKontroluSchema,

  compute(input: BuharSistemiVakuumKontroluInput): CalcResult<BuharSistemiVakuumKontroluOutput> {
    // Absolute pressure to vacuum: vacuum = 101.325 - kondenser_pressure
    const vakuum_kPa = 101.325 - input.kondenser_basinc_kPa;

    let status: "uygun" | "sinirda" = "uygun";
    let note = "";

    if (vakuum_kPa <= input.max_izin_vakuum_kPa) {
      note = `Vakuum kontrolü uygun (${vakuum_kPa.toFixed(1)} kPa ≤ ${input.max_izin_vakuum_kPa} kPa).`;
    } else {
      status = "sinirda";
      note = `Vakuum aşırı (${vakuum_kPa.toFixed(1)} kPa > ${input.max_izin_vakuum_kPa} kPa): kondenser temizliği/soğutma artırılmalı.`;
    }

    return {
      value: {
        vakuum_kPa: Math.round(vakuum_kPa * 10) / 10,
        doyma_sicakligi_C: input.adiabatik_sicaklık_C,
        verdict: { status, note },
      },
      intermediates: {
        mutlak_basinc_kPa: input.kondenser_basinc_kPa,
      },
      standardsUsed: ["ASME PTC 12.2"],
    };
  },
};
