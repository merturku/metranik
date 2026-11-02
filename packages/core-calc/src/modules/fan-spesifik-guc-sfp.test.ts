import { describe, it, expect } from "vitest";
import { fanSpesifikGucSfp } from "./fan-spesifik-guc-sfp";

describe("Fan Spesifik Gücü (SFP)", () => {
  it("3000 W, 7200 m³/h (2 m³/s) → 1500 W/(m³/s), SFP 4", () => {
    const r = fanSpesifikGucSfp.compute({ elektrikGucu_W: 3000, debi_m3h: 7200, hedefSinif: 4 });
    expect(r.value.sfp_Wm3s).toBeCloseTo(1500, 9);
    expect(r.intermediates.sfp_sinifi).toBe("SFP 4");
    expect(r.verdict?.status).toBe("uygun");
  });
  it("hedef SFP 3 (1250) için aynı fan uygunsuz", () => {
    const r = fanSpesifikGucSfp.compute({ elektrikGucu_W: 3000, debi_m3h: 7200, hedefSinif: 3 });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
