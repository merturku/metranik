import { describe, it, expect } from "vitest";
import { pompaCarkiKesme } from "./pompa-carki-kesme";

describe("Pompa Çarkı Tıraşlama", () => {
  const o = { orijinalCap_mm: 250, kesilmisCap_mm: 225, debi_m3h: 100, basma_mSS: 30, guc_kW: 15 };
  it("r = 0,9: Q 90, H 24,3, P 10,935", () => {
    const r = pompaCarkiKesme.compute(o);
    expect(r.value.debi_m3h).toBeCloseTo(90, 9);
    expect(r.value.basma_mSS).toBeCloseTo(24.3, 9);
    expect(r.value.guc_kW).toBeCloseTo(10.935, 9);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("r = 0,72 → sınırda; r = 0,6 → uygunsuz", () => {
    expect(pompaCarkiKesme.compute({ ...o, kesilmisCap_mm: 180 }).verdict?.status).toBe("sinirda");
    expect(pompaCarkiKesme.compute({ ...o, kesilmisCap_mm: 150 }).verdict?.status).toBe("uygunsuz");
  });
});
