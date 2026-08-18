import { describe, expect, it } from "vitest";
import { sivaHarcMiktari } from "./siva-harc-miktari";

describe("siva-harc-miktari", () => {
  it("alan=100m², kalınlık=2cm, yoğunluk=1800kg/m³, torba=25kg → 144 torba", () => {
    const r = sivaHarcMiktari.compute({
      alan_m2: 100,
      kalinlik_m: 0.02,
      yogunluk_kg_m3: 1800,
      torbaAgirligi_kg: 25,
    });

    expect(r.intermediates.hacim_m3).toBeCloseTo(2, 5);
    expect(r.intermediates.kuruHarcKutlesi_kg).toBeCloseTo(3600, 5);
    expect(r.value.gerekliTorbaSayisi).toBe(144);
  });
});
