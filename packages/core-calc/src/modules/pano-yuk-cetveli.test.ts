import { describe, expect, it } from "vitest";
import { panoYukCetveli } from "./pano-yuk-cetveli";

describe("pano-yuk-cetveli", () => {
  it("Pkurulu=100kW, talep faktörü=0.7 → 70kW", () => {
    const r = panoYukCetveli.compute({ toplamKuruluGuc_kW: 100, talepFaktoru: 0.7 });

    expect(r.value.talepGucu_kW).toBeCloseTo(70, 5);
  });
});
