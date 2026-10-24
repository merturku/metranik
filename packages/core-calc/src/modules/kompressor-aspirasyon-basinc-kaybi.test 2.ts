import { describe, it, expect } from "vitest";
import { kompressorAspirasyanBasincKaybi } from "./kompressor-aspirasyon-basinc-kaybi";

describe("Kompresör Aspirasyon Basınç Kaybı", () => {
  it("ISO 4414: 100 m³/min, D=50mm, L=2m → v=85.05 m/s, ΔP≈5.2 kPa, yetersiz", () => {
    const r = kompressorAspirasyanBasincKaybi.compute({
      debi_m3min: 100,
      emme_boru_capı_mm: 50,
      emme_boru_uzunlugu_m: 2,
      max_basinc_kaybi_kPa: 5,
    });

    expect(r.value.basinc_kaybi_kPa).toBeCloseTo(5.2, 0);
    expect(r.value.verdict?.status).toBe("yetersiz");
  });

  it("Uygun: 50 m³/min, D=50mm, L=2m → v=42.5 m/s, ΔP≈1.3 kPa, uygun", () => {
    const r = kompressorAspirasyanBasincKaybi.compute({
      debi_m3min: 50,
      emme_boru_capı_mm: 50,
      emme_boru_uzunlugu_m: 2,
      max_basinc_kaybi_kPa: 5,
    });

    expect(r.value.basinc_kaybi_kPa).toBeCloseTo(1.3, 0);
    expect(r.value.verdict?.status).toBe("uygun");
  });
});
