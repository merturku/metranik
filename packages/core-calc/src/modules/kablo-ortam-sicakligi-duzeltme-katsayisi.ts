import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60364-5-52: k = √((θmaks − θa)/(θmaks − θref)); θmaks PVC 70, XLPE/EPR 90; θref hava 30, toprak 20. θa ≥ θmaks → k = 0.
const TETA_MAX = { pvc: 70, xlpe: 90 } as const;
const TETA_REF = { hava: 30, toprak: 20 } as const;

export const kabloOrtamSicakligiDuzeltmeKatsayisiInputSchema = z.object({
  yalitim: z.enum(["pvc", "xlpe"]),
  ortam: z.enum(["hava", "toprak"]),
  sicaklik_C: z.number(),
});

export type KabloOrtamSicakligiDuzeltmeKatsayisiInput = z.infer<typeof kabloOrtamSicakligiDuzeltmeKatsayisiInputSchema>;

export interface KabloOrtamSicakligiDuzeltmeKatsayisiOutput {
  k: number;
}

function compute(
  input: KabloOrtamSicakligiDuzeltmeKatsayisiInput,
): CalcResult<KabloOrtamSicakligiDuzeltmeKatsayisiOutput> {
  const tmax = TETA_MAX[input.yalitim];
  const tref = TETA_REF[input.ortam];
  const k = input.sicaklik_C >= tmax ? 0 : Math.sqrt((tmax - input.sicaklik_C) / (tmax - tref));
  return {
    value: { k },
    intermediates: {
      theta_max_C: tmax,
      theta_ref_C: tref,
      not_: input.sicaklik_C >= tmax ? "Ortam sıcaklığı iletken sınırında veya üstünde: kablo yüklenemez" : "—",
    },
    standardsUsed: ["IEC 60364-5-52 Tablo B.52.14"],
  };
}

export const kabloOrtamSicakligiDuzeltmeKatsayisi: CalcModule<
  KabloOrtamSicakligiDuzeltmeKatsayisiInput,
  KabloOrtamSicakligiDuzeltmeKatsayisiOutput
> = {
  id: "kablo-ortam-sicakligi-duzeltme-katsayisi",
  title: "Kablo Ortam Sıcaklığı Düzeltme Katsayısı",
  discipline: "elektrik",
  standards: ["IEC 60364-5-52"],
  inputSchema: kabloOrtamSicakligiDuzeltmeKatsayisiInputSchema,
  compute,
};
