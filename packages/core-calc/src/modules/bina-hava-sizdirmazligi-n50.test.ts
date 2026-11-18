import { describe, it, expect } from "vitest";
import { binaHavaSizdirmazligiN50 } from "./bina-hava-sizdirmazligi-n50";

describe("Bina Hava Sızdırmazlığı (n50)", () => {
  const g = { q50_m3h: 1800, hacim_m3: 300, zarfAlani_m2: 350, korumaKatsayisi: 20, sinirN50: 3 };
  it("1800 m³/h @ 50 Pa, 300 m³, 350 m²: n50 = 6,0; q50 = 5,143; infiltrasyon 0,3 1/h = 90 m³/h", () => {
    const r = binaHavaSizdirmazligiN50.compute(g);
    expect(r.value.n50).toBeCloseTo(6, 10);
    expect(r.intermediates.zarf_debisi_q50_m3hm2 as number).toBeCloseTo(5.142857, 5);
    expect(r.intermediates.dogal_infiltrasyon_1h as number).toBeCloseTo(0.3, 10);
    expect(r.intermediates.infiltrasyon_debisi_m3h as number).toBeCloseTo(90, 8);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("600 m³/h → n50 = 2,0 ≤ 3 → uygun; sınırda eşitlik uygun", () => {
    expect(binaHavaSizdirmazligiN50.compute({ ...g, q50_m3h: 600 }).verdict?.status).toBe("uygun");
    expect(binaHavaSizdirmazligiN50.compute({ ...g, q50_m3h: 900 }).verdict?.status).toBe("uygun");
  });
});
