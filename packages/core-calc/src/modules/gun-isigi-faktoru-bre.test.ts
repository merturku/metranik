import { describe, it, expect } from "vitest";
import { gunIsigiFaktoruBre } from "./gun-isigi-faktoru-bre";

describe("Gün Işığı Faktörü (BRE)", () => {
  const g = { camAlani_m2: 2, camGecirgenligi: 0.7, gokyuzuAcisi_derece: 60, bakimFaktoru: 0.9, odaToplamYuzeyAlani_m2: 60, ortalamaYansima: 0.5 };
  it("Aw=2, T=0,7, θ=60°, M=0,9, A=60, R=0,5: DF = %1,68", () => {
    const r = gunIsigiFaktoruBre.compute(g);
    expect(r.value.gunIsigiFaktoru_yuzde).toBeCloseTo(1.68, 6);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("cam alanı iki katına çıkınca DF iki katı, %3,36 sınırda", () => {
    const r = gunIsigiFaktoruBre.compute({ ...g, camAlani_m2: 4 });
    expect(r.value.gunIsigiFaktoru_yuzde).toBeCloseTo(3.36, 6);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("yüksek yansıma DF'yi artırır; ≥ %5 uygun", () => {
    const r = gunIsigiFaktoruBre.compute({ ...g, camAlani_m2: 7, ortalamaYansima: 0.6 });
    expect(r.value.gunIsigiFaktoru_yuzde).toBeCloseTo((7 * 0.7 * 60 * 0.9) / (60 * 0.64), 8);
    expect(r.verdict?.status).toBe("uygun");
  });
});
