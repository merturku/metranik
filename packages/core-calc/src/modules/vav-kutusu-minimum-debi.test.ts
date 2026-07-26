import { describe, expect, it } from "vitest";
import { vavKutusuMinimumDebi } from "./vav-kutusu-minimum-debi";

describe("vav-kutusu-minimum-debi", () => {
  it("Qmax=1000 m³/h, oran=0.3 → 300 m³/h", () => {
    const r = vavKutusuMinimumDebi.compute({
      maksimumDebi_Qmax_m3h: 1000,
      minimumOran: 0.3,
    });

    expect(r.value.minimumDebi_m3h).toBeCloseTo(300, 5);
  });
});
