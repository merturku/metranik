import { describe, it, expect } from "vitest";
import {
  ciftDonatiliKirisMomentKapasitesi,
  ciftDonatiliKirisMomentKapasitesiInputSchema,
} from "./cift-donatili-kiris-moment-kapasitesi";

// C30/S420, 300 × 600 kiriş, d = 550 mm; çekme 6Ø25 (2945 mm²), basınç 2Ø20 (628 mm²)
const kiris = {
  betonKarakteristikDayanim_fck_MPa: 30,
  celikAkmaDayanimi_fyk_MPa: 420,
  genislik_b_mm: 300,
  faydaliYukseklik_d_mm: 550,
  basincDonatisiPasPayi_dp_mm: 50,
  cekmeDonatisiAlani_As_mm2: 2945,
  basincDonatisiAlani_Asp_mm2: 628,
  tasarimMomenti_Md_kNm: 400,
};

describe("Çift Donatılı Kiriş Moment Kapasitesi", () => {
  it("İki donatı da akıyor: c = (As − As')·fyd/(0,85·fcd·b·k1) = 2317 × 365,22 / 4182 = 202,35 mm, εs' = 0,00226 > εyd", () => {
    const r = ciftDonatiliKirisMomentKapasitesi.compute(kiris);
    expect(r.intermediates.k1).toBeCloseTo(0.82, 10);
    expect(r.intermediates.tarafsiz_eksen_c_mm).toBeCloseTo(202.3455, 3);
    expect(r.intermediates.basinc_donatisi_gerilmesi_MPa).toBeCloseTo(365.2174, 3);
    expect(r.intermediates.basinc_donatisi_birim_sekil_degistirme).toBeCloseTo(0.00225869, 7);
  });

  it("Mr = 4182·c·(d − k1·c/2) + As'·fyd·(d − d') = 395,21 + 114,68 = 509,89 kNm ≥ 400 → uygun", () => {
    const r = ciftDonatiliKirisMomentKapasitesi.compute(kiris);
    expect(r.value.momentKapasitesi_Mr_kNm).toBeCloseTo(509.8902, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Basınç donatısı akmıyor (As = 1473, d' = 60): 4182c² + (628·600 − 1473·fyd)c − 628·600·60 = 0 → c = 95,28 mm, σs' = 222,16 MPa, Mr = 271,94 kNm", () => {
    const r = ciftDonatiliKirisMomentKapasitesi.compute({
      ...kiris,
      cekmeDonatisiAlani_As_mm2: 1473,
      basincDonatisiPasPayi_dp_mm: 60,
      tasarimMomenti_Md_kNm: 250,
    });
    expect(r.intermediates.tarafsiz_eksen_c_mm).toBeCloseTo(95.2776, 3);
    expect(r.intermediates.basinc_donatisi_gerilmesi_MPa).toBeCloseTo(222.1567, 3);
    expect(r.value.momentKapasitesi_Mr_kNm).toBeCloseTo(271.945, 2);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Moment yetersizse (Md = 550 kNm) uygunsuz", () => {
    const r = ciftDonatiliKirisMomentKapasitesi.compute({ ...kiris, tasarimMomenti_Md_kNm: 550 });
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("8Ø25 (3927 mm²): ρ = 0,0238 > 0,02 (ρ − ρ' = 0,01999 ≤ 0,85ρb = 0,02017 olsa da) → uygunsuz; şema negatif alanı reddeder", () => {
    const r = ciftDonatiliKirisMomentKapasitesi.compute({ ...kiris, cekmeDonatisiAlani_As_mm2: 3927 });
    expect(r.intermediates.cekme_donatisi_orani_rho).toBeCloseTo(0.0238, 6);
    expect(r.intermediates.siniri_085_rhob).toBeCloseTo(0.0201677, 6);
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(r.verdict?.note).toContain("0,02");
    expect(
      ciftDonatiliKirisMomentKapasitesiInputSchema.safeParse({ ...kiris, basincDonatisiAlani_Asp_mm2: -1 }).success,
    ).toBe(false);
  });
});
