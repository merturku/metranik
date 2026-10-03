import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const elektrikMotorKapasiteSchema = z.object({
  guc_istenen_kW: z.number().positive(),
  motor_nominal_kW: z.number().positive(),
  max_izin_verilen_yuzde: z.number().positive().optional(),
});

export const elektrikMotorKapasite: CalcModule<any, any> = {
  id: "elektrik-motor-kapasite-kullanımı",
  title: "Motor Kapasite Kullanımı Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 60034-1"],
  inputSchema: elektrikMotorKapasite as any,

  compute(input: any) {
    const kullanım = (input.guc_istenen_kW / input.motor_nominal_kW) * 100;
    const max_izin = input.max_izin_verilen_yuzde ?? 110;
    const status = kullanım <= max_izin ? "uygun" : "aşırı";
    return {
      value: { kullanım_yuzde: parseFloat(kullanım.toFixed(1)) },
      intermediates: { max_izin },
      standardsUsed: ["IEC 60034-1"],
      verdict: { status, note: `${kullanım.toFixed(0)}% / ${max_izin}%` },
    };
  },
};
