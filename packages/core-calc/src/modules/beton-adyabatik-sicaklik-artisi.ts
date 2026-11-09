import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Betonda hidratasyon ısısından adyabatik sıcaklık artışı (ACI 207.2R): ΔT = C·q/(ρ·c).
// C çimento (bağlayıcı) dozajı kg/m³, q çimentonun hidratasyon ısısı kJ/kg (normal portland, 7–28 gün ≈ 350–420; düşük ısılı daha az),
// ρ beton yoğunluğu (≈ 2400 kg/m³), c özgül ısı (≈ 1,0 kJ/kg·K). Masif betonda (> 0,8–1 m) merkez sıcaklığı = taze beton sıcaklığı + ΔT_adyabatik·f,
// f yüzeye ısı kaçışı nedeniyle < 1; merkez–yüzey farkı genellikle 20 °C ile sınırlanır (çatlak kontrolü, şartnameden teyit edin).
export const betonAdyabatikSicaklikArtisiInputSchema = z.object({
  cimentoDozaji_kgm3: z.number().positive(),
  hidratasyonIsisi_kJkg: z.number().positive(),
  betonYogunlugu_kgm3: z.number().positive(),
  ozgulIsi_kJkgK: z.number().positive(),
  tazeBetonSicakligi_C: z.number(),
  izinVerilenMaksSicaklik_C: z.number(),
});

export type BetonAdyabatikSicaklikArtisiInput = z.infer<typeof betonAdyabatikSicaklikArtisiInputSchema>;

export interface BetonAdyabatikSicaklikArtisiOutput {
  adyabatikArtis_K: number;
}

function compute(input: BetonAdyabatikSicaklikArtisiInput): CalcResult<BetonAdyabatikSicaklikArtisiOutput> {
  const dt = (input.cimentoDozaji_kgm3 * input.hidratasyonIsisi_kJkg) / (input.betonYogunlugu_kgm3 * input.ozgulIsi_kJkgK);
  const tmax = input.tazeBetonSicakligi_C + dt;
  const durum = tmax <= input.izinVerilenMaksSicaklik_C ? "uygun" : tmax <= input.izinVerilenMaksSicaklik_C + 5 ? "sinirda" : "uygunsuz";
  return {
    value: { adyabatikArtis_K: dt },
    intermediates: {
      hidratasyon_isisi_toplam_kJm3: input.cimentoDozaji_kgm3 * input.hidratasyonIsisi_kJkg,
      adyabatik_maks_sicaklik_C: tmax,
      izin_verilen_maks_C: input.izinVerilenMaksSicaklik_C,
    },
    standardsUsed: ["ACI 207.2R (masif beton sıcaklık kontrolü)"],
    verdict: {
      status: durum,
      note:
        durum === "uygun"
          ? "Adyabatik üst sınır izin verilen sıcaklığın altında (gerçek değer ısı kaçışıyla daha düşük)."
          : "Adyabatik üst sınır izin verilen sıcaklığı aşıyor; düşük ısılı çimento, buz/soğutma veya katmanlı döküm düşünün.",
    },
  };
}

export const betonAdyabatikSicaklikArtisi: CalcModule<BetonAdyabatikSicaklikArtisiInput, BetonAdyabatikSicaklikArtisiOutput> = {
  id: "beton-adyabatik-sicaklik-artisi",
  title: "Beton Hidratasyon Adyabatik Sıcaklık Artışı",
  discipline: "insaat",
  standards: [],
  inputSchema: betonAdyabatikSicaklikArtisiInputSchema,
  compute,
};
