import { describe, it, expect } from "vitest";
import { kompressorAspirasyanBasincKaybi } from "./kompressor-aspirasyon-basinc-kaybi";

describe("Kompresör Aspirasyon Basınç Kaybı", () => {
  it("10 m³/dk, D=100 mm, L=10 m, f=0,02: V = 21,22 m/s, ΔP = 0,02×100×270,2 = 540 Pa → uygun", () => {
    const r = kompressorAspirasyanBasincKaybi.compute({
      debi_m3min: 10,
      emme_boru_capı_mm: 100,
      emme_boru_uzunlugu_m: 10,
      surtunme_katsayisi_f: 0.02,
      max_basinc_kaybi_kPa: 5,
    });

    expect(r.intermediates.hava_hizi_ms).toBeCloseTo(21.221, 2);
    expect(r.value.basinc_kaybi_Pa).toBeCloseTo(540.4, 0);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("10 m³/dk, D=60 mm, L=10 m, f=0,02: V = 58,95 m/s, ΔP = 6,95 kPa > 5 kPa → uygunsuz", () => {
    const r = kompressorAspirasyanBasincKaybi.compute({
      debi_m3min: 10,
      emme_boru_capı_mm: 60,
      emme_boru_uzunlugu_m: 10,
      surtunme_katsayisi_f: 0.02,
      max_basinc_kaybi_kPa: 5,
    });

    expect(r.intermediates.hava_hizi_ms).toBeCloseTo(58.946, 2);
    expect(r.value.basinc_kaybi_kPa).toBeCloseTo(6.949, 2);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
