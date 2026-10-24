import { describe, it, expect } from "vitest";
import { trafoImpedansGerilim } from "./elektrik-trafo-impedans-gerilim";

describe("Trafo Empedans", () => {
  it("630 kVA, 6 kW kayıp, 10 kV → ~5% Z", () => {
    const r = trafoImpedansGerilim.compute({ guc_kVA: 630, kisa_devre_kaybi_kW: 6, voltaj_birincil_kV: 10 });
    expect(r.value.Z_yuzde).toBeGreaterThan(3);
  });
});
