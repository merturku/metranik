import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Tek kademeli buhar sıkıştırmalı soğutma çevrimi, entalpi yöntemi (P-h diyagramı):
// 1 evaporatör çıkışı / kompresör girişi, 2 kompresör çıkışı, 3 kondenser çıkışı, 4 = 3 (kısılma, h4 = h3).
// Gerçek kompresör çıkışı h2 = h1 + (h2s − h1)/ηis (izentropik verim tanımı).
// qL = h1 − h4, w = h2 − h1, qH = h2 − h3;  ṁ = QL/qL,  W = ṁ·w,  QH = ṁ·qH,
// COPsoğutma = qL/w,  COPısı pompası = qH/w = COPsoğutma + 1.
// Entalpiler soğutucu akışkanın tablo/diyagramından okunur; akışkan özelliği gömülü değildir.
export const buharSikistirmaliSogutmaCevrimiInputSchema = z
  .object({
    sogutmaKapasitesi_kW: z.number().positive(),
    h1_kompresorGirisi_kJkg: z.number(),
    h2s_izentropikCikis_kJkg: z.number(),
    h3_kondenserCikisi_kJkg: z.number(),
    izentropikVerim: z.number().positive().max(1),
  })
  .refine((v) => v.h1_kompresorGirisi_kJkg > v.h3_kondenserCikisi_kJkg, {
    message: "Evaporatör çıkış entalpisi h1, kondenser çıkış entalpisi h3'ten büyük olmalı",
  })
  .refine((v) => v.h2s_izentropikCikis_kJkg > v.h1_kompresorGirisi_kJkg, {
    message: "İzentropik kompresör çıkış entalpisi h2s, giriş entalpisi h1'den büyük olmalı",
  });

export type BuharSikistirmaliSogutmaCevrimiInput = z.infer<typeof buharSikistirmaliSogutmaCevrimiInputSchema>;

export interface BuharSikistirmaliSogutmaCevrimiOutput {
  copSogutma: number;
}

function compute(input: BuharSikistirmaliSogutmaCevrimiInput): CalcResult<BuharSikistirmaliSogutmaCevrimiOutput> {
  const h1 = input.h1_kompresorGirisi_kJkg;
  const h3 = input.h3_kondenserCikisi_kJkg;
  const h2 = h1 + (input.h2s_izentropikCikis_kJkg - h1) / input.izentropikVerim;

  const qL = h1 - h3;
  const w = h2 - h1;
  const qH = h2 - h3;
  const m = input.sogutmaKapasitesi_kW / qL;

  return {
    value: { copSogutma: qL / w },
    intermediates: {
      h2_gercek_kompresor_cikisi_kJkg: h2,
      sogutma_etkisi_qL_kJkg: qL,
      kompresor_isi_w_kJkg: w,
      kondenser_isi_qH_kJkg: qH,
      sogutucu_kutlesel_debi_kgs: m,
      sogutucu_kutlesel_debi_kgh: m * 3600,
      kompresor_gucu_kW: m * w,
      kondenser_isi_atimi_kW: m * qH,
      cop_isi_pompasi: qH / w,
    },
    standardsUsed: [],
  };
}

export const buharSikistirmaliSogutmaCevrimi: CalcModule<
  BuharSikistirmaliSogutmaCevrimiInput,
  BuharSikistirmaliSogutmaCevrimiOutput
> = {
  id: "buhar-sikistirmali-sogutma-cevrimi",
  title: "Buhar Sıkıştırmalı Soğutma Çevrimi (Entalpi Yöntemi)",
  discipline: "mekanik",
  standards: [],
  inputSchema: buharSikistirmaliSogutmaCevrimiInputSchema,
  compute,
};
