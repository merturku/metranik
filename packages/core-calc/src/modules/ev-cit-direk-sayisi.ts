import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çit/korkuluk direk ve panel metrajı: kapalı çevrede direk sayısı = ⌈L_net/s⌉, açık hatta ⌈L_net/s⌉ + 1; panel sayısı = ⌈L_net/s⌉ (aralık başına bir panel).
// L_net = toplam uzunluk − kapı genişlikleri toplamı; her kapı için ek 2 direk (kapı kolonları) eklenir. Köşe direkleri aralık bölünmesine dahil değildir:
// köşede ek direk gerekiyorsa köşe sayısı girilir (her köşe +1). Direk aralığı üretici/panel genişliğinden alınır. Zemin türü ve temel metrajı bu modülde yoktur.
export const evCitDirekSayisiInputSchema = z.object({
  toplamUzunluk_m: z.number().positive(),
  direkAraligi_m: z.number().positive(),
  hatTipi: z.enum(["kapali", "acik"]),
  kapiSayisi: z.number().int().min(0),
  kapiGenisligi_m: z.number().min(0),
  koseSayisi: z.number().int().min(0),
});

export type EvCitDirekSayisiInput = z.infer<typeof evCitDirekSayisiInputSchema>;

export interface EvCitDirekSayisiOutput {
  toplamDirek: number;
}

function compute(input: EvCitDirekSayisiInput): CalcResult<EvCitDirekSayisiOutput> {
  const net = Math.max(0, input.toplamUzunluk_m - input.kapiSayisi * input.kapiGenisligi_m);
  const aralik = Math.ceil(net / input.direkAraligi_m - 1e-9);
  const direkHat = input.hatTipi === "kapali" ? aralik : aralik + 1;
  const toplam = direkHat + 2 * input.kapiSayisi + input.koseSayisi;
  return {
    value: { toplamDirek: toplam },
    intermediates: {
      net_uzunluk_m: net,
      aralik_sayisi: aralik,
      panel_sayisi: aralik,
      hat_direkleri: direkHat,
      kapi_kolonlari: 2 * input.kapiSayisi,
      kose_direkleri: input.koseSayisi,
      gercek_aralik_m: aralik > 0 ? net / aralik : "—",
    },
    standardsUsed: [],
  };
}

export const evCitDirekSayisi: CalcModule<EvCitDirekSayisiInput, EvCitDirekSayisiOutput> = {
  id: "ev-cit-direk-sayisi",
  title: "Çit / Korkuluk Direk ve Panel Sayısı",
  discipline: "ev",
  standards: [],
  inputSchema: evCitDirekSayisiInputSchema,
  compute,
};
