import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Köpüklü söndürme (NFPA 11 yaklaşımı): solüsyon debisi Q = A·q (L/dk), q uygulama yoğunluğu (L/dk·m²);
// toplam solüsyon V = Q·t;  köpük konsantresi = V·c (c konsantrasyon oranı, %3 veya %6).
// q ve t yakıt tipi/tank/döküntü tehlikesine göre standarttan alınır (hidrokarbonda tipik 4,1 L/dk·m², 15–30 dk; teyit edin) — girdidir.
// Su ihtiyacı = V·(1 − c). Hortum/ek bekleme süresi ve yedek (genellikle ≥ %100) ayrıca düşünülmelidir.
export const kopukSolusyonKonsantreMiktariInputSchema = z.object({
  korunanAlan_m2: z.number().positive(),
  uygulamaYogunlugu_Ldkm2: z.number().positive(),
  uygulamaSuresi_dk: z.number().positive(),
  konsantrasyon_yuzde: z.number().gt(0).lt(100),
  yedekCarpani: z.number().min(1).max(3),
});

export type KopukSolusyonKonsantreMiktariInput = z.infer<typeof kopukSolusyonKonsantreMiktariInputSchema>;

export interface KopukSolusyonKonsantreMiktariOutput {
  konsantreMiktari_L: number;
}

function compute(input: KopukSolusyonKonsantreMiktariInput): CalcResult<KopukSolusyonKonsantreMiktariOutput> {
  const q = input.korunanAlan_m2 * input.uygulamaYogunlugu_Ldkm2;
  const v = q * input.uygulamaSuresi_dk;
  const c = input.konsantrasyon_yuzde / 100;
  return {
    value: { konsantreMiktari_L: v * c * input.yedekCarpani },
    intermediates: {
      solusyon_debisi_Ldk: q,
      toplam_solusyon_L: v,
      konsantre_tek_seferlik_L: v * c,
      su_ihtiyaci_L: v * (1 - c),
      pompa_debisi_m3h: (q * 60) / 1000,
    },
    standardsUsed: ["NFPA 11 (köpük sistemleri; uygulama yoğunluğu ve süre standarttan alınır)"],
  };
}

export const kopukSolusyonKonsantreMiktari: CalcModule<KopukSolusyonKonsantreMiktariInput, KopukSolusyonKonsantreMiktariOutput> = {
  id: "kopuk-solusyon-konsantre-miktari",
  title: "Köpüklü Söndürme Solüsyon ve Konsantre Miktarı",
  discipline: "mekanik",
  standards: ["NFPA 11"],
  inputSchema: kopukSolusyonKonsantreMiktariInputSchema,
  compute,
};
