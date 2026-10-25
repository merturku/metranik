import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Soğuk odaya giren ürünün soğutma (ve gerekiyorsa dondurma) yükü,
// ASHRAE Refrigeration Handbook ürün yükü yöntemi:
//   Q1 = m·c1·(T1 − Tf)  donma noktasına kadar duyulur ısı (T2 ≥ Tf ise T1 − T2)
//   Q2 = m·hif           donma gizli ısısı (yalnız T2 < Tf)
//   Q3 = m·c2·(Tf − T2)  donma noktasının altında duyulur ısı
//   Q̇ = (Q1 + Q2 + Q3) / t
// c1, c2, hif ve Tf ürüne özgüdür (ASHRAE ürün özellikleri tablolarından alınır).
// Meyve-sebzede solunum ısısı, iletim, sızma, aydınlatma, personel ve defrost yükleri ayrıca eklenir.
export const sogukOdaUrunYukuInputSchema = z
  .object({
    urunKutlesi_kg: z.number().positive(),
    girisSicakligi_C: z.number(),
    depolamaSicakligi_C: z.number(),
    donmaNoktasi_C: z.number(),
    donmaUstuOzgulIsi_kJkgK: z.number().positive(),
    donmaAltiOzgulIsi_kJkgK: z.number().positive(),
    donmaGizliIsisi_kJkg: z.number().min(0),
    sogutmaSuresi_h: z.number().positive(),
  })
  .refine((v) => v.girisSicakligi_C > v.depolamaSicakligi_C, {
    message: "Giriş sıcaklığı depolama sıcaklığından yüksek olmalı",
  })
  .refine((v) => v.girisSicakligi_C >= v.donmaNoktasi_C, {
    message: "Ürün donma noktasının üstünde girmeli",
  });

export type SogukOdaUrunYukuInput = z.infer<typeof sogukOdaUrunYukuInputSchema>;

export interface SogukOdaUrunYukuOutput {
  urunSogutmaYuku_kW: number;
}

function compute(input: SogukOdaUrunYukuInput): CalcResult<SogukOdaUrunYukuOutput> {
  const m = input.urunKutlesi_kg;
  const T1 = input.girisSicakligi_C;
  const T2 = input.depolamaSicakligi_C;
  const Tf = input.donmaNoktasi_C;
  const dondurma = T2 < Tf;

  const q1 = m * input.donmaUstuOzgulIsi_kJkgK * (T1 - (dondurma ? Tf : T2));
  const q2 = dondurma ? m * input.donmaGizliIsisi_kJkg : 0;
  const q3 = dondurma ? m * input.donmaAltiOzgulIsi_kJkgK * (Tf - T2) : 0;
  const toplam = q1 + q2 + q3;
  const kW = toplam / (input.sogutmaSuresi_h * 3600);

  return {
    value: { urunSogutmaYuku_kW: kW },
    intermediates: {
      islem: dondurma ? "Soğutma + dondurma" : "Yalnız soğutma (donma yok)",
      donma_ustu_duyulur_isi_kJ: q1,
      donma_gizli_isisi_kJ: q2,
      donma_alti_duyulur_isi_kJ: q3,
      toplam_isi_kJ: toplam,
      toplam_isi_kWh: toplam / 3600,
    },
    standardsUsed: ["ASHRAE Refrigeration Handbook"],
  };
}

export const sogukOdaUrunYuku: CalcModule<SogukOdaUrunYukuInput, SogukOdaUrunYukuOutput> = {
  id: "soguk-oda-urun-yuku",
  title: "Soğuk Oda Ürün Soğutma Yükü",
  discipline: "mekanik",
  standards: ["ASHRAE Refrigeration Handbook"],
  inputSchema: sogukOdaUrunYukuInputSchema,
  compute,
};
