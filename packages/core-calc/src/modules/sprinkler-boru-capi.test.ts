import { describe, expect, it } from "vitest";
import { sprinklerBoruCapi } from "./sprinkler-boru-capi";

describe("sprinkler-boru-capi", () => {
  it("Q=5 L/s, v=3 m/s → ~46.07 mm", () => {
    const r = sprinklerBoruCapi.compute({ debi_Q_Ls: 5, akisHizi_v_ms: 3 });

    expect(r.intermediates.debi_m3s).toBeCloseTo(0.005, 5);
    expect(r.value.boruCapi_mm).toBeCloseTo(46.066, 2);
  });
});
