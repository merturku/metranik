import { describe, it, expect } from "vitest";
import { sogutmaKulesiMakyajSuyu } from "./sogutma-kulesi-makyaj-suyu";

describe("Soğutma Kulesi Makyaj Suyu", () => {
  const o = { dolasimDebisi_m3h: 100, rangeSicakligi_K: 5, yogunlasmaCevrimi: 4, suruklenmeYuzde: 0.005 };
  it("E = 100·4,186·5/2430 ≈ 0,861 m³/h; M = E·4/3 ≈ 1,148 m³/h", () => {
    const r = sogutmaKulesiMakyajSuyu.compute(o);
    expect(r.intermediates.buharlasma_m3h as number).toBeCloseTo(0.8613, 3);
    expect(r.value.makyajSuyu_m3h).toBeCloseTo(1.1484, 3);
  });
  it("M = E + B + D kütle dengesi", () => {
    const r = sogutmaKulesiMakyajSuyu.compute(o);
    const i = r.intermediates as Record<string, number>;
    expect((i.buharlasma_m3h as number) + (i.blof_m3h as number) + (i.suruklenme_m3h as number)).toBeCloseTo(r.value.makyajSuyu_m3h, 9);
  });
});
