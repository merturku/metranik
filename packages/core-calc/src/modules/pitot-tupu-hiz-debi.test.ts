import { describe, it, expect } from "vitest";
import { pitotTupuHizDebi } from "./pitot-tupu-hiz-debi";

const g = { dinamikBasinc_Pa: 100, sicaklik_C: 20, mutlakBasinc_kPa: 101.325, kesitAlani_m2: 0.5, pitotKatsayisi: 1 };

describe("Pitot Tüpü Hız ve Debi", () => {
  it("100 Pa, 20 °C, 101,325 kPa: ρ = 1,2041 kg/m³ → v = 12,888 m/s, Q = 6,444 m³/s", () => {
    const r = pitotTupuHizDebi.compute(g);
    expect(r.intermediates.hava_yogunlugu_kgm3 as number).toBeCloseTo(1.2041, 3);
    expect(r.value.hiz_ms).toBeCloseTo(12.888, 2);
    expect(r.intermediates.debi_m3s as number).toBeCloseTo(6.444, 2);
  });
  it("Δp 4 katına → hız 2 katına; Cp çarpan olarak girer", () => {
    const a = pitotTupuHizDebi.compute(g).value.hiz_ms;
    expect(pitotTupuHizDebi.compute({ ...g, dinamikBasinc_Pa: 400 }).value.hiz_ms).toBeCloseTo(2 * a, 8);
    expect(pitotTupuHizDebi.compute({ ...g, pitotKatsayisi: 0.99 }).value.hiz_ms).toBeCloseTo(0.99 * a, 8);
  });
  it("yüksek hızda Mach uyarısı", () => {
    const r = pitotTupuHizDebi.compute({ ...g, dinamikBasinc_Pa: 8000 });
    expect(r.intermediates.uyari).toBeDefined();
  });
});
