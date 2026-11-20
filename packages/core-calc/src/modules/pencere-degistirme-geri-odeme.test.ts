import { describe, it, expect } from "vitest";
import { pencereDegistirmeGeriOdeme } from "./pencere-degistirme-geri-odeme";

describe("Pencere Değiştirme Geri Ödeme", () => {
  const g = { pencereAlani_m2: 20, eskiU_Wm2K: 2.8, yeniU_Wm2K: 1.6, derece_gun: 2000, sistemVerimi: 0.9, yakitFiyati_TLkWh: 1.5, birimYatirim_TLm2: 6000 };
  it("20 m², U 2,8→1,6, 2000 DG: Q = 1152 kWh; yakıt 1280; 1920 ₺/yıl; 120 000 ₺ → 62,5 yıl", () => {
    const r = pencereDegistirmeGeriOdeme.compute(g);
    expect(r.intermediates.yillik_isil_tasarruf_kWh as number).toBeCloseTo(1152, 8);
    expect(r.intermediates.yillik_yakit_tasarrufu_kWh as number).toBeCloseTo(1280, 8);
    expect(r.intermediates.yillik_parasal_tasarruf_TL as number).toBeCloseTo(1920, 8);
    expect(r.value.geriOdemeSuresi_yil as number).toBeCloseTo(62.5, 8);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("ucuz birim yatırımla (1000 ₺/m²) geri ödeme 10,4 yıl → sınırda", () => {
    const r = pencereDegistirmeGeriOdeme.compute({ ...g, birimYatirim_TLm2: 1000 });
    expect(r.value.geriOdemeSuresi_yil as number).toBeCloseTo(10.4167, 3);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("yeni U ≥ eski U: null + uygunsuz", () => {
    const r = pencereDegistirmeGeriOdeme.compute({ ...g, yeniU_Wm2K: 3 });
    expect(r.value.geriOdemeSuresi_yil).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
