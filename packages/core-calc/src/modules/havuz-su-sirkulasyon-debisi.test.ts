import { describe, expect, it } from "vitest";
import { havuzSuSirkulasyonDebisi } from "./havuz-su-sirkulasyon-debisi";

describe("havuz-su-sirkulasyon-debisi", () => {
  it("V=50m³, t=6saat → ~8.333 m³/h", () => {
    const r = havuzSuSirkulasyonDebisi.compute({
      havuzHacmi_V_m3: 50,
      devirSuresi_t_saat: 6,
    });

    expect(r.value.gerekliDebi_m3h).toBeCloseTo(8.333, 2);
  });
});
