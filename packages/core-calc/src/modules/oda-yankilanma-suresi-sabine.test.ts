import { describe, it, expect } from "vitest";
import { odaYankilanmaSuresiSabine } from "./oda-yankilanma-suresi-sabine";

const g = { hacim_m3: 100, yuzey1_m2: 50, yuzey1_alfa: 0.05, yuzey2_m2: 40, yuzey2_alfa: 0.1, yuzey3_m2: 20, yuzey3_alfa: 0.3, hedefT60_s: 1.5 };

describe("Oda Yankılanma Süresi (Sabine)", () => {
  it("V = 100 m³, A = 2,5 + 4 + 6 = 12,5 m² → T60 = 0,161·100/12,5 = 1,288 s; uygun", () => {
    const r = odaYankilanmaSuresiSabine.compute(g);
    expect(r.intermediates.toplam_yutum_alani_A_m2 as number).toBeCloseTo(12.5, 8);
    expect(r.value.t60_s as number).toBeCloseTo(1.288, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("hedef 0,6 s için A = 26,83 m² → ek yutum 14,33 m²; sınıflandırma", () => {
    const r = odaYankilanmaSuresiSabine.compute({ ...g, hedefT60_s: 0.6 });
    expect(r.intermediates.hedef_icin_gerekli_A_m2 as number).toBeCloseTo(26.833, 2);
    expect(r.intermediates.eklenmesi_gereken_yutum_m2 as number).toBeCloseTo(14.333, 2);
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(odaYankilanmaSuresiSabine.compute({ ...g, hedefT60_s: 1.15 }).verdict?.status).toBe("sinirda");
  });
  it("yutum yoksa null + uygunsuz", () => {
    const r = odaYankilanmaSuresiSabine.compute({ ...g, yuzey1_alfa: 0, yuzey2_alfa: 0, yuzey3_alfa: 0 });
    expect(r.value.t60_s).toBeNull();
  });
});
