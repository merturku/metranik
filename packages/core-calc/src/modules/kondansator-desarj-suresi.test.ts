import { describe, expect, it } from "vitest";
import { kondansatorDesarjSuresi } from "./kondansator-desarj-suresi";

describe("kondansator-desarj-suresi", () => {
  it("R=100kΩ, C=50µF, V1=400V, V2=50V → ~10.397 s", () => {
    const r = kondansatorDesarjSuresi.compute({
      desarjDirenci_R_ohm: 100000,
      kapasite_C_F: 0.00005,
      ilkGerilim_V1_V: 400,
      hedefGerilim_V2_V: 50,
    });

    expect(r.intermediates.zamanSabiti_RC_s).toBeCloseTo(5, 5);
    expect(r.value.desarjSuresi_s).toBeCloseTo(10.397, 2);
  });
});
