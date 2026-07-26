import { describe, expect, it } from "vitest";
import { kondensDebisi } from "./kondens-debisi";

describe("kondens-debisi", () => {
  it("Qkayıp=50kW, hfg=2200kJ/kg → ~81.82 kg/h", () => {
    const r = kondensDebisi.compute({
      hatIsiKaybi_Qkayip_kW: 50,
      yogusmaGizliIsisi_hfg_kJkg: 2200,
    });

    expect(r.intermediates.kondensDebisi_kgs).toBeCloseTo(0.022727, 5);
    expect(r.value.kondensDebisi_kgh).toBeCloseTo(81.818, 2);
  });
});
