import { describe, expect, it } from "vitest";
import { kabloManyetikAlanHesabi } from "./kablo-manyetik-alan-hesabi";

describe("kablo-manyetik-alan-hesabi", () => {
  it("I=200A, r=0.5m, referans=200µT → B=80µT → uygun", () => {
    const r = kabloManyetikAlanHesabi.compute({
      akim_I_A: 200,
      mesafe_r_m: 0.5,
      izinVerilenReferansSeviyesi_uT: 200,
    });

    expect(r.value.manyetikAlan_B_uT).toBeCloseTo(80, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
});
