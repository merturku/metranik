import { describe, it, expect } from "vitest";
import { hendekKaziHacmi } from "./hendek-kazi-hacmi";

describe("Hendek Kazı Hacmi", () => {
  it("L 100, h 2, b 1, m 0,5 → A = 4 m², V = 400 m³, üst genişlik 3 m, %25 kabarma → 500 m³", () => {
    const r = hendekKaziHacmi.compute({ uzunluk_m: 100, derinlik_m: 2, tabanGenisligi_m: 1, sevOrani: 0.5, kabarmaYuzde: 25 });
    expect(r.intermediates.kesit_alani_m2 as number).toBeCloseTo(4, 9);
    expect(r.value.kaziHacmi_m3).toBeCloseTo(400, 9);
    expect(r.intermediates.ust_genislik_m as number).toBeCloseTo(3, 9);
    expect(r.intermediates.gevsek_hacim_m3 as number).toBeCloseTo(500, 9);
  });
  it("dik kazı (m 0): V = b·h·L ve şev açısı 90°", () => {
    const r = hendekKaziHacmi.compute({ uzunluk_m: 10, derinlik_m: 1.5, tabanGenisligi_m: 0.8, sevOrani: 0, kabarmaYuzde: 0 });
    expect(r.value.kaziHacmi_m3).toBeCloseTo(12, 9);
    expect(r.intermediates.sev_acisi_derece).toBe(90);
  });
});
