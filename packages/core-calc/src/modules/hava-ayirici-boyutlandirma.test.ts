import { describe, expect, it } from "vitest";
import { havaAyiriciBoyutlandirma } from "./hava-ayirici-boyutlandirma";

describe("hava-ayirici-boyutlandirma", () => {
  it("Q=20 m³/h, v=0.9 m/s → ~88.6 mm gerekli çap", () => {
    const r = havaAyiriciBoyutlandirma.compute({
      debit_Q_m3h: 20,
      maksimumHiz_v_ms: 0.9,
    });

    expect(r.intermediates.debit_m3s).toBeCloseTo(0.005556, 5);
    expect(r.intermediates.kesitAlani_m2).toBeCloseTo(0.006173, 5);
    expect(r.value.gerekliCap_mm).toBeCloseTo(88.65, 1);
  });
});
