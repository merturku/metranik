import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dağıtım trafosu yıllık kayıp enerjisi: E = (P0 + β²·Pk)·t,  P0 boşta (demir) kaybı, Pk anma yükteki yük (bakır) kaybı,
// β ortalama yüklenme oranı (S/Sn; kayıp ∝ β², β eşdeğer/RMS değer olmalı). t işletme süresi (bağlı kaldığı saat, tipik 8760 h).
// IEC 60076-20 / EU 2019/1783 (Ecodesign) sınıfları için P0 ve Pk katalog değerleridir.
export const trafoYillikKayipMaliyetiInputSchema = z.object({
  bostaKaybi_kW: z.number().min(0),
  yukKaybi_kW: z.number().min(0),
  yuklenmeOrani: z.number().min(0).max(1.5),
  yillikSaat: z.number().positive().max(8760),
  elektrikFiyati_TLkWh: z.number().min(0),
});

export type TrafoYillikKayipMaliyetiInput = z.infer<typeof trafoYillikKayipMaliyetiInputSchema>;

export interface TrafoYillikKayipMaliyetiOutput {
  yillikKayip_kWh: number;
}

function compute(input: TrafoYillikKayipMaliyetiInput): CalcResult<TrafoYillikKayipMaliyetiOutput> {
  const bosta = input.bostaKaybi_kW * input.yillikSaat;
  const yuk = input.yuklenmeOrani ** 2 * input.yukKaybi_kW * input.yillikSaat;
  const e = bosta + yuk;
  return {
    value: { yillikKayip_kWh: e },
    intermediates: {
      bosta_kaybi_kWh: bosta,
      yuk_kaybi_kWh: yuk,
      yillik_maliyet_TL: e * input.elektrikFiyati_TLkWh,
      ortalama_kayip_kW: e / input.yillikSaat,
      bosta_kayip_payi_yuzde: e > 0 ? (bosta / e) * 100 : 0,
      esit_kayip_yuklenme_orani: input.yukKaybi_kW > 0 ? Math.sqrt(input.bostaKaybi_kW / input.yukKaybi_kW) : 0,
    },
    standardsUsed: ["IEC 60076-20", "AB 2019/1783 (Ecodesign)"],
  };
}

export const trafoYillikKayipMaliyeti: CalcModule<TrafoYillikKayipMaliyetiInput, TrafoYillikKayipMaliyetiOutput> = {
  id: "trafo-yillik-kayip-maliyeti",
  title: "Trafo Yıllık Kayıp Enerjisi ve Maliyeti",
  discipline: "elektrik",
  standards: ["IEC 60076-20"],
  inputSchema: trafoYillikKayipMaliyetiInputSchema,
  compute,
};
