import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const kabloDuşüşSchema = z.object({
  akım_A: z.number().positive(),
  uzunluk_m: z.number().positive(),
  kesit_mm2: z.number().positive(),
});

export const kabloDuşüşKontrolu: CalcModule<any, any> = {
  id: "kablo-gerilim-drop-kontrolu",
  title: "Kablo Gerilim Düşümü (ρ=0.0175)",
  discipline: "elektrik",
  standards: ["IEC 60364"],
  inputSchema: kabloDuşüşSchema as any,
  compute(input: any) {
    const rho = 0.0175;
    const R = (rho * input.uzunluk_m) / input.kesit_mm2;
    const U_düşüş_V = input.akım_A * R;
    const U_düşüş_yuzde = (U_düşüş_V / 400) * 100;
    return {
      value: { U_düşüş_V: parseFloat(U_düşüş_V.toFixed(2)), U_düşüş_yuzde: parseFloat(U_düşüş_yuzde.toFixed(1)) },
      intermediates: { R },
      standardsUsed: ["IEC 60364"],
    };
  },
};
