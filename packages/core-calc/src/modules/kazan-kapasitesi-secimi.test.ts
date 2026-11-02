import { describe, it, expect } from "vitest";
import { kazanKapasitesiSecimi } from "./kazan-kapasitesi-secimi";

describe("Isıtma Kazanı Kapasite Seçimi", () => {
  it("100 kW × 1,05 × 1,10 + 15 kW = 130,5 kW; η 0,92 → yakıt girişi 141,85 kW; 112 205 kcal/h", () => {
    const r = kazanKapasitesiSecimi.compute({ binaIsiYuku_kW: 100, boruKaybiYuzde: 5, isinmaPayiYuzde: 10, sicakSuYuku_kW: 15, kazanVerimi: 0.92 });
    expect(r.value.kazanGucu_kW).toBeCloseTo(130.5, 9);
    expect(r.intermediates.yakit_giris_gucu_kW as number).toBeCloseTo(141.848, 2);
    expect(r.intermediates.kcal_h as number).toBeCloseTo(112210, -1);
  });
});
