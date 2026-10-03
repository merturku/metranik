import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const zeminAltlıkGerilmeSchema = z.object({
  yuk_kN: z.number().positive(),
  temel_alani_m2: z.number().positive(),
  moment_kNm: z.number().optional(),
  temel_eni_m: z.number().positive().optional(),
  max_izin_gerilme_kPa: z.number().positive().optional(),
});

export const zeminAltlıkGerilmeKontrolu: CalcModule<any, any> = {
  id: "zemin-altlık-gerilme-kontrolu",
  title: "Zemin Altlık Gerilme Kontrolü",
  discipline: "insaat",
  standards: ["TS EN 1997-1"],
  inputSchema: zeminAltlıkGerilmeKontrolu as any as any,

  compute(input: any) {
    const eksenel = input.yuk_kN / input.temel_alani_m2;
    const moment = input.moment_kNm ?? 0;
    const B = input.temel_eni_m ?? Math.sqrt(input.temel_alani_m2);
    const W = (input.temel_alani_m2 * B) / 6;
    const egilme = moment > 0 ? moment / W : 0;
    const max_gerilme = eksenel + egilme;
    const min_gerilme = Math.max(0, eksenel - egilme);
    const max_izin = input.max_izin_gerilme_kPa ?? 300;
    const status = max_gerilme <= max_izin ? "uygun" : "aşırı";
    return {
      value: { max_gerilme_kPa: parseFloat(max_gerilme.toFixed(1)), min_gerilme_kPa: parseFloat(min_gerilme.toFixed(1)) },
      intermediates: { eksenel, egilme, W },
      standardsUsed: ["TS EN 1997-1"],
      verdict: { status, note: `${max_gerilme.toFixed(0)} / ${max_izin} kPa` },
    };
  },
};
