import { describe, expect, it } from "vitest";
import { karYukuHesabi } from "./kar-yuku-hesabi";

describe("kar-yuku-hesabi", () => {
  // S = 0.8 × 1.0 × 1.0 × 0.75 = 0.6 kN/m², bağımsız doğrulanabilir (EN 1991-1-3 formülü).
  it("μ=0.8, Ce=1.0, Ct=1.0, Sk=0.75 kN/m² için kar yükünü hesaplar", () => {
    const r = karYukuHesabi.compute({
      sekilKatsayisi_mu: 0.8,
      maruziyetKatsayisi_Ce: 1.0,
      isilKatsayi_Ct: 1.0,
      zeminKarYuku_Sk_kNm2: 0.75,
    });

    expect(r.value.karYuku_kNm2).toBeCloseTo(0.6, 5);
  });
});
