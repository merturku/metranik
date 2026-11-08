import { describe, it, expect } from "vitest";
import { eulerKritikBurkulmaYuku } from "./euler-kritik-burkulma-yuku";

// HEA 200 zayıf eksen: Iz = 1336e4 mm⁴, A = 5383 mm²
const g = { elastisiteModulu_GPa: 210, atalet_mm4: 1.336e7, alan_mm2: 5383, boy_m: 3, boyKatsayisi_k: 1, akmaDayanimi_MPa: 355 };

describe("Euler Kritik Burkulma Yükü", () => {
  it("HEA200 (Iz = 1336 cm⁴), L = 3 m, k = 1: Ncr = π²·210000·1,336e7/9e6 = 3076,8 kN", () => {
    const r = eulerKritikBurkulmaYuku.compute(g);
    expect(r.value.kritikYuk_kN).toBeCloseTo(3076.76, 0);
  });
  it("σcr = Ncr/A = 571,6 MPa > fy → Euler geçerli değil; λ = 3000/49,82 = 60,2", () => {
    const r = eulerKritikBurkulmaYuku.compute(g);
    expect(r.intermediates.kritik_gerilme_MPa as number).toBeCloseTo(571.6, 0);
    expect(r.intermediates.narinlik_lambda as number).toBeCloseTo(60.2, 1);
    expect(String(r.intermediates.euler_gecerli_mi)).toContain("hayır");
  });
  it("k = 2 (ankastre–serbest) → yük 1/4; uzun kolonda Euler geçerli", () => {
    const r = eulerKritikBurkulmaYuku.compute({ ...g, boyKatsayisi_k: 2 });
    expect(r.value.kritikYuk_kN).toBeCloseTo(3076.76 / 4, 0);
    const u = eulerKritikBurkulmaYuku.compute({ ...g, boy_m: 10 });
    expect(String(u.intermediates.euler_gecerli_mi)).toContain("evet");
  });
});
