import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Jeneratör odası havalandırması iki ayrı ihtiyacın toplamıdır:
// 1) Yanma havası — motorun stokiyometrik hava ihtiyacı, güce orantılı birim
//    katsayıyla (üretici verisi, tipik dizel jeneratörlerde ~6-9 m³/h/kW).
// 2) Soğutma havası — radyatörle dışarı atılmayan, odaya yayılan motor/
//    alternatör atık ısısını taşımak için enerji dengesi: Q = Pkayıp/(cp·ρ·ΔT)
//    (trafo odası havalandırma debisi modülüyle aynı fiziksel ilke, farklı ısı
//    kaynağı için).
const HAVA_OZGUL_ISI_KJ_KGK = 1.006;
const HAVA_YOGUNLUGU_KG_M3 = 1.2;

export const jeneratorOdasiHavalandirmaInputSchema = z.object({
  jeneratorGucu_P_kW: z.number().positive(),
  yanmaHavaKatsayisi_m3h_kW: z.number().positive(),
  odayaYayilanAtikIsi_Pkayip_kW: z.number().positive(),
  izinVerilenSicaklikArtisi_dT_C: z.number().positive(),
});

export type JeneratorOdasiHavalandirmaInput = z.infer<
  typeof jeneratorOdasiHavalandirmaInputSchema
>;

export interface JeneratorOdasiHavalandirmaOutput {
  toplamHavaDebisi_m3h: number;
}

function compute(
  input: JeneratorOdasiHavalandirmaInput,
): CalcResult<JeneratorOdasiHavalandirmaOutput> {
  const yanmaHavasiM3h = input.jeneratorGucu_P_kW * input.yanmaHavaKatsayisi_m3h_kW;
  const sogutmaHavasiM3h =
    (input.odayaYayilanAtikIsi_Pkayip_kW /
      (HAVA_OZGUL_ISI_KJ_KGK * HAVA_YOGUNLUGU_KG_M3 * input.izinVerilenSicaklikArtisi_dT_C)) *
    3600;
  const toplamHavaDebisiM3h = yanmaHavasiM3h + sogutmaHavasiM3h;

  return {
    value: { toplamHavaDebisi_m3h: toplamHavaDebisiM3h },
    intermediates: {
      yanmaHavasi_m3h: yanmaHavasiM3h,
      sogutmaHavasi_m3h: sogutmaHavasiM3h,
    },
    standardsUsed: [],
  };
}

export const jeneratorOdasiHavalandirma: CalcModule<
  JeneratorOdasiHavalandirmaInput,
  JeneratorOdasiHavalandirmaOutput
> = {
  id: "jenerator-odasi-havalandirma",
  title: "Jeneratör Odası Havalandırma",
  discipline: "mekanik",
  standards: [],
  inputSchema: jeneratorOdasiHavalandirmaInputSchema,
  compute,
};
