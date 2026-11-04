import { describe, it, expect } from "vitest";
import { isitmaDereceGunYillikEnerji } from "./isitma-derece-gun-yillik-enerji";

describe("Derece-Gün ile Yıllık Isıtma Enerjisi", () => {
  it("UA 200 W/K, 300 m³, n 0,5, DG 2500, η 0,9 → Hv 50,25; E 15 015 kWh; yakıt 16 683 kWh", () => {
    const r = isitmaDereceGunYillikEnerji.compute({ ua_WK: 200, hacim_m3: 300, havaDegisimi_1h: 0.5, dereceGun_Kgun: 2500, sistemVerimi: 0.9 });
    expect(r.intermediates.havalandirma_kayip_katsayisi_WK as number).toBeCloseTo(50.25, 2);
    expect(r.value.yillikIhtiyac_kWh).toBeCloseTo(15015, 0);
    expect(r.intermediates.yakit_girisi_kWh as number).toBeCloseTo(16683.3, 0);
  });
  it("hava değişimi 0 → yalnız iletim: 250 W/K × 2000 K·gün = 12 000 kWh", () => {
    const r = isitmaDereceGunYillikEnerji.compute({ ua_WK: 250, hacim_m3: 100, havaDegisimi_1h: 0, dereceGun_Kgun: 2000, sistemVerimi: 1 });
    expect(r.value.yillikIhtiyac_kWh).toBeCloseTo(12000, 6);
  });
});
