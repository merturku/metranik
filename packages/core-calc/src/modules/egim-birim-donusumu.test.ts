import { describe, it, expect } from "vitest";
import { egimBirimDonusumu } from "./egim-birim-donusumu";

describe("Eğim Birim Dönüşümü", () => {
  it("30° → %57,735; 1:1,732", () => {
    const r = egimBirimDonusumu.compute({ birim: "derece", deger: 30 });
    expect(r.value.egimYuzdesi).toBeCloseTo(57.735, 3);
    expect(r.intermediates.egim_orani_1_n as number).toBeCloseTo(1.732, 3);
  });
  it("%10 → 5,711°; 1:10;  45° → %100", () => {
    const r = egimBirimDonusumu.compute({ birim: "yuzde", deger: 10 });
    expect(r.intermediates.egim_derece as number).toBeCloseTo(5.7106, 3);
    expect(r.intermediates.egim_orani_1_n as number).toBeCloseTo(10, 8);
    expect(egimBirimDonusumu.compute({ birim: "derece", deger: 45 }).value.egimYuzdesi).toBeCloseTo(100, 8);
  });
  it("1:12 rampa → %8,333 ve 4,764°; mm/m = 83,33", () => {
    const r = egimBirimDonusumu.compute({ birim: "oran", deger: 12 });
    expect(r.value.egimYuzdesi).toBeCloseTo(8.3333, 3);
    expect(r.intermediates.egim_derece as number).toBeCloseTo(4.7636, 3);
    expect(r.intermediates.egim_mm_per_m as number).toBeCloseTo(83.333, 2);
  });
});
