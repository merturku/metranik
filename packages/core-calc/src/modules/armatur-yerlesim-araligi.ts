import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Armatür yerleşimi (tekdüzelik için azami aralık/montaj yüksekliği oranı SHR): s_maks = SHR·h_m,
// h_m armatür ile çalışma düzlemi arası yükseklik. Sıra sayısı n = ⌈boyut/s_maks⌉, gerçek aralık s = boyut/n,
// duvara mesafe s/2 (yaklaşık). Toplam adet n_x·n_y, lüks yönteminden gelen adetle karşılaştırılıp büyüğü alınır.
export const armaturYerlesimAraligiInputSchema = z.object({
  odaUzunlugu_m: z.number().positive(),
  odaGenisligi_m: z.number().positive(),
  montajYuksekligi_m: z.number().positive(),
  shr: z.number().min(0.5).max(2.5),
  gerekliArmaturSayisi: z.number().int().min(0),
});

export type ArmaturYerlesimAraligiInput = z.infer<typeof armaturYerlesimAraligiInputSchema>;

export interface ArmaturYerlesimAraligiOutput {
  armaturSayisi: number;
}

function compute(input: ArmaturYerlesimAraligiInput): CalcResult<ArmaturYerlesimAraligiOutput> {
  const sMax = input.shr * input.montajYuksekligi_m;
  const nx = Math.ceil(input.odaUzunlugu_m / sMax - 1e-9);
  const ny = Math.ceil(input.odaGenisligi_m / sMax - 1e-9);
  const geometrik = nx * ny;
  return {
    value: { armaturSayisi: Math.max(geometrik, input.gerekliArmaturSayisi) },
    intermediates: {
      azami_aralik_m: sMax,
      sira_sayisi_uzunluk: nx,
      sira_sayisi_genislik: ny,
      geometrik_adet: geometrik,
      gercek_aralik_uzunluk_m: input.odaUzunlugu_m / nx,
      gercek_aralik_genislik_m: input.odaGenisligi_m / ny,
      duvar_mesafesi_m: input.odaUzunlugu_m / nx / 2,
      belirleyici: geometrik >= input.gerekliArmaturSayisi ? "Aralık (SHR) kriteri" : "Lüks yöntemi adedi",
    },
    standardsUsed: ["TS EN 12464-1 (düzgünlük), üretici SHR değeri"],
  };
}

export const armaturYerlesimAraligi: CalcModule<ArmaturYerlesimAraligiInput, ArmaturYerlesimAraligiOutput> = {
  id: "armatur-yerlesim-araligi",
  title: "Armatür Yerleşimi ve Aralık (SHR) Kontrolü",
  discipline: "elektrik",
  standards: ["TS EN 12464-1"],
  inputSchema: armaturYerlesimAraligiInputSchema,
  compute,
};
