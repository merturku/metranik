import { describe, expect, it } from "vitest";
import { buharHatCapi } from "./buhar-hat-capi";

describe("buhar-hat-capi", () => {
  it("1000 kg/h, vg=0.6 m³/kg, v=30 m/s → ~84.1 mm", () => {
    const r = buharHatCapi.compute({
      kutleselDebi_kgh: 1000,
      ozgulHacim_vg_m3kg: 0.6,
      buharHizi_v_ms: 30,
    });

    expect(r.intermediates.hacimselDebi_m3s).toBeCloseTo(0.16667, 4);
    expect(r.value.boruCapi_mm).toBeCloseTo(84.104, 1);
  });
});
