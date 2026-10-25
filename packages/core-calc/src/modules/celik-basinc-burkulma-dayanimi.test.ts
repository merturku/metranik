import { describe, it, expect } from "vitest";
import { celikBasincBurkulmaDayanimi, celikBasincBurkulmaDayanimiInputSchema } from "./celik-basinc-burkulma-dayanimi";

// HEA 200 profili: A = 53,8 cm², iz = 4,98 cm (zayıf eksen; hadde H profil,
// h/b ≤ 1,2, tf ≤ 100 mm, S235 → z-z ekseni için eğri c).
const hea200 = {
  celikSinifi: "S235" as const,
  kesitAlani_A_cm2: 53.8,
  ataletYaricapi_i_cm: 4.98,
  burkulmaBoyu_Lcr_m: 3,
  burkulmaEgrisi: "c" as const,
  gammaM1: 1,
  tasarimKuvveti_NEd_kN: 800,
};

describe("Çelik Basınç Elemanı Burkulma Dayanımı", () => {
  it("EN 1993-1-1 Şekil 6.4 / χ tabloları, λ̄ = 1,0: eğri a 0,6656; b 0,5970; c 0,5399; d 0,4671", () => {
    const lambda1 = Math.PI * Math.sqrt(210000 / 235);
    const lcrM = (lambda1 * 50) / 1000; // i = 5 cm → λ̄ = 1,0
    const beklenen = { a: 0.6656, b: 0.597, c: 0.5399, d: 0.4671 } as const;
    for (const egri of ["a", "b", "c", "d"] as const) {
      const r = celikBasincBurkulmaDayanimi.compute({
        ...hea200,
        ataletYaricapi_i_cm: 5,
        burkulmaBoyu_Lcr_m: lcrM,
        burkulmaEgrisi: egri,
      });
      expect(r.intermediates.boyutsuz_narinlik_lambdaBar).toBeCloseTo(1, 9);
      expect(r.intermediates.azaltma_katsayisi_chi).toBeCloseTo(beklenen[egri], 4);
    }
  });

  it("HEA 200, Lcr = 3 m, z ekseni, eğri c: λ̄ = 300/(4,98×93,91) = 0,6415, Φ = 0,8139, χ = 0,7605 → Nb,Rd = 961,6 kN → 800 kN uygun", () => {
    const r = celikBasincBurkulmaDayanimi.compute(hea200);
    expect(r.intermediates.referans_narinlik_lambda1).toBeCloseTo(93.913, 3);
    expect(r.intermediates.boyutsuz_narinlik_lambdaBar).toBeCloseTo(0.64146, 4);
    expect(r.intermediates.phi).toBeCloseTo(0.81393, 4);
    expect(r.intermediates.azaltma_katsayisi_chi).toBeCloseTo(0.76055, 4);
    expect(r.value.burkulmaDayanimi_NbRd_kN).toBeCloseTo(961.56, 1);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Kısa eleman λ̄ ≤ 0,2: χ = 1, Nb,Rd = A·fy/γM1 = 5380×235 = 1264,3 kN; 1300 kN uygunsuz", () => {
    const r = celikBasincBurkulmaDayanimi.compute({ ...hea200, burkulmaBoyu_Lcr_m: 0.9, tasarimKuvveti_NEd_kN: 1300 });
    expect(r.intermediates.boyutsuz_narinlik_lambdaBar as number).toBeLessThanOrEqual(0.2);
    expect(r.intermediates.azaltma_katsayisi_chi).toBe(1);
    expect(r.value.burkulmaDayanimi_NbRd_kN).toBeCloseTo(1264.3, 6);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Bilinmeyen burkulma eğrisi reddedilir", () => {
    expect(celikBasincBurkulmaDayanimiInputSchema.safeParse({ ...hea200, burkulmaEgrisi: "e" }).success).toBe(false);
  });
});
