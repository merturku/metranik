import { describe, it, expect } from "vitest";
import { dcKabloGerilimDusumu } from "./dc-kablo-gerilim-dusumu";

describe("DC Kablo Gerilim Düşümü", () => {
  const o = { sistemGerilimi_V: 600, akim_A: 10, tekYonUzunluk_m: 50, kesit_mm2: 6, izinVerilenYuzde: 1.5 };
  it("2·0,0225·50·10/6 = 3,75 V = %0,625 → uygun; Amin = 2,5 mm²", () => {
    const r = dcKabloGerilimDusumu.compute(o);
    expect(r.value.gerilimDusumu_V).toBeCloseTo(3.75, 9);
    expect(r.intermediates.gerilim_dusumu_yuzde as number).toBeCloseTo(0.625, 9);
    expect(r.intermediates.gereken_min_kesit_mm2 as number).toBeCloseTo(2.5, 9);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("100 m, 2,5 mm² → %3 > %1,5 uygunsuz", () => {
    expect(dcKabloGerilimDusumu.compute({ ...o, tekYonUzunluk_m: 100, kesit_mm2: 2.5 }).verdict?.status).toBe("uygunsuz");
  });
});
