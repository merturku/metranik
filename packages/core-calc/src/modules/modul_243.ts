import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_243Schema = z.object({
  zarar_ınak_W: z.number().positive(),
  zarar_yuk_W: z.number().positive(),
  guc_kVA: z.number().positive(),
});

export type Modul_243Input = z.infer<typeof modul_243Schema>;

export interface Modul_243Output {
  toplam_zarar_W: number;
  verim_yuzde: number;
}

export const modul_243: CalcModule<Modul_243Input, Modul_243Output> = {
  id: "modul_243",
  title: "Transformatör Toplam Kaybı ve Verim",
  discipline: "elektrik",
  standards: ["IEC 60076"],
  inputSchema: modul_243Schema,

  compute(input: Modul_243Input): CalcResult<Modul_243Output> {
    const zarar_toplam = input.zarar_ınak_W + input.zarar_yuk_W;
    const P_çıkış = input.guc_kVA * 1000 - zarar_toplam;
    const verim = (P_çıkış / (input.guc_kVA * 1000)) * 100;

    return {
      value: {
        toplam_zarar_W: zarar_toplam,
        verim_yuzde: Math.round(verim * 100) / 100,
      },
      intermediates: {},
      standardsUsed: ["IEC 60076"],
    };
  },
};
