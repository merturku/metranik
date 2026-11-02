import { describe, it, expect } from "vitest";
import { farkBasincliDebimetre } from "./fark-basincli-debimetre";

describe("Fark Basınçlı Debi Ölçer", () => {
  it("D 100, d 50, Δp 10 kPa, su, C 0,6 → qm ≈ 5,44 kg/s ≈ 19,6 m³/h", () => {
    const r = farkBasincliDebimetre.compute({
      boruIcCapi_mm: 100, daralmaCapi_mm: 50, farkBasinc_Pa: 10000, yogunluk_kgm3: 1000, boşaltimKatsayisi: 0.6,
    });
    expect(r.intermediates.beta).toBeCloseTo(0.5, 9);
    expect(r.intermediates.kutlesel_debi_kgs as number).toBeCloseTo(5.44, 1);
    expect(r.value.debi_m3h).toBeCloseTo(19.6, 1);
  });
  it("debi √Δp ile ölçeklenir (Δp ×4 → debi ×2)", () => {
    const o = { boruIcCapi_mm: 100, daralmaCapi_mm: 50, yogunluk_kgm3: 1000, boşaltimKatsayisi: 0.6 };
    const a = farkBasincliDebimetre.compute({ ...o, farkBasinc_Pa: 5000 }).value.debi_m3h;
    const b = farkBasincliDebimetre.compute({ ...o, farkBasinc_Pa: 20000 }).value.debi_m3h;
    expect(b / a).toBeCloseTo(2, 9);
  });
});
