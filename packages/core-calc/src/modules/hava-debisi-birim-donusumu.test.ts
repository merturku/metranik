import { describe, it, expect } from "vitest";
import { havaDebisiBirimDonusumu } from "./hava-debisi-birim-donusumu";

describe("Hava Debisi Birim Dönüşümü", () => {
  it("1699,011 m³/h = 1000 CFM = 471,95 L/s", () => {
    const r = havaDebisiBirimDonusumu.compute({ debi_m3h: 1699.011 });
    expect(r.value.debi_CFM).toBeCloseTo(1000, 6);
    expect(r.intermediates.debi_Ls as number).toBeCloseTo(471.948, 2);
  });
  it("3600 m³/h = 1 m³/s", () => {
    expect(havaDebisiBirimDonusumu.compute({ debi_m3h: 3600 }).intermediates.debi_m3s as number).toBeCloseTo(1, 12);
  });
});
