import { describe, expect, it } from "vitest";
import { merdivenBasinclandirmaFaniDebisi } from "./merdiven-basinclandirma-fani-debisi";

describe("merdiven-basinclandirma-fani-debisi", () => {
  it("A=0.01m², ΔP=50Pa, Cd=0.6, n=1 → ~197.2 m³/h", () => {
    const r = merdivenBasinclandirmaFaniDebisi.compute({
      kapiKacakAlani_A_m2: 0.01,
      basinclandirmaBasinci_dP_Pa: 50,
      debiKatsayisi_Cd: 0.6,
      acikKapiSayisi_n: 1,
    });

    expect(r.intermediates.terminalHiz_ms).toBeCloseTo(9.1287, 3);
    expect(r.value.gerekliDebi_m3h).toBeCloseTo(197.18, 1);
  });
});
