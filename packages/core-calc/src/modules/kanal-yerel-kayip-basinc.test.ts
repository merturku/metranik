import { describe, it, expect } from "vitest";
import { kanalYerelKayipBasinc } from "./kanal-yerel-kayip-basinc";

describe("Kanal Fiting Yerel Basınç Kaybı", () => {
  it("3600 m³/h, 0,25 m², ΣC = 1,5, ρ = 1,2: v = 4 m/s, pd = 9,6 Pa, ΔP = 14,4 Pa", () => {
    const r = kanalYerelKayipBasinc.compute({ debi_m3h: 3600, kesitAlani_m2: 0.25, kayipKatsayilariToplami: 1.5, yogunluk_kgm3: 1.2 });
    expect(r.intermediates.hiz_ms as number).toBeCloseTo(4, 8);
    expect(r.intermediates.dinamik_basinc_Pa as number).toBeCloseTo(9.6, 8);
    expect(r.value.yerelKayip_Pa).toBeCloseTo(14.4, 8);
  });
  it("hız iki katına çıkarsa kayıp 4 katı", () => {
    const g = { kesitAlani_m2: 0.25, kayipKatsayilariToplami: 1, yogunluk_kgm3: 1.2 };
    const a = kanalYerelKayipBasinc.compute({ ...g, debi_m3h: 1800 }).value.yerelKayip_Pa;
    const b = kanalYerelKayipBasinc.compute({ ...g, debi_m3h: 3600 }).value.yerelKayip_Pa;
    expect(b / a).toBeCloseTo(4, 8);
  });
});
