import { describe, expect, it } from "vitest";
import { donatiKenetlenmeBoyu } from "./donati-kenetlenme-boyu";

describe("donati-kenetlenme-boyu", () => {
  it("TS 500/TBDY 2018: C25/B420C, φ16, η=1.0 → ~1252 mm", () => {
    const r = donatiKenetlenmeBoyu.compute({
      betonKarakteristikDayanim_fck_MPa: 25,
      celikAkmaDayanimi_fyk_MPa: 420,
      donatiCapi_mm: 16,
      pozisyonKatsayisi_eta: 1.0,
    });

    expect(r.intermediates.celikHesapDayanimi_fyd_MPa).toBeCloseTo(365.217, 2);
    expect(r.intermediates.aderansGerilmesi_fbd_MPa).toBeCloseTo(1.1667, 3);
    expect(r.value.kenetlenmeBoyu_mm).toBeCloseTo(1252.17, 1);
  });

  it("kötü pozisyon katsayısı (η<1) kenetlenme boyunu artırır", () => {
    const iyi = donatiKenetlenmeBoyu.compute({
      betonKarakteristikDayanim_fck_MPa: 25,
      celikAkmaDayanimi_fyk_MPa: 420,
      donatiCapi_mm: 16,
      pozisyonKatsayisi_eta: 1.0,
    });
    const kotu = donatiKenetlenmeBoyu.compute({
      betonKarakteristikDayanim_fck_MPa: 25,
      celikAkmaDayanimi_fyk_MPa: 420,
      donatiCapi_mm: 16,
      pozisyonKatsayisi_eta: 0.7,
    });

    expect(kotu.value.kenetlenmeBoyu_mm).toBeGreaterThan(iyi.value.kenetlenmeBoyu_mm);
  });
});
