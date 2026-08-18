import { describe, expect, it } from "vitest";
import { havaKurutucuKapasiteSecimi } from "./hava-kurutucu-kapasite-secimi";

describe("hava-kurutucu-kapasite-secimi", () => {
  it("kompresör debisi=500m³/h, K1=1.2, K2=0.9 → 540 m³/h", () => {
    const r = havaKurutucuKapasiteSecimi.compute({
      kompresorDebisi_m3h: 500,
      sicaklikDuzeltmeKatsayisi_K1: 1.2,
      basincDuzeltmeKatsayisi_K2: 0.9,
    });

    expect(r.intermediates.toplamDuzeltmeKatsayisi).toBeCloseTo(1.08, 5);
    expect(r.value.gerekliKapasite_m3h).toBeCloseTo(540, 5);
  });
});
