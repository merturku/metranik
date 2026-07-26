import { describe, expect, it } from "vitest";
import { kondansatorDepolananEnerji } from "./kondansator-depolanan-enerji";

describe("kondansatorDepolananEnerji", () => {
  it("C=1000 µF, V=400V → E=80 J", () => {
    const r = kondansatorDepolananEnerji.compute({ kapasite_C_F: 0.001, gerilim_V_V: 400 });
    expect(r.value.enerji_J).toBeCloseTo(80, 3);
  });
});
