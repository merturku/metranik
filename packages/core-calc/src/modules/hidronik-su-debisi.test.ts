import { describe, expect, it } from "vitest";
import { hidronikSuDebisi } from "./hidronik-su-debisi";

describe("hidronik-su-debisi", () => {
  // Enerji korunumundan türetilmiş, bağımsız doğrulanabilir örnek (yer tutucu değil):
  // Q = ṁ · cp · ΔT  →  ṁ = 10 / (4.186 × 10) = 0.2389 kg/s ≈ 0.2389 L/s ≈ 0.860 m³/h.
  // Pratikte kullanılan "0.86 × Q[kW] / ΔT[°C]" kısayoluyla da örtüşür (cp=4.186, ρ=1000 kg/m³).
  it("10 kW yük, 10°C ΔT için debiyi hesaplar", () => {
    const r = hidronikSuDebisi.compute({ isiYuku: 10, deltaT: 10 });

    expect(r.value.debi_m3h).toBeCloseTo(0.86, 2);
    expect(r.value.debi_ls).toBeCloseTo(0.2389, 3);
  });

  it("ΔT küçüldükçe debi artar (sabit yük)", () => {
    const genisDeltaT = hidronikSuDebisi.compute({ isiYuku: 10, deltaT: 20 });
    const darDeltaT = hidronikSuDebisi.compute({ isiYuku: 10, deltaT: 5 });

    expect(darDeltaT.value.debi_m3h).toBeGreaterThan(genisDeltaT.value.debi_m3h);
  });
});
