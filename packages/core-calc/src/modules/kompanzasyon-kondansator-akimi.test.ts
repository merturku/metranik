import { describe, it, expect } from "vitest";
import { kompanzasyonKondansatorAkimi } from "./kompanzasyon-kondansator-akimi";

describe("Kompanzasyon Kondansatör Akımı", () => {
  it("IEC 60831: 100 kVA, cos φ 0.8→0.98, 400V → 54.7 kVAr", () => {
    const r = kompanzasyonKondansatorAkimi.compute({
      gucsel_guc_kVA: 100,
      mevcut_cos_phi: 0.8,
      hedef_cos_phi: 0.98,
      isletme_gerilimi_V: 400,
    });

    expect(r.value.gereken_reaktif_guc_kVAr).toBeCloseTo(54.7, 0);
  });
});
