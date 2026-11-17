import { describe, it, expect } from "vitest";
import { daireselMilBurulma } from "./dairesel-mil-burulma";

describe("Dairesel Mil Burulma", () => {
  it("Ø50 dolu, T = 1 kN·m, L = 1 m, G = 80 GPa: τ = 40,74 MPa, J = 613 592 mm⁴, φ = 0,02037 rad = 1,167°", () => {
    const r = daireselMilBurulma.compute({ disCap_mm: 50, icCap_mm: 0, moment_kNm: 1, boy_m: 1, g_GPa: 80 });
    expect(r.value.tauMaks_MPa).toBeCloseTo(40.7437, 3);
    expect(r.intermediates.J_mm4 as number).toBeCloseTo(613592.3, 0);
    expect(r.intermediates.donme_rad as number).toBeCloseTo(0.0203718, 6);
    expect(r.intermediates.donme_derece as number).toBeCloseTo(1.16722, 4);
  });
  it("boru Ø50/Ø30: J = 534 070,8 mm⁴, τ = 46,81 MPa (dolu mile göre daha yüksek τ, daha hafif)", () => {
    const r = daireselMilBurulma.compute({ disCap_mm: 50, icCap_mm: 30, moment_kNm: 1, boy_m: 1, g_GPa: 80 });
    expect(r.intermediates.J_mm4 as number).toBeCloseTo(534070.75, 1);
    expect(r.value.tauMaks_MPa).toBeCloseTo(46.8103, 3);
  });
  it("Zod: iç çap ≥ dış çap reddedilir", () => {
    expect(daireselMilBurulma.inputSchema.safeParse({ disCap_mm: 50, icCap_mm: 50, moment_kNm: 1, boy_m: 1, g_GPa: 80 }).success).toBe(false);
  });
});
