import { describe, expect, it } from "vitest";
import { vanaKvDegeri } from "./vana-kv-degeri";

describe("vana-kv-degeri", () => {
  it("Q=10 m³/h, SG=1, ΔP=0.5 bar → Kv≈14.14", () => {
    const r = vanaKvDegeri.compute({
      debi_Q_m3h: 10,
      ozgulAgirlik_SG: 1,
      basincFarki_dP_bar: 0.5,
    });

    expect(r.value.kv).toBeCloseTo(14.142, 2);
  });
});
