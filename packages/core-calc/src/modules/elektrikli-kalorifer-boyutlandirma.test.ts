import { describe, it, expect } from "vitest";
import { elektrikliKaloriferBoyutlandirma } from "./elektrikli-kalorifer-boyutlandirma";

describe("Elektrikli Kalorifer Boyutlandırma", () => {
  it("Enerji dengesi: 1500 m³/h, ΔT=20°C, ρ=1.2, c=1000 → P≈10 kW", () => {
    const r = elektrikliKaloriferBoyutlandirma.compute({
      volumetrik_debi_m3h: 1500,
      sicaklik_artisi_C: 20,
      hava_yoğunluğu_kgm3: 1.2,
      ozgul_isi_Jkg: 1000,
    });

    expect(r.value.gerekli_guç_kW).toBeCloseTo(10, 0);
  });
});
