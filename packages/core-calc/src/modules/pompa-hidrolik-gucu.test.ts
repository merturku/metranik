import { describe, expect, it } from "vitest";
import { pompaHidrolikGucu } from "./pompa-hidrolik-gucu";

describe("pompaHidrolikGucu", () => {
  it("ρ=1000, Q=72 m³/h, H=30m, η=0.7 → P≈8.41 kW", () => {
    const r = pompaHidrolikGucu.compute({
      yogunluk_rho_kgm3: 1000,
      debi_Q_m3h: 72,
      basmaYuksekligi_H_m: 30,
      pompaVerimi_eta: 0.7,
    });
    expect(r.value.milGucu_kW).toBeCloseTo(8.4086, 3);
  });
});
