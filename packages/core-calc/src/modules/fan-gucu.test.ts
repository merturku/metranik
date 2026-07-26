import { describe, expect, it } from "vitest";
import { fanGucu } from "./fan-gucu";

describe("fanGucu", () => {
  it("Q=5000 m³/h, ΔP=800 Pa, η=0.65 → ≈1.71 kW", () => {
    const r = fanGucu.compute({
      debi_Q_m3h: 5000,
      basincKaybi_dP_Pa: 800,
      fanVerimi_eta: 0.65,
    });
    expect(r.value.guc_kW).toBeCloseTo(1.7094, 3);
  });
});
