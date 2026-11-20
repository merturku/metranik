import { describe, it, expect } from "vitest";
import { sonsuzSevStabilitesiCPhi } from "./sonsuz-sev-stabilitesi-c-phi";

describe("Sonsuz Şev (c-φ)", () => {
  const g = { kohezyon_kPa: 5, icSurtunmeAcisi_derece: 30, birimHacimAgirlik_kNm3: 18, kayma_derinligi_m: 2, sevEgimi_derece: 20, gozenekSuBasinciOrani_ru: 0, gerekliFS: 1.5 };
  it("c=5, φ=30°, γ=18, z=2, β=20°, ru=0: FS ≈ 2,02", () => {
    const r = sonsuzSevStabilitesiCPhi.compute(g);
    const sinCos = Math.sin((20 * Math.PI) / 180) * Math.cos((20 * Math.PI) / 180);
    const cos2 = Math.cos((20 * Math.PI) / 180) ** 2;
    const beklenen = (5 + 36 * cos2 * Math.tan((30 * Math.PI) / 180)) / (36 * sinCos);
    expect(r.value.guvenlikSayisi).toBeCloseTo(beklenen, 10);
    expect(r.value.guvenlikSayisi).toBeCloseTo(2.0185, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("c = 0, ru = 0 iken kohezyonsuz kapalı çözüme iner: FS = tanφ/tanβ", () => {
    const r = sonsuzSevStabilitesiCPhi.compute({ ...g, kohezyon_kPa: 0 });
    expect(r.value.guvenlikSayisi).toBeCloseTo(Math.tan((30 * Math.PI) / 180) / Math.tan((20 * Math.PI) / 180), 10);
  });
  it("gözenek suyu basıncı FS'yi düşürür; ru = 0,5 ile uygunsuz/sınırda sınıfa iner", () => {
    const a = sonsuzSevStabilitesiCPhi.compute(g).value.guvenlikSayisi;
    const r = sonsuzSevStabilitesiCPhi.compute({ ...g, gozenekSuBasinciOrani_ru: 0.5 });
    expect(r.value.guvenlikSayisi).toBeLessThan(a);
    expect(r.verdict?.status).not.toBe("uygun");
  });
});
