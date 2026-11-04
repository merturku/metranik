import { describe, it, expect } from "vitest";
import { enerjiBirimDonusumu } from "./enerji-birim-donusumu";

describe("Enerji Birim Dönüşümü", () => {
  it("100 kWh = 360 MJ = 0,36 GJ = 85 984,5 kcal = 341 214 BTU", () => {
    const r = enerjiBirimDonusumu.compute({ enerji_kWh: 100 });
    expect(r.value.enerji_MJ).toBeCloseTo(360, 9);
    expect(r.intermediates.enerji_kcal as number).toBeCloseTo(85984.52, 1);
    expect(r.intermediates.enerji_BTU as number).toBeCloseTo(341214, 0);
  });
  it("95,9 kWh ≈ 10 m³ doğalgaz (Hu 9,59)", () => {
    expect(enerjiBirimDonusumu.compute({ enerji_kWh: 95.9 }).intermediates.dogalgaz_m3_Hu9_59 as number).toBeCloseTo(10, 9);
  });
});
