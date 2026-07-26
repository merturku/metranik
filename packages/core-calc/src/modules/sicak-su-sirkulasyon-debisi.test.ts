import { describe, expect, it } from "vitest";
import { sicakSuSirkulasyonDebisi } from "./sicak-su-sirkulasyon-debisi";

describe("sicak-su-sirkulasyon-debisi", () => {
  it("Qkayıp=2kW, ΔT=5°C → ~0.0956 L/s", () => {
    const r = sicakSuSirkulasyonDebisi.compute({
      hatIsiKaybi_Qkayip_kW: 2,
      izinVerilenSicaklikDususu_dT_C: 5,
    });

    expect(r.value.sirkulasyonDebisi_Ls).toBeCloseTo(0.09556, 4);
  });
});
