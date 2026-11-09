import { describe, it, expect } from "vitest";
import { yildizUcgenDirencDonusumu } from "./yildiz-ucgen-direnc-donusumu";

describe("Yıldız–Üçgen Direnç Dönüşümü", () => {
  it("Ra=10, Rb=20, Rc=30: Rab = 36,667, Rbc = 110, Rca = 55", () => {
    const r = yildizUcgenDirencDonusumu.compute({ ra_ohm: 10, rb_ohm: 20, rc_ohm: 30 });
    expect(r.value.rab_ohm).toBeCloseTo(36.6667, 3);
    expect(r.intermediates.rbc_ohm as number).toBeCloseTo(110, 8);
    expect(r.intermediates.rca_ohm as number).toBeCloseTo(55, 8);
  });
  it("geri dönüşüm orijinal Y değerlerini verir", () => {
    const r = yildizUcgenDirencDonusumu.compute({ ra_ohm: 10, rb_ohm: 20, rc_ohm: 30 });
    expect(r.intermediates.geri_donusum_ra_ohm as number).toBeCloseTo(10, 8);
    expect(r.intermediates.geri_donusum_rb_ohm as number).toBeCloseTo(20, 8);
    expect(r.intermediates.geri_donusum_rc_ohm as number).toBeCloseTo(30, 8);
  });
  it("simetrik: RΔ = 3·RY", () => {
    expect(yildizUcgenDirencDonusumu.compute({ ra_ohm: 7, rb_ohm: 7, rc_ohm: 7 }).value.rab_ohm).toBeCloseTo(21, 8);
  });
});
