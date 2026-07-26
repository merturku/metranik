import { describe, expect, it } from "vitest";
import { kompanzasyonKondansatorAkimi } from "./kompanzasyon-kondansator-akimi";

describe("kompanzasyonKondansatorAkimi", () => {
  it("Qc=100 kVAr, V=400V → Ic≈144.34 A", () => {
    const r = kompanzasyonKondansatorAkimi.compute({
      reaktifGuc_Qc_kVAr: 100,
      hatGerilimi_V_V: 400,
    });
    expect(r.value.hatAkimi_Ic_A).toBeCloseTo(144.3376, 3);
  });
});
