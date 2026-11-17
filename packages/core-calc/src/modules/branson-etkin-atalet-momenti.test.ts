import { describe, it, expect } from "vitest";
import { bransonEtkinAtaletMomenti } from "./branson-etkin-atalet-momenti";

describe("Branson Etkin Atalet Momenti", () => {
  it("Mcr 40, Ma 80, Ig 5e9, Icr 2e9: (0,5)³ = 0,125 → Ie = 2,375e9 mm⁴", () => {
    const r = bransonEtkinAtaletMomenti.compute({ mcr_kNm: 40, ma_kNm: 80, ig_mm4: 5e9, icr_mm4: 2e9 });
    expect(r.value.ie_mm4).toBeCloseTo(2.375e9, 0);
    expect(r.intermediates.ie_ig_orani as number).toBeCloseTo(0.475, 10);
  });
  it("Ma ≤ Mcr → Ie = Ig; Ma çok büyükse Ie → Icr", () => {
    expect(bransonEtkinAtaletMomenti.compute({ mcr_kNm: 40, ma_kNm: 30, ig_mm4: 5e9, icr_mm4: 2e9 }).value.ie_mm4).toBeCloseTo(5e9, 0);
    expect(bransonEtkinAtaletMomenti.compute({ mcr_kNm: 40, ma_kNm: 4000, ig_mm4: 5e9, icr_mm4: 2e9 }).value.ie_mm4 / 2e9).toBeCloseTo(1, 3);
  });
  it("Zod: Icr > Ig reddedilir", () => {
    expect(bransonEtkinAtaletMomenti.inputSchema.safeParse({ mcr_kNm: 40, ma_kNm: 80, ig_mm4: 2e9, icr_mm4: 5e9 }).success).toBe(false);
  });
});
