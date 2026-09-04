import { describe, expect, it } from "vitest";
import { genlesmeTankiOnBasinci } from "./genlesme-tanki-on-basinci";

describe("genlesme-tanki-on-basinci", () => {
  it("H=15m, marj=0.3 bar → statik 1.4706 bar, P0=1.7706 bar", () => {
    const r = genlesmeTankiOnBasinci.compute({
      statikYukseklik_H_m: 15,
      guvenlikMarji_bar: 0.3,
    });

    expect(r.intermediates.statikBasinc_bar).toBeCloseTo(1.4706, 3);
    expect(r.value.onBasinc_P0_bar).toBeCloseTo(1.7706, 3);
  });
});
