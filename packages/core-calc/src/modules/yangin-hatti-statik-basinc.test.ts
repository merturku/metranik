import { describe, it, expect } from "vitest";
import { yanginHattiStatikBasinc } from "./yangin-hatti-statik-basinc";

describe("Yangın Hattı Statik Basınç Düşümü", () => {
  it("NFPA 13: f=0.025, L=50m, D=0.04m, V=2.0 m/s → ΔP≈62500 Pa (0.625 bar)", () => {
    const r = yanginHattiStatikBasinc.compute({
      sürtünme_katsayısı_f: 0.025,
      boru_uzunluğu_m: 50,
      boru_çapı_m: 0.04,
      su_hızı_ms: 2.0,
      su_yoğunluğu_kgm3: 1000,
    });

    expect(r.value.basinç_kaybı_Pa).toBeCloseTo(62500, -2);
    expect(r.value.basinç_kaybı_bar).toBeCloseTo(0.625, 1);
  });

  it("Daha uzun hat: f=0.025, L=100m, D=0.05m, V=2.5 m/s → ΔP≈156250 Pa (1.56 bar)", () => {
    const r = yanginHattiStatikBasinc.compute({
      sürtünme_katsayısı_f: 0.025,
      boru_uzunluğu_m: 100,
      boru_çapı_m: 0.05,
      su_hızı_ms: 2.5,
      su_yoğunluğu_kgm3: 1000,
    });

    expect(r.value.basinç_kaybı_Pa).toBeCloseTo(156250, -2);
    expect(r.value.basinç_kaybı_bar).toBeCloseTo(1.56, 1);
  });
});
