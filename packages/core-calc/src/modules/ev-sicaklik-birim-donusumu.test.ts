import { describe, it, expect } from "vitest";
import { evSicaklikBirimDonusumu } from "./ev-sicaklik-birim-donusumu";

describe("Sıcaklık Birim Dönüşümü", () => {
  it("100 °C = 373,15 K = 212 °F = 671,67 °R", () => {
    const r = evSicaklikBirimDonusumu.compute({ deger: 100, birim: "C" });
    expect(r.intermediates.kelvin_K as number).toBeCloseTo(373.15, 8);
    expect(r.intermediates.fahrenheit_F as number).toBeCloseTo(212, 8);
    expect(r.intermediates.rankine_R as number).toBeCloseTo(671.67, 8);
  });
  it("−40 °F = −40 °C; 0 K = −273,15 °C = 0 °R; 491,67 °R = 0 °C", () => {
    expect(evSicaklikBirimDonusumu.compute({ deger: -40, birim: "F" }).value.celsius_C).toBeCloseTo(-40, 8);
    const k0 = evSicaklikBirimDonusumu.compute({ deger: 0, birim: "K" });
    expect(k0.value.celsius_C).toBeCloseTo(-273.15, 8);
    expect(k0.intermediates.rankine_R as number).toBeCloseTo(0, 8);
    expect(evSicaklikBirimDonusumu.compute({ deger: 491.67, birim: "R" }).value.celsius_C).toBeCloseTo(0, 8);
  });
  it("Zod: mutlak sıfırın altı reddedilir", () => {
    expect(evSicaklikBirimDonusumu.inputSchema.safeParse({ deger: -300, birim: "C" }).success).toBe(false);
  });
});
