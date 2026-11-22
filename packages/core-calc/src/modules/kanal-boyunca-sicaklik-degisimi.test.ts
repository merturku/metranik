import { describe, it, expect } from "vitest";
import { kanalBoyuncaSicaklikDegisimi } from "./kanal-boyunca-sicaklik-degisimi";

describe("Hava Kanalı Boyunca Sıcaklık Değişimi", () => {
  const g = { debi_m3h: 3000, kanalGenisligi_mm: 600, kanalYuksekligi_mm: 400, kanalUzunlugu_m: 30, girisSicakligi_C: 40, ortamSicakligi_C: 10, yalitimKalinligi_mm: 25, yalitimLambda_WmK: 0.04, icTasinim_h_Wm2K: 8, disTasinim_h_Wm2K: 25, izinVerilenDusum_K: 3 };
  it("U = 1,2658; NTU = 0,0755; çıkış = 10 + 30·e^(−NTU) = 37,818 °C", () => {
    const r = kanalBoyuncaSicaklikDegisimi.compute(g);
    expect(r.intermediates.U_Wm2K as number).toBeCloseTo(1.265823, 5);
    expect(r.intermediates.NTU as number).toBeCloseTo(0.0754964, 6);
    expect(r.value.cikisSicakligi_C).toBeCloseTo(37.8185, 3);
    expect(r.verdict?.status).toBe("uygun"); // düşüm 2,18 K
  });
  it("enerji dengesi: ṁ·cp·ΔT = ısı alışverişi; ortam = giriş → değişim 0", () => {
    const r = kanalBoyuncaSicaklikDegisimi.compute(g);
    expect(r.intermediates.isi_alisverisi_W as number).toBeCloseTo(1.2 * (3000 / 3600) * 1006 * (37.8185 - 40), 0);
    expect(kanalBoyuncaSicaklikDegisimi.compute({ ...g, ortamSicakligi_C: 40 }).value.cikisSicakligi_C).toBeCloseTo(40, 10);
  });
  it("izin 2 K → düşüm 2,18 sınırda; 1 K → uygunsuz", () => {
    expect(kanalBoyuncaSicaklikDegisimi.compute({ ...g, izinVerilenDusum_K: 2 }).verdict?.status).toBe("sinirda");
    expect(kanalBoyuncaSicaklikDegisimi.compute({ ...g, izinVerilenDusum_K: 1 }).verdict?.status).toBe("uygunsuz");
  });
});
