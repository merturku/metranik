import { describe, it, expect } from "vitest";
import { yuksekVerimliMotorGeriOdeme } from "./yuksek-verimli-motor-geri-odeme";

const g = { milGucu_kW: 15, yukOrani: 0.75, eskiVerim_yuzde: 90, yeniVerim_yuzde: 94, yillikCalismaSaati_h: 6000, birimFiyat_TLkWh: 3, ekYatirim_TL: 20000 };

describe("Yüksek Verimli Motor Geri Ödeme", () => {
  it("15 kW, yük 0,75, %90 → %94, 6000 h: 11,25·(1/0,9 − 1/0,94) = 0,5319 kW → 3191,5 kWh/yıl", () => {
    const r = yuksekVerimliMotorGeriOdeme.compute(g);
    expect(r.intermediates.guc_tasarrufu_kW as number).toBeCloseTo(0.5319, 4);
    expect(r.value.yillikTasarruf_kWh).toBeCloseTo(3191.5, 0);
  });
  it("3 ₺/kWh: 9574,5 ₺/yıl; 20000 ₺ ek yatırım → 2,09 yıl", () => {
    const r = yuksekVerimliMotorGeriOdeme.compute(g);
    expect(r.intermediates.yillik_tasarruf_TL as number).toBeCloseTo(9574.5, 0);
    expect(r.intermediates.geri_odeme_yil as number).toBeCloseTo(2.089, 2);
  });
  it("giriş güçleri farkı tasarrufa eşit; yeni verim düşükse tasarruf negatif ve geri ödeme yok", () => {
    const r = yuksekVerimliMotorGeriOdeme.compute(g);
    expect((r.intermediates.eski_giris_gucu_kW as number) - (r.intermediates.yeni_giris_gucu_kW as number)).toBeCloseTo(r.intermediates.guc_tasarrufu_kW as number, 10);
    expect(yuksekVerimliMotorGeriOdeme.compute({ ...g, yeniVerim_yuzde: 85 }).intermediates.geri_odeme_yil).toBe("geri ödeme yok");
  });
});
