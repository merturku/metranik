import { describe, it, expect } from "vitest";
import { kirisDonatiOraniKontrolu } from "./kiris-donati-orani-kontrolu";

const kiris = {
  betonKarakteristikDayanim_fck_MPa: 25,
  celikAkmaDayanimi_fyk_MPa: 420,
  govdeGenisligi_bw_mm: 300,
  faydaliYukseklik_d_mm: 550,
  cekmeDonatisiAlani_As_mm2: 603,
};

describe("Kiriş Donatı Oranı Sınırları Kontrolü (TS 500 §7.3)", () => {
  it("C25/S420, 300×550, 3Ø16 = 603 mm²: ρ = 0,00365; ρmin = 0,8×1,1667/365,22 = 0,00256; ρb = 0,02050; ρmax = 0,01742 → uygun", () => {
    const r = kirisDonatiOraniKontrolu.compute(kiris);
    expect(r.value.donatiOrani).toBeCloseTo(0.003655, 5);
    expect(r.intermediates.minimum_donati_orani).toBeCloseTo(0.0025556, 6);
    expect(r.intermediates.dengeli_donati_orani_rhob).toBeCloseTo(0.020496, 5);
    expect(r.intermediates.maksimum_donati_orani).toBeCloseTo(0.017422, 5);
    expect(r.intermediates.minimum_donati_alani_mm2).toBeCloseTo(421.67, 1);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("2Ø16 = 402 mm²: ρ = 0,00244 < ρmin → uygunsuz", () => {
    const r = kirisDonatiOraniKontrolu.compute({ ...kiris, cekmeDonatisiAlani_As_mm2: 402 });
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("As = 3000 mm² (ρ = 0,01818): C25'te 0,85ρb = 0,01742 aşılır → uygunsuz; C35'te k1 = 0,79, 0,85ρb = 0,02267 > 0,02 → ρmax = 0,02, uygun", () => {
    const c25 = kirisDonatiOraniKontrolu.compute({ ...kiris, cekmeDonatisiAlani_As_mm2: 3000 });
    expect(c25.verdict?.status).toBe("uygunsuz");

    const c35 = kirisDonatiOraniKontrolu.compute({
      ...kiris,
      betonKarakteristikDayanim_fck_MPa: 35,
      cekmeDonatisiAlani_As_mm2: 3000,
    });
    expect(c35.intermediates.k1).toBeCloseTo(0.79, 4);
    expect(c35.intermediates.maksimum_donati_orani).toBe(0.02);
    expect(c35.verdict?.status).toBe("uygun");
  });
});
