import { describe, it, expect } from "vitest";
import { kritikYalitimYaricapi } from "./kritik-yalitim-yaricapi";

const g = { boruDisYaricapi_r1_mm: 2, yalitimIletkenligi_lambda_WmK: 0.04, disTasinimKatsayisi_h_Wm2K: 10, yalitimDisYaricapi_r2_mm: 4, sicaklikFarki_K: 50 };

describe("Kritik Yalıtım Yarıçapı", () => {
  it("λ = 0,04, h = 10 → r_kr = 4 mm; r1 = 2 mm; r2 = 4 mm'de kayıp 7,42 W/m > çıplak 6,28 W/m → uygunsuz", () => {
    const r = kritikYalitimYaricapi.compute(g);
    expect(r.value.kritikYaricap_mm).toBeCloseTo(4, 8);
    expect(r.intermediates.ciplak_isi_kaybi_Wm as number).toBeCloseTo(6.2832, 3);
    expect(r.intermediates.yalitimli_isi_kaybi_Wm as number).toBeCloseTo(7.422, 2);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("eşitlik yarıçapı ≈ 9,84 mm; orada yalıtımlı kayıp = çıplak kayıp; 15 mm'de kayıp azalır → uygun", () => {
    const r = kritikYalitimYaricapi.compute(g);
    const req = r.intermediates.esitlik_yaricapi_mm as number;
    expect(req).toBeCloseTo(9.84, 1);
    const e = kritikYalitimYaricapi.compute({ ...g, yalitimDisYaricapi_r2_mm: req });
    expect(e.intermediates.yalitimli_isi_kaybi_Wm as number).toBeCloseTo(e.intermediates.ciplak_isi_kaybi_Wm as number, 3);
    expect(kritikYalitimYaricapi.compute({ ...g, yalitimDisYaricapi_r2_mm: 15 }).verdict?.status).toBe("uygun");
  });
  it("r1 ≥ r_kr (r1 = 25 mm) → yalıtım her zaman azaltır; r2 ≤ r1 geçersiz", () => {
    const r = kritikYalitimYaricapi.compute({ ...g, boruDisYaricapi_r1_mm: 25, yalitimDisYaricapi_r2_mm: 50 });
    expect(r.verdict?.status).toBe("uygun");
    expect(String(r.intermediates.esitlik_yaricapi_mm)).toContain("her zaman");
    expect(kritikYalitimYaricapi.compute({ ...g, yalitimDisYaricapi_r2_mm: 2 }).verdict?.status).toBe("uygunsuz");
  });
});
