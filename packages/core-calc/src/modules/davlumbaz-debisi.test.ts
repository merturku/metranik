import { describe, expect, it } from "vitest";
import { davlumbazDebisi } from "./davlumbaz-debisi";

describe("davlumbaz-debisi", () => {
  it("v=0.5 m/s, A=1.2 m² → 2160 m³/h", () => {
    const r = davlumbazDebisi.compute({ yakalamaHizi_v_ms: 0.5, aciklikAlani_A_m2: 1.2 });

    expect(r.intermediates.debi_m3s).toBeCloseTo(0.6, 5);
    expect(r.value.debi_m3h).toBeCloseTo(2160, 5);
  });
});
