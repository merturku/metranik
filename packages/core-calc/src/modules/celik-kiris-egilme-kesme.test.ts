import { describe, it, expect } from "vitest";
import { celikKirisEgilmeKesme, celikKirisEgilmeKesmeInputSchema } from "./celik-kiris-egilme-kesme";

// IPE 300 (sınıf 1, S235): Wpl,y = 628,4 cm³, Av,z = 25,68 cm², tf = 10,7 mm,
// hw = 300 − 2×10,7 = 278,6 mm, tw = 7,1 mm.
const ipe300 = {
  celikSinifi: "S235" as const,
  plastikMukavemetMomenti_Wpl_cm3: 628.4,
  kesmeAlani_Av_cm2: 25.68,
  govdeYuksekligi_hw_mm: 278.6,
  govdeKalinligi_tw_mm: 7.1,
  tasarimMomenti_MEd_kNm: 120,
  tasarimKesmesi_VEd_kN: 100,
  gammaM0: 1,
};

describe("Çelik Kiriş Eğilme ve Kesme Dayanımı", () => {
  it("IPE 300 S235: Mc,Rd = 628 400 × 235 = 147,67 kNm; Vpl,Rd = 2568 × 235/√3 = 348,42 kN; düşük kesmede azaltma yok → uygun", () => {
    const r = celikKirisEgilmeKesme.compute(ipe300);
    expect(r.intermediates.plastik_moment_dayanimi_McRd_kNm).toBeCloseTo(147.674, 3);
    expect(r.intermediates.plastik_kesme_dayanimi_VplRd_kN).toBeCloseTo(348.419, 3);
    expect(r.intermediates.kesme_azaltma_katsayisi_rho).toBe(0);
    expect(r.value.egilmeDayanimi_kNm).toBeCloseTo(147.674, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("VEd = 250 kN > 0,5Vpl = 174,2: ρ = (500/348,42 − 1)² = 0,1893 → My,V,Rd = (628 400 − 0,1893×278,6²×7,1/4)×235 = 141,55 kNm", () => {
    const r = celikKirisEgilmeKesme.compute({ ...ipe300, tasarimKesmesi_VEd_kN: 250, tasarimMomenti_MEd_kNm: 140 });
    expect(r.intermediates.kesme_azaltma_katsayisi_rho).toBeCloseTo(0.18927, 5);
    expect(r.value.egilmeDayanimi_kNm).toBeCloseTo(141.546, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Aynı kesmede MEd = 145 kNm: Mc,Rd'nin altında ama azaltılmış 141,55 kNm'nin üstünde → uygunsuz", () => {
    const r = celikKirisEgilmeKesme.compute({ ...ipe300, tasarimKesmesi_VEd_kN: 250, tasarimMomenti_MEd_kNm: 145 });
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("VEd > Vpl,Rd → uygunsuz; ince gövde (hw/tw = 278,6/3 = 92,9 > 72) → sınırda", () => {
    expect(celikKirisEgilmeKesme.compute({ ...ipe300, tasarimKesmesi_VEd_kN: 400 }).verdict?.status).toBe("uygunsuz");
    const ince = celikKirisEgilmeKesme.compute({ ...ipe300, govdeKalinligi_tw_mm: 3 });
    expect(ince.intermediates.govde_siniri_72eps).toBeCloseTo(72, 12);
    expect(ince.verdict?.status).toBe("sinirda");
  });

  it("S355'te 72ε = 72×√(235/355) = 58,58", () => {
    const r = celikKirisEgilmeKesme.compute({ ...ipe300, celikSinifi: "S355" });
    expect(r.intermediates.govde_siniri_72eps).toBeCloseTo(58.58, 2);
    expect(celikKirisEgilmeKesmeInputSchema.safeParse({ ...ipe300, gammaM0: 0 }).success).toBe(false);
  });
});
