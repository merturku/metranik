import { describe, expect, it } from "vitest";
import { basincliHavaBoruCapi } from "./basincli-hava-boru-capi";

describe("basincliHavaBoruCapi", () => {
  it("Q=50 L/s, v=15 m/s → D≈65.15 mm", () => {
    const r = basincliHavaBoruCapi.compute({ debi_Q_Ls: 50, hedefHiz_v_ms: 15 });
    expect(r.value.ic_cap_mm).toBeCloseTo(65.147, 2);
  });
});
