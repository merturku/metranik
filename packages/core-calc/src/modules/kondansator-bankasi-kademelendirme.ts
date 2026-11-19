import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Qc = P(tanφ1 − tanφ2); eşit kademe q = Qc/n → standart kademe değerine yukarı yuvarlanır; kurulu Qc'den gerçekleşen cosφ.
const STANDART_KADEME_KVAR = [2.5, 5, 6.25, 7.5, 10, 12.5, 15, 20, 25, 30, 40, 50, 60, 75, 100];

export const kondansatorBankasiKademelendirmeInputSchema = z
  .object({
    aktifGuc_kW: z.number().positive(),
    mevcutCosPhi: z.number().gt(0).lt(1),
    hedefCosPhi: z.number().gt(0).max(1),
    kademeSayisi: z.number().int().min(1).max(24),
  })
  .refine((v) => v.hedefCosPhi > v.mevcutCosPhi, { message: "Hedef cosφ mevcut cosφ'den büyük olmalı" });

export type KondansatorBankasiKademelendirmeInput = z.infer<typeof kondansatorBankasiKademelendirmeInputSchema>;
export interface KondansatorBankasiKademelendirmeOutput {
  gerekliQc_kvar: number;
}

function compute(input: KondansatorBankasiKademelendirmeInput): CalcResult<KondansatorBankasiKademelendirmeOutput> {
  const tan1 = Math.tan(Math.acos(input.mevcutCosPhi));
  const tan2 = Math.tan(Math.acos(input.hedefCosPhi));
  const Qc = input.aktifGuc_kW * (tan1 - tan2);
  const q = Qc / input.kademeSayisi;
  const qStd = STANDART_KADEME_KVAR.find((s) => s >= q) ?? null;
  if (qStd === null) {
    return {
      value: { gerekliQc_kvar: Qc },
      intermediates: { hesaplanan_kademe_kvar: q, uyari: "Kademe gücü en büyük standart değeri (100 kvar) aşıyor; kademe sayısını artırın" },
      standardsUsed: ["IEC 60831-1 / IEC 61921 (kondansatör)"],
      verdict: { status: "uygunsuz", note: "Standart kademe bulunamadı" },
    };
  }
  const Qkurulu = qStd * input.kademeSayisi;
  const tanGercek = tan1 - Qkurulu / input.aktifGuc_kW;
  const cosGercek = Math.cos(Math.atan(tanGercek));
  const asiri = tanGercek < 0;
  const status = asiri ? "uygunsuz" : cosGercek >= input.hedefCosPhi - 1e-9 ? "uygun" : "sinirda";
  return {
    value: { gerekliQc_kvar: Qc },
    intermediates: {
      hesaplanan_kademe_kvar: q,
      secilen_standart_kademe_kvar: qStd,
      kurulu_guc_kvar: Qkurulu,
      gerceklesen_cosPhi: cosGercek,
      asiri_kompanzasyon: asiri ? "evet (kapasitif)" : "hayır",
    },
    standardsUsed: ["IEC 60831-1 / IEC 61921 (kondansatör)"],
    verdict: {
      status,
      note: asiri
        ? "Kurulu güç yükün reaktif gücünü aştı: kapasitif çalışma riski"
        : `Kurulu ${Qkurulu} kvar ile gerçekleşen cosφ = ${cosGercek.toFixed(3)}`,
    },
  };
}

export const kondansatorBankasiKademelendirme: CalcModule<KondansatorBankasiKademelendirmeInput, KondansatorBankasiKademelendirmeOutput> = {
  id: "kondansator-bankasi-kademelendirme",
  title: "Kondansatör Bankası Gücü ve Kademelendirme",
  discipline: "elektrik",
  standards: ["IEC 60831-1 / IEC 61921 (kondansatör)"],
  inputSchema: kondansatorBankasiKademelendirmeInputSchema,
  compute,
};
