import { describe, it, expect } from "vitest";
import { ahsapKirisSehimKontrolu, ahsapKirisSehimKontroluInputSchema } from "./ahsap-kiris-sehim-kontrolu";

const kiris = {
  dayanimSinifi: "C24" as const,
  genislik_b_mm: 100,
  yukseklik_h_mm: 200,
  aciklik_L_m: 4,
  kaliciYuk_gk_kNm: 0.5,
  hareketliYuk_qk_kNm: 1.5,
  yariKaliciKatsayi_psi2: 0.3,
  servisSinifi: "1" as const,
  anlikSinirPaydasi: 300,
  nihaiSinirPaydasi: 250,
};

describe("Ahşap Kiriş Sehim Kontrolü (Sünme Dahil)", () => {
  it("C24 100×200, L = 4 m: I = 6667 cm⁴; uG = 5×0,5×4000⁴/(384×11 000×6,667·10⁷) = 2,273 mm, uQ = 6,818 mm", () => {
    const r = ahsapKirisSehimKontrolu.compute(kiris);
    expect(r.intermediates.atalet_momenti_I_cm4).toBeCloseTo(6666.667, 3);
    expect(r.intermediates.kalici_yuk_anlik_sehimi_mm).toBeCloseTo(2.27273, 5);
    expect(r.intermediates.hareketli_yuk_anlik_sehimi_mm).toBeCloseTo(6.81818, 5);
  });

  it("SS1 (kdef 0,6): wfin = 2,273×1,6 + 6,818×(1 + 0,3×0,6) = 11,68 mm ≤ 16 mm; winst 9,09 ≤ 13,33 mm → uygun", () => {
    const r = ahsapKirisSehimKontrolu.compute(kiris);
    expect(r.intermediates.toplam_anlik_sehim_mm).toBeCloseTo(9.09091, 5);
    expect(r.value.nihaiSehim_mm).toBeCloseTo(11.6818, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Açık hava SS3 (kdef 2,0): wfin = 2,273×3 + 6,818×1,6 = 17,73 mm > 16 mm → uygunsuz", () => {
    const r = ahsapKirisSehimKontrolu.compute({ ...kiris, servisSinifi: "3" });
    expect(r.value.nihaiSehim_mm).toBeCloseTo(17.7273, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Sehim h³ ile azalır: h = 250 mm'de (200/250)³ = 0,512 katı", () => {
    const r = ahsapKirisSehimKontrolu.compute({ ...kiris, yukseklik_h_mm: 250 });
    expect(r.value.nihaiSehim_mm).toBeCloseTo(11.6818 * 0.512, 4);
    expect(ahsapKirisSehimKontroluInputSchema.safeParse({ ...kiris, servisSinifi: "4" }).success).toBe(false);
  });
});
