import { describe, it, expect } from "vitest";
import { elastikZeminUzerindeKirisHetenyi } from "./elastik-zemin-uzerinde-kiris-hetenyi";

describe("Elastik Zemin Üzerinde Kiriş (Hetényi)", () => {
  const g = { E_MPa: 30000, I_cm4: 720000, genislik_b_m: 0.4, yatakKatsayisi_ks_kNm3: 20000, yuk_P_kN: 500, kirisBoyu_L_m: 20 };
  it("EI = 216 000 kNm², λ = 0,3102 1/m, y0 = 9,69 mm, M0 = 402,96 kNm, q0 = 193,9 kPa", () => {
    const r = elastikZeminUzerindeKirisHetenyi.compute(g);
    expect(r.intermediates.EI_kNm2 as number).toBeCloseTo(216000, 6);
    expect(r.intermediates.lambda_1m as number).toBeCloseTo(0.310202, 5);
    expect(r.intermediates.maks_cokme_mm as number).toBeCloseTo(9.6938, 3);
    expect(r.value.maksimumMoment_kNm).toBeCloseTo(402.964, 2);
    expect(r.intermediates.maks_zemin_gerilmesi_kPa as number).toBeCloseTo(193.876, 2);
    expect(r.verdict?.status).toBe("uygun"); // λL = 6,2 ≥ π
  });
  it("denge: zemin tepkisinin integrali yüke eşit (q0·b·2/λ = P)", () => {
    const r = elastikZeminUzerindeKirisHetenyi.compute(g);
    const q0 = r.intermediates.maks_zemin_gerilmesi_kPa as number;
    const lam = r.intermediates.lambda_1m as number;
    // ∫ e^(−λ|x|)(cos λx + sin λx) dx = 2/λ (iki yön)
    expect(q0 * g.genislik_b_m * (2 / lam)).toBeCloseTo(g.yuk_P_kN, 6);
  });
  it("λL sınıfları: L = 6 m → 1,86 sınırda; L = 2 m → 0,62 < π/4 uygunsuz", () => {
    expect(elastikZeminUzerindeKirisHetenyi.compute({ ...g, kirisBoyu_L_m: 6 }).verdict?.status).toBe("sinirda");
    expect(elastikZeminUzerindeKirisHetenyi.compute({ ...g, kirisBoyu_L_m: 2 }).verdict?.status).toBe("uygunsuz");
  });
});
