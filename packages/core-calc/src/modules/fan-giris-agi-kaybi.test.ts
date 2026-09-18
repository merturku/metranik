import { describe, it, expect } from "vitest";
import { fanGirisAgiKaybi } from "./fan-giris-agi-kaybi";

describe("Fan Giriş Ağı Kaybı", () => {
  it("ASHRAE: ζ=0.8 (filter+silencer), V=5 m/s, ρ=1.2 → ΔP ≈ 12 Pa", () => {
    const r = fanGirisAgiKaybi.compute({
      direnç_katsayisi_zeta: 0.8,
      hava_hizi_ms: 5,
      hava_yoğunluğu_kgm3: 1.2,
    });

    // ΔP = 0.8 × (1.2 × 25 / 2) = 0.8 × 15 = 12 Pa
    expect(r.value.basınç_kaybı_Pa).toBeCloseTo(12, 0);
  });

  it("Düşük hız: ζ=0.6, V=3 m/s, ρ=1.2 → ΔP ≈ 3.24 Pa", () => {
    const r = fanGirisAgiKaybi.compute({
      direnç_katsayisi_zeta: 0.6,
      hava_hizi_ms: 3,
      hava_yoğunluğu_kgm3: 1.2,
    });

    // ΔP = 0.6 × (1.2 × 9 / 2) = 0.6 × 5.4 = 3.24 Pa
    expect(r.value.basınç_kaybı_Pa).toBeCloseTo(3.2, 0);
  });
});
