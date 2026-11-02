import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Beton elastisite modülü:
//  - TS EN 1992-1-1 Tablo 3.1: Ecm = 22·(fcm/10)^0,3 GPa, fcm = fck + 8 MPa (kuvarsit agrega)
//  - TS 500 (2000) §3.1.5 yaklaşımı: Ec = 3250·√fck + 14000 MPa
// Modüler oran n = Es/Ec (Es = 200 GPa); çatlamış kesit ve sehim hesaplarının girdisidir.
export const betonElastisiteModuluInputSchema = z.object({
  fck_MPa: z.number().min(12).max(90),
});

export type BetonElastisiteModuluInput = z.infer<typeof betonElastisiteModuluInputSchema>;

export interface BetonElastisiteModuluOutput {
  Ecm_MPa: number;
}

function compute(input: BetonElastisiteModuluInput): CalcResult<BetonElastisiteModuluOutput> {
  const fcm = input.fck_MPa + 8;
  const ecm = 22000 * Math.pow(fcm / 10, 0.3);
  const ecTs500 = 3250 * Math.sqrt(input.fck_MPa) + 14000;
  return {
    value: { Ecm_MPa: ecm },
    intermediates: {
      fcm_MPa: fcm,
      Ec_TS500_MPa: ecTs500,
      fark_yuzde: ((ecTs500 - ecm) / ecm) * 100,
      moduler_oran_EN: 200000 / ecm,
      moduler_oran_TS500: 200000 / ecTs500,
    },
    standardsUsed: ["TS EN 1992-1-1 Tablo 3.1", "TS 500 §3.1.5"],
  };
}

export const betonElastisiteModulu: CalcModule<BetonElastisiteModuluInput, BetonElastisiteModuluOutput> = {
  id: "beton-elastisite-modulu",
  title: "Beton Elastisite Modülü ve Modüler Oran",
  discipline: "insaat",
  standards: ["TS EN 1992-1-1", "TS 500"],
  inputSchema: betonElastisiteModuluInputSchema,
  compute,
};
