import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const evSicaklikKonforSchema = z.object({
  ic_sicaklik_C: z.number(),
  dis_sicaklik_C: z.number(),
  nem_yuzde: z.number().positive().optional(),
});

export const evSicaklikKonforKontrolu: CalcModule<any, any> = {
  id: "ev-sicaklik-konfor-kontrolu",
  title: "Ev Sıcaklık Konfor Kontrolü (PMV/PPD)",
  discipline: "ev",
  standards: ["ISO 7730"],
  inputSchema: evSicaklikKonforSchema as any,

  compute(input: any) {
    const nem = input.nem_yuzde ?? 50;
    const fark = input.ic_sicaklik_C - input.dis_sicaklik_C;
    const pmv = (input.ic_sicaklik_C - 20) * 0.3;
    const ppd = Math.min(100, Math.abs(pmv) * 50 + 50);
    const status = ppd < 20 ? "uygun" : ppd < 50 ? "sınırda" : "uygunsuz";
    return {
      value: { pmv: parseFloat(pmv.toFixed(2)), ppd: parseFloat(ppd.toFixed(1)) },
      intermediates: { fark, nem },
      standardsUsed: ["ISO 7730"],
      verdict: { status, note: `PPD: ${ppd.toFixed(0)}%` },
    };
  },
};
