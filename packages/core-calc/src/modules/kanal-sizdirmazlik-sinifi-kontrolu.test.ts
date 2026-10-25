import { describe, it, expect } from "vitest";
import { kanalSizdirmazlikSinifiKontrolu } from "./kanal-sizdirmazlik-sinifi-kontrolu";

const test400Pa = {
  testBasinci_Pa: 400,
  kanalYuzeyAlani_m2: 50,
  olculenSizinti_Ls: 15,
  hedefSinif: "B" as const,
};

describe("Kanal Sızdırmazlık Sınıfı Kontrolü (EN 12237 / EN 1507)", () => {
  it("400 Pa, 50 m², 15 L/s, Sınıf B: f = 0,300; fmax = 0,009×400^0,65 = 0,442 → uygun, ulaşılan B", () => {
    const r = kanalSizdirmazlikSinifiKontrolu.compute(test400Pa);
    expect(r.value.sizintiFaktoru_Lsm2).toBeCloseTo(0.3, 4);
    expect(r.intermediates.izinVerilenSizintiFaktoru_Lsm2).toBeCloseTo(0.4422, 4);
    expect(r.intermediates.izinVerilenSizinti_Ls).toBeCloseTo(22.11, 2);
    expect(r.intermediates.saglananEnIyiSinif).toBe("B");
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Aynı kanal 30 L/s: f = 0,600 > 0,442 → Sınıf B uygunsuz, A sınırı 1,327 içinde", () => {
    const r = kanalSizdirmazlikSinifiKontrolu.compute({ ...test400Pa, olculenSizinti_Ls: 30 });
    expect(r.value.sizintiFaktoru_Lsm2).toBeCloseTo(0.6, 4);
    expect(r.intermediates.saglananEnIyiSinif).toBe("A");
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("1000 Pa, 20 m², 1,5 L/s, Sınıf D: f = 0,075 ≤ 0,001×1000^0,65 = 0,0891 → uygun", () => {
    const r = kanalSizdirmazlikSinifiKontrolu.compute({
      testBasinci_Pa: 1000,
      kanalYuzeyAlani_m2: 20,
      olculenSizinti_Ls: 1.5,
      hedefSinif: "D",
    });
    expect(r.intermediates.izinVerilenSizintiFaktoru_Lsm2).toBeCloseTo(0.0891, 4);
    expect(r.intermediates.saglananEnIyiSinif).toBe("D");
    expect(r.verdict?.status).toBe("uygun");
  });
});
