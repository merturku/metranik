import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Güç faktörü iyileştirmesiyle hat akımı ve Joule kaybı azalması: aynı aktif güçte I ∝ 1/cosφ, kayıp P_kayıp ∝ I² ∝ 1/cos²φ.
// I2/I1 = cosφ1/cosφ2;  kayıp oranı = (cosφ1/cosφ2)²;  azalma % = 1 − (cosφ1/cosφ2)².  Hat kaybı mevcut kayıp (W) girilirse mutlak azalma verilir.
// Gerekli kompanzasyon gücü Kompanzasyon modülüyle bulunur; bu modül yalnız hat/trafo bakır kaybı kazancını gösterir (aşırı kompanzasyon cosφ > 1 sayılmaz).
export const gucFaktoruIyilestirmeKayipAzalmasiInputSchema = z.object({
  mevcutCosPhi: z.number().gt(0).max(1),
  hedefCosPhi: z.number().gt(0).max(1),
  mevcutHatKaybi_W: z.number().min(0),
});

export type GucFaktoruIyilestirmeKayipAzalmasiInput = z.infer<typeof gucFaktoruIyilestirmeKayipAzalmasiInputSchema>;

export interface GucFaktoruIyilestirmeKayipAzalmasiOutput {
  kayipAzalmasi_yuzde: number;
}

function compute(input: GucFaktoruIyilestirmeKayipAzalmasiInput): CalcResult<GucFaktoruIyilestirmeKayipAzalmasiOutput> {
  const oran = input.mevcutCosPhi / input.hedefCosPhi;
  const azalma = (1 - oran * oran) * 100;
  const yeniKayip = input.mevcutHatKaybi_W * oran * oran;
  return {
    value: { kayipAzalmasi_yuzde: azalma },
    intermediates: {
      akim_orani_I2_I1: oran,
      akim_azalmasi_yuzde: (1 - oran) * 100,
      yeni_hat_kaybi_W: yeniKayip,
      kayip_azalmasi_W: input.mevcutHatKaybi_W - yeniKayip,
    },
    standardsUsed: ["I²R kaybı; P = √3·U·I·cosφ ilişkisi"],
    verdict:
      input.hedefCosPhi < input.mevcutCosPhi
        ? { status: "uygunsuz", note: "Hedef cosφ mevcut değerden düşük: iyileştirme değil kötüleşme." }
        : { status: "uygun", note: "Güç faktörü iyileştirmesi hat akımını ve kaybını azaltır." },
  };
}

export const gucFaktoruIyilestirmeKayipAzalmasi: CalcModule<GucFaktoruIyilestirmeKayipAzalmasiInput, GucFaktoruIyilestirmeKayipAzalmasiOutput> = {
  id: "guc-faktoru-iyilestirme-kayip-azalmasi",
  title: "Güç Faktörü İyileştirmesiyle Hat Kaybı Azalması",
  discipline: "elektrik",
  standards: [],
  inputSchema: gucFaktoruIyilestirmeKayipAzalmasiInputSchema,
  compute,
};
