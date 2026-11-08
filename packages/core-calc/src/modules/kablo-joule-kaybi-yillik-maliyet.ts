import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kablo iletken (Joule) kaybı: 3 faz P = 3·I²·R,  tek faz P = 2·I²·R  (faz + dönüş), R = R'·L.
// Yıllık enerji = P·h·(yük faktörü kare ortalaması dikkate alınmalı: girilen I çalışma akımının etkin/RMS değeri olmalıdır);
// maliyet = enerji × birim fiyat. R' çalışma sıcaklığındaki birim dirençtir (mΩ/m); 20 °C değerini Kablo İletken Direnci modülüyle
// çalışma sıcaklığına taşıyın. Harmonik, deri etkisi ve dielektrik kayıpları ihmal edilir.
export const kabloJouleKaybiYillikMaliyetInputSchema = z.object({
  faz: z.enum(["3", "1"]),
  akim_A: z.number().positive(),
  birimDirenc_mOhm_m: z.number().positive(),
  uzunluk_m: z.number().positive(),
  yillikSaat_h: z.number().positive(),
  birimFiyat_TLkWh: z.number().min(0),
});

export type KabloJouleKaybiYillikMaliyetInput = z.infer<typeof kabloJouleKaybiYillikMaliyetInputSchema>;

export interface KabloJouleKaybiYillikMaliyetOutput {
  guc_kaybi_W: number;
}

function compute(input: KabloJouleKaybiYillikMaliyetInput): CalcResult<KabloJouleKaybiYillikMaliyetOutput> {
  const r = (input.birimDirenc_mOhm_m / 1000) * input.uzunluk_m;
  const n = input.faz === "3" ? 3 : 2;
  const p = n * input.akim_A ** 2 * r;
  const kwh = (p / 1000) * input.yillikSaat_h;
  return {
    value: { guc_kaybi_W: p },
    intermediates: {
      hat_direnci_ohm: r,
      yillik_enerji_kaybi_kWh: kwh,
      yillik_maliyet_TL: kwh * input.birimFiyat_TLkWh,
    },
    standardsUsed: ["Joule yasası P = I²R"],
  };
}

export const kabloJouleKaybiYillikMaliyet: CalcModule<KabloJouleKaybiYillikMaliyetInput, KabloJouleKaybiYillikMaliyetOutput> = {
  id: "kablo-joule-kaybi-yillik-maliyet",
  title: "Kablo Joule Kaybı ve Yıllık Enerji Maliyeti",
  discipline: "elektrik",
  standards: [],
  inputSchema: kabloJouleKaybiYillikMaliyetInputSchema,
  compute,
};
