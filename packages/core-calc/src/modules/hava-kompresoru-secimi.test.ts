import { describe, expect, it } from "vitest";
import { havaKompresoruSecimi } from "./hava-kompresoru-secimi";

describe("hava-kompresoru-secimi", () => {
  it("toplam=5 m³/min, eşzamanlılık=0.7, güvenlik=1.2 → 4.2 m³/min", () => {
    const r = havaKompresoruSecimi.compute({
      toplamHavaTuketimi_m3min: 5,
      eszamanlilikFaktoru: 0.7,
      guvenlikKatsayisi: 1.2,
    });

    expect(r.value.gerekliFAD_m3min).toBeCloseTo(4.2, 5);
  });
});
