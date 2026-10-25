import { describe, it, expect } from "vitest";
import { bulonluBirlesimKesmeEzilme, bulonluBirlesimKesmeEzilmeInputSchema } from "./bulonlu-birlesim-kesme-ezilme";

// M20 8.8, diş düzleminde tek kesme, S235 10 mm levha, d0 = 22 mm,
// e1 = 40, p1 = 70, e2 = 35 mm, kuvvet yönünde 2 bulon, tek sıra.
const birlesim = {
  bulonCapi: "M20" as const,
  bulonSinifi: "8.8" as const,
  kesmeDuzlemi: "dis" as const,
  kesmeDuzlemiSayisi: 1,
  levhaCelikSinifi: "S235" as const,
  levhaKalinligi_t_mm: 10,
  ucMesafesi_e1_mm: 40,
  bulonAraligi_p1_mm: 70,
  kenarMesafesi_e2_mm: 35,
  siraAraligi_p2_mm: 60,
  kuvvetYonundeBulonSayisi_n1: 2,
  siraSayisi_n2: 1,
  tasarimKuvveti_FEd_kN: 150,
  gammaM2: 1.25,
};

describe("Bulonlu Birleşim Kesme ve Ezilme Dayanımı", () => {
  it("Fv,Rd = 0,6×800×245/1,25 = 94,08 kN; αd = min(40/66; 70/66 − 0,25) = 0,6061, k1 = min(2,8×35/22 − 1,7; 2,5) = 2,5 → Fb,Rd = 2,5×0,6061×360×20×10/1,25 = 87,27 kN", () => {
    const r = bulonluBirlesimKesmeEzilme.compute(birlesim);
    expect(r.intermediates.bulon_kesme_dayanimi_FvRd_kN).toBeCloseTo(94.08, 9);
    expect(r.intermediates.alfa_d).toBeCloseTo(40 / 66, 12);
    expect(r.intermediates.k1).toBe(2.5);
    expect(r.intermediates.levha_ezilme_dayanimi_FbRd_kN).toBeCloseTo(87.2727, 4);
    expect(r.value.grupDayanimi_kN).toBeCloseTo(174.5455, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("10.9 diş düzleminde αv = 0,5 → 0,5×1000×245/1,25 = 98,0 kN; 8.8 gövde düzleminde iki kesme 2×0,6×800×π×20²/4/1,25 = 241,27 kN", () => {
    const r109 = bulonluBirlesimKesmeEzilme.compute({ ...birlesim, bulonSinifi: "10.9" });
    expect(r109.intermediates.bulon_kesme_dayanimi_FvRd_kN).toBeCloseTo(98.0, 9);
    const govde = bulonluBirlesimKesmeEzilme.compute({ ...birlesim, kesmeDuzlemi: "govde", kesmeDuzlemiSayisi: 2 });
    expect(govde.intermediates.bulon_kesme_dayanimi_FvRd_kN).toBeCloseTo(241.2743, 4);
  });

  it("İki sıra, p2 = 60 mm: k1 = min(2,7545; 1,4×60/22 − 1,7 = 2,1182; 2,5) → Fb,Rd = 73,94 kN; 4 bulon → 295,8 kN", () => {
    const r = bulonluBirlesimKesmeEzilme.compute({ ...birlesim, siraSayisi_n2: 2 });
    expect(r.intermediates.k1).toBeCloseTo(2.11818, 5);
    expect(r.intermediates.levha_ezilme_dayanimi_FbRd_kN).toBeCloseTo(73.9438, 4);
    expect(r.value.grupDayanimi_kN).toBeCloseTo(295.7752, 3);
  });

  it("Uzun birleşim: 6 bulon, p1 = 70 → Lj = 350 > 15d = 300 → βLf = 1 − 50/4000 = 0,9875", () => {
    const r = bulonluBirlesimKesmeEzilme.compute({ ...birlesim, kuvvetYonundeBulonSayisi_n1: 6 });
    expect(r.intermediates.uzun_birlesim_betaLf).toBeCloseTo(0.9875, 12);
    expect(r.intermediates.bulon_kesme_dayanimi_FvRd_kN).toBeCloseTo(94.08 * 0.9875, 9);
  });

  it("e1 = 25 mm < 1,2×22 = 26,4 mm → uygunsuz; bilinmeyen bulon çapı reddedilir", () => {
    expect(bulonluBirlesimKesmeEzilme.compute({ ...birlesim, ucMesafesi_e1_mm: 25 }).verdict?.status).toBe("uygunsuz");
    expect(bulonluBirlesimKesmeEzilmeInputSchema.safeParse({ ...birlesim, bulonCapi: "M18" }).success).toBe(false);
  });
});
