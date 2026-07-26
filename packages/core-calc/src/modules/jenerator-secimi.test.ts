import { describe, expect, it } from "vitest";
import { jeneratorSecimi } from "./jenerator-secimi";

describe("jenerator-secimi", () => {
  it("kritikYük=100kW, cosφ=0.8, başlama=1.3, güvenlik=1.1 → 178.75 kVA", () => {
    const r = jeneratorSecimi.compute({
      kritikYuk_kW: 100,
      gucFaktoru_cosfi: 0.8,
      baslamaKatsayisi: 1.3,
      guvenlikKatsayisi: 1.1,
    });

    expect(r.intermediates.gorunurGuc_kVA).toBeCloseTo(125, 5);
    expect(r.intermediates.baslangicGucu_kVA).toBeCloseTo(162.5, 5);
    expect(r.value.gerekliJeneratorGucu_kVA).toBeCloseTo(178.75, 3);
  });
});
