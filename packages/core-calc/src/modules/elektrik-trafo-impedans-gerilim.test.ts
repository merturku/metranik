import { describe, it, expect } from "vitest";
import { trafoImpedansGerilim, trafoImpedansSchema } from "./elektrik-trafo-impedans-gerilim";

const trafo630 = {
  guc_kVA: 630,
  kisa_devre_kaybi_kW: 6,
  kisa_devre_gerilimi_yuzde: 4,
  yuklenme_orani: 1,
  guc_faktoru_cosfi: 0.8,
};

describe("Trafo Empedans Gerilim Düşümü", () => {
  it("630 kVA, Pk = 6 kW, uk = %4, tam yük, cosφ = 0,8: uR = 0,952, uX = 3,885 → ΔU = 3,093 + 0,032 = %3,125", () => {
    const r = trafoImpedansGerilim.compute(trafo630);
    expect(r.intermediates.rezistif_gerilim_uR_yuzde).toBeCloseTo(0.9524, 4);
    expect(r.intermediates.reaktif_gerilim_uX_yuzde).toBeCloseTo(3.885, 3);
    expect(r.value.gerilim_dusumu_yuzde).toBeCloseTo(3.125, 3);
  });

  it("Yarım yük, cosφ = 1: ΔU = 0,5×0,952 + (0,5×3,885)²/200 = %0,495", () => {
    const r = trafoImpedansGerilim.compute({ ...trafo630, yuklenme_orani: 0.5, guc_faktoru_cosfi: 1 });
    expect(r.value.gerilim_dusumu_yuzde).toBeCloseTo(0.495, 3);
  });

  it("uR ≥ uk olan tutarsız etiket değerleri reddedilir", () => {
    expect(trafoImpedansSchema.safeParse({ ...trafo630, kisa_devre_kaybi_kW: 30 }).success).toBe(false);
  });
});
