import { describe, it, expect } from "vitest";
import { kesmeDonatisiMinimumOrani } from "./kesme-donatisi-minimum-orani";

describe("Kesme Donatısı Minimum Oranı", () => {
  it("C30, B420C, b = 300, Ø8 2 kollu: fctd 1,278; fywd 365,22; ρw,min = 0,0010498; smaks = 319,2 mm", () => {
    const r = kesmeDonatisiMinimumOrani.compute({ fck_MPa: 30, fywk_MPa: 420, b_mm: 300, etriyeCapi_mm: 8, kolSayisi: 2 });
    expect(r.intermediates.fctd_MPa as number).toBeCloseTo(1.27802, 4);
    expect(r.intermediates.fywd_MPa as number).toBeCloseTo(365.2174, 3);
    expect(r.value.roMin).toBeCloseTo(0.00104980, 7);
    expect(r.intermediates.Asw_mm2 as number).toBeCloseTo(100.531, 3);
    expect(r.intermediates.s_maks_mm as number).toBeCloseTo(319.2, 1);
  });
  it("genişlik iki katı → azami aralık yarıya iner; fck 4 katı → ρ 2 kat", () => {
    const g = { fck_MPa: 30, fywk_MPa: 420, b_mm: 300, etriyeCapi_mm: 8, kolSayisi: 2 };
    const a = kesmeDonatisiMinimumOrani.compute(g);
    expect((kesmeDonatisiMinimumOrani.compute({ ...g, b_mm: 600 }).intermediates.s_maks_mm as number) / (a.intermediates.s_maks_mm as number)).toBeCloseTo(0.5, 10);
    expect(kesmeDonatisiMinimumOrani.compute({ ...g, fck_MPa: 120 }).value.roMin / a.value.roMin).toBeCloseTo(2, 10);
  });
});
