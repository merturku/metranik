import { describe, it, expect } from "vitest";
import { depoBeklemeIsiKaybi } from "./depo-bekleme-isi-kaybi";

describe("Depo Bekleme Isı Kaybı", () => {
  it("200 L, U·A = 1,2 W/K, 60→20 °C: Q = 48 W, 1,152 kWh/gün, τ = 193,80 h, 24 h sonra 55,34 °C", () => {
    const r = depoBeklemeIsiKaybi.compute({ hacim_L: 200, yuzeyAlani_m2: 1.5, u_Wm2K: 0.8, suSicakligi_C: 60, ortamSicakligi_C: 20, sure_h: 24 });
    expect(r.value.kayip_W).toBeCloseTo(48, 8);
    expect(r.intermediates.gunluk_kayip_kWh as number).toBeCloseTo(1.152, 8);
    expect(r.intermediates.zaman_sabiti_saat as number).toBeCloseTo(193.7963, 3);
    expect(r.intermediates.baslangic_soguma_C_saat as number).toBeCloseTo(0.2064, 4);
    expect(r.intermediates.sure_sonu_sicaklik_C as number).toBeCloseTo(55.3408, 3);
  });
  it("süre 0 → sıcaklık değişmez; çok uzun süre → ortam sıcaklığı", () => {
    const g = { hacim_L: 200, yuzeyAlani_m2: 1.5, u_Wm2K: 0.8, suSicakligi_C: 60, ortamSicakligi_C: 20 };
    expect(depoBeklemeIsiKaybi.compute({ ...g, sure_h: 0 }).intermediates.sure_sonu_sicaklik_C as number).toBeCloseTo(60, 8);
    expect(depoBeklemeIsiKaybi.compute({ ...g, sure_h: 5000 }).intermediates.sure_sonu_sicaklik_C as number).toBeCloseTo(20, 6);
  });
});
