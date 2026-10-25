import { describe, it, expect } from "vitest";
import { dogalgazBoruBasincKaybi } from "./dogalgaz-boru-basinc-kaybi";

const kombiHatti = {
  debi_m3h: 6,
  icCap_mm: 26,
  esdegerUzunluk_m: 20,
  bagilYogunluk: 0.6,
  izinVerilenKayip_mbar: 1.5,
};

describe("Doğalgaz Boru Basınç Kaybı (Renouard)", () => {
  it("6 m³/h, D = 26 mm, Le = 20 m, S = 0,6: ΔP = 23200×0,6×20×6^1,82×26^−4,82 = 1,098 mbar → uygun", () => {
    const r = dogalgazBoruBasincKaybi.compute(kombiHatti);
    expect(r.value.basincKaybi_mbar).toBeCloseTo(1.0983, 3);
    expect(r.intermediates.gaz_hizi_ms).toBeCloseTo(3.139, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("10 m³/h, Le = 30 m: ΔP = 4,174 mbar > 1,5 mbar → uygunsuz", () => {
    const r = dogalgazBoruBasincKaybi.compute({ ...kombiHatti, debi_m3h: 10, esdegerUzunluk_m: 30 });
    expect(r.value.basincKaybi_mbar).toBeCloseTo(4.1744, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
