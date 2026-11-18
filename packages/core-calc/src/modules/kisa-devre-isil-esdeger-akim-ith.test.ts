import { describe, it, expect } from "vitest";
import { kisaDevreIsilEsdegerAkimIth } from "./kisa-devre-isil-esdeger-akim-ith";

describe("Kısa Devre Isıl Eşdeğer Akım Ith", () => {
  const g = { ik_kA: 20, kappa: 1.8, sure_s: 1, frekans_Hz: 50, n: 1, ithr_kA: 25, tkr_s: 1 };
  it("Ik″ 20 kA, κ 1,8, 1 s, 50 Hz: m = 0,04481; Ith = 20·√(1,04481) = 20,443 kA", () => {
    const r = kisaDevreIsilEsdegerAkimIth.compute(g);
    expect(r.intermediates.m_faktoru as number).toBeCloseTo(0.0448142, 6);
    expect(r.value.ith_kA).toBeCloseTo(20.44323, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("κ = 2'de m = 2 (limit); Ith = Ik·√3", () => {
    expect(kisaDevreIsilEsdegerAkimIth.compute({ ...g, kappa: 2 }).value.ith_kA).toBeCloseTo(20 * Math.sqrt(3), 8);
  });
  it("0,1 s: Ith = 24,025 kA; 1 s eşdeğeri 7,597 kA", () => {
    const r = kisaDevreIsilEsdegerAkimIth.compute({ ...g, sure_s: 0.1 });
    expect(r.value.ith_kA).toBeCloseTo(24.0248, 3);
    expect(r.intermediates.esdeger_akim_nominal_sure_kA as number).toBeCloseTo(7.5970, 3);
  });
  it("dayanım 20 kA ise 20,44 kA eşdeğer akım uygunsuz", () => {
    expect(kisaDevreIsilEsdegerAkimIth.compute({ ...g, ithr_kA: 20 }).verdict?.status).toBe("uygunsuz");
  });
  it("κ ≤ 1 reddedilir", () => {
    expect(kisaDevreIsilEsdegerAkimIth.inputSchema.safeParse({ ...g, kappa: 1 }).success).toBe(false);
  });
});
