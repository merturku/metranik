import { describe, expect, it } from "vitest";
import { ledAydinlatmaEnerjiTasarrufu } from "./led-aydinlatma-enerji-tasarrufu";

describe("ledAydinlatmaEnerjiTasarrufu", () => {
  it("60W→9W, 5 saat/gün, 365 gün, 2.85 TL/kWh → ≈265.26 TL/yıl", () => {
    const r = ledAydinlatmaEnerjiTasarrufu.compute({
      eskiArmaturGucu_W: 60,
      yeniArmaturGucu_W: 9,
      gunlukCalismaSuresi_saat: 5,
      yillikGunSayisi: 365,
      birimFiyat_TLkWh: 2.85,
    });
    expect(r.value.yillikTasarruf_TL).toBeCloseTo(265.264, 2);
  });
});
