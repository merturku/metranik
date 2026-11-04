import { describe, it, expect } from "vitest";
import { sogutmaKapasitesiBirimDonusumu } from "./sogutma-kapasitesi-birim-donusumu";

describe("Soğutma Kapasitesi Birim Dönüşümü", () => {
  it("35,1685 kW = 10 TR = 120 000 BTU/h", () => {
    const r = sogutmaKapasitesiBirimDonusumu.compute({ kapasite_kW: 35.1685 });
    expect(r.value.kapasite_TR).toBeCloseTo(10, 6);
    expect(r.intermediates.kapasite_BTUh as number).toBeCloseTo(120000, -1);
  });
  it("1 kW ≈ 859,8 kcal/h", () => {
    const r = sogutmaKapasitesiBirimDonusumu.compute({ kapasite_kW: 1 });
    expect(r.intermediates.kapasite_kcalh as number).toBeCloseTo(859.85, 1);
  });
});
