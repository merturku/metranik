import { describe, it, expect } from "vitest";
import { donatiCeligiMetraji } from "./donati-celigi-metraji";

describe("Donatı Çeliği Metrajı", () => {
  it("Ø12 → 0,888 kg/m (TS 708 tablosu); 10 adet × 6 m = 53,3 kg net, %5 fire ile 55,9 kg", () => {
    const r = donatiCeligiMetraji.compute({ cap_mm: 12, adet: 10, boy_m: 6, fireYuzde: 5 });
    expect(r.intermediates.birim_agirlik_kgm as number).toBeCloseTo(0.888, 2);
    expect(r.intermediates.net_agirlik_kg as number).toBeCloseTo(53.27, 1);
    expect(r.value.agirlik_kg).toBeCloseTo(55.93, 1);
  });
  it("Ø16 → 1,578 kg/m, Ø20 → 2,466 kg/m", () => {
    expect(donatiCeligiMetraji.compute({ cap_mm: 16, adet: 1, boy_m: 1, fireYuzde: 0 }).value.agirlik_kg).toBeCloseTo(1.578, 2);
    expect(donatiCeligiMetraji.compute({ cap_mm: 20, adet: 1, boy_m: 1, fireYuzde: 0 }).value.agirlik_kg).toBeCloseTo(2.466, 2);
  });
});
