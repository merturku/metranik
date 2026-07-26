import { describe, expect, it } from "vitest";
import { radyantIsiticiKapasitesi } from "./radyant-isitici-kapasitesi";

describe("radyant-isitici-kapasitesi", () => {
  it("10 m², 350 W/m² → 3500 W", () => {
    const r = radyantIsiticiKapasitesi.compute({ alan_m2: 10, katsayi_Wm2: 350 });

    expect(r.value.gerekliKapasite_W).toBeCloseTo(3500, 5);
  });
});
