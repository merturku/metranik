import { describe, it, expect } from "vitest";
import { motorKalkisGerilimDusumu } from "./motor-kalkis-gerilim-dusumu";

describe("Motor Kalkışında Gerilim Düşümü", () => {
  const o = { hatGerilimi_V: 400, kalkisAkimi_A: 300, kabloUzunlugu_m: 100, direnc_ohmkm: 0.3, reaktans_ohmkm: 0.08, kalkisCosPhi: 0.35, izinVerilenYuzde: 10 };
  it("√3·300·0,1·(0,3·0,35+0,08·0,9367) ≈ 9,35 V = %2,34 → uygun", () => {
    const r = motorKalkisGerilimDusumu.compute(o);
    expect(r.value.gerilimDusumu_V).toBeCloseTo(9.35, 1);
    expect(r.intermediates.gerilim_dusumu_yuzde as number).toBeCloseTo(2.34, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("500 m kablo → %11,7 > %10 uygunsuz", () => {
    expect(motorKalkisGerilimDusumu.compute({ ...o, kabloUzunlugu_m: 500 }).verdict?.status).toBe("uygunsuz");
  });
});
