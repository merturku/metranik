import { describe, expect, it } from "vitest";
import { yanginDolabiDebiBasinc } from "./yangin-dolabi-debi-basinc";

describe("yangin-dolabi-debi-basinc", () => {
  it("TS 9811: 13mm lüle, 2 bar, Cd=0.97, min 100 L/min → ~154.5 L/min, uygun", () => {
    const r = yanginDolabiDebiBasinc.compute({
      luleCapi_mm: 13,
      basinc_bar: 2,
      debiKatsayisi_Cd: 0.97,
      izinVerilenMinimumDebi_Lmin: 100,
    });

    expect(r.value.debi_Lmin).toBeCloseTo(154.5, 1);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("düşük basınçta (0.8 bar) debi asgari sınırın altında kalır → uygunsuz", () => {
    const r = yanginDolabiDebiBasinc.compute({
      luleCapi_mm: 13,
      basinc_bar: 0.8,
      debiKatsayisi_Cd: 0.97,
      izinVerilenMinimumDebi_Lmin: 100,
    });

    expect(r.value.debi_Lmin).toBeCloseTo(97.71, 1);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
